import Map from 'esri/Map';
import Mapview from 'esri/views/MapView';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import Graphic from 'esri/Graphic';
import Polygon from 'esri/geometry/Polygon';
import SimpleFillSymbol from 'esri/symbols/SimpleFillSymbol';

import { getCustomSymbol, getImagerySymbol } from 'js/helpers/generateSymbol';

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

  const polygonOrPointSymbol = (type: string): SimpleFillSymbol =>
    type === 'polygon' ? getCustomSymbol() : getImagerySymbol();

  allFeatures.forEach((feature: FeatureResult) => {
    const symbol = (feature.geometry as any).rings
      ? getCustomSymbol()
      : polygonOrPointSymbol(feature.geometry.type);

    const featureGraphic = new Graphic({
      geometry: new Polygon(feature.geometry),
      attributes: feature.attributes,
      symbol: symbol
    });

    graphicsLayer.graphics.push(featureGraphic);
  });

  map.add(graphicsLayer);

  if (isUploadFile) {
    mapview.goTo(graphicsLayer.graphics);
  }
}
