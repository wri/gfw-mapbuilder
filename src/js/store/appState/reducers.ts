import { format, subYears } from 'date-fns';

import {
  AppState,
  AppStateTypes,
  RENDER_GFW_DROPDOWN,
  RENDER_INFO_MODAL,
  RENDER_MODAL,
  SELECT_ACTIVE_TAB,
  SET_ACTIVE_MEASURE_BUTTON,
  SET_ACTIVE_MULTI_INPUT,
  SET_ANALYSIS_DATE,
  SET_ANALYSIS_FEATURE_LIST,
  SET_ANALYSIS_YEAR_RANGE,
  SET_AREA_IMAGES,
  SET_CANOPY_DENSITY,
  SET_GLAD_CONFIRMED,
  SET_GLAD_END,
  SET_GLAD_START,
  SET_GFW_INTEGRATED_START,
  SET_GFW_INTEGRATED_END,
  SET_HIDE_WIDGET,
  SET_HIGH_CONFIDENCE_CONFIRMED,
  SET_IMAGE_OBJECT,
  SET_IS_PROFILE_COMPLETE,
  SET_LANGUAGE,
  SET_LOGGED_IN,
  SET_MEASURE_RESULTS,
  SET_MODIS_END,
  SET_MODIS_START,
  SET_MULTI_POLYGON_SELECTION_MODE,
  SET_OPEN_LAYER_GROUP,
  SET_RENDER_POPUP,
  SET_SELECTED_SEARCH_WIDGET_LAYER,
  SET_TREE_HEIGHT,
  SET_GFW_LAYER,
  SET_VERSIONED_LAYER,
  SET_VIIRS_END,
  SET_VIIRS_START,
  SET_WIND_SPEED_POTENTIAL,
  TOGGLE_TABVIEW_PANEL
} from './types';

const initialState: AppState = {
  selectedLanguage: 'en',
  renderModal: '',
  renderGFWDropdown: false,
  infoModalLayerID: '',
  hideWidgetActive: false,
  isLoggedIn: false,
  isProfileComplete: false,
  selectedSearchWidgetLayer: {
    displayField: '',
    layerTitle: ''
  },
  leftPanel: {
    tabViewVisible: true,
    activeTab: 'layers',
    openLayerGroup: 'GROUP_WEBMAP',
    density: 5,
    analysisDateRange: [format(new Date(Date.now()), 'yyyy-MM-dd'), format(new Date(Date.now()), 'yyyy-MM-dd')],
    analysisYearRange: [2001, 2018],
    gladConfirmed: false,
    highConfidenceConfirmed: false,
    gladStart: '2015-01-01',
    gladEnd: format(new Date(Date.now()), 'yyyy-MM-dd'),
    gfwIntegratedStart: '2020-03-03',
    gfwIntegratedEnd: format(new Date(Date.now()), 'yyyy-MM-dd'),
    modisEnd: format(new Date(Date.now()), 'yyyy-MM-dd'),
    modisStart: format(subYears(new Date(Date.now()), 1), 'yyyy-MM-dd'),
    viirsEnd: format(new Date(Date.now()), 'yyyy-MM-dd'),
    viirsStart: format(subYears(new Date(Date.now()), 1), 'yyyy-MM-dd'),
    versionedLayer: {},
    treeHeight: 3,
    gfwLayer: 1,
    windSpeedPotential: 50
  },
  measureContent: {
    activeButton: '',
    areaResults: {},
    distanceResults: {},
    coordinateMouseClickResults: {},
    coordinatePointerMoveResults: {}
  },
  renderPopup: false,
  areaImages: [],
  imageObject: {},
  multiPolygonSelectionMode: false,
  activeMultiInput: 0,
  analysisFeatureList: [undefined, undefined]
};

