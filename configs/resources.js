export default {
  webmap: 'de85e3fcc07948238aa6c1afd2a4ceb0',
  title: 'GFW Mapbuilder',
  subtitle: 'Make maps that matter',
  logoUrl: 'https://my.gfw-mapbuilder.org/img/gfw-logo.png',
  logoLinkUrl: 'https://www.gfw-mapbuilder.org/',
  aboutLinkUrl: '',
  downloadLinkUrl: '',
  printServiceUrl: 'https://gis.forest-atlas.org/server/rest/services/print/ExportWebMap/GPServer/Export%20Web%20Map',
  maskServiceUrl: '',
  mapThemeIds: '',
  mapThemes: '',
  narrative: '',
  hideHeader: false,
  hideFooter: false,
  includeMyGFWLogin: true,
  navLinksInNewTab: false,
  customColorTheme: '',
  language: 'en',
  useAlternativeLanguage: false,
  alternativeWebmap: '',
  alternativeLanguage: 'fr',
  alternativeLanguageTitle: 'GFW Mapbuilder',
  alternativeLanguageSubtitle: 'Make maps that matter',
  alternativeMapThemes: '',
  alternativeNarrative: '',
  alternativeWebmapMenuName: 'Land Use',
  initialExtent: {
    x: null,
    y: null,
    z: null
  },
  includeDocumentsTab: false,
  iso: '',
  viirsFires: true,
  modisFires: true,
  intactForests: true,
  primaryForests: true,
  forma: false,
  aboveGroundBiomass: true,
  landCover: true,
  mangroves: false,
  sadAlerts: false,
  gladAlerts: true,
  gfwIntegratedAlertLayer: true,
  recentImagery: true,
  carbonSequence: true,
  carbonEmissions: true,
  treeCoverHeight: false,
  treeCover: true,
  treeCoverGain: true,
  treeCoverLoss: true,
  treeMosaicLandscapes: true,
  webmapMenuName: 'Land Use',
  sharinghost: 'https://www.arcgis.com',
  analyticsCode: '',
  includeCartoTemplateLayers: false,
  cartoUser: 'wri-01',
  cartoTemplateId: 'tpl_07c315f8_c13e_11e4_b457_0e8dde98a187',
  cartoApiKey: 'your key here',
  cartoGroupLabel: {
    en: 'Carto Layers',
    fr: 'Carto Layers'
  },
  enabledRWLayers: ['DRY_SPELLS', 'AIR_QUALITY', 'WIND_SPEED'], //'DRY_SPELLS', 'AIR_QUALITY', 'WIND_SPEED'
  disabledAnalysisModules: [], //'VIIRS_FIRES', 'GLAD_ALERTS', 'TC_LOSS', 'IFL', 'LCC'
  layerPanel: {
    GROUP_WEBMAP: {
      order: 2,
      label: {},
      layers: []
    },
    GROUP_CLIMATE: {
      groupType: 'default',
      order: 4,
      label: {
        en: 'Climate',
        fr: 'Climat',
        es: 'Clima',
        pt: 'Clima',
        id: 'Iklim',
        zh: '气候',
        ka: 'კლიმატი',
        hy: 'Կլիմա',
        az: 'İqlim',
        nl: 'Klimaat'
      },
      layers: [
        {
          id: 'CARBON_SEQ',
          order: 1,
          type: 'remoteDataLayer',
          uuid: 'e7208398-0acd-4f73-a824-c4fe1e356e0c'
        },
        {
          id: 'CARBON_EMISSIONS',
          order: 2,
          type: 'remoteDataLayer',
          uuid: '6d989ac9-ab57-4f95-8475-2e747a3adc10'
        },
        {
          groupId: 'GROUP_CLIMATE',
          id: 'DRY_SPELLS',
          datasetURL: 'https://data-api.globalforestwatch.org/dataset/nexgddp_change_dry_spells_2000_2080/latest',
          datasetLegendConfigURL:
            'https://api.resourcewatch.org/v1/layer/7c497efb-1671-49bf-87a2-3c96ddb9ff88?filterIncludesByEnv=true&includes=vocabulary,metadata&env=production',
          type: 'resourcewatch',
          order: 3,
          origin: 'rw-api',
          opacity: 1,
          sublabel: {
            en: '(0.25°, global, 2000-2080, WRI/Vizzuality)',
            es: '(0.25°, global, 2000-2080, WRI/Vizzuality)',
            fr: '(0.25°, global, 2000-2080, WRI/Vizzuality)',
            id: '(0.25°, global, 2000-2080, WRI/Vizzuality)',
            ka: '(0.25°, global, 2000-2080, WRI/Vizzuality)',
            pt: '(0.25°, global, 2000-2080, WRI/Vizzuality)',
            zh: '(0.25°, global, 2000-2080, WRI/Vizzuality)'
          },
          uiParams: {
            inputType: 'datepicker',
            defaultDate: [2030],
            defaultMarks: {
              '2030': {
                label: '2030',
                style: {}
              },
              '2050': {
                label: '2050',
                style: {}
              },
              '2080': {
                label: '2080',
                style: {}
              }
            },
            minDate: 2030,
            maxDate: 2080,
            steps: 50,
            included: false
          }
        },
        {
          groupId: 'GROUP_CLIMATE',
          id: 'AIR_QUALITY',
          datasetURL: 'https://data-api.globalforestwatch.org/dataset/tropomi_avg_nitrogen_dioxide_last_month/latest',
          datasetLegendConfigURL:
            'https://api.resourcewatch.org/v1/layer/61989f1f-65af-40e7-bf45-49b27eb2b9da?filterIncludesByEnv=true&includes=vocabulary,metadata&env=production',
          type: 'resourcewatch',
          order: 4,
          origin: 'rw-api',
          opacity: 1,
          sublabel: {
            en: '(3.5 x 5.5 km, global, 2018, TROPOMI/ESA/KNMI/DLR/SRON/BIRA-IASB/STFC/MPIC/S&T/Uni-Bremen)',
            es: '(3.5 x 5.5 km, global, 2018, TROPOMI/ESA/KNMI/DLR/SRON/BIRA-IASB/STFC/MPIC/S&T/Uni-Bremen)',
            fr: '(3.5 x 5.5 km, global, 2018, TROPOMI/ESA/KNMI/DLR/SRON/BIRA-IASB/STFC/MPIC/S&T/Uni-Bremen)',
            id: '(3.5 x 5.5 km, global, 2018, TROPOMI/ESA/KNMI/DLR/SRON/BIRA-IASB/STFC/MPIC/S&T/Uni-Bremen)',
            ka: '(3.5 x 5.5 km, global, 2018, TROPOMI/ESA/KNMI/DLR/SRON/BIRA-IASB/STFC/MPIC/S&T/Uni-Bremen)',
            pt: '(3.5 x 5.5 km, global, 2018, TROPOMI/ESA/KNMI/DLR/SRON/BIRA-IASB/STFC/MPIC/S&T/Uni-Bremen)',
            zh: '(3.5 x 5.5 km, global, 2018, TROPOMI/ESA/KNMI/DLR/SRON/BIRA-IASB/STFC/MPIC/S&T/Uni-Bremen)'
          }
        },
        {
          groupId: 'GROUP_CLIMATE',
          id: 'WIND_SPEED',
          datasetURL: 'https://data-api.globalforestwatch.org/dataset/dtu_wb_wind_speed_potential_2001_2010/latest',
          datasetLegendConfigURL:
            'https://api.resourcewatch.org/v1/layer/1ae1f58f-569d-4a21-9835-3e9bdd93759b?filterIncludesByEnv=true&includes=vocabulary,metadata&env=production',
          type: 'resourcewatch',
          order: 5,
          origin: 'rw-api',
          opacity: 1,
          sublabel: {
            en: '(1 km, global, DTU/World Bank Group/ESMAP)',
            es: '(1 km, global, DTU/World Bank Group/ESMAP)',
            fr: '(1 km, global, DTU/World Bank Group/ESMAP)',
            id: '(1 km, global, DTU/World Bank Group/ESMAP)',
            ka: '(1 km, global, DTU/World Bank Group/ESMAP)',
            pt: '(1 km, global, DTU/World Bank Group/ESMAP)',
            zh: '(1 km, global, DTU/World Bank Group/ESMAP)'
          }
        }
      ]
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
      layers: [
        {
          id: 'TREE_COVER_LOSS',
          order: 2,
          type: 'remoteDataLayer',
          uuid: '2aed67b3-3643-40d3-9c1e-8af9afb5d9e2',
          uiParams: {
            inputType: 'datepicker',
            defaultDate: [2000, 2020],
            defaultMarks: {
              '2000': {
                label: '2000',
                style: {}
              },
              '2001': {
                label: '2001',
                style: { display: 'none' }
              },
              '2002': {
                label: '2002',
                style: { display: 'none' }
              },
              '2003': {
                label: '2003',
                style: { display: 'none' }
              },
              '2004': {
                label: '2004',
                style: { display: 'none' }
              },
              '2005': {
                label: '2005',
                style: {}
              },
              '2006': {
                label: '2006',
                style: { display: 'none' }
              },
              '2007': {
                label: '2007',
                style: { display: 'none' }
              },
              '2008': {
                label: '2008',
                style: { display: 'none' }
              },
              '2009': {
                label: '2009',
                style: { display: 'none' }
              },
              '2010': {
                label: '2010',
                style: {}
              },
              '2011': {
                label: '2011',
                style: { display: 'none' }
              },
              '2012': {
                label: '2012',
                style: { display: 'none' }
              },
              '2013': {
                label: '2013',
                style: { display: 'none' }
              },
              '2014': {
                label: '2014',
                style: { display: 'none' }
              },
              '2015': {
                label: '2015',
                style: {}
              },
              '2016': {
                label: '2016',
                style: { display: 'none' }
              },
              '2017': {
                label: '2017',
                style: { display: 'none' }
              },
              '2018': {
                label: '2018',
                style: { display: 'none' }
              },
              '2019': {
                label: '2019',
                style: { display: 'none' }
              },
              '2020': {
                label: '2020',
                style: {}
              }
            },
            minDate: 2000,
            maxDate: 2020,
            steps: 1,
            included: true
          }
        },
        {
          id: 'TREE_COVER_GAIN',
          order: 3,
          type: 'remoteDataLayer',
          uuid: 'cb016f17-f12d-463a-9dc2-aabcf5db566c'
        },
        {
          id: 'IMAZON_SAD',
          order: 4,
          type: 'remoteDataLayer',
          uuid: '3e9e86ae-e38d-4c59-8484-c8214ca5186a'
        },
        {
          id: 'FORMA_ALERTS',
          order: 5,
          type: 'remoteDataLayer',
          uuid: '56aa7e57-0ac4-446c-a82d-7713904b17c3'
        },
        {
          id: 'GLAD_ALERTS',
          order: 6,
          type: 'remoteDataLayer',
          uuid: '356f862b-3e70-493a-997b-dc2a193410e9'
        },
        {
          id: 'TERRA_I_ALERTS',
          order: 7,
          type: 'remoteDataLayer',
          uuid: '1fc7b0c5-259a-4685-8665-b2f1ed3f808f'
        },
        {
          id: 'VIIRS_ACTIVE_FIRES',
          order: 8,
          type: 'remoteDataLayer',
          uuid: '6d316908-92c8-4f95-8598-f2a0c72786af'
        },
        {
          id: 'MODIS_ACTIVE_FIRES',
          order: 9,
          type: 'remoteDataLayer',
          uuid: '8ae39d34-a5e5-4742-b06e-6e913a8f1eb8'
        },
        {
          id: 'GFW_INTEGRATED_ALERTS',
          order: 10,
          type: 'remoteDataLayer',
          uuid: 'bd58f25d-d3bb-4d59-9daa-cecddd27d9f4',
          uiParams: {
            inputType: 'datepicker',
            defaultDate: [2030],
            defaultMarks: {
              '0': {
                value: '0',
                label: '2020-03-31',
                style: {}
              },
              '365': {
                value: '365',
                label: '2021-03-31',
                style: {}
              },
              '730': {
                value: '730',
                label: '2022-03-31',
                style: {}
              }
            },
            minDate: new Date(2020, 3, 3),
            maxDate: new Date(2022, 3, 3),
            steps: 33,
            included: true,
            type: 'gfw-integrated-alert'
          }
        },
        {
          id: 'GLAD_S2_ALERTS',
          order: 11,
          type: 'remoteDataLayer',
          uuid: '3b869953-48c4-48d0-8023-5c64a311f3dd'
        },
        {
          id: 'RADD_ALERTS',
          order: 12,
          type: 'remoteDataLayer',
          uuid: '440e53d0-36b3-47ad-993a-1c2018c3942c'
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
        zh: '土地覆盖',
        ka: 'მიწის საფარი'
      },
      layers: [
        {
          id: 'IFL',
          order: 2,
          type: 'remoteDataLayer',
          uuid: '5f815a7d-457e-4eae-a8e5-8864a60696ad'
        },
        {
          id: 'PRIMARY_FORESTS',
          order: 3,
          type: 'remoteDataLayer',
          uuid: 'edffb745-e523-462d-ad1e-3052006a3dbc'
        },
        {
          id: 'AG_BIOMASS',
          order: 4,
          type: 'remoteDataLayer',
          uuid: '04526d47-f3f5-4f76-a939-e5f7861fd085'
        },
        {
          id: 'LAND_COVER',
          order: 5,
          type: 'remoteDataLayer',
          uuid: 'b8d3f175-0565-443f-839a-49eb890a4b3d'
        },
        {
          id: 'TREE_COVER',
          order: 6,
          type: 'remoteDataLayer',
          uuid: '2569adca-ef87-42c4-a153-57c5e8ba0ef7'
        },
        {
          groupId: 'GROUP_LC',
          id: 'TREE_COVER_HEIGHT',
          order: 7,
          type: 'flagship',
          uuid: '9efed1d8-164d-4adb-85a1-e62c6c5c00aa',
          origin: 'gfw-api',
          layerType: 'tree-cover-height',
          opacity: 1,
          label: {
            en: 'Tree cover height',
            es: 'Tree cover height',
            fr: 'Tree cover height',
            id: 'Tree cover height',
            ka: 'Tree cover height',
            pt: 'Tree cover height',
            zh: 'Tree cover height'
          },
          sublabel: {
            en: '2019, 30m, global, UMD/NASA GEDI',
            es: '2019, 30m, global, UMD/NASA GEDI',
            fr: '2019, 30m, global, UMD/NASA GEDI',
            id: '2019, 30m, global, UMD/NASA GEDI',
            ka: '2019, 30m, global, UMD/NASA GEDI',
            pt: '2019, 30m, global, UMD/NASA GEDI',
            zh: '2019, 30m, global, UMD/NASA GEDI'
          },
          legend: {
            name: {
              en: 'Tree cover height',
              es: 'Tree cover height',
              fr: 'Tree cover height',
              id: 'Tree cover height',
              ka: 'Tree cover height',
              pt: 'Tree cover height',
              zh: 'Tree cover height'
            },
            type: 'gradient',
            items: [
              {
                color: '#bbffb8',
                value: '3m',
                name: {
                  en: '3m',
                  es: '3m',
                  fr: '3m',
                  id: '3m',
                  ka: '3m',
                  pt: '3m',
                  zh: '3m'
                }
              },
              {
                color: '#045200',
                value: '30m',
                name: {
                  en: '30m',
                  es: '30m',
                  fr: '30m',
                  id: '30m',
                  ka: '30m',
                  pt: '30m',
                  zh: '30m'
                }
              }
            ]
          }
        },
        {
          id: 'TREES_MOSAIC_LANDSCAPES',
          order: 8,
          type: 'remoteDataLayer',
          uuid: '9e0c1e1e-a0a3-457f-a373-4104820f7a50'
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
          visible: false,
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
      layers: [
        {
          id: 'landsat',
          thumbnailUrl: 'https://my.gfw-mapbuilder.org/img/basemaps-sdd18a411a3-5bf18f445e58b8766f773184b7741c67.png',
          templateUrl: 'https://d2h71bpqsyf4vw.cloudfront.net/2016/${level}/${col}/${row}.png',
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
          id: 'wri_mono',
          thumbnailUrl: 'https://my.gfw-mapbuilder.org/img/wri_mono.png',
          title: {
            en: 'WRI Mono',
            fr: 'WRI Mono',
            es: 'WRI Mono',
            pt: 'WRI Mono',
            id: 'WRI Mono',
            zh: 'WRI Mono',
            ka: 'WRI Mono'
          }
        },
        {
          id: 'wri_contextual',
          thumbnailUrl: 'https://my.gfw-mapbuilder.org/img/wri_contextual.png',
          title: {
            en: 'WRI Contextual',
            fr: 'WRI Contextual',
            es: 'WRI Contextual',
            pt: 'WRI Contextual',
            id: 'WRI Contextual',
            zh: 'WRI Contextual',
            ka: 'WRI Contextual'
          }
        },
        {
          id: 'planet',
          thumbnailUrl: 'https://my.gfw-mapbuilder.org/img/wri_mono.png',
          url: 'https://tiles.globalforestwatch.org/planet/v1/planet_medres_normalized_analytic/{z}/{x}/{y}.png',
          apiKey: '90f59f82-8d32-46e4-accb-f8d7f35b309a',
          visible: true,
          title: {
            en: 'Planet',
            fr: 'Planet',
            es: 'Planet',
            pt: 'Planet',
            id: 'Planet',
            zh: 'Planet',
            ka: 'Planet'
          }
        }
      ]
    },
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
