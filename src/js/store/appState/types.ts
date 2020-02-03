export interface LeftPanel {
  tabViewVisible: boolean;
  activeTab: string;
  openLayerGroup: string;
}

export interface MeasureContent {
  toggleButton: {
    areaButton?: boolean;
    distanceButton?: boolean;
    coordinatesButton?: boolean;
  };
  results: {
    area?: Array<object>;
    distance?: Array<object>;
    coordinates?: Array<object>;
  };
}

export interface AppState {
  leftPanel: LeftPanel;
  renderModal: string;
  selectedLanguage: string;
  measureContent: MeasureContent;
}

//Action names available
export const RENDER_MODAL = 'RENDER_MODAL';
export const SELECT_ACTIVE_TAB = 'SELECT_ACTIVE_TAB';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const TOGGLE_TABVIEW_PANEL = 'TOGGLE_TABVIEW_PANEL';
export const SET_OPEN_LAYER_GROUP = 'SET_OPEN_LAYER_GROUP';
export const SET_MEASURE_BUTTON = 'SET_MEASURE_BUTTON';
export const SET_MEASURE_RESULTS = 'SET_MEASURE_RESULTS';

interface SetOpenLayerGroup {
  type: typeof SET_OPEN_LAYER_GROUP;
  payload: LeftPanel['openLayerGroup'];
}

interface ToggleTabviewPanelAction {
  type: typeof TOGGLE_TABVIEW_PANEL;
  payload: LeftPanel['tabViewVisible'];
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

interface SetMeasureButton {
  type: typeof SET_MEASURE_BUTTON;
  payload: AppState['measureContent']['toggleButton'];
}

interface SetMeasureResults {
  type: typeof SET_MEASURE_RESULTS;
  payload: AppState['measureContent']['results'];
}

export type AppStateTypes =
  | ToggleTabviewPanelAction
  | RenderModalAction
  | SelectActiveTab
  | SetLanguageAction
  | SetOpenLayerGroup
  | SetMeasureButton
  | SetMeasureResults;
