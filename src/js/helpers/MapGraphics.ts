import Map from 'esri/Map';
import Mapview from 'esri/views/MapView';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import Graphic from 'esri/Graphic';
import Point from 'esri/geometry/Point';
import Polygon from 'esri/geometry/Polygon';

import { mapController } from 'js/controllers/mapController';

import { getCustomSymbol, getPointSymbol } from 'js/helpers/generateSymbol';

import { FeatureResult } from 'js/store/mapview/types';

interface GraphicConfig {
  map: Map;
  mapview: Mapview;
  allFeatures: Array<FeatureResult>;
  isUploadFile: boolean;
}

export function setNewGraphic({
  map,
  mapview,
  allFeatures,
  isUploadFile
}: GraphicConfig): void {
  let graphicsLayer: any = map.findLayerById('active-feature-layer');

  if (graphicsLayer) {
    graphicsLayer.removeAll(); //TODO: We may need to support multiple selected features in future
  } else {
    graphicsLayer = new GraphicsLayer({
      id: 'active-feature-layer'
    });
  }

  const setSymbol = (symbolType: string): any => {
    switch (symbolType) {
      case 'polygon':
        return getCustomSymbol();
      case 'point':
        return getPointSymbol();
      default:
        console.warn('potential edge case in setSymbol()', symbolType);
        return getCustomSymbol();
    }
  };

  const setGeometry = (symbolType: string, geometry: __esri.Geometry): any => {
    switch (symbolType) {
      case 'polygon':
        return new Polygon(geometry);
      case 'point':
        return new Point(geometry);
      default:
        console.warn('potential edge case in setGeometry()', symbolType);
        return new Polygon(geometry);
    }
  };

  allFeatures.forEach((feature: FeatureResult) => {
    const isPolygon =
      (feature.geometry as any).rings || feature.geometry.type === 'polygon';
    /**
     * * NOTE:
     * * File uploads don't have a geometry.type,
     * * so we have to check if it has geometry.rings
     */
    const symbol = isPolygon
      ? setSymbol('polygon')
      : setSymbol(feature.geometry.type);

    const geometry = isPolygon
      ? setGeometry('polygon', feature.geometry)
      : setGeometry(feature.geometry.type, feature.geometry);

    const featureGraphic = new Graphic({
      geometry: geometry,
      attributes: feature.attributes,
      symbol: symbol
    });

    graphicsLayer.graphics.push(featureGraphic);
  });

  mapController.initializeAndSetSketch(graphicsLayer.graphics);

  if (isUploadFile) {
    mapview.goTo(graphicsLayer.graphics);
  }
}
