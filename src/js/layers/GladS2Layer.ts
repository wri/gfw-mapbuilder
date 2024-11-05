//@ts-nocheck
import PNG from 'png-ts';
import BaseTileLayer from '@arcgis/core/layers/BaseTileLayer';

export const createGladS2Layer = async () => {
  return BaseTileLayer.createSubclass({
    properties: {
      julianFrom: '20063',
      julianTo: new Date().getJulian(),
      confirmed: false,
    },
    getTileUrl: function (level, row, column) {
      return this.urlTemplate.replace('{z}', level).replace('{x}', column).replace('{y}', row);
    },
    fetchTile: function (level, row, column) {
      const url = this.getTileUrl(level, row, column);
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const width = this.tileInfo.size[0];
      const height = this.tileInfo.size[0];
      canvas.width = width;
      canvas.height = height;

      return this.fetchTileArrayBuffer(url).then((r) => {
        const data = new Uint8Array(r);
        const png = new PNG(data);
        const pngImage = PNG.load(png.data, canvas);
        const iData = context.createImageData(width, height);
        const pixels = pngImage.decodePixels();
        iData.data.set(this.processData(pixels));
        context.putImageData(iData, 0, 0);
        return canvas;
      });
    },
    fetchTileArrayBuffer: async function (url) {
      const response = await fetch(url);
      return response.arrayBuffer();
    },
    processData: function (data) {
      for (let i = 0; i < data.length; i += 4) {
        data[i] = 220; // R
        data[i + 1] = 102; // G
        data[i + 2] = 153; // B
        return data;
      }
    },
  });
};
