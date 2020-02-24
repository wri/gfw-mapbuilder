interface SpecificAreaResults {
  area: string;
  perimeter: string;
}

interface SpecificDistanceResults {
  length: string;
}

export interface MeasureContent {
  activeButton: string;
  areaResults: SpecificAreaResults;
  distanceResults: SpecificDistanceResults;
  coordinateMouseClickResults?: any; // ClickResults | undefined | Point;
  coordinatePointerMoveResults?: any; // ClickResults | undefined | Point;
}

//Store types
export interface MapviewState {
  isMapReady: boolean;
  loadError: boolean;
  allAvailableLayers: LayerProps[];
  activeFeatures: LayerFeatureResult[];
  activeFeatureIndex: number[];
}

export interface LayerProps {
  id: string;
  visible: boolean;
  title?: string;
  order?: number;
  opacity: number;
  definitionExpression?: string;
  group: string;
  url: string;
}

interface FeatureResult {
  attributes: object;
  geometry: __esri.Geometry;
}

export interface LayerFeatureResult {
  layerTitle: string;
  layerID: string;
  features: FeatureResult[];
}

//Action types
export const MAP_READY = 'MAP_READY';
export const MAP_ERROR = 'MAP_ERROR';
export const ALL_AVAILABLE_LAYERS = 'ALL_AVAILABLE_LAYERS';
export const SET_ACTIVE_FEATURES = 'SET_ACTIVE_FEATURES';
export const SET_ACTIVE_FEATURE_INDEX = 'SET_ACTIVE_FEATURE_INDEX';

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

interface SetActiveFeatureIndex {
  type: typeof SET_ACTIVE_FEATURE_INDEX;
  payload: MapviewState['activeFeatureIndex'];
}

export type MapviewStateTypes =
  | MapIsReadyAction
  | MapErrorAction
  | AllAvailableLayersAction
  | SetActiveFeaturesAction
  | SetActiveFeatureIndex;
