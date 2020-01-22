import {
  SHOW_TABVIEW_PANEL,
  HIDE_TABVIEW_PANEL,
  RENDER_MODAL,
  SET_LANGUAGE,
  AppState
} from './types';

export function showTabviewPanel(payload: AppState) {
  return {
    type: SHOW_TABVIEW_PANEL,
    payload: payload
  };
}

export function hideTabviewPanel(payload: AppState) {
  return {
    type: HIDE_TABVIEW_PANEL,
    payload: payload
  };
}

export function renderModal(payload: AppState['renderModal']) {
  return {
    type: RENDER_MODAL,
    payload: payload
  };
}

export function setLanguage(payload: AppState['selectedLanguage']) {
  return {
    type: SET_LANGUAGE,
    payload: payload
  };
}
