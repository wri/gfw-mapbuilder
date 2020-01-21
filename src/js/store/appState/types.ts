interface LeftPanel {
  tabviewHidden: boolean;
}

export interface AppState {
  leftPanel?: LeftPanel;
  renderModal?: String;
}

//Action names available
export const SHOW_TABVIEW_PANEL = 'SHOW_TABVIEW_PANEL';
export const HIDE_TABVIEW_PANEL = 'HIDE_TABVIEW_PANEL';
export const RENDER_MODAL = 'RENDER_MODAL';

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

export type AppStateTypes =
  | ShowTabviewPanelAction
  | HideTabviewPanelAction
  | RenderModalAction;
