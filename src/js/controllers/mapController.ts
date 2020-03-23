import Map from 'esri/Map';
import Layer from 'esri/layers/Layer';
import MapView from 'esri/views/MapView';
import WebMap from 'esri/WebMap';
import Graphic from 'esri/Graphic';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import SketchViewModel from 'esri/widgets/Sketch/SketchViewModel';
import DistanceMeasurement2D from 'esri/widgets/DistanceMeasurement2D';
import CoordinateConversion from 'esri/widgets/CoordinateConversion';
import AreaMeasurement2D from 'esri/widgets/AreaMeasurement2D';
import Polygon from 'esri/geometry/Polygon';
import Search from 'esri/widgets/Search';
import Point from 'esri/geometry/Point';
import PrintTask from 'esri/tasks/PrintTask';
import PrintTemplate from 'esri/tasks/support/PrintTemplate';
import PrintParameters from 'esri/tasks/support/PrintParameters';
import Basemap from 'esri/Basemap';
import Sublayer from 'esri/layers/support/Sublayer';
import { once } from 'esri/core/watchUtils';

import { RefObject } from 'react';
import { densityEnabledLayers } from '../../../configs/layer-config';
import store from '../store/index';
import { LayerFactory } from 'js/helpers/LayerFactory';
import { setLayerSearchSource } from 'js/helpers/mapController/searchSources';
import {
  allAvailableLayers,
  mapError,
  isMapReady,
  setActiveFeatureIndex,
  setActiveFeatures,
  changeMapScale
} from 'js/store/mapview/actions';

import { setSelectedBasemap } from 'js/store/mapview/actions';
import {
  renderModal,
  selectActiveTab,
  toggleTabviewPanel,
  setMeasureResults,
  setLanguage
} from 'js/store/appState/actions';
import {
  LayerProps,
  LayerFeatureResult,
  FeatureResult,
  LayerOrigin
} from 'js/store/mapview/types';
import { OptionType } from 'js/interfaces/measureWidget';
import { LayerFactoryObject } from 'js/interfaces/mapping';
import { Attachment, URLProperties } from 'js/interfaces/Attachment';
import { queryLayersForFeatures } from 'js/helpers/dataPanel/DataPanel';

import { setNewGraphic } from 'js/helpers/MapGraphics';
import { fetchLegendInfo } from 'js/helpers/legendInfo';

const allowedLayers = ['feature', 'dynamic', 'loss', 'gain']; //To be: tiled, webtiled, image, dynamic, feature, graphic, and custom (loss, gain, glad, etc)

interface URLCoordinates {
  zoom: number;
  latitude: string;
  longitude: string;
}

interface ZoomParams {
  zoomIn: boolean;
}

interface Popup {
  content: any;
  title: any;
}

interface RemoteDataLayer {
  // layer: object;
  layer: {
    opacity: number;
    metadata: object;
    label: object;
    url: string;
    type: string;
    popup?: Popup;
    sublabel?: object;
    // [key: string]: object
  };
  dataLayer?: {
    uuid: string;
    groupId: string;
    id: string;
    opacity?: number;
  };
  label: object;
  id: string;
  url: string;
  groupId: string;
  type: string;
  order: number;
  group: object;
}

export class MapController {
  _map: Map | undefined;
  _mapview: MapView;
  _sketchVM: SketchViewModel | undefined;
  _previousSketchGraphic: any;
  _mouseClickEventListener: EventListener | any;
  _pointerMoveEventListener: EventListener | any;
  _printTask: PrintTask | undefined;
  _selectedWidget: DistanceMeasurement2D | AreaMeasurement2D | undefined;
  _sketchVMGraphicsLayer: GraphicsLayer | undefined;

