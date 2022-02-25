//@ts-nocheck
const filter = (data: any) => {
  console.log(data);
  for (let i = 0; i < data.length; i += 4) {
    const slice = [data[i], data[i + 1], data[i + 2], data[i + 3]];

    if (data[i + 1] > 0) {
      console.log(slice);
      //   // data[i + 3] = values.intensity;
      //   data[i] = 220; // R
      //   data[i + 1] = 102; // G
      //   data[i + 2] = 153; // B
    }
  }
};
export const createGFWIntegratedLayer = async () => {
  const width = 256;
  const height = 256;

  // create a canvas with 2D rendering context
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d', {
    alpha: true
  });
  canvas.width = width;
  canvas.height = height;

  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.src = 'https://tiles.globalforestwatch.org/gfw_integrated_alerts/latest/default/3/3/3.png';
  img.onload = () => {
    context.drawImage(img, 0, 0, 256, 256);
    const imageData = context.getImageData(0, 0, 256, 256).data;
    console.log(imageData);
    filter(imageData);
  };
};
