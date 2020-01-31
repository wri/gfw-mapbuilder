import {
  MAP_ERROR,
  MAP_READY,
  CLEAR_ALL_LAYERS,
  UPDATE_VISIBLE_LAYERS,
  ALL_AVAILABLE_LAYERS,
  MapviewState,
  ALL_AVAILABLE_LAYERS2
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

export function allAvailableLayers(
  payload: MapviewState['allAvailableLayers']
) {
  return {
    type: ALL_AVAILABLE_LAYERS as typeof ALL_AVAILABLE_LAYERS,
    payload
  };
}

export function allAvailableLayers2(
  payload: MapviewState['allAvailableLayers2']
) {
  return {
    type: ALL_AVAILABLE_LAYERS2 as typeof ALL_AVAILABLE_LAYERS2,
    payload
  };
}
