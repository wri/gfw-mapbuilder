interface LeftPanel {
  tabviewHidden: boolean;
}

export interface AppState {
  leftPanel?: LeftPanel;
  renderModal?: String;
  selectedLanguage?: String;
}

//Action names available
export const SHOW_TABVIEW_PANEL = 'SHOW_TABVIEW_PANEL';
export const HIDE_TABVIEW_PANEL = 'HIDE_TABVIEW_PANEL';
export const RENDER_MODAL = 'RENDER_MODAL';
export const SET_LANGUAGE = 'SET_LANGUAGE';

interface ShowTabviewPanelAction {
  type: typeof SHOW_TABVIEW_PANEL;
  payload: AppState;
}

interface HideTabviewPanelAction {
  type: typeof HIDE_TABVIEW_PANEL;
  payload: AppState;
}

interface RenderModalAction {
  type: typeof RENDER_MODAL;
  payload: AppState;
}

interface SetLanguageAction {
  type: typeof SET_LANGUAGE;
  payload: AppState;
}

export type AppStateTypes =
  | ShowTabviewPanelAction
  | HideTabviewPanelAction
  | RenderModalAction
  | SetLanguageAction;