  constructor() {
    this._map = undefined;
    this._sketchVM = undefined;
    this._previousSketchGraphic = undefined;
    this._printTask = undefined;
    this._selectedWidget = undefined;
    this._sketchVMGraphicsLayer = undefined;
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

    this._mapview.ui.remove('zoom');
    this._mapview.ui.remove('attribution');

    this._mapview
      .when(
        () => {
          store.dispatch(isMapReady(true));
          //Set default language
          store.dispatch(setLanguage(appSettings.language));
          //default scale for map
          store.dispatch(changeMapScale(this._mapview.scale));
          //zoom level listener
          this._mapview.watch('scale', newScale => {
            store.dispatch(changeMapScale(newScale));
          });
          this._mapview.on('click', event => {
            //TODO: We need a better loading handling, probably a spinner!
            //clean active indexes for data tab and activeFeatures
            store.dispatch(setActiveFeatures([]));
            store.dispatch(setActiveFeatureIndex([0, 0]));
            store.dispatch(selectActiveTab('data'));
            queryLayersForFeatures(this._mapview, this._map, event);
          });

          const mapLayerObjects: LayerProps[] = this.extractLayerObjects();
          store.dispatch(allAvailableLayers(mapLayerObjects));

          this.getMoreLayers().then(res => {
            const { appState } = store.getState();

            const resourceLayerObjects: LayerProps[] = [];
            const resouceLayerSpecs: LayerFactoryObject[] = [];

            res
              .filter((resLayer: RemoteDataLayer) => {
                const resLayerType = resLayer.dataLayer
                  ? resLayer.layer.type
                  : resLayer.type;
                return allowedLayers.includes(resLayerType);
              })
              .forEach((apiLayer: RemoteDataLayer) => {
                if (!apiLayer) return; //apiLayer may be undefined if we failed to retrieve layer data from api for some reason
                let resourceId;
                let resourceTitle;

                //TODO: In the future make this separate pure function, that accepts apiLayer and returns a number (opacity)
                function determineLayerOpacity() {
                  //Try the resources.js predetermined opacity
                  let opacity = apiLayer.dataLayer?.opacity;
                  if (!opacity && opacity !== 0) {
                    //nothing in the resources to do with opacity, try the response's oapcity
                    opacity = apiLayer.layer?.opacity;
                  }
                  return opacity ?? 1; //if all fails, default to 1
                }
                const resourceOpacity = determineLayerOpacity(); //TODO: Make this dynamic

                // let resourceVisible = true; //TODO: Make this dynamic as well!
                let resourceDefinitionExpression;
                let resourceGroup;
                let url;
                let type;
                let metadata;
                let popup;
                let sublabel;
                let origin = '' as LayerOrigin;
                if (apiLayer.dataLayer) {
                  //Deal with remote data layers
                  metadata = apiLayer.layer.metadata;
                  popup = apiLayer.layer.popup;
                  sublabel = apiLayer.layer.sublabel;
                  resourceId = apiLayer.dataLayer.id;
                  resourceTitle =
                    apiLayer.layer.label[appState.selectedLanguage];
                  resourceGroup = apiLayer.dataLayer.groupId;
                  url = apiLayer.layer.url;
                  type = apiLayer.layer.type;
                  origin = 'remote';
                } else {
                  // All other service layers info should be in resources file
                  resourceId = apiLayer.id;
                  resourceTitle = apiLayer.label[appState.selectedLanguage];
                  resourceGroup = apiLayer.groupId;
                  url = apiLayer.url;
                  type = apiLayer.type;
                  origin = 'service';
                }

                resouceLayerSpecs.push({
                  id: resourceId,
                  title: resourceTitle,
                  opacity: resourceOpacity,
                  visible: false,
                  definitionExpression: resourceDefinitionExpression,
                  url: url,
                  type: type
                });

                resourceLayerObjects.push({
                  id: resourceId,
                  title: resourceTitle,
                  opacity: resourceOpacity,
                  visible: false, //TODO: I think visibility is suppose to be coming from config, this is hardcoded for now
                  definitionExpression: resourceDefinitionExpression,
                  group: resourceGroup,
                  type,
                  origin,
                  url: url,
                  sublayer: false,
                  metadata,
                  sublabel,
                  popup
                });
              });

            store.dispatch(
              allAvailableLayers([...mapLayerObjects, ...resourceLayerObjects])
            );

            const mapLayers = resouceLayerSpecs.map(resouceLayerSpec => {
              return LayerFactory(this._mapview, resouceLayerSpec);
            });

            this._map?.addMany(mapLayers);
          });

          this.initializeAndSetSketch();
        },
        (error: Error) => {
          console.log('error in re-initializeMap()', error);
          store.dispatch(mapError(true));
        }
      )
      .catch((error: Error) => {
        console.log('error in initializeMap()', error);
        store.dispatch(mapError(true));
      });
  }

