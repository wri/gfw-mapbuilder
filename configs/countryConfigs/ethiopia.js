export default {
  webmap: '0ef9a90ee2cb48bb9b66bbcc6831278e',
  title: 'ETHIOPIA TREE-BASED LANDSCAPE RESTORATION POTENTIAL ATLAS',
  subtitle: 'Ministry of Environment, Forest \u0026 Climate Change',
  webmapMenuName: 'Restoration Potential',
  logoUrl:
    'https://assets.forest-atlas.org/eth/img/logo/Coat_of_arms_of_Ethiopia.png',
  logoLinkUrl: 'http://mefcc.gov.et/',
  printServiceUrl:
    'https://gis.forest-atlas.org/server/rest/services/print/ExportWebMap/GPServer/Export%20Web%20Map',
  narrative:
    '\u003cp\u003eThis interface shows the extent of combined potential for tree-based landscape restoration, that is, areas with potential for trees irrespective of the individual restoration option (e.g., restocking degraded natural forests, silvo-pastoralism, plantations around protected areas and national forest priority areas, etc.).\u003c/p\u003e\u003cp\u003eThis interface also shows biophysical and socioeconomic factors that could influence implementation. For example, population density can inform restoration implementation strategies in terms of opportunities (e.g., high population density can drive demand for tree products) and challenges (e.g., in areas with high population density, pressure on restored trees and forests needs to be managed). Similarly, slope steepness will dictate the type of soil and water conservation measures to be implemented as per the 2005 Federal Rural Land Administration and Use Proclamation and the average annual rainfall will influence the choice of tree species to be planted and indicate if supplementary irrigation would be required.\u003c/p\u003e\u003cp\u003e\u003cb\u003eDisclaimer: \u003c/b\u003eThe national, regional, zonal and woreda boundaries are not authoritative. They were defined for the purpose of the 2007 census.\u003cbr\u003e\u003c/p\u003e',
  includeSubscribeButton: true,
  sharinghost: 'https://www.arcgis.com',
  analyticsCode: 'UA-62288390-16',
  iso: 'ETH',
  language: 'en',
  useAlternativeLanguage: false,
  alternativeLanguage: '',
  alternativeWebmap: '',
  alternativeLanguageTitle: '',
  alternativeLanguageSubtitle: '',
  alternativeNarrative: '',
  alternativeWebmapMenuName: 'Land Use',
  includeDocumentsTab: false,
  includeMeasurementTab: false,
  viirsFires: false,
  modisFires: false,
  intactForests: false,
  aboveGroundBiomass: false,
  landCover: false,
  mangroves: false,
  sadAlerts: false,
  gladAlerts: false,
  terraIAlerts: false,
  forma: false,
  primaryForests: false,
  recentImagery: true,
  analysisModules: [
    {
      analysisId: 'VEGA_RESTORATION_TOTAL_AREA',
      chartType: 'badge',
      label: {
        en: 'Total area with combined potential'
      },
      title: {
        en: 'Total area with combined potential'
      },
      description: {
        en:
          'Note: The boundaries of large areas of interest are simplified to enhance calculation performance. Area statistics were rounded down to the nearest hundred.'
      },
      useGfwWidget: true,
      widgetId: 'cd1eda73-e276-4137-a21f-2ccea5dc4914',
      uiParams: 'none'
    },
    {
      analysisId: 'VEGA_RESTORATION_LAND_COVER',
      chartType: 'badge',
      label: {
        en: 'Land use-land cover in areas with combined potential'
      },
      title: {
        en: 'Land use-land cover in areas with combined potential'
      },
      description: {
        en:
          'Note: The boundaries of large areas of interest are simplified to enhance calculation performance. Area statistics were rounded down to the nearest hundred.'
      },
      useGfwWidget: true,
      widgetId: '22aeebf0-d82c-4656-9cbe-6f1ac62c9006',
      uiParams: 'none'
    },
    {
      analysisId: 'VEGA_RESTORATION_SLOPE',
      chartType: 'badge',
      label: {
        en: 'Slope in areas with combined potential'
      },
      title: {
        en: 'Slope in areas with combined potential'
      },
      description: {
        en:
          'Note: The boundaries of large areas of interest are simplified to enhance calculation performance. Area statistics were rounded down to the nearest hundred.'
      },
      useGfwWidget: true,
      widgetId: '83ceb30a-ce4f-44e4-a3da-442008eb8979',
      uiParams: 'none'
    },
    {
      analysisId: 'VEGA_RESTORATION_POP_DEN',
      chartType: 'badge',
      label: {
        en: 'Population density in areas with combined potential'
      },
      title: {
        en: 'Population density in areas with combined potential'
      },
      description: {
        en:
          'Note: The boundaries of large areas of interest are simplified to enhance calculation performance. Area statistics were rounded down to the nearest hundred.'
      },
      useGfwWidget: true,
      widgetId: 'b5bd1739-12c6-4e12-8e6e-bba11034db57',
      uiParams: 'none'
    },
    {
      analysisId: 'VEGA_RESTORATION_TREE_COVER',
      chartType: 'badge',
      label: {
        en: 'Tree cover in areas with combined potential'
      },
      title: {
        en: 'Tree cover in areas with combined potential'
      },
      description: {
        en:
          'Note: The boundaries of large areas of interest are simplified to enhance calculation performance. Area statistics were rounded down to the nearest hundred.'
      },
      useGfwWidget: true,
      widgetId: 'b1460ee1-bd54-4d61-a44c-5ca80b50c5e7',
      uiParams: 'none'
    },
    {
      analysisId: 'VEGA_RESTORATION_RAINFALL',
      chartType: 'badge',
      label: {
        en: 'Average annual rainfall in areas with combined potential'
      },
      title: {
        en: 'Average annual rainfall in areas with combined potential'
      },
      description: {
        en:
          'Note: The boundaries of large areas of interest are simplified to enhance calculation performance. Area statistics were rounded down to the nearest hundred.'
      },
      useGfwWidget: true,
      widgetId: 'a329302f-a6a8-4f83-9258-802a0f0be401',
      uiParams: 'none'
    }
  ],
  layerPanel: {
    GROUP_WEBMAP: {
      order: 4,
      label: {},
      layers: []
    },
    GROUP_POT: {
      order: 3,
      groupType: 'radio',
      label: {
        en: 'Restoration Potential'
      },
      layers: [
        {
          order: 1,
          id: 'CP',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/eth/00_AllPotOptions/MapServer',
          layerIds: [302],
          technicalName: 'eth_combinedpotential',
          visible: true,
          label: {
            en: 'Areas with combined potential'
          },
          sublabel: {
            en: ''
          }
        },
        {
          order: 2,
          id: 'LCCP',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/eth/00_AllPotOptions/MapServer',
          layerIds: [299],
          technicalName: 'eth_landcover_combinedpotential',
          label: {
            en: 'Land use-land cover in areas with combined potential'
          },
          sublabel: {
            en: ''
          }
        },
        {
          order: 3,
          id: 'SCP',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/eth/00_AllPotOptions/MapServer',
          layerIds: [298],
          technicalName: 'eth_slope_combinedpotential',
          label: {
            en: 'Slope in areas with combined potential'
          },
          sublabel: {
            en: ''
          }
        },
        {
          order: 4,
          id: 'PDCP',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/eth/00_AllPotOptions/MapServer',
          layerIds: [297],
          technicalName: 'eth_population_combinedpotential',
          label: {
            en: 'Population density in areas with combined potential'
          },
          sublabel: {
            en: ''
          }
        },
        {
          order: 5,
          id: 'TCCP',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/eth/00_AllPotOptions/MapServer',
          layerIds: [296],
          technicalName: 'eth_treecover_combinedpotential',
          label: {
            en: 'Tree cover in areas with combined potential'
          },
          sublabel: {
            en: ''
          }
        },
        {
          order: 6,
          id: 'RCP',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/eth/00_AllPotOptions/MapServer',
          layerIds: [295],
          technicalName: 'eth_rainfall_combinedpotential',
          label: {
            en: 'Average annual rainfall in areas with combined potential'
          },
          sublabel: {
            en: ''
          }
        }
      ]
    },
    ADMIN: {
      order: 1,
      label: {
        en: 'Administrative Boundaries'
      },
      layers: [
        {
          order: 1,
          id: 'ADM-WOREDA',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/eth/AdminBoundaries/MapServer',
          layerIds: [278],
          technicalName: 'eth_woreda',
          label: {
            en: 'Woreda boundaries'
          },
          sublabel: {
            en: '(census boundaries 2007 - not authoritative)'
          },
          visible: false,
          popup: {
            title: {
              en: 'Woreda (2007 census) boundaries'
            },
            content: {
              en: [
                {
                  label: 'Region (2007 census) name',
                  fieldExpression: 'R_NAME'
                },
                {
                  label: 'Zone (2007 census) name',
                  fieldExpression: 'Z_NAME'
                },
                {
                  label: 'Woreda (2007 census) name',
                  fieldExpression: 'W_NAME'
                }
              ]
            }
          }
        },
        {
          order: 2,
          id: 'ADM-ZONAL',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/eth/AdminBoundaries/MapServer',
          layerIds: [185],
          technicalName: 'eth_zones',
          label: {
            en: 'Zonal boundaries'
          },
          sublabel: {
            en: '(census boundaries 2007 - not authoritative)'
          },
          visible: false,
          popup: {
            title: {
              en: 'Zonal (2007 census) boundaries'
            },
            content: {
              en: [
                {
                  label: 'Region (2007 census) name',
                  fieldExpression: 'R_NAME'
                },
                {
                  label: 'Zone (2007 census) name',
                  fieldExpression: 'Z_NAME'
                }
              ]
            }
          }
        },
        {
          order: 3,
          id: 'ADM-REGION',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/eth/AdminBoundaries/MapServer',
          layerIds: [186],
          technicalName: 'eth_regions',
          label: {
            en: 'Regional boundaries'
          },
          sublabel: {
            en: '(census boundaries 2007 - not authoritative)'
          },
          visible: true,
          popup: {
            title: {
              en: 'Regional (2007 census) boundaries'
            },
            content: {
              en: [
                {
                  label: 'Region (2007 census) name',
                  fieldExpression: 'R_NAME'
                }
              ]
            }
          }
        }
      ]
    },
    GROUP_PL: {
      order: 2,
      label: {
        en: 'Priority Landscapes'
      },
      layers: [
        {
          order: 4,
          id: 'P_LS',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/eth/priority_landscapes/MapServer',
          layerIds: [282],
          technicalName: 'eth_priority_landscapes',
          label: {
            en: 'Priority landscapes for cross-sectoral implementation'
          },
          visible: false,
          popup: {
            title: {
              en: 'Priority landscapes for cross-sectoral implementation'
            },
            content: {
              en: [
                {
                  label: 'Overall national ranking',
                  fieldExpression: 'Overall'
                },
                {
                  label: 'Priority level',
                  fieldExpression: 'Priority'
                }
              ]
            }
          }
        }
      ]
    },
    GROUP_REF: {
      order: 5,
      groupType: 'radio',
      label: {
        en: 'Reference Layers'
      },
      layers: [
        {
          order: 1,
          id: 'LULC',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/eth/BiophysicalData/MapServer',
          layerIds: [192],
          technicalName: 'eth_landcover',
          label: {
            en: 'Land use-land cover (2013)'
          },
          sublabel: {
            en: ''
          }
        },
        {
          order: 2,
          id: 'SLOPE',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/eth/BiophysicalData/MapServer',
          layerIds: [199],
          technicalName: 'eth_slope',
          label: {
            en: 'Slope'
          },
          sublabel: {
            en: ''
          }
        },
        {
          order: 3,
          id: 'POP-DENSITY',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/eth/BiophysicalData/MapServer',
          layerIds: [196],
          technicalName: 'eth_population',
          label: {
            en: 'Population density (2007)'
          },
          sublabel: {
            en: ''
          }
        },
        {
          order: 4,
          id: 'TREECOVER',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/eth/BiophysicalData/MapServer',
          layerIds: [193],
          technicalName: 'eth_treecover',
          label: {
            en: 'Tree cover (2010)'
          },
          sublabel: {
            en: ''
          }
        },
        {
          order: 5,
          id: 'RAINFALL',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/eth/BiophysicalData/MapServer',
          layerIds: [194],
          technicalName: 'eth_rainfall',
          label: {
            en: 'Average annual rainfall'
          },
          sublabel: {
            en: ''
          }
        }
      ]
    },
    GROUP_IMAGERY: {
      grouptype: 'imagery',
      order: 4,
      label: {
        en: 'Recent Imagery',
        fr: 'Imagerie récente',
        es: 'Imágenes recientes',
        pt: 'Imagens recentes',
        id: 'Citra Satelit Terbaru',
        zh: 'Recent Imagery',
        ka: 'ბოლო გამოსახულება'
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
            fr: 'Imagerie récente',
            es: 'Imágenes recientes',
            pt: 'Imagens recentes',
            id: 'Citra Satelit Terbaru',
            zh: '云层覆盖',
            ka: 'ბოლო გამოსახულება'
          },
          dynamicSublabel: {
            en: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
            fr:
              '({DATE_TIME}, {CLOUD_COVERAGE}% Imagerie récente, {INSTRUMENT})',
            es:
              '({DATE_TIME}, {CLOUD_COVERAGE}% Cobertura de nubes, {INSTRUMENT})',
            pt:
              '({DATE_TIME}, {CLOUD_COVERAGE}% Cobertura de nuvens, {INSTRUMENT})',
            id: '({DATE_TIME}, {CLOUD_COVERAGE}% Tutupan Awan, {INSTRUMENT})',
            zh: '({DATE_TIME}, {CLOUD_COVERAGE}% 近期图像, {INSTRUMENT})',
            ka: '({DATE_TIME}, {CLOUD_COVERAGE}% ღრუბლიანობა, {INSTRUMENT})'
          }
        }
      ]
    },
    GROUP_BASEMAP: {
      groupType: 'basemap',
      order: 7,
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
          id: 'wri_mono',
          thumbnailUrl: 'https://my.gfw-mapbuilder.org/img/wri_mono.png',
          title: {
            en: 'Grey Basemap'
          }
        }
      ]
    },
    extraLayers: [
      {
        id: 'MASK',
        type: 'dynamic',
        order: 10000,
        url:
          'https://gis.forest-atlas.org/server/rest/services/country_masks/country_mask_global/MapServer',
        opacity: 0.35,
        layerIds: [3]
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
  },
  otherFieldsModules: ''
};
