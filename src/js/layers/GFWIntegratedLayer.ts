//@ts-nocheck
import PNG from 'png-ts';
import { loadModules } from 'esri-loader';

const processData = data => {
  for (let i = 0; i < data.length; i += 4) {
    const slice_dark = [data[i], data[i + 1], data[i + 2], data[i + 3]];
    if (data[i] > 0) {
      console.log(slice_dark);
    }
  }
};

const load = (url, canvas, callback) => {
  if (typeof canvas === 'function') {
    callback = canvas;
  }
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = () => {
    const data = new Uint8Array(xhr.response || xhr.mozResponseArrayBuffer);
    const png = new PNG(data);
    const pngImage = PNG.load(png.data, canvas);
    const pixels = pngImage.decodePixels();
    processData(pixels);
    if (typeof (canvas && canvas.getContext) === 'function') {
      // render(canvas);
    }
    return typeof callback === 'function' ? callback(png) : undefined;
  };
  return xhr.send(null);
};

export const createGFWIntegratedLayer = async () => {
  const [esriRequest, BaseTileLayer] = await loadModules(['esri/request', 'esri/layers/BaseTileLayer']);
  // const canvas = document.createElement('canvas');
  // load('https://tiles.globalforestwatch.org/gfw_integrated_alerts/latest/default/3/3/3.png', canvas);
  const integratedLayer = BaseTileLayer.createSubclass({
    getTileUrl: function(level, row, column) {
      return this.urlTemplate
        .replace('{z}', level)
        .replace('{x}', column)
        .replace('{y}', row);
    },

    fetchTile: function(level, row, column) {
      // call getTileUrl() method to construct the URL to tiles
      // for a given level, row and col provided by the LayerView
      const url = this.getTileUrl(3, 3, 3);
      console.log(url);
      // request for tiles based on the generated url
      // set allowImageDataAccess to true to allow
      // cross-domain access to create WebGL textures for 3D.
      return esriRequest(url, {
        responseType: 'image',
        allowImageDataAccess: true
      }).then(
        function(response) {
          // We use a promise because we can't return an empty canvas before the image data has loaded, been filtered, and properly colored
          const promise = new Promise(resolve => {
            // when esri request resolves successfully
            // get the image from the response
            console.log(response);

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
              console.log(imageData);
              context.putImageData(imageData, 0, 0);
              resolve(canvas);
            };
            imageObject.src = image.src;
          });
          return promise;
        }.bind(this)
      );
    },

    filter: function(data) {
      const todayDate = new Date().getJulian();
      const towoWeeksAgo = new Date();
      towoWeeksAgo.setDate(towoWeeksAgo.getDate() - 14);
      const weekAgoJulian = towoWeeksAgo.getJulian();

      for (let i = 0; i < data.length; i += 4) {
        // Decode the rgba/pixel so I can filter on confidence and date ranges
        const slice = [data[i], data[i + 1], data[i + 2]];

        if (data[i] > 0) {
          console.log(slice);
        }
        const values = this.decodeDate(slice);

        // Check if pixel date is between Julian Date properties above
        if (values.date > this.julianFrom && values.date < this.julianTo) {
          // Check if we are only examining confirmed cases or not
          if (this.confirmed) {
            if (values.confidence > 0) {
              data[i + 3] = values.intensity;
              // Make the pixel pink for glad alerts
              if (values.date > weekAgoJulian && values.date < todayDate) {
                // Make the pixel yellow for recent alerts
                data[i] = 224; // R
                data[i + 1] = 190; // G
                data[i + 2] = 7; // B
              } else {
                data[i] = 220; // R
                data[i + 1] = 102; // G
                data[i + 2] = 153; // B
              }
            } else {
              // Hide the pixel
              data[i + 3] = 0;
              data[i + 2] = 0;
              data[i + 1] = 0;
              data[i] = 0;
            }
            // Glad is not confirmed
          } else {
            data[i + 3] = values.intensity;
            if (values.date > weekAgoJulian && values.date < todayDate) {
              // Make the pixel yellow for recent alerts
              data[i] = 224; // R
              data[i + 1] = 190; // G
              data[i + 2] = 7; // B
            } else {
              // Make the pixel pink for glad alerts
              data[i] = 220; // R
              data[i + 1] = 102; // G
              data[i + 2] = 153; // B
            }
          }
          // Hide pixel if outside of date range
        } else {
          // Hide the pixel
          data[i + 3] = 0;
          data[i + 2] = 0;
          data[i + 1] = 0;
          data[i] = 0;
        }
      }
      return data;
    },

    decodeDate: function(pixel) {
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
        date: date
      };
    },
    pad: function(num) {
      const str = '00' + num;
      return str.slice(str.length - 3);
    }
  });
  return integratedLayer;
};
