import {
  MapviewState,
  MapviewStateTypes,
  MAP_READY,
  MAP_ERROR,
  ALL_AVAILABLE_LAYERS,
  SET_USER_CLICK_LOCATION
} from './types';

const initialState: MapviewState = {
  isMapReady: false,
  loadError: false,
  allAvailableLayers: [],
  userClickLocation: undefined
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
    case ALL_AVAILABLE_LAYERS:
      return { ...state, allAvailableLayers: action.payload };
    case SET_USER_CLICK_LOCATION:
      return { ...state, userClickLocation: action.payload };
    default:
      return state;
  }
}
