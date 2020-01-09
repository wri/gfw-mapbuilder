import Map from 'esri/Map';
import MapView from 'esri/views/MapView';
import WebMap from 'esri/WebMap';
import { RefObject } from 'react';

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

    this._mapview.when(
      () => {
        console.log('mapview is loaded');
      },
      (error: Error) => {
        console.log(error);
      }
    );
  }

  log(): void {
    console.log(this._map?.basemap);
  }
}

export const mapController = new MapController();
// window.mapController = mapController;
