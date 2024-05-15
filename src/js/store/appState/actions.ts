import {
  TOGGLE_TABVIEW_PANEL,
  RENDER_MODAL,
  RENDER_INFO_MODAL,
  RENDER_GFW_DROPDOWN,
  SELECT_ACTIVE_TAB,
  SET_LANGUAGE,
  SET_OPEN_LAYER_GROUP,
  SET_HIDE_WIDGET,
  SET_LOGGED_IN,
  SET_IS_PROFILE_COMPLETE,
  AppState,
  LeftPanel,
  SET_MEASURE_RESULTS,
  SET_ACTIVE_MEASURE_BUTTON,
  SET_CANOPY_DENSITY,
  SET_ANALYSIS_DATE,
  SET_ANALYSIS_YEAR_RANGE,
  SET_SELECTED_SEARCH_WIDGET_LAYER,
  SET_GLAD_CONFIRMED,
  SET_HIGH_CONFIDENCE_CONFIRMED,
  SET_GEOGRAPHIC_COVERAGE,
  SET_GLAD_START,
  SET_GLAD_END,
  SET_GFW_INTEGRATED_START,
  SET_GFW_INTEGRATED_END,
  SET_VIIRS_START,
  SET_VIIRS_END,
  SET_MODIS_START,
  SET_MODIS_END,
  SET_RENDER_POPUP,
  SET_AREA_IMAGES,
  SET_VERSIONED_LAYER,
  SET_WIND_SPEED_POTENTIAL,
  SET_MULTI_POLYGON_SELECTION_MODE,
  SET_ACTIVE_MULTI_INPUT,
  SET_ANALYSIS_FEATURE_LIST,
  SET_TREE_HEIGHT,
  SET_GFW_LAYER,
  SET_GFW_LAYER_LABEL,
  SET_GFW_LAYER_SUBTITLE,
  SET_IMAGE_OBJECT,
  SET_LAND_COVER_YEAR_VALUE,
  SET_GLAD_2_START,
  SET_GLAD_2_END,
  SET_RADD_ALERT_START,
  SET_RADD_ALERT_END,
  SET_TREE_MOSAIC_HECTARES_VALUE,
  TreeMosaicLayerTypes,
  SET_ACTIVE_TREE_MOSAIC_LAYER,
  SET_PRODES_LAYER,
  SET_TREE_COVER_LOSS_START,
  SET_TREE_COVER_LOSS_END,
} from './types';

export function setSelectedSearchWidgetLayer(payload: AppState['selectedSearchWidgetLayer']) {
  return {
    type: SET_SELECTED_SEARCH_WIDGET_LAYER as typeof SET_SELECTED_SEARCH_WIDGET_LAYER,
    payload: payload,
  };
}

export function toggleTabviewPanel(payload: LeftPanel['tabViewVisible']) {
  return {
    type: TOGGLE_TABVIEW_PANEL as typeof TOGGLE_TABVIEW_PANEL,
    payload: payload,
  };
}

export function setCanopyDensity(payload: LeftPanel['density']) {
  return {
    type: SET_CANOPY_DENSITY as typeof SET_CANOPY_DENSITY,
    payload: payload,
  };
}

export function setHideWidget(payload: AppState['hideWidgetActive']) {
  return {
    type: SET_HIDE_WIDGET as typeof SET_HIDE_WIDGET,
    payload: payload,
  };
}

export function setInfoModalLayerID(payload: AppState['infoModalLayerID']) {
  return {
    type: RENDER_INFO_MODAL as typeof RENDER_INFO_MODAL,
    payload: payload,
  };
}

export function renderModal(payload: AppState['renderModal']) {
  return {
    type: RENDER_MODAL as typeof RENDER_MODAL,
    payload: payload,
  };
}

export function setRenderGFWDropdown(payload: AppState['renderGFWDropdown']) {
  return {
    type: RENDER_GFW_DROPDOWN as typeof RENDER_GFW_DROPDOWN,
    payload: payload,
  };
}

export function setLoggedIn(payload: AppState['isLoggedIn']) {
  return {
    type: SET_LOGGED_IN as typeof SET_LOGGED_IN,
    payload: payload,
  };
}

