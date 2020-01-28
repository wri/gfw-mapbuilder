import Map from 'esri/Map';
import MapView from 'esri/views/MapView';
import WebMap from 'esri/WebMap';
import Legend from 'esri/widgets/Legend';
import { RefObject } from 'react';
import store from '../store/index';
import {
  clearAllLayers,
  updateVisibleLayers,
  allAvailableLayers,
  mapError,
  isMapReady
} from 'js/store/mapview/actions';

interface ZoomParams {
  zoomIn: boolean;
}

export class MapController {
  _map: Map | null;
  _mapview: MapView | null;

  constructor() {
    this._map = null;
    this._mapview = null;
  }

  initializeMap(domRef: RefObject<any>): void {
    const { appSettings } = store.getState();
    this._map = new WebMap({
      portalItem: {
        id: appSettings.webmap
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
          store.dispatch(isMapReady(true));
          //TODO: Is there a better way/place to push all available layers of the map into redux?
          const mapLayers: string[] = [];
          this._map?.layers.forEach(layer => mapLayers.push(layer.id));
          store.dispatch(updateVisibleLayers(mapLayers));

          //store all AVAILABLE layers in redux too (this is a temporary solution, all available layers likely will come from resources and webmap info)
          store.dispatch(allAvailableLayers(mapLayers));
          console.log('mapview is loaded');
        },
        (error: Error) => {
          console.log('error in initializeMap()', error);
          store.dispatch(mapError(true));
        }
      )
      .catch((error: Error) => {
        console.log('error in initializeMap()', error);
        store.dispatch(mapError(true));
      });
  }

  log(): void {
    console.log(this._map?.basemap);
  }

  zoomInOrOut({ zoomIn }: ZoomParams): void {
    if (this._mapview) {
      const zoomNum = zoomIn ? this._mapview.zoom + 1 : this._mapview.zoom - 1;

      this._mapview.goTo({
        target: this._mapview.center,
        zoom: zoomNum
      });
    }
  }

  clearAllLayers() {
    console.log('clear all layers');
    //1. Iterate over map's layers and turn them off one by one - do we toggle visibility or unload them?
    this._map?.layers.forEach(layer => (layer.visible = false));
    //2. Update redux state with visible layers array being empty
    store.dispatch(clearAllLayers());
  }

  selectAllLayers() {
    console.log('select all layers');
    const layersToEnable: string[] = [];
    this._map?.layers.forEach(layer => {
      layer.visible = true;
      layersToEnable.push(layer.id);
    });
    store.dispatch(updateVisibleLayers(layersToEnable));
  }

  toggleLayerVisibility(layerID: string) {
    //update the map
    const layer = this._map?.findLayerById(layerID);
    if (layer) {
      layer.visible = !layer.visible;
    }
    //update redux
    store.dispatch(updateVisibleLayers([layerID]));
  }

  getLayerOpacity(layerID: string) {
    const layer = this._map?.findLayerById(layerID);
    if (layer) {
      return layer.opacity;
    }
  }

  setLayerOpacity(layerID: string, value: string) {
    const layer = this._map?.findLayerById(layerID);
    if (layer) {
      layer.opacity = Number(value);
    }
  }
}

export const mapController = new MapController();

//TODO: This is for DEV only and should be removed once we deploy to prod
declare global {
  interface Window {
    mapController: any;
  }
}

window.mapController = mapController;
