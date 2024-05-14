import { LayerFeatureResult } from '../mapview/types';

export type TreeMosaicLayerTypes = 'meter' | 'hectare';

export interface LeftPanel {
  tabViewVisible: boolean;
  activeTab: string;
  openLayerGroup: string;
  density: 1 | 2 | 3 | 4 | 5 | 6 | 7 | number; //careful about introducing any more density numbers, AG_BIOMASS layer depends on those to render and update
  analysisDateRange: string[];
  analysisYearRange: number[];
  gladConfirmed: boolean;
  highConfidenceConfirmed: boolean;
  geographicCoverage: boolean;
  gladStart: string;
  gladEnd: string;
  treeCoverLossStart: number;
  treeCoverLossEnd: number;
  glad2Start: string;
  glad2End: string;
  raddAlertStart: string;
  raddAlertEnd: string;
  gfwIntegratedStart: string;
  gfwIntegratedEnd: string;
  modisStart: string;
  modisEnd: string;
  viirsStart: string;
  viirsEnd: string;
  treeHeight: number;
  integratedAlertLayer: 'GLAD_ALERTS' | 'GFW_INTEGRATED_ALERTS' | 'GLAD_S2_ALERTS' | 'RADD_ALERTS' | string;
  gfwLayerLabel: string;
  gfwLayerSubtitle: string;
  windSpeedPotential: number;
  versionedLayer: {
    [key: string]: string;
  };

  treeMosaicHectaresValue: number;
  activeTreeMosaicLayer: TreeMosaicLayerTypes;
  prodesLayer: 'Cerrado' | 'Amazon' | string;
}

interface SpecificAreaResults {
  area?: string;
  perimeter?: string;
}

interface SpecificDistanceResults {
  length?: string;
}

export interface MeasureContent {
  activeButton?: string;
  areaResults?: SpecificAreaResults;
  distanceResults?: SpecificDistanceResults;
  coordinateMouseClickResults?: any; // ClickResults | undefined | Point;
  coordinatePointerMoveResults?: any; // ClickResults | undefined | Point;
}

interface SelectedSearchWidgetLayer {
  displayField: string;
  layerTitle: string;
}

export interface AppState {
  leftPanel: LeftPanel;
  renderModal: string;
  renderGFWDropdown: boolean;
  infoModalLayerID: string;
  selectedLanguage: string;
  measureContent: MeasureContent;
  hideWidgetActive: boolean;
  isLoggedIn: boolean;
  isProfileComplete: boolean;
  selectedSearchWidgetLayer: SelectedSearchWidgetLayer;
  renderPopup: boolean;
  areaImages: string[];
  multiPolygonSelectionMode: boolean;
  activeMultiInput: number;
  analysisFeatureList: any[] | LayerFeatureResult[];
  imageObject: any;
  landCoverYearRange: number[];
  landCoverYearValue: number[];
}

