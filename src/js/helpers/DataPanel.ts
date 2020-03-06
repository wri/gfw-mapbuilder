import MapView from 'esri/views/MapView';
import Point from 'esri/geometry/Point';
import Map from 'esri/Map';
import store from 'js/store';
import QueryTask from 'esri/tasks/QueryTask';
import Query from 'esri/tasks/support/Query';
import { setActiveFeatures } from 'js/store/mapview/actions';
import { LayerFeatureResult } from 'js/store/mapview/types';
import { selectActiveTab } from 'js/store/appState/actions';

function esriQuery(url: string, queryParams: any): Promise<__esri.FeatureSet> {
  const qt = new QueryTask({
    url: url
  });
  const query = new Query(queryParams);
  const result = qt.execute(query);
  return result;
}

async function fetchAsyncServerResults(
  mapview: MapView,
  mapPoint: Point,
  layer: any
): Promise<any> {
  const processedLayerResult: LayerFeatureResult[] = [];
  const queryParams = {
    where: '1=1',
    outFields: ['*'],
    units: 'miles',
    distance: 0.02 * mapview.resolution,
    geometry: mapPoint,
    returnGeometry: true
  };
  if (layer.sublayers && layer.sublayers.length > 0) {
    //process each sublayer
    for (const sublayer of layer.sublayers.items) {
      const subUrl = sublayer.url;
      try {
        const sublayerResult = await esriQuery(subUrl, queryParams);
        if (sublayerResult.features.length > 0) {
          const features = sublayerResult.features.map(f => {
            return {
              attributes: f.attributes,
              geometry: f.geometry
            };
          });
          const layerResultObject = {
            layerID: layer.id,
            layerTitle: layer.title,
            sublayerID: sublayer.id,
            sublayerTitle: sublayer.title,
            features: features
          };
          processedLayerResult.push(layerResultObject);
        }
      } catch (e) {
        console.error(e);
      }
    }
  } else {
    //attempt to process layer as it because it has not sublayers
    try {
      const url = layer.url;
      const layerResult = await esriQuery(url, queryParams);
      if (layerResult.features.length > 0) {
        const features = layerResult.features.map(f => {
          return {
            objectid: f.getObjectId(),
            attributes: f.attributes,
            geometry: f.geometry //this is either null or geometry depending on our query!
          };
        });
        const layerResultObject = {
          layerID: layer.id,
          layerTitle: layer.title,
          sublayerID: null,
          sublayerTitle: null,
          features: features
        };
        processedLayerResult.push(layerResultObject);
      }
    } catch (e) {
      console.error(`Failed to query layer, ${layer.id}`);
    }
  }
  return processedLayerResult;
}

//Client Side Feature Fetching
export async function queryLayersForFeatures(
  mapview: MapView,
  map: Map | undefined,
  event: __esri.MapViewClickEvent
): Promise<void> {
  let layerFeatureResults: LayerFeatureResult[] = [];

  const queryParams = {
    where: '1=1',
    outFields: ['*'],
    units: 'miles',
    distance: 0.02 * mapview.resolution,
    geometry: event.mapPoint,
    returnGeometry: true
  };

  const allLayersVisibleLayers: any = map?.layers
    .filter(l => l.visible && l.type !== 'graphics')
    .toArray();

  if (allLayersVisibleLayers) {
    for await (const layer of allLayersVisibleLayers) {
      // Deal with CLIENT side layers
      //TODO: is there a better way to split client/server queries?
      if (
        layer.type === 'feature' ||
        layer.type === 'csv' ||
        layer.type === 'geojson' ||
        layer.type === 'scene'
      ) {
        try {
          const featureResults = await layer.queryFeatures(queryParams);
          //Ignore empty results
          if (featureResults.features.length > 0) {
            const newLayerFeatureResult = {
              layerID: featureResults.features[0].layer.id,
              layerTitle: featureResults.features[0].layer.title,
              sublayerID: null,
              sublayerTitle: null,
              features: []
            };
            newLayerFeatureResult.features = featureResults.features.map(
              (f: any) => {
                return {
                  attributes: f.attributes,
                  geometry: f.geometry
                };
              }
            );
            layerFeatureResults = layerFeatureResults.concat(
              newLayerFeatureResult
            );
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        // Deal with SERVER side layers
        //TODO: will this handle most or all cases we have? needs more testing
        const queryServerSideLayer = await fetchAsyncServerResults(
          mapview,
          event.mapPoint,
          layer
        );
        layerFeatureResults = layerFeatureResults.concat(queryServerSideLayer);
      }
    }
  }
  //Save all features to the redux store
  store.dispatch(setActiveFeatures(layerFeatureResults));

  //Open data tab
  const { appState } = store.getState();
  if (appState.leftPanel.activeTab !== 'data') {
    store.dispatch(selectActiveTab('data'));
  }
}
