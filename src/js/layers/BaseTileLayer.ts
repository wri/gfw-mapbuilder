//@ts-nocheck
import BaseTileLayer from '@arcgis/core/layers/BaseTileLayer';
import esriRequest from '@arcgis/core/request';

export const createBaseTileLayer = async () => {
  return BaseTileLayer.createSubclass({
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
      return esriRequest(url, {
        responseType: 'image',
        allowImageDataAccess: true,
      }).then(
        function (response) {
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

          return canvas;
        }.bind(this)
      );
    },
  });
};
