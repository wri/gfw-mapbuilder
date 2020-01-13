//Store types
export interface MapviewState {
  isMapReady: boolean;
  loadError: boolean;
}

//Action types
export const MAP_READY = 'MAP_READY';
export const MAP_ERROR = 'MAP_ERROR';

interface MapIsReadyAction {
  type: typeof MAP_READY;
  payload: boolean;
}

interface MapErrorAction {
  type: typeof MAP_ERROR;
  payload: boolean;
}

export type MapviewStateTypes = MapIsReadyAction | MapErrorAction;
