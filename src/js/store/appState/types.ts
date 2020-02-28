// import Point from 'esri/geometry/Point';

export interface LeftPanel {
  tabViewVisible: boolean;
  activeTab: string;
  openLayerGroup: string;
}

interface SpecificAreaResults {
  area?: string;
  perimeter?: string;
}

interface SpecificDistanceResults {
  length?: string;
}

interface ClickResults {
  latitude?: number;
  longitude?: number;
}

export interface MeasureContent {
  activeButton?: string;
  areaResults?: SpecificAreaResults;
  distanceResults?: SpecificDistanceResults;
  coordinateMouseClickResults?: any; // ClickResults | undefined | Point;
  coordinatePointerMoveResults?: any; // ClickResults | undefined | Point;
}

export interface AppState {
  leftPanel: LeftPanel;
  renderModal: string;
  selectedLanguage: string;
  measureContent: MeasureContent;
  hideWidgetActive: boolean;
  isLoggedIn: boolean;
}

//Action names available
export const RENDER_MODAL = 'RENDER_MODAL';
export const SELECT_ACTIVE_TAB = 'SELECT_ACTIVE_TAB';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const TOGGLE_TABVIEW_PANEL = 'TOGGLE_TABVIEW_PANEL';
export const SET_OPEN_LAYER_GROUP = 'SET_OPEN_LAYER_GROUP';
export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const SET_MEASURE_RESULTS = 'SET_MEASURE_RESULTS';
export const SET_ACTIVE_MEASURE_BUTTON = 'SET_ACTIVE_MEASURE_BUTTON';
export const SET_HIDE_WIDGET = 'SET_HIDE_WIDGET';

interface SetOpenLayerGroup {
  type: typeof SET_OPEN_LAYER_GROUP;
  payload: LeftPanel['openLayerGroup'];
}

interface ToggleTabviewPanelAction {
  type: typeof TOGGLE_TABVIEW_PANEL;
  payload: LeftPanel['tabViewVisible'];
}

interface SetHideWidget {
  type: typeof SET_HIDE_WIDGET;
  payload: AppState['hideWidgetActive'];
}

interface RenderModalAction {
  type: typeof RENDER_MODAL;
  payload: AppState['renderModal'];
}

interface SetLoggedIn {
  type: typeof SET_LOGGED_IN;
  payload: AppState['isLoggedIn'];
}

interface SelectActiveTab {
  type: typeof SELECT_ACTIVE_TAB;
  payload: LeftPanel['activeTab'];
}

interface SetLanguageAction {
  type: typeof SET_LANGUAGE;
  payload: AppState['selectedLanguage'];
}

interface SetMeasureResults {
  type: typeof SET_MEASURE_RESULTS;
  payload: AppState['measureContent'];
}

interface SetActiveMeasureButton {
  type: typeof SET_ACTIVE_MEASURE_BUTTON;
  payload: AppState['measureContent']['activeButton'];
}

export type AppStateTypes =
  | ToggleTabviewPanelAction
  | RenderModalAction
  | SelectActiveTab
  | SetLanguageAction
  | SetOpenLayerGroup
  | SetLoggedIn
  | SetMeasureResults
  | SetActiveMeasureButton
  | SetHideWidget;
