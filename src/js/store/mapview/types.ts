import { Attachment } from '../../types/Attachment';

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

export interface MapviewState {
  isMapReady: boolean;
  loadError: boolean;
  allAvailableLayers: LayerProps[];
  activeFeatures: LayerFeatureResult[];
  activeFeatureIndex: number[];
  activeBasemap: string; // * NEW! not in resources.js
  timeSlider: number[];
  scale: number;
  mapCenterCoordinates: { latitude: number; longitude: number };
  layersLoading: boolean;
  userCoordinates: __esri.Point | undefined;
  documents: null | Attachment[];
  selectedBasedMapInfo: null | any;
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

export type LayerTypes =
  | __esri.BaseTileLayer
  | __esri.GraphicsLayer
  | __esri.MapImageLayer
  | __esri.TileLayer
  | __esri.Sublayer
  | __esri.FeatureLayer;

export interface LayerProps {
  id: string;
  visible: boolean;
  title?: string;
  order?: number;
  opacity: {
    combined: number;
    fill: number;
    outline: number;
  };
  fillOpacity?: number;
  outlineOpacity?: number;
  definitionExpression?: string;
  group: string;
  type: string;
  origin: LayerOrigin;
  url: string;
  isMetadataError?: boolean;
  metadata?: any | { legendConfig?: LegendConfig };
  legendInfo?: any;
  maxScale?: number;
  minScale?: number;
  sublayer?: boolean;
  parentID?: string;
  popup?: any | null;
  sublabel?: object;
  layerIds?: any[] | null;
  layerName?: string;
  layer?: string;
  label?: any;
  technicalName?: string;
  filterField?: { [key: string]: string };
  filterLabel?: { [key: string]: string };
  versions?: any;
  versionHeaderText?: any;
  versionIndex?: number;
  portalItemID?: string | null;
  thumbnailUrl?: string;
  apiKey?: string;
  dashboardURL?: string | null;
  searchField?: string;
  isError?: boolean;
}

interface Attributes {
  [key: string]: any;
  geostoreId?: string;
}

export interface FeatureResult {
  objectid: number;
  attributes: Attributes;
  geometry: __esri.Geometry;
  layer?: any;
  type?: string;
}

export interface FieldName {
  fieldName: string;
  label: string;
}

export interface LayerFeatureResult {
  layerTitle: string;
  layerID: string;
  featureID?: string;
  sublayerTitle?: string;
  sublayerID?: string;
  features: FeatureResult[];
  fieldNames: FieldName[] | null;
  displayField?: string;
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
export const SET_DOCUMENTS = 'SET_DOCUMENTS';
export const SET_SELECTED_BASEMAP_INFO = 'SET_SELECTED_BASEMAP_INFO';

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

interface SetDocuments {
  type: typeof SET_DOCUMENTS;
  payload: MapviewState['documents'];
}

interface SetSelectedBasemapInfo {
  type: typeof SET_SELECTED_BASEMAP_INFO;
  payload: MapviewState['selectedBasedMapInfo'];
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
  | AllAvailableLayersAction
  | SetActiveFeaturesAction
  | SetActiveFeatureIndex
  | SetSelectedAction
  | SetTimeSlider
  | ChangeMapScale
  | ChangeMapCenterCoordinates
  | SetLayersLoading
  | SetUserPoint
  | SetDocuments
  | SetSelectedBasemapInfo;
