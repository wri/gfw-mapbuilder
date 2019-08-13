import layerInfoCache from 'utils/layerInfoCache';
import {attributes, actionTypes } from 'constants/AppConstants';
import layerKeys from 'constants/LayerConstants';
import tabKeys from 'constants/TabViewConstants';
import appActions from 'actions/AppActions';
import mapActions from 'actions/MapActions';
import layerActions from 'actions/LayerActions';
import dispatcher from 'js/dispatcher';
import LayersHelper from 'helpers/LayersHelper';
import analysisUtils from 'utils/analysisUtils';
import {layerPanelText} from 'js/config';
import request from 'utils/request';
import moment, { relativeTimeThreshold } from 'moment';
import all from 'dojo/promise/all';
import { urls } from 'js/config';

let isRegistering = false;

class MapStore {

  constructor () {
    //- Default is closed, using any value as default will cause an ugly
    //- appearance on mobile when loading, set the default in TabButtons componentWillReceiveProps
    //- the default may change based on device, and content available from AGOL
    this.activeTab = '';

    this.activeLayers = [];
    this.activeVersions = {};
    this.allLayers = [];
    this.basemap = null;
    this.legendOpen = false;
    this.landsatVisible = false;
    this.dynamicLayers = {};
    this.activeAnalysisType = 'default';
    this.cartoSymbol = {};
    this.lossFromSelectIndex = 0; // Will get initialized when the data is fetched
    this.lossToSelectIndex = 16;
    this.resetSlider = false;
    this.gladStartDate = new Date('2015', 0, 1);
    this.gladEndDate = new Date();
    this.formaStartDate = new Date('2012', 0, 1);
    this.formaEndDate = new Date();
    this.terraIStartDate = new Date('2004', 0, 1);
    this.terraIEndDate = new Date('2016', 6, 12);
    this.viirsStartDate = moment(new Date()).subtract(1, 'day');
    this.viirsEndDate = moment(new Date());
    this.modisStartDate = moment(new Date()).subtract(1, 'day');
    this.modisEndDate = moment(new Date());
    this.lossOptions = [];
    this.userSubscriptions = [];
    this.tableOfContentsVisible = true;
    this.editingEnabled = false;
    this.activeTOCGroup = layerKeys.GROUP_WEBMAP;
    this.analysisModalVisible = false;
    this.coordinatesModalVisible = false;
    this.printModalVisible = false;
    this.searchModalVisible = false;
    this.canopyModalVisible = false;
    this.layerModalVisible = false;
    this.subscriptionsModalVisible = false;
    this.subscribeModalVisible = false;
    this.confirmModalVisible = false;
    this.isLoggedIn = false;
    this.canopyDensity = 30;
    this.activeSlopeClass = null;
    this.modalLayerInfo = '';
    this.currentTimeExtent = {};
    this.mobileTimeWidgetVisible = false;
    this.imazonStartMonth = 0;
    this.imazonEndMonth = 0;
    this.imazonStartYear = 0;
    this.imazonEndYear = 0;
    this.iconLoading = '';
    this.exclusiveLayerIds = [];
    this.legendOpacity = {};
    this.initialLayerOpacities = [];
    this.subscriptionToDelete = {};
    this.analysisDisabled = false;
    this.fetchingCartoData = false;
    this.analysisParams = {};
    this.analysisSliderIndices = {};
    this.drawButtonActive = false;
    this.enterValuesButtonActive = false;
    this.imageryModalVisible = false;
    this.imageryData = [];
    this.loadingImagery = false;
    this.imageryError = false;
    this.selectedImagery = null;
    this.imageryParams = null;
    this.imageryHoverInfo = null;
    this.activeFilters = {};
    this.selectedFeatureTitles = [];

    this.bindListeners({
      setDefaults: appActions.applySettings,
      mapUpdated: mapActions.mapUpdated,
      infoWindowUpdated: mapActions.infoWindowUpdated,
      createLayers: mapActions.createLayers,
      changeActiveTab: mapActions.changeActiveTab,
      setAnalysisType: mapActions.setAnalysisType,
      togglePrintModal: mapActions.togglePrintModal,
      toggleSearchModal: mapActions.toggleSearchModal,
      toggleCanopyModal: mapActions.toggleCanopyModal,
      toggleAnalysisModal: mapActions.toggleAnalysisModal,
      toggleCoordinatesModal: mapActions.toggleCoordinatesModal,
      toggleLayerModal: mapActions.toggleLayerModal,
      toggleSubscriptionsModal: mapActions.toggleSubscriptionsModal,
      toggleSubscribeModal: mapActions.toggleSubscribeModal,
      toggleConfirmModal: mapActions.toggleConfirmModal,
      toggleLogin: mapActions.toggleLogin,
      deleteSubscription: mapActions.deleteSubscription,
      updateCanopyDensity: mapActions.updateCanopyDensity,
      showLayerInfo: mapActions.showLayerInfo,
      toggleTOCVisible: mapActions.toggleTOCVisible,
      toggleEditing: mapActions.toggleEditing,
      openTOCAccordion: mapActions.openTOCAccordion,
      setUserSubscriptions: mapActions.setUserSubscriptions,
      changeBasemap: mapActions.changeBasemap,
      updateActiveSlopeClass: mapActions.updateActiveSlopeClass,
      addActiveLayer: layerActions.addActiveLayer,
      removeActiveLayer: layerActions.removeActiveLayer,
      toggleLegendVisible: mapActions.toggleLegendVisible,
      addSubLayer: layerActions.addSubLayer,
      removeSubLayer: layerActions.removeSubLayer,
      removeAllSubLayers: layerActions.removeAllSubLayers,
      setSubLayers: layerActions.setSubLayers,
      addAll: layerActions.addAll,
      removeAll: layerActions.removeAll,
      setLossOptions: layerActions.setLossOptions,
      shouldResetSlider: layerActions.shouldResetSlider,
      updateLossTimeline: layerActions.updateLossTimeline,
      updateGladStartDate: layerActions.updateGladStartDate,
      updateGladEndDate: layerActions.updateGladEndDate,
      updateFormaStartDate: layerActions.updateFormaStartDate,
      updateFormaEndDate: layerActions.updateFormaEndDate,
      updateTerraIStartDate: layerActions.updateTerraIStartDate,
      updateTerraIEndDate: layerActions.updateTerraIEndDate,
      updateViirsStartDate: layerActions.updateViirsStartDate,
      updateViirsEndDate: layerActions.updateViirsEndDate,
      updateModisStartDate: layerActions.updateModisStartDate,
      updateModisEndDate: layerActions.updateModisEndDate,
      updateSelectedFeatureTitles: layerActions.updateSelectedFeatureTitles,
      changeOpacity: layerActions.changeOpacity,
      setOpacities: layerActions.setOpacities,
      updateTimeExtent: mapActions.updateTimeExtent,
      updateImazonAlertSettings: mapActions.updateImazonAlertSettings,
      toggleMobileTimeWidgetVisible: mapActions.toggleMobileTimeWidgetVisible,
      showLoading: layerActions.showLoading,
      updateCartoSymbol: layerActions.updateCartoSymbol,
      toggleAnalysisTab: mapActions.toggleAnalysisTab,
      updateExclusiveRadioIds: mapActions.updateExclusiveRadioIds,
      updateAnalysisParams: mapActions.updateAnalysisParams,
      updateAnalysisSliderIndices: mapActions.updateAnalysisSliderIndices,
      activateDrawButton: mapActions.activateDrawButton,
      activateEnterValuesButton: mapActions.activateEnterValuesButton,
      toggleImageryVisible: mapActions.toggleImageryVisible,
      getSatelliteImagery: mapActions.getSatelliteImagery,
      setSelectedImagery: mapActions.setSelectedImagery,
      setImageryHoverInfo: mapActions.setImageryHoverInfo,
      setActiveFilters: mapActions.setActiveFilters,
      changeLayerVersion: mapActions.changeLayerVersion

    });
  }

