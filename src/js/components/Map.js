/* eslint no-unused-vars: 0 */
/* Creating some esri dijits needs the above rule disabled, choosing this over no-new */
import MobileTimeWidget from 'components/MapControls/MobileTimeWidget';
import FooterInfos from 'components/MapControls/FooterInfos';
import AnalysisModal from 'components/Modals/AnalysisModal';
import CoordinatesModal from 'components/Modals/CoordinatesModal';
import Controls from 'components/MapControls/ControlPanel';
import TimeWidget from 'components/MapControls/TimeWidget';
import CanopyModal from 'components/Modals/CanopyModal';
import LayerModal from 'components/Modals/LayerModal';
import SubscriptionsModal from 'components/Modals/SubscriptionsModal';
import SubscribeModal from 'components/Modals/SubscribeModal';
import ConfirmModal from 'components/Modals/ConfirmModal';
import Legend from 'components/LegendPanel/LegendPanel';
import TabButtons from 'components/TabPanel/TabButtons';
import SearchModal from 'components/Modals/SearchModal';
import PrintModal from 'components/Modals/PrintModal';
import TabView from 'components/TabPanel/TabView';
import layerKeys from 'constants/LayerConstants';
import arcgisUtils from 'esri/arcgis/utils';
import mapActions from 'actions/MapActions';
import appActions from 'actions/AppActions';
import layerActions from 'actions/LayerActions';
import LayerDrawingOptions from 'esri/layers/LayerDrawingOptions';
import Scalebar from 'esri/dijit/Scalebar';
import Edit from 'esri/toolbars/edit';
import basemaps from 'esri/basemaps';
import Measurement from 'esri/dijit/Measurement';
import webMercatorUtils from 'esri/geometry/webMercatorUtils';
import {actionTypes} from 'constants/AppConstants';
import on from 'dojo/on';
import dom from 'dojo/dom';
import Deferred from 'dojo/Deferred';
import {getUrlParams} from 'utils/params';
import basemapUtils from 'utils/basemapUtils';
import analysisUtils from 'utils/analysisUtils';
import MapStore from 'stores/MapStore';
import {mapConfig} from 'js/config';
import utils from 'utils/AppUtils';
import WMSLayerInfo from 'esri/layers/WMSLayerInfo';
import WMSLayer from 'esri/layers/WMSLayer';
import Extent from 'esri/geometry/Extent';
import Graphic from 'esri/graphic';
import InfoTemplate from 'esri/InfoTemplate';
import Point from 'esri/geometry/Point';
import symbols from 'utils/symbols';
import resources from 'resources';
import moment from 'moment';
import layersHelper from 'helpers/LayersHelper';
import SVGIcon from 'utils/svgIcon';
import ImageryModal from 'components/Modals/ImageryModal';
import ScreenPoint from 'esri/geometry/ScreenPoint';
import ImageryHoverModal from 'components/SatelliteImagery/ImageryHoverModal';

import React, {
  Component,
  PropTypes
} from 'react';
import {setupCartoLayers} from '../utils/cartoHelper';
import { wmsClick, getWMSFeatureInfo, createWMSGraphics } from 'utils/wmsUtils';

let mapLoaded, legendReady = false;
let scalebar, paramsApplied, editToolbar = false;

const getTimeInfo = (operationalLayer) => {
  return operationalLayer.resourceInfo && operationalLayer.resourceInfo.timeInfo;
};

const getTimeEnabledLayer = (webmapInfo) => {
  let timeLayer;
  if (webmapInfo && webmapInfo.operationalLayers) {
    webmapInfo.operationalLayers.some((layer) => {
      if (layer && layer.resourceInfo && layer.resourceInfo.timeInfo) {
        timeLayer = layer;
        return true;
      }
    });
  }
  return timeLayer;
};

