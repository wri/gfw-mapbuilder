import Map from 'esri/Map';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import Graphic from 'esri/Graphic';
import Polygon from 'esri/geometry/Polygon';
import { getCustomSymbol, getImagerySymbol } from 'js/helpers/generateSymbol';

export function createAndAddNewGraphic(
  map: Map,
  geometry?: __esri.Geometry,
  attributes?: Graphic['attributes']
): void {
  if (!geometry) return;
  let graphicsLayer: any = map.findLayerById('active-feature-layer');

  if (graphicsLayer) {
    graphicsLayer.removeAll(); //TODO: We may need to support multiple selected features in future
  } else {
    graphicsLayer = new GraphicsLayer({
      id: 'active-feature-layer'
    });
    map.add(graphicsLayer);
  }

  const symbol: any = {
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

  if (attributes) {
    featureGraphic.attributes = attributes;
  }

  graphicsLayer.add(featureGraphic);
}

export function setNewGraphic(map: any, mapview: any, allFeatures: any): any {
  let graphicsLayer: any = map.findLayerById('active-feature-layer');
  if (graphicsLayer) {
    graphicsLayer.removeAll(); //TODO: We may need to support multiple selected features in future
  } else {
    graphicsLayer = new GraphicsLayer({
      id: 'active-feature-layer'
    });
  }

  allFeatures.forEach((feature: any) => {
    const polygonOrPointSymbol =
      feature.geometry.type === 'polygon'
        ? getCustomSymbol()
        : getImagerySymbol();

    const symbol = feature.geometry.rings
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
  mapview.goTo(graphicsLayer.graphics);
}

export function processGeojsonNotes(esriJson: any): any {
  /**
   * * processGeojson()
   *  Iterates over an array of ArcGIS data
   *  Creates a new graphic
   *  Pushes graphic to array of graphics
   *  adds graphic to this._mapview.graphics
   *  goes to graphics
   */
  /**
   * * createAndAddNewGraphic()
   *  conditionally removes all graphics of graphic layer
   *  OR creates new graphic layer with ID of 'active-feature-layer'
   *  adds graphic layer to map
   *  conditionally assigns symbol a line or symbol
   *  creates a new graphic
   *  Adds graphic to graphicLayer
   */
}
