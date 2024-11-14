import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';
import ScaleBar from '@arcgis/core/widgets/ScaleBar';
import Attribution from '@arcgis/core/widgets/Attribution';
import Basemap from '@arcgis/core/Basemap';
import WebTileLayer from '@arcgis/core/layers/WebTileLayer';
import Point from '@arcgis/core/geometry/Point';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import AreaMeasurement2D from '@arcgis/core/widgets/AreaMeasurement2D';
import DistanceMeasurement2D from '@arcgis/core/widgets/DistanceMeasurement2D';
import SketchViewModel from '@arcgis/core/widgets/Sketch/SketchViewModel';
import CoordinateConversion from '@arcgis/core/widgets/CoordinateConversion';
import TileLayer from '@arcgis/core/layers/TileLayer';
import esriConfig from '@arcgis/core/config';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import Portal from '@arcgis/core/portal/Portal';
import Search from '@arcgis/core/widgets/Search.js';
import Polygon from '@arcgis/core/geometry/Polygon';
import * as print from '@arcgis/core/rest/print';
import PrintTemplate from '@arcgis/core/rest/support/PrintTemplate';
import PrintParameters from '@arcgis/core/rest/support/PrintParameters';
import { format, parse, subDays } from 'date-fns';
import { debounce } from 'lodash-es';
import { getMaxDateForViirsTiles } from '../helpers/viirsLayerUtil';
import {
  densityEnabledLayers,
  landsatBaselayerURL,
  LAYER_IDS,
  supportedLayers,
  WRIBasemapConfig,
} from '../../../configs/layer-config';
import { RefObject } from 'react';
import store from '../store/index';
import { LayerFactory } from '../helpers/LayerFactory';
import { setLayerSearchSource } from '../helpers/mapController/searchSources';
import { getSortedLayers } from '../helpers/mapController/layerSorting';
import { addPointGraphic, clearGraphics, drawIntersectingGraphic, setNewGraphic } from '../helpers/MapGraphics';
import {
  allAvailableLayers,
  changeMapCenterCoordinates,
  changeMapScale,
  isMapReady,
  mapError,
  setActiveFeatureIndex,
  setActiveFeatures,
  setDocuments,
  setLayersLoading,
  setSelectedBasemap,
  setUserCoordinates,
} from '../store/mapview/actions';
import {
  renderModal,
  selectActiveTab,
  setAnalysisFeatureList,
  setGladEnd,
  setGladStart,
  setLanguage,
  setMeasureResults,
  setModisEnd,
  setModisStart,
  setViirsEnd,
  setViirsStart,
} from '../store/appState/actions';
import { FeatureResult, LayerFeatureResult, LayerProps } from '../store/mapview/types';
import { OptionType } from '../types/measureWidget';
import { queryLayersForFeatures } from '../helpers/dataPanel/DataPanel';

import { MODISLayerIDs } from '../../../configs/modis-viirs';
import { getLayerInfoFromURL, LayerInfo, parseURLandApplyChanges } from '../helpers/shareFunctionality';
import {
  determineLayerOpacity,
  determineLayerVisibility,
  extractWebmapLayerObjects,
  getRemoteAndServiceLayers,
  requestWMSLayerLegendInfo,
} from '../helpers/mapController/miscLayerHelpers';
import legendInfoController from '../helpers/legendInfo';
import { parseExtentConfig } from '../helpers/mapController/configParsing';
import { overwriteColorTheme } from '../store/appSettings/actions';
import { errorTranslations } from '../../../configs/translations/error.translations';

interface URLCoordinates {
  zoom: number;
  latitude: string;
  longitude: string;
}

interface ZoomParams {
  zoomIn: boolean;
}

export class MapController {
  _map: __esri.Map | undefined;
  _mapview: any;
  _sketchVM: __esri.SketchViewModel | undefined;
  _sketchMultipleVM: __esri.SketchViewModel | undefined;
  _previousSketchGraphic: any;
  _mouseClickEventListener: EventListener | any;
  _pointerMoveEventListener: EventListener | any;
  _printTask: __esri.PrintTask | undefined;
  _selectedWidget: __esri.DistanceMeasurement2D | __esri.AreaMeasurement2D | undefined;
  _sketchVMGraphicsLayer: __esri.GraphicsLayer | undefined;
  _sketchMultipleGLayer: __esri.GraphicsLayer | undefined;
  _domRef: RefObject<any>;
  _imageryOpacity: number;
  _mouseTrackingEvent: IHandle | undefined;
  _webmapBasemap: __esri.Basemap | undefined;
  _planetBasemap: __esri.Basemap | undefined;
  _GraphicsLayer: undefined | any;
  _Polygon: undefined | any;
  _Graphic: undefined | any;

  constructor() {
    this._map = undefined;
    this._mapview = undefined;
    this._sketchVM = undefined;
    this._sketchMultipleVM = undefined;
    this._previousSketchGraphic = undefined;
    this._printTask = undefined;
    this._selectedWidget = undefined;
    this._sketchVMGraphicsLayer = undefined;
    this._mouseTrackingEvent = undefined;
    this._webmapBasemap = undefined;
    this._planetBasemap = undefined;
    this._GraphicsLayer = undefined;
    this._Polygon = undefined;
    this._Graphic = undefined;
  }

