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
  timeSlider: number[];
  scale: number;
  mapCenterCoordinates: { latitude: number; longitude: number };
  layersLoading: boolean;
  userCoordinates: __esri.Point | undefined;
}

interface Popup {
  content: any;
  title: any;
}

interface LegendConfigItem {
  color: string;
  name: object;
  size: number;
  outlineColor?: string;
}

interface LegendConfig {
  items: LegendConfigItem[];
  name: object;
  source: string;
  type: 'basic' | 'point' | 'gradient';
}
export type LayerOrigin = 'webmap' | 'service' | 'remote'; //where the layer originate from (GFW API, WEBMAP, SERVICE)

export interface LayerProps {
  id: string;
  visible: boolean;
  title?: string;
  order?: number;
  opacity: number;
  definitionExpression?: string;
  group: string;
  type: string;
  origin: LayerOrigin;
  url: string;
  metadata?: any | { legendConfig?: LegendConfig };
  legendInfo?: any;
  maxScale?: number;
  minScale?: number;
  sublayer?: boolean;
  parentID?: string;
  popup?: Popup;
  sublabel?: object;
  layerIds?: any[] | null;
  label?: any;
  technicalName?: string;
  filterField?: { [key: string]: string };
  filterLabel?: { [key: string]: string };
  versions?: any;
  versionHeaderText?: any;
  versionIndex?: number;
  portalItemID?: string | null;
}

interface Attributes {
  [key: string]: any;
  geostoreId?: string;
}

export interface FeatureResult {
  objectid: number;
  attributes: Attributes;
  geometry: __esri.Geometry;
}

export interface FieldName {
  fieldName: string;
  label: string;
}

export interface LayerFeatureResult {
  layerTitle: string;
  layerID: string;
  sublayerTitle?: string;
  sublayerID?: string;
  features: FeatureResult[];
  fieldNames: FieldName[] | null;
}

//Action types
export const MAP_READY = 'MAP_READY';
export const MAP_ERROR = 'MAP_ERROR';
export const USER_SUBSCRIPTIONS = 'USER_SUBSCRIPTIONS';
export const ALL_AVAILABLE_LAYERS = 'ALL_AVAILABLE_LAYERS';
export const SET_ACTIVE_FEATURES = 'SET_ACTIVE_FEATURES';
export const SET_ACTIVE_FEATURE_INDEX = 'SET_ACTIVE_FEATURE_INDEX';
export const SET_ACTIVE_BASEMAP = 'SET_ACTIVE_BASEMAP';
export const SET_TIME_SLIDER = 'SET_TIME_SLIDER';
export const CHANGE_MAP_SCALE = 'CHANGE_MAP_SCALE';
export const CHANGE_MAP_CENTER_COORDINATES = 'CHANGE_MAP_CENTER_COORDINATES';
export const SET_LAYERS_LOADING = 'SET_LAYERS_LOADING';
export const SET_USER_COORDINATES = 'SET_USER_COORDINATES';

interface SetUserPoint {
  type: typeof SET_USER_COORDINATES;
  payload: __esri.Point | undefined;
}
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

interface SetTimeSlider {
  type: typeof SET_TIME_SLIDER;
  payload: MapviewState['timeSlider'];
}

interface ChangeMapScale {
  type: typeof CHANGE_MAP_SCALE;
  payload: MapviewState['scale'];
}

interface ChangeMapCenterCoordinates {
  type: typeof CHANGE_MAP_CENTER_COORDINATES;
  payload: MapviewState['mapCenterCoordinates'];
}

interface SetLayersLoading {
  type: typeof SET_LAYERS_LOADING;
  payload: MapviewState['layersLoading'];
}

export type MapviewStateTypes =
  | MapIsReadyAction
  | MapErrorAction
  | SetUserSubscriptionsAction
  | AllAvailableLayersAction
  | SetActiveFeaturesAction
  | SetActiveFeatureIndex
  | SetSelectedAction
  | SetTimeSlider
  | ChangeMapScale
  | ChangeMapCenterCoordinates
  | SetLayersLoading
  | SetUserPoint;
