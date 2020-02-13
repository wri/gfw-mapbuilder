import { watch } from 'esri/core/watchUtils';
import MapView from 'esri/views/MapView';
import Point from 'esri/geometry/Point';
import Map from 'esri/Map';
import store from 'js/store';
import { setActiveFeatures } from 'js/store/mapview/actions';
import QueryTask from 'esri/tasks/QueryTask';
import Query from 'esri/tasks/support/Query';
import geometryEngine from 'esri/geometry/geometryEngine';

function esriQuery(url: string, queryParams: any): Promise<any> | any {
  const qt = new QueryTask({
    url: url
  });
  const query = new Query(queryParams);
  const result = qt.execute(query);
  return result;
}

function fetchServerSidePromises(
  map: Map | undefined,
  mapview: MapView,
  mapPoint: Point
): any {
  //Iterate over map layers, filter out turned off layers and non map-image layers
  const visibleServerLayers = map?.layers.filter(
    l => l.visible && l.type === 'map-image'
  );
  //Extract all sublayers
  const sublayers = visibleServerLayers
    ?.flatten((item: any) => item.sublayers)
    .filter((l: any) => !l.sublayers);

  const serverPromiseArray: any = sublayers?.map((sl: any) => {
    const url = sl.url;
    const distance = mapview.resolution * 0.005;
    const geometry = geometryEngine.buffer(mapPoint, distance, 'miles');
    const qParams = {
      where: '1=1',
      outFields: '*',
      geometry: geometry,
      // distance: 1,
      // units: 'miles',
      returnGeometry: false
    };
    return esriQuery(url, qParams);
  });
  return serverPromiseArray?.items;
}

//Client Side Feature Fetching
export function addPopupWatchUtils(
  mapview: MapView,
  map: Map | undefined,
  mapPoint: Point
): void {
  //Watching for promises array on Popup, that gets resolved once user clicks on the map and features are returned. Note: this will not return any server side features.
  const popupWatcher = watch(mapview.popup, 'promises', promises => {
    console.log('client promises:');
    console.log(promises);
    const serverPromises = fetchServerSidePromises(map, mapview, mapPoint);
    console.log('server promises');
    console.log(serverPromises);
    const clientAndServerPromises = promises.concat(serverPromises);
    console.log('client and serverprom');
    console.log(clientAndServerPromises);

    function resolvePromisesWithErrors(promises: any) {
      return Promise.all<any>(
        promises.map((p: any) => p.catch((error: any) => null))
      ).then(featureArray => {
        console.log(featureArray);
        //Remove empty and failed results that come through the promise resolution
        const cleanFeatureArray = featureArray
          .filter((f: any) => f !== null)
          .filter((f: any) => f.length !== 0);
        //Remove empty results that come from server side resolution
        console.log(cleanFeatureArray);
        const sanitizedRes = cleanFeatureArray.map((featObject: any) => {
          //if it is server side promise resolution, extract features

          if (Array.isArray(featObject)) {
            // console.log(featObject);
            return featObject;
          } else {
            // debugger;
            //client side resolution is clean already - do nothing
            return featObject.features;
          }
        });
        //Send results to redux store to be used in DataPanel
        store.dispatch(setActiveFeatures(sanitizedRes));
      });
    }
    resolvePromisesWithErrors(clientAndServerPromises);
    // resolvePromisesWithErrors(promises);
    //cleanup watcher
    popupWatcher.remove();
  });
}
