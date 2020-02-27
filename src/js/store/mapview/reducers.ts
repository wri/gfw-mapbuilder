import {
  MapviewState,
  MapviewStateTypes,
  MAP_READY,
  MAP_ERROR,
  USER_SUBSCRIPTIONS,
  ALL_AVAILABLE_LAYERS,
  SET_ACTIVE_FEATURES,
  SET_ACTIVE_FEATURE_INDEX,
  SET_ACTIVE_BASEMAP
} from './types';

const initialState: MapviewState = {
  isMapReady: false,
  loadError: false,
  userSubscriptions: [],
  allAvailableLayers: [],
  activeFeatures: [],
  activeFeatureIndex: [0, 0], //first element is the index of the layer, second is the index of feature
  activeBasemap: ''
};

export function mapviewReducer(
  state = initialState,
  action: MapviewStateTypes
): MapviewState {
  switch (action.type) {
    case MAP_READY:
      return { ...state, isMapReady: action.payload };
    case MAP_ERROR:
      return { ...state, loadError: action.payload };
    case USER_SUBSCRIPTIONS:
      return { ...state, userSubscriptions: action.payload };
    case ALL_AVAILABLE_LAYERS:
      return { ...state, allAvailableLayers: action.payload };
    case SET_ACTIVE_FEATURES:
      return { ...state, activeFeatures: action.payload };
    case SET_ACTIVE_FEATURE_INDEX:
      return { ...state, activeFeatureIndex: action.payload };
    case SET_ACTIVE_BASEMAP:
      return { ...state, activeBasemap: action.payload };
    default:
      return state;
  }
}