  async initializeMap(domRef: RefObject<any>): Promise<void> {
    this._domRef = domRef;
    const { appSettings, appState } = store.getState();

    this._GraphicsLayer = GraphicsLayer;
    this._Polygon = Polygon;

    this._Graphic = Graphic;

    const webmapID =
      appState.selectedLanguage === appSettings.language ? appSettings.webmap : appSettings.alternativeWebmap;

    this._map = new WebMap({
      portalItem: {
        id: webmapID,
        portal: new Portal({ url: appSettings.sharinghost }),
      },
    });

    this._mapview = new MapView({
      map: this._map,
      container: domRef.current,
    });

    //if we have init extent, use it.
    if (appSettings.initialExtent) {
      const parsedInitExtent = parseExtentConfig(appSettings.initialExtent);
      if (parsedInitExtent.center) {
        //@ts-ignore
        this._mapview.center = parsedInitExtent.center;
      }
      if (parsedInitExtent.zoom && this._mapview) {
        this._mapview.zoom = parsedInitExtent.zoom;
      }
    }

    this._mapview!.ui.remove('zoom');
    this._mapview!.ui.remove('attribution');

    this.setPageTitle(
      appState.selectedLanguage,
      appSettings.language,
      appSettings.title,
      appSettings.alternativeLanguageTitle
    );

    //Set Default Theme in case we have empty string indicating no theme
    const customColorTheme = appSettings.customColorTheme;
    if (customColorTheme.length === 0) {
      const defaultTheme = '#f0ab00';
      store.dispatch(overwriteColorTheme(defaultTheme));
    }

    function syncExtent(ext: __esri.Extent, mapview: __esri.MapView): any {
      const { latitude, longitude } = ext.center;
      store.dispatch(changeMapCenterCoordinates({ latitude, longitude }));
      store.dispatch(changeMapScale(mapview.scale));
    }

    const throtthledUpdater = debounce(syncExtent, 1500, { trailing: true });

    this._mapview!.when(
      async () => {
        store.dispatch(isMapReady(true));
        //default scale for map
        this._webmapBasemap = this._map?.basemap.clone();
        if (!this._mapview) return;
        store.dispatch(changeMapScale(this._mapview.scale));
        const { latitude, longitude } = this._mapview.center;
        store.dispatch(changeMapCenterCoordinates({ latitude, longitude }));
        this._mapview!.watch('extent', (newExtent) => {
          if (!this._mapview) return;
          throtthledUpdater(newExtent, this._mapview);
        });

        //Set layer default dates
        this.setVIIRSDates();
        this.setGLADDates();

        this._mapview!.on('click', (event) => {
          //clear out map graphics
          clearGraphics();

          //clean active indexes for data tab and activeFeatures
          store.dispatch(setActiveFeatures([]));
          store.dispatch(setActiveFeatureIndex([0, 0]));
          store.dispatch(selectActiveTab('data'));

          //If user is clicking on the drawn/upload polygon, we should not query all other layers as well, we should just accept that we have clicked on user feature on the map
          const clickGeo = event.mapPoint;
          const userFeatLayer = this._map?.findLayerById('user_features') as any;

          if (userFeatLayer && userFeatLayer?.graphics?.items.length) {
            const activeOutlineColor = [115, 252, 253];
            const inactiveOutlineColor = [3, 188, 255];
            //In the event of multiple graphics items on the layer (situation with multi polygon uploads) we iterate over then and find if any are intersecting with click

            //Go over all graphics on the user_features layer and find which ones we are clicking on (if any)
            const graphicsWeClickedOn = userFeatLayer.graphics.items.filter((graphic: __esri.Graphic) => {
              return geometryEngine.within(clickGeo, graphic.geometry);
            });

            if (graphicsWeClickedOn.length !== 0) {
              const graphicIndex = graphicsWeClickedOn[0].attributes?.attributeIndex
                ? graphicsWeClickedOn[0].attributes.attributeIndex
                : 0;

              const graphicsWeMissed = userFeatLayer.graphics.items.filter((item: any) => {
                return item.attributes.attributeIndex !== graphicIndex;
              });

              //Update colors on multi poly layer
              const copyGraphicsWeClickedOn = graphicsWeClickedOn[0].clone();
              copyGraphicsWeClickedOn.symbol.outline.color = activeOutlineColor;
              this._sketchVMGraphicsLayer!.remove(graphicsWeClickedOn[0]);
              this._sketchVMGraphicsLayer!.add(copyGraphicsWeClickedOn);

              //Update colors on the rest of the graphics
              graphicsWeMissed.forEach((graphic: any) => {
                const graphicCopy = graphic.clone();
                graphicCopy.symbol.outline.color = inactiveOutlineColor;
                this._sketchVMGraphicsLayer!.remove(graphic);
                this._sketchVMGraphicsLayer!.add(graphicCopy);
              });
              //create and sort features because sorting gets out of whack due to this updating process
              const userFeatures = userFeatLayer.graphics.items
                .map((graphic: __esri.Graphic) => {
                  return {
                    attributes: graphic.attributes,
                    geometry: graphic.geometry,
                  };
                })
                .sort((a: any, b: any) => a.attributes.attributeIndex - b.attributes.attributeIndex);

              const featuresOnMap: LayerFeatureResult = {
                layerID: 'user_features',
                layerTitle: 'User Features',
                features: userFeatures,
                fieldNames: null,
              };

              store.dispatch(setActiveFeatures([featuresOnMap]));
              store.dispatch(setActiveFeatureIndex([0, graphicIndex]));
              store.dispatch(selectActiveTab('analysis'));
            } else {
              if (!this._mapview) return;
              //pass through to normal click handler to query features on layers
              queryLayersForFeatures(this._mapview, this._map, event);
            }
          } else {
            if (!this._mapview) return;
            queryLayersForFeatures(this._mapview, this._map, event);
          }
        });

        //In case of sharing functionality, check for URL containing layer visibility and opacity information
        const layerInfosFromURL = getLayerInfoFromURL();

        //@ts-ignore -- this ensures that webmap layers are ready on map before the steps get initialized
        Promise.all(this._map?.layers.items.map((l) => l.load())).then(async () => {
          //Add layers that are already on the map (webmap layers) to redux array
          const mapLayerObjects: LayerProps[] = await extractWebmapLayerObjects(this._map);
          store.dispatch(allAvailableLayers(mapLayerObjects));

          //Fetching all other (non webmap) layer information from resources file AND GFW Api for those that are deemed as 'remoteDataLayer' in the config
          const remoteAndServiceLayersObjects = await getRemoteAndServiceLayers();

          const getErrorLayers = remoteAndServiceLayersObjects.filter((layer) => layer?.isError);

          //TODO: move this elsewhere
          //Remove those layers that we do not support,
          const allowedRemoteLayersObjects = remoteAndServiceLayersObjects.filter((layerObject: any) => {
            const layerType = layerObject?.dataLayer ? layerObject?.layer?.type : layerObject?.type;
            return supportedLayers.includes(layerType);
          });

          const remoteLayerObjects: LayerProps[] = [];
          for (const remoteLayerObject of allowedRemoteLayersObjects) {
            if (!remoteLayerObject) continue; //remoteLayerObject may be undefined if we failed to retrieve layer data from api for some reason

            const newRemoteLayerObject = {} as LayerProps;
            //Depending if layer is from GFW API or Resource (config file) construct object appropriately
            newRemoteLayerObject['opacity'] = {
              combined: determineLayerOpacity(remoteLayerObject, layerInfosFromURL),
              fill: 1,
              outline: 1,
            };

            newRemoteLayerObject['visible'] = determineLayerVisibility(remoteLayerObject, layerInfosFromURL);
            newRemoteLayerObject.isMetadataError = remoteLayerObject?.isMetadataError;
            //dealing with GFW API layers
            //TODO: This needs a major rethink/rework
            if (remoteLayerObject?.dataLayer) {
              newRemoteLayerObject.popup = remoteLayerObject.layer.popup;
              newRemoteLayerObject.sublabel = remoteLayerObject.layer.sublabel;
              newRemoteLayerObject.id = remoteLayerObject.dataLayer.id;
              newRemoteLayerObject.title =
                remoteLayerObject.layer.label[appState.selectedLanguage] ||
                `Untranslated layer id: ${remoteLayerObject.dataLayer.id}`;
              newRemoteLayerObject.group = remoteLayerObject.dataLayer.groupId;
              newRemoteLayerObject.url = remoteLayerObject.layer.url;
              newRemoteLayerObject.type = remoteLayerObject.layer.type;
              newRemoteLayerObject.origin = 'remote';
              newRemoteLayerObject.label = remoteLayerObject.layer.label;
              newRemoteLayerObject.metadata = remoteLayerObject.layer.metadata;
              newRemoteLayerObject.metadata.colormap = remoteLayerObject.layer.colormap;
              newRemoteLayerObject.metadata.inputRange = remoteLayerObject.layer.inputRange;
              newRemoteLayerObject.metadata.outputRange = remoteLayerObject.layer.outputRange;
              newRemoteLayerObject.parentID = undefined;
              newRemoteLayerObject.legendInfo = remoteLayerObject.layer.metadata.legendConfig;
              newRemoteLayerObject.dashboardURL = remoteLayerObject.dashboardURL;
              newRemoteLayerObject.popup = remoteLayerObject.popup;
              newRemoteLayerObject.searchField = remoteLayerObject.searchField;
            } else {
              if (remoteLayerObject.versions && remoteLayerObject.versions[0].url) {
                remoteLayerObject.layerIds = remoteLayerObject.versions[0].layerIds;
                remoteLayerObject.url = remoteLayerObject.versions[0].url;
                remoteLayerObject.versionIndex = 0;
              }

              if (remoteLayerObject.type === 'wms') {
                newRemoteLayerObject.legendInfo = await requestWMSLayerLegendInfo(
                  remoteLayerObject.url,
                  remoteLayerObject.layerName || remoteLayerObject.layer
                );
              } else {
                //Attempt to fetch legend info from layer service
                newRemoteLayerObject.legendInfo = await this.retrieveLegendInfo(remoteLayerObject);
              }

              newRemoteLayerObject.id = remoteLayerObject.id;
              newRemoteLayerObject.title = remoteLayerObject.label[appState.selectedLanguage]
                ? remoteLayerObject.label[appState.selectedLanguage]
                : 'Untitled Layer';
              newRemoteLayerObject.group = remoteLayerObject.groupId;
              newRemoteLayerObject.url = remoteLayerObject.url;
              newRemoteLayerObject.type = remoteLayerObject.type;
              newRemoteLayerObject.origin = 'service';
              newRemoteLayerObject.technicalName = remoteLayerObject.technicalName;
              newRemoteLayerObject.portalItemID = remoteLayerObject.portalItemID;

              newRemoteLayerObject.layerIds = remoteLayerObject.layerIds;
              newRemoteLayerObject.layerName = remoteLayerObject.layerName || remoteLayerObject.layer;
              newRemoteLayerObject.label = remoteLayerObject.label;
              newRemoteLayerObject.sublabel = remoteLayerObject.sublabel;
              newRemoteLayerObject.parentID = undefined;
              newRemoteLayerObject.filterLabel = remoteLayerObject.filterLabel;
              newRemoteLayerObject.filterField = remoteLayerObject.filterField;
              newRemoteLayerObject.versions = remoteLayerObject.versions;
              newRemoteLayerObject.versionIndex = remoteLayerObject.versionIndex;
              newRemoteLayerObject.versionHeaderText = remoteLayerObject.versionHeaderText;
              newRemoteLayerObject.dashboardURL = remoteLayerObject?.dashboardURL;
              newRemoteLayerObject.popup = remoteLayerObject.popup;
            }

            remoteLayerObjects.push(newRemoteLayerObject);
          }
          const allLayerObjects = [...mapLayerObjects, ...remoteLayerObjects];
          parseURLandApplyChanges();

          //Sync the incoming state from URL hash with webmap layers that have been just loaded in the map
          if (layerInfosFromURL.length) {
            //Sync visibility with existing layer objects before we push them into redux
            allLayerObjects.forEach((layerObject) => {
              const urlLayer = layerInfosFromURL.find((l) => {
                const id = String(l.sublayerID ? l.sublayerID : l.layerID);
                return id === String(layerObject.id);
              });
              layerObject.visible = !!urlLayer;
            });

            //Sync esri map visibility
            this.syncWebmapLayersWithURL(layerInfosFromURL);
          }

          // if layers fail to load, we add them to the layer list with error message
          if (getErrorLayers?.length) {
            const appendMissingProps = getErrorLayers.map((layer) => {
              return {
                ...layer,
                visible: false,
                opcity: { combined: 1, fill: 1, outline: 1 },
                legendInfo: null,
                id: layer.dataLayer.id,
                label: null,
                sublabel: {
                  en: `Layer ID "${layer.dataLayer?.id}"`,
                  az: `Layer ID "${layer.dataLayer?.id}"`,
                  nl: `Layer ID "${layer.dataLayer?.id}"`,
                  hy: `Layer ID "${layer.dataLayer?.id}"`,
                  ka: `Layer ID "${layer.dataLayer?.id}"`,
                  fr: `Layer ID "${layer.dataLayer?.id}"`,
                  es: `Layer ID "${layer.dataLayer?.id}"`,
                  pt: `Layer ID "${layer.dataLayer?.id}"`,
                  id: `Layer ID "${layer.dataLayer?.id}"`,
                  zh: `Layer ID "${layer.dataLayer?.id}"`,
                },
                layerName: null,
                title: errorTranslations[appState.selectedLanguage].text,
                parentID: null,
                origin: 'remote',
                portalItemID: null,
                technicalName: null,
                type: layer.type,
                url: null,
                group: layer.dataLayer.groupId,
              };
            });
            allLayerObjects.push(...appendMissingProps);
          }
          store.dispatch(allAvailableLayers(allLayerObjects));
          const esriRemoteLayersPromises: any = remoteLayerObjects.map((layerObject) => {
            return LayerFactory(this._mapview, layerObject);
          });

          Promise.all(esriRemoteLayersPromises.map((p: any) => p.catch(() => undefined))).then((values) => {
            const esriRemoteLayers = values.filter((v) => v);
            // const modisLayers = this.initializeAndSetMODISLayers(MapImageLayer);
            const allLayers: any = [...esriRemoteLayers];
            const report = new URL(window.location.href).searchParams.get('report');

            //If we have report active, we need to know when our feature layer has loaded
            if (report && report === 'true') {
              const layerID = new URL(window.location.href).searchParams.get('acLayer');
              if (!layerID) return;
              const combinedLayers = [...allLayers, ...(this._map as any)?.layers.items];
              const activeLayer = combinedLayers.find((l) => l.id === layerID);
              if (!activeLayer || activeLayer.loaded === true) {
                store.dispatch(setLayersLoading(false));
              } else {
                reactiveUtils
                  .whenOnce(() => this._mapview.loaded)
                  .then(() => {
                    store.dispatch(setLayersLoading(false));
                  });
              }
            } else {
              //no report meaning we just want to know when the layers are loaded progressively so we keep updating legend component. There is likely a better way to handle this.
              //@ts-ignore
              const combinedLayers = [...allLayers, ...(this._map as any)?.layers.items];

              combinedLayers.forEach((l) => {
                if (l.loaded === true) {
                  store.dispatch(setLayersLoading(false));
                } else {
                  reactiveUtils
                    .once(() => l.loadStatus === 'loaded')
                    .then(() => {
                      store.dispatch(setLayersLoading(false));
                    });
                }
              });
            }

            this._map?.addMany(allLayers);

            //Retrieve sorted layer array
            const mapLayerIDs = getSortedLayers(appSettings.layerPanel, allLayerObjects, this._map);

            //Reorder layers on the map!
            this._map?.layers.forEach((layer: any) => {
              const layerIndex = mapLayerIDs!.findIndex((i) => i === layer.id);
              if (layerIndex !== -1) {
                this._map?.reorder(layer, layerIndex);
              }
            });

            //Extra layer group that acts as a "masked" layers with which you cannot interact
            this.addExtraLayers();
            //Sketch view model setup
            this.initializeAndSetSketch();
          });
        });
      },
      (error: Error) => {
        console.log('error in re-initializeMap()', error);
        store.dispatch(mapError(true));
      }
    ).catch((error: Error) => {
      console.log('error in initializeMap()', error);
      store.dispatch(mapError(true));
    });
  }

