//@ts-nocheck
import BaseTileLayer from '@arcgis/core/layers/BaseTileLayer';
import esriRequest from '@arcgis/core/request';

const intensityBank = {};
const getScalePowFunc = (exp) => {
  // y = m * x ^ k + b
  const domain = [0, 256];
  const range = [0, 256];
  const b = range[0] - domain[0];
  const m = (range[1] - b) / Math.pow(domain[1], exp);

  return (x) => {
    return Math.pow(x, exp) * m + b;
  };
};
for (let z = 1; z < 21; z++) {
  //each zoom level on the map
  intensityBank[z] = [];
  const exp = z < 11 ? 0.3 + (z - 3) / 20 : 1;
  const lMoney = getScalePowFunc(exp);
  for (let f = 0; f < 256; f++) {
    //each potential intensity value
    intensityBank[z][f] = [];
    intensityBank[z][f].push(151);
    intensityBank[z][f].push(189);
    intensityBank[z][f].push(61);
    intensityBank[z][f].push(z ? lMoney(f) * 0.8 : f * 0.8);
  }
}

export const createTreeCover = async () => {
  const TreeCoverLayer: any = BaseTileLayer.createSubclass({
    properties: {
      threshold: 30,
    },

    getTileUrl: function (level: number, row: number, column: number) {
      return this.urlTemplate
        .replace('{z}', level)
        .replace('{x}', column)
        .replace('{y}', row)
        .replace('{thresh}', this.threshold);
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
          // We use a promise because we can't return an empty canvas before the image data has loaded, been filtered, and properly colored
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
      const z = this.view.zoom;

      for (let i = 0; i < data.length; i += 4) {
        // Decode the rgba/pixel so I can filter on date ranges
        const slice = [data[i], data[i + 1], data[i + 2]];
        const values = this.decodeIntensity(slice);

        data[i] =
          intensityBank[z] && intensityBank[z][values.intensity] && intensityBank[z][values.intensity][0]
            ? intensityBank[z][values.intensity][0]
            : 0;
        data[i + 1] =
          intensityBank[z] && intensityBank[z][values.intensity] && intensityBank[z][values.intensity][1]
            ? intensityBank[z][values.intensity][1]
            : 0;
        data[i + 2] =
          intensityBank[z] && intensityBank[z][values.intensity] && intensityBank[z][values.intensity][2]
            ? intensityBank[z][values.intensity][2]
            : 0;
        data[i + 3] =
          intensityBank[z] && intensityBank[z][values.intensity] && intensityBank[z][values.intensity][3]
            ? intensityBank[z][values.intensity][3]
            : 0;
      }
      return data;
    },

    decodeIntensity: function (pixel) {
      const intensity = pixel[1];
      return { intensity: intensity };
    },
  });
  return TreeCoverLayer;
};
