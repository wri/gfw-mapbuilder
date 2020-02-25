export interface AppSettings {
  webmap?: string;
  title: string;
  subtitle?: string;
  logoUrl?: string;
  logoLinkUrl?: string;
  language: string;
  includeDocumentsTab?: boolean;
  layerPanel: LayerGroup;
  useAlternativeLanguage: boolean;
  alternativeWebmap: string;
  alternativeLanguage: string;
  printServiceUrl?: string;
  narrative: string;
  alternativeNarrative: string;
  analysisModules: AnalysisModule[];
}

type LayerGroupKey =
  | 'GROUP_WEBMAP'
  | 'GROUP_BASEMAP'
  | 'GROUP_LC'
  | 'GROUP_LCD'
  | 'GROUP_IMAGERY'
  | 'extraLayers';

type LayerGroup = {
  [key in LayerGroupKey]: LayerGroupInfo;
};

interface AnalysisModule {
  analysisId: string;
  label: {
    en: string;
  };
  title: {
    en: string;
  };
  useGfwWidget: boolean;
  widgetId: string;
  uiParams: object[];
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

interface OverwriteSettingsAction {
  type: typeof OVERWRITE_SETTINGS;
  payload: AppSettings;
}

export type AppSettingsTypes = OverwriteSettingsAction;