  setDefaults (settings) {
    //- Set the default value to the first actual value in the select, 0 is No Data
    this.activeSlopeClass = settings.slopeClasses && settings.slopeClasses[1];
  }

  addActiveLayer (layerId) {
    const index = this.activeLayers.indexOf(layerId);
    if (index === -1) {
      // Create a copy of the strings array for easy change detection
      const layers = this.activeLayers.slice();
      layers.push(layerId);
      this.activeLayers = layers;
    }
  }

  removeActiveLayer (layerId) {
    const index = this.activeLayers.indexOf(layerId);
    if (index !== -1) {
      // Create a copy of the strings array for easy change detection
      const layers = this.activeLayers.slice();
      layers.splice(index, 1);
      this.activeLayers = layers;
    }
  }

  addSubLayer (info) {
    this.dynamicLayers[info.id].push(info.subIndex);
    this.addActiveLayer(info.subId);
  }

  removeSubLayer (info) {
    const subLayerIndex = this.dynamicLayers[info.id].indexOf(info.subIndex);
    if (subLayerIndex > -1) {
      this.dynamicLayers[info.id].splice(subLayerIndex, 1);
    }
    this.removeActiveLayer(info.subId);
  }

  removeAllSubLayers(info) {
    this.dynamicLayers[info.id] = [];
    if (info.layerIds) {
      this.removeActiveLayer(info.id);
    } else {
      info.layerInfos.forEach(i => {
        this.removeActiveLayer(`${info.id}_${i.id}`);
      });
    }
  }

