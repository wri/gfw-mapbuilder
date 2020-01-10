import { MapviewState, MapviewStateTypes, MAP_READY, MAP_ERROR } from './types';

const initialState: MapviewState = {
  isMapReady: false,
  loadError: false
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
    default:
      return state;
  }
}
