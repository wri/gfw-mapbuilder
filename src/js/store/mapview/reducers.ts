import {
  MapviewState,
  MapviewStateTypes,
  MAP_READY,
  MAP_ERROR,
  CLEAR_ALL_LAYERS,
  UPDATE_VISIBLE_LAYERS,
  ALL_AVAILABLE_LAYERS,
  ALL_AVAILABLE_LAYERS2
} from './types';

const initialState: MapviewState = {
  isMapReady: false,
  loadError: false,
  visibleLayers: [],
  allAvailableLayers: [],
  allAvailableLayers2: []
};

function updateVisibleLayers(
  state: MapviewState = initialState,
  payload: string[]
): MapviewState {
  //if payload is of length >1, we overwrite existing visible layers with these new visible layers
  const oldVisibleLayers = [...state.visibleLayers];
  let newVisibleLayers: string[] = [];
  if (payload.length > 1) {
    newVisibleLayers = payload;
  } else {
    // payload is just a single item, meaning it is just a sole layer ID incoming, depending if we have it in the array or not, we remove/add it
    if (state.visibleLayers.includes(payload[0])) {
      newVisibleLayers = oldVisibleLayers.filter(layer => layer !== payload[0]);
    } else {
      oldVisibleLayers.push(payload[0]);
      newVisibleLayers = oldVisibleLayers;
    }
  }
  return { ...state, visibleLayers: newVisibleLayers };
}

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
      return updateVisibleLayers(state, action.payload);
    case ALL_AVAILABLE_LAYERS:
      return { ...state, allAvailableLayers: [...action.payload] };
    case ALL_AVAILABLE_LAYERS2:
      return { ...state, allAvailableLayers2: action.payload };
    default:
      return state;
  }
}
