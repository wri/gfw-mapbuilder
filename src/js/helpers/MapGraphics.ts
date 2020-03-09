import Map from 'esri/Map';
import Mapview from 'esri/views/MapView';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import Graphic from 'esri/Graphic';
import Polygon from 'esri/geometry/Polygon';

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

  allFeatures.forEach((feature: FeatureResult) => {
    const polygonOrPointSymbol =
      feature.geometry.type === 'polygon'
        ? getCustomSymbol()
        : getImagerySymbol();

    const symbol = (feature.geometry as any).rings
      ? getCustomSymbol()
      : polygonOrPointSymbol;

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
