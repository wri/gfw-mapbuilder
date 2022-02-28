//@ts-nocheck
import PNG from 'png-ts';

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
      render(canvas);
    }
    return typeof callback === 'function' ? callback(png) : undefined;
  };
  return xhr.send(null);
};

export const createGFWIntegratedLayer = async () => {
  const canvas = document.createElement('canvas');
  load('https://tiles.globalforestwatch.org/gfw_integrated_alerts/latest/default/3/3/3.png', canvas);
};