  extractLayerObjects(): LayerProps[] {
    const mapLayerObjects: LayerProps[] = [];
    this._map?.layers.forEach(async (layer: any) => {
      //Get the legend information for each layer
      let legendInfo = await fetchLegendInfo(layer.url);
      if (layer.sublayers && layer.sublayers.length > 0) {
        layer.sublayers.forEach((sub: any) => {
          //get sublayer legend info
          const sublayerLegendInfo = legendInfo.layers.find(
            (l: any) => l.layerId === sub.id
          );
          //TODO:how do we handle default opacity? seems like these subs are mostly undefined for opacity
          sub.opacity = sub.opacity ? sub.opacity : 1;
          const {
            id,
            title,
            opacity,
            visible,
            definitionExpression,
            url,
            maxScale,
            minScale
          } = sub;
          mapLayerObjects.push({
            id,
            title,
            opacity,
            visible,
            definitionExpression,
            group: 'webmap',
            type: 'webmap',
            origin: 'webmap',
            url,
            maxScale,
            minScale,
            sublayer: true,
            parentID: sub.layer.id,
            legendInfo: sublayerLegendInfo.legend
          });
        });
      } else {
        //TODO: This needs research, some layers have not only "id" but also "layerId" property. Those will differ, "id" will be "parent id for mapservice", and "layerId" will be its sublayer. Tricky part is that this happens with some layers on webmap in CMR, sublayers do not show on layer itself but the presense of layerId property indicates that it is indeed a sub
        legendInfo = layer.layerId
          ? legendInfo.layers.find((l: any) => l.layerId === layer.layerId)
              .legend
          : legendInfo;
        const {
          id,
          title,
          opacity,
          visible,
          definitionExpression,
          url,
          maxScale,
          minScale
        } = layer;
        mapLayerObjects.push({
          id,
          title,
          opacity,
          visible,
          definitionExpression,
          group: 'webmap',
          type: 'webmap',
          origin: 'webmap',
          url,
          maxScale,
          minScale,
          sublayer: false,
          legendInfo
        });
      }
    });
    return mapLayerObjects;
  }