//Action names available
export const RENDER_MODAL = 'RENDER_MODAL';
export const RENDER_INFO_MODAL = 'RENDER_INFO_MODAL';
export const RENDER_GFW_DROPDOWN = 'RENDER_GFW_DROPDOWN';
export const SELECT_ACTIVE_TAB = 'SELECT_ACTIVE_TAB';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const TOGGLE_TABVIEW_PANEL = 'TOGGLE_TABVIEW_PANEL';
export const SET_OPEN_LAYER_GROUP = 'SET_OPEN_LAYER_GROUP';
export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const SET_IS_PROFILE_COMPLETE = 'SET_IS_PROFILE_COMPLETE';
export const SET_MEASURE_RESULTS = 'SET_MEASURE_RESULTS';
export const SET_ACTIVE_MEASURE_BUTTON = 'SET_ACTIVE_MEASURE_BUTTON';
export const SET_HIDE_WIDGET = 'SET_HIDE_WIDGET';
export const SET_CANOPY_DENSITY = 'SET_CANOPY_DENSITY';
export const SET_ANALYSIS_DATE = 'SET_ANALYSIS_DATE';
export const SET_ANALYSIS_YEAR_RANGE = 'SET_ANALYSIS_YEAR_RANGE';
export const SET_SELECTED_SEARCH_WIDGET_LAYER = 'SET_SELECTED_SEARCH_WIDGET_LAYER';
export const SET_GLAD_CONFIRMED = 'SET_GLAD_CONFIRMED';
export const SET_HIGH_CONFIDENCE_CONFIRMED = 'SET_HIGH_CONFIDENCE_CONFIRMED';
export const SET_GEOGRAPHIC_COVERAGE = 'SET_GEOGRAPHIC_COVERAGE';
export const SET_GLAD_START = 'SET_GLAD_START';
export const SET_GLAD_END = 'SET_GLAD_END';
export const SET_TREE_COVER_LOSS_START = 'SET_TREE_COVER_LOSS_START';
export const SET_TREE_COVER_LOSS_END = 'SET_TREE_COVER_LOSS_END';
export const SET_GLAD_2_START = 'SET_GLAD_2_START';
export const SET_GLAD_2_END = 'SET_GLAD_2_END';
export const SET_RADD_ALERT_START = 'SET_RADD_ALERT_START';
export const SET_RADD_ALERT_END = 'SET_RADD_ALERT_END';
export const SET_GFW_INTEGRATED_START = 'SET_GFW_INTEGRATED_START';
export const SET_GFW_INTEGRATED_END = 'SET_GFW_INTEGRATED_END';
export const SET_VIIRS_START = 'SET_VIIRS_START';
export const SET_VIIRS_END = 'SET_VIIRS_END';
export const SET_MODIS_START = 'SET_MODIS_START';
export const SET_MODIS_END = 'SET_MODIS_END';
export const SET_RENDER_POPUP = 'SET_RENDER_POPUP';
export const SET_AREA_IMAGES = 'SET_AREA_IMAGES';
export const SET_VERSIONED_LAYER = 'SET_VERSIONED_LAYER';
export const SET_TREE_HEIGHT = 'SET_TREE_HEIGHT';
export const SET_GFW_LAYER = 'SET_GFW_LAYER';
export const SET_GFW_LAYER_LABEL = 'SET_GFW_LAYER_LABEL';
export const SET_GFW_LAYER_SUBTITLE = 'SET_GFW_LAYER_SUBTITLE';
export const SET_IMAGE_OBJECT = 'SET_IMAGE_OBJECT';
export const SET_WIND_SPEED_POTENTIAL = 'SET_WIND_SPEED_POTENTIAL';
export const SET_MULTI_POLYGON_SELECTION_MODE = 'SET_MULTI_POLYGON_SELECTION_MODE';
export const SET_TREE_MOSAIC_HECTARES_VALUE = 'SET_TREE_MOSAIC_HECTARES_VALUE';
export const SET_ACTIVE_TREE_MOSAIC_LAYER = 'SET_ACTIVE_TREE_MOSAIC_LAYER';
export const SET_ACTIVE_MULTI_INPUT = 'SET_ACTIVE_MULTI_INPUT';
export const SET_ANALYSIS_FEATURE_LIST = 'SET_ANALYSIS_FEATURE_LIST';

export const SET_LAND_COVER_YEAR_RANGE = 'SET_LAND_COVER_YEAR_RANGE';
export const SET_LAND_COVER_YEAR_VALUE = 'SET_LAND_COVER_YEAR_VALUE';
export const SET_PRODES_LAYER = 'SET_PRODES_LAYER';

interface SetSelectedSearchWidgetLayer {
  type: typeof SET_SELECTED_SEARCH_WIDGET_LAYER;
  payload: AppState['selectedSearchWidgetLayer'];
}

interface SetOpenLayerGroup {
  type: typeof SET_OPEN_LAYER_GROUP;
  payload: LeftPanel['openLayerGroup'];
}

interface ToggleTabviewPanelAction {
  type: typeof TOGGLE_TABVIEW_PANEL;
  payload: LeftPanel['tabViewVisible'];
}

interface SetCanopyDensity {
  type: typeof SET_CANOPY_DENSITY;
  payload: LeftPanel['density'];
}

interface SetHideWidget {
  type: typeof SET_HIDE_WIDGET;
  payload: AppState['hideWidgetActive'];
}

