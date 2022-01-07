import { loadModules } from 'esri-loader';
import store from '../store';

export const getCustomSymbol = async (): Promise<__esri.SimpleFillSymbol> => {
  const [SimpleFillSymbol] = await loadModules(['esri/symbols/SimpleFillSymbol']);
  const multiPolygonSelection = store.getState().appState.multiPolygonSelectionMode;
  const color = multiPolygonSelection ? [1, 200, 20, 0.0] : [3, 188, 255];

  return new SimpleFillSymbol({
    style: 'solid',
    color: [210, 210, 210, 0.0],
    outline: {
      color: color,
      width: 3
    }
  });
};

export const getImagerySymbol = async (): Promise<__esri.SimpleFillSymbol> => {
  const [SimpleFillSymbol] = await loadModules(['esri/symbols/SimpleFillSymbol']);
  return new SimpleFillSymbol({
    style: 'solid',
    color: [210, 210, 210, 0.0],
    outline: {
      color: [210, 210, 210, 0],
      width: 1
    }
  });
};

export const getPointSymbol = async (): Promise<__esri.SimpleMarkerSymbol> => {
  const [SimpleMarkerSymbol] = await loadModules(['esri/symbols/SimpleMarkerSymbol']);
  return new SimpleMarkerSymbol({
    style: 'circle',
    color: [210, 210, 210, 0.0],
    outline: {
      color: [3, 188, 255],
      width: 1
    }
  });
};
