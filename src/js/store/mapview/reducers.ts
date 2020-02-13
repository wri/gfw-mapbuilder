import {
  MapviewState,
  MapviewStateTypes,
  MAP_READY,
  MAP_ERROR,
  ALL_AVAILABLE_LAYERS
} from './types';

const initialState: MapviewState = {
  isMapReady: false,
  loadError: false,
  allAvailableLayers: []
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
    default:
      return state;
  }
}
