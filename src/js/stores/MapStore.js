import layerInfoCache from 'utils/layerInfoCache';
import {attributes, actionTypes } from 'constants/AppConstants';
import layerKeys from 'constants/LayerConstants';
import tabKeys from 'constants/TabViewConstants';
import appActions from 'actions/AppActions';
import mapActions from 'actions/MapActions';
import layerActions from 'actions/LayerActions';
import dispatcher from 'js/dispatcher';
import LayersHelper from 'helpers/LayersHelper';
import {layerPanelText} from 'js/config';
import request from 'utils/request';
import all from 'dojo/promise/all';

class MapStore {

  constructor () {
    //- Default is closed, using any value as default will cause an ugly
    //- appearance on mobile when loading, set the default in TabButtons componentWillReceiveProps
    //- the default may change based on device, and content available from AGOL
    this.activeTab = '';

    this.activeLayers = [];
    this.allLayers = [];
    this.basemap = null;
    this.legendOpen = false;
    this.landsatVisible = false;
    this.dynamicLayers = {};
    this.activeAnalysisType = '';
    this.cartoSymbol = {};
    this.lossFromSelectIndex = 0; // Will get initialized when the data is fetched
    this.lossToSelectIndex = 0;
    this.resetSlider = false;
    this.gladStartDate = new Date('2015', 0, 1);
    this.gladEndDate = new Date();
    this.terraIStartDate = {};
    this.terraIEndDate = {};
    this.viirsStartDate = new Date();
    this.viirsStartDate.setDate(this.viirsStartDate.getDate() - 1);
    this.viirsEndDate = new Date();
    this.modisStartDate = new Date();
    this.modisStartDate.setDate(this.modisStartDate.getDate() - 1);
    this.modisEndDate = new Date();
    this.lossOptions = [];
    this.viirsFiresSelectIndex = layerPanelText.firesOptions.length - 1;
    this.modisFiresSelectIndex = layerPanelText.firesOptions.length - 1;
    this.tableOfContentsVisible = true;
    this.activeTOCGroup = layerKeys.GROUP_WEBMAP;
    this.analysisModalVisible = false;
    this.printModalVisible = false;
    this.searchModalVisible = false;
    this.canopyModalVisible = false;
    this.layerModalVisible = false;
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
      toggleLayerModal: mapActions.toggleLayerModal,
      showLayerInfo: mapActions.showLayerInfo,
      toggleTOCVisible: mapActions.toggleTOCVisible,
      openTOCAccordion: mapActions.openTOCAccordion,
      updateCanopyDensity: mapActions.updateCanopyDensity,
      changeBasemap: mapActions.changeBasemap,
      updateActiveSlopeClass: mapActions.updateActiveSlopeClass,
      addActiveLayer: layerActions.addActiveLayer,
      removeActiveLayer: layerActions.removeActiveLayer,
      toggleLegendVisible: mapActions.toggleLegendVisible,
      addSubLayer: layerActions.addSubLayer,
      removeSubLayer: layerActions.removeSubLayer,
      changeViirsFiresTimeline: layerActions.changeViirsFiresTimeline,
      changeModisFiresTimeline: layerActions.changeModisFiresTimeline,
      addAll: layerActions.addAll,
      removeAll: layerActions.removeAll,
      setLossOptions: layerActions.setLossOptions,
      shouldResetSlider: layerActions.shouldResetSlider,
      updateLossTimeline: layerActions.updateLossTimeline,
      updateGladStartDate: layerActions.updateGladStartDate,
      updateGladEndDate: layerActions.updateGladEndDate,
      updateTerraIStartDate: layerActions.updateTerraIStartDate,
      updateTerraIEndDate: layerActions.updateTerraIEndDate,
      updateViirsStartDate: layerActions.updateViirsStartDate,
      updateViirsEndDate: layerActions.updateViirsEndDate,
      updateModisStartDate: layerActions.updateModisStartDate,
      updateModisEndDate: layerActions.updateModisEndDate,
      changeOpacity: layerActions.changeOpacity,
      updateTimeExtent: mapActions.updateTimeExtent,
      updateImazonAlertSettings: mapActions.updateImazonAlertSettings,
      toggleMobileTimeWidgetVisible: mapActions.toggleMobileTimeWidgetVisible,
      showLoading: layerActions.showLoading,
      updateCartoSymbol: layerActions.updateCartoSymbol
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

  addAll () {
    this.activeLayers = this.allLayers.map(l => l.id);
    this.allLayers.forEach((layer) => {
      if (layer.subId) {
        this.dynamicLayers[layer.id] = layer.esriLayer.layerInfos.map(lyr => lyr.id);
      }
    });
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

    //- FIRES
    this.viirsStartDate = new Date();
    this.viirsStartDate.setDate(this.viirsStartDate.getDate() - 1);
    this.viirsEndDate = new Date();
    this.modisStartDate = new Date();
    this.modisStartDate.setDate(this.modisStartDate.getDate() - 1);
    this.modisEndDate = new Date();

    //-Terra I
    this.terraIStartDate = {};
    this.terraIEndDate = {};
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
        this.activeTab = tabKeys.INFO_WINDOW;
      }
    }
  }

  createLayers (payload) {
    const {map, layers} = payload;
    this.activeLayers = layers.filter((layer) => layer.visible && !layer.subId).map((layer) => layer.id);
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
    this.activeAnalysisType = payload.type;
  }

  toggleAnalysisModal (payload) {
    this.analysisModalVisible = payload.visible;
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

  updateCanopyDensity (payload) {
    this.canopyDensity = payload.density;
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

  openTOCAccordion (groupKey) {
    this.activeTOCGroup = groupKey;
  }

  setLossOptions (lossOptionsData) {
    this.lossOptions = lossOptionsData;
  }

  shouldResetSlider(bool) {
    this.resetSlider = bool;
  }

  changeViirsFiresTimeline (viirsFiresSelectIndex) {
    this.viirsFiresSelectIndex = viirsFiresSelectIndex;
  }

  changeModisFiresTimeline (viirsFiresSelectIndex) {
    this.modisFiresSelectIndex = viirsFiresSelectIndex;
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

  showLayerInfo (layer) {
    // Grab the id of the sublayer if it exists, else, grab the normal id
    const id = layer.subId ? layer.subId : layer.id;
    const info = layerInfoCache.get(id);

    if (info) {
      this.modalLayerInfo = info;
      this.layerModalVisible = true;
      this.iconLoading = '';
      this.emitChange();
    } else {
      layerInfoCache.fetch(layer).then(layerInfo => {
        this.modalLayerInfo = layerInfo;
        this.layerModalVisible = true;
        this.iconLoading = '';
        this.emitChange();
      });
    }
  }

  changeOpacity (parameters) {
    const layer = this.allLayers.filter(l => l.id === parameters.layerId);
    console.log('MapStore >>> found a layer?', layer, parameters.layerId);
    if ( layer[0] ) {
      layer[0].opacity = parseFloat(parameters.value);
    }
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

}

export default dispatcher.createStore(MapStore, 'MapStore');
