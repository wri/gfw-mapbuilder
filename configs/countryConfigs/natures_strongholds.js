export default {
  webmap: '7b64776e2f8b4280a806b7b46ccddc78',
  title: 'Natures Strongholds Impact Platform',
  subtitle: 'Demonstrating Our Global Impact',
  logoUrl: 'https://programs.wcs.org/Desktopmodules/WCSMapBuilder/wcslogo.png',
  logoLinkUrl: 'https://www.wcs.org',
  aboutLinkUrl: '',
  downloadLinkUrl: '',
  printServiceUrl:
    'https://gis.forest-atlas.org/server/rest/services/print/ExportWebMap/GPServer/Export Web Map',
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
  useAlternativeLanguage: false,
  alternativeWebmap: '',
  alternativeLanguage: '',
  alternativeLanguageTitle: '',
  alternativeLanguageSubtitle: '',
  alternativeMapThemes: '',
  alternativeNarrative: '',
  alternativeWebmapMenuName: '',
  includeDocumentsTab: false,
  documentsDirectory: 'https://cmr.forest-atlas.org/resources/docs/',
  documentsMapserver:
    'https://gis.forest-atlas.org/server/rest/services/CMR/documents_administratifs/MapServer',
  iso: '',
  activeFires: false,
  initialExtent: {
    x: '',
    y: '',
    z: ''
  },
  viirsFires: true,
  modisFires: true,
  intactForests: true,
  aboveGroundBiomass: true,
  landCover: true,
  mangroves: true,
  sadAlerts: true,
  gladAlerts: true,
  terraIAlerts: true,
  recentImagery: true,
  webmapMenuName: '',
  slopePotentialOptions: '',
  alternativeSlopePotentialOptions: '',
  slopePotentialColors: '',
  slopeClassNames: '',
  slopeClassColors: '',
  treeCoverClassNames: '',
  treeCoverClassColors: '',
  landCoverClassNames: '',
  landCoverClassColors: '',
  populationClassNames: '',
  populationClassColors: '',
  rainfallClassNames: '',
  rainfallClassColors: '',
  alternativeSlopeDescription: '',
  sharinghost: 'https://www.arcgis.com',
  analyticsCode: '',
  userFeatureToken: '',
  analysisModules: [
    {
      analysisId:
        'WCS_SpeciesPopulationTrend_WCSBarChart2DropDown_[TabID]_[PortalID]_[Locale]___',
      label: {
        en: 'Species: Population Trend'
      },
      title: {
        en: 'Species: Population Trend'
      },
      description: {
        en:
          'Population trend analysis based on field surveys and peer reviewed papers'
      },
      useGfwWidget: true,
      widgetId: '53a2ad48-46c2-41b0-9a72-8d6ef34131c9',
      uiParams: 'none',
      featureDataFieldsToPass: ['polygonname'],
      fieldToSubstitute: 'AnnualPopulationTrend'
    },
    {
      analysisId: 'FRAGMENTATION',
      label: {
        en: 'Habitat: Fragmentation Analysis',
        fr: 'Total perte/ gain en couvert arborÃƒÂ©',
        es: 'PÃƒÂ©rdida/ Aumento de la cobertura arbÃƒÂ³rea',
        pt: 'Perda/ Ganho de cobertura arbÃƒÂ³rea',
        id: 'Total tree cover loss/ gain',
        zh:
          'Ã¦Â£Â®Ã¦Å¾â€”Ã¨Â¦â€ Ã§â€ºâ€“Ã¦ÂÅ¸Ã¥Â¤Â±/ Ã¦Â£Â®Ã¦Å¾â€”Ã¨Â¦â€ Ã§â€ºâ€“Ã¥Â¢Å¾Ã¯Â¿Â½ ',
        ka:
          'Ã¡Æ’Â®Ã¡Æ’ËœÃ¡Æ’Â¡ Ã¡Æ’â€¢Ã¡Æ’ÂÃ¯Â¿Â½ Ã¡Æ’Â¯Ã¡Æ’ËœÃ¡Æ’Â¡ Ã¡Æ’â„¢Ã¡Æ’ÂÃ¯Â¿Â½ Ã¡Æ’â€™Ã¡Æ’â€¢Ã¡Æ’Â/ Ã¡Æ’Å“Ã¡Æ’ÂÃ¡Æ’â€ºÃ¡Æ’ÂÃ¡Æ’Â¢Ã¡Æ’Ëœ'
      },
      title: {
        en: 'Fragmentation',
        fr: 'Forest Loss Analysis',
        es: 'Forest Loss Analysis',
        pt: 'Forest Loss Analysis',
        id: 'Forest Loss Analysis',
        zh: 'Forest Loss Analysis',
        ka: 'Forest Loss Analysis'
      },
      description: {
        en:
          'Select a year range click the run analysis button to see net change in the fragmentation for your selected polygons(s)',
        fr:
          'Select range and tree cover density then click the run analysis button to see results',
        es:
          'Select range and tree cover density then click the run analysis button to see results',
        pt:
          'Select range and tree cover density then click the run analysis button to see results',
        id:
          'Select range and tree cover density then click the run analysis button to see results',
        zh:
          'Select range and tree cover density then click the run analysis button to see results',
        ka:
          'Select range and tree cover density then click the run analysis button to see results'
      },
      chartType: 'badge',
      valueAttribute: 'data',
      analysisUrl:
        'https://us-central1-ambell-166721.cloudfunctions.net/wcs-ee-deforestation-debug',
      uiParams: [
        {
          inputType: 'rangeSlider',
          startParamName: 'period',
          combineParams: true,
          valueSeparator: ',',
          bounds: [2001, 2017],
          valueType: 'date',
          label: {
            en: 'Select range for analysis',
            fr: 'Select range for analysis',
            es: 'Select range for analysis',
            pt: 'Select range for analysis',
            id: 'Select range for analysis',
            zh: 'Select range for analysis',
            ka: 'Select range for analysis'
          }
        }
      ]
    },
    {
      analysisId: 'TC_LOSS_GAIN',
      label: {
        en: 'Total tree cover loss/ gain',
        fr: 'Total perte/ gain en couvert arborÃ©',
        es: 'PÃ©rdida/ Aumento de la cobertura arbÃ³rea',
        pt: 'Perda/ Ganho de cobertura arbÃ³rea',
        id: 'Total tree cover loss/ gain',
        zh: 'æ£®æž—è¦†ç›–æ¿Ÿå¤±/ æ£®æž—è¦†ç›–å¢žåŠ ',
        ka:
          'áƒ®áƒ˜áƒ¡ áƒ•áƒ¿áƒ áƒ¯áƒ˜áƒ¡ áƒ™áƒ¿áƒ áƒ’áƒ•áƒ¿/ áƒœáƒ¿áƒ›áƒ¿áƒ¢áƒ˜'
      },
      title: {
        en: 'Forest Loss Analysis',
        fr: 'Forest Loss Analysis',
        es: 'Forest Loss Analysis',
        pt: 'Forest Loss Analysis',
        id: 'Forest Loss Analysis',
        zh: 'Forest Loss Analysis',
        ka: 'Forest Loss Analysis'
      },
      description: {
        en:
          'Select range and tree cover density then click the run analysis button to see results',
        fr:
          'Select range and tree cover density then click the run analysis button to see results',
        es:
          'Select range and tree cover density then click the run analysis button to see results',
        pt:
          'Select range and tree cover density then click the run analysis button to see results',
        id:
          'Select range and tree cover density then click the run analysis button to see results',
        zh:
          'Select range and tree cover density then click the run analysis button to see results',
        ka:
          'Select range and tree cover density then click the run analysis button to see results'
      },
      useGfwWidget: true,
      widgetId: 'e6c01eff-0d79-4865-a431-65d6adb89589',
      uiParams: [
        {
          inputType: 'rangeSlider',
          startParamName: 'period',
          combineParams: true,
          valueSeparator: ',',
          bounds: [2001, 2018],
          valueType: 'date',
          label: {
            en: 'Select range for analysis',
            fr: 'Sélectionner une plage pour l’analyse:',
            es: 'Seleccione un rango para el análisis:',
            pt: 'Selecione o período para análise:',
            id: 'Pilih rentang untuk analisis:',
            zh: '选择分枿范围:',
            ka: 'სჿზღვრების შერჩევჿ ჿნჿლიზისთვის:'
          }
        },
        {
          name: 'thresh',
          inputType: 'tcd',
          label: {
            en: 'Select tree cover density: ',
            fr: 'Sélectionner la densité de couverture arborée: ',
            es: 'Seleccione la densidad de la cobertura arbórea: ',
            pt: 'Selecione a densidade de cobertura arbórea: ',
            id: 'Pilih kerapatan tutupan pohon: ',
            zh: '选择森林覆盖密度: ',
            ka: 'ხის ვჿრჯის სიხშირის შერჩევჿ: '
          }
        }
      ]
    },
    {
      analysisId: 'TC_LOSS',
      label: {
        en: 'Tree cover loss',
        fr: 'Perte en couvert arborÃƒÂ©',
        es: 'PÃƒÂ©rdida de la cobertura arbÃƒÂ³rea',
        pt: 'Perda de cobertura arbÃƒÂ³rea',
        id: 'Tree cover loss',
        zh: 'Ã¦Â£Â®Ã¦Å¾â€”Ã¨Â¦â€ Ã§â€ºâ€“Ã¦ÂÅ¸Ã¥Â¤Â±',
        ka:
          'Ã¡Æ’Â®Ã¡Æ’ËœÃ¡Æ’Â¡ Ã¡Æ’â€¢Ã¡Æ’ÂÃ¡Æ’ Ã¡Æ’Â¯Ã¡Æ’ËœÃ¡Æ’Â¡ Ã¡Æ’â„¢Ã¡Æ’ÂÃ¡Æ’ Ã¡Æ’â€™Ã¡Æ’â€¢Ã¡Æ’Â'
      },
      title: {
        en: 'Tree cover loss',
        fr: 'Perte en couvert arborÃƒÂ©',
        es: 'PÃƒÂ©rdida de la cobertura arbÃƒÂ³rea',
        pt: 'Perda de cobertura arbÃƒÂ³rea',
        id: 'Tree cover loss',
        zh: 'Ã¦Â£Â®Ã¦Å¾â€”Ã¨Â¦â€ Ã§â€ºâ€“Ã¦ÂÅ¸Ã¥Â¤Â±',
        ka:
          'Ã¡Æ’Â®Ã¡Æ’ËœÃ¡Æ’Â¡ Ã¡Æ’â€¢Ã¡Æ’ÂÃ¡Æ’ Ã¡Æ’Â¯Ã¡Æ’ËœÃ¡Æ’Â¡ Ã¡Æ’â„¢Ã¡Æ’ÂÃ¡Æ’ Ã¡Æ’â€™Ã¡Æ’â€¢Ã¡Æ’Â'
      },
      description: {
        en:
          'Select range and tree cover density then click the run analysis button to see results',
        fr:
          'Select range and tree cover density then click the run analysis button to see results',
        es:
          'Select range and tree cover density then click the run analysis button to see results',
        pt:
          'Select range and tree cover density then click the run analysis button to see results',
        id:
          'Select range and tree cover density then click the run analysis button to see results',
        zh:
          'Select range and tree cover density then click the run analysis button to see results',
        ka:
          'Select range and tree cover density then click the run analysis button to see results'
      },
      useGfwWidget: true,
      widgetId: '23c064f5-fc93-4888-9db7-6d34c8681dd6',
      uiParams: [
        {
          inputType: 'rangeSlider',
          startParamName: 'period',
          combineParams: true,
          valueSeparator: ',',
          bounds: [2001, 2018],
          valueType: 'date',
          label: {
            en: 'Select range for analysis',
            fr: 'SÃ©lectionner une plage pour lâ€™analyse:',
            es: 'Seleccione un rango para el anÃ¡lisis:',
            pt: 'Selecione o perÃ­odo para anÃ¡lise:',
            id: 'Pilih rentang untuk analisis:',
            zh: 'é€‰æ‹©åˆ†æžèŒƒå›´:',
            ka:
              'áƒ¡áƒáƒ–áƒ¦áƒ•áƒ áƒ”áƒ‘áƒ˜áƒ¡ áƒ¨áƒ”áƒ áƒ©áƒ”áƒ•áƒ áƒáƒœáƒáƒšáƒ˜áƒ–áƒ˜áƒ¡áƒ—áƒ•áƒ˜áƒ¡:'
          }
        },
        {
          name: 'thresh',
          inputType: 'tcd',
          label: {
            en: 'Select tree cover density: ',
            fr: 'SÃ©lectionner la densitÃ© de couverture arborÃ©e: ',
            es: 'Seleccione la densidad de la cobertura arbÃ³rea: ',
            pt: 'Selecione a densidade de cobertura arbÃ³rea: ',
            id: 'Pilih kerapatan tutupan pohon: ',
            zh: 'é€‰æ‹©æ£®æž—è¦†ç›–å¯†åº¦: ',
            ka:
              'áƒ®áƒ˜áƒ¡ áƒ•áƒáƒ áƒ¯áƒ˜áƒ¡ áƒ¡áƒ˜áƒ®áƒ¨áƒ˜áƒ áƒ˜áƒ¡ áƒ¨áƒ”áƒ áƒ©áƒ”áƒ•áƒ: '
          }
        }
      ]
    },
    {
      analysisId: 'BIO_LOSS',
      label: {
        en: 'Aboveground Live Woody Biomass Density',
        fr: 'DensitÃ© de la biomasse aÃ©rienne vivante',
        es: 'Densidad de la biomasa viva en la superficie del suelo',
        pt: 'Densidade de biomassa viva acima do solo',
        id: 'Aboveground Live Woody Biomass Density',
        zh: 'Aboveground Live Woody Biomass Density',
        ka:
          'áƒ›áƒ˜áƒ¬áƒ˜áƒ¡áƒ–áƒ”áƒ“áƒ áƒªáƒáƒªáƒ®áƒáƒšáƒ˜ áƒ¢áƒ§áƒ˜áƒ¡ áƒ‘áƒ˜áƒáƒ›áƒáƒ¡áƒ˜áƒ¡ áƒ¡áƒ˜áƒ®áƒ¨áƒ˜áƒ áƒ”'
      },
      title: {
        en: 'Aboveground Live Woody Biomass Density',
        fr: 'DensitÃ© de la biomasse aÃ©rienne vivante',
        es: 'Densidad de la biomasa viva en la superficie del suelo',
        pt: 'Densidade de biomassa viva acima do solo',
        id: 'Aboveground Live Woody Biomass Density',
        zh: 'Aboveground Live Woody Biomass Density',
        ka:
          'áƒ›áƒ˜áƒ¬áƒ˜áƒ¡áƒ–áƒ”áƒ“áƒ áƒªáƒáƒªáƒ®áƒáƒšáƒ˜ áƒ¢áƒ§áƒ˜áƒ¡ áƒ‘áƒ˜áƒáƒ›áƒáƒ¡áƒ˜áƒ¡ áƒ¡áƒ˜áƒ®áƒ¨áƒ˜áƒ áƒ”'
      },
      useGfwWidget: true,
      widgetId: '937a74e7-f616-4d1d-91b3-e69c68e278aa',
      uiParams: [
        {
          inputType: 'rangeSlider',
          startParamName: 'period',
          combineParams: true,
          valueSeparator: ',',
          bounds: [2001, 2018],
          valueType: 'date',
          label: {
            en: 'Select range for analysis',
            fr: 'SÃ©lectionner une plage pour lâ€™analyse:',
            es: 'Seleccione un rango para el anÃ¡lisis:',
            pt: 'Selecione o perÃ­odo para anÃ¡lise:',
            id: 'Pilih rentang untuk analisis:',
            zh: 'é€‰æ‹©åˆ†æžèŒƒå›´:',
            ka:
              'áƒ¡áƒáƒ–áƒ¦áƒ•áƒ áƒ”áƒ‘áƒ˜áƒ¡ áƒ¨áƒ”áƒ áƒ©áƒ”áƒ•áƒ áƒáƒœáƒáƒšáƒ˜áƒ–áƒ˜áƒ¡áƒ—áƒ•áƒ˜áƒ¡:'
          }
        },
        {
          name: 'thresh',
          inputType: 'tcd',
          label: {
            en: 'Select tree cover density: ',
            fr: 'SÃ©lectionner la densitÃ© de couverture arborÃ©e: ',
            es: 'Seleccione la densidad de la cobertura arbÃ³rea: ',
            pt: 'Selecione a densidade de cobertura arbÃ³rea: ',
            id: 'Pilih kerapatan tutupan pohon: ',
            zh: 'é€‰æ‹©æ£®æž—è¦†ç›–å¯†åº¦: ',
            ka:
              'áƒ®áƒ˜áƒ¡ áƒ•áƒáƒ áƒ¯áƒ˜áƒ¡ áƒ¡áƒ˜áƒ®áƒ¨áƒ˜áƒ áƒ˜áƒ¡ áƒ¨áƒ”áƒ áƒ©áƒ”áƒ•áƒ: '
          }
        }
      ]
    },
    {
      analysisId: 'IFL',
      label: {
        en: 'Intact Forest Landscape',
        fr: 'Paysage forestier intact',
        es: 'Paisajes Forestales Intactos',
        pt: 'Paisagens Florestais Intactas',
        id: 'Intact Forest Landscape',
        zh: 'Ã¥Å½Å¸Ã§â€Å¸Ã¦Â£Â®Ã¦Å¾â€”Ã¦â„¢Â¯Ã¨Â§â€š',
        ka:
          'Ã¡Æ’Â®Ã¡Æ’â€Ã¡Æ’Å¡Ã¡Æ’Â£Ã¡Æ’Â®Ã¡Æ’Å¡Ã¡Æ’â€Ã¡Æ’â€˜Ã¡Æ’â€Ã¡Æ’Å¡Ã¡Æ’Ëœ Ã¡Æ’Â¢Ã¡Æ’Â§Ã¡Æ’ËœÃ¡Æ’Â¡ Ã¡Æ’Å¡Ã¡Æ’ÂÃ¡Æ’Å“Ã¡Æ’â€œÃ¡Æ’Â¨Ã¡Æ’ÂÃ¡Æ’Â¤Ã¡Æ’Â¢Ã¡Æ’Ëœ'
      },
      colors: ['#186513'],
      useGfwWidget: true,
      widgetId: 'd0d22aeb-9642-4c4d-a310-f7fb95a48c21',
      uiParams: [
        {
          inputType: 'rangeSlider',
          startParamName: 'period',
          combineParams: true,
          valueSeparator: ',',
          bounds: [2001, 2018],
          valueType: 'date',
          label: {
            en: 'Select range for analysis',
            fr: 'SÃ©lectionner une plage pour lâ€™analyse:',
            es: 'Seleccione un rango para el anÃ¡lisis:',
            pt: 'Selecione o perÃ­odo para anÃ¡lise:',
            id: 'Pilih rentang untuk analisis:',
            zh: 'é€‰æ‹©åˆ†æžèŒƒå›´:',
            ka:
              'áƒ¡áƒáƒ–áƒ¦áƒ•áƒ áƒ”áƒ‘áƒ˜áƒ¡ áƒ¨áƒ”áƒ áƒ©áƒ”áƒ•áƒ áƒáƒœáƒáƒšáƒ˜áƒ–áƒ˜áƒ¡áƒ—áƒ•áƒ˜áƒ¡:'
          }
        },
        {
          name: 'thresh',
          inputType: 'tcd',
          label: {
            en: 'Select tree cover density: ',
            fr: 'SÃ©lectionner la densitÃ© de couverture arborÃ©e: ',
            es: 'Seleccione la densidad de la cobertura arbÃ³rea: ',
            pt: 'Selecione a densidade de cobertura arbÃ³rea: ',
            id: 'Pilih kerapatan tutupan pohon: ',
            zh: 'é€‰æ‹©æ£®æž—è¦†ç›–å¯†åº¦: ',
            ka:
              'áƒ®áƒ˜áƒ¡ áƒ•áƒáƒ áƒ¯áƒ˜áƒ¡ áƒ¡áƒ˜áƒ®áƒ¨áƒ˜áƒ áƒ˜áƒ¡ áƒ¨áƒ”áƒ áƒ©áƒ”áƒ•áƒ: '
          }
        }
      ],
      params: [
        {
          name: 'layer',
          value: 'ifl2000'
        }
      ]
    },
    {
      analysisId: 'GLAD_ALERTS',
      label: {
        en: 'GLAD Alerts',
        fr: 'Alertes GLAD',
        es: 'Alertas GLAD',
        pt: 'Alertas GLAD',
        id: 'GLAD Alerts',
        zh: 'GLAD Alerts',
        ka: 'GLAD შეტყობინებები'
      },
      title: {
        en: 'GLAD Alerts',
        fr: 'Alertes GLAD',
        es: 'Alertas GLAD',
        pt: 'Alertas GLAD',
        id: 'GLAD Alerts',
        zh: 'GLAD Alerts',
        ka: 'GLAD შეტყობინებები'
      },
      chartType: 'timeSeries',
      analysisUrl:
        'https://production-api.globalforestwatch.org/v1/glad-alerts',
      uiParams: [
        {
          inputType: 'datepicker',
          startParamName: 'period',
          combineParams: true,
          valueSeparator: ',',
          multi: true,
          defaultStartDate: '2016-01-01',
          minDate: '2015-01-01',
          label: {
            en: 'Select range for analysis',
            fr: 'Select range for analysis',
            es: 'Select range for analysis',
            pt: 'Select range for analysis',
            id: 'Select range for analysis',
            zh: 'Select range for analysis',
            ka: 'Select range for analysis'
          }
        }
      ],
      params: [
        {
          name: 'aggregate_values',
          value: 'true'
        },
        {
          name: 'aggregate_by',
          value: 'day'
        }
      ]
    },
    {
      analysisId: 'TERRAI_ALERTS',
      label: {
        en: 'Terra-I Alerts',
        fr: 'Alertes Terra-I',
        es: 'Alertas Terra-I',
        pt: 'Alertas Terra-I',
        id: 'Terra-I Alerts',
        zh: 'Terra-I Alerts',
        ka: 'Terra-I ??????????????'
      },
      chartType: 'timeSeries',
      analysisUrl:
        'https://production-api.globalforestwatch.org/v1/terrai-alerts',
      uiParams: [
        {
          inputType: 'datepicker',
          startParamName: 'period',
          combineParams: true,
          valueSeparator: ',',
          multi: true,
          defaultStartDate: '2006-06-20',
          minDate: '2004-01-01',
          maxDate: '2016-07-12',
          label: {
            en: 'Select date(s) for analysis',
            fr: 'Select date(s) for analysis',
            es: 'Select date(s) for analysis',
            pt: 'Select date(s) for analysis',
            id: 'Select date(s) for analysis',
            zh: 'Select date(s) for analysis',
            ka: 'Select date(s) for analysis'
          }
        }
      ],
      params: [
        {
          name: 'aggregate_values',
          value: 'true'
        },
        {
          name: 'aggregate_by',
          value: 'day'
        }
      ]
    },
    {
      analysisId: 'VIIRS_FIRES',
      label: {
        en: 'VIIRS Active Fires',
        fr: 'Feux actifs VIIRS',
        es: 'Incendios activos VIIRS',
        pt: 'IncÃƒÂªndios ativos VIIRS',
        id: 'VIIRS Active fires',
        zh: 'Ã¦Â´Â»Ã¨Â·Æ’Ã§ÂÂ«Ã§â€šÂ¹ VIIRS',
        ka:
          'VIIRS Ã¡Æ’ÂÃ¡Æ’Â¥Ã¡Æ’Â¢Ã¡Æ’ËœÃ¡Æ’Â£Ã¡Æ’ Ã¡Æ’Ëœ Ã¡Æ’Â®Ã¡Æ’ÂÃ¡Æ’Å“Ã¡Æ’Â«Ã¡Æ’ Ã¡Æ’â€Ã¡Æ’â€˜Ã¡Æ’Ëœ'
      },
      useGfwWidget: true,
      widgetId: '97b82853-d9fb-4e74-b9b3-2fac7937f38f',
      uiParams: 'none'
    },
    {
      analysisId: 'LCC',
      label: {
        en: 'Land Cover Composition',
        fr: 'Couverture des sols',
        es: 'Cobertura terrestre',
        pt: 'Cobertura do Solo',
        id: 'Land Cover',
        zh: 'åœŸåœ°è¦†ç›–',
        ka: 'áƒ›áƒ˜áƒ¬áƒ˜áƒ¡ áƒ¡áƒáƒ¤áƒáƒ áƒ˜'
      },
      useGfwWidget: true,
      widgetId: '65dc8170-0049-48e7-94ba-fa846fcb295c',
      uiParams: 'none',
      params: [
        {
          name: 'layer',
          value: 'gfw-landcover-2015'
        }
      ]
    },
    {
      analysisId: 'VEGA_RESTORATION_TREE_COVER',
      label: {
        en: 'Tree cover'
      },
      title: {
        en: 'Tree cover analysis'
      },
      description: {
        en: 'Restoration potential per tree cover class'
      },
      useGfwWidget: true,
      widgetId: '9a200983-65aa-400e-9415-912ab0312cf8',
      uiParams: 'none'
    },
    {
      analysisId: 'VEGA_RESTORATION_LAND_COVER',
      label: {
        en: 'Land Cover'
      },
      title: {
        en: 'Land Cover Analysis'
      },
      description: {
        en: 'Restoration potential per land cover class'
      },
      useGfwWidget: true,
      widgetId: 'fcf6788a-1382-4e16-8828-0d45354b9def',
      uiParams: 'none'
    },
    {
      analysisId: 'VEGA_RESTORATION_POP_DEN',
      label: {
        en: 'Population Density'
      },
      title: {
        en: 'Population Density Analysis'
      },
      description: {
        en: 'Restoration potential per analysis class'
      },
      useGfwWidget: true,
      widgetId: '569c65a4-3107-41cc-8100-f5d8dc71ec6e',
      uiParams: 'none'
    },
    {
      analysisId: 'VEGA_RESTORATION_RAINFALL',
      label: {
        en: 'Average Annual Rainfall'
      },
      title: {
        en: 'Average Annual Rainfall Analysis'
      },
      description: {
        en: 'Restoration potential per rainfall class'
      },
      useGfwWidget: true,
      widgetId: '6ade3c8e-cec1-415e-bf72-3f9cd69e2369',
      uiParams: 'none'
    },
    {
      analysisId: 'VEGA_RESTORATION_SLOPE',
      label: {
        en: 'Slope'
      },
      title: {
        en: 'Slope Analysis'
      },
      description: {
        en: 'Restoration potential per slope class'
      },
      useGfwWidget: true,
      widgetId: 'f01ef13d-cfbe-4588-ae16-27ef2713a15a',
      uiParams: 'none'
    }
  ],
  layerPanel: {
    GROUP_WEBMAP: {
      order: 1,
      label: {
        en: 'WCS Scapes'
      },
      layers: []
    },
    GROUP_LCD: {
      groupType: 'default',
      order: 2,
      label: {
        en: 'Land Cover Dynamics',
        fr: 'Evolution de la couverture des sols',
        es: 'Din?mica de la Cobertura del Suelo',
        pt: 'Din?mica de cobertura da terra ',
        id: 'Land Cover Dynamics',
        zh: '????????',
        ka: '????? ??????? ????????'
      },
      layers: [
        {
          order: 1,
          id: 'TREE_COVER_LOSS',
          type: 'loss',
          url:
            'https://storage.googleapis.com/wri-public/Hansen_16/tiles/hansen_world/v1/tc30/{z}/{x}/{y}.png',
          technicalName: 'tree_cover_loss',
          legendLayer: [0],
          label: {
            en: 'Tree Cover Loss',
            fr: 'Perte en couvert arbor?',
            es: 'P?rdida de la cobertura arb?rea',
            pt: 'Perda de cobertura arb?rea',
            id: 'Tree cover loss',
            zh: '??????',
            ka: '??? ?????? ??????'
          },
          sublabel: {
            en: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            fr: '(annuel, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            es: '(anual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            pt: '(anual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            id: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            zh: '(????, 30?, ????, ??/?????/??/???????(USGS)/?????(NASA))',
            ka: '(??????, 30?, ?????????, Hansen/UMD/Google/USGS/NASA)'
          },
          minYear: 7,
          maxYear: 20
        },
        {
          order: 2,
          id: 'TREE_COVER_GAIN',
          type: 'gain',
          url:
            'https://earthengine.google.org/static/hansen_2013/gain_alpha/{z}/{x}/{y}.png',
          technicalName: 'tree_cover_gain',
          legendLayer: [1],
          label: {
            en: 'Tree cover gain',
            fr: 'Gain en couvert arbor?',
            es: 'Aumento de la cobertura arb?rea',
            pt: 'Ganho de cobertura arb?rea',
            id: 'Tree cover gain',
            zh: '??????',
            ka: '??? ?????? ??????'
          },
          sublabel: {
            en: '(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            fr: '(12 ans, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            es: '(12 a?os, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            pt: '(12 anos, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            id: '(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            zh: '(12 ?, 30?, ????, ??/?????/??/???????(USGS)/?????(NASA))',
            ka: '(12 ????????, 30?, ?????????, Hansen/UMD/Google/USGS/NASA)'
          }
        },
        {
          order: 3,
          id: 'IMAZON_SAD',
          type: 'dynamic',
          url:
            'https://gis-gfw.wri.org/arcgis/rest/services/forest_change/MapServer',
          technicalName: 'imazon_sad',
          layerIds: [2],
          label: {
            en: 'SAD alerts',
            fr: 'Alertes SAD',
            es: 'Alertas SAD',
            pt: 'Alertas SAD',
            id: 'SAD alerts',
            zh: 'SAD alerts',
            ka: 'SAD ?????????????'
          },
          sublabel: {
            en: '(monthly, 250m, Brazilian Amazon, Imazon)',
            fr: '(mensuel, 250m, Amazonie br?silienne, Imazon)',
            es: '(mensual, 250m, Amazonia brasile?a, Imazon)',
            pt: '(mensal, 250m, Amaz?nia brasileira, Imazon)',
            id: '(monthly, 250m, Brazilian Amazon, Imazon)',
            zh: '(monthly, 250m, Brazilian Amazon, Imazon)',
            ka: '(???????????, 250?, ????????? ????????, Imazon)'
          }
        },
        {
          order: 4,
          id: 'GLAD_ALERTS',
          type: 'glad',
          url:
            'https://wri-tiles.s3.amazonaws.com/glad_prod/tiles/{z}/{x}/{y}.png',
          technicalName: 'umd_landsat_alerts',
          legendLayer: [7],
          label: {
            en: 'GLAD Alerts',
            fr: 'Alertes GLAD',
            es: 'Alertas GLAD',
            pt: 'Alertas GLAD',
            id: 'GLAD Alerts',
            zh: 'GLAD Alerts',
            ka: 'GLAD ?????????????'
          },
          sublabel: {
            en: '(weekly, 30m, select countries, UMD/ GLAD)',
            fr: '(hebdomadaire, 30m, certains pays, UMD/ GLAD)',
            es: '(semanal, 30m, select countries, UMD/ GLAD)',
            pt: '(semanal, 30m, select countries, UMD/ GLAD)',
            id: '(weekly, 30m, select countries, UMD/ GLAD)',
            zh: '(weekly, 30m, select countries, UMD/ GLAD)',
            ka: '(?????????????, 30?, ??????? ????????, UMD/ GLAD)'
          },
          minDateValue: 15000,
          maxDateValue: 999999,
          confidence: [0, 1]
        },
        {
          order: 5,
          id: 'TERRA_I_ALERTS',
          type: 'terra',
          url:
            'https://wri-tiles.s3.amazonaws.com/terrai_prod/tiles/{z}/{x}/{y}.png',
          technicalName: 'terra_i_alerts',
          legendLayer: [13],
          label: {
            en: 'Terra-I Alerts',
            fr: 'Alertes Terra-I',
            es: 'Alertas Terra-I',
            pt: 'Alertas Terra-I',
            id: 'Terra-I Alerts',
            zh: 'Terra-I Alerts',
            ka: 'Terra-I ?????????????'
          },
          sublabel: {
            en: '(monthly, 250m, Latin America, CIAT)',
            fr: '(mensuel, 250m, Am?rique Latine, CIAT)',
            es: '(mensual, 250m, Latin America, CIAT)',
            pt: '(Mensal, 250m, Latin America, CIAT)',
            id: '(monthly, 250m, Latin America, CIAT)',
            zh: '(monthly, 250m, Latin America, CIAT)',
            ka: '(???????????, 250?, ???????? ???????, CIAT)'
          },
          maxZoom: 10,
          minDateValue: 4000,
          maxDateValue: 20000,
          imageServer:
            'https://gis-gfw.wri.org/arcgis/rest/services/image_services/terrai_analysis/ImageServer'
        },
        {
          order: 6,
          id: 'VIIRS_ACTIVE_FIRES',
          type: 'dynamic',
          url:
            'https://gis-gfw.wri.org/arcgis/rest/services/Fires/FIRMS_Global/MapServer',
          technicalName: 'viirs_fires',
          layerIds: [8],
          label: {
            en: 'VIIRS Active Fires',
            fr: 'Feux actifs',
            es: 'Incendios activos',
            pt: 'Inc?ndios ativos',
            id: 'Active fires',
            zh: '????',
            ka: 'VIIRS ??????? ????????'
          },
          sublabel: {
            en: '(daily, 375m, global, NASA)',
            fr: '(journalier, 375m, global, NASA)',
            es: '(Diaria, 375m, global, NASA)',
            pt: '(Di?ria, 375m, global, NASA)',
            id: '(daily, 375m, global, NASA)',
            zh: '(????, 375?, ????, ??????NASA))',
            ka: '(???????????, 375?, ?????????, NASA)'
          },
          popup: {
            title: {
              en: 'Active Fires'
            },
            content: {
              en: [
                {
                  label: 'Brightness',
                  fieldExpression: 'BRIGHTNESS'
                },
                {
                  label: 'Confidence',
                  fieldExpression: 'CONFIDENCE'
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LATITUDE'
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LONGITUDE'
                },
                {
                  label: 'Acquisition Date',
                  fieldExpression: 'ACQ_DATE:DateString(hideTime:true)'
                },
                {
                  label: 'Acquisition Time',
                  fieldExpression: 'ACQ_TIME'
                }
              ]
            },
            sublabel: {
              en: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
              fr: '(annuel, 30m, global, Hansen/UMD/Google/USGS/NASA)',
              es: '(anual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
              pt: '(anual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
              id: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
              zh: '(????, 30?, ????, ??/?????/??/???????(USGS)/?????(NASA))',
              ka: '(??????, 30?, ?????????, Hansen/UMD/Google/USGS/NASA)'
            }
          }
        },
        {
          order: 7,
          id: 'MODIS_ACTIVE_FIRES',
          type: 'dynamic',
          url:
            'https://gis-gfw.wri.org/arcgis/rest/services/Fires/FIRMS_Global/MapServer',
          technicalName: 'firms_active_fires',
          layerIds: [9],
          label: {
            en: 'MODIS Active Fires',
            fr: 'Feux actifs',
            es: 'Incendios activos',
            pt: 'Inc?ndios ativos',
            id: 'Active fires',
            zh: '????',
            ka: 'MODIS ??????? ????????'
          },
          sublabel: {
            en: '(daily, 1km, global, NASA)',
            fr: '(journalier, 1km, global, NASA)',
            es: '(Diaria, 1km, global, NASA)',
            pt: '(Di?ria, 1km, global, NASA)',
            id: '(daily, 1km, global, NASA)',
            zh: '(????, 1??, ????, ??????NASA))',
            ka: '(???????????, 1??, ?????????, NASA)'
          },
          popup: {
            title: {
              en: 'Active Fires'
            },
            content: {
              en: [
                {
                  label: 'Brightness',
                  fieldExpression: 'BRIGHTNESS'
                },
                {
                  label: 'Confidence',
                  fieldExpression: 'CONFIDENCE'
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LATITUDE'
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LONGITUDE'
                },
                {
                  label: 'Acquisition Date',
                  fieldExpression: 'ACQ_DATE:DateString(hideTime:true)'
                },
                {
                  label: 'Acquisition Time',
                  fieldExpression: 'ACQ_TIME'
                }
              ]
            },
            sublabel: {
              en: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
              fr: '(annuel, 30m, global, Hansen/UMD/Google/USGS/NASA)',
              es: '(anual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
              pt: '(anual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
              id: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
              zh: '(????, 30?, ????, ??/?????/??/???????(USGS)/?????(NASA))',
              ka: '(??????, 30?, ?????????, Hansen/UMD/Google/USGS/NASA)'
            }
          }
        }
      ]
    },
    GROUP_LC: {
      groupType: 'default',
      order: 3,
      label: {
        en: 'Land Cover',
        fr: 'Couverture des sols',
        es: 'Cobertura terrestre',
        pt: 'Cobertura do Solo',
        id: 'Land Cover',
        zh: '????',
        ka: '????? ??????'
      },
      layers: [
        {
          order: 1,
          id: 'INTACTFORESTS_FRAGMENTATION17',
          type: 'webtiled',
          url:
            'https://storage.googleapis.com/intactforest_fragmentation/intactforest_fragmentation_17/{level}/{col}/{row}',
          technicalName: 'intactforests_fragmentation17',
          legendLayer: [0],
          label: {
            en: 'Fragmentation 2017'
          },
          sublabel: {
            en: '(Fragmentation 2017)'
          },
          minYear: 7,
          maxYear: 20
        },
        {
          order: 2,
          id: 'INTACTFORESTS_ANTHROTONE',
          type: 'webtiled',
          url:
            'https://storage.googleapis.com/intactforest_fragmentation/intactforest_anthrotone/{level}/{col}/{row}',
          technicalName: 'anthrotone',
          legendLayer: [0],
          label: {
            en: 'Anthrotone'
          },
          sublabel: {
            en: '(Anthrotone)'
          },
          minYear: 7,
          maxYear: 20
        },
        {
          order: 3,
          id: 'INTACTFORESTS_INTACTNESSINDEX',
          type: 'webtiled',
          url:
            'https://storage.googleapis.com/intactforest_fragmentation/intactforest_intactnessindex/{level}/{col}/{row}',
          technicalName: 'intactforests_intactnessindex',
          legendLayer: [0],
          label: {
            en: 'Intactnessndex'
          },
          sublabel: {
            en: '(Intactness index)'
          },
          minYear: 7,
          maxYear: 20
        },
        {
          order: 4,
          id: 'GLOB_MANGROVE',
          type: 'webtiled',
          url:
            'https://{subDomain}.ashbu.cartocdn.com/wri-01/api/v1/map/209485bfcb3eafb435befa0c405242ae:1467735931596/0/{level}/{col}/{row}.png',
          technicalName: 'global_mangroves',
          legendLayer: [11],
          label: {
            en: 'Global Mangrove',
            fr: 'Global Mangrove',
            es: 'Global Mangrove',
            pt: 'Global Mangrove',
            id: 'Global Mangrove',
            zh: 'Global Mangrove',
            ka: '????????? ????????'
          },
          subDomains: [0, 1, 2, 3]
        },
        {
          order: 5,
          id: 'IFL',
          type: 'dynamic',
          url:
            'https://gis-gfw.wri.org/arcgis/rest/services/forest_cover/MapServer',
          technicalName: 'intact_forest_landscapes_change',
          layerIds: [0],
          label: {
            en: 'intact Forest Landscape',
            fr: 'Paysage forestier intact',
            es: 'Paisajes Forestales Intactos',
            pt: 'Paisagens Florestais Intactas',
            id: 'Intact Forest Landscape',
            zh: '??????',
            ka: '??????????? ???? ?????????'
          }
        }
      ]
    },
    GROUP_IMAGERY: {
      groupType: 'imagery',
      order: 4,
      label: {
        en: 'Recent Imagery',
        fr: 'Recent Imagery',
        es: 'Recent Imagery',
        pt: 'Recent Imagery',
        id: 'Recent Imagery',
        zh: 'Recent Imagery',
        ka: 'Recent Imagery'
      },
      layers: [
        {
          order: 1,
          id: 'RECENT_IMAGERY',
          type: 'imagery',
          technicalName: 'recent_satellite_imagery',
          label: {
            en: 'Recent Imagery',
            fr: 'Recent Imagery',
            es: 'Recent Imagery',
            pt: 'Recent Imagery',
            id: 'Recent Imagery',
            zh: 'Recent Imagery',
            ka: 'Recent Imagery'
          },
          dynamicSublabel: {
            en: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
            fr: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
            es: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
            pt: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
            id: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
            zh: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
            ka: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})'
          }
        }
      ]
    },
    GROUP_BASEMAP: {
      groupType: 'basemap',
      order: 5,
      label: {
        en: 'Basemap',
        fr: 'Basemap',
        es: 'Basemap',
        pt: 'Basemap',
        id: 'Basemap',
        zh: 'Basemap',
        ka: '?????? ????'
      },
      layers: [
        {
          order: 1,
          id: 'landsat',
          thumbnailUrl:
            'https://my.gfw-mapbuilder.org/img/basemaps-sdd18a411a3-5bf18f445e58b8766f773184b7741c67.png',
          templateUrl:
            'https://d2h71bpqsyf4vw.cloudfront.net/2016/${level}/${col}/${row}.png',
          years: [
            '2000',
            '2001',
            '2002',
            '2003',
            '2004',
            '2005',
            '2006',
            '2007',
            '2008',
            '2009',
            '2010',
            '2011',
            '2012',
            '2013',
            '2014',
            '2015',
            '2016'
          ],
          title: {
            en: 'Landsat',
            fr: 'Landsat',
            es: 'Landsat',
            pt: 'Landsat',
            id: 'Landsat',
            zh: 'Landsat',
            ka: 'Landsat'
          }
        },
        {
          order: 2,
          id: 'wri_mono',
          thumbnailUrl: 'https://my.gfw-mapbuilder.org/img/wri_mono.png',
          title: {
            en: 'Grey Basemap',
            fr: 'Mono',
            es: 'Mono',
            pt: 'Mono',
            id: 'Mono',
            zh: 'Mono',
            ka: 'Mono'
          }
        },
        {
          order: 3,
          id: 'wri_contextual',
          thumbnailUrl: 'https://my.gfw-mapbuilder.org/img/wri_contextual.png',
          title: {
            en: 'Contextual',
            fr: 'Contextual',
            es: 'Contextual',
            pt: 'Contextual',
            id: 'Contextual',
            zh: 'Contextual',
            ka: 'Contextual'
          }
        }
      ]
    },
    GROUP_Other: {
      order: 6,
      label: {
        en: 'Other'
      },
      layers: [
        {
          order: 1,
          id: 'Oth1',
          type: 'dynamic',
          url:
            'https://gis-gfw.wri.org/arcgis/rest/services/hydrology/MapServer',
          layerIds: [2],
          label: {
            en: 'Hydrology'
          }
        },
        {
          order: 2,
          id: 'Oth2',
          type: 'dynamic',
          url:
            'https://sampleserver6.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer',
          layerIds: [0],
          label: {
            en: 'Roads'
          }
        }
      ]
    },
    extraLayers: [
      {
        order: 10000,
        id: 'MASK',
        type: 'dynamic',
        url:
          'https://gis.forest-atlas.org/server/rest/services/country_masks/country_mask_global/MapServer',
        layerIds: [0],
        opacity: 0.35
      },
      {
        order: 10001,
        id: 'LEGEND_LAYER',
        type: 'dynamic',
        url: 'https://gis-gfw.wri.org/arcgis/rest/services/legends/MapServer',
        layerIds: []
      },
      {
        order: 10002,
        id: 'USER_FEATURES',
        type: 'graphic',
        visible: true
      }
    ]
  }
};

// WEBPACK FOOTER //
// ./src/resources.js