interface RenderModalAction {
  type: typeof RENDER_MODAL;
  payload: AppState['renderModal'];
}

interface RenderInfoModalAction {
  type: typeof RENDER_INFO_MODAL;
  payload: AppState['infoModalLayerID'];
}

interface RenderGFWDropdownAction {
  type: typeof RENDER_GFW_DROPDOWN;
  payload: AppState['renderGFWDropdown'];
}

interface SetLoggedIn {
  type: typeof SET_LOGGED_IN;
  payload: AppState['isLoggedIn'];
}

interface SetIsProfileComplete {
  type: typeof SET_IS_PROFILE_COMPLETE;
  payload: AppState['isProfileComplete'];
}

interface SelectActiveTab {
  type: typeof SELECT_ACTIVE_TAB;
  payload: LeftPanel['activeTab'];
}

interface SetLanguageAction {
  type: typeof SET_LANGUAGE;
  payload: AppState['selectedLanguage'];
}

interface SetMeasureResults {
  type: typeof SET_MEASURE_RESULTS;
  payload: AppState['measureContent'];
}

interface SetActiveMeasureButton {
  type: typeof SET_ACTIVE_MEASURE_BUTTON;
  payload: AppState['measureContent']['activeButton'];
}

interface SetAnalysisDate {
  type: typeof SET_ANALYSIS_DATE;
  payload: AppState['leftPanel']['analysisDateRange'];
}

interface SetAnalysisYearRange {
  type: typeof SET_ANALYSIS_YEAR_RANGE;
  payload: AppState['leftPanel']['analysisYearRange'];
}

interface SetGladConfirmed {
  type: typeof SET_GLAD_CONFIRMED;
  payload: AppState['leftPanel']['gladConfirmed'];
}
interface SetHighConfidenceConfirmed {
  type: typeof SET_HIGH_CONFIDENCE_CONFIRMED;
  payload: AppState['leftPanel']['highConfidenceConfirmed'];
}
interface SetGeographicCoverage {
  type: typeof SET_GEOGRAPHIC_COVERAGE;
  payload: AppState['leftPanel']['geographicCoverage'];
}
interface SetGladStart {
  type: typeof SET_GLAD_START;
  payload: AppState['leftPanel']['gladStart'];
}

interface SetGladEnd {
  type: typeof SET_GLAD_END;
  payload: AppState['leftPanel']['gladEnd'];
}

interface SetGlad2Start {
  type: typeof SET_GLAD_2_START;
  payload: AppState['leftPanel']['glad2Start'];
}

interface SetTreeCoverLossStart {
  type: typeof SET_TREE_COVER_LOSS_START;
  payload: AppState['leftPanel']['treeCoverLossStart'];
}

interface SetTreeCoverLossEnd {
  type: typeof SET_TREE_COVER_LOSS_END;
  payload: AppState['leftPanel']['treeCoverLossEnd'];
}

interface SetGladEnd2 {
  type: typeof SET_GLAD_2_END;
  payload: AppState['leftPanel']['glad2End'];
}
interface SetRaddAlertStart {
  type: typeof SET_RADD_ALERT_START;
  payload: AppState['leftPanel']['raddAlertStart'];
}
interface SetRaddAlertEnd {
  type: typeof SET_RADD_ALERT_END;
  payload: AppState['leftPanel']['raddAlertEnd'];
}

interface SetGfwIntegratedStart {
  type: typeof SET_GFW_INTEGRATED_START;
  payload: AppState['leftPanel']['gfwIntegratedStart'];
}

interface SetGfwIntegratedEnd {
  type: typeof SET_GFW_INTEGRATED_END;
  payload: AppState['leftPanel']['gfwIntegratedEnd'];
}

interface SetModisStart {
  type: typeof SET_MODIS_START;
  payload: AppState['leftPanel']['modisStart'];
}

interface SetModisEnd {
  type: typeof SET_MODIS_END;
  payload: AppState['leftPanel']['modisEnd'];
}

interface SetViirsStart {
  type: typeof SET_VIIRS_START;
  payload: AppState['leftPanel']['viirsStart'];
}