export function appStateReducer(state = initialState, action: AppStateTypes): AppState {
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
    case SET_MULTI_POLYGON_SELECTION_MODE:
      return { ...state, multiPolygonSelectionMode: action.payload };
    case SET_ACTIVE_MULTI_INPUT:
      return { ...state, activeMultiInput: action.payload };
    case SET_ANALYSIS_FEATURE_LIST:
      //TODO:check if feature is already in list
      return { ...state, analysisFeatureList: action.payload };
    case SET_LOGGED_IN:
      return { ...state, isLoggedIn: action.payload };
    case SET_IS_PROFILE_COMPLETE:
      return { ...state, isProfileComplete: action.payload };
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
    case SET_ANALYSIS_DATE:
      return {
        ...state,
        leftPanel: {
          ...state.leftPanel,
          analysisDateRange: action.payload
        }
      };
    case SET_ANALYSIS_YEAR_RANGE:
      return {
        ...state,
        leftPanel: {
          ...state.leftPanel,
          analysisYearRange: action.payload
        }
      };
    case SET_GLAD_CONFIRMED:
      return {
        ...state,
        leftPanel: {
          ...state.leftPanel,
          gladConfirmed: action.payload
        }
      };
    case SET_HIGH_CONFIDENCE_CONFIRMED:
      return {
        ...state,
        leftPanel: {
          ...state.leftPanel,
          highConfidenceConfirmed: action.payload
        }
      };
    case SET_GLAD_START:
      return {
        ...state,
        leftPanel: {
          ...state.leftPanel,
          gladStart: action.payload
        }
      };
    case SET_GLAD_END:
      return {
        ...state,
        leftPanel: {
          ...state.leftPanel,
          gladEnd: action.payload
        }
      };
    case SET_GFW_INTEGRATED_START:
      return {
        ...state,
        leftPanel: {
          ...state.leftPanel,
          gfwIntegratedStart: action.payload
        }
      };
    case SET_GFW_INTEGRATED_END:
      return {
        ...state,
        leftPanel: {
          ...state.leftPanel,
          gfwIntegratedEnd: action.payload
        }
      };
    case SET_MODIS_START:
      return {
        ...state,
        leftPanel: {
          ...state.leftPanel,
          modisStart: action.payload
        }
      };
    case SET_MODIS_END:
      return {
        ...state,
        leftPanel: {
          ...state.leftPanel,
          modisEnd: action.payload
        }
      };
    case SET_VIIRS_START:
      return {
        ...state,
        leftPanel: {
          ...state.leftPanel,
          viirsStart: action.payload
        }
      };
    case SET_VIIRS_END:
      return {
        ...state,
        leftPanel: {
          ...state.leftPanel,
          viirsEnd: action.payload
        }
      };
    case SET_TREE_HEIGHT:
      return {
        ...state,
        leftPanel: {
          ...state.leftPanel,
          treeHeight: action.payload
        }
      };
    case SET_GFW_LAYER:
      return {
        ...state,
        leftPanel: {
          ...state.leftPanel,
          gfwLayer: action.payload
        }
      };
    case SET_WIND_SPEED_POTENTIAL:
      return {
        ...state,
        leftPanel: {
          ...state.leftPanel,
          windSpeedPotential: action.payload
        }
      };
    case SET_VERSIONED_LAYER: {
      const versionedState = state.leftPanel.versionedLayer;
      versionedState[Object.keys(action.payload)[0]] = Object.values(action.payload)[0] as string;
      return {
        ...state,
        leftPanel: {
          ...state.leftPanel,
          versionedLayer: versionedState
        }
      };
    }
    case SET_RENDER_POPUP:
      return {
        ...state,
        renderPopup: action.payload
      };
    case SET_AREA_IMAGES: {
      const newAreaImages = state.areaImages;
      const incomingArea = newAreaImages.find(areaID => areaID === action.payload);
      if (incomingArea) {
        const index = newAreaImages.findIndex(areaID => areaID === action.payload);
        newAreaImages.splice(index, 0, action.payload);
      } else {
        newAreaImages.push(action.payload);
      }
      return {
        ...state,
        areaImages: newAreaImages
      };
    }
    case SET_IMAGE_OBJECT:
      return {
        ...state,
        imageObject: action.payload
      };
    default:
      return state;
  }
}
