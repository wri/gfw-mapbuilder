//@ts-nocheck
import BaseTileLayer from '@arcgis/core/layers/BaseTileLayer';
import esriRequest from '@arcgis/core/request';

export const createPrimary = async () => {
  const PrimaryForestLayer = BaseTileLayer.createSubclass({
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
      }).then((response) => {
        const image = response.data;
        const width = this.tileInfo.size[0];
        const height = this.tileInfo.size[0];

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;

        const imageObject = new Image();
        imageObject.crossOrigin = 'Anonymous';

        imageObject.onload = () => {
          context.drawImage(imageObject, 0, 0, width, height);
          const imageData = context.getImageData(0, 0, width, height);
          context.putImageData(imageData, 0, 0);
        };
        imageObject.src = image.src;
        return canvas;
      });
    },
  });
  return PrimaryForestLayer;
};
