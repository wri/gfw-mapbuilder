import { AppSettings, AppSettingsTypes, OVERWRITE_SETTINGS } from './types';

const initialState: AppSettings = {
  webmap: '512eef95997b4e7486cdbdc45078739d',
  title: 'GFW Mapbuilder',
  subtitle: 'Make maps that matter',
  logoUrl: 'https://my.gfw-mapbuilder.org/img/gfw-logo.png',
  logoLinkUrl: 'https://developers.globalforestwatch.org/map-builder/',
  useAlternativeLanguage: false,
  alternativeWebmap: '',
  alternativeLanguage: 'fr',
  includeMyGFWLogin: true,
  printServiceUrl:
    'https://gis.forest-atlas.org/server/rest/services/print/ExportWebMap/GPServer/Export%20Web%20Map',
  language: 'en',
  layerPanel: {
    GROUP_WEBMAP: {},
    GROUP_BASEMAP: {},
    GROUP_LC: {},
    GROUP_LCD: {},
    GROUP_IMAGERY: {},
    extraLayers: {}
  },
  narrative: '',
  alternativeNarrative: '',
  analysisModules: [
    {
      analysisId: '',
      label: {
        en: ''
      },
      title: {
        en: ''
      },
      description: {
        en: ''
      },
      useGfwWidget: false,
      chartType: '',
      uiParams: [],
      widgetId: '',
      params: []
    }
  ]
};

export function appSettingsReducer(
  state = initialState,
  action: AppSettingsTypes
): AppSettings {
  switch (action.type) {
    case OVERWRITE_SETTINGS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
