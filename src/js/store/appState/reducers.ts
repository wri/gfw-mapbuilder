import {
  AppState,
  AppStateTypes,
  TOGGLE_TABVIEW_PANEL,
  SELECT_ACTIVE_TAB,
  SET_LANGUAGE,
  RENDER_MODAL,
  SET_OPEN_LAYER_GROUP,
  SET_HIDE_WIDGET,
  SET_LOGGED_IN
} from './types';

const initialState: AppState = {
  selectedLanguage: 'en',
  renderModal: '',
  hideWidgetActive: false,
  isLoggedIn: false,
  leftPanel: {
    tabViewVisible: true,
    activeTab: 'layers',
    openLayerGroup: 'GROUP_WEBMAP'
  }
};

export function appStateReducer(
  state = initialState,
  action: AppStateTypes
): AppState {
  switch (action.type) {
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
    default:
      return state;
  }
}
