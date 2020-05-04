//@ts-nocheck
import BaseTileLayer from 'esri/layers/BaseTileLayer';
import esriRequest from 'esri/request';
import moment from 'moment';

const START_DATE = '2004-01-01';
const START_YEAR = 2004;
const startMoment = moment(START_DATE);

// window.top_date = top_date;
// console.log('top_date', top_date);

export const TerraLayer = BaseTileLayer.createSubclass({
  properties: {
    julianFrom: 4000,
    julianTo: new Date().getJulian()
  },

  getTileUrl: function(level, row, column) {
    return this.urlTemplate
      .replace('{z}', level)
      .replace('{x}', column)
      .replace('{y}', row);
  },

  fetchTile: function(level, row, column) {
    // call getTileUrl() method to construct the URL to tiles
    // for a given level, row and col provided by the LayerView
    const url = this.getTileUrl(level, row, column);
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
        return promise;
      }.bind(this)
    );
  },

  filter: function(data) {
    const startDate = this.startDate;
    const endDate = this.endDate;

    let start;
    if (startDate) {
      const updatedStart = moment(startDate);
      start =
        (updatedStart.year() - START_YEAR) * 23 +
        Math.floor(updatedStart.dayOfYear() / 16 + 1);
    } else {
      start =
        (startMoment.year() - START_YEAR) * 23 +
        Math.floor(startMoment.dayOfYear() / 16 + 1);
    }
    if (start < 1) {
      start = 1;
    }

    let end;
    if (endDate) {
      const updatedEnd = moment(endDate);
      end =
        (updatedEnd.year() - START_YEAR) * 23 +
        Math.floor(updatedEnd.dayOfYear() / 16 + 1);
    } else {
      end =
        (moment().year() - START_YEAR) * 23 +
        Math.floor(moment().dayOfYear() / 16 + 1);
    }
    const maxDate = moment.utc();

    const recentStart =
      (maxDate.year() - START_YEAR) * 23 +
      Math.floor(
        maxDate
          .clone()
          .subtract(1, 'month')
          .dayOfYear() /
          16 +
          1
      );

    const recentEnd =
      (maxDate.year() - START_YEAR) * 23 +
      Math.floor(maxDate.dayOfYear() / 16 + 1);

    for (var i = 0; i < data.length; i += 4) {
      const intensity = Math.min(data[i + 2] * 4, 255);
      const timeLoss = data[i] + data[i + 1];

      if (timeLoss >= start && timeLoss <= end) {
        if (timeLoss >= recentStart && timeLoss <= recentEnd) {
          data[i] = 219;
          data[i + 1] = 168;
          data[i + 2] = 0;
          data[i + 3] = intensity;
        } else {
          data[i] = 220;
          data[i + 1] = 102;
          data[i + 2] = 153;
          data[i + 3] = intensity;

          // if (timeLoss > top_date) {
          //   data[i] = 233;
          //   data[i + 1] = 189;
          //   data[i + 2] = 21;
          //   data[i + 3] = intensity;
          // }
        }
      } else {
        data[i + 3] = 0;
      }
    }
    return data;
  }
});
