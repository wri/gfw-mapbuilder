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
  //Depending on mapzoom level query distance is lower to account for points on the map spacing
  function calcDistance(): number {
    if (mapview.zoom < 10) {
      return 2;
    } else if (mapview.zoom > 10 && mapview.zoom <= 13) {
      return 0.8;
    } else if (mapview.zoom > 13 && mapview.zoom <= 15) {
      return 0.3;
    } else {
      return 0.03;
    }
  }

  const bufferedDistance = calcDistance();
  const processedSubsResults: LayerFeatureResult[] = [];
  for await (const sublayer of sublayersArray) {
    const url = sublayer.url;
    const qParams = {
      where: '1=1',
      outFields: ['*'],
      units: 'miles',
      distance: bufferedDistance,
      geometry: geometry,
      returnGeometry: false
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
  mapPoint: Point
): Promise<any> {
  if (map) {
    //Iterate over map layers, filter out turned off layers and non map-image layers
    const visibleServerLayers = map.layers.filter(
      l => l.visible && l.type === 'map-image'
    );
    //Extract all sublayers
    const sublayers: any = visibleServerLayers
      .flatten((item: any) => item.sublayers)
      .filter((l: any) => !l.sublayers);

    //We need to convert Collection of sublayers to regular array for async processing
    const sublayersArray: any[] = sublayers.items.map((sl: Sublayer) => sl);

    //TODO: Better way to handle mouse click buffering?
    // const distance = mapview.resolution * 0.005;
    // const geometry = geometryEngine.buffer(mapPoint, distance, 'miles');
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
            const newFeatureObject: LayerFeatureResult = {
              layerID: featureObject[0].layer.id,
              layerTitle: featureObject[0].layer.title,
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
          mapPoint
        );
        layerFeatureResults = layerFeatureResults.concat(serverResponse);
        store.dispatch(setActiveFeatures(layerFeatureResults));
      });
    }
    resolveClientPromisesWithErrors(promises);
  });
}
