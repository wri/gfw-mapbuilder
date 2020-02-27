import SimpleFillSymbol from 'esri/symbols/SimpleFillSymbol';

let customSymbol: undefined | SimpleFillSymbol = undefined;
let imagerySymbol: undefined | SimpleFillSymbol = undefined;

export const getCustomSymbol = (): any => {
  if (customSymbol) {
    return customSymbol;
  } else {
    customSymbol = new SimpleFillSymbol({
      style: 'solid',
      color: [210, 210, 210, 0.0],
      outline: {
        // autocasts as new SimpleLineSymbol()
        color: [3, 188, 255],
        width: 3
      }
    });
    return customSymbol;
  }
};

export const getImagerySymbol = (): any => {
  if (imagerySymbol) {
    return imagerySymbol;
  } else {
    imagerySymbol = new SimpleFillSymbol({
      style: 'solid',
      color: [210, 210, 210, 0.0],
      outline: {
        // autocasts as new SimpleLineSymbol()
        color: [210, 210, 210, 0],
        width: 1
      }
    });
    return imagerySymbol;
  }
};
