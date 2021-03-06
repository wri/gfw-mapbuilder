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
  AppState,
  LeftPanel,
  SET_MEASURE_RESULTS,
  SET_ACTIVE_MEASURE_BUTTON,
  SET_CANOPY_DENSITY,
  SET_ANALYSIS_DATE,
  SET_ANALYSIS_YEAR_RANGE,
  SET_SELECTED_SEARCH_WIDGET_LAYER,
  SET_GLAD_CONFIRMED,
  SET_GLAD_START,
  SET_GLAD_END,
  SET_VIIRS_START,
  SET_VIIRS_END,
  SET_MODIS_START,
  SET_MODIS_END,
  SET_RENDER_POPUP,
  SET_AREA_IMAGES,
  SET_VERSIONED_LAYER
} from './types';

export function setSelectedSearchWidgetLayer(
  payload: AppState['selectedSearchWidgetLayer']
) {
  return {
    type: SET_SELECTED_SEARCH_WIDGET_LAYER as typeof SET_SELECTED_SEARCH_WIDGET_LAYER,
    payload: payload
  };
}

export function toggleTabviewPanel(payload: LeftPanel['tabViewVisible']) {
  return {
    type: TOGGLE_TABVIEW_PANEL as typeof TOGGLE_TABVIEW_PANEL,
    payload: payload
  };
}

export function setCanopyDensity(payload: LeftPanel['density']) {
  return {
    type: SET_CANOPY_DENSITY as typeof SET_CANOPY_DENSITY,
    payload: payload
  };
}

export function setHideWidget(payload: AppState['hideWidgetActive']) {
  return {
    type: SET_HIDE_WIDGET as typeof SET_HIDE_WIDGET,
    payload: payload
  };
}

export function setInfoModalLayerID(payload: AppState['infoModalLayerID']) {
  return {
    type: RENDER_INFO_MODAL as typeof RENDER_INFO_MODAL,
    payload: payload
  };
}

export function renderModal(payload: AppState['renderModal']) {
  return {
    type: RENDER_MODAL as typeof RENDER_MODAL,
    payload: payload
  };
}

export function setRenderGFWDropdown(payload: AppState['renderGFWDropdown']) {
  return {
    type: RENDER_GFW_DROPDOWN as typeof RENDER_GFW_DROPDOWN,
    payload: payload
  };
}

export function setLoggedIn(payload: AppState['isLoggedIn']) {
  return {
    type: SET_LOGGED_IN as typeof SET_LOGGED_IN,
    payload: payload
  };
}

export function selectActiveTab(payload: LeftPanel['activeTab']) {
  return {
    type: SELECT_ACTIVE_TAB as typeof SELECT_ACTIVE_TAB,
    payload: payload
  };
}

export function setLanguage(payload: AppState['selectedLanguage']) {
  return {
    type: SET_LANGUAGE as typeof SET_LANGUAGE,
    payload: payload
  };
}

export function setOpenLayerGroup(payload: LeftPanel['openLayerGroup']) {
  return {
    type: SET_OPEN_LAYER_GROUP,
    payload: payload
  };
}

export function setMeasureResults(payload: AppState['measureContent']) {
  return {
    type: SET_MEASURE_RESULTS as typeof SET_MEASURE_RESULTS,
    payload: payload
  };
}

export function setActiveMeasureButton(
  payload: AppState['measureContent']['activeButton']
) {
  return {
    type: SET_ACTIVE_MEASURE_BUTTON as typeof SET_ACTIVE_MEASURE_BUTTON,
    payload: payload
  };
}

export function setAnalysisDateRange(
  payload: AppState['leftPanel']['analysisDateRange']
) {
  return {
    type: SET_ANALYSIS_DATE as typeof SET_ANALYSIS_DATE,
    payload: payload
  };
}

export function setAnalysisYearRange(
  payload: AppState['leftPanel']['analysisYearRange']
) {
  return {
    type: SET_ANALYSIS_YEAR_RANGE as typeof SET_ANALYSIS_YEAR_RANGE,
    payload: payload
  };
}

export function setGladConfirmed(
  payload: AppState['leftPanel']['gladConfirmed']
) {
  return {
    type: SET_GLAD_CONFIRMED as typeof SET_GLAD_CONFIRMED,
    payload: payload
  };
}

export function setGladStart(payload: AppState['leftPanel']['gladStart']) {
  return {
    type: SET_GLAD_START as typeof SET_GLAD_START,
    payload: payload
  };
}

export function setGladEnd(payload: AppState['leftPanel']['gladEnd']) {
  return {
    type: SET_GLAD_END as typeof SET_GLAD_END,
    payload: payload
  };
}

export function setModisStart(payload: AppState['leftPanel']['modisStart']) {
  return {
    type: SET_MODIS_START as typeof SET_MODIS_START,
    payload: payload
  };
}

export function setModisEnd(payload: AppState['leftPanel']['modisEnd']) {
  return {
    type: SET_MODIS_END as typeof SET_MODIS_END,
    payload: payload
  };
}

export function setViirsStart(payload: AppState['leftPanel']['viirsStart']) {
  return {
    type: SET_VIIRS_START as typeof SET_VIIRS_START,
    payload: payload
  };
}

export function setViirsEnd(payload: AppState['leftPanel']['viirsEnd']) {
  return {
    type: SET_VIIRS_END as typeof SET_VIIRS_END,
    payload: payload
  };
}

export function setRenderPopup(payload: AppState['renderPopup']) {
  return {
    type: SET_RENDER_POPUP as typeof SET_RENDER_POPUP,
    payload: payload
  };
}

export function setAreaImages(payload: string) {
  return {
    type: SET_AREA_IMAGES as typeof SET_AREA_IMAGES,
    payload: payload
  };
}

export function setVersionedLayer(payload: any) {
  return {
    type: SET_VERSIONED_LAYER as typeof SET_VERSIONED_LAYER,
    payload: payload
  };
}
