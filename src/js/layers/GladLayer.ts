//@ts-nocheck
import BaseTileLayer from '@arcgis/core/layers/BaseTileLayer';
import esriRequest from '@arcgis/core/request';

import { getYear, startOfYear, differenceInDays } from 'date-fns';

// Modify the JS Date object
Date.prototype.getJulian = function () {
  const year = getYear(this);
  // Create an object of the beginning of the year
  const startOfYearValue = startOfYear(new Date(year, 0, 1));
  // Find number of days passed

  const daysPassed = differenceInDays(this, startOfYearValue);

  // Append leading zeros if needed
  let daysPassedFormatted = daysPassed.toString();
  if (daysPassedFormatted.length < 3) {
    while (daysPassedFormatted.length < 3) {
      daysPassedFormatted = `0${daysPassedFormatted}`;
    }
  }

  const getLastDecimals = year.toString().slice(-2);

  // Return the correct Julian
  return `${getLastDecimals}${daysPassedFormatted}`;
};

export const createGlad = async () => {
  return BaseTileLayer.createSubclass({
    properties: {
      julianFrom: '15000',
      julianTo: new Date().getJulian(),
      confirmed: false,
    },

    getTileUrl: function (level, row, column) {
      return this.urlTemplate.replace('{z}', level).replace('{x}', column).replace('{y}', row);
    },

    fetchTile: function (level, row, column) {
      // call getTileUrl() method to construct the URL to tiles
      // for a given level, row and col provided by the LayerView
      const url = this.getTileUrl(level, row, column);
      // request for tiles based on the generated url
      // set allowImageDataAccess to true to allow
      // cross-domain access to create WebGL textures for 3D.
      return esriRequest(url, {
        responseType: 'image',
        allowImageDataAccess: true,
      }).then(
        function (response) {
          // We use a promise because we can't return an empty canvas before the image data has loaded, been filtered, and properly colored
          return new Promise((resolve) => {
            // when esri request resolves successfully
            // get the image from the response
            const image = response.data;
            const width = this.tileInfo.size[0];
            const height = this.tileInfo.size[0];

            // create a canvas with 2D rendering context
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = width;
            canvas.height = height;
            // Draw the blended image onto the canvas.
            context.drawImage(image, 0, 0, width, height);

            const imageObject = new Image();
            imageObject.crossOrigin = 'Anonymous';

            imageObject.onload = () => {
              context.drawImage(imageObject, 0, 0, width, height);
              const imageData = context.getImageData(0, 0, width, height);
              imageData.data.set(this.filter(imageData.data));
              context.putImageData(imageData, 0, 0);
              resolve(canvas);
            };
            imageObject.src = image.src;
          });
        }.bind(this)
      );
    },

    filter: function (data) {
      for (let i = 0; i < data.length; i += 4) {
        // Decode the rgba/pixel so I can filter on confidence and date ranges
        const slice = [data[i], data[i + 1], data[i + 2]];
        const values = this.decodeDate(slice);

        // Check if pixel date is between Julian Date properties above
        if (values.date > this.julianFrom && values.date < this.julianTo) {
          // Check if we are only examining confirmed cases or not

          data[i + 3] = values.intensity;
          if (this.confirmed) {
            if (values.confidence === 1) {
              data[i] = 220; // R
              data[i + 1] = 102; // G
              data[i + 2] = 153; // B
            }
            if (values.confidence === 2) {
              data[i] = 201; // R
              data[i + 1] = 42; // G
              data[i + 2] = 108; // B
            }
            if (values.confidence === 0) {
              data[i + 3] = 0;
            }
          } else {
            if (values.confidence === 0) {
              data[i] = 236; // R
              data[i + 1] = 164; // G
              data[i + 2] = 194; // B
            }
            if (values.confidence === 1) {
              data[i] = 220; // R
              data[i + 1] = 101; // G
              data[i + 2] = 152; // B
            }
            if (values.confidence === 2) {
              data[i] = 201; // R
              data[i + 1] = 42; // G
              data[i + 2] = 108; // B
            }
          }
        } else {
          // set color to be transparent
          data[i] = 255; // R
          data[i + 1] = 255; // G
          data[i + 2] = 255; // B
          data[i + 3] = 0; // A
        }
      }
      return data;
    },

    decodeDate: function (pixel) {
      // find the total days of the pixel by
      // multiplying the red band by 255 and adding
      // the green band to that
      const total_days = pixel[0] * 255 + pixel[1];
      // take the total days value and divide by 365 to
      // get the year_offset. Add 15 to this (i.e 0 + 15 = 2015)
      // or 1 + 15 = 2016
      const year_int = parseInt(total_days / 365) + 15;
      // Multiply by 1000 to give us year in YYDDD format
      // (i.e. 15000 or 16000)
      const year = parseInt(year_int * 1000);
      // Find the remaining days to get the julian day for
      // that year
      const julian_day = total_days % 365;
      // Add to get YYDDD date val
      const date = year + julian_day;

      // Convert the blue band to string, leading
      // zeros if it's not currently three digits
      // this occurs very rarely; where there's an intensity
      // value but no date/confidence for it. Due to bilinear
      // resampling
      const band3_str = this.pad(pixel[2].toString());
      // Grab confidence (the first value) from this string
      // confidence is stored as 1/2, subtract one to make it 0/1
      const confidence = parseInt(band3_str[0]) - 1;
      // Grab the raw intensity value from the pixel; ranges from 1 - 55
      const intensity_raw = parseInt(band3_str.slice(1, 3));
      // Scale the intensity to make it visible
      let intensity = intensity_raw * 50;
      // Set intensity to 255 if it's > than that value
      if (intensity > 255) {
        intensity = 255;
      }
      return {
        confidence: confidence,
        intensity: intensity,
        date: date,
      };
    },
    pad: function (num) {
      const str = '00' + num;
      return str.slice(str.length - 3);
    },
  });
};
