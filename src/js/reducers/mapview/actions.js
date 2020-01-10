import * as types from 'constants/actionTypes';

export function isMapReady(isMapReady) {
  return {
    type: types.MAP_READY,
    isMapReady
  };
}

export function mapError(loadError) {
  return {
    type: types.MAP_ERROR,
    loadError
  };
}
