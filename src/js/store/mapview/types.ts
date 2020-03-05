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

export interface SubscriptionResource {
  type: string;
  content: string;
}

export interface SubscriptionParams {
  iso: {
    country: string;
    region: string;
  };
  wdpaid: any;
  use: any;
  useid: any;
  geostore: string;
}

export interface SubscriptionAttributes {
  name: string;
  createdAt: string;
  userId: string;
  resource: SubscriptionResource;
  datasets: string[];
  confirmed: boolean;
  language: string;
  params: SubscriptionParams;
}

export interface UserSubscription {
  attributes: SubscriptionAttributes;
  id: string;
  type: string;
}

//Store types
export interface MapviewState {
  isMapReady: boolean;
  loadError: boolean;
  userSubscriptions: UserSubscription[];
  allAvailableLayers: LayerProps[];
  activeFeatures: LayerFeatureResult[];
  activeFeatureIndex: number[];
  activeBasemap: string; // * NEW! not in resources.js
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

interface Attributes {
  [key: string]: any;
  geostoreId: string;
}

export interface FeatureResult {
  attributes: Attributes;
  geometry: __esri.Geometry;
}

export interface LayerFeatureResult {
  layerTitle: string;
  layerID: string;
  sublayerTitle: string | null;
  sublayerID: string | null;
  features: FeatureResult[];
}

//Action types
export const MAP_READY = 'MAP_READY';
export const MAP_ERROR = 'MAP_ERROR';
export const USER_SUBSCRIPTIONS = 'USER_SUBSCRIPTIONS';
export const ALL_AVAILABLE_LAYERS = 'ALL_AVAILABLE_LAYERS';
export const SET_ACTIVE_FEATURES = 'SET_ACTIVE_FEATURES';
export const SET_ACTIVE_FEATURE_INDEX = 'SET_ACTIVE_FEATURE_INDEX';
export const SET_ACTIVE_BASEMAP = 'SET_ACTIVE_BASEMAP';

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

interface SetUserSubscriptionsAction {
  type: typeof USER_SUBSCRIPTIONS;
  payload: MapviewState['userSubscriptions'];
}
interface SetActiveFeaturesAction {
  type: typeof SET_ACTIVE_FEATURES;
  payload: MapviewState['activeFeatures'];
}

interface SetSelectedAction {
  type: typeof SET_ACTIVE_BASEMAP;
  payload: MapviewState['activeBasemap'];
}

interface SetActiveFeatureIndex {
  type: typeof SET_ACTIVE_FEATURE_INDEX;
  payload: MapviewState['activeFeatureIndex'];
}

export type MapviewStateTypes =
  | MapIsReadyAction
  | MapErrorAction
  | SetUserSubscriptionsAction
  | AllAvailableLayersAction
  | SetActiveFeaturesAction
  | SetActiveFeatureIndex
  | SetSelectedAction;
