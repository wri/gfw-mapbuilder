//@ts-nocheck
import PNG from 'png-ts';
import { loadModules } from 'esri-loader';

export const createGFWIntegratedLayer = async () => {
  const [BaseTileLayer] = await loadModules(['esri/layers/BaseTileLayer']);

  return BaseTileLayer.createSubclass({
    properties: {
      julianFrom: '15000',
      julianTo: new Date().getJulian(),
      confirmed: false
    },
    getTileUrl: function(level, row, column) {
      return this.urlTemplate
        .replace('{z}', level)
        .replace('{x}', column)
        .replace('{y}', row);
    },
    fetchTile: function(level, row, column) {
      const url = this.getTileUrl(level, row, column);
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const width = this.tileInfo.size[0];
      const height = this.tileInfo.size[0];
      canvas.width = width;
      canvas.height = height;

      return this.fetchTileArrayBuffer(url).then(r => {
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
    fetchTileArrayBuffer: async function(url) {
      const response = await fetch(url);
      return response.arrayBuffer();
    },
    processData: function(data) {
      for (let i = 0; i < data.length; i += 4) {
        const slice = [data[i], data[i + 1], data[i + 2], data[i + 3]];
        const values = this.decodeDate(slice);
        // if date is > Feb 03 2020
        if (values.date > 20033) {
          data[i + 3] = values.intensity;
          if (this.confirmed) {
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
        }
      }
      return data;
    },
    decodeDate: function(pixel) {
      const total_days = pixel[0] * 255 + pixel[1];
      const year_int = parseInt(total_days / 365) + 15;
      const year = parseInt(year_int * 1000);
      const julian_day = total_days % 365;
      const date = year + julian_day;
      const band3_str = this.pad(pixel[2].toString());
      const confidence = parseInt(band3_str[0]) - 1;
      const intensity_raw = parseInt(band3_str.slice(1, 3));
      let intensity = intensity_raw * 50;
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
};
