export default {
  webmap: '59d095320ef441cda669798d98424a04',
  title: 'Amazon Waters',
  subtitle: 'Our Impact Across the Amazon Basin',
  logoUrl:
    'https://programs.wcs.org/Desktopmodules/WCSVega/WCSMapBuilder/wcslogo.png',
  logoLinkUrl: 'https://www.wcs.org',
  aboutLinkUrl: '',
  downloadLinkUrl: '',
  printServiceUrl:
    'https://gis.forest-atlas.org/server/rest/services/print/ExportWebMap/GPServer/Export%20Web%20Map',
  maskServiceUrl: '',
  mapThemeIds: '',
  mapThemes: '',
  narrative: '',
  useWebmapBasemap: true,
  includeSubscribeButton: false,
  includeMyGFWLogin: false,
  navLinksInNewTab: false,
  hideHeader: false,
  hideFooter: false,
  language: 'en',
  useAlternativeLanguage: true,
  alternativeWebmap: '',
  alternativeLanguage: 'es',
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
    z: '4'
  },
  loadGoogleAnalyticsScript: false,
  analysisModules: [
    {
      analysisId:
        'WCS_AmazonWatersAverageFishingDistance_WCSBarChart1DropDown_[TabID]_[PortalID]_[Locale]___',
      label: {
        en: 'Amazon Waters: Average Fishing Distances'
      },
      title: {
        en: 'Amazon Waters: Average Fishing Distances'
      },
      description: {
        en:
          'Click below to run the analysis for Amazon Waters: Average Fishing Distances'
      },
      useGfwWidget: true,
      widgetId: 'c746e150-892a-4b27-bc2c-dd49c7a1ad40',
      uiParams: 'none'
    },
    {
      analysisId:
        'WCS_AmazonWatersAverageFishingDuration_WCSBarChart1DropDown_[TabID]_[PortalID]_[Locale]___',
      label: {
        en: 'Amazon Waters: Average Fishing Durations'
      },
      title: {
        en: 'Amazon Waters: Average Fishing Durations'
      },
      description: {
        en:
          'Click below to run the analysis for Amazon Waters: Average Fishing Durations'
      },
      useGfwWidget: true,
      widgetId: '91292286-6dbf-48a8-a600-56e2b4513a72',
      uiParams: 'none'
    },
    {
      analysisId:
        'WCS_AmazonWatersAverageNumOfFishers_WCSBarChart1Value_[TabID]_[PortalID]_[Locale]___',
      label: {
        en: 'Amazon Waters: Average Num Of Fishers'
      },
      title: {
        en: 'Amazon Waters: Average Num Of Fishers'
      },
      description: {
        en:
          'Click below to run the analysis for Amazon Waters: Average Num Of Fishers'
      },
      useGfwWidget: true,
      widgetId: '684e5f08-d657-41c8-aa1d-0b87f3bec079',
      uiParams: 'none',
      featureDataFieldsToPass: ['polygonname', 'analysisId']
    },
    {
      analysisId:
        'WCS_AmazonWatersTotalNumberOfFish_WCSBarChart1DropDown_[TabID]_[PortalID]_[Locale]___',
      label: {
        en: 'Amazon Waters: Total Number Of Fishes'
      },
      title: {
        en: 'Amazon Waters: Total Number Of Fishes'
      },
      description: {
        en:
          'Click below to run the analysis for Amazon Waters: Total Number Of Fishes'
      },
      useGfwWidget: true,
      widgetId: '53a2ad48-46c2-41b0-9a72-8d6ef34131c9',
      uiParams: 'none'
    },
    {
      analysisId:
        'WCS_AmazonWatersTotalNumberOfPhotos_WCSBarChart1DropDown_[TabID]_[PortalID]_[Locale]___',
      label: {
        en: 'Amazon Waters: Total Number Of Photos'
      },
      title: {
        en: 'Amazon Waters: Total Number Of Photos'
      },
      description: {
        en:
          'Click below to run the analysis for Amazon Waters: Total Number Of Photos'
      },
      useGfwWidget: true,
      widgetId: 'c682ae57-8918-48e6-8f43-164c43c07811',
      uiParams: 'none'
    },
    {
      analysisId:
        'WCS_AmazonWatersTotalWeight_WCSBarChart1DropDown_[TabID]_[PortalID]_[Locale]___',
      label: {
        en: 'Amazon Waters: Total Weights'
      },
      title: {
        en: 'Amazon Waters: Total Weights'
      },
      description: {
        en: 'Click below to run the analysis for Amazon Waters: Total Weights'
      },
      useGfwWidget: true,
      widgetId: '00629c5f-8d51-4373-86da-53222d36bac0',
      uiParams: 'none'
    },
    {
      analysisId:
        'WCS_AmazonWatersTotalPrice_WCSBarChart1DropDown_[TabID]_[PortalID]_[Locale]___',
      label: {
        en: 'Amazon Waters: Total Prices'
      },
      title: {
        en: 'Amazon Waters: Total Prices'
      },
      description: {
        en: 'Click below to run the analysis for Amazon Waters: Total Prices'
      },
      useGfwWidget: true,
      widgetId: '6a6158bd-02a8-4053-9e4e-b8fb10777ea0',
      uiParams: 'none'
    }
  ],
  layerPanel: {
    GROUP_LC: {
      groupType: 'default',
      order: 1,
      label: {
        en: 'Land Cover',
        fr: 'Couverture des sols',
        es: 'Cobertura terrestre',
        pt: 'Cobertura do Solo',
        id: 'Land Cover',
        zh: '????',
        ka: '????? ??????'
      },
      layers: []
    },
    GROUP_WEBMAP: {
      order: 2,
      label: {
        en: 'WCS Layers'
      },
      layers: []
    },
    GROUP_BASEMAP: {
      groupType: 'basemap',
      order: 3,
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
