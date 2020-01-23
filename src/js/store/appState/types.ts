export interface LeftPanel {
  tabviewHidden: boolean;
  activeTab: string;
}

export interface AppState {
  leftPanel: LeftPanel;
  renderModal: string;
  selectedLanguage: string;
}

//Action names available
export const RENDER_MODAL = 'RENDER_MODAL';
export const SELECT_ACTIVE_TAB = 'SELECT_ACTIVE_TAB';
export const SHOW_TABVIEW_PANEL = 'SHOW_TABVIEW_PANEL';
export const HIDE_TABVIEW_PANEL = 'HIDE_TABVIEW_PANEL';
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
  payload: AppState['renderModal'];
}

interface SelectActiveTab {
  type: typeof SELECT_ACTIVE_TAB;
  payload: LeftPanel['activeTab'];
}

interface SetLanguageAction {
  type: typeof SET_LANGUAGE;
  payload: AppState['selectedLanguage'];
}

export type AppStateTypes =
  | ShowTabviewPanelAction
  | HideTabviewPanelAction
  | RenderModalAction
  | SelectActiveTab
  | SetLanguageAction;
