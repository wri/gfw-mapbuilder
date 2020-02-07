import {
  TOGGLE_TABVIEW_PANEL,
  RENDER_MODAL,
  SELECT_ACTIVE_TAB,
  SET_LANGUAGE,
  SET_OPEN_LAYER_GROUP,
  AppState,
  LeftPanel,
  SET_MEASURE_BUTTON,
  SET_MEASURE_RESULTS,
  SET_ACTIVE_MEASURE_BUTTON
} from './types';

export function toggleTabviewPanel(payload: LeftPanel['tabViewVisible']) {
  return {
    type: TOGGLE_TABVIEW_PANEL as typeof TOGGLE_TABVIEW_PANEL,
    payload: payload
  };
}

export function renderModal(payload: AppState['renderModal']) {
  return {
    type: RENDER_MODAL,
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
    type: SET_LANGUAGE,
    payload: payload
  };
}

export function setOpenLayerGroup(payload: LeftPanel['openLayerGroup']) {
  return {
    type: SET_OPEN_LAYER_GROUP,
    payload: payload
  };
}

export function setMeasureButton(
  payload: AppState['measureContent']['toggleButton']
) {
  return {
    type: SET_MEASURE_BUTTON as typeof SET_MEASURE_BUTTON,
    payload: payload
  };
}

export function setMeasureResults(
  payload: AppState['measureContent']['results']
) {
  return {
    type: SET_MEASURE_RESULTS as typeof SET_MEASURE_RESULTS,
    payload: payload
  };
}

export function setActiveMeasureButton(
  payload: AppState['measureContent']['toggleButton']['activeButton']
) {
  return {
    type: SET_ACTIVE_MEASURE_BUTTON as typeof SET_ACTIVE_MEASURE_BUTTON,
    payload: payload
  };
}