  setSubLayers(info) {
    this.dynamicLayers[info.layer.id] = [...info.subIndexes];
    if (info.layer.layerIds) {
      this.addActiveLayer(info.layer.id);
    } else {
      info.subIndexes.forEach(i => {
        this.addActiveLayer(`${info.layer.id}_${i}`);
      });
    }
  }

  addAll () {
    const allActiveLayers = [];
    const allDynamicLayers = {};
    const visibleRadioLayerIds = [];
    let radioLayerToTurnOn = null;

    const reducedLayers = this.allLayers.reduce((prevArray, currentItem) => {
      if (currentItem.hasOwnProperty('nestedLayers')) {
        return prevArray.concat(...currentItem.nestedLayers);
      }

      if (currentItem.isRadioLayer && currentItem.esriLayer.visible) {
        if (visibleRadioLayerIds.indexOf(currentItem.id) === -1) {
          visibleRadioLayerIds.push(currentItem.id);
        }
      }
      return prevArray.concat(currentItem);
    }, []);

    const visibleRadioLayers = reducedLayers.filter(l => visibleRadioLayerIds.indexOf(l.id) > -1);

    visibleRadioLayers.forEach(rl => {
      let idToCheck = rl.id;
      if (rl.subId) {
        idToCheck = rl.subId;
      }

      if (this.activeLayers.indexOf(idToCheck) > -1) {
        if (rl.subId) {
          radioLayerToTurnOn = reducedLayers.filter(l => l.subId === rl.subId)[0];
        } else {
          radioLayerToTurnOn = reducedLayers.filter(l => l.id === rl.id)[0];
        }
      }
    });

    if (!radioLayerToTurnOn) {
      radioLayerToTurnOn = reducedLayers.filter(l => l.id === this.exclusiveLayerIds[0])[0];
    }

    if (radioLayerToTurnOn) {
      if (radioLayerToTurnOn.subId) {
        allActiveLayers.push(radioLayerToTurnOn.subId);
        if (!allDynamicLayers.hasOwnProperty(radioLayerToTurnOn.id)) {
          allDynamicLayers[radioLayerToTurnOn.id] = [radioLayerToTurnOn.subIndex];
        } else {
          allDynamicLayers[radioLayerToTurnOn.id].push(radioLayerToTurnOn.subIndex);
        }
      } else if (radioLayerToTurnOn.layerIds) {
        allActiveLayers.push(radioLayerToTurnOn.id);
        if (!allDynamicLayers.hasOwnProperty(radioLayerToTurnOn.id)) {
          allDynamicLayers[radioLayerToTurnOn.id] = radioLayerToTurnOn.layerIds;
        }
      } else {
        allActiveLayers.push(radioLayerToTurnOn.id);
      }
    }

    reducedLayers.forEach(l => {
      if (l.isRadioLayer) {
        return;
      }
      if (l.subId) {
        if (!allDynamicLayers.hasOwnProperty(l.id)) {
          allDynamicLayers[l.id] = [l.subIndex];
        } else {
          allDynamicLayers[l.id].push(l.subIndex);
        }
      }
      allActiveLayers.push(l.id);
    });
    this.activeLayers = allActiveLayers;
    this.dynamicLayers = allDynamicLayers;
  }

