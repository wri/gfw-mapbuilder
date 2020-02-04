import Map from 'esri/Map';
import MapView from 'esri/views/MapView';
import WebMap from 'esri/WebMap';
import Legend from 'esri/widgets/Legend';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import SketchViewModel from 'esri/widgets/Sketch/SketchViewModel';
import DistanceMeasurement2D from 'esri/widgets/DistanceMeasurement2D';
import AreaMeasurement2D from 'esri/widgets/AreaMeasurement2D';
import { RefObject } from 'react';
import store from '../store/index';

import {
  allAvailableLayers,
  mapError,
  isMapReady
} from 'js/store/mapview/actions';

import {
  selectActiveTab,
  toggleTabviewPanel,
  setMeasureResults
} from 'js/store/appState/actions';
import { LayerProps } from 'js/store/mapview/types';

interface ZoomParams {
  zoomIn: boolean;
}

export class MapController {
  _map: Map | undefined;
  _mapview: MapView | undefined;
  _sketchVM: SketchViewModel | undefined;
  _previousSketchGraphic: any;
  _measureByDistance: DistanceMeasurement2D | any;
  _measureByArea: AreaMeasurement2D | undefined;
  _mouseMoveEventListener: EventListener | any;
  _pointerMoveEventListener: EventListener | any;

  constructor() {
    this._map = undefined;
    this._mapview = undefined;
    this._sketchVM = undefined;
    this._previousSketchGraphic = undefined;
    this._measureByDistance = undefined;
    this._measureByArea = undefined;
    this._mouseMoveEventListener = undefined;
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
          store.dispatch(allAvailableLayers(mapLayerObjects));

          this.initializeAndSetSketch();
          this.setMeasureWidget();
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

    const { mapviewState } = store.getState();
    const newLayersArray = mapviewState.allAvailableLayers.map(
      (l: LayerProps) => {
        return {
          ...l,
          visible: false
        };
      }
    );
    store.dispatch(allAvailableLayers(newLayersArray));
  }

  selectAllLayers() {
    console.log('select all layers');
    const layersToEnable: string[] = [];
    this._map?.layers.forEach(layer => {
      layer.visible = true;
      layersToEnable.push(layer.id);
    });
    const { mapviewState } = store.getState();
    const newLayersArray = mapviewState.allAvailableLayers.map(
      (l: LayerProps) => {
        return {
          ...l,
          visible: true
        };
      }
    );
    store.dispatch(allAvailableLayers(newLayersArray));
  }

