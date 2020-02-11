import { watch } from 'esri/core/watchUtils';
import MapView from 'esri/views/MapView';
import store from 'js/store';
import Graphic from 'esri/Graphic';
import { setActiveFeatures } from 'js/store/mapview/actions';
export function addPopupWatchUtils(mapview: MapView): void {
  //Watching for promises array on Popup, that gets resolved once user clicks on the map and features are returned. Note: this will not return any server side features.
  watch(mapview.popup, 'promises', promises => {
    Promise.all<Graphic[]>(promises).then(featureArray => {
      //Remove empty results
      const cleanFeatureArray = featureArray.filter(
        features => features.length !== 0
      );
      //Resulting array can be empty (no features found) or array of arrays containing features
      console.log(cleanFeatureArray);

      //Send results to redux store to be used in DataPanel
      store.dispatch(setActiveFeatures(cleanFeatureArray));
      //TODO: Handle server side layers here or elsewhere!
    });
  });
}
