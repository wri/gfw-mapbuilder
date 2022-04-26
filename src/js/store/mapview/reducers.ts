import {
  MapviewState,
  MapviewStateTypes,
  MAP_READY,
  MAP_ERROR,
  USER_SUBSCRIPTIONS,
  ALL_AVAILABLE_LAYERS,
  SET_ACTIVE_FEATURES,
  SET_ACTIVE_FEATURE_INDEX,
  SET_ACTIVE_BASEMAP,
  SET_TIME_SLIDER,
  SET_DOCUMENTS,
  CHANGE_MAP_SCALE,
  CHANGE_MAP_CENTER_COORDINATES,
  SET_LAYERS_LOADING,
  SET_USER_COORDINATES,
} from './types';

const initialState: MapviewState = {
  isMapReady: false,
  loadError: false,
  allAvailableLayers: [],
  activeFeatures: [],
  activeFeatureIndex: [0, 0], //first element is the index of the layer, second is the index of feature
  documents: null,
  activeBasemap: 'webmap',
  timeSlider: [2001, 2021],
  scale: 0,
  mapCenterCoordinates: { latitude: 0, longitude: 0 },
  layersLoading: true,
  userCoordinates: undefined,
};

export function mapviewReducer(state = initialState, action: MapviewStateTypes): MapviewState {
  switch (action.type) {
    case MAP_READY:
      return { ...state, isMapReady: action.payload };
    case MAP_ERROR:
      return { ...state, loadError: action.payload };
    case ALL_AVAILABLE_LAYERS:
      return { ...state, allAvailableLayers: action.payload };
    case SET_ACTIVE_FEATURES:
      return { ...state, activeFeatures: action.payload };
    case SET_ACTIVE_FEATURE_INDEX:
      return { ...state, activeFeatureIndex: action.payload };
    case SET_ACTIVE_BASEMAP:
      return { ...state, activeBasemap: action.payload };
    case SET_TIME_SLIDER:
      return { ...state, timeSlider: action.payload };
    case CHANGE_MAP_SCALE:
      return { ...state, scale: action.payload };
    case CHANGE_MAP_CENTER_COORDINATES:
      return { ...state, mapCenterCoordinates: action.payload };
    case SET_LAYERS_LOADING:
      return { ...state, layersLoading: action.payload };
    case SET_USER_COORDINATES:
      return { ...state, userCoordinates: action.payload };
    case SET_DOCUMENTS:
      return { ...state, documents: action.payload };
    default:
      return state;
  }
}
