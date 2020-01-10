import Map from 'esri/Map';
import MapView from 'esri/views/MapView';
import WebMap from 'esri/WebMap';
import Legend from 'esri/widgets/Legend';
import { RefObject } from 'react';

import store from '../store/store';
export class MapController {
  _map: Map | null;
  _mapview: MapView | null;

  constructor() {
    this._map = null;
    this._mapview = null;
  }

  initializeMap(domRef: RefObject<any>) {
    this._map = new WebMap({
      portalItem: {
        id: 'e691172598f04ea8881cd2a4adaa45ba'
      }
    });

    this._mapview = new MapView({
      map: this._map,
      container: domRef.current
    });

    const legend = new Legend({
      view: this._mapview
    });

    this._mapview.ui.add(legend, 'bottom-right');

    this._mapview
      .when(
        () => {
          console.log('mapview is loaded');
          store.dispatch({ type: 'MAP_READY', isMapReady: true });
        },
        (error: Error) => {
          console.log('error in initializeMap()', error);
          store.dispatch({ type: 'MAP_ERROR', loadError: true });
        }
      )
      .catch((error: Error) => {
        console.log('error in initializeMap()', error);
        store.dispatch({ type: 'MAP_ERROR', loadError: true });
      });
  }

  log(): void {
    console.log(this._map?.basemap);
  }
}

export const mapController = new MapController();
// window.mapController = mapController;