  setPageTitle(currentLanguage: string, defaultLanguage: string, primaryTitle: string, secondaryTitle: string): void {
    if (currentLanguage === defaultLanguage) {
      window.document.title = primaryTitle;
    } else {
      window.document.title = secondaryTitle;
    }
  }

  async setVIIRSDates(): Promise<void> {
    let sDate;
    let eDate;
    const parsedURL = new URL(window.location.href);
    const startDate = parsedURL.searchParams.get('vs');
    const endDate = parsedURL.searchParams.get('ve');
    if (startDate && endDate) {
      sDate = startDate;
      eDate = endDate;
    } else {
      const maxDate = await getMaxDateForViirsTiles();
      const fDate = parse(maxDate, 'yyyy-MM-dd', new Date());
      sDate = format(subDays(fDate, 1), 'yyyy-MM-dd');
      eDate = maxDate;
    }
    store.dispatch(setViirsStart(sDate));
    store.dispatch(setViirsEnd(eDate));
  }

  setGLADDates(): void {
    const { appSettings } = store.getState();
    if (appSettings.gladAlertDates?.startDate.length && appSettings.gladAlertDates.endDate.length) {
      store.dispatch(setGladStart(appSettings.gladAlertDates.startDate));
      store.dispatch(setGladEnd(appSettings.gladAlertDates.endDate));
    }
  }

  async retrieveLegendInfo(layerObject: LayerProps): Promise<any[] | undefined> {
    let legendResult;
    if (!layerObject.url) {
      return legendResult;
    }

    const legendInfoObject = await legendInfoController.fetchLegendInfo(layerObject.url);
    if (legendInfoObject && !legendInfoObject.error) {
      legendResult = legendInfoObject?.layers?.filter((l: any) => layerObject.layerIds?.includes(l.layerId));
    }
    return legendResult;
  }

  async changeLanguage(lang: string): Promise<void> {
    if (!this._map) return;
    const { mapviewState, appSettings } = store.getState();

    //reset all active/selected features as we have no way of confirming that new webmap has said feature
    store.dispatch(setActiveFeatureIndex([0, 0]));
    store.dispatch(setActiveFeatures([]));
    store.dispatch(setDocuments(null));

    const { language, webmap, alternativeWebmap, sharinghost } = store.getState().appSettings;

    this.setPageTitle(lang, appSettings.language, appSettings.title, appSettings.alternativeLanguageTitle);

    const newWebMapId = lang === language ? webmap : alternativeWebmap;
    const nonWebmapLayers = mapviewState.allAvailableLayers.filter((layer) => layer.origin !== 'webmap');
    const esriNonWebmapLayers = nonWebmapLayers.map((l: LayerProps) => {
      return this._map?.findLayerById(l.id);
    });

    this._map.removeAll();
    this._map = undefined;
    this._map = new WebMap({
      portalItem: { id: newWebMapId, portal: new Portal({ url: sharinghost }) },
    });

    this._mapview = new MapView({
      map: this._map,
      container: this._domRef.current,
    });

    this._mapview!.ui.remove('zoom');
    this._mapview!.ui.remove('attribution');

    //if we have init extent, use it.
    if (appSettings.initialExtent && this._mapview) {
      const parsedInitExtent = parseExtentConfig(appSettings.initialExtent);
      if (parsedInitExtent.center) {
        //@ts-ignore
        this._mapview.center = parsedInitExtent.center;
      }
      if (parsedInitExtent.zoom) {
        this._mapview.zoom = parsedInitExtent.zoom;
      }
    }

    function syncExtent(ext: __esri.Extent, mapview: __esri.MapView): any {
      const { latitude, longitude } = ext.center;
      store.dispatch(changeMapCenterCoordinates({ latitude, longitude }));
      store.dispatch(changeMapScale(mapview.scale));
    }

    const throtthledUpdater = debounce(syncExtent, 1500, { trailing: true });

    this._mapview?.when(async () => {
      if (!this._mapview) return;
      //Set default state and other event listeners
      this._webmapBasemap = this._map?.basemap.clone();
      store.dispatch(isMapReady(true));
      store.dispatch(setLanguage(lang));
      store.dispatch(changeMapScale(this._mapview.scale));
      const { latitude, longitude } = this._mapview.center;
      store.dispatch(changeMapCenterCoordinates({ latitude, longitude }));
      this._mapview!.watch('extent', (newExtent) => {
        if (!this._mapview) return;
        throtthledUpdater(newExtent, this._mapview);
      });
      this._mapview!.on('click', (event) => {
        store.dispatch(setActiveFeatures([]));
        store.dispatch(setActiveFeatureIndex([0, 0]));
        store.dispatch(selectActiveTab('data'));
        //if user is clicking on the drawn/upload polygon, we should not query all other layers as well, we should just accept that we have clicked on user feature on the map
        const clickGeo = event.mapPoint;
        const userFeatLayer = this._map?.findLayerById('user_features') as any;

        if (userFeatLayer && userFeatLayer?.graphics?.items.length) {
          //TODO: Needs refactor, we essentially copy pasting this from initialize click event handler
          //need to be extracted into utility method for cleaner approach
          //
          const activeOutlineColor = [115, 252, 253];
          const inactiveOutlineColor = [3, 188, 255];
          //In the event of multiple graphics items on the layer (situation with multi polygon uploads) we iterate over then and find if any are intersecting with click

          //Go over all graphics on the user_features layer and find which ones we are clicking on (if any)
          const graphicsWeClickedOn = userFeatLayer.graphics.items.filter((graphic: __esri.Graphic) => {
            return geometryEngine.within(clickGeo, graphic.geometry);
          });

          if (graphicsWeClickedOn.length !== 0) {
            const graphicIndex = graphicsWeClickedOn[0].attributes?.attributeIndex
              ? graphicsWeClickedOn[0].attributes.attributeIndex
              : 0;

            const graphicsWeMissed = userFeatLayer.graphics.items.filter((item: any) => {
              return item.attributes.attributeIndex !== graphicIndex;
            });

            //Update colors on multi poly layer
            const copyGraphicsWeClickedOn = graphicsWeClickedOn[0].clone();
            copyGraphicsWeClickedOn.symbol.outline.color = activeOutlineColor;
            this._sketchVMGraphicsLayer!.remove(graphicsWeClickedOn[0]);
            this._sketchVMGraphicsLayer!.add(copyGraphicsWeClickedOn);

            //Update colors on the rest of the graphics
            graphicsWeMissed.forEach((graphic: any) => {
              const graphicCopy = graphic.clone();
              graphicCopy.symbol.outline.color = inactiveOutlineColor;
              this._sketchVMGraphicsLayer!.remove(graphic);
              this._sketchVMGraphicsLayer!.add(graphicCopy);
            });
            //create and sort features because sorting gets out of whack due to this updating process
            const userFeatures = userFeatLayer.graphics.items
              .map((graphic: __esri.Graphic) => {
                return {
                  attributes: graphic.attributes,
                  geometry: graphic.geometry,
                };
              })
              .sort((a: any, b: any) => a.attributes.attributeIndex - b.attributes.attributeIndex);

            const featuresOnMap: LayerFeatureResult = {
              layerID: 'user_features',
              layerTitle: 'User Features',
              features: userFeatures,
              fieldNames: null,
            };

            store.dispatch(setActiveFeatures([featuresOnMap]));
            store.dispatch(setActiveFeatureIndex([0, graphicIndex]));
            store.dispatch(selectActiveTab('analysis'));
          } else {
            //pass through to normal click handler to query features on layers
            if (this._mapview && this._map) {
              queryLayersForFeatures(this._mapview, this._map, event);
            }
          }
        } else {
          if (this._mapview && this._map) {
            queryLayersForFeatures(this._mapview, this._map, event);
          }
        }
      });

      const mapLayerObjects: LayerProps[] = await extractWebmapLayerObjects(this._map);

      //Update the layer objects with new titles based on current language
      const updatedLayerObjects = nonWebmapLayers.map((layerObject) => {
        if (layerObject?.isError) {
          layerObject.title = errorTranslations[lang].text;
        } else {
          layerObject.title = layerObject?.label[lang] ? layerObject?.label[lang] : 'Untitled Layer';
        }
        return layerObject;
      });
      //Add non webmap layers to the map
      // layers that failed to load will contained isError property and layer will be undefined, filter them out
      //@ts-ignore
      this._map?.addMany(esriNonWebmapLayers.filter((l) => l));
      const allLayerObjects = [...updatedLayerObjects, ...mapLayerObjects];
      store.dispatch(allAvailableLayers(allLayerObjects));
      const mapLayerIDs = getSortedLayers(appSettings.layerPanel, allLayerObjects, this._map);

      this.addExtraLayers();

      //Reorder layers on the map!
      this._map?.layers.forEach((layer: any) => {
        const layerIndex = mapLayerIDs?.findIndex((i) => i === layer.id);
        if (layerIndex && layerIndex !== -1) {
          this._map?.reorder(layer, layerIndex);
        }
      });
      this.initializeAndSetSketch();
    });
  }

