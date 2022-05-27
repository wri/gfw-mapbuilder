export interface AppSettings {
  webmap?: string;
  webmapMenuName?: string;
  alternativeWebmapMenuName?: string;
  title: string;
  subtitle?: string;
  logoUrl?: string;
  logoLinkUrl?: string;
  analyticsCode: string;
  language: string;
  includeDocumentsTab?: boolean;
  layerPanel: LayerGroup;
  useAlternativeLanguage: boolean;
  alternativeWebmap: string;
  includeMyGFWLogin: boolean;
  alternativeLanguage: string;
  printServiceUrl?: string;
  narrative: string;
  alternativeNarrative: string;
  alternativeLanguageTitle: string;
  alternativeLanguageSubtitle: string;
  iso: string;
  hideFooter?: boolean;
  enabledRWLayers?: string[];
  disabledAnalysisModules?:
    | ['VIIRS_FIRES', 'GLAD_ALERTS', 'TC_LOSS', 'IFL', 'LCC', 'TC_LOSS_TOTAL', 'TC_GAIN_TOTAL', 'GFW_INTEGRATED_ALERTS']
    | [];
  hideHeader?: boolean;
  hideLegend?: boolean;
  navLinksInNewTab?: boolean;
  recentImagery?: boolean;
  sharinghost: string;
  mapThemes: string;
  mapThemeIds: string;
  alternativeMapThemes: string;
  initialExtent?: {
    x: number | string;
    y: number | string;
    z: number | string;
  };
  gladAlertDates?: {
    startDate: string;
    endDate: string;
  };
  customColorTheme: string;
  aboutLinkUrl?: string;
  downloadLinkUrl?: string;
  footerLinks: FooterLink[];
}

type FooterLink = { label: string; link: string };

type LayerGroupKey = 'GROUP_WEBMAP' | 'GROUP_BASEMAP' | 'GROUP_LC' | 'GROUP_LCD' | 'GROUP_IMAGERY' | 'extraLayers';

type LayerGroup = {
  [key in LayerGroupKey]: LayerGroupInfo;
};

export interface AnalysisModule {
  analysisId:
    | 'VIIRS_FIRES'
    | 'GLAD_ALERTS'
    | 'TC_LOSS'
    | 'IFL'
    | 'LCC'
    | 'TC_LOSS_TOTAL'
    | 'TC_GAIN_TOTAL'
    | 'GFW_INTEGRATED_ALERTS';
  chartType: string;
  label: { [key: string]: string };
  title: {
    [key: string]: string;
  };
  description: {
    [key: string]: string;
  };
  useGfwWidget: boolean;
  widgetId: string;
  analysisParams: AnalysisParam[] | [];
  analysisUrl?: string;
  attributes?: any;
  sqlString: string;
}

export interface AnalysisParam {
  type: 'tcd' | 'rangeSlider' | 'date-picker';
  bounds?: [number, number];
  multi?: boolean;
  label: {
    [key: string]: string;
  };
}

export interface LayerGroupInfo {
  groupType?: string;
  order?: number;
  label?: LabelInfo;
  layers?: LayerInfo[];
  [key: string]: any; //accounting for any wild card key:values coming from outside source
}

interface LabelInfo {
  [key: string]: string;
}

interface LayerInfo {
  id?: string;
  uuid?: string;
  templateUrl?: string;
  thumbnailUrl?: string;
  title?: { [key: string]: string };
  years?: string[];
  [key: string]: any;
}

//Action names available
export const OVERWRITE_SETTINGS = 'OVERWRITE_SETTINGS';
export const OVERWRITE_COLOR_THEME = 'OVERWRITE_COLOR_THEME';
export const SET_HIDE_LEGEND = 'SET_HIDE_LEGEND';

interface OverwriteSettingsAction {
  type: typeof OVERWRITE_SETTINGS;
  payload: AppSettings;
}

interface OverwriteColorThemeAction {
  type: typeof OVERWRITE_COLOR_THEME;
  payload: string;
}

interface SetHideLegendAction {
  type: typeof SET_HIDE_LEGEND;
  payload: boolean;
}

export type AppSettingsTypes = OverwriteSettingsAction | OverwriteColorThemeAction | SetHideLegendAction;