  removeAll () {
    this.activeLayers = [];
    //- Reset the webmap layers
    Object.keys(this.dynamicLayers).forEach((layerId) => {
      this.dynamicLayers[layerId] = [];
    });

    //- Reset all layer filters
    //- Loss
    this.resetSlider = true;

    //- Canopy
    this.canopyDensity = 30;

    //- SAD
    this.imazonStartMonth = 0;
    this.imazonEndMonth = 0;
    this.imazonStartYear = 0;
    this.imazonEndYear = 0;

    //- GLAD
    this.gladStartDate = new Date('2015', 0, 1);
    this.gladEndDate = new Date();

    //- FORMA
    this.formaStartDate = new Date('2012', 0, 1);
    this.formaEndDate = new Date();

    //- FIRES
    this.viirsStartDate = new Date();
    this.viirsStartDate.setDate(this.viirsStartDate.getDate() - 1);
    this.viirsEndDate = new Date();
    this.modisStartDate = new Date();
    this.modisStartDate.setDate(this.modisStartDate.getDate() - 1);
    this.modisEndDate = new Date();

    //-Terra I
    this.terraIStartDate = new Date('2004', 0, 1);
    this.terraIEndDate = new Date('2016', 6, 12);
  }

  mapUpdated () {}

  infoWindowUpdated (selectedFeature) {
    if (selectedFeature) {
      // If this is a custom feature, active tab should be the analysis tab
      if (selectedFeature.attributes &&
        (selectedFeature.attributes.source === attributes.SOURCE_DRAW || selectedFeature.attributes.source === attributes.SOURCE_UPLOAD)
      ) {
        this.activeTab = tabKeys.ANALYSIS;
      } else {
        if (!selectedFeature.attributes.geostoreId && isRegistering === false) {
          isRegistering = true;
          mapActions.toggleAnalysisTab.defer(true);

          analysisUtils.getExactGeom(selectedFeature).then(exactGeom => {
            analysisUtils.registerGeom(exactGeom).then(res => {
              selectedFeature.attributes.geostoreId = res.data.id;
              selectedFeature.setGeometry(exactGeom);
              mapActions.toggleAnalysisTab(false);
              isRegistering = false;
            });
          });
        } else {
          this.activeTab = tabKeys.INFO_WINDOW;
        }
      }
      this.activeAnalysisType = 'default';
    }
  }

  toggleAnalysisTab(bool) {
    this.analysisDisabled = bool;
  }

  createLayers (payload) {
    const {map, layers} = payload;

    const reducedLayers = layers.reduce((prevArray, currentItem) => {
      if (currentItem.hasOwnProperty('nestedLayers')) {
        return prevArray.concat(...currentItem.nestedLayers);
      }
      return prevArray.concat(currentItem);
    }, []);
    this.activeLayers = reducedLayers.filter((layer) => layer.visible && !layer.subId).map((layer) => layer.id);
    this.allLayers = layers;
    layers.forEach(layer => {
      if (layer.type === 'dynamic' || layer.subId) {
        if (layer.esriLayer && !this.dynamicLayers.hasOwnProperty(layer.id)) {
          this.dynamicLayers[layer.id] = layer.esriLayer.visibleLayers.slice();
        }
        if (layer.subId && layer.esriLayer.visibleLayers.indexOf(layer.subIndex) > -1) {
          if (LayersHelper.isLayerVisible(map, layer)) {
            this.activeLayers.push(layer.subId);
          }
        }
      }
    });
  }

  updateCartoSymbol (symbol) {
    this.cartoSymbol = symbol;
  }

  changeActiveTab (payload) {
    this.activeTab = payload.id;
  }

  setAnalysisType (payload) {
    this.activeAnalysisType = payload;
  }

  toggleAnalysisModal (payload) {
    this.analysisModalVisible = payload.visible;
  }
  