  // All Extra Layers are ignored in query, legend and left panel, layer with MASK ID uses GFW mask endpoint with ISO def expression (if no ISO code is present, we do not add mask layer)
  // Adding MASK Layer, which dims the area that is not the country ISO code based on Config ,separate from the flow as it comes in the config as 'extraLayers' array element, not following previous layer object specs
  async addExtraLayers() {
    const appSettings = store.getState().appSettings;
    const { layerPanel } = appSettings;
    const extraLayers = layerPanel['extraLayers'];

    for (let i = 0; i < extraLayers.length; i++) {
      const exLayer = extraLayers[i];

      let extraEsriLayer;
      if (exLayer.id === 'MASK' && appSettings.iso && appSettings.iso.length !== 0) {
        exLayer.type = 'MASK';
        extraEsriLayer = await LayerFactory(this._mapview, exLayer);
      } else if (exLayer.id === 'MASK' && (!appSettings.iso || appSettings.iso.length === 0)) {
        extraEsriLayer = null;
      } else {
        extraEsriLayer = await LayerFactory(this._mapview, exLayer);
      }
      if (extraEsriLayer) {
        this._map!.add(extraEsriLayer);
      }
    }
  }

  async addLandsatLayer(layerConfig: LayerProps, year: string): Promise<void> {
    const landsatURL = landsatBaselayerURL;
    layerConfig.type = 'webtiled';

    layerConfig.url = landsatURL.replace(/\/\d{4}\//, `/${year}/`);
    const landsatEsriLayer = await LayerFactory(this._mapview, layerConfig);
    this._map!.basemap = new Basemap({
      baseLayers: [landsatEsriLayer],
    });
    store.dispatch(setSelectedBasemap(`landsat-${year}`));
  }

  async addPlanetTileLayer(
    proxyURL: string,
    planetColor: string,
    selectedTile: string,
    apiKey?: string
  ): Promise<void> {
    if (!apiKey) return;
    const esriConf = esriConfig as esriConfig | any;
    const planetBasemapReferenceLayer1 = new TileLayer({
      id: 'planet-basemap-reference-layer',
      url: 'https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer',
      visible: true,
    });
    const planetBasemapReferenceLayer2 = new TileLayer({
      id: 'planet-basemap-reference-layer',
      url: 'https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Reference/MapServer',
      visible: true,
    });

    const planetConfig = {
      type: 'webtiled',
      url: `https://tiles.planet.com/basemaps/v1/planet-tiles/planet_medres_normalized_analytic_${selectedTile}_mosaic/gmap/{z}/{x}/{y}.png?proc=${planetColor}&api_key=${apiKey}`,
      title: 'planet',
      id: 'planet',
    };

    esriConf.request.interceptors.push({
      urls: 'https://tiles.globalforestwatch.org/planet/v1/planet_medres_normalized_analytic',
    });

    const planetLayer = new WebTileLayer({
      urlTemplate: planetConfig.url,
    });
    const planetBase = new Basemap({
      baseLayers: [planetBasemapReferenceLayer1, planetLayer, planetBasemapReferenceLayer2],
    });
    this._planetBasemap = planetBase;
    this._map!.basemap = planetBase;
    store.dispatch(setSelectedBasemap(planetConfig.id));
  }

  zoomInOrOut({ zoomIn }: ZoomParams): void {
    if (this._mapview) {
      const zoomNum = zoomIn ? this._mapview.zoom + 1 : this._mapview.zoom - 1;

      this._mapview.goTo({
        target: this._mapview.center,
        zoom: zoomNum,
      });
    }
  }

  async attachCoordinatesWidget(domref: React.MutableRefObject<any>): Promise<void> {
    new CoordinateConversion({
      view: this._mapview,
      container: domref.current,
    });
  }

  clearAllLayers(): void {
    if (!this._map) return;
    //1. Iterate over map's layers and turn them off one by one
    this._map.layers.forEach((layer: any) => {
      if (layer.id === 'MASK') return; // mask layers should never be cleared from the map
      if (layer.id === 'user_features') {
        //user drawn feature graphics layer visibility is ignored, but graphics are moved
        layer.graphics.removeAll();
        return;
      }
      if (layer.sublayers && !layer.id.includes('MODIS')) {
        layer.allSublayers.items.forEach((sub: __esri.Sublayer) => (sub.visible = false));
      }
      layer.visible = false;
    });

    //2. Update redux state with visible layers array being empty
    const { mapviewState } = store.getState();
    const newLayersArray = mapviewState.allAvailableLayers.map((l: LayerProps) => {
      return {
        ...l,
        visible: false,
      };
    });
    store.dispatch(allAvailableLayers(newLayersArray));
  }

  selectAllLayers(): void {
    if (!this._map) return;
    this._map.layers.forEach((layer: any) => {
      if (layer.sublayers) {
        layer.allSublayers.items.forEach((sub: __esri.Sublayer) => (sub.visible = true));
      }
      layer.visible = true;
    });
    const { mapviewState } = store.getState();
    const newLayersArray = mapviewState.allAvailableLayers.map((l: LayerProps) => {
      return {
        ...l,
        visible: true,
      };
    });
    store.dispatch(allAvailableLayers(newLayersArray));
  }

  removeAllGraphics(layerID: string): void {
    const layer: any = this._map?.findLayerById(layerID);
    if (layer) {
      layer.removeAll();
    }
  }

  async drawGraphic(feature: Array<FeatureResult>): Promise<void> {
    if (this._map && this._mapview) {
      await setNewGraphic({
        map: this._map,
        mapview: this._mapview,
        allFeatures: feature,
        isUploadFile: false,
      });
    }
  }

  updateActivePolyGraphic(activeFeature: FeatureResult[]): void {
    const activeOutlineColor = [115, 252, 253];
    const inactiveOutlineColor = [3, 188, 255];
    const activeIndex = activeFeature[0].attributes.attributeIndex;
    const newActiveGraphic = this._sketchVMGraphicsLayer!.graphics['items'].filter((item: any) => {
      return item.attributes.attributeIndex === activeIndex;
    });

    const newActiveGraphicClone = newActiveGraphic[0].clone();
    newActiveGraphicClone.symbol.outline.color = activeOutlineColor;
    this._sketchVMGraphicsLayer!.remove(newActiveGraphic[0]);
    this._sketchVMGraphicsLayer!.add(newActiveGraphicClone);

    const inactiveGraphics = this._sketchVMGraphicsLayer!.graphics['items'].filter((item: any) => {
      return item.attributes.attributeIndex !== activeIndex;
    });

    inactiveGraphics.forEach((graphic: any) => {
      const graphicCopy = graphic.clone();
      graphicCopy.symbol.outline.color = inactiveOutlineColor;
      this._sketchVMGraphicsLayer!.remove(graphic);
      this._sketchVMGraphicsLayer!.add(graphicCopy);
    });
  }

  changeLayerVisibility(layerID: string, visibility: boolean): void {
    const layer = this._map?.findLayerById(layerID);
    if (layer) {
      //1. update the map
      layer.visible = visibility;
      //2. Update redux
      const { mapviewState } = store.getState();
      const newLayersArray = mapviewState.allAvailableLayers.map((l) => {
        if (l.id === layerID) {
          return {
            ...l,
            visible: layer.visible,
          };
        } else {
          return l;
        }
      });
      store.dispatch(allAvailableLayers(newLayersArray));
    }
  }

  toggleProdLayers = (visible: boolean, layerId: string) => {
    const { mapviewState } = store.getState();

    let newLayersArray: any = [];
    // turn off both of prode layers if toggle is off;
    if (visible === false) {
      const cerradoProdLayer = mapController._map?.findLayerById(LAYER_IDS.INPE_CERRADO_PRODES);
      const amazonProdLayer = mapController._map?.findLayerById(LAYER_IDS.INPE_AMAZON_PRODES);

      cerradoProdLayer!.visible = false;
      amazonProdLayer!.visible = false;

      newLayersArray = mapviewState.allAvailableLayers.map((layer) => {
        if (layer.id === cerradoProdLayer?.id || layer.id === amazonProdLayer?.id) {
          return {
            ...layer,
            visible: false,
          };
        } else {
          return layer;
        }
      });
    } else {
      const findLayerById = this._map?.findLayerById(layerId);
      if (findLayerById) {
        findLayerById.visible = visible;

        newLayersArray = mapviewState.allAvailableLayers.map((layer) => {
          if (layer.id === layerId) {
            return {
              ...layer,
              visible: findLayerById.visible,
            };
          } else {
            return layer;
          }
        });
      }
    }
    store.dispatch(allAvailableLayers(newLayersArray));
  };

  toggleLayerVisibility(checked: boolean, layerID: string, sublayer?: boolean, parentID?: string): void {
    let layer = null as any;
    if (sublayer && parentID) {
      layer = this._map
        ?.findLayerById(parentID)
        //@ts-ignore -- sublayers exist
        ?.allSublayers.items.find((sub: any) => Number(sub.id) === Number(layerID));
    } else {
      layer = this._map?.findLayerById(layerID);
    }
    if (layer) {
      const visibility = !layer.visible;

      if (visibility) {
        //sync parent layer with sublayer
        if (layer.parent && layer.parent.type === 'map-image') {
          layer.parent.visible = visibility;
        }
      }

      //1. update the map
      layer.visible = checked;

      //2. Update redux
      const { mapviewState } = store.getState();

      const newLayersArray = mapviewState.allAvailableLayers.map((l) => {
        if (l.id === layerID) {
          return {
            ...l,
            visible: checked,
          };
        } else {
          return l;
        }
      });

      store.dispatch(allAvailableLayers(newLayersArray));

      // if Land Cover visibility is true, change the max zoom level for mapview to 12, else max zoom level to 20
      const isUMDLandCover: any = newLayersArray.find((layer: any) => layer.id === LAYER_IDS.UMD_LAND_COVER);
      if (isUMDLandCover?.visible) {
        this._mapview.constraints = {
          maxZoom: 12,
        };
        if (this._mapview.zoom > 12) {
          this._mapview.zoom = 12;
        }
      } else {
        this._mapview.constraints = {
          maxZoom: 20,
        };
      }
    }
  }

  updateRendererOpacity(renderer: any, fill: boolean, opacityValue: number) {
    const rendererClone = renderer.clone();
    if (rendererClone.type === 'unique-value' && rendererClone?.uniqueValueInfos.length !== 0) {
      rendererClone.uniqueValueInfos.forEach((uniqueValueInfo) => {
        if (fill) {
          uniqueValueInfo.symbol.color.a = opacityValue;
        } else {
          uniqueValueInfo.symbol.outline.color.a = opacityValue;
        }
      });
      return rendererClone;
    }
    if (rendererClone.type === 'simple') {
      if (fill) {
        rendererClone.symbol.color.a = opacityValue;
      } else {
        rendererClone.symbol.outline.color.a = opacityValue;
      }
      return rendererClone;
    }
  }

  setLayerOpacityFillOutline(fill: boolean, layerID: string, value: number, sublayer?: boolean, parentID?: string) {
    let layer: any;
    if (sublayer && parentID) {
      layer = this._map
        ?.findLayerById(parentID)
        //@ts-ignore -- sublayers exist
        ?.allSublayers.items.find((sub: any) => sub.id === layerID);
    } else {
      layer = this._map?.findLayerById(layerID) as any;
    }

    if (layer) {
      if (!layer.renderer) {
        layer.load().then(() => {
          layer.renderer = this.updateRendererOpacity(layer.renderer, fill, value);
        });
      } else {
        //we have renderer available, so use that
        layer.renderer = this.updateRendererOpacity(layer.renderer, fill, value);
      }
      const { mapviewState } = store.getState();
      const newLayersArray = mapviewState.allAvailableLayers.map((l) => {
        if (l.id === layerID) {
          const opacity = {
            combined: l.opacity.combined,
            fill: 0,
            outline: 0,
          };
          if (fill) {
            opacity['fill'] = value;
            opacity['outline'] = l.opacity.outline;
          } else {
            opacity['fill'] = l.opacity.fill;
            opacity['outline'] = value;
          }
          return {
            ...l,
            opacity: opacity,
          };
        } else {
          return l;
        }
      });
      store.dispatch(allAvailableLayers(newLayersArray));
    }
  }
  setLayerOpacityForWMSLayer(layerID: string, value: string, parentID?: string) {
    let layer: any;
    if (parentID) {
      layer = this._map?.findLayerById(parentID);
    }
    if (layer) {
      //updating layer's esri property
      layer.opacity = Number(value);

      //updating redux arr values
      const { mapviewState } = store.getState();
      const newLayersArray = mapviewState.allAvailableLayers.map((l) => {
        if (l.id === layerID) {
          return {
            ...l,
            opacity: {
              combined: Number(value),
              fill: l.opacity.fill,
              outline: l.opacity.outline,
            },
          };
        } else {
          return l;
        }
      });
      store.dispatch(allAvailableLayers(newLayersArray));
    }
  }

  resetProdLayerOpacity = (selectedLayerId: string) => {
    const { mapviewState } = store.getState();
    const newLayersArray: any = mapviewState.allAvailableLayers.map((l) => {
      if (selectedLayerId === LAYER_IDS.INPE_AMAZON_PRODES) {
        if (l.id === LAYER_IDS.INPE_CERRADO_PRODES) {
          return {
            ...l,
            opacity: {
              combined: 1,
              fill: l.opacity.fill,
              outline: l.opacity.outline,
            },
          };
        } else {
          return l;
        }
      } else if (selectedLayerId === LAYER_IDS.INPE_CERRADO_PRODES) {
        if (l.id === LAYER_IDS.INPE_AMAZON_PRODES) {
          return {
            ...l,
            opacity: {
              combined: 1,
              fill: l.opacity.fill,
              outline: l.opacity.outline,
            },
          };
        } else {
          return l;
        }
      } else {
        return l;
      }
    });

    store.dispatch(allAvailableLayers(newLayersArray));
  };
  setLayerOpacity(layerID: string, value: string, sublayer?: boolean, parentID?: string): void {
    let layer: any;
    if (sublayer && parentID) {
      layer = this._map
        ?.findLayerById(parentID)
        //@ts-ignore -- sublayers exist
        ?.allSublayers.items.find((sub: any) => sub.id === Number(layerID));
    } else {
      layer = this._map?.findLayerById(layerID) as any;
    }
    if (layer) {
      //updating layer's esri property
      layer.opacity = Number(value);

      //updating redux arr values
      const { mapviewState } = store.getState();
      const newLayersArray = mapviewState.allAvailableLayers.map((l) => {
        if (l.id === layerID) {
          return {
            ...l,
            opacity: {
              combined: Number(value),
              fill: l.opacity.fill,
              outline: l.opacity.outline,
            },
          };
        } else {
          return l;
        }
      });
      store.dispatch(allAvailableLayers(newLayersArray));
    }
  }

  detachMouseLocationTracking(): void {
    this._mouseTrackingEvent?.remove();
    this._mouseTrackingEvent = undefined;
  }

  attachMouseLocationTracking(): void {
    //sets mouse tracking event on the map in order to display coordinates live in the popup when user is editing drawn/uploaded polygon
    this._mouseTrackingEvent = this._mapview?.on('pointer-move', (event) => {
      const userPoint = this._mapview?.toMap({ x: event.x, y: event.y });
      store.dispatch(setUserCoordinates(userPoint));
    });
  }

  completeSketchVM(): any {
    this._sketchVM?.complete();
  }

  deleteSketchVM(): void {
    this._sketchVM?.emit('delete');
  }

  updateSketchVM(graphicIndex?: number): void {
    interface CustomUpdateOptions extends __esri.SketchViewModelDefaultUpdateOptions {
      tool: 'reshape';
    }
    const updateOptions: CustomUpdateOptions = {
      tool: 'reshape',
      enableRotation: false,
      toggleToolOnClick: false,
      enableScaling: false,
      preserveAspectRatio: false,
    };

    if (this._sketchVM && this._sketchVMGraphicsLayer) {
      //find the right graphic and run updater on it leaving other graphics in tact
      const graphicToUpdate = this._sketchVMGraphicsLayer.graphics['items'].findIndex((graphic: __esri.Graphic) => {
        return graphic.attributes['attributeIndex'] === graphicIndex;
      });
      this._sketchVM.update(this._sketchVMGraphicsLayer.graphics['items'][graphicToUpdate], updateOptions);
    }
  }

  listenToSketchDelete(): any {
    if (this._sketchVMGraphicsLayer) {
      store.dispatch(setActiveFeatures([]));
      store.dispatch(setActiveFeatureIndex([0, 0]));
      this._sketchVMGraphicsLayer.graphics['items'] = [];
    }
  }

  listenToSketchCreate(event: any): void {
    //this method is fired when we have 1) new sketch being drawn and created 2) when we mod that drawn feature and save it 3) when we save modded upload feature
    let eventGraphics;
    if (event.hasOwnProperty('graphic')) {
      //Handle the very first draw action of the sketch widget
      eventGraphics = event.graphic;
      eventGraphics.attributes = {
        OBJECTID: eventGraphics.uid,
        attributeIndex: 0,
      };
      eventGraphics.symbol.outline.color = [115, 252, 253];
      eventGraphics.symbol.color = [0, 0, 0, 0];
      const drawnFeatures: LayerFeatureResult = {
        layerID: 'user_features',
        layerTitle: 'User Features',
        features: [eventGraphics],
        fieldNames: null,
      };

      //Replace all active features with our drawn feature, assigning custom layerID and Title
      store.dispatch(setActiveFeatures([drawnFeatures]));
      store.dispatch(setActiveFeatureIndex([0, 0]));
      store.dispatch(selectActiveTab('analysis'));
    } else if (event.hasOwnProperty('graphics')) {
      eventGraphics = event.graphics[0];
      eventGraphics.symbol.outline.color = [115, 252, 253];
      eventGraphics.symbol.color = [0, 0, 0, 0];
    }
  }

  async initializeAndSetSketch(graphics = []): Promise<void> {
    if (this._sketchVMGraphicsLayer) {
      //let's make sure this layer is actually on the map, on lang changes sometimes we have sketchVM
      //layer instance but it is not necessarily on the map
      const userLayer = this._map?.findLayerById('user_features') as __esri.GraphicsLayer;
      if (!userLayer) {
        this._sketchVMGraphicsLayer = new GraphicsLayer({
          id: 'user_features',
        });
        //@ts-ignore
        this._map?.add(this._sketchVMGraphicsLayer);
      }
      this._sketchVMGraphicsLayer?.graphics.removeAll();
    } else {
      this._sketchVMGraphicsLayer = new GraphicsLayer({
        id: 'user_features',
      });
      //@ts-ignore
      this._map?.add(this._sketchVMGraphicsLayer);
    }

    if (graphics.length) {
      this._sketchVMGraphicsLayer?.graphics.addMany(graphics);
    }

    this._sketchVM = new SketchViewModel({
      layer: this._sketchVMGraphicsLayer,
      view: this._mapview,
      updateOnGraphicClick: false,
      polylineSymbol: {
        type: 'simple-line',
        color: 'red',
        width: 3,
      },
    });

    this._sketchVM?.on('create', (event: any) => {
      if (event.state === 'complete') {
        this.listenToSketchCreate(event);
      }
    });

    this._sketchVM?.on('delete', () => {
      this.listenToSketchDelete();
    });

    this._sketchVM?.on('update', (event: any) => {
      if (event.state === 'complete') {
        this.listenToSketchCreate(event);
      }
    });
  }

  createPolygonSketch = (): void => {
    this.deleteSketchVM();
    this._sketchVM?.create('polygon', { mode: 'freehand' });
  };

  initSketchForMultiple = async (inputIndex: number) => {
    const polygonSymbol = {
      type: 'simple-fill',
      color: '#F2BC94',
      outline: {
        color: '#722620',
        width: 3,
      },
    } as any;

    if (!this._sketchMultipleGLayer) {
      this._sketchMultipleGLayer = new GraphicsLayer({
        id: 'multi_poly_graphics',
      });
      //@ts-ignore
      this._map.add(this._sketchMultipleGLayer);
    }

    if (!this._sketchMultipleVM) {
      this._sketchMultipleVM = new SketchViewModel({
        view: this._mapview,
        layer: this._sketchMultipleGLayer,
        polygonSymbol: polygonSymbol,
      });
    }

    //ensure we got the view model to work with
    if (!this._sketchMultipleVM) return;
    //event handlers
    const handleCompletedDrawing = (event) => {
      if (event.state === 'complete') {
        const eventGraphics: any = event.graphic;
        eventGraphics.attributes = {
          inputIndex: inputIndex,
        };
        eventGraphics.symbol.outline.color = [115, 252, 253];
        eventGraphics.symbol.color = [0, 0, 0, 0];
        const drawnFeatures: LayerFeatureResult = {
          layerID: 'multi_poly_graphics',
          layerTitle: 'Multi Polygon Features',
          features: [eventGraphics],
          fieldNames: null,
        };

        //we should save this into our array
        const analysisFeatureList = store.getState().appState.analysisFeatureList;

        const oldState = [...analysisFeatureList];
        oldState[inputIndex] = drawnFeatures;
        store.dispatch(setAnalysisFeatureList(oldState));

        this._sketchMultipleVM!.destroy();
        this._sketchMultipleVM = undefined;
      }
    };
    this._sketchMultipleVM.on('create', (event) => {
      handleCompletedDrawing(event);
    });
    this._sketchMultipleVM.create('polygon', { mode: 'freehand' });
  };

  clearGraphicFromMultiSelection = (inputIndex: number): void => {
    if (!this._sketchMultipleGLayer) return;
    //@ts-ignore
    const graphicToRemove = this._sketchMultipleGLayer.graphics.items.find(
      (g) => g.attributes.inputIndex === inputIndex
    );
    if (graphicToRemove) {
      this._sketchMultipleGLayer.remove(graphicToRemove);
    }
  };

  getAndDispatchMeasureResults(optionType: OptionType): void {
    this._selectedWidget?.watch('viewModel.state', (state: string) => {
      let areaResults = {};
      let distanceResults = {};

      if (state === 'measured') {
        if (optionType === 'area') {
          areaResults = {
            area: this._selectedWidget?.viewModel.measurementLabel['area'],
            perimeter: this._selectedWidget?.viewModel.measurementLabel['perimeter'],
          };
        } else if (optionType === 'distance') {
          distanceResults = {
            length: this._selectedWidget?.viewModel.measurementLabel,
          };
        }

        store.dispatch(
          setMeasureResults({
            activeButton: optionType,
            areaResults,
            distanceResults,
            coordinateMouseClickResults: {},
            coordinatePointerMoveResults: {},
          })
        );
      }
    });
  }

  clearAllWidgets(): void {
    this._selectedWidget?.viewModel.clear();
    this._selectedWidget = undefined;

    this._mouseClickEventListener?.remove();
    this._mouseClickEventListener = undefined;

    this._pointerMoveEventListener?.remove();
    this._pointerMoveEventListener = undefined;
  }

  async setActiveMeasureWidget(optionType: OptionType): Promise<void> {
    switch (optionType) {
      case 'area':
        this._selectedWidget = new AreaMeasurement2D({
          view: this._mapview,
          unit: 'acres',
        });
        break;
      case 'distance':
        this._selectedWidget = new DistanceMeasurement2D({
          view: this._mapview,
          unit: 'miles',
        });
        break;
      case 'coordinates': {
        this._selectedWidget?.viewModel.clear();
        this._selectedWidget = undefined;
        break;
      }
      default:
        break;
    }

    if (optionType === 'area' || optionType === 'distance') {
      this._selectedWidget?.viewModel.start();
      this.getAndDispatchMeasureResults(optionType);
    }
  }

  updateSelectedMeasureWidget(
    optionType: OptionType,
    selectedUnit: __esri.AreaMeasurement2D['unit'] | __esri.DistanceMeasurement2D['unit']
  ): void {
    let areaResults = {};
    let distanceResults = {};

    if (this._selectedWidget) {
      this._selectedWidget.unit = selectedUnit;
      switch (optionType) {
        case 'area':
          areaResults = {
            area: this._selectedWidget.viewModel.measurementLabel['area'],
            perimeter: this._selectedWidget.viewModel.measurementLabel['perimeter'],
          };
          break;
        case 'distance':
          distanceResults = {
            length: this._selectedWidget.viewModel.measurementLabel,
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
          coordinatePointerMoveResults: {},
        })
      );
      this._selectedWidget?.watch('viewModel.state', (state: string) => {
        if (state === 'measured') {
          this.updateMeasureWidgetOnClick();
        }
      });
    }
  }

