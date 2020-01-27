import {
  MAP_ERROR,
  MAP_READY,
  CLEAR_ALL_LAYERS,
  UPDATE_VISIBLE_LAYERS,
  MapviewState
} from './types';

export function isMapReady(payload: MapviewState['isMapReady']) {
  return {
    type: MAP_READY as typeof MAP_READY,
    payload
  };
}

export function mapError(payload: MapviewState['loadError']) {
  return {
    type: MAP_ERROR as typeof MAP_ERROR,
    payload
  };
}

export function clearAllLayers() {
  return {
    type: CLEAR_ALL_LAYERS as typeof CLEAR_ALL_LAYERS
  };
}

export function updateVisibleLayers(payload: MapviewState['visibleLayers']) {
  return {
    type: UPDATE_VISIBLE_LAYERS as typeof UPDATE_VISIBLE_LAYERS,
    payload
  };
}
