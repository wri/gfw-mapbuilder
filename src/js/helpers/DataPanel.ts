import MapView from 'esri/views/MapView';
import Point from 'esri/geometry/Point';
import Map from 'esri/Map';
import store from 'js/store';
import QueryTask from 'esri/tasks/QueryTask';
import Query from 'esri/tasks/support/Query';
import Graphic from 'esri/Graphic';
import { once } from 'esri/core/watchUtils';
import { setActiveFeatures } from 'js/store/mapview/actions';
import { LayerFeatureResult } from 'js/store/mapview/types';
import { selectActiveTab } from 'js/store/appState/actions';

function extractLayerInfo(
  featureObject: any
): {
  layerID: string;
  layerTitle: string;
  sublayerSouce: boolean;
  sublayerID: string;
  sublayerTitle: string;
} {
  const output: any = {};
  if (featureObject[0].layer) {
    output.layerID = featureObject[0].layer.id;
    output.layerTitle = featureObject[0].layer.title;
    output.sublayerTitle = null;
    output.sublayerID = null;
  } else {
    //assume that we are in sublayer situation
    output.layerID = featureObject[0].sourceLayer.layer.id;
    output.layerTitle = featureObject[0].sourceLayer.layer.title;
    output.sublayerTitle = featureObject[0].sourceLayer.title;
    output.sublayerID = featureObject[0].sourceLayer.id;
  }
  return output;
}

function esriQuery(url: string, queryParams: any): Promise<__esri.FeatureSet> {
  const qt = new QueryTask({
    url: url
  });
  const query = new Query(queryParams);
  const result = qt.execute(query);
  return result;
}

async function processLayers(
  mapview: MapView,
  geometry: Point,
  layersCollection: __esri.Collection<any>
): Promise<any> {
  const processedLayersResult: LayerFeatureResult[] = [];
  const layersArray = layersCollection.toArray();
  const queryParams = {
    where: '1=1',
    outFields: ['*'],
    units: 'miles',
    distance: 0.02 * mapview.resolution,
    geometry: geometry,
    returnGeometry: true
  };
  //if layer has sublayers, we query those
  for await (const layer of layersArray) {
    const url = layer.url;
    if (layer.sublayers && layer.sublayers.length !== 0) {
      for (const sublayer of layer.sublayers.items) {
        const subUrl = sublayer.url;
        try {
          const sublayerResult = await esriQuery(subUrl, queryParams);
          if (sublayerResult.features.length !== 0) {
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
            processedLayersResult.push(layerResultObject);
          }
        } catch (e) {
          console.error(e);
        }
      }
    } else {
      // no subs found on layer, query layer itself!
      try {
        const layerResult = await esriQuery(url, queryParams);
        if (layerResult.features.length !== 0) {
          const features = layerResult.features.map(f => {
            return {
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
          processedLayersResult.push(layerResultObject);
        }
      } catch (e) {
        console.error(`Failed to query layer, ${layer.id}`);
      }
    }
  }
  return processedLayersResult;
}

async function fetchAsyncServerResults(
  map: Map | undefined,
  mapview: MapView,
  mapPoint: Point,
  layerFeatureResults: LayerFeatureResult[]
): Promise<any> {
  if (map) {
    const processedLayerInfo = layerFeatureResults.map(f => f.layerID);
    const visibleServerLayers = map.layers
      .filter(l => l.visible && l.type !== 'graphics')
      .filter(l => !processedLayerInfo.includes(l.id));
    const processedLayers = await processLayers(
      mapview,
      mapPoint,
      visibleServerLayers
    );
    return processedLayers;
  }
}

//Client Side Feature Fetching
export function addPopupWatchUtils(
  mapview: MapView,
  map: Map | undefined,
  mapPoint: Point
): void {
  //Watching for promises array on Popup, that gets resolved once user clicks on the map and features are returned. Note: this will not return any server side features.
  once(mapview.popup, 'promises', promises => {
    function resolveClientPromisesWithErrors(promises: any): Promise<void> {
      return Promise.all<any>(
        promises.map((p: Promise<any>) => p.catch((error: Error) => null))
      ).then(async clientFeatures => {
        let layerFeatureResults: LayerFeatureResult[] = [];
        const cleanClientFeautures = clientFeatures
          .filter(f => f !== null) //catch failed promises
          .filter(f => f.length !== 0) //catch no features returned
          .map((featureObject: Graphic[]) => {
            //extract layerID and layerTitle from resulting feature object
            const {
              layerID,
              layerTitle,
              sublayerID,
              sublayerTitle
            } = extractLayerInfo(featureObject);
            const newFeatureObject: LayerFeatureResult = {
              layerID: layerID,
              layerTitle: layerTitle,
              sublayerID: sublayerID,
              sublayerTitle: sublayerTitle,
              features: featureObject.map(g => {
                return {
                  attributes: g.attributes,
                  geometry: g.geometry
                };
              })
            };
            return newFeatureObject;
          });
        layerFeatureResults = layerFeatureResults.concat(cleanClientFeautures);

        //deal with server side separately
        const serverResponse = await fetchAsyncServerResults(
          map,
          mapview,
          mapPoint,
          layerFeatureResults
        );
        layerFeatureResults = layerFeatureResults.concat(serverResponse);
        store.dispatch(setActiveFeatures(layerFeatureResults));
        const { appState } = store.getState();
        if (appState.leftPanel.activeTab !== 'data') {
          store.dispatch(selectActiveTab('data'));
        }
      });
    }
    resolveClientPromisesWithErrors(promises);
  });
}
