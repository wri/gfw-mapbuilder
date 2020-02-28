import MapView from 'esri/views/MapView';
import Point from 'esri/geometry/Point';
import Map from 'esri/Map';
import store from 'js/store';
import QueryTask from 'esri/tasks/QueryTask';
import Query from 'esri/tasks/support/Query';
import Graphic from 'esri/Graphic';
import Sublayer from 'esri/layers/support/Sublayer';
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
    output.layerID = featureObject[0].sourceLayer.layer.title;
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

async function processSublayers(
  geometry: Point,
  sublayersArray: Sublayer[],
  mapview: MapView
): Promise<any> {
  const processedSubsResults: LayerFeatureResult[] = [];
  for await (const sublayer of sublayersArray) {
    const url = sublayer.url;
    const qParams = {
      where: '1=1',
      outFields: ['*'],
      units: 'miles',
      distance: 0.02 * mapview.resolution,
      geometry: geometry,
      returnGeometry: true
    };
    try {
      const sublayerResult = await esriQuery(url, qParams);
      //if no features are found, skip it
      if (sublayerResult.features.length !== 0) {
        const features = sublayerResult.features.map(f => {
          return {
            attributes: f.attributes,
            geometry: f.geometry //this is either null or geometry depending on our query!
          };
        });
        const subCleanedResult = {
          layerID: sublayer.layer.id,
          layerTitle: sublayer.layer.title,
          sublayerID: null,
          sublayerTitle: null,
          features: features
        };
        processedSubsResults.push(subCleanedResult);
      }
    } catch (e) {
      console.log(e);
    }
  }
  return processedSubsResults;
}

async function fetchAsyncServerResults(
  map: Map | undefined,
  mapview: MapView,
  mapPoint: Point,
  layerFeatureResults: LayerFeatureResult[]
): Promise<any> {
  if (map) {
    const processedLayersByClientQuery = layerFeatureResults.map(
      f => f.layerID
    );
    const visibleServerLayers = map.layers
      .filter(l => l.visible)
      .filter(l => l.type !== 'graphics')
      .filter(l => !processedLayersByClientQuery.includes(l.id));
    //the third filter here ensures that we do not double count, for some reason some layers were being processed twice, at the client side (popup promise) and server side too. TODO: This may need further investigation, debugging with variuos county configs!
    //Extract all sublayers
    const sublayers: any = visibleServerLayers
      .flatten((item: any) => item.sublayers)
      .filter((l: any) => !l.sublayers);

    //We need to convert Collection of sublayers to regular array for async processing
    const sublayersArray: any[] = sublayers.items.map((sl: Sublayer) => sl);

    const processedSubs: LayerFeatureResult[] = await processSublayers(
      mapPoint,
      sublayersArray,
      mapview
    );
    return processedSubs;
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
