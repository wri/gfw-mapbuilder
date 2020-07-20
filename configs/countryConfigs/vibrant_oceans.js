export default {
  webmap: '8189599625d44c219e6b7a060a048dc2',
  title: 'Vibrant Oceans',
  subtitle: 'Exploring Coral Reef Conservation Priorities',
  logoUrl:
    'https://programs.wcs.org/Desktopmodules/WCSVega/WCSMapBuilder/wcslogo.png',
  logoLinkUrl: 'https://programs.wcs.org/vibrantoceans/',
  aboutLinkUrl: '',
  downloadLinkUrl: '',
  printServiceUrl:
    'https://gis.forest-atlas.org/server/rest/services/print/ExportWebMap/GPServer/Export%20Web%20Map',
  maskServiceUrl: '',
  mapThemeIds: '',
  mapThemes: '',
  narrative: '',
  includeSubscribeButton: false,
  includeMyGFWLogin: false,
  navLinksInNewTab: false,
  hideHeader: false,
  hideFooter: false,
  language: 'en',
  useAlternativeLanguage: true,
  alternativeWebmap: '',
  alternativeLanguage: 'fr',
  alternativeLanguageTitle: '',
  alternativeLanguageSubtitle: '',
  alternativeMapThemes: '',
  alternativeNarrative: '',
  alternativeWebmapMenuName: '',
  includeDocumentsTab: false,
  documentsDirectory: '',
  documentsMapserver: '',
  iso: '',
  initialExtent: {
    x: '',
    y: '',
    z: ''
  },
  loadGoogleAnalyticsScript: false,
  analysisModules: [
    {
      analysisId:
        'WCS_OceansPopulationWithin5km_WCSBarChart1DropDown_[TabID]_[PortalID]_[Locale]___',
      label: {
        en: 'Oceans: Population Within 5km'
      },
      title: {
        en: 'Oceans: Population Within 5km'
      },
      description: {
        en: 'Click below to run the analysis for Population Within 5km'
      },
      useGfwWidget: true,
      widgetId: '684e5f08-d657-41c8-aa1d-0b87f3bec079',
      uiParams: 'none'
    }
  ],
  layerPanel: {
    GROUP_WEBMAP: {
      order: 1,
      label: {
        en: 'WCS Layers'
      },
      layers: []
    },
    GROUP_Range: {
      groupType: 'default',
      order: 2,
      label: {
        en: 'Species Data'
      },
      layers: []
    },
    GROUP_Other: {
      order: 3,
      label: {
        en: 'Other'
      },
      layers: []
    },
    GROUP_BASEMAP: {
      groupType: 'basemap',
      order: 4,
      label: {
        en: 'Basemap',
        fr: 'Basemap',
        es: 'Basemap',
        pt: 'Basemap',
        id: 'Basemap',
        zh: 'Basemap',
        ka: '?????? ????'
      },
      layers: []
    },
    extraLayers: []
  }
};
