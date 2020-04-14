import {
  AppState,
  AppStateTypes,
  TOGGLE_TABVIEW_PANEL,
  SELECT_ACTIVE_TAB,
  SET_LANGUAGE,
  RENDER_MODAL,
  RENDER_INFO_MODAL,
  RENDER_GFW_DROPDOWN,
  SET_OPEN_LAYER_GROUP,
  SET_LOGGED_IN,
  SET_MEASURE_RESULTS,
  SET_ACTIVE_MEASURE_BUTTON,
  SET_HIDE_WIDGET,
  SET_CANOPY_DENSITY,
  SET_SELECTED_SEARCH_WIDGET_LAYER
} from './types';

const initialState: AppState = {
  selectedLanguage: 'en',
  renderModal: '',
  renderGFWDropdown: false,
  infoModalLayerID: '',
  hideWidgetActive: false,
  isLoggedIn: false,
  selectedSearchWidgetLayer: {
    displayField: '',
    layerTitle: ''
  },
  leftPanel: {
    tabViewVisible: true,
    activeTab: 'layers',
    openLayerGroup: 'RECENT_IMAGERY',
    density: 5
  },
  measureContent: {
    activeButton: '',
    areaResults: {},
    distanceResults: {},
    coordinateMouseClickResults: {},
    coordinatePointerMoveResults: {}
  }
};

export function appStateReducer(
  state = initialState,
  action: AppStateTypes
): AppState {
  switch (action.type) {
    case SET_SELECTED_SEARCH_WIDGET_LAYER:
      return {
        ...state,
        selectedSearchWidgetLayer: action.payload
      };
    case TOGGLE_TABVIEW_PANEL:
      return {
        ...state,
        leftPanel: {
          ...state.leftPanel,
          tabViewVisible: action.payload
        }
      };
    case SET_HIDE_WIDGET:
      return {
        ...state,
        hideWidgetActive: action.payload
      };
    case RENDER_MODAL:
      return { ...state, renderModal: action.payload };
    case RENDER_INFO_MODAL:
      return { ...state, infoModalLayerID: action.payload };
    case RENDER_GFW_DROPDOWN:
      return { ...state, renderGFWDropdown: action.payload };
    case SELECT_ACTIVE_TAB:
      return {
        ...state,
        leftPanel: {
          ...state.leftPanel,
          activeTab: action.payload
        }
      };
    case SET_LANGUAGE:
      return { ...state, selectedLanguage: action.payload };
    case SET_LOGGED_IN:
      return { ...state, isLoggedIn: action.payload };
    case SET_OPEN_LAYER_GROUP:
      return {
        ...state,
        leftPanel: {
          ...state.leftPanel,
          openLayerGroup: action.payload
        }
      };
    case SET_CANOPY_DENSITY:
      return {
        ...state,
        leftPanel: {
          ...state.leftPanel,
          density: action.payload
        }
      };
    case SET_ACTIVE_MEASURE_BUTTON:
      return {
        ...state,
        measureContent: {
          ...state.measureContent,
          activeButton: action.payload
        }
      };
    case SET_MEASURE_RESULTS:
      return {
        ...state,
        measureContent: {
          ...action.payload
        }
      };
    default:
      return state;
  }
}