  toggleLayerVisibility(layerID: string) {
    const layer = this._map?.findLayerById(layerID);
    if (layer) {
      //1. update the map
      layer.visible = !layer.visible;
      //2. Update redux
      const { mapviewState } = store.getState();
      const newLayersArray = mapviewState.allAvailableLayers.map(l => {
        if (l.id === layerID) {
          return {
            ...l,
            visible: layer.visible
          };
        } else {
          return l;
        }
      });
      store.dispatch(allAvailableLayers(newLayersArray));
    }
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
      const { mapviewState } = store.getState();
      const newLayersArray = mapviewState.allAvailableLayers.map(l => {
        if (l.id === layerID) {
          return {
            ...l,
            opacity: layer.opacity
          };
        } else {
          return l;
        }
      });
      store.dispatch(allAvailableLayers(newLayersArray));
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

  convertSquareMetersToSpecificUnit(
    distance: number,
    distanceUnit: string
  ): number | undefined {
    let convertedValue;
    switch (distanceUnit) {
      case 'acres':
        convertedValue = distance / 4047;
        break;
      case 'square-miles':
        convertedValue = distance / 2.59e6;
        break;
      case 'square-kilometers':
        convertedValue = distance / 1e6;
        break;
      case 'hectares':
        convertedValue = distance / 10000;
        break;
      case 'square-yards':
        convertedValue = distance * 1.196;
        break;
      case 'square-us-feet':
        convertedValue = distance * 10.764;
        break;
      case 'square-meters':
        convertedValue = distance;
        break;
    }

    console.log('distanceUnit', distanceUnit);
    return convertedValue;
  }

  convertMetersToSpecificUnit(
    distance: number,
    distanceUnit: string
  ): number | undefined {
    let convertedValue;
    console.log('distanceUnit', distanceUnit);
    switch (distanceUnit) {
      case 'kilometers':
        convertedValue = distance / 1000;
        break;
      case 'feet':
      case 'us-feet':
        convertedValue = distance * 3.281;
        break;
      case 'yards':
        convertedValue = distance * 1.094;
        break;
      case 'nautical-miles':
        convertedValue = distance / 1852;
        break;
      case 'meters':
        convertedValue = distance;
        break;
      case 'miles':
      default:
        convertedValue = distance / 1609;
        break;
    }

    return convertedValue;
  }

  setMeasureWidget(): void {
    this._measureByArea = new AreaMeasurement2D({
      view: this._mapview,
      unit: 'acres'
    });

    this._measureByDistance = new DistanceMeasurement2D({
      view: this._mapview,
      unit: 'miles'
    });
  }

  getAndDispatchMeasureResults(
    selectedWidget: DistanceMeasurement2D | AreaMeasurement2D,
    measureByDistance: boolean
  ): void {
    selectedWidget?.watch('viewModel.measurement', (measurement: any) => {
      const convertedLength = this.convertMetersToSpecificUnit(
        measurement?.length,
        selectedWidget.unit
      );

      const convertedArea = this.convertSquareMetersToSpecificUnit(
        measurement?.area,
        selectedWidget.unit
      );

      const convertedPerimeter = this.convertSquareMetersToSpecificUnit(
        measurement?.perimeter,
        selectedWidget.unit
      );

      const areaResults = measureByDistance
        ? {}
        : { area: convertedArea, perimeter: convertedPerimeter };
      const distanceResults = measureByDistance
        ? { length: convertedLength }
        : {};

      selectedWidget?.watch('viewModel.state', (state: string) => {
        if (state === 'measured') {
          store.dispatch(
            setMeasureResults({
              areaResults,
              distanceResults
            })
          );
        }
      });
    });
  }

  setSpecificMeasureWidget({
    measureByDistance = false,
    setNewMeasure = false,
    unitOfLength = ''
  }: {
    measureByDistance?: boolean;
    setNewMeasure?: boolean;
    unitOfLength?: string;
  }): void {
    const selectedWidget = measureByDistance
      ? this._measureByDistance
      : this._measureByArea;

    if (setNewMeasure) {
      const newUnit = unitOfLength.length ? unitOfLength : selectedWidget?.unit;

      selectedWidget.unit = newUnit;
      // * NOTE: _measureByDistance OR _measureByArea must have a type of any for this reassignment (above) to work

      selectedWidget?.viewModel.newMeasurement();
      this.getAndDispatchMeasureResults(selectedWidget, measureByDistance);
    } else {
      this._measureByDistance.viewModel.clearMeasurement();
      this._measureByArea?.viewModel.clearMeasurement();
    }
  }

  getOnClickCoordinates(): void {
    this._pointerMoveEventListener = this._mapview?.on('click', event => {
      const coordinateMouseClickResults = this._mapview?.toMap({
        x: event.x,
        y: event.y
      });
      store.dispatch(
        setMeasureResults({
          areaResults: {},
          distanceResults: {},
          coordinateMouseClickResults
        })
      );
    });
  }

  getPointerMoveCoordinates(): void {
    this._mouseMoveEventListener = this._mapview?.on('pointer-move', event => {
      const coordinatePointerMoveResults = this._mapview?.toMap({
        x: event.x,
        y: event.y
      });
      store.dispatch(
        setMeasureResults({
          areaResults: {},
          distanceResults: {},
          coordinatePointerMoveResults
        })
      );
    });
  }

  getCoordinates(getCoordinates: boolean): void {
    if (getCoordinates) {
      this.getOnClickCoordinates();
      this.getPointerMoveCoordinates();
    } else {
      this._mouseMoveEventListener?.remove();
      this._mouseMoveEventListener = undefined;

      this._pointerMoveEventListener?.remove();
      this._pointerMoveEventListener = undefined;
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