  getMoreLayers(): Promise<any> {
    const { appSettings } = store.getState();
    const { layerPanel } = appSettings;
    const detailedLayers: any = [];
    const remoteDataLayers: any = [];

    const layers = Object.keys(layerPanel)
      .filter(groupName => {
        return groupName !== 'GROUP_BASEMAP' && groupName !== 'extraLayers';
      })
      .reduce((list, groupName, groupIndex) => {
        const orderedGroups = layerPanel[groupName].layers.map((layer: any) => {
          return { groupId: groupName, ...layer };
        });
        return list.concat(orderedGroups);
      }, []);

    layers.forEach((layer: RemoteDataLayer) => {
      if (layer.type === 'remoteDataLayer') {
        remoteDataLayers.push({
          order: layer.order,
          layerGroupId: layer.groupId,
          dataLayer: layer
        });
      } else {
        detailedLayers.push(layer);
      }
    });

    const remoteDataLayerRequests = remoteDataLayers.map(
      (item: RemoteDataLayer, j: any) => {
        return fetch(
          `https://production-api.globalforestwatch.org/v1/layer/${item?.dataLayer?.uuid}`
        )
          .then(response => response.json())
          .then(json => json.data)
          .then(layer =>
            fetch(layer.attributes.layerConfig.metadata)
              .then(response => response.json())
              .then(metadata => {
                const attributes = layer.attributes;
                const itemGroup = item.group;

                // Object.keys(remoteDataLayers[j].layer).forEach(layerProp => {

                // if (layerProp !== 'type' && layerProp !== 'uuid') {
                //   if (layerProp === 'legendConfig') {
                //     attributes[layerProp] = remoteDataLayers[j].layer[layerProp];
                //   } else {
                //     layer.attributes.layerConfig[layerProp] = remoteDataLayers[j].layer[layerProp];
                //   }
                // }
                // });
                item.layer = layer.attributes.layerConfig;

                item.group = itemGroup;
                item.layer.metadata = {
                  metadata,
                  legendConfig: attributes.legendConfig
                };
                return item;
              })
          )
          .catch(error => console.error(error));
      }
    );
    detailedLayers.forEach((detailedLayer: object) => {
      remoteDataLayerRequests.push(detailedLayer);
    });
    return Promise.all(remoteDataLayerRequests);
  }

