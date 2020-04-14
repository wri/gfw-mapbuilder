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
  SET_ANALYSIS_YEAR_RANGE
} from './types';

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