export default class Map extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired
  };

  static childContextTypes = {
    activeWebmap: PropTypes.string,
    webmapInfo: PropTypes.object,
    map: PropTypes.object
  };

  getChildContext = () => {
    return {
      activeWebmap: this.props.activeWebmap,
      webmapInfo: this.state.webmapInfo,
      map: this.state.map
    };
  };

  constructor (props) {
    super(props);
    this.map = {};
    this.webmapInfo = {};
    this.state = {
      map: {},
      webmapInfo: {},
      ...MapStore.getState()
    };

  }

  componentDidMount() {
    MapStore.listen(this.storeDidUpdate);
  }

  componentDidUpdate (prevProps, prevState) {
    const {settings, language} = this.context;
    const {activeWebmap} = this.props;
    const {basemap, map, editingEnabled} = this.state;

    // If the webmap is retrieved from AGOL or the resources file, or it changes
    if (
      prevProps.activeWebmap === undefined && activeWebmap ||
      prevProps.activeWebmap !== undefined && prevProps.activeWebmap !== activeWebmap
    ) {
      const options = mapConfig.options;

      if (map.destroy) {
        // Don't let the extent change to the new map
        options.extent = map.extent;
        map.destroy();
        if (editToolbar && editToolbar.refresh) {
          editToolbar.refresh();
        }
        if (scalebar && scalebar.destroy) {
          scalebar.destroy();
        }
      }
      this.createMap(activeWebmap, options);
    }

    if ((prevState.basemap !== basemap || prevState.map !== map) && map.loaded) {
      basemapUtils.updateBasemap(map, basemap, settings.layerPanel.GROUP_BASEMAP.layers);
    }

    if (prevState.editingEnabled !== editingEnabled) {
      if (!editingEnabled) {
        editToolbar.deactivate();
      } else {
        if (map.infoWindow && map.infoWindow.getSelectedFeature) {
          const selectedFeature = map.infoWindow.getSelectedFeature();
          editToolbar.activate(Edit.EDIT_VERTICES, selectedFeature);
        }
      }
    }
  }

  storeDidUpdate = () => {
    this.setState(MapStore.getState());
  };
  
  getSelectedFeatureTitles = () => {
    // let selectedFeats;
    const selectedFeatureTitlesArray = [];
    if (brApp.map.infoWindow && brApp.map.infoWindow.getSelectedFeature()) {
      // Save this if later on we support getting multiple selected features in the report
      // selectedFeats = brApp.map.infoWindow.features;
      // selectedFeats.forEach(selectedFeat => {
      // if (selectedFeat && selectedFeat._layer && selectedFeat._layer.infoTemplate && selectedFeat._layer.infoTemplate.title) {
      //   selectedFeatureTitlesArray.push(selectedFeat._layer.infoTemplate.title(selectedFeat));
      // } else if (selectedFeat && selectedFeat._layer && selectedFeat._layer.name) {
      //   selectedFeatureTitlesArray.push(selectedFeat._layer.name);
      // }
      // });
      const selectedFeat = brApp.map.infoWindow.getSelectedFeature();
      const displayField = selectedFeat._layer.displayField;
      const name = selectedFeat._layer.name;
      const fieldName = selectedFeat.attributes[displayField];
      if (fieldName){
      selectedFeatureTitlesArray.push(`${name}: ${fieldName}`);
      } else {
        selectedFeatureTitlesArray.push(name);
      }
      layerActions.updateSelectedFeatureTitles.defer(selectedFeatureTitlesArray);
    }
  };
  
  clearSelectedFeaturesTitles = () => {
    const emptyArray = [];
    layerActions.updateSelectedFeatureTitles.defer(emptyArray);
  };

  createMap = (webmap, options) => {
    const {language, settings} = this.context;
    const { canopyDensity } = this.state;

    arcgisUtils.createMap(webmap, this.refs.map, { mapOptions: options, usePopupManager: true }).then(response => {
      const {itemData} = response.itemInfo;

      // Add operational layers from the webmap to the array of layers from the config file.
      this.addLayersToLayerPanel(settings, itemData.operationalLayers);
      // Store a map reference and clear out any default graphics
      response.map.graphics.clear();
      //- Attach events I need for the info window
      response.map.infoWindow.on('show, hide, set-features, selection-change', mapActions.infoWindowUpdated);
      response.map.infoWindow.on('set-features, selection-change', this.getSelectedFeatureTitles);
      response.map.infoWindow.on('hide', this.clearSelectedFeatureTitles);
      response.map.on('zoom-end', mapActions.mapUpdated);

      //- Add a scalebar
      scalebar = new Scalebar({
        map: response.map,
        scalebarUnit: 'metric'
      });

      on.once(response.map, 'update-end', () => {
        if (response.map.id !== 'esri.Map_0') {
          mapLoaded = false;
        }
        mapActions.createLayers(response.map, settings.layerPanel, this.state.activeLayers, language);
        const cDensityFromHash = this.applyLayerStateFromUrl(response.map, itemData);
        //- Apply the mask layer defintion if present
        if (settings.iso && settings.iso !== '') {
          const maskLayer = response.map.getLayer(layerKeys.MASK);
          if (maskLayer) {
            const layerDefs = [];
            maskLayer.visibleLayers.forEach((layerNum) => {
              layerDefs[layerNum] = `code_iso3 <> '${encodeURIComponent(settings.iso)}'`;
            });
            maskLayer.setLayerDefinitions(layerDefs);
            maskLayer.show();
          }
        }

        response.map.on('extent-change', (evt) => {
          const imageryLayer = response.map.getLayer(layerKeys.RECENT_IMAGERY);
          if (!imageryLayer || !imageryLayer.visible || evt.lod.level > 9) { return; }

          const { imageryParams } = this.state;
          const params = imageryParams ? imageryParams : {};


          const xVal = window.innerWidth / 2;
          const yVal = window.innerHeight / 2;

          // Create new screen point at center;
          const screenPt = new ScreenPoint(xVal, yVal);
          // Convert screen point to map point and zoom to point;
          const mapPt = response.map.toMap(screenPt);
          // Note: Lat and lon are intentionally reversed until imagery api is fixed.
          // The imagery API only returns the correct image for that lat/lon if they are reversed.
          params.lon = mapPt.getLatitude();
          params.lat = mapPt.getLongitude();

          mapActions.getSatelliteImagery(params);
        });

        // Get WMS Features on click
        response.map.on('click', (evt) => {
          if (this.state.drawButtonActive || this.state.enterValuesButtonActive) {
            // don't run this function if we are drawing a custom shape
            return;
          }
          const wmsLayers = brApp.map.layerIds
            .filter(id => id.toLowerCase().indexOf('wms') > -1)
            .map(wmsId => brApp.map.getLayer(wmsId))
            .filter(layer => layer.visible);

          if (wmsLayers.length) {
            wmsClick(evt, wmsLayers, brApp.map.extent).then(responses => {
              const wmsGraphics = [];

              Object.keys(responses).forEach(layerId => {
                if (Array.isArray(responses[layerId]) && responses[layerId].length > 0) {
                  createWMSGraphics(responses, layerId, wmsGraphics);
                  brApp.map.infoWindow.setFeatures(wmsGraphics);
                } else {
                  console.error(`error: ${responses[layerId].error}`);
                }
              });
            });
          }
        });

        //- Add click event for user-features layer
        const userFeaturesLayer = response.map.getLayer(layerKeys.USER_FEATURES);
        userFeaturesLayer.on('click', (evt) => {
          if (evt.graphic && evt.graphic.attributes && !this.state.editingEnabled) {
            evt.stopPropagation();
            if (!evt.graphic.attributes.geostoreId) {
              analysisUtils.registerGeom(evt.graphic.geometry).then(res => {
                evt.graphic.attributes.geostoreId = res.data.id;
                response.map.infoWindow.setFeatures([evt.graphic]);
              });
            } else {
              response.map.infoWindow.setFeatures([evt.graphic]);
            }
          }
        });

        editToolbar = new Edit(response.map);
        editToolbar.on('deactivate', evt => {
          if (evt.info.isModified) {

            if (evt.graphic.geometry.spatialReference.wkid === 4326){
              evt.graphic.setGeometry(
                webMercatorUtils.geographicToWebMercator(evt.graphic.geometry)
              );
            }

            const { userSubscriptions } = this.state;

            const matchingUserSubscriptions = userSubscriptions.filter(userSubscription => {
              return userSubscription && evt.graphic.attributes && userSubscription.attributes.params.geostore === evt.graphic.attributes.geostoreId;
            });

            analysisUtils.registerGeom(evt.graphic.geometry).then(res => {
              evt.graphic.attributes.geostoreId = res.data.id;
              if (matchingUserSubscriptions.length > 0) {
                this.updateThenDeleteSubscription(res.data.id, matchingUserSubscriptions[0]).then(updatedSubscription => {
                  response.map.infoWindow.setFeatures([evt.graphic]);
                });
              } else {
                response.map.infoWindow.setFeatures([evt.graphic]);
              }
            });
          }
        });

        // This function needs to happen after the layer has loaded
        // otherwise the layer breaks until you manually set the canopyDensity
        // if we get canopy density from the hash, use that instead!

        layersHelper.updateAGBiomassLayer(cDensityFromHash ? cDensityFromHash : canopyDensity, response.map);

      });
      const { initialExtent } = settings;
      if (initialExtent && initialExtent.x && initialExtent.y && initialExtent.z) {
        //- Set the map's extent to the x/y/z specified in settings
        response.map.centerAndZoom(new Point(initialExtent.x, initialExtent.y), initialExtent.z);
      } else {
        //- Set the map's extent to its current extent to trigger our update-end
        response.map.setExtent(response.map.extent);
      }

      //- Load any shared state if available but only on first load
      if (!paramsApplied) {
        this.applyStateFromUrl(response.map, getUrlParams(location.href));
        paramsApplied = true;
      }
      //- Make the map a global in debug mode for easier debugging
      if (brApp.debug) { brApp.map = response.map; }

      //- Update local state since the map is ready now, keep above userFeaturesLayer
      //- If that layer has an invalid token, it may cause issues
      this.setState({
        webmapInfo: response.itemInfo.itemData,
        map: response.map
      });
    });
  };

  deleteSubscription = id => {
    const deferred = new Deferred();
    fetch(
      `https://production-api.globalforestwatch.org/v1/subscriptions/${id}`,
      {
        method: 'DELETE',
        credentials: 'include'
      }
    ).then(response => {
      let hasError = false;
      if (response.status !== 200) {
        hasError = true;
      }

      response.json().then(json => {
        if (hasError) {
          console.error(json);
          deferred.reject(json);
          return;
        } else {
          mapActions.deleteSubscription({});
          deferred.resolve(true);
        }

      });
    });

    return deferred;
  }

  updateSubscription = jsonData => {
    const deferred = new Deferred();

    fetch(
      'https://production-api.globalforestwatch.org/v1/subscriptions',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
      }
    ).then(response => {
      let hasError = false;
      if (response.status !== 200) {
        hasError = true;
      }

      response.json().then(json => {
        if (hasError) {
          console.error(json);
          deferred.reject(json);
          return;
        } else {
          deferred.resolve(json.data.id);
        }
      });
    });

    return deferred;
  }

  updateThenDeleteSubscription = (registeredGeomId, userSubscription) => {
    const deferred = new Deferred();

    const {language} = this.context;

    const jsonData = {
      confirmed: userSubscription.attributes.confirmed,
      createdAt: userSubscription.attributes.createdAt,
      datasets: userSubscription.attributes.datasets,
      datasetsQuery: userSubscription.attributes.datasetsQuery,
      language: language,
      name: userSubscription.attributes.name,
      params: {
        geostore: registeredGeomId,
        iso: {
          country: null,
          region: null
        },
        use: null,
        useid: null,
        wdpaid: null
      },
      resource: userSubscription.attributes.resource,
      userId: userSubscription.attributes.userId
    };

    this.deleteSubscription(userSubscription.id).then(() => {
      this.updateSubscription(jsonData).then((newId) => {

        const updatedSubscription = {
          attributes: jsonData,
          id: newId,
          type: 'subscription'
        };
        const index = this.state.userSubscriptions.map(e => e.id ).indexOf(userSubscription.id);

        const remainingSubscriptions = this.state.userSubscriptions.slice();
        remainingSubscriptions.splice(index, 1, updatedSubscription);


        mapActions.setUserSubscriptions(remainingSubscriptions);
        deferred.resolve(remainingSubscriptions);
      });
    });

    return deferred;
  }

  applyStateFromUrl = (map, params) => {
    const {settings} = this.context;
    const {x, y, z, l, b, t, c, gs, ge, ts, te, ls, le} = params;

    const langKeys = Object.keys(settings.labels);

    // Set zoom. If we have a language, set that after we have gotten our hash-initiated extent
    if (x && y && z && l && langKeys.indexOf(l) > -1) {
      on.once(map, 'extent-change', () => {
        appActions.setLanguage.defer(l);
      });

      map.centerAndZoom([x, y], z);
    } else if (x && y && z) {
      map.centerAndZoom([x, y], z);
    } else if (l && langKeys.indexOf(l) > -1) {
      appActions.setLanguage.defer(l);
    }

    if (t) {
      mapActions.changeActiveTab(t);
    }

  };

  /**
  * NOTE: We are applying state here for certain properties because of the timing of these actions: certain things
  * like terrai & basemaps need to be set After our map has been loaded or layers have been added
  */
  applyLayerStateFromUrl = (map, itemData) => {
    const {settings} = this.context;
    const basemap = itemData && itemData.baseMap;
    const params = getUrlParams(location.href);


    //- Set the default basemap in the store
    basemapUtils.prepareDefaultBasemap(map, basemap.baseMapLayers, basemap.title);

    if (params.b) {
      mapActions.changeBasemap(params.b);
    }
    if (params.a) {

      const layerIds = params.a.split(',');
      const opacityValues = params.o.split(',');
      const opacityObjs = [];

      const webmapLayerConfigs = settings.layerPanel.GROUP_WEBMAP.layers;
      const webmapLayerIds = webmapLayerConfigs.map(config => config.subId ? config.subId : config.id);

      layerIds.forEach((layerId, j) => {
        if (webmapLayerIds.indexOf(layerId) === -1) {
          layerActions.addActiveLayer(layerId);
        }
        if (opacityValues[j] && opacityValues[j] !== 1) {
          opacityObjs.push({
            layerId: layerId,
            value: parseFloat(opacityValues[j])
          });

          const mapLayer = map.getLayer(layerId);

          const dynamicLayers = [layerKeys.MODIS_ACTIVE_FIRES, layerKeys.VIIRS_ACTIVE_FIRES, layerKeys.IMAZON_SAD];

          if ((mapLayer && !mapLayer.setLayerDrawingOptions && mapLayer.setOpacity) || (mapLayer && dynamicLayers.indexOf(mapLayer.id) > -1)) {
            mapLayer.setOpacity(opacityValues[j]);
          } else if (mapLayer && mapLayer.setLayerDrawingOptions) {
            const options = mapLayer.layerDrawingOptions || [];
            // Transparency is the reverse of other layers, 0.25 opacity = transparency of value 75
            mapLayer.visibleLayers.forEach(visibleLayer => {
              options[visibleLayer] = new LayerDrawingOptions({ transparency: 100 - (opacityValues[j] * 100) });
            });

            mapLayer.setLayerDrawingOptions(options);
          }
        }
      });

      if (webmapLayerIds.length > 0) {
        const webmapIdConfig = {};

        webmapLayerConfigs.forEach(webmapLayerConfig => {

          if (webmapLayerConfig.subIndex === undefined) {
            const featLayer = map.getLayer(webmapLayerConfig.id);
            if (webmapLayerConfig.visible && layerIds.indexOf(webmapLayerConfig.id) === -1) {
              featLayer.hide();
              layerActions.removeActiveLayer(webmapLayerConfig.id);
            } else if (!webmapLayerConfig.visible && layerIds.indexOf(webmapLayerConfig.id) > -1) {
              featLayer.show();
              layerActions.addActiveLayer(webmapLayerConfig.id);
            }
          } else {
            if ((layerIds.indexOf(webmapLayerConfig.subId) === -1 && webmapLayerConfig.visible) ||
            (layerIds.indexOf(webmapLayerConfig.subId) > -1 && !webmapLayerConfig.visible)) {

              if (!webmapIdConfig[webmapLayerConfig.id]) {
                webmapIdConfig[webmapLayerConfig.id] = {
                  layersToHide: [],
                  layersToShow: []
                };
              }

              if (layerIds.indexOf(webmapLayerConfig.subId) === -1 && webmapLayerConfig.visible) {
                webmapIdConfig[webmapLayerConfig.id].layersToHide.push(webmapLayerConfig.subIndex);
              } else {
                webmapIdConfig[webmapLayerConfig.id].layersToShow.push(webmapLayerConfig.subIndex);
              }
            }
          }

        });

        Object.keys(webmapIdConfig).forEach(webmapId => {
          const mapLaya = map.getLayer(webmapId);
          const updateableVisibleLayers = mapLaya.visibleLayers.slice();

          webmapIdConfig[webmapId].layersToHide.forEach(layerToHide => {
            updateableVisibleLayers.splice(updateableVisibleLayers.indexOf(layerToHide), 1);
            const subLayerConfig = utils.getObject(webmapLayerConfigs, 'subId', `${webmapId}_${layerToHide}`);
            layerActions.removeSubLayer(subLayerConfig);
          });
          webmapIdConfig[webmapId].layersToShow.forEach(layerToShow => {
            if (updateableVisibleLayers.indexOf(layerToShow) === -1) {
              updateableVisibleLayers.push(layerToShow);
              const subLayerConfig = utils.getObject(webmapLayerConfigs, 'subId', `${webmapId}_${layerToShow}`);
              layerActions.addSubLayer(subLayerConfig);
            }
          });

          mapLaya.setVisibleLayers(updateableVisibleLayers);

        });
      }

      layerActions.setOpacities(opacityObjs);
    }

    if (params.ls && params.le) {
      layerActions.updateLossTimeline({
        fromSelectedIndex: parseInt(params.ls),
        toSelectedIndex: parseInt(params.le)
      });
    }

    if (params.ts && params.te) {
      layerActions.updateTerraIStartDate.defer(new Date(params.ts.replace(/-/g, '/')));
      layerActions.updateTerraIEndDate.defer(new Date(params.te.replace(/-/g, '/')));
    }

    if (params.gs && params.ge) {
      layerActions.updateGladStartDate(new Date(params.gs.replace(/-/g, '/')));
      layerActions.updateGladEndDate(new Date(params.ge.replace(/-/g, '/')));
    }

    if (params.fs && params.fe) {
      layerActions.updateFormaStartDate(new Date(params.gs.replace(/-/g, '/')));
      layerActions.updateFormaEndDate(new Date(params.ge.replace(/-/g, '/')));
    }

    if (params.vs && params.ve) {
      layerActions.updateViirsStartDate(new Date(params.vs.replace(/-/g, '/')));
      layerActions.updateViirsEndDate(new Date(params.ve.replace(/-/g, '/')));
    }

    if (params.ms && params.me) {
      layerActions.updateModisStartDate(new Date(params.ms.replace(/-/g, '/')));
      layerActions.updateModisEndDate(new Date(params.me.replace(/-/g, '/')));
    }

    if (params.ism && params.iem && params.isy && params.iey) {
      mapActions.updateImazonAlertSettings(actionTypes.UPDATE_IMAZON_START_MONTH, parseInt(params.ism));
      mapActions.updateImazonAlertSettings(actionTypes.UPDATE_IMAZON_END_MONTH, parseInt(params.iem));
      mapActions.updateImazonAlertSettings(actionTypes.UPDATE_IMAZON_START_YEAR, parseInt(params.isy));
      mapActions.updateImazonAlertSettings(actionTypes.UPDATE_IMAZON_END_YEAR, parseInt(params.iey));
    }

    if (params.c) {
      mapActions.updateCanopyDensity(parseInt(params.c));
    }

    return params.c ? parseInt(params.c) : false;
  }

  addLayersToLayerPanel = (settings, operationalLayers) => {
    const {language} = this.context;
    let layers = [];

    // If an additional language is configured but no additional webmap is, we need to push the layer config into both
    // languages so the original webmap works in both views
    const saveLayersInOtherLang = (
      // !settings.alternativeWebmap && //This statement can't grab certain bilingual labels
      settings.alternativeLanguage &&
      settings.useAlternativeLanguage
    );

    if (settings.includeCartoTemplateLayers) {
      const {cartoUser, cartoApiKey, cartoTemplateId, cartoGroupLabel } = settings;
      const cartoGroup = setupCartoLayers(cartoUser, cartoTemplateId, cartoApiKey, cartoGroupLabel, language);
      cartoGroup.order = Object.keys(settings.layerPanel).length - 2;
      settings.layerPanel.GROUP_CARTO = cartoGroup;
    }
    // Add the layers to the webmap group
    /**
    * NOTE: We use unshift because pushing the layers into an array results in a list that is
    * reversed from the webmap in ArcGIS Online, however, dynamic layers show up as separate layers in
    * our UI, but not in AGOL, so we need to not reverse those individual layers but make sure as a group
    * they show up in the correct location, which is why they have different logic for adding them to
    * the list than any other layers, push them in an array, then unshift in reverse order
    */
    operationalLayers.forEach((layer, layerIndex) => {
      if (layer.layerType === 'ArcGISMapServiceLayer' && layer.resourceInfo.layers) {
        const dynamicLayers = [];
        layer.resourceInfo.layers.forEach((sublayer, sublayerIndex) => {
          const visible = layer.layerObject.visibleLayers.indexOf(sublayer.id) > -1;
          const scaleDependency = (sublayer.minScale > 0 || sublayer.maxScale > 0);
          const layerInfo = {
            id: layer.id,
            subId: `${layer.id}_${sublayer.id}`,
            subIndex: sublayer.id,
            hasScaleDependency: scaleDependency,
            maxScale: sublayer.maxScale,
            minScale: sublayer.minScale,
            // we are assuming the webmap language correctly matches the app settings
            label: {
              [language]: sublayer.name,
            },
            opacity: 1,
            visible: visible,
            order: (layerIndex + 1) + sublayerIndex,
            esriLayer: layer.layerObject,
            itemId: layer.itemId
          };
          dynamicLayers.push(layerInfo);
          // if (layerInfo.visible) { layerActions.addSubLayer(layerInfo); }
        });

        // Push the dynamic layers into the array in their current order
        for (let i = dynamicLayers.length - 1; i >= 0; i--) {
          layers.unshift(dynamicLayers[i]);
        }
      } else if (layer.layerType === 'ArcGISFeatureLayer' && layer.featureCollection && layer.featureCollection.layers) {
        layer.featureCollection.layers.forEach((sublayer) => {
          const layerInfo = {
            id: sublayer.id,
            // we are assuming the webmap language correctly matches the app settings
            label: {
              [language]: sublayer.title
            },
            // opacity: sublayer.opacity,
            opacity: 0.6,
            visible: layer.visibility,
            esriLayer: sublayer.layerObject,
            itemId: layer.itemId
          };
          sublayer.layerObject.setOpacity(0.6);
          layers.unshift(layerInfo);
          if (layerInfo.visible) { layerActions.addActiveLayer(layerInfo.id); }
        });
      } else {
        const layerInfo = {
          id: layer.id,
          // we are assuming the webmap language correctly matches the app settings
          label: {
            [language]: layer.title
          },
          // opacity: layer.opacity,
          opacity: 0.6,
          visible: layer.visibility,
          esriLayer: {
            ...layer.layerObject,
            type: layer.layerType,
          },
          itemId: layer.itemId
        };
        layer.layerObject.setOpacity(0.6);
        layers.unshift(layerInfo);
        if (layerInfo.visible) { layerActions.addActiveLayer(layerInfo.id); }
      }
    });

    const groupKeys = Object.keys(settings.layerPanel)
      .filter(g => g !== layerKeys.EXTRA_LAYERS && g !== layerKeys.GROUP_BASEMAP);
    const exclusiveLayerIds = [];
    groupKeys.forEach(groupKey => {
      const group = settings.layerPanel[groupKey];
      switch (group.groupType) {
        case 'radio': {
          let groupLayers = [];
          const groupSublayers = [];

          if (group.layers.length) {
            const layersFromWebmap = group.layers.filter(l => !l.url);
            layersFromWebmap.forEach(l => {
              if (l.hasOwnProperty('includedSublayers')) { // this is a dynamic layer
                layers.forEach(webmapLayer => {
                  if (l.id === webmapLayer.id && l.includedSublayers.indexOf(webmapLayer.subIndex) > -1) {
                    webmapLayer.isRadioLayer = true;
                    groupSublayers.push({
                      ...l,
                      ...webmapLayer
                    });
                  }
                });
                groupLayers = groupLayers.concat(groupSublayers);
              } else { // this is not a dynamic layer
                const mapLayer = layers.filter(l2 => l2.id === l.id)[0] || {};
                layers.splice(layers.indexOf(mapLayer), 1);
                mapLayer.isRadioLayer = true;
                groupLayers.push({
                  ...l,
                  ...mapLayer
                });
              }
            });
          } else {
            layers.forEach(webmapLayer => {
              webmapLayer.isRadioLayer = true;
              if (webmapLayer.subId) { // this is a dynamic layer
                groupLayers.push(webmapLayer);
              }
            });
          }

          groupLayers.forEach(gl => {
            const layerConfigToReplace = utils.getObject(group.layers, 'id', gl.id);
            group.layers.splice(group.layers.indexOf(layerConfigToReplace), 1, gl);
          });

          group.layers.forEach(l => {
            l.isRadioLayer = true;
            if (exclusiveLayerIds.indexOf(l.id) === -1) { exclusiveLayerIds.push(l.id); }
          });
          break;
        }
        case 'checkbox': {
          const layersFromWebmap = [];
          group.layers.filter(l => !l.url).forEach(l => {

            if (l.includedSublayers && l.includedSublayers.length > 0) {

              l.includedSublayers.forEach(sublayer => {

                const mapLayer = layers.filter(l2 => l2.id === l.id && l2.subIndex === sublayer)[0];

                layers = [
                  ...layers.slice(0, layers.indexOf(mapLayer)),
                  ...layers.slice(layers.indexOf(mapLayer) + 1)
                ];

                layersFromWebmap.push({
                  ...l,
                  ...mapLayer
                });
              });

            }
          });

          const newLayers = [];

          layersFromWebmap.forEach(lfw => {
            newLayers.push(lfw);
          });
          group.layers = newLayers;

          break;
        }
        case 'nested': {
          group.layers.forEach(nestedGroup => {
            if (!nestedGroup.hasOwnProperty('nestedLayers')) {
              throw new Error(`nested groups must contain a 'nestedLayers' property. You may have made a configuration error. Check the 'resources.js' file`);
            }
            const layersFromWebmap = nestedGroup.nestedLayers.filter(nl => !nl.url)
              .map(l => {
                const mapLayer = layers.filter(l2 => l2.id === l.id)[0];

                layers = [
                  ...layers.slice(0, layers.indexOf(mapLayer)),
                  ...layers.slice(layers.indexOf(mapLayer) + 1)
                ];

                return {
                  ...l,
                  ...mapLayer
                };
              });

            layersFromWebmap.forEach(nl => {
              const layerConfigToReplace = utils.getObject(nestedGroup.nestedLayers, 'id', nl.id);
              nestedGroup.nestedLayers = [
                ...nestedGroup.nestedLayers.slice(0, nestedGroup.nestedLayers.indexOf(layerConfigToReplace)),
                nl,
                ...nestedGroup.nestedLayers.slice(nestedGroup.nestedLayers.indexOf(layerConfigToReplace) + 1)
              ];
            });
          });
        }
        break;
        default:
      }
    });

    const webmapGroup = settings.layerPanel.GROUP_WEBMAP;
    webmapGroup.layers = layers;
    if (!webmapGroup.label.hasOwnProperty(language)) {
      if (settings.alternativeLanguage === language) {
        webmapGroup.label[language] = settings.alternativeWebmapMenuName;
      } else {
        webmapGroup.label[language] = settings.webmapMenuName;
      }
    }

    mapActions.updateExclusiveRadioIds(exclusiveLayerIds);
  };

  render () {
    const {
      mobileTimeWidgetVisible,
      currentTimeExtent,
      printModalVisible,
      analysisModalVisible,
      coordinatesModalVisible,
      searchModalVisible,
      canopyModalVisible,
      layerModalVisible,
      userSubscriptions,
      subscriptionsModalVisible,
      subscribeModalVisible,
      confirmModalVisible,
      subscriptionToDelete,
      modalLayerInfo,
      webmapInfo,
      map,
      activeLayers,
      imageryModalVisible,
      imageryError
    } = this.state;

    const { settings } = this.context;

    const timeSlider = webmapInfo && webmapInfo.widgets && webmapInfo.widgets.timeSlider;
    const timeWidgets = [];

    if (timeSlider) {
      const layer = getTimeEnabledLayer(webmapInfo);
      timeWidgets.push(<TimeWidget
                        map={map}
                        currentTimeExtent={currentTimeExtent}
                        timeInfo={getTimeInfo(layer)}
                        sliderProps={timeSlider.properties} />);
      timeWidgets.push(<MobileTimeWidget
                        map={map}
                        visible={mobileTimeWidgetVisible}
                        currentTimeExtent={currentTimeExtent}
                        timeInfo={getTimeInfo(layer)} />);
    }

    if (map.loaded === true && !mapLoaded) {
      mapLoaded = true;
      on.once(map, 'layers-add-result', layers => {
        legendReady = true;
        this.forceUpdate();
      });
    }

    return (
      <div className={`map-container ${!timeSlider ? 'noSlider' : ''}`}>
        <div ref='map' className='map'>
          <Controls {...this.state} timeEnabled={!!timeSlider} />

          <TabButtons {...this.state} />
          {map.loaded && <TabView {...this.state} activeWebmap={this.props.activeWebmap} />}
          {legendReady ? <Legend
            allLayers={this.state.allLayers}
            tableOfContentsVisible={this.state.tableOfContentsVisible}
            activeLayers={activeLayers}
            legendOpen={this.state.legendOpen}
            dynamicLayers={this.state.dynamicLayers}
            legendOpacity={this.state.legendOpacity}
            initialLayerOpacities={this.state.initialLayerOpacities}
          /> : null}
          <FooterInfos hidden={settings.hideFooter} map={map} />
          {timeWidgets}
          <svg className={`map__viewfinder${map.loaded ? '' : ' hidden'}`}>
            <SVGIcon id={'shape-crosshairs'} />

          </svg>
        </div>
        <div className={`analysis-modal-container modal-wrapper ${analysisModalVisible && !coordinatesModalVisible ? '' : 'hidden'}`}>
          <AnalysisModal drawButtonActive={this.state.drawButtonActive} />
        </div>
        <div className={`coordinates-modal-container modal-wrapper ${coordinatesModalVisible ? '' : 'hidden'}`}>
          <CoordinatesModal enterValuesButtonActive={this.state.enterValuesButtonActive} />
        </div>
        <div className={`print-modal-container modal-wrapper ${printModalVisible ? '' : 'hidden'}`}>
          <PrintModal />
        </div>
        <div className={`search-modal-container modal-wrapper ${searchModalVisible ? '' : 'hidden'}`}>
          <SearchModal />
        </div>
        <div className={`canopy-modal-container modal-wrapper ${canopyModalVisible ? '' : 'hidden'}`}>
          <CanopyModal canopyDensity={this.state.canopyDensity} />
        </div>
        <div className={`layer-modal-container modal-wrapper ${layerModalVisible ? '' : 'hidden'}`}>
          <LayerModal info={modalLayerInfo} />
        </div>
        <div className={`subscription-modal-container modal-wrapper ${subscriptionsModalVisible ? '' : 'hidden'}`}>
          <SubscriptionsModal userSubscriptions={userSubscriptions} />
        </div>
        <div className={`subscription-modal-container modal-wrapper ${subscribeModalVisible ? '' : 'hidden'}`}>
          <SubscribeModal userSubscriptions={userSubscriptions} />
        </div>
        <div className={`subscription-modal-container modal-wrapper ${confirmModalVisible ? '' : 'hidden'}`}>
          <ConfirmModal userSubscriptions={userSubscriptions} subscriptionToDelete={subscriptionToDelete} />
        </div>
        <div className={`imagery-modal-container ${imageryModalVisible ? '' : 'collapse'}`}>
          <ImageryModal
            imageryData={this.state.imageryData}
            loadingImagery={this.state.loadingImagery}
            imageryModalVisible={imageryModalVisible}
            imageryError={imageryError}
            imageryHoverVisible={this.state.imageryHoverVisible}
          />
        </div>
        { this.state.imageryHoverInfo && this.state.imageryHoverInfo.visible &&
            <ImageryHoverModal
              selectedImagery={this.state.selectedImagery}
              top={this.state.imageryHoverInfo.top}
              left={this.state.imageryHoverInfo.left}/>
        }
      </div>
    );
  }
}
