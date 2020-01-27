import {
  MapviewState,
  MapviewStateTypes,
  MAP_READY,
  MAP_ERROR,
  CLEAR_ALL_LAYERS,
  UPDATE_VISIBLE_LAYERS
} from './types';

const initialState: MapviewState = {
  isMapReady: false,
  loadError: false,
  visibleLayers: []
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
    case CLEAR_ALL_LAYERS:
      return { ...state, visibleLayers: [] };
    case UPDATE_VISIBLE_LAYERS:
      return { ...state, visibleLayers: [...action.payload] };
    default:
      return state;
  }
}
