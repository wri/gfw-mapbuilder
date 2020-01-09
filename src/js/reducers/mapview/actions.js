import * as types from 'constants/actionTypes';

export function isMapReady(mapReady) {
  return {
    type: types.MAP_READY,
    mapReady
  };
}