  updateMeasureWidgetOnClick(): void {
    const mapviewOnClick = this._mapview?.on('click', (event) => {
      event.stopPropagation();
      mapviewOnClick?.remove();
    });
  }

  generateMapPDF = async (layoutType: string): Promise<any> => {
    const printServiceURL = store.getState().appSettings.printServiceUrl;
    let printOptions: any = [];

    let layout = '' as any;

    printOptions = await fetch(`${printServiceURL}/?f=json`)
      .then((res) => res.json())
      .then((results) => {
        return results.parameters.filter((param: any) => param.name === 'Layout_Template');
      });

    if (layoutType === 'Landscape') {
      layout = printOptions[0]?.defaultValue;
    } else {
      layout = printOptions[0]?.choiceList[0];
    }

    const template = new PrintTemplate({
      format: 'pdf',
      layout,
      // * NOTE - must set 'layout' as type of 'any' in order to assign
      // * custom layout types from GFW print service URL
      layoutOptions: {
        scalebarUnit: 'Kilometers',
        customTextElements: [{ title: 'GFW Mapbuilder' }, { subtitle: 'Make maps that matter' }],
        legendLayers: [],
      },
      forceFeatureAttributes: true,
      showLabels: false,
    });
    this.toggleMaskLayer(false);

    const params = new PrintParameters({
      view: this._mapview,
      template,
    });

    try {
      const result = await print.execute(printServiceURL!, params);
      if (result?.url) {
        this.toggleMaskLayer(true);
        return result;
      } else {
        return { url: null };
      }
    } catch (error) {
      console.error('error in generateMapPDF()', error);
    }
  };

