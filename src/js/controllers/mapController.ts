import Map from 'esri/Map';
import MapView from 'esri/views/MapView';
import WebMap from 'esri/WebMap';
import Legend from 'esri/widgets/Legend';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import SketchViewModel from 'esri/widgets/Sketch/SketchViewModel';
import DistanceMeasurement2D from 'esri/widgets/DistanceMeasurement2D';
import AreaMeasurement2D from 'esri/widgets/AreaMeasurement2D';

import { RefObject } from 'react';

import {
  convertSquareMetersToSpecificUnit,
  convertMetersToSpecificUnit
} from 'js/utils/helper.util';

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
  _mouseClickEventListener: EventListener | any;
  _pointerMoveEventListener: EventListener | any;

  constructor() {
    this._map = undefined;
    this._mapview = undefined;
    this._sketchVM = undefined;
    this._previousSketchGraphic = undefined;
    this._measureByDistance = undefined;
    this._measureByArea = undefined;
    this._mouseClickEventListener = undefined;
    this._pointerMoveEventListener = undefined;
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

  convertDecimalToDMS(coordinateResults: any): object {
    const { latitude, longitude } = coordinateResults;

    const latitudeInteger = Math.floor(latitude);
    const latitudeMinutes = Math.floor((latitude % 1) * 60);
    const latitudeSeconds = Math.floor((latitudeMinutes % 1) * 60);

    const longitudeInteger = Math.floor(longitude);
    const longitudeMinutes = Math.floor((longitude % 1) * 60);
    const longitudeSeconds = Math.floor((longitudeMinutes % 1) * 60);

    const latitudeInDMS = `${latitudeInteger}°${latitudeMinutes}'${latitudeSeconds}"`;
    const longitudeInDMS = `${longitudeInteger}°${longitudeMinutes}'${longitudeSeconds}"`;

    return {
      latitude: latitudeInDMS,
      longitude: longitudeInDMS
    };
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
    optionType?: string
  ): void {
    selectedWidget?.watch('viewModel.measurement', (measurement: any) => {
      let areaResults = {};
      let distanceResults = {};

      switch (optionType) {
        case 'area': {
          const convertedArea = convertSquareMetersToSpecificUnit(
            measurement?.area,
            selectedWidget.unit
          );

          const convertedPerimeter = convertSquareMetersToSpecificUnit(
            measurement?.perimeter,
            selectedWidget.unit
          );
          areaResults = { area: convertedArea, perimeter: convertedPerimeter };
          break;
        }
        case 'distance': {
          const convertedLength = convertMetersToSpecificUnit(
            measurement?.length,
            selectedWidget.unit
          );
          distanceResults = { length: convertedLength };
          break;
        }
        case 'coordinates':
          // do something
          break;
        default:
          break;
      }

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

  clearAllWidgets(): void {
    this._mouseClickEventListener?.remove();
    this._mouseClickEventListener = undefined;

    this._pointerMoveEventListener?.remove();
    this._pointerMoveEventListener = undefined;

    this._measureByDistance.viewModel.clearMeasurement();
    this._measureByArea?.viewModel.clearMeasurement();
  }

  setActiveMeasureWidget(
    optionType: string,
    selectedDropdownOption: string
  ): void {
    let selectedWidget;

    switch (optionType) {
      case 'area':
        selectedWidget = this._measureByArea;
        break;
      case 'distance':
        selectedWidget = this._measureByDistance;
        break;
      case 'coordinates': {
        this.setOnClickCoordinates(selectedDropdownOption);
        this.setPointerMoveCoordinates(selectedDropdownOption);
        break;
      }
      default:
        break;
    }

    if (optionType === 'area' || optionType === 'distance') {
      selectedWidget?.viewModel.newMeasurement();
      this.getAndDispatchMeasureResults(selectedWidget, optionType);
    }
  }

  // setSpecificMeasureWidget({
  //   measureByDistance = false,
  //   setNewMeasure = false, // TODO - delete setNewMeasure
  //   unitOfLength = ''
  // }: {
  //   measureByDistance?: boolean;
  //   setNewMeasure?: boolean;
  //   unitOfLength?: string;
  // }): void {
  //   const selectedWidget = measureByDistance
  //     ? this._measureByDistance
  //     : this._measureByArea;

  //   this._measureByDistance.viewModel.clearMeasurement();
  //   this._measureByArea?.viewModel.clearMeasurement();

  //   selectedWidget.unit = unitOfLength.length
  //     ? unitOfLength
  //     : selectedWidget?.unit;
  // * NOTE: _measureByDistance OR _measureByArea must have a type of any for this reassignment (above) to work

  //   selectedWidget?.viewModel.newMeasurement();
  //   this.getAndDispatchMeasureResults(selectedWidget, measureByDistance);
  // }

  setOnClickCoordinates(selectedDropdownOption: string): void {
    this._mouseClickEventListener = this._mapview?.on('click', event => {
      event.stopPropagation();
      let coordinateMouseClickResults;
      const coordinatesInDecimals = this._mapview?.toMap({
        x: event.x,
        y: event.y
      });

      if (selectedDropdownOption === 'Degree') {
        coordinateMouseClickResults = coordinatesInDecimals;
      } else if (selectedDropdownOption === 'DMS') {
        coordinateMouseClickResults = this.convertDecimalToDMS(
          coordinatesInDecimals
        );
      }

      store.dispatch(
        setMeasureResults({
          areaResults: {},
          distanceResults: {},
          coordinateMouseClickResults
        })
      );
    });
  }

  setPointerMoveCoordinates(selectedDropdownOption: string): void {
    this._pointerMoveEventListener = this._mapview?.on(
      'pointer-move',
      event => {
        event.stopPropagation();
        let coordinatePointerMoveResults;
        const coordinatesInDecimals = this._mapview?.toMap({
          x: event.x,
          y: event.y
        });

        if (selectedDropdownOption === 'Degree') {
          coordinatePointerMoveResults = coordinatesInDecimals;
        } else if (selectedDropdownOption === 'DMS') {
          coordinatePointerMoveResults = this.convertDecimalToDMS(
            coordinatesInDecimals
          );
        }

        store.dispatch(
          setMeasureResults({
            areaResults: {},
            distanceResults: {},
            coordinatePointerMoveResults
          })
        );
      }
    );
  }

  setCoordinates(unitIsDMS = false): void {
    // this.setOnClickCoordinates(unitIsDMS);
    // this.setPointerMoveCoordinates(unitIsDMS);
  }

  clearCoordinates(): void {
    this._mouseClickEventListener?.remove();
    this._mouseClickEventListener = undefined;

    this._pointerMoveEventListener?.remove();
    this._pointerMoveEventListener = undefined;
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
