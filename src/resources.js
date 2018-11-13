export default {
  //- NOTE: New Forest Atlas 2.0 Options, These are the raw values coming from ArcGIS Online from
  //- General Settings
  // webmap to use for testing metadata.xml fetching/parsing - 4d426ef4be0f483e9dab047fbb4c6718
  // webmap to use for testing document attachments - b514d31339954ba9a0c5822135bc2001
  // webmap to use for testing time enabled layers - 9416e5b5beea4d329dbbfdc3312d2c35
  // webmap to use for deployment, this should be the default - de85e3fcc07948238aa6c1afd2a4ceb0
  webmap: 'de85e3fcc07948238aa6c1afd2a4ceb0',
  title: 'GFW Mapbuilder',
  subtitle: 'Make maps that matter',
  logoUrl: 'https://my.gfw-mapbuilder.org/img/gfw-logo.png',
  logoLinkUrl: 'https://www.gfw-mapbuilder.org/',
  aboutLinkUrl: '', // http://www.gfw-mapbuilder.org/
  downloadLinkUrl: '', // http://data.globalforestwatch.org/
  printServiceUrl: 'https://gis.forest-atlas.org/server/rest/services/print/ExportWebMap/GPServer/Export%20Web%20Map',
  maskServiceUrl: '', // e.g. http://gis-forest-atlas.wri.org/arcgis/rest/services/CMR/CMR_00_Africa/MapServer
  mapThemeIds: '', // e.g. 1c38ba1095fe49e3ba234bf9105c1077;c76d788b7487476bae4d09a4e933be19
  mapThemes: '', // e.g. Forest Atlas of Cameroon;Forest Atlas of Equatorial Guinea
  narrative: '',
  hideHeader: false,
  hideFooter: false,
  includeMyGFWLogin: true,
  navLinksInNewTab: false,
  //- Language Settings
  language: 'en',
  useAlternativeLanguage: false,
  alternativeWebmap: '',
  alternativeLanguage: 'fr',
  alternativeLanguageTitle: 'GFW Mapbuilder',
  alternativeLanguageSubtitle: 'Make maps that matter',
  alternativeMapThemes: '', // e.g. Forest Atlas of Cameroon;Forest Atlas of Equatorial Guinea
  alternativeNarrative: '',
  alternativeWebmapMenuName: 'Land Use',
  //- Tab Settings
  includeDocumentsTab: false,
  includeMeasurementTab: false,
  //- Layers/Analysis Settings
  iso: '',
  viirsFires: true,
  modisFires: true,
  intactForests: true,
  aboveGroundBiomass: true,
  landCover: true,
  mangroves: false,
  sadAlerts: true,
  gladAlerts: true,
  terraIAlerts: true,
  webmapMenuName: 'Land Use',
  //- Include/Exclude various restoration analysis types
  restorationSlope: true, //- Main Slope Analysis
  restorationSlopePotential: true, //- Part of the various restoration options
  restorationTreeCover: true,
  restorationLandCover: true,
  restorationPopulation: true,
  restorationRainfall: true,

  // Options not configurable from AGOL but can be from here
  restorationChartDescription: 'Some explanatory text for this anlaysis',
  restorationTableDescription: 'Some explanatory text for this anlaysis',
  slopeDescription: 'Some explanatory text for this anlaysis',
  alternativeRestorationChartDescription: 'Some explanatory text for this anlaysis',
  alternativeRestorationTableDescription: 'Some explanatory text for this anlaysis',
  alternativeSlopeDescription: 'Some explanatory text for this anlaysis',
  // DO NOT MODIFY SHARINGHOST unless you are configuring this for a Portal Environment
  sharinghost: 'https://www.arcgis.com',
  analyticsCode: '',
  includeCartoTemplateLayers: false,
  // cartoUser: 'wri-01',
  // cartoTemplateId: 'tpl_07c315f8_c13e_11e4_b457_0e8dde98a187',
  // cartoApiKey: 'your key here',
  // cartoGroupLabel: {
  //   en: 'Carto Layers',
  //   fr: 'Carto Layers',
  // },

  /**
   * Custom Analysis Module Configuration
   * This section provides the opportunity to define additional custom analysis modules.
   * The modules are dependent on gfw widgets registered to the GFW API, so if you would
   * like to define a custom module, you must first create a widget and register it.
   *
   * (we probably will NOT use the value property. we will just loop through all analysisModules
   * and create a dropdown option for each if they have all of the required properties. maybe they have an order to sort them? This also
   * means that all of the standard analyses will get their own entry in this array.)
   * @property {string} value - a unique value for this analysis module
   * @property {string} label - the label for the analysis in the dropdown
   * @property {string} group - what group this analysis belongs to (maybe this is how we can differentiate
   * the 'standard' analyses any thing with group 'standard' will not be required to have a widget
   * until we get widgets for all of them)
   * @property {string} widgetId - the widgetId from the gfw-api
   * @property {string} queryUrl - the url to query for the analysis data
   * @property {object[]} params - any params to pass along with the query url
   * @property {string} params[].key - query param key
   * @property {string} params[].value - query param value
   *
   * (geostore is automatically appended with each request)
   */



   analysisModules: [
     {
       analysisId: 'TC_LOSS_GAIN',
       label: {
           en: 'Total tree cover loss/ gain',
           fr: 'Total perte/ gain en couvert arboré',
           es: 'Pérdida/ Aumento de la cobertura arbórea',
           pt: 'Perda/ Ganho de cobertura arbórea',
           id: 'Total tree cover loss/ gain',
           zh: '森林覆盖损失/ 森林覆盖增加',
           ka: 'ხის ვარჯის კარგვა/ ნამატი'
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
         en: 'Select range and tree cover density then click the "run analysis" button to see results',
         fr: 'Select range and tree cover density then click the "run analysis" button to see results',
         es: 'Select range and tree cover density then click the "run analysis" button to see results',
         pt: 'Select range and tree cover density then click the "run analysis" button to see results',
         id: 'Select range and tree cover density then click the "run analysis" button to see results',
         zh: 'Select range and tree cover density then click the "run analysis" button to see results',
         ka: 'Select range and tree cover density then click the "run analysis" button to see results'
       },
       chartType: 'badge',
       valueAttribute: 'data.attributes.loss',
       analysisUrl: 'https://production-api.globalforestwatch.org/v1/umd-loss-gain',
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
         },
         {
           name: 'thresh',
           inputType: 'tcd',
           label: {
             en: 'Select tree cover density: ',
             fr: 'Select tree cover density: ',
             es: 'Select tree cover density: ',
             pt: 'Select tree cover density: ',
             id: 'Select tree cover density: ',
             zh: 'Select tree cover density: ',
             ka: 'Select tree cover density: '
           }
         }
       ],
     },
     {
       analysisId: 'TC_LOSS',
       label: {
           en: 'Tree cover loss',
           fr: 'Perte en couvert arboré',
           es: 'Pérdida de la cobertura arbórea',
           pt: 'Perda de cobertura arbórea',
           id: 'Tree cover loss',
           zh: '森林覆盖损失',
           ka: 'ხის ვარჯის კარგვა'
       },
       chartType: 'bar',
       chartBounds: [2001, 2017],
       analysisUrl: 'https://production-api.globalforestwatch.org/v1/umd-loss-gain',
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
         },
         {
           name: 'thresh',
           inputType: 'tcd',
           label: {
                 en: 'Select tree cover density: ',
                 fr: 'Select tree cover density: ',
                 es: 'Select tree cover density: ',
                 pt: 'Select tree cover density: ',
                 id: 'Select tree cover density: ',
                 zh: 'Select tree cover density: ',
                 ka: 'Select tree cover density: '
           }
         }
       ],
       params: [
         {
           name: 'aggregate_values',
           value: 'false'
         }
       ],
     },
     {
       analysisId: 'BIO_LOSS',
       label: {
           en: 'Aboveground Live Woody Biomass Density',
           fr: 'Densité de la biomasse aérienne vivante',
           es: 'Densidad de la biomasa viva en la superficie del suelo',
           pt: 'Densidade de biomassa viva acima do solo',
           id: 'Aboveground Live Woody Biomass Density',
           zh: 'Aboveground Live Woody Biomass Density',
           ka: 'მიწისზედა ცოცხალი ტყის ბიომასის სიხშირე'
       },
       chartType: 'biomassLoss',
       colors: {
        loss: '#FF6699',
        carbon: '#BEBCC2'
      },
       analysisUrl: 'https://production-api.globalforestwatch.org/v1/biomass-loss',
       uiParams: [
        {
           inputType: 'rangeSlider',
           startParamName: 'period',
           combineParams: true,
           valueSeparator: ',',
           bounds: [2001, 2014],
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
         },
         {
           name: 'thresh',
           inputType: 'tcd',
           label: {
                 en: 'Select tree cover density: ',
                 fr: 'Select tree cover density: ',
                 es: 'Select tree cover density: ',
                 pt: 'Select tree cover density: ',
                 id: 'Select tree cover density: ',
                 zh: 'Select tree cover density: ',
                 ka: 'Select tree cover density: '
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
           zh: '原生森林景观',
           ka: 'ხელუხლებელი ტყის ლანდშაფტი'
       },
       chartType: 'bar',
       chartBounds: [2001, 2015],
       colors: ['#186513'],
       analysisUrl: 'https://production-api.globalforestwatch.org/v1/loss-by-landcover',
       params: [
         {
           name: 'layer',
           value: 'ifl2000'
         }
       ],
       uiParams: [
        {
           inputType: 'rangeSlider',
           startParamName: 'period',
           combineParams: true,
           valueSeparator: ',',
           bounds: [2001, 2015],
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
         },
         {
           name: 'thresh',
           inputType: 'tcd',
           label: {
                 en: 'Select tree cover density: ',
                 fr: 'Select tree cover density: ',
                 es: 'Select tree cover density: ',
                 pt: 'Select tree cover density: ',
                 id: 'Select tree cover density: ',
                 zh: 'Select tree cover density: ',
                 ka: 'Select tree cover density: '
           }
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
       chartType: 'timeSeries',
       analysisUrl: 'https://production-api.globalforestwatch.org/v1/glad-alerts',
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
       analysisId: 'FORMA_ALERTS',
       label: {
           en: 'FORMA Alerts',
           fr: 'FORMA Alerts',
           es: 'FORMA Alerts',
           pt: 'FORMA Alerts',
           id: 'FORMA Alerts',
           zh: 'FORMA Alerts',
           ka: 'FORMA Alerts'
       },
       chartType: 'badge',
       valueAttribute: 'data.attributes.alertCounts',
       badgeLabel: {
           en: 'FORMA alerts',
           fr: 'FORMA alerts',
           es: 'FORMA alerts',
           pt: 'FORMA alerts',
           id: 'FORMA alerts',
           zh: 'FORMA alerts',
           ka: 'FORMA alerts'
       },
       analysisUrl: 'https://production-api.globalforestwatch.org/forma250GFW',
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
         // {
         //   name: 'aggregate_values',
         //   value: 'true'
         // },
         // {
         //   name: 'aggregate_by',
         //   value: 'day'
         // }
       ]
     },
     // {
     //   analysisId: 'VEGA_GLAD',
     //   label: {
     //     en: 'GLAD Alerts (custom VEGA widget)'
     //   },
     //   analysisUrl: 'https://production-api.globalforestwatch.org/v1/glad-alerts',
     //   chartType: 'gfwWidget',
     //   widgetId: 'f264dc99-a100-47e5-9867-5da0eb74973e',
     //   uiParams: [
     //     {
     //       startParamName: 'period',
     //       inputType: 'datepicker',
     //       combineParams: true,
     //       valueSeparator: ',',
     //       multi: true,
     //       defaultStartDate: '2016-01-01',
     //       // defaultEndDate: '',
     //       minDate: '2015-01-01',
     //       // maxDate: '',
     //       label: {
     //         en: 'Select date(s) for analysis'
     //       }
     //     },
     //     {
     //       name: 'thresh',
     //       inputType: 'tcd',
     //       label: {
     //         en: 'Select tree cover density: '
     //       }
     //     }
     //   ],
     //   params: [
     //     {
     //       name: 'aggregate_values',
     //       value: 'true'
     //     },
     //     {
     //       name: 'aggregate_by',
     //       value: 'day'
     //     }
     //   ]
     // },

     {
       analysisId: 'VEGA_GLAD_WIDGET',
       label: {
           en: 'GLAD Alerts (Vega)',
           fr: 'Alertes GLAD (Vega)',
           es: 'Alertas GLAD (Vega)',
           pt: 'Alertas GLAD (Vega)',
           id: 'GLAD Alerts (Vega)',
           zh: 'GLAD Alerts (Vega)',
           ka: 'GLAD შეტყობინებები (vega)'
       },
       analysisUrl: 'https://production-api.globalforestwatch.org/v1/glad-alerts',
       useGfwWidget: true,
       widgetId: 'f264dc99-a100-47e5-9867-5da0eb74973e',
       uiParams: [
         {
           startParamName: 'period',
           inputType: 'datepicker',
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
           ka: 'Terra-I შეტყობინებები'
       },
       chartType: 'timeSeries',
       analysisUrl: 'https://production-api.globalforestwatch.org/v1/terrai-alerts',
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
           pt: 'Incêndios ativos VIIRS',
           id: 'VIIRS Active fires',
           zh: '活跃火点 VIIRS',
           ka: 'VIIRS აქტიური ხანძრები'
       },
       chartType: 'badge',
       valueAttribute: 'data.attributes.value',
       badgeLabel: {
           en: 'Active Fires',
           fr: 'Feux actifs',
           es: 'Incendios activos',
           pt: 'Incêndios ativos',
           id: 'Active fires',
           zh: '活跃火点',
           ka: 'აქტიური ხანძრები'
       },
       color: '#5ea1ed',
       analysisUrl: 'https://production-api.globalforestwatch.org/v1/viirs-active-fires',
       uiParams: [
         {
           inputType: 'datepicker',
           startParamName: 'period',
           // endParamName: '',
           combineParams: true,
           valueSeparator: ',',
           multi: true,
           // defaultStartDate: '',
           // defaultEndDate: '',
           minDate: '2004-01-01',
           label: {
             en: 'Select date(s) for analysis',
             fr: 'Select date(s) for analysis',
             es: 'Select date(s) for analysis',
             pt: 'Select date(s) for analysis',
             id: 'Select date(s) for analysis',
             zh: 'Select date(s) for analysis',
             ka: 'Select date(s) for analysis'
           }
         },
       ],
     },
     {
       analysisId: 'LCC',
       label: {
         en: 'Land Cover Composition',
         fr: 'Couverture des sols',
         es: 'Cobertura terrestre',
         pt: 'Cobertura do Solo',
         id: 'Land Cover',
         zh: '土地覆盖',
         ka: 'მიწის საფარი'
       },
       chartType: 'lccPie',
       classes: {
         en: ['Land Cover', 'Agriculture', 'Forest', 'Grassland', 'Shrubland', 'Sparse vegetation', 'Wetland', 'Settlement', 'Bare', 'Water', 'Permanent snow and ice'],
         fr: ['Irrigated croplands', 'Rainfed croplands', 'Cropland forest mosaic', 'Broadleaved evergreen or semi-deciduous forest', 'Broadleaved deciduous forest', 'Needleleaved evergreen or deciduous forest', 'Mixed broadleaved and needleleaved forest', 'Mosaic of forest, shrubland and grassland', 'Shrubland', 'Grassland', 'Sparse vegetation', 'Flooded broadleaved forest', 'Flooded vegetation', 'Artificial areas', 'Bare areas', 'Permanent snow and ice'],
         es: ['Irrigated croplands', 'Rainfed croplands', 'Cropland forest mosaic', 'Broadleaved evergreen or semi-deciduous forest', 'Broadleaved deciduous forest', 'Needleleaved evergreen or deciduous forest', 'Mixed broadleaved and needleleaved forest', 'Mosaic of forest, shrubland and grassland', 'Shrubland', 'Grassland', 'Sparse vegetation', 'Flooded broadleaved forest', 'Flooded vegetation', 'Artificial areas', 'Bare areas', 'Permanent snow and ice'],
         pt: ['Culturas Irrigadas', 'Rainfed croplands', 'Mosaico de areas florestais e de cultivo', 'Floresta verde ou semi-decídua', 'Floresta decídua de folha larga', 'Floresta verde de coníferas ou Floresta decídua', 'Misto de floresta de conifera e de folha larga"', 'Mosaic of forest, shrubland and grassland', 'Shrubland', 'Grassland', 'Sparse vegetation', 'Flooded broadleaved forest', 'Flooded vegetation', 'Artificial areas', 'Bare areas', 'Permanent snow and ice'],
         id: ['Irrigated croplands', 'Rainfed croplands', 'Cropland forest mosaic', 'Broadleaved evergreen or semi-deciduous forest', 'Broadleaved deciduous forest', 'Needleleaved evergreen or deciduous forest', 'Mixed broadleaved and needleleaved forest', 'Mosaic of forest, shrubland and grassland', 'Shrubland', 'Grassland', 'Sparse vegetation', 'Flooded broadleaved forest', 'Flooded vegetation', 'Artificial areas', 'Bare areas', 'Permanent snow and ice'],
         zh: ['Irrigated croplands', 'Rainfed croplands', 'Cropland forest mosaic', 'Broadleaved evergreen or semi-deciduous forest', 'Broadleaved deciduous forest', 'Needleleaved evergreen or deciduous forest', 'Mixed broadleaved and needleleaved forest', 'Mosaic of forest, shrubland and grassland', 'Shrubland', 'Grassland', 'Sparse vegetation', 'Flooded broadleaved forest', 'Flooded vegetation', 'Artificial areas', 'Bare areas', 'Permanent snow and ice'],
         ka: ['მორწყვადი ს/ს კულტურები', 'წვიმით მორწყვადი კულტურები', 'ს/ს კულტურების და ტყის მოზაიკა', 'ფართოფოთლოვანი მარადმწვანე ან ნახევრად-ფოთოლმცვენი ტყე', 'ფართოფოთლოვანი ფოთოლმცვენი ტყე', 'წიწვოვანი მარადმწვანე ან ფოთოლმცვენი ტყე', 'შერეული ფართოფოთლოვანი და წიწვოვანი ტყე', 'ტყის, ბუჩქნარის და მინდორის მოზაიკა', 'ბუჩქნარი', 'მინდორი', 'მეჩხერი მცენარეულობა', 'დატბორილი ფართოფოთლოვანი ტყე', 'დატბორილი მცენარეულობა', 'სახეცვლილი (ხელოვნური) ადგილები', 'მოშიშვლებული ადგილები', 'მუდმივი თოვლი და ყინული']
       },
       colors: ['#D2A965', '#157764', '#CCDB98', '#596B2C', '#D5C998', '#2789D4', '#E9462B', '#F6F0EA', '#A3DCFF', '#FFFFFF'],
       analysisUrl: 'https://production-api.globalforestwatch.org/v1/loss-by-landcover',
       uiParams: 'none',
       params: [
         {
           name: 'layer',
           value: 'gfw-landcover-2015'
         }
       ]
     },
     // The following configurations will not work because we have not yet
     // build support for configurable layer queries or compute histograms
     // {
     //   analysisId: 'SAD_ALERTS',
     //   label: {
     //     en: 'SAD'
     //   }
     // },
     // {
     //   analysisId: 'LC_LOSS',
     //   label: {
     //     en: 'Land Cover Loss'
     //   }
     // }
   ],

  /**
  * Layer panel configuration, anything with an = is optional, {object=}
  * Order at the group level controls the order of the accordions, the top most accordion's layers
  * will also be the top most layers on the map. The order in the layer level controls how those layers
  * are organized within their own group
  ** @name layerPanel
  ** Both labels and sublabels are objects whose properties are ISO codes for supported languages
  ** and values are string labels
  * @property {object=} label - Label for the group in the layer panel
  * @property {number} order - Order the accordions, and their layers, appear in the UI and the map, MUST START AT 1
  * @property {object[]=} layers - Layers placed in the various accordions
  * @property {object[]=} extraLayers - Layers not placed in the Layer panel but are on the map
  * @property {number} layers[].order - Order of this layer in this section only
  * @property {string} layers[].id - Must be a unique id for the layer
  * @property {string} layers[].type - The type of the layer, valid values are currently one of the following:
  ** tiled | webtiled | image | dynamic | feature | graphic | glad | terra
  * @property {boolean=} layers[].visible - Default visibility of the layer, default is false
  * @property {string} layers[].technicalName - Technical name for the GFW Metadata API
  * @property {number=} layers[].legendLayer - Optional layer id for an extra legend
  * @property {string} layers[].url - URL for the service
  * @property {object=} layers[].label - Label for the layer in the UI
  * @property {object=} layers[].sublabel - Sublabel for the layer in the UI
  * @property {boolean=} layers[].{ANY} - Any additional layer params that need to be passed through
  * @property {object=} popup - Popup configuration for the layer if it is available
  */
  layerPanel: {
    GROUP_WEBMAP: {
      order: 2,
      label: {}, // Configurable via alternativeWebmapMenuName and webmapMenuName above
      layers: [] // Will get filled in with layers from the webmap
    },
    GROUP_LCD: {
      groupType: 'default',
      order: 1,
      label: {
        en: 'Land Cover Dynamics',
        fr: 'Evolution de la couverture des sols',
        es: 'Dinámica de la Cobertura del Suelo',
        pt: 'Dinâmica de cobertura da terra ',
        id: 'Land Cover Dynamics',
        zh: '土地覆盖动态数据',
        ka: 'მიწის საფარის დინამიკა'
      },
      layers: [{
        order: 1,
        id: 'TREE_COVER_LOSS',
        type: 'loss', //image
        url: 'https://storage.googleapis.com/wri-public/Hansen17/tiles/hansen_world/v1/tc30/{z}/{x}/{y}.png',
        // legendLayer: 7,
        minYear: 1,
        maxYear: 17,
        // minDateValue: 15000,
        // maxDateValue: 16365,
        // confidence: [0, 1],
        technicalName: 'tree_cover_loss',
        legendLayer: [0],
        // colormap: [[1, 219, 101, 152]],
        // inputRange: [1, 15],
        // outputRange: [1],
        label: {
          en: 'Tree cover loss',
          fr: 'Perte en couvert arboré',
          es: 'Pérdida de la cobertura arbórea',
          pt: 'Perda de cobertura arbórea',
          id: 'Tree cover loss',
          zh: '森林覆盖损失',
          ka: 'ხის ვარჯის კარგვა'
        },
        sublabel: {
          en: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
          fr: '(annuel, 30m, global, Hansen/UMD/Google/USGS/NASA)',
          es: '(anual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
          pt: '(anual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
          id: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
          zh: '(每年更新, 30米, 全球覆盖, 汉森/马里兰大学/谷歌/美国地质测量局(USGS)/美国宇航局(NASA))',
          ka: '(წლიური, 30მ, გლობალური, Hansen/UMD/Google/USGS/NASA)'
        }
      }, {
        order: 2,
        id: 'TREE_COVER_GAIN',
        type: 'gain', //'image',
        url: 'https://earthengine.google.org/static/hansen_2013/gain_alpha/{z}/{x}/{y}.png',
        technicalName: 'tree_cover_gain',
        legendLayer: [1],
        label: {
          en: 'Tree cover gain',
          fr: 'Gain en couvert arboré',
          es: 'Aumento de la cobertura arbórea',
          pt: 'Ganho de cobertura arbórea',
          id: 'Tree cover gain',
          zh: '森林覆盖增加',
          ka: 'ხის ვარჯის ნამატი'
        },
        sublabel: {
          en: '(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)',
          fr: '(12 ans, 30m, global, Hansen/UMD/Google/USGS/NASA)',
          es: '(12 años, 30m, global, Hansen/UMD/Google/USGS/NASA)',
          pt: '(12 anos, 30m, global, Hansen/UMD/Google/USGS/NASA)',
          id: '(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)',
          zh: '(12 年, 30米, 全球覆盖, 汉森/马里兰大学/谷歌/美国地质测量局(USGS)/美国宇航局(NASA))',
          ka: '(12 წელიწადი, 30მ, გლობალური, Hansen/UMD/Google/USGS/NASA)'
        }
      }, {
        order: 3,
        id: 'IMAZON_SAD',
        type: 'dynamic',
        url: 'https://gis-gfw.wri.org/arcgis/rest/services/forest_change/MapServer',
        technicalName: 'imazon_sad',
        layerIds: [2],
        label: {
          en: 'SAD alerts',
          fr: 'Alertes SAD',
          es: 'Alertas SAD',
          pt: 'Alertas SAD',
          id: 'SAD alerts',
          zh: 'SAD alerts',
          ka: 'SAD შეტყობინებები'
        },
        sublabel: {
          en: '(monthly, 250m, Brazilian Amazon, Imazon)',
          fr: '(mensuel, 250m, Amazonie brésilienne, Imazon)',
          es: '(mensual, 250m, Amazonia brasileña, Imazon)',
          pt: '(mensal, 250m, Amazônia brasileira, Imazon)',
          id: '(monthly, 250m, Brazilian Amazon, Imazon)',
          zh: '(monthly, 250m, Brazilian Amazon, Imazon)',
          ka: '(ყოველთვიური, 250მ, ბრაზილიის ამაზონია, Imazon)'
        }
      }, {
        order: 4,
        id: 'GLAD_ALERTS',
        type: 'glad',
        url: 'https://tiles.globalforestwatch.org/glad_prod/tiles/{z}/{x}/{y}.png',
        technicalName: 'umd_landsat_alerts',
        legendLayer: [7],
        minDateValue: 15000,
        maxDateValue: 999999,
        confidence: [0, 1],
        label: {
          en: 'GLAD Alerts',
          fr: 'Alertes GLAD',
          es: 'Alertas GLAD',
          pt: 'Alertas GLAD',
          id: 'GLAD Alerts',
          zh: 'GLAD Alerts',
          ka: 'GLAD შეტყობინებები'
        },
        sublabel: {
          en: '(weekly, 30m, select countries, UMD/ GLAD)',
          fr: '(hebdomadaire, 30m, certains pays, UMD/ GLAD)',
          es: '(semanal, 30m, select countries, UMD/ GLAD)',
          pt: '(semanal, 30m, select countries, UMD/ GLAD)',
          id: '(weekly, 30m, select countries, UMD/ GLAD)',
          zh: '(weekly, 30m, select countries, UMD/ GLAD)',
          ka: '(ყოველკვირეული, 30მ, აარჩიეთ ქვეყნები, UMD/ GLAD)'
        }
      }, {
        order: 5,
        id: 'FORMA_ALERTS',
        type: 'forma',
        url: 'https://storage.googleapis.com/forma-public/Forma250/tiles/forma_20180128/v1/{z}/{x}/{y}.png',
        technicalName: 'forma_250_active_clearing_alerts',
        legendLayer: [27],
        minDateValue: 12000,
        maxDateValue: 999999,
        label: {
          en: 'FORMA 250',
          fr: 'FORMA 250',
          es: 'FORMA 250',
          pt: 'FORMA 250',
          id: 'FORMA 250',
          zh: 'FORMA 250',
          ka: 'FORMA 250'
        },
      }, {
        order: 6,
        id: 'TERRA_I_ALERTS',
        type: 'terra',
        url: 'https://wri-tiles.s3.amazonaws.com/terrai_prod/tiles/{z}/{x}/{y}.png',
        technicalName: 'terra_i_alerts',
        legendLayer: [13],
        maxZoom: 10,
        minDateValue: 4000, //We know data starts in 2004
        // We are setting this way over max, the max date will get set set when TerraIControls mounts
        // We set this over max so all data is visible by default, and it will update the dates when available
        maxDateValue: 20000,
        imageServer: 'https://gis-gfw.wri.org/arcgis/rest/services/image_services/terrai_analysis/ImageServer',
        label: {
          en: 'Terra-I Alerts',
          fr: 'Alertes Terra-I',
          es: 'Alertas Terra-I',
          pt: 'Alertas Terra-I',
          id: 'Terra-I Alerts',
          zh: 'Terra-I Alerts',
          ka: 'Terra-I შეტყობინებები'
        },
        sublabel: {
          en: '(monthly, 250m, Latin America, CIAT)',
          fr: '(mensuel, 250m, Amérique Latine, CIAT)',
          es: '(mensual, 250m, Latin America, CIAT)',
          pt: '(Mensal, 250m, Latin America, CIAT)',
          id: '(monthly, 250m, Latin America, CIAT)',
          zh: '(monthly, 250m, Latin America, CIAT)',
          ka: '(ყოველთვიური, 250მ, ლათინური ამერიკა, CIAT)'
        }
      }, {
        order: 7,
        id: 'VIIRS_ACTIVE_FIRES',
        type: 'dynamic',
        url: 'https://gis-gfw.wri.org/arcgis/rest/services/Fires/FIRMS_Global/MapServer',
        technicalName: 'viirs_fires',
        layerIds: [8],
        label: {
          en: 'VIIRS Active Fires',
          fr: 'Feux actifs',
          es: 'Incendios activos',
          pt: 'Incêndios ativos',
          id: 'Active fires',
          zh: '活跃火点',
          ka: 'VIIRS აქტიური ხანძრები'
        },
        sublabel: {
          en: '(daily, 375m, global, NASA)',
          fr: '(journalier, 375m, global, NASA)',
          es: '(Diaria, 375m, global, NASA)',
          pt: '(Diária, 375m, global, NASA)',
          id: '(daily, 375m, global, NASA)',
          zh: '(每天更新, 375米, 全球覆盖, 美国宇航局（NASA))',
          ka: '(ყოველდღიური, 375მ, გლობალური, NASA)'
        },
        popup: {
          title: {
            en: 'Active Fires'
          },
          content: {
            en: [
              { 'label': 'Brightness', 'fieldExpression': 'BRIGHTNESS' },
              { 'label': 'Confidence', 'fieldExpression': 'CONFIDENCE' },
              { 'label': 'Latitude', 'fieldExpression': 'LATITUDE' },
              { 'label': 'Longitude', 'fieldExpression': 'LONGITUDE' },
              { 'label': 'Acquisition Date', 'fieldExpression': 'ACQ_DATE:DateString(hideTime:true)' },
              { 'label': 'Acquisition Time', 'fieldExpression': 'ACQ_TIME' }
            ]
          },
          sublabel: {
            en: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            fr: '(annuel, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            es: '(anual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            pt: '(anual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            id: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            zh: '(每年更新, 30米, 全球覆盖, 汉森/马里兰大学/谷歌/美国地质测量局(USGS)/美国宇航局(NASA))',
            ka: '(წლიური, 30მ, გლობალური, Hansen/UMD/Google/USGS/NASA)'
          }
        }
      }, {
        order: 8,
        id: 'MODIS_ACTIVE_FIRES',
        type: 'dynamic',
        url: 'https://gis-gfw.wri.org/arcgis/rest/services/Fires/FIRMS_Global/MapServer',
        technicalName: 'firms_active_fires',
        layerIds: [9],
        label: {
          en: 'MODIS Active Fires',
          fr: 'Feux actifs',
          es: 'Incendios activos',
          pt: 'Incêndios ativos',
          id: 'Active fires',
          zh: '活跃火点',
          ka: 'MODIS აქტიური ხანძრები'
        },
        sublabel: {
          en: '(daily, 1km, global, NASA)',
          fr: '(journalier, 1km, global, NASA)',
          es: '(Diaria, 1km, global, NASA)',
          pt: '(Diária, 1km, global, NASA)',
          id: '(daily, 1km, global, NASA)',
          zh: '(每天更新, 1千米, 全球覆盖, 美国宇航局（NASA))',
          ka: '(ყოველდღიური, 1კმ, გლობალური, NASA)'
        },
        popup: {
          title: {
            en: 'Active Fires'
          },
          content: {
            en: [
              { 'label': 'Brightness', 'fieldExpression': 'BRIGHTNESS' },
              { 'label': 'Confidence', 'fieldExpression': 'CONFIDENCE' },
              { 'label': 'Latitude', 'fieldExpression': 'LATITUDE' },
              { 'label': 'Longitude', 'fieldExpression': 'LONGITUDE' },
              { 'label': 'Acquisition Date', 'fieldExpression': 'ACQ_DATE:DateString(hideTime:true)' },
              { 'label': 'Acquisition Time', 'fieldExpression': 'ACQ_TIME' }
            ]
          },
          sublabel: {
            en: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            fr: '(annuel, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            es: '(anual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            pt: '(anual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            id: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            zh: '(每年更新, 30米, 全球覆盖, 汉森/马里兰大学/谷歌/美国地质测量局(USGS)/美国宇航局(NASA))',
            ka: '(წლიური, 30მ, გლობალური, Hansen/UMD/Google/USGS/NASA)'
          }
        }
      }, {
        order: 9,
        type: 'remoteDataLayer',
        uuid: 'f2c6a12e-cbc6-481c-88d8-065ddb989d67'
      }]
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
        zh: '土地覆盖',
        ka: 'მიწის საფარი'
      },
      layers: [{
        order: 1,
        id: 'GLOB_MANGROVE',
        type: 'webtiled',
        url: 'http://{subDomain}.ashbu.cartocdn.com/wri-01/api/v1/map/209485bfcb3eafb435befa0c405242ae:1467735931596/0/{level}/{col}/{row}.png',
        subDomains: [0, 1, 2, 3],
        technicalName: 'global_mangroves',
        legendLayer: [11],
        label: {
          en: 'Global Mangrove',
          fr: 'Global Mangrove',
          es: 'Global Mangrove',
          pt: 'Global Mangrove',
          id: 'Global Mangrove',
          zh: 'Global Mangrove',
          ka: 'გლობალური მანგრები'
        }
      }, {
        order: 2,
        id: 'IFL',
        type: 'dynamic',
        url: 'https://gis-gfw.wri.org/arcgis/rest/services/forest_cover/MapServer',
        technicalName: 'intact_forest_landscapes_change',
        layerIds: [0],
        label: {
          en: 'Intact Forest Landscape',
          fr: 'Paysage forestier intact',
          es: 'Paisajes Forestales Intactos',
          pt: 'Paisagens Florestais Intactas',
          id: 'Intact Forest Landscape',
          zh: '原生森林景观',
          ka: 'ხელუხლებელი ტყის ლანდშაფტი'
        }
      }, {
        order: 3,
        id: 'AG_BIOMASS',
        type: 'image',
        url: 'https://gis-gfw.wri.org/arcgis/rest/services/image_services/whrc_carbon_tcd/ImageServer',
        technicalName: 'aboveground_biomass',
        legendLayer: [8],
        label: {
          en: 'Aboveground Live Woody Biomass Density',
          fr: 'Densité de la biomasse aérienne vivante',
          es: 'Densidad de la biomasa viva en la superficie del suelo',
          pt: 'Densidade de biomassa viva acima do solo',
          id: 'Aboveground Live Woody Biomass Density',
          zh: 'Aboveground Live Woody Biomass Density',
          ka: 'მიწისზედა ცოცხალი ტყის ბიომასის სიხშირე'
        }
      }, {
        order: 4,
        id: 'LAND_COVER',
        type: 'webtiled',
        url: 'https://wri-tiles.s3.amazonaws.com/global-landcover/{level}/{col}/{row}.png',
        technicalName: 'global_landcover',
        legendLayer: [15],
        rasterId: '$568',
        bounds: [1, 16],
        classes: {
          en: ['Land Cover', 'Agriculture', 'Forest', 'Grassland', 'Shrubland', 'Sparse vegetation', 'Wetland', 'Settlement', 'Bare', 'Water', 'Permanent snow and ice'],
          fr: ['Irrigated croplands', 'Rainfed croplands', 'Cropland forest mosaic', 'Broadleaved evergreen or semi-deciduous forest', 'Broadleaved deciduous forest', 'Needleleaved evergreen or deciduous forest', 'Mixed broadleaved and needleleaved forest', 'Mosaic of forest, shrubland and grassland', 'Shrubland', 'Grassland', 'Sparse vegetation', 'Flooded broadleaved forest', 'Flooded vegetation', 'Artificial areas', 'Bare areas', 'Permanent snow and ice'],
          es: ['Irrigated croplands', 'Rainfed croplands', 'Cropland forest mosaic', 'Broadleaved evergreen or semi-deciduous forest', 'Broadleaved deciduous forest', 'Needleleaved evergreen or deciduous forest', 'Mixed broadleaved and needleleaved forest', 'Mosaic of forest, shrubland and grassland', 'Shrubland', 'Grassland', 'Sparse vegetation', 'Flooded broadleaved forest', 'Flooded vegetation', 'Artificial areas', 'Bare areas', 'Permanent snow and ice'],
          pt: ['Culturas Irrigadas', 'Rainfed croplands', 'Mosaico de areas florestais e de cultivo', 'Floresta verde ou semi-decídua', 'Floresta decídua de folha larga', 'Floresta verde de coníferas ou Floresta decídua', 'Misto de floresta de conifera e de folha larga"', 'Mosaic of forest, shrubland and grassland', 'Shrubland', 'Grassland', 'Sparse vegetation', 'Flooded broadleaved forest', 'Flooded vegetation', 'Artificial areas', 'Bare areas', 'Permanent snow and ice'],
          id: ['Irrigated croplands', 'Rainfed croplands', 'Cropland forest mosaic', 'Broadleaved evergreen or semi-deciduous forest', 'Broadleaved deciduous forest', 'Needleleaved evergreen or deciduous forest', 'Mixed broadleaved and needleleaved forest', 'Mosaic of forest, shrubland and grassland', 'Shrubland', 'Grassland', 'Sparse vegetation', 'Flooded broadleaved forest', 'Flooded vegetation', 'Artificial areas', 'Bare areas', 'Permanent snow and ice'],
          zh: ['Irrigated croplands', 'Rainfed croplands', 'Cropland forest mosaic', 'Broadleaved evergreen or semi-deciduous forest', 'Broadleaved deciduous forest', 'Needleleaved evergreen or deciduous forest', 'Mixed broadleaved and needleleaved forest', 'Mosaic of forest, shrubland and grassland', 'Shrubland', 'Grassland', 'Sparse vegetation', 'Flooded broadleaved forest', 'Flooded vegetation', 'Artificial areas', 'Bare areas', 'Permanent snow and ice'],
          ka: ['მორწყვადი ს/ს კულტურები', 'წვიმით მორწყვადი კულტურები', 'ს/ს კულტურების და ტყის მოზაიკა', 'ფართოფოთლოვანი მარადმწვანე ან ნახევრად-ფოთოლმცვენი ტყე', 'ფართოფოთლოვანი ფოთოლმცვენი ტყე', 'წიწვოვანი მარადმწვანე ან ფოთოლმცვენი ტყე', 'შერეული ფართოფოთლოვანი და წიწვოვანი ტყე', 'ტყის, ბუჩქნარის და მინდორის მოზაიკა', 'ბუჩქნარი', 'მინდორი', 'მეჩხერი მცენარეულობა', 'დატბორილი ფართოფოთლოვანი ტყე', 'დატბორილი მცენარეულობა', 'სახეცვლილი (ხელოვნური) ადგილები', 'მოშიშვლებული ადგილები', 'მუდმივი თოვლი და ყინული']
        },
        colors: ['#D2A965', '#157764', '#CCDB98', '#596B2C', '#D5C998', '#2789D4', '#E9462B', '#F6F0EA', '#A3DCFF', '#FFFFFF'],
        label: {
          en: 'Land Cover',
          fr: 'Couverture des sols',
          es: 'Cobertura vegetal',
          pt: 'Land cover',
          id: 'Land cover',
          zh: '土地覆盖',
          ka: 'მიწის საფარი'
        }
      }, {
        order: 5,
        id: 'TREE_COVER',
        type: 'image',
        url: 'https://gis-treecover.wri.org/arcgis/rest/services/TreeCover2000/ImageServer',
        technicalName: 'tree_cover',
        colormap: [[1, 0, 179, 0]],
        inputRange: [30, 101],
        outputRange: [1],
        opacity: 0.8,
        legendLayer: [2],
        label: {
          en: 'Tree cover density',
          fr: 'Densité du couvert arboré',
          es: 'Densidad de follaje',
          pt: 'Tree cover density',
          id: 'Tree cover density',
          zh: '森林覆盖密度',
          ka: 'ხის ვარჯის სიხშირე'
        },
        sublabel: {
          en: '(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)',
          fr: '(année 2000, 30m global, Hansen/UMD/Google/USGS/NASA)',
          es: '(2000, 30m, global, Hansen/UMD/Google/USGS/NASA)',
          pt: '(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)',
          id: '(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)',
          zh: '(2000年, 30米 全球覆盖, 汉森/马里兰大学/谷歌/美国地质测量局(USGS)/美国宇航局(NASA))',
          ka: '(2000 წ, 30მ გლობალური, Hansen/UMD/Google/USGS/NASA)'
        }
      }]
    },
    GROUP_BASEMAP: {
      groupType: 'basemap',
      order: 200,
      label: {
        en: 'Basemap',
        fr: 'Basemap',
        es: 'Basemap',
        pt: 'Basemap',
        id: 'Basemap',
        zh: 'Basemap',
        ka: 'საბაზო რუკა'
      },
      layers: [{
        id: 'landsat',
        thumbnailUrl: 'https://my.gfw-mapbuilder.org/img/basemaps-sdd18a411a3-5bf18f445e58b8766f773184b7741c67.png',
        templateUrl: 'https://d2h71bpqsyf4vw.cloudfront.net/2016/${level}/${col}/${row}.png',
        years: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'],
        title: {
          en: 'Landsat',
          fr: 'Landsat',
          es: 'Landsat',
          pt: 'Landsat',
          id: 'Landsat',
          zh: 'Landsat',
          ka: 'Landsat'
        }
      }, {
        id: 'wri_mono',
        thumbnailUrl: 'https://my.gfw-mapbuilder.org/img/wri_mono.png',
        // thumbnailUrl: './css/images/wri_mono.png',
        title: {
          en: 'WRI Mono',
          fr: 'WRI Mono',
          es: 'WRI Mono',
          pt: 'WRI Mono',
          id: 'WRI Mono',
          zh: 'WRI Mono',
          ka: 'WRI Mono'
        }
      }, {
        id: 'wri_contextual',
        thumbnailUrl: 'https://my.gfw-mapbuilder.org/img/wri_contextual.png',
        // thumbnailUrl: './css/images/wri_contextual.png',
        title: {
          en: 'WRI Contextual',
          fr: 'WRI Contextual',
          es: 'WRI Contextual',
          pt: 'WRI Contextual',
          id: 'WRI Contextual',
          zh: 'WRI Contextual',
          ka: 'WRI Contextual'
        }
      }]
    },

    /**
    * CUSTOM GROUPS
    * Add your custom groups below. The custom groups are similar to the groups defined above.
    * They are an object defined with a unique key (this key MUST be unique).
    * There are three (3) group types that you may choose from:
    *    checkbox - This is a standard group type with checkboxes to turn layers on and off.
    *               With this group type, more than one layer may be on at a time
    *
    *    radio - This group contains raio buttons instead of checkboxes for the layer toggles
    *            Only one layer may be on at a time within the same group
    *            You may optionally choose to turn this group off when any other radio group is selected
    *
    *    nested - This group allows for layers to be grouped further within a layer panel
    *
    * COMMON GROUP PROPERTIES
    * @property {string} groupType - the group type, one of checkbox, radio, nested
    * @property {number} order - the order of the group in the layer panel
    * @property {object} label - the label for the group in the layer panel
    * @property {object[]} layers - the layers to be placed in the group
    * @property {string} layers[].id - the id of the layer as generated by your AGOL webmap
    * @property {number} layers[].order - the order of the layer within the group
    * @property {object=} layers[].sublabel - the sublabel displayed under the layer name
    *
    * RADIO GROUP PROPERTIES
    * @property {object[]} layers[].includedSublayers - for a dynamic layer, this is which
    * sublayers you would like to include in the group. This property is required, so if you
    * wish to include all sublayers, you must still provide this property with all sublayers
    * @property {object} sublabel - for a dynamic layer the sublabel property must specify
    * which sublayer the sublabel belongs to
    *
    * NESTED GROUP PROPERTIES
    * @property {number} layers[].order - the order of the nested group within the panel group
    * @property {object} layers[].label - the label for the nested group
    * @property {object[]} layers[].nestedLayers - the layers for the nested group
    */

    extraLayers: [
      {
        id: 'MASK',
        type: 'dynamic',
        order: 10000,
        url: 'https://gis.forest-atlas.org/server/rest/services/country_masks/country_mask_global/MapServer',
        opacity: 0.35,
        layerIds: [0]
      },
      {
        id: 'LEGEND_LAYER',
        type: 'dynamic',
        url: 'https://gis-gfw.wri.org/arcgis/rest/services/legends/MapServer',
        visible: false,
        opacity: 0,
        layerIds: []
      },
      {
        id: 'USER_FEATURES',
        type: 'graphic',
        visible: true
      }
    ]
  }
};