  toggleMaskLayer = (visible: boolean) => {
    const allLayers = this._mapview?.map.allLayers;

    // set visibility of mask layer to false when printing the map, trying to print map with mask layer visible causes the print service to fail
    // after printing is complete, set visibility of mask layer back to true
    allLayers?.items.forEach((layer: any) => {
      if (layer.id === 'MASK') {
        layer.visible = visible;
      }
    });
  };

  setPolygon = async (points: Array<__esri.Point>): Promise<void> => {
    const userLayer = this._map?.findLayerById('user_features') as __esri.GraphicsLayer;
    if (userLayer) {
      userLayer.graphics.removeAll();
    } else {
      const userLayer = new this._GraphicsLayer({
        id: 'user_features',
      });
      this._map?.add(userLayer);
    }

    const simpleFillSymbol = {
      type: 'simple-fill',
      color: [240, 171, 0, 0.0],
      outline: {
        color: [0, 255, 254],
        width: 2,
      },
    };

    const rings: number[][] = points.map((pt) => [pt.x, pt.y]);

    const polygon = new this._Polygon({
      rings: [rings],
      spatialReference: { wkid: 102100 },
    });

    const graphic = new this._Graphic({
      geometry: polygon,
      symbol: simpleFillSymbol,
    });
    const drawnGraphic: any = graphic.clone();

    drawnGraphic.attributes = {
      OBJECTID: 1,
      attributeIndex: 0,
    };

    drawnGraphic.objectid = 1;
    drawnGraphic.symbol.outline.color = [115, 252, 253];
    drawnGraphic.symbol.color = [0, 0, 0, 0];

    this._mapview?.goTo(
      {
        target: graphic,
      },
      {
        duration: 1000,
      }
    );

    const drawnFeatures: LayerFeatureResult = {
      layerID: 'user_features',
      layerTitle: 'User Features',
      features: [drawnGraphic],
      fieldNames: null,
    };
    const multiPolyMethod = store.getState().appState.multiPolygonSelectionMode;
    if (multiPolyMethod) {
      const activeMultiInput = store.getState().appState.activeMultiInput;
      const analysisFeatureList = store.getState().appState.analysisFeatureList;
      //add graphics to the layer and add graphics to the array
      let gLayer = this._map?.findLayerById('multi_poly_graphics') as __esri.GraphicsLayer;
      if (!gLayer) {
        gLayer = new GraphicsLayer({
          id: 'multi_poly_graphics',
        });
        this._map?.add(gLayer);
      }
      gLayer.graphics.add(drawnGraphic);
      drawnFeatures.features[0].attributes.inputIndex = activeMultiInput;
      const oldList = [...analysisFeatureList];
      oldList[activeMultiInput] = drawnFeatures;
      store.dispatch(setAnalysisFeatureList(oldList));
      store.dispatch(renderModal(''));
    } else {
      userLayer.graphics.add(drawnGraphic);
      store.dispatch(setActiveFeatures([drawnFeatures]));
      store.dispatch(setActiveFeatureIndex([0, 0]));
      store.dispatch(selectActiveTab('analysis'));

      store.dispatch(renderModal(''));
    }
  };

