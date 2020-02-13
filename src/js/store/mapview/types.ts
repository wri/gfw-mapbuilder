//Store types
export interface MapviewState {
  isMapReady: boolean;
  loadError: boolean;
  allAvailableLayers: LayerProps[];
}

export interface LayerProps {
  id: string;
  visible: boolean;
  title?: string;
  order?: number;
  opacity: number;
  definitionExpression?: string;
  group: string;
}

//Action types
export const MAP_READY = 'MAP_READY';
export const MAP_ERROR = 'MAP_ERROR';
export const ALL_AVAILABLE_LAYERS = 'ALL_AVAILABLE_LAYERS';

interface MapIsReadyAction {
  type: typeof MAP_READY;
  payload: boolean;
}

interface MapErrorAction {
  type: typeof MAP_ERROR;
  payload: boolean;
}

interface AllAvailableLayersAction {
  type: typeof ALL_AVAILABLE_LAYERS;
  payload: MapviewState['allAvailableLayers'];
}

export type MapviewStateTypes =
  | MapIsReadyAction
  | MapErrorAction
  | AllAvailableLayersAction;
