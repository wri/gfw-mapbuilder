// @ts-nocheck
import BaseTileLayer from '@arcgis/core/layers/BaseTileLayer';
import esriRequest from '@arcgis/core/request';

export const createHeight = async () => {
  const TreeCoverHeightLayer: any = BaseTileLayer.createSubclass({
    properties: {
      urlTemplate: null,
      height: 3,
    },

    getTileUrl: function (level: number, row: number, column: number) {
      return this.urlTemplate.replace('{z}', level).replace('{x}', column).replace('{y}', row);
    },

    fetchTile: function (level: number, row: number, column: number) {
      // call getTileUrl() method to construct the URL to tiles
      // for a given level, row and col provided by the LayerView
      const url = this.getTileUrl(level, row, column);
      // request for tiles based on the generated url
      // set allowImageDataAccess to true to allow
      // cross-domain access to create WebGL textures for 3D.

      // request for tiles based on the generated url
      // the signal option ensures that obsolete requests are aborted
      return esriRequest(url, {
        responseType: 'image',
        allowImageDataAccess: true,
      }).then(
        function (response) {
          const promise = new Promise((resolve) => {
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
    filter: function (data) {
      for (let i = 0; i < data.length; i += 4) {
        const slice = [data[i], data[i + 1], data[i + 2]];
        const treeHeight = slice[0];
        //apply filter
        if (treeHeight <= this.height) {
          data[i] = 0;
          data[i + 1] = 0;
          data[i + 2] = 0;
          data[i + 3] = 0;
        } else {
          if (treeHeight > 0 && treeHeight < 4) {
            data[i] = 199;
            data[i + 1] = 222;
            data[i + 2] = 198;
          } else if (treeHeight >= 4 && treeHeight < 5) {
            data[i] = 199;
            data[i + 1] = 222;
            data[i + 2] = 198;
          } else if (treeHeight >= 5 && treeHeight < 7) {
            data[i] = 192;
            data[i + 1] = 217;
            data[i + 2] = 191;
          } else if (treeHeight >= 7 && treeHeight < 10) {
            data[i] = 175;
            data[i + 1] = 208;
            data[i + 2] = 176;
          } else if (treeHeight >= 10 && treeHeight < 15) {
            data[i] = 146;
            data[i + 1] = 189;
            data[i + 2] = 146;
          } else if (treeHeight >= 15 && treeHeight < 20) {
            data[i] = 115;
            data[i + 1] = 170;
            data[i + 2] = 114;
          } else if (treeHeight >= 20 && treeHeight < 25) {
            data[i] = 69;
            data[i + 1] = 143;
            data[i + 2] = 68;
          } else if (treeHeight >= 25 && treeHeight < 30) {
            data[i] = 20;
            data[i + 1] = 114;
            data[i + 2] = 20;
          } else if (treeHeight >= 30 && treeHeight < 35) {
            data[i] = 0;
            data[i + 1] = 93;
            data[i + 2] = 0;
          } else if (treeHeight >= 35) {
            data[i] = 0;
            data[i + 1] = 79;
            data[i + 2] = 0;
          }
        }
      }
      return data;
    },
  });
  return TreeCoverHeightLayer;
};