  async initializeSearchWidget(searchRef: RefObject<any>): Promise<void> {
    const allSources = await setLayerSearchSource();

    const searchWidget = new Search({
      view: this._mapview,
      container: searchRef.current,
      sources: allSources,
    });

    searchWidget.on('search-complete', (e: any) => {
      queryLayersForFeatures(this._mapview, this._map, e.results[0].results[0].feature.geometry.centroid);
    });
  }

  async setSearchWidget(latitude: string, longitude: string): Promise<void> {
    this._mapview?.graphics.removeAll();

    const specificPoint = new Point({
      latitude: Number(latitude),
      longitude: Number(longitude),
    });

    const simpleMarkerSymbol = {
      type: 'simple-marker',
      color: [240, 171, 0],
      outline: {
        color: [255, 255, 255],
        width: 1,
      },
    };

    const pointGraphic = new Graphic({
      geometry: specificPoint,
      symbol: simpleMarkerSymbol,
    });

    this._mapview?.graphics.add(pointGraphic);
    this._mapview?.goTo(
      {
        target: specificPoint,
        zoom: 10,
      },
      {
        duration: 1000,
      }
    );
    store.dispatch(renderModal(''));
  }

  updateDensityValue(value: number): void {
    densityEnabledLayers.forEach((layerId: string) => {
      const layer: any = this._map?.findLayerById(layerId);
      if (layer && layer.id !== 'AG_BIOMASS' && layer.urlTemplate) {
        layer.urlTemplate = layer.urlTemplate.replace(/(tcd_)(?:[^/]+)/, `tcd_${value}`);
        layer.refresh();
      }
    });
  }

  updateBiodensityValue(value: number): void {
    const bioLayer = this._map?.findLayerById('AG_BIOMASS') as __esri.ImageryLayer;
    //current biomass layer does not support density level below 20%, so we disable the layer if user selects such value
    if (value < 3) {
      bioLayer.mosaicRule.where = '1=0';
    } else {
      bioLayer.mosaicRule.where = `OBJECTID = ${value}`;
    }
    bioLayer.refresh();
  }

  async updateTreeCoverValue(value: number): Promise<any> {
    const { mapviewState } = store.getState();
    const treeCoverLayerInfo: any = mapviewState.allAvailableLayers.find((l) => l.id === 'TREE_COVER');
    const treeLayer: any = this._map?.findLayerById('TREE_COVER');

    if (treeLayer && treeCoverLayerInfo) {
      const oldLayer = treeLayer;
      oldLayer.urlTemplate = treeCoverLayerInfo.url.replace('30', value);
      const removeEventListener = this._map?.layers.on(
        'after-remove',
        (event: __esri.CollectionAfterEvent<__esri.WebTileLayer>) => {
          if (event.item.id === 'TREE_COVER') {
            this._map?.add(oldLayer);
          }
        }
      );
      this._map?.remove(treeLayer);
      return removeEventListener;
    }
  }

  async updateTreeHeightValue(value: number): Promise<any> {
    const treeLayer: any = this._map?.findLayerById('TREE_COVER_HEIGHT');
    if (treeLayer) {
      treeLayer.height = value;
      treeLayer.refresh();
    }
  }

  async updateWindSpeedPotentialValue(value: number): Promise<any> {
    const windSpeedLayerLayer: any = this._map?.findLayerById('WIND_SPEED');
    if (windSpeedLayerLayer) {
      windSpeedLayerLayer.height = value;
      windSpeedLayerLayer.refresh();
    }
  }

  async updateGFWLayer(value: string, gfwLayers: Array<string>): Promise<any> {
    const turnOffLayersNotSelected = gfwLayers.filter((layer) => layer != value);
    turnOffLayersNotSelected.forEach((gfwLayer) => {
      const layer = this._map!.findLayerById(gfwLayer);
      if (layer) {
        layer.visible = false;
      }
    });
    const selectedLayer = this._map!.findLayerById(value);
    if (selectedLayer) {
      selectedLayer.visible = true;
    }
  }

  getMapviewCoordinates(): URLCoordinates {
    const zoom = this._mapview!.zoom;
    const { latitude, longitude } = this._mapview!.center;

    return {
      latitude: latitude.toFixed(7),
      longitude: longitude.toFixed(7),
      zoom,
    };
  }

  async setActiveBasemap(id: string): Promise<void> {
    if (this._map) {
      this._map.basemap = Basemap.fromId(id);
      store.dispatch(setSelectedBasemap(id));
    }
  }

  setWebmapOriginalBasemap(id: string): void {
    if (!this._webmapBasemap || !this._map) return;

    this._map.basemap = this._webmapBasemap;
    store.dispatch(setSelectedBasemap(id));
  }

  async setWRIBasemap(id: string): Promise<void> {
    if (!this._map) return;
    const basemapURL = WRIBasemapConfig[id];
    const wriLayer = new WebTileLayer({
      urlTemplate: basemapURL,
    });
    this._map.basemap = new Basemap({
      baseLayers: [wriLayer],
    });
    store.dispatch(setSelectedBasemap(id));
  }

  processGeojson(esriJson: Array<FeatureResult>): void {
    if (this._map && this._mapview) {
      setNewGraphic({
        map: this._map,
        mapview: this._mapview,
        allFeatures: esriJson,
        isUploadFile: true,
      });
    }
  }

  async addActiveFeatureGraphic(esriJson: Array<FeatureResult>): Promise<void> {
    if (this._map && this._mapview) {
      await setNewGraphic({
        map: this._map,
        mapview: this._mapview,
        allFeatures: esriJson,
        isUploadFile: false,
      });

      const graphicsLayer: any = this._map.findLayerById('active-feature-layer');
      this._mapview.goTo(graphicsLayer.graphics);
    }
  }

  addActiveFeaturePointGraphic(esriJson: FeatureResult): void {
    if (this._map && this._mapview) {
      addPointGraphic(this._map, esriJson);
      const graphicsLayer: any = this._map.findLayerById('active-feature-layer');
      this._mapview.goTo(graphicsLayer.graphics);
      //TODO: For some reason it does not zoom to points?
      this._mapview.zoom = 12;
    }
  }

  updateBaseTile(id: string, range: Array<number>, type?: string): void {
    const [startYear, endYear] = range;
    const layer: any = this._map?.findLayerById(id);
    if (layer) {
      if (id === 'DRY_SPELLS') {
        layer.urlTemplate = `https://tiles.globalforestwatch.org/nexgddp_change_dry_spells_2000_2080/v20211015/Change_Num_Dry_Spells_${startYear}/{z}/{x}/{y}.png`;
        layer.endDate = startYear;
      } else {
        if (type && type === 'gfw') {
          layer.gfwjulianFrom = startYear;
          layer.gfwjulianTo = endYear;
        } else if (type && type === 'julia') {
          layer.julianFrom = startYear;
          layer.julianTo = endYear;
        } else {
          layer.minYear = startYear;
          layer.maxYear = endYear;
        }
      }
      layer.refresh();
    }
  }

  resetCustomDateRange(): void {
    if (!this._map) return;

    const modisLayer = (this._map.allLayers as any).items.filter(
      (layer: __esri.FeatureLayer) => layer.id === 'MODIS_ACTIVE_FIRES'
    )[0];

    if (modisLayer.sublayers) {
      const twentyFourHourMODIS = modisLayer.sublayers.items.filter(
        (sublayer: __esri.Sublayer) => sublayer.title === 'Global Fires (MODIS) 24 hrs'
      )[0];
      twentyFourHourMODIS.definitionExpression = undefined;
    }
  }

  setCustomDateRange(layerID: string, startDate: string | Date, endDate: string | Date): void {
    //Custom date range is always set on the 1 year layer, all other layers must be turned off first
    //and definition expression will be applied to that 1 year layer
    const defExpression = `ACQ_DATE > date '${startDate}' AND ACQ_DATE < date '${endDate}'`;
    if (layerID === 'MODIS_ACTIVE_FIRES') {
      const modis24H = this._map!.findLayerById('MODIS_ACTIVE_FIRES');
      modis24H.visible = false;
      const modis1Y = this._map!.findLayerById('MODIS1Y') as any;
      modis1Y.sublayers.items[0].definitionExpression = defExpression;
      const modisIds = MODISLayerIDs.map((l) => l.id);
      this._map!.layers.forEach((l) => {
        if (modisIds.includes(l.id)) {
          l.visible = l.id === 'MODIS1Y';
        }
      });
      store.dispatch(setModisStart(String(startDate)));
      store.dispatch(setModisEnd(String(endDate)));
    }
  }

  initializeAndSetMODISLayers(MapImageLayer: any) {
    const modisLayer = MODISLayerIDs.map(({ id, url, layerIds }) => {
      if (!url) return null;
      return new MapImageLayer({
        id: id,
        url,
        visible: false,
        sublayers: [
          {
            id: layerIds[0],
            visible: true,
          },
        ],
      });
    });
    return modisLayer.filter((item) => item !== null);
  }

