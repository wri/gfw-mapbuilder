//Store types
export interface MapviewState {
  isMapReady: boolean;
  loadError: boolean;
  visibleLayers: string[];
  allAvailableLayers: string[];
  allAvailableLayers2: LayerProps[];
}

export interface LayerProps {
  id: string;
  visible: boolean;
  title?: string;
  order?: number;
  opacity: number;
  definitionExpression?: string;
}

//Action types
export const MAP_READY = 'MAP_READY';
export const MAP_ERROR = 'MAP_ERROR';
export const CLEAR_ALL_LAYERS = 'CLEAR_ALL_LAYERS';
export const UPDATE_VISIBLE_LAYERS = 'UPDATE_VISIBLE_LAYERS';
export const ALL_AVAILABLE_LAYERS = 'ALL_AVAILABLE_LAYERS';
export const ALL_AVAILABLE_LAYERS2 = 'ALL_AVAILABLE_LAYERS2';

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

interface AllAvailableLayersAction {
  type: typeof ALL_AVAILABLE_LAYERS;
  payload: MapviewState['allAvailableLayers'];
}

interface AllAvailableLayersAction2 {
  type: typeof ALL_AVAILABLE_LAYERS2;
  payload: MapviewState['allAvailableLayers2'];
}

export type MapviewStateTypes =
  | MapIsReadyAction
  | MapErrorAction
  | ClearAllLayersAction
  | UpdateVisibleLayersAction
  | AllAvailableLayersAction
  | AllAvailableLayersAction2;