interface SetViirsEnd {
  type: typeof SET_VIIRS_END;
  payload: AppState['leftPanel']['viirsEnd'];
}

interface SetTreeHeight {
  type: typeof SET_TREE_HEIGHT;
  payload: AppState['leftPanel']['treeHeight'];
}

interface SetGFWLayer {
  type: typeof SET_GFW_LAYER;
  payload: AppState['leftPanel']['integratedAlertLayer'];
}

interface SetGFWLayerLabel {
  type: typeof SET_GFW_LAYER_LABEL;
  payload: AppState['leftPanel']['gfwLayerLabel'];
}

interface SetGFWLayerSubtitle {
  type: typeof SET_GFW_LAYER_SUBTITLE;
  payload: AppState['leftPanel']['gfwLayerSubtitle'];
}

interface SetWindSpeedPotential {
  type: typeof SET_WIND_SPEED_POTENTIAL;
  payload: AppState['leftPanel']['windSpeedPotential'];
}

interface SetProdesLayer {
  type: typeof SET_PRODES_LAYER;
  payload: AppState['leftPanel']['prodesLayer'];
}

interface SetRenderPopup {
  type: typeof SET_RENDER_POPUP;
  payload: AppState['renderPopup'];
}

interface SetAreaImages {
  type: typeof SET_AREA_IMAGES;
  payload: string;
}

interface SetVersionedLayer {
  type: typeof SET_VERSIONED_LAYER;
  payload: any;
}

interface SetImageObject {
  type: typeof SET_IMAGE_OBJECT;
  payload: any;
}

interface SetMultiPolygonSelectionMode {
  type: typeof SET_MULTI_POLYGON_SELECTION_MODE;
  payload: boolean;
}

interface SetActiveMultiInput {
  type: typeof SET_ACTIVE_MULTI_INPUT;
  payload: number;
}

interface SetAnalysisFeatureList {
  type: typeof SET_ANALYSIS_FEATURE_LIST;
  payload: any;
}

interface SetLandCoverYearValue {
  type: typeof SET_LAND_COVER_YEAR_VALUE;
  payload: number[];
}

interface SetTreeMosaicHectaresValue {
  type: typeof SET_TREE_MOSAIC_HECTARES_VALUE;
  payload: number;
}

interface SetActiveTreeMosaicLayer {
  type: typeof SET_ACTIVE_TREE_MOSAIC_LAYER;
  payload: TreeMosaicLayerTypes;
}

export type AppStateTypes =
  | ToggleTabviewPanelAction
  | RenderModalAction
  | RenderInfoModalAction
  | RenderGFWDropdownAction
  | SelectActiveTab
  | SetLanguageAction
  | SetOpenLayerGroup
  | SetLoggedIn
  | SetIsProfileComplete
  | SetMeasureResults
  | SetActiveMeasureButton
  | SetHideWidget
  | SetCanopyDensity
  | SetAnalysisDate
  | SetAnalysisYearRange
  | SetSelectedSearchWidgetLayer
  | SetGladConfirmed
  | SetHighConfidenceConfirmed
  | SetGeographicCoverage
  | SetGladStart
  | SetGladEnd
  | SetGlad2Start
  | SetGladEnd2
  | SetTreeCoverLossStart
  | SetTreeCoverLossEnd
  | SetRaddAlertStart
  | SetRaddAlertEnd
  | SetGfwIntegratedStart
  | SetGfwIntegratedEnd
  | SetModisStart
  | SetModisEnd
  | SetViirsStart
  | SetViirsEnd
  | SetRenderPopup
  | SetAreaImages
  | SetVersionedLayer
  | SetTreeHeight
  | SetGFWLayer
  | SetGFWLayerLabel
  | SetGFWLayerSubtitle
  | SetImageObject
  | SetWindSpeedPotential
  | SetMultiPolygonSelectionMode
  | SetActiveMultiInput
  | SetAnalysisFeatureList
  | SetLandCoverYearValue
  | SetTreeMosaicHectaresValue
  | SetActiveTreeMosaicLayer
  | SetProdesLayer;
