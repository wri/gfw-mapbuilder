import { SHOW_TABVIEW_PANEL, HIDE_TABVIEW_PANEL, AppState } from './types';

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