  changeLanguage(lang: string): void {
    store.dispatch(setLanguage(lang));
    const resourceLayers: Layer[] = [];
    if (this._map) {
      store
        .getState()
        .mapviewState.allAvailableLayers.filter(availableLayer => {
          //TODO: doing additional check for title existnce this is to do with graphics layers that do not get flushed when lang changes, need better solution
          return availableLayer.group !== 'webmap' && availableLayer.title;
        })
        .forEach(resourceLayer => {
          if (this._map) {
            resourceLayers.push(this._map.findLayerById(resourceLayer.id));
          }
        });

      this._map.removeMany(resourceLayers);
    }

    this._map = undefined;
    const appSettings = store.getState().appSettings;
    const newWebMap =
      lang === appSettings.language
        ? appSettings.webmap
        : appSettings.alternativeWebmap;

    this._map = new WebMap({
      portalItem: {
        id: newWebMap
      }
    });

    if (this._mapview) {
      this._mapview.map = this._map;
      this._mapview
        .when(
          () => {
            store.dispatch(isMapReady(true));

            if (this._map) {
              once(this._map, 'loaded', () => {
                const mapLayerObjects: LayerProps[] = this.extractLayerObjects();

                const prevMapObjects = store
                  .getState()
                  .mapviewState.allAvailableLayers.filter(
                    availableLayer => availableLayer.group !== 'webmap'
                  );

                store.dispatch(
                  allAvailableLayers([...prevMapObjects, ...mapLayerObjects])
                );

                this._map?.addMany(resourceLayers);
              });
            }
          },
          (error: Error) => {
            console.log('error in change Language mapView constructor', error);
            store.dispatch(mapError(true));
          }
        )
        .catch((error: Error) => {
          console.log('error in change Language mapView constructor', error);
          store.dispatch(mapError(true));
        });
    }
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

  attachCoordinatesWidget(domref: React.MutableRefObject<any>): void {
    new CoordinateConversion({
      view: this._mapview,
      container: domref.current
    });
  }

  clearAllLayers(): void {
    console.log('clear all layers');
    //1. Iterate over map's layers and turn them off one by one - do we toggle visibility or unload them?
    this._map?.layers.forEach((layer: any) => {
      if (layer.sublayers) {
        layer.sublayers.forEach((sub: any) => (sub.visible = false));
      } else {
        layer.visible = false;
      }
    });
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

  selectAllLayers(): void {
    console.log('select all layers');
    this._map?.layers.forEach((layer: any) => {
      if (layer.sublayers) {
        layer.sublayers.forEach((sub: any) => (sub.visible = true));
      } else {
        layer.visible = true;
      }
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

  removeAllGraphics(layerID: string): void {
    const layer: any = this._map?.findLayerById(layerID);
    if (layer) {
      layer.removeAll();
    }
  }

  drawGraphic(specificFeature: Array<FeatureResult>): void {
    if (this._map) {
      setNewGraphic({
        map: this._map,
        mapview: this._mapview,
        allFeatures: specificFeature,
        isUploadFile: false
      });
    }
  }

  toggleLayerVisibility(
    layerID: string,
    sublayer?: boolean,
    parentID?: string
  ): void {
    let layer = null as any;
    if (sublayer && parentID) {
      layer = this._map
        ?.findLayerById(parentID)
        //@ts-ignore -- sublayers exist
        ?.allSublayers.items.find((sub: any) => sub.id === layerID);
    } else {
      layer = this._map?.findLayerById(layerID);
    }
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

  setLayerOpacity(
    layerID: string,
    value: string,
    sublayer?: boolean,
    parentID?: string
  ): void {
    let layer = null as any;
    if (sublayer && parentID) {
      layer = this._map
        ?.findLayerById(parentID)
        //@ts-ignore -- sublayers exist
        ?.allSublayers.items.find((sub: any) => sub.id === layerID);
    } else {
      layer = this._map?.findLayerById(layerID);
    }
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

  completeSketchVM(): void {
    this._sketchVM?.complete();
  }

  deleteSketchVM(): void {
    this._sketchVM?.emit('delete');
  }

  updateSketchVM(): any {
    if (this._sketchVM && this._map && this._sketchVMGraphicsLayer) {
      this._sketchVM?.update(this._sketchVMGraphicsLayer.graphics['items'][0], {
        tool: 'reshape',
        enableRotation: false,
        toggleToolOnClick: false,
        enableScaling: false,
        preserveAspectRatio: false
      });
    }
  }

  listenToSketchDelete(): any {
    if (this._sketchVMGraphicsLayer) {
      store.dispatch(setActiveFeatures([]));
      store.dispatch(setActiveFeatureIndex([0, 0]));
      this._sketchVMGraphicsLayer.graphics['items'] = [];
    }
  }

  listenToSketchCreate(event: any): any {
    if (event.state === 'complete') {
      event.graphic.attributes = {
        OBJECTID: event.graphic.uid
      };

      event.graphic.symbol.outline.color = [115, 252, 253];
      event.graphic.symbol.color = [0, 0, 0, 0];
      //Replace all active features with our drawn feature, assigning custom layerID and Title
      const drawnFeatures: LayerFeatureResult = {
        layerID: 'user_features',
        layerTitle: 'User Features',
        // sublayerID: null,
        // sublayerTitle: null,
        features: [event.graphic],
        fieldNames: null
      };

      store.dispatch(setActiveFeatures([drawnFeatures]));
      store.dispatch(setActiveFeatureIndex([0, 0]));
      store.dispatch(selectActiveTab('analysis'));
    }
  }

  initializeAndSetSketch(): void {
    this._sketchVMGraphicsLayer = new GraphicsLayer({
      id: 'sketchGraphics'
    });

    this._sketchVM = new SketchViewModel({
      layer: this._sketchVMGraphicsLayer,
      view: this._mapview,
      polylineSymbol: {
        type: 'simple-line',
        color: 'red',
        width: 3
      }
    });

    this._map?.add(this._sketchVMGraphicsLayer);

    this._sketchVM?.on('create', (event: any) => {
      this.listenToSketchCreate(event);
    });

    this._sketchVM?.on('delete', () => {
      this.listenToSketchDelete();
    });
  }

  createPolygonSketch = (): void => {
    this.deleteSketchVM();
    store.dispatch(setActiveFeatures([]));
    store.dispatch(setActiveFeatureIndex([0, 0]));
    this._sketchVM?.create('polygon', { mode: 'freehand' });
  };

  getAndDispatchMeasureResults(optionType: OptionType): void {
    this._selectedWidget?.watch('viewModel.state', (state: string) => {
      let areaResults = {};
      let distanceResults = {};

      if (state === 'measured') {
        if (optionType === 'area') {
          areaResults = {
            area: this._selectedWidget?.viewModel.measurementLabel['area'],
            perimeter: this._selectedWidget?.viewModel.measurementLabel[
              'perimeter'
            ]
          };
        } else if (optionType === 'distance') {
          distanceResults = {
            length: this._selectedWidget?.viewModel.measurementLabel
          };
        }

        store.dispatch(
          setMeasureResults({
            activeButton: optionType,
            areaResults,
            distanceResults,
            coordinateMouseClickResults: {},
            coordinatePointerMoveResults: {}
          })
        );
      }
    });
  }

  clearAllWidgets(): void {
    this._selectedWidget?.viewModel.clearMeasurement();
    this._selectedWidget = undefined;

    this._mouseClickEventListener?.remove();
    this._mouseClickEventListener = undefined;

    this._pointerMoveEventListener?.remove();
    this._pointerMoveEventListener = undefined;
  }

  setActiveMeasureWidget(optionType: OptionType): void {
    switch (optionType) {
      case 'area':
        this._selectedWidget = new AreaMeasurement2D({
          view: this._mapview,
          unit: 'acres'
        });
        break;
      case 'distance':
        this._selectedWidget = new DistanceMeasurement2D({
          view: this._mapview,
          unit: 'miles'
        });
        break;
      case 'coordinates': {
        this._selectedWidget?.viewModel.clearMeasurement();
        this._selectedWidget = undefined;
        break;
      }
      default:
        break;
    }

    if (optionType === 'area' || optionType === 'distance') {
      this._selectedWidget?.viewModel.newMeasurement();
      this.getAndDispatchMeasureResults(optionType);
    }
  }

  updateSelectedMeasureWidget(
    optionType: OptionType,
    selectedUnit: AreaMeasurement2D['unit'] | DistanceMeasurement2D['unit']
  ): void {
    let areaResults = {};
    let distanceResults = {};

    if (this._selectedWidget) {
      this._selectedWidget.unit = selectedUnit;
      switch (optionType) {
        case 'area':
          areaResults = {
            area: this._selectedWidget.viewModel.measurementLabel['area'],
            perimeter: this._selectedWidget.viewModel.measurementLabel[
              'perimeter'
            ]
          };
          break;
        case 'distance':
          distanceResults = {
            length: this._selectedWidget.viewModel.measurementLabel
          };
          break;
        default:
          break;
      }

      store.dispatch(
        setMeasureResults({
          activeButton: optionType,
          areaResults,
          distanceResults,
          coordinateMouseClickResults: {},
          coordinatePointerMoveResults: {}
        })
      );
      this._selectedWidget?.watch('viewModel.state', (state: string) => {
        if (state === 'measured') {
          this.updateMeasureWidgetOnClick();
        }
      });
    }
  }

  // updateOnClickCoordinates(selectedDropdownOption: string): void {
  //   const {
  //     coordinateMouseClickResults
  //   } = store.getState().appState.measureContent;
  //   const isDMS = selectedDropdownOption === 'dms';
  //   const isDecimal = selectedDropdownOption === 'decimal';

  //   if (
  //     coordinateMouseClickResults?.latitude &&
  //     coordinateMouseClickResults?.longitude &&
  //     isDMS
  //   ) {
  //     // TODO - convert decimal to DMS
  //     // * NOTE - Will need to revisit this logic
  //     // * NOTE - Will need to explicitly update other ...Results property of Redux state

  //     store.dispatch(
  //       setMeasureResults({
  //         areaResults: {},
  //         distanceResults: {},
  //         coordinateMouseClickResults: {}
  //       })
  //     );
  //   } else if (
  //     coordinateMouseClickResults?.latitude &&
  //     coordinateMouseClickResults?.longitude &&
  //     isDecimal
  //   ) {
  //     // TODO - convert DMS to decimal
  //   }
  // }

  updateMeasureWidgetOnClick(): void {
    const mapviewOnClick = this._mapview?.on('click', event => {
      event.stopPropagation();
      this._selectedWidget?.viewModel.newMeasurement();
      mapviewOnClick?.remove();
    });
  }

  // setOnClickCoordinates(selectedDropdownOption: string): void {
  //   this._mouseClickEventListener = this._mapview?.on('click', event => {
  //     event.stopPropagation();
  //     let coordinateMouseClickResults = {};
  //     const coordinatesInDecimals = this._mapview?.toMap({
  //       x: event.x,
  //       y: event.y
  //     });

  //     if (selectedDropdownOption === 'degree') {
  //       // TODO - convert to degree
  //     } else if (selectedDropdownOption === 'dms') {
  //       // TODO - convert to dms
  //     }

  //     store.dispatch(
  //       setMeasureResults({
  //         areaResults: {},
  //         distanceResults: {},
  //         coordinateMouseClickResults
  //       })
  //     );
  //   });
  // }

  // setPointerMoveCoordinates(selectedDropdownOption: string): void {
  //   this._pointerMoveEventListener = this._mapview?.on(
  //     'pointer-move',
  //     event => {
  //       event.stopPropagation();
  //       let coordinatePointerMoveResults = {};
  //       const coordinatesInDecimals = this._mapview?.toMap({
  //         x: event.x,
  //         y: event.y
  //       });

  //       if (selectedDropdownOption === 'Degree') {
  //         // TODO - convert to degree
  //       } else if (selectedDropdownOption === 'DMS') {
  //         // TODO - convert to DMS
  //       }

  //       store.dispatch(
  //         setMeasureResults({
  //           areaResults: {},
  //           distanceResults: {},
  //           coordinatePointerMoveResults
  //         })
  //       );
  //     }
  //   );
  // }

  generateMapPDF = async (layoutType: string): Promise<any> => {
    const printServiceURL = store.getState().appSettings.printServiceUrl;

    if (!this._printTask) {
      this._printTask = new PrintTask({
        url: printServiceURL
      });
    }

    const template = new PrintTemplate({
      format: 'pdf',
      layout: layoutType as any,
      // * NOTE - must set 'layout' as type of 'any' in order to assign
      // * custom layout types from GFW print service URL
      layoutOptions: {
        scalebarUnit: 'Kilometers',
        customTextElements: [
          { title: 'GFW Mapbuilder' },
          { subtitle: 'Make maps that matter' }
        ]
      }
    });

    const params = new PrintParameters({
      view: this._mapview,
      template
    });

    const mapPDF = await this._printTask
      ?.execute(params)
      .catch(e => console.log('error in generateMapPDF()', e));

    return mapPDF;
  };

  setPolygon = (points: Array<Point>): void => {
    const simpleFillSymbol = {
      type: 'simple-fill', // autocasts as new SimpleFillSymbol()
      color: [240, 171, 0, 0.0],
      outline: {
        // autocasts as new SimpleLineSymbol()
        color: [0, 255, 254],
        width: 2
      }
    };

    this._mapview.graphics.removeAll();

    const polygon = new Polygon().addRing(points);

    const graphic = new Graphic({
      geometry: polygon,
      symbol: simpleFillSymbol
    });
    this._mapview.graphics.add(graphic);

    this._mapview.goTo(
      {
        target: graphic
      },
      {
        duration: 1000
      }
    );
    store.dispatch(renderModal(''));
  };

  async initializeSearchWidget(searchRef: RefObject<any>): Promise<void> {
    const allSources = await setLayerSearchSource();

    new Search({
      view: this._mapview,
      container: searchRef.current,
      sources: allSources
    });
  }

  setSearchWidget(latitude: string, longitude: string): void {
    this._mapview.graphics.removeAll();

    const specificPoint = new Point({
      latitude: Number(latitude),
      longitude: Number(longitude)
    });

    const simpleMarkerSymbol = {
      type: 'simple-marker',
      color: [240, 171, 0],
      outline: {
        color: [255, 255, 255],
        width: 1
      }
    };

    const pointGraphic = new Graphic({
      geometry: specificPoint,
      symbol: simpleMarkerSymbol
    });

    this._mapview.graphics.add(pointGraphic);
    this._mapview.goTo(
      {
        target: specificPoint,
        zoom: 10
      },
      {
        duration: 1000
      }
    );
    store.dispatch(renderModal(''));
  }

  updateDensityValue(value: number): void {
    densityEnabledLayers.forEach((layerId: string) => {
      const layer: any = this._map?.findLayerById(layerId);
      if (layer) {
        layer.urlTemplate = layer.urlTemplate.replace(
          /(tc)(?:[^\/]+)/,
          `tc${value}`
        );
        layer.refresh();
      }
    });
  }

  getMapviewCoordinates(): URLCoordinates {
    const { zoom } = this._mapview;
    const { latitude, longitude } = this._mapview.center;

    const subStringLatitude = latitude.toString().substring(0, 7);
    const subStringLongitude = longitude.toString().substring(0, 7);

    return {
      latitude: subStringLatitude,
      longitude: subStringLongitude,
      zoom
    };
  }

  setActiveBasemap(id: string): void {
    if (this._map) {
      const basemap = Basemap.fromId(id);
      this._map.basemap = basemap;
      store.dispatch(setSelectedBasemap(id));
    }
  }

  processGeojson(esriJson: Array<FeatureResult>): void {
    if (this._map) {
      setNewGraphic({
        map: this._map,
        mapview: this._mapview,
        allFeatures: esriJson,
        isUploadFile: true
      });
    }

    // ? Do we need the v1 logic below?

    // const graphicsExtent = graphicsUtils.graphicsExtent(graphics);
    // const layer = this.context.map.getLayer(layerKeys.USER_FEATURES);
    // if (layer) {
    //   this.context.map.setExtent(graphicsExtent, true);

    //   const geometryService = new GeometryService(
    //     'https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer'
    //   );
    //   var params = new ProjectParameters();

    //   // Set the projection of the geometry for the image server
    //   params.outSR = new SpatialReference(102100);
    //   params.geometries = [];

    //   graphics.forEach(feature => {
    //     params.geometries.push(feature.geometry);
    //   });

    //   // update the graphics geometry with the new projected geometry
    //   const successfullyProjected = geometries => {
    //     graphics.forEach((graphic, i) => {
    //       graphic.geometry = geometries[i];
    //       layer.add(graphic);
    //       if (i === geometries.length - 1) {
    //         geometryUtils
    //           .generateDrawnPolygon(graphic.geometry)
    //           .then(registeredGraphic => {
    //             this.context.map.infoWindow.setFeatures([registeredGraphic]);
    //           });
    //       }
    //     });
    //   };
    //   const failedToProject = err => {
    //     console.log('Failed to project the geometry: ', err);
    //   };
    //   geometryService
    //     .project(params)
    //     .then(successfullyProjected, failedToProject);
    // }
    // this.setState({ isUploading: false });
  }

  updateBaseTile(id: string, range: Array<number>): void {
    const [startYear, endYear] = range;
    const specificLayer = this._map?.findLayerById(id) as __esri.BaseTileLayer;

    if (specificLayer) {
      (specificLayer as any).minYear = startYear;
      (specificLayer as any).maxYear = endYear;
      specificLayer.refresh();
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
