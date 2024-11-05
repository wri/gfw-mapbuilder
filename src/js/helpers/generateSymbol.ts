import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';

export const getCustomSymbol = async (): Promise<__esri.SimpleFillSymbol> => {
  return new SimpleFillSymbol({
    style: 'solid',
    color: [210, 210, 210, 0.0],
    outline: {
      color: [3, 188, 255],
      width: 3,
    },
  });
};

export const getImagerySymbol = async (): Promise<__esri.SimpleFillSymbol> => {
  return new SimpleFillSymbol({
    style: 'solid',
    color: [210, 210, 210, 0.0],
    outline: {
      color: [210, 210, 210, 0],
      width: 1,
    },
  });
};

export const getPointSymbol = async (): Promise<__esri.SimpleMarkerSymbol> => {
  return new SimpleMarkerSymbol({
    style: 'circle',
    color: [210, 210, 210, 0.0],
    outline: {
      color: [3, 188, 255],
      width: 1,
    },
  });
};
