import Map from "esri/Map";
import MapView from "esri/views/MapView";
import { RefObject } from "react";

export class MapController {
  _map: Map | null;
  _mapview: MapView | null;

  constructor() {
    this._map = null;
    this._mapview = null;
  }

  initializeMap(domRef: RefObject<any>) {
    console.log(domRef);
    this._map = new Map({ basemap: "topo" });

    this._mapview = new MapView({
      map: this._map,
      container: domRef.current,
      center: [-77.091, 38.8816],
      zoom: 12
    });

    this._mapview.when(
      () => {
        console.log("mapview is loaded");
      },
      (error: Error) => {
        console.log(error);
      }
    );
  }

  log() {
    console.log(this._map?.basemap.id);
  }
}

export const mapController = new MapController();
// window.mapController = mapController;