  toggleCoordinatesModal (payload) {
    this.coordinatesModalVisible = payload.visible;
  }

  togglePrintModal (payload) {
    this.printModalVisible = payload.visible;
  }

  toggleCanopyModal (payload) {
    this.canopyModalVisible = payload.visible;
  }

  toggleLayerModal (payload) {
    this.layerModalVisible = payload.visible;
  }

  toggleSubscriptionsModal (payload) {
    this.subscriptionsModalVisible = payload.visible;
  }

  toggleSubscribeModal (payload) {
    this.subscribeModalVisible = payload.visible;
  }

  toggleConfirmModal (payload) {
    this.confirmModalVisible = payload.visible;
  }

  toggleLogin (loggedIn) {
    this.isLoggedIn = loggedIn;
  }

  deleteSubscription (payload) {
    this.subscriptionToDelete = payload;
  }

  updateCanopyDensity (payload) {
    this.canopyDensity = payload.density;
  }

  setUserSubscriptions (subscriptions) {
    this.userSubscriptions = subscriptions;
  }

  showLoading (layerInfo) {
    this.iconLoading = layerInfo;
  }

  toggleSearchModal (payload) {
    this.searchModalVisible = payload.visible;
  }

  toggleTOCVisible (payload) {
    this.tableOfContentsVisible = payload.visible;
  }

  toggleEditing () {
    this.editingEnabled = !this.editingEnabled;
  }

  openTOCAccordion (groupKey) {
    this.activeTOCGroup = groupKey;
  }

  setLossOptions (lossOptionsData) {
    this.lossOptions = lossOptionsData;
  }

  shouldResetSlider(bool) {
    this.resetSlider = bool;
  }

  updateActiveSlopeClass (newSlopeClass) {
    this.activeSlopeClass = newSlopeClass;
  }

  updateLossTimeline (payload) {
    this.lossFromSelectIndex = payload.from;
    this.lossToSelectIndex = payload.to;
  }

  updateGladStartDate (startDate) {
    this.gladStartDate = startDate;
  }

  updateGladEndDate (endDate) {
    this.gladEndDate = endDate;
  }

  updateFormaStartDate (startDate) {
    this.formaStartDate = startDate;
  }

  updateFormaEndDate (endDate) {
    this.formaEndDate = endDate;
  }

  updateTerraIStartDate (startDate) {
    this.terraIStartDate = startDate;
  }

  updateTerraIEndDate (endDate) {
    this.terraIEndDate = endDate;
  }

  updateViirsStartDate (startDate) {
    this.viirsStartDate = startDate;
  }

  updateViirsEndDate (endDate) {
    this.viirsEndDate = endDate;
  }

  updateModisStartDate (startDate) {
    this.modisStartDate = startDate;
  }

  updateModisEndDate (endDate) {
    this.modisEndDate = endDate;
  }
  
  updateSelectedFeatureTitles (selectedFeatureTitles) {
    this.selectedFeatureTitles = selectedFeatureTitles;
  }

  showLayerInfo (layer) {
    // Grab the id of the sublayer if it exists, else, grab the normal id
    const id = layer.subId ? layer.subId : layer.id;
    const info = layerInfoCache.get(id);

    if (info) {
      const promise = new Promise((resolve) => {
        resolve();
      });

      promise.then(() => {
        this.iconLoading = '';
        this.modalLayerInfo = info;
        this.layerModalVisible = true;
        this.emitChange();
      });

    } else {
      layerInfoCache.fetch(layer).then(layerInfo => {
        this.iconLoading = '';
        this.modalLayerInfo = layerInfo;
        this.layerModalVisible = true;
        this.emitChange();
      });
    }
  }

  changeOpacity (payload) {
    // payload = { layerId: <string>, value: <number> }
    this.legendOpacity = payload;
  }

  setOpacities (opacities) {
    this.initialLayerOpacities = opacities;
  }

  changeBasemap (basemap) {
    this.basemap = basemap;
  }

  toggleLandsat (visible) {
    this.landsatVisible = visible;
  }

  toggleLegendVisible () {
    this.legendOpen = !this.legendOpen;
  }

  toggleMobileTimeWidgetVisible () {
    this.mobileTimeWidgetVisible = !this.mobileTimeWidgetVisible;
  }