export function setIsProfileComplete(payload: AppState['isProfileComplete']) {
  return {
    type: SET_IS_PROFILE_COMPLETE as typeof SET_IS_PROFILE_COMPLETE,
    payload: payload,
  };
}

export function selectActiveTab(payload: LeftPanel['activeTab']) {
  return {
    type: SELECT_ACTIVE_TAB as typeof SELECT_ACTIVE_TAB,
    payload: payload,
  };
}

export function setLanguage(payload: AppState['selectedLanguage']) {
  return {
    type: SET_LANGUAGE as typeof SET_LANGUAGE,
    payload: payload,
  };
}

export function setOpenLayerGroup(payload: LeftPanel['openLayerGroup']) {
  return {
    type: SET_OPEN_LAYER_GROUP,
    payload: payload,
  };
}

export function setMeasureResults(payload: AppState['measureContent']) {
  return {
    type: SET_MEASURE_RESULTS as typeof SET_MEASURE_RESULTS,
    payload: payload,
  };
}

export function setActiveMeasureButton(payload: AppState['measureContent']['activeButton']) {
  return {
    type: SET_ACTIVE_MEASURE_BUTTON as typeof SET_ACTIVE_MEASURE_BUTTON,
    payload: payload,
  };
}

export function setAnalysisDateRange(payload: AppState['leftPanel']['analysisDateRange']) {
  return {
    type: SET_ANALYSIS_DATE as typeof SET_ANALYSIS_DATE,
    payload: payload,
  };
}

export function setAnalysisYearRange(payload: AppState['leftPanel']['analysisYearRange']) {
  return {
    type: SET_ANALYSIS_YEAR_RANGE as typeof SET_ANALYSIS_YEAR_RANGE,
    payload: payload,
  };
}

export function setGladConfirmed(payload: AppState['leftPanel']['gladConfirmed']) {
  return {
    type: SET_GLAD_CONFIRMED as typeof SET_GLAD_CONFIRMED,
    payload: payload,
  };
}

export function setHighConfidenceConfirmed(payload: AppState['leftPanel']['highConfidenceConfirmed']) {
  return {
    type: SET_HIGH_CONFIDENCE_CONFIRMED as typeof SET_HIGH_CONFIDENCE_CONFIRMED,
    payload: payload,
  };
}

export function setGeographicCoverage(payload: AppState['leftPanel']['geographicCoverage']) {
  return {
    type: SET_GEOGRAPHIC_COVERAGE as typeof SET_GEOGRAPHIC_COVERAGE,
    payload: payload,
  };
}

export function setGladStart(payload: AppState['leftPanel']['gladStart']) {
  return {
    type: SET_GLAD_START as typeof SET_GLAD_START,
    payload: payload,
  };
}

export function setGladEnd(payload: AppState['leftPanel']['gladEnd']) {
  return {
    type: SET_GLAD_END as typeof SET_GLAD_END,
    payload: payload,
  };
}

export function setRaddAlertStart(payload: AppState['leftPanel']['raddAlertStart']) {
  return {
    type: SET_RADD_ALERT_START as typeof SET_RADD_ALERT_START,
    payload: payload,
  };
}

export function setRaddAlertEnd(payload: AppState['leftPanel']['raddAlertEnd']) {
  return {
    type: SET_RADD_ALERT_END as typeof SET_RADD_ALERT_END,
    payload: payload,
  };
}

export function setGlad2Start(payload: AppState['leftPanel']['glad2Start']) {
  return {
    type: SET_GLAD_2_START as typeof SET_GLAD_2_START,
    payload: payload,
  };
}

export function setTreeCoverLossStart(payload: AppState['leftPanel']['treeCoverLossStart']) {
  return {
    type: SET_TREE_COVER_LOSS_START as typeof SET_TREE_COVER_LOSS_START,
    payload: payload,
  };
}
export function setTreeCoverLossEnd(payload: AppState['leftPanel']['treeCoverLossEnd']) {
  return {
    type: SET_TREE_COVER_LOSS_END as typeof SET_TREE_COVER_LOSS_END,
    payload: payload,
  };
}
export function setGlad2End(payload: AppState['leftPanel']['glad2End']) {
  return {
    type: SET_GLAD_2_END as typeof SET_GLAD_2_END,
    payload: payload,
  };
}

