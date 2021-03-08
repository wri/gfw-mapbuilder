import Map from 'esri/Map';
import Mapview from 'esri/views/MapView';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import Graphic from 'esri/Graphic';
import Point from 'esri/geometry/Point';
import Polygon from 'esri/geometry/Polygon';
import * as projection from 'esri/geometry/projection';

import { mapController } from '../../js/controllers/mapController';

import {
  getCustomSymbol,
  getPointSymbol
} from '../../js/helpers/generateSymbol';

import { FeatureResult } from '../../js/store/mapview/types';

const setSymbol = (
  symbolType: string
): Promise<__esri.SimpleFillSymbol | __esri.SimpleMarkerSymbol> => {
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

//Helper for Report graphics in order to add POINT to the map
export async function addPointGraphic(map: Map, feature: any): Promise<void> {
  let graphicsLayer: any = map.findLayerById('active-feature-layer');
  let graphicsLayerExists = graphicsLayer;
  if (graphicsLayer) {
    graphicsLayer.removeAll();
    graphicsLayerExists = true;
  } else {
    graphicsLayer = new GraphicsLayer({
      id: 'active-feature-layer'
    });
    graphicsLayerExists = false;
  }
  const symbol = await setSymbol('point');
  const geometry = new Point({
    x: feature.geometry.x,
    y: feature.geometry.y
  });
  const pointGraphic = new Graphic({
    symbol: symbol,
    geometry: geometry
  });
  graphicsLayer.add(pointGraphic);
  if (!graphicsLayerExists) {
    map.add(graphicsLayer);
  }
}

interface GraphicConfig {
  map: Map;
  mapview: Mapview;
  allFeatures: Array<FeatureResult>;
  isUploadFile: boolean;
}

export async function setNewGraphic({
  map,
  mapview,
  allFeatures,
  isUploadFile
}: GraphicConfig): Promise<void> {
  //TODO: this needs a refactor, we are handling file uploads and featues on the map with a single
  //function, we likely need to either reuse multiple functions or split this up
  let graphicsLayer: any = map.findLayerById('active-feature-layer');

  if (graphicsLayer) {
    graphicsLayer.removeAll(); //TODO: We may need to support multiple selected features in future
  } else {
    graphicsLayer = new GraphicsLayer({
      id: 'active-feature-layer'
    });
  }

  if (!isUploadFile) {
    let isPolygon = false;
    if (
      allFeatures[0].geometry?.type === 'polygon' ||
      allFeatures[0].geometry.hasOwnProperty('rings')
    ) {
      isPolygon = true;
    }
    const symbol = isPolygon
      ? await setSymbol('polygon')
      : await setSymbol('point');

    const geometry = isPolygon
      ? setGeometry('polygon', allFeatures[0].geometry)
      : setGeometry('point', allFeatures[0].geometry);

    const featureGraphic = new Graphic({
      geometry: geometry,
      attributes: allFeatures[0].attributes,
      symbol: symbol
    });

    graphicsLayer.graphics.add(featureGraphic);
    map.add(graphicsLayer);
    return;
  }

  if (isUploadFile) {
    projection.load().then(() => {
      const allGraphics = allFeatures.map(
        async (feature: FeatureResult, index: number) => {
          const isPolygon =
            (feature.geometry as any).rings ||
            feature.geometry.type === 'polygon';

          /**
           * * NOTE:
           * * File uploads don't have a geometry.type,
           * * so we have to check if it has geometry.rings
           */

          const symbol = isPolygon
            ? await setSymbol('polygon')
            : await setSymbol(feature.geometry.type);

          if (index === 0) {
            //First feature is "active" by default > change it to appropriate color
            //@ts-ignore TODO: test this
            symbol.outline.color = [115, 252, 253];
          }
          const geometry = isPolygon
            ? setGeometry('polygon', feature.geometry)
            : setGeometry(feature.geometry.type, feature.geometry);

          const featureGraphic = new Graphic({
            geometry: geometry,
            attributes: feature.attributes,
            symbol: symbol
          });

          const transformation = projection.getTransformation(
            featureGraphic.geometry.spatialReference,
            mapController._mapview.spatialReference
          );

          featureGraphic.geometry = projection.project(
            featureGraphic.geometry,
            mapController._mapview.spatialReference,
            transformation
          ) as __esri.Geometry;

          return featureGraphic;
        }
      );

      graphicsLayer.graphics.push(...allGraphics);
      mapController.initializeAndSetSketch(graphicsLayer.graphics);

      mapview.goTo(allGraphics);
    });
    return;
  }
}