  setMODISDefinedRange(sublayerType: string): void {
    //Turn off 1Y layer as it does not apply for defined range controls
    const MODIS1Y = this._map?.findLayerById('MODIS1Y');
    MODIS1Y!.visible = false;
    const MODIS24 = this._map!.findLayerById('MODIS_ACTIVE_FIRES');

    switch (sublayerType) {
      case '24 hrs':
        {
          MODIS24.visible = true;
          MODISLayerIDs.forEach(({ id }) => {
            const modisLayer = this._map?.findLayerById(id);

            if (modisLayer) {
              modisLayer.visible = false;
            }
          });
        }
        break;
      case '48 hrs':
        {
          MODIS24.visible = false;
          MODISLayerIDs.forEach(({ id }) => {
            const modisLayer = this._map?.findLayerById(id);
            if (modisLayer) {
              modisLayer.visible = modisLayer.id === 'MODIS48';
            }
          });
        }
        break;
      case '72 hrs':
        {
          MODIS24.visible = false;
          MODISLayerIDs.forEach(({ id }) => {
            const modisLayer = this._map?.findLayerById(id);
            if (modisLayer) {
              modisLayer.visible = modisLayer.id === 'MODIS72';
            }
          });
        }
        break;
      case '7 days':
        {
          MODIS24.visible = false;
          MODISLayerIDs.forEach(({ id }) => {
            const modisLayer = this._map?.findLayerById(id);
            if (modisLayer) {
              modisLayer.visible = modisLayer.id === 'MODIS7D';
            }
          });
        }
        break;
      default:
        break;
    }
  }

  toggleVIIRSorMODIS(layerID: string): void {
    if (!this._map) return;

    const layer = (this._map.allLayers as any).items.filter((layer: LayerProps) => layer.id === layerID)[0];

    if (!layer || !layer.sublayers) {
      return;
    }

    layer.visible = !layer.visible;

    const sublayer24 = layer.sublayers.items.filter(
      (sublayer: __esri.Sublayer) => sublayer.title === 'Global Fires (MODIS) 24 hrs'
    )[0];

    if (sublayer24) {
      sublayer24.visible = true;
    }

    if (layer.id === 'MODIS_ACTIVE_FIRES') {
      MODISLayerIDs.forEach(({ id }) => {
        const specificLayer = this._map?.findLayerById(id);

        if (specificLayer) {
          specificLayer.visible = false;
        }
      });
    }

    const { mapviewState } = store.getState();
    const newLayersArray = mapviewState.allAvailableLayers.map((l) => {
      if (l.id === layer.id) {
        return {
          ...l,
          visible: layer.visible,
        };
      } else {
        return l;
      }
    });
    store.dispatch(allAvailableLayers(newLayersArray));
  }

  updateMODISorVIIRSOpacity(layerID: string, opacity: number): void {
    if (!this._map) {
      return;
    }

    const layer = (this._map.allLayers as any).items.filter((layer: LayerProps) => layer.id === layerID)[0];

    if (!layer || !layer.sublayers) {
      return;
    }

    layer.opacity.combined = opacity;
    const { mapviewState } = store.getState();
    const newLayersArray = mapviewState.allAvailableLayers.map((l) => {
      if (l.id === layerID) {
        return {
          ...l,
          opacity: layer.opacity,
        };
      } else {
        return l;
      }
    });
    store.dispatch(allAvailableLayers(newLayersArray));

    const sublayer24 = layer.sublayers.items.filter(
      (sublayer: __esri.Sublayer) => sublayer.title === 'Global Fires (MODIS) 24 hrs'
    );

    sublayer24.opacity = opacity;

    if (layerID === 'MODIS_ACTIVE_FIRES') {
      MODISLayerIDs.forEach(({ id }) => {
        const specificLayer = this._map?.findLayerById(id);
        if (specificLayer) {
          specificLayer.opacity = opacity;
        }
      });
    }
  }

  //Keeping imagery opacity in global variable due to the nature of placing tiles for imagery service. We re-create layer each time we place the new tile down. Keeping this value in redux introduced a lot of performance issues, thus global here.
  updateImageryOpacity(value: number): void {
    this._imageryOpacity = value;
  }

  toggleImageryLayer(value: boolean, layerID?: string): void {
    if (!layerID) return;
    const layer = this._map?.findLayerById(layerID) as any;
    if (layer && layer.urlTemplate) {
      layer.visible = !layer.visible;
    }
  }

  setDefinedDateRange(layerID: string, sublayerType: string): void {
    if (layerID === 'MODIS_ACTIVE_FIRES') {
      this.setMODISDefinedRange(sublayerType);
    }
  }

  //Helper to deal with URL params and Webmap loaded layers

  syncWebmapLayersWithURL(layerInfosFromURL: LayerInfo[]): void {
    this._map?.layers.forEach((webmapLayer: any) => {
      if (webmapLayer.allSublayers && webmapLayer.allSublayers.items.length > 0) {
        webmapLayer.sublayers.items.forEach((sub: __esri.Layer) => {
          const layerFromURL = layerInfosFromURL.find((l) => l.sublayerID && String(l.sublayerID) === String(sub.id));
          if (layerFromURL) {
            sub.visible = true;
            sub.opacity = layerFromURL.opacity;
          } else {
            sub.visible = false;
          }
        });
      } else {
        const layerFromURL = layerInfosFromURL.find((l) => l.layerID === webmapLayer.id);
        if (layerFromURL) {
          webmapLayer.visible = true;
          webmapLayer.opacity = layerFromURL.opacity;
        } else {
          webmapLayer.visible = false;
        }
      }
    });
  }

  disableMapInteractions(): void {
    if (!this._mapview) return;
    this._mapview.on('mouse-wheel', function (event) {
      event.stopPropagation();
    });
    this._mapview.on('double-click', function (event) {
      event.stopPropagation();
    });
    this._mapview.on('drag', function (event) {
      event.stopPropagation();
    });
  }

  changeLayerDefinitionExpression(layerInfo: LayerProps, defExp: string): void {
    if (layerInfo.type === 'feature') {
      const layerOnMap = this._map?.findLayerById(layerInfo.id) as __esri.FeatureLayer;
      if (layerOnMap) {
        layerOnMap.definitionExpression = defExp;
      }
    } else if (layerInfo.type === 'dynamic') {
      const layerOnMap = this._map?.findLayerById(layerInfo.id) as __esri.MapImageLayer;
      if (layerOnMap) {
        layerOnMap.allSublayers.forEach((sub) => (sub.definitionExpression = defExp));
      }
    }
  }

  async addMapAttribution(container: RefObject<HTMLElement>): Promise<void> {
    if (!container.current) return;
    new Attribution({
      view: this._mapview,
      container: container.current,
    });
  }

  async addScaleBar(container: RefObject<HTMLElement>): Promise<void> {
    if (!container.current) return;
    new ScaleBar({
      view: this._mapview,
      container: container.current,
      style: 'ruler',
      unit: 'metric',
    });
  }

  reorderLayer(layerID: string, index: number) {
    const layerToReorder = this._map?.findLayerById(layerID);
    if (layerToReorder && this._map) {
      //Because UI layer legend ordering is inverse of how esri orders layers on map,
      //we subtract index that represents UI from total number of layers, that gives us the inverse index
      const numberOfLayers = this._map.layers.length - 1;
      const inverseIndex = numberOfLayers - index;
      this._map.reorder(layerToReorder, inverseIndex);
    }
  }

  // Checks two geometries to see if they intersect. And returns intersection geometry if true
  async checkIntersection(geo1: __esri.Geometry, geo2: __esri.Geometry): Promise<boolean> {
    //does it intersect?
    const intersects = (geometryEngine as __esri.geometryEngine).intersects(geo1, geo2);

    // if yes, what is the intersection?
    const intersecting = (geometryEngine as __esri.geometryEngine).intersect(geo1, geo2) as any;
    if (intersects) {
      drawIntersectingGraphic(intersecting);

      const intersectingFeature = {
        attributes: {},
        geometry: intersecting,
        objectid: 0,
      } as any;
      const drawnFeatures: LayerFeatureResult = {
        layerID: 'overlap-feature-layer',
        layerTitle: 'Intersecting User Features',
        features: [intersectingFeature],
        fieldNames: null,
      };

      store.dispatch(setActiveFeatures([drawnFeatures]));

      store.dispatch(setActiveFeatureIndex([0, 0]));
      return true;
    }
    return false;
  }

  getMapView = () => {
    return this._mapview;
  };

  removeMapLayer = (id: string) => {
    const layer = this._map?.layers.find((layer: any) => layer.id === id);
    if (layer) {
      this._map?.remove(layer);
    }
  };

  updateLayerOpacity = (id: string, opacity: number) => {
    const { mapviewState } = store.getState();
    const newLayersArray = mapviewState.allAvailableLayers.map((l: any) => {
      if (l.id === id) {
        return {
          ...l,
          opacity: {
            combined: opacity,
            fill: l.fill,
            outline: l.outline,
          },
        };
      } else {
        return l;
      }
    }) as any;
    store.dispatch(allAvailableLayers(newLayersArray));
  };

  toggleGladLayer = async (params: { id: string; start: Date; end: Date }) => {
    const allAvailableLayers = store.getState().mapviewState.allAvailableLayers;
    const { id, start, end } = params;

    const gladLayerConfig: any = allAvailableLayers.find((layer: any) => layer.id === id);

    const gladLayerOld: any = this._map!.findLayerById(id);
    const gladIndex: number = this._map!.layers.indexOf(gladLayerOld);

    this.removeMapLayer(id);

    const gladLayerNew: any = await LayerFactory(this._mapview, { ...gladLayerConfig, visible: true });

    gladLayerNew.julianFrom = start;
    gladLayerNew.julianTo = end;
    gladLayerNew.gfwjulianFrom = start;
    gladLayerNew.gfwjulianTo = end;
    this._map?.add(gladLayerNew, gladIndex);
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
