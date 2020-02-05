import {
  AppState,
  AppStateTypes,
  TOGGLE_TABVIEW_PANEL,
  SELECT_ACTIVE_TAB,
  SET_LANGUAGE,
  RENDER_MODAL,
  SET_OPEN_LAYER_GROUP,
  SET_MEASURE_BUTTON,
  SET_MEASURE_RESULTS
} from './types';

const initialState: AppState = {
  selectedLanguage: 'en',
  renderModal: '',
  leftPanel: {
    tabViewVisible: true,
    activeTab: 'layers',
    openLayerGroup: 'GROUP_WEBMAP'
  },
  measureContent: {
    toggleButton: {
      areaButtonActive: false,
      distanceButtonActive: false,
      coordinatesButtonActive: false
    },
    results: {
      areaResults: {},
      distanceResults: {},
      coordinateMouseClickResults: {},
      coordinatePointerMoveResults: {}
    }
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
    case SET_OPEN_LAYER_GROUP:
      return {
        ...state,
        leftPanel: {
          ...state.leftPanel,
          openLayerGroup: action.payload
        }
      };
    case SET_MEASURE_BUTTON:
      return {
        ...state,
        measureContent: {
          toggleButton: {
            ...state.measureContent.toggleButton,
            ...action.payload
          },
          results: state.measureContent.results
        }
      };
    case SET_MEASURE_RESULTS:
      return {
        ...state,
        measureContent: {
          results: {
            ...state.measureContent.results,
            ...action.payload
          },
          toggleButton: state.measureContent.toggleButton
        }
      };
    default:
      return state;
  }
}
