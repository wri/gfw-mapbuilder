//@ts-nocheck
import BaseTileLayer from '@arcgis/core/layers/BaseTileLayer';
import esriRequest from '@arcgis/core/request';

export const createRadd = async () => {
  return BaseTileLayer.createSubclass({
    getTileUrl: function (level, row, column) {
      return this.urlTemplate.replace('{z}', level).replace('{x}', column).replace('{y}', row);
    },

    fetchTile: function (level, row, column) {
      const url = this.getTileUrl(level, row, column);
      return esriRequest(url, {
        responseType: 'image',
        allowImageDataAccess: true,
      }).then(
        function (response) {
          return new Promise((resolve) => {
            const image = response.data;
            const width = this.tileInfo.size[0];
            const height = this.tileInfo.size[0];

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = width;
            canvas.height = height;
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
        // This makes the black background opaque
        if (data[i] === 0 || data[i + 1] === 0 || data[i + 3] === 0) {
          data[i + 3] = 0;
        } else {
          data[i] = 220; // R
          data[i + 1] = 102; // G
          data[i + 2] = 153; // B
        }
      }
      return data;
    },
  });
};
