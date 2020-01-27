//Store types
export interface MapviewState {
  isMapReady: boolean;
  loadError: boolean;
  visibleLayers: string[];
}

//Action types
export const MAP_READY = 'MAP_READY';
export const MAP_ERROR = 'MAP_ERROR';
export const CLEAR_ALL_LAYERS = 'CLEAR_ALL_LAYERS';
export const UPDATE_VISIBLE_LAYERS = 'UPDATE_VISIBLE_LAYERS';

interface MapIsReadyAction {
  type: typeof MAP_READY;
  payload: boolean;
}

interface MapErrorAction {
  type: typeof MAP_ERROR;
  payload: boolean;
}

interface ClearAllLayersAction {
  type: typeof CLEAR_ALL_LAYERS;
}

interface UpdateVisibleLayersAction {
  type: typeof UPDATE_VISIBLE_LAYERS;
  payload: MapviewState['visibleLayers'];
}

export type MapviewStateTypes =
  | MapIsReadyAction
  | MapErrorAction
  | ClearAllLayersAction
  | UpdateVisibleLayersAction;