export function setIntegratedAlertLayerStart(payload: AppState['leftPanel']['gfwIntegratedStart']) {
  return {
    type: SET_GFW_INTEGRATED_START as typeof SET_GFW_INTEGRATED_START,
    payload: payload,
  };
}

export function setIntegratedAlertLayerEnd(payload: AppState['leftPanel']['gfwIntegratedEnd']) {
  return {
    type: SET_GFW_INTEGRATED_END as typeof SET_GFW_INTEGRATED_END,
    payload: payload,
  };
}

export function setModisStart(payload: AppState['leftPanel']['modisStart']) {
  return {
    type: SET_MODIS_START as typeof SET_MODIS_START,
    payload: payload,
  };
}

export function setModisEnd(payload: AppState['leftPanel']['modisEnd']) {
  return {
    type: SET_MODIS_END as typeof SET_MODIS_END,
    payload: payload,
  };
}

export function setViirsStart(payload: AppState['leftPanel']['viirsStart']) {
  return {
    type: SET_VIIRS_START as typeof SET_VIIRS_START,
    payload: payload,
  };
}

export function setViirsEnd(payload: AppState['leftPanel']['viirsEnd']) {
  return {
    type: SET_VIIRS_END as typeof SET_VIIRS_END,
    payload: payload,
  };
}

export function setRenderPopup(payload: AppState['renderPopup']) {
  return {
    type: SET_RENDER_POPUP as typeof SET_RENDER_POPUP,
    payload: payload,
  };
}

export function setAreaImages(payload: string) {
  return {
    type: SET_AREA_IMAGES as typeof SET_AREA_IMAGES,
    payload: payload,
  };
}

export function setTreeHeight(payload: number) {
  return {
    type: SET_TREE_HEIGHT as typeof SET_TREE_HEIGHT,
    payload: payload,
  };
}

export function setIntegratedAlertLayer(payload: string) {
  return {
    type: SET_GFW_LAYER as typeof SET_GFW_LAYER,
    payload: payload,
  };
}

export function setIntegratedAlertLayerLabel(payload: string) {
  return {
    type: SET_GFW_LAYER_LABEL as typeof SET_GFW_LAYER_LABEL,
    payload: payload,
  };
}

export function setIntegratedAlertLayerSubtitle(payload: string) {
  return {
    type: SET_GFW_LAYER_SUBTITLE as typeof SET_GFW_LAYER_SUBTITLE,
    payload: payload,
  };
}

export function setWindSpeedPotential(payload: number) {
  return {
    type: SET_WIND_SPEED_POTENTIAL as typeof SET_WIND_SPEED_POTENTIAL,
    payload: payload,
  };
}

export function setImageObject(payload: number) {
  return {
    type: SET_IMAGE_OBJECT as typeof SET_IMAGE_OBJECT,
    payload: payload,
  };
}
export function setVersionedLayer(payload: any) {
  return {
    type: SET_VERSIONED_LAYER as typeof SET_VERSIONED_LAYER,
    payload: payload,
  };
}

export function setMultiPolygonSelectionMode(payload: any) {
  return {
    type: SET_MULTI_POLYGON_SELECTION_MODE as typeof SET_MULTI_POLYGON_SELECTION_MODE,
    payload: payload,
  };
}

export function setActiveMultiInput(payload: any) {
  return {
    type: SET_ACTIVE_MULTI_INPUT as typeof SET_ACTIVE_MULTI_INPUT,
    payload: payload,
  };
}

export function setAnalysisFeatureList(payload: any) {
  return {
    type: SET_ANALYSIS_FEATURE_LIST as typeof SET_ANALYSIS_FEATURE_LIST,
    payload: payload,
  };
}

export function setLandCoverYearValue(payload: number[]) {
  return {
    type: SET_LAND_COVER_YEAR_VALUE,
    payload,
  };
}

export function setTreeMosaicHectaresValue(payload: number) {
  return {
    type: SET_TREE_MOSAIC_HECTARES_VALUE,
    payload,
  };
}

export function setActiveTreeMosaicLayer(payload: TreeMosaicLayerTypes) {
  return {
    type: SET_ACTIVE_TREE_MOSAIC_LAYER,
    payload,
  };
}

export function setProdesLayer(payload: any) {
  return {
    type: SET_PRODES_LAYER,
    payload,
  };
}
