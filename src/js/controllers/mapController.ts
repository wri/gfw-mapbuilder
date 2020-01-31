import Map from 'esri/Map';
import MapView from 'esri/views/MapView';
import WebMap from 'esri/WebMap';
import Legend from 'esri/widgets/Legend';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import SketchViewModel from 'esri/widgets/Sketch/SketchViewModel';

import { RefObject } from 'react';
import store from '../store/index';
import {
  clearAllLayers,
  updateVisibleLayers,
  allAvailableLayers,
  mapError,
  isMapReady,
  allAvailableLayers2
} from 'js/store/mapview/actions';
import { selectActiveTab, toggleTabviewPanel } from 'js/store/appState/actions';
import { LayerProps } from 'js/store/mapview/types';

interface ZoomParams {
  zoomIn: boolean;
}

export class MapController {
  _map: Map | undefined;
  _mapview: MapView | undefined;
  _sketchVM: SketchViewModel | undefined;
  _previousSketchGraphic: any;

  constructor() {
    this._map = undefined;
    this._mapview = undefined;
    this._sketchVM = undefined;
    this._previousSketchGraphic = undefined;
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

          const mapLayerObjects: LayerProps[] = [];
          this._map?.layers.forEach((layer: any) => {
            const { id, title, opacity, visible, definitionExpression } = layer;
            mapLayerObjects.push({
              id,
              title,
              opacity,
              visible,
              definitionExpression
            });
          });
          store.dispatch(allAvailableLayers2(mapLayerObjects));

          store.dispatch(allAvailableLayers(mapLayers));
          console.log('mapview is loaded');
          this.initializeAndSetSketch();
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
  initializeAndSetSketch(): void {
    const tempGL = new GraphicsLayer({
      id: 'sketchGraphics'
    });

    this._sketchVM = new SketchViewModel({
      layer: tempGL,
      view: this._mapview,
      polylineSymbol: {
        type: 'simple-line',
        color: 'red',
        width: 3
      }
    });

    this._sketchVM?.on('create', (event: any) => {
      if (event.state === 'complete') {
        this._previousSketchGraphic = event.graphic;

        event.graphic.symbol.outline.color = [115, 252, 253];
        event.graphic.symbol.color = [0, 0, 0, 0];
        this._mapview?.graphics.add(event.graphic);

        store.dispatch(selectActiveTab('analysis'));
        store.dispatch(toggleTabviewPanel(true));
      }
    });
  }

  createPolygonSketch = () => {
    this._mapview?.graphics.remove(this._previousSketchGraphic);
    this._sketchVM?.create('polygon', { mode: 'freehand' });
  };
}

export const mapController = new MapController();

//TODO: This is for DEV only and should be removed once we deploy to prod
declare global {
  interface Window {
    mapController: any;
  }
}

window.mapController = mapController;
