import { MAP_ERROR, MAP_READY } from './types';

export function isMapReady(isMapReady: boolean) {
  return {
    type: MAP_READY,
    isMapReady
  };
}

export function mapError(loadError: boolean) {
  return {
    type: MAP_ERROR,
    loadError
  };
}
