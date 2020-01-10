import Map from 'esri/Map';
import MapView from 'esri/views/MapView';
import WebMap from 'esri/WebMap';
import { RefObject } from 'react';
import store from '../store/index';

export class MapController {
  _map: Map | null;
  _mapview: MapView | null;

  constructor() {
    this._map = null;
    this._mapview = null;
  }

  initializeMap(domRef: RefObject<any>) {
    const { appState } = store.getState();
    this._map = new WebMap({
      portalItem: {
        id: appState.webmap
      }
    });

    this._mapview = new MapView({
      map: this._map,
      container: domRef.current
    });

    this._mapview
      .when(
        () => {
          console.log('mapview is loaded');
          store.dispatch({ type: 'MAP_READY', payload: true });
        },
        (error: Error) => {
          console.log('error in initializeMap()', error);
          store.dispatch({ type: 'MAP_ERROR', payload: true });
        }
      )
      .catch((error: Error) => {
        console.log('error in initializeMap()', error);
        store.dispatch({ type: 'MAP_ERROR', payload: true });
      });
  }

  log(): void {
    console.log(this._map?.basemap);
  }
}

export const mapController = new MapController();
// window.mapController = mapController;
