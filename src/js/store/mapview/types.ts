import Graphic from 'esri/Graphic';

//Store types
export interface MapviewState {
  isMapReady: boolean;
  loadError: boolean;
  allAvailableLayers: LayerProps[];
  activeFeatures: Graphic[][];
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
export const SET_ACTIVE_FEATURES = 'SET_ACTIVE_FEATURES';

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

interface SetActiveFeaturesAction {
  type: typeof SET_ACTIVE_FEATURES;
  payload: MapviewState['activeFeatures'];
}

export type MapviewStateTypes =
  | MapIsReadyAction
  | MapErrorAction
  | AllAvailableLayersAction
  | SetActiveFeaturesAction;