  updateTimeExtent (timeExtent) {
    this.currentTimeExtent = timeExtent;
  }

  updateImazonAlertSettings ({type, value}) {
    switch (type) {
      case actionTypes.UPDATE_IMAZON_START_MONTH:
        this.imazonStartMonth = value;
      break;
      case actionTypes.UPDATE_IMAZON_END_MONTH:
        this.imazonEndMonth = value;
      break;
      case actionTypes.UPDATE_IMAZON_START_YEAR:
        this.imazonStartYear = value;
      break;
      case actionTypes.UPDATE_IMAZON_END_YEAR:
        this.imazonEndYear = value;
      break;
    }
  }

  updateExclusiveRadioIds (ids) {
    this.exclusiveLayerIds = ids;
  }

  fetchingCartoData(bool) {
    this.fetchingCartoData = bool;
  }

  updateAnalysisParams(params) {
    if (this.analysisParams.hasOwnProperty(params.id)) {
      this.analysisParams[params.id] = {
        ...this.analysisParams[params.id],
        ...(params.paramName ? { [params.paramName]: params.paramValue } : {})
      };
    } else {
      this.analysisParams[params.id] = {
        ...(params.paramName ? { [params.paramName]: params.paramValue } : {})
      };
    }
  }

  updateAnalysisSliderIndices(params) {
    this.analysisSliderIndices[params.id] = params.indices;
  }

  activateDrawButton(bool) {
    this.drawButtonActive = bool;
  }
  
  activateEnterValuesButton(bool) {
    this.enterValuesButtonActive = bool;
  }

  toggleImageryVisible(bool) {
    this.imageryModalVisible = bool;
    this.imageryError = false;
  }

  getSatelliteImagery(params) {
    // Confirm the imagery data isn't already being loaded.
    if (this.loadingImagery) { return; }

    this.imageryError = false;
    this.loadingImagery = true;

    // First make a reqest to the recent tiles metadata endpoint
    request.getRecentTiles(params).then(response => {
      // Only the first tile url is returned with the metadata response from the
      // recent tiles endpoint. We can add this to state and show it on the map
      // while the requests are made for the other tiles and the thumbnails.
      const tiles = response.data.tiles;
      this.imageryData = response.data.tiles;
      this.imageryParams = params;
      this.emitChange();

      const tileArrays = [];

      response.data.tiles.forEach((tile, i) => {
        const index = i;
        if ((index % 5 === 0) || (i === 0)) {
          const tileArr = tiles.slice(index, index + 5);
          tileArrays.push(tileArr);
        }
      });

      let responseCount = 0;
      tileArrays.forEach((tileArr, i) => {
        const index = i * 5;

        request.getImageryData(params, tileArr).then(data => {
          data.forEach((d, pos) => {
            this.imageryData[pos + index] = d;
          });
          responseCount++;

          if (responseCount === tileArrays.length) {
            this.loadingImagery = false;
          }
          this.emitChange();
        }, () => {
          responseCount++;
          if (responseCount === tileArrays.length) {
            this.loadingImagery = false;
          }
        });

      });

    }, () => {
      this.imageryParams = null;
      this.selectedImagery = null;
      this.loadingImagery = false;
      this.imageryError = true;
      this.imageryData = [];
      this.emitChange();
    });
  }

  setSelectedImagery(obj) {
    this.selectedImagery = obj;

  }

  setImageryHoverInfo(obj) {
    this.imageryHoverInfo = obj;
  }

  setActiveFilters(obj) {
    const { layerId, value } = obj;

    if (!value && this.activeFilters[layerId]) {
      delete this.activeFilters[layerId];
    } else {
      this.activeFilters[layerId] = value;
    }
  }

  changeLayerVersion(obj) {
    const { id, newLayer, versionIndex } = obj;
    const allLayersCopy = this.allLayers.map((layer) => {
      if (layer.id === id) {
        layer = newLayer;
      }
      return layer;
    });
    this.allLayers = allLayersCopy;
    this.activeVersions[id] = versionIndex;
    this.emitChange();

  }
}

export default dispatcher.createStore(MapStore, 'MapStore');
