//@ts-nocheck
import Map from 'esri/Map';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import Graphic from 'esri/Graphic';

export function createAndAddNewGraphic(
  map: Map,
  geometry: __esri.Geometry
): void {
  let graphicsLayer = map.findLayerById('active-feature-layer');
  if (graphicsLayer) {
    graphicsLayer.removeAll(); //TODO: We may need to support multiple selected features in future
  } else {
    graphicsLayer = new GraphicsLayer({
      id: 'active-feature-layer'
    });
    map.add(graphicsLayer);
  }

  const symbol = {
    color: [0, 0, 0, 0],
    outline: {
      color: [115, 252, 253],
      width: 1.5
    }
  };

  //determine if we need fill or marker
  if (geometry.type === 'polygon') {
    symbol.type = 'simple-fill';
    symbol.style = 'solid';
  } else {
    symbol.type = 'simple-marker';
    symbol.style = 'circle';
    symbol.size = '12px';
  }

  const featureGraphic = new Graphic({
    geometry: geometry,
    symbol: symbol
  });

  graphicsLayer.add(featureGraphic);
}
