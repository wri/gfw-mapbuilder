import SimpleFillSymbol from 'esri/symbols/SimpleFillSymbol';

export const getCustomSymbol = (): SimpleFillSymbol => {
  return new SimpleFillSymbol({
    style: 'solid',
    color: [210, 210, 210, 0.0],
    outline: {
      // autocasts as new SimpleLineSymbol()
      color: [3, 188, 255],
      width: 3
    }
  });
};

export const getImagerySymbol = (): SimpleFillSymbol => {
  return new SimpleFillSymbol({
    style: 'solid',
    color: [210, 210, 210, 0.0],
    outline: {
      // autocasts as new SimpleLineSymbol()
      color: [210, 210, 210, 0],
      width: 1
    }
  });
};
