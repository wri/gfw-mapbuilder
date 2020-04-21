export default {
  webmap: '4fa0061aa5274c23821cb9cc63b92722',
  title: 'Atlas of Restoration Opportunities in Sidhi - Beta Version',
  subtitle: 'Make maps that matter',
  webmapMenuName: 'Conservation',
  logoUrl:
    '/system/site_settings/images/000/000/663/original/wri-india_resize.png?1519845661',
  logoLinkUrl: '/',
  printServiceUrl:
    'https://gis.forest-atlas.org/server/rest/services/print/ExportWebMap/GPServer/Export%20Web%20Map',
  narrative: '',
  includeSubscribeButton: true,
  sharinghost: 'https://www.arcgis.com',
  analyticsCode: '',
  iso: 'IND',
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
  analysisModules: [],
  layerPanel: {
    GROUP_WEBMAP: {
      order: 2,
      label: {},
      layers: []
    },
    GROUP_PWP: {
      order: 1,
      label: {
        en: 'Reference Layers'
      },
      layers: [
        {
          order: 1,
          id: 'CB',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/ind/Sidhi_Reference_layers/MapServer',
          layerIds: [0],
          label: {
            en: 'Sidhi District Boundary'
          },
          visible: true
        },
        {
          order: 2,
          id: 'SB',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/ind/Sidhi_Reference_layers/MapServer',
          layerIds: [1],
          label: {
            en: 'Tehsil Boundary'
          },
          visible: true,
          popup: {
            title: {
              en: 'Restoration Interventions and Potential'
            },
            content: {
              en: [
                {
                  label: 'Tehsil:',
                  fieldExpression: 'Tehsil'
                },
                {
                  label: 'Area of Tehsil in ha:',
                  fieldExpression: 'T_Area'
                },
                {
                  label: 'Assisted Natural Regeneration in ha:',
                  fieldExpression: 'ANR'
                },
                {
                  label: 'Mixed Plantation in ha:',
                  fieldExpression: 'Mixed'
                },
                {
                  label:
                    'Assisted Natural Regeneration/Mixed Plantation in ha:',
                  fieldExpression: 'ANR_Mixed'
                },
                {
                  label: 'Bamboo Plantation in ha:',
                  fieldExpression: 'Bamboo'
                },
                {
                  label: 'Farmer Managed Natural Regeneration in ha:',
                  fieldExpression: 'FMNR'
                },
                {
                  label: 'Trees on Boundaries in ha:',
                  fieldExpression: 'TOB'
                },
                {
                  label: 'Agri-Horti-Forestry in ha:',
                  fieldExpression: 'A_H_For'
                },
                {
                  label: 'Pasture Development in ha:',
                  fieldExpression: 'Pas_Deve'
                },
                {
                  label: 'River Bank Plantation in ha:',
                  fieldExpression: 'Riv_Bnk'
                }
              ]
            }
          }
        },
        {
          order: 3,
          id: 'HTC',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/ind/Sidhi_Reference_layers/MapServer',
          layerIds: [2],
          label: {
            en: 'Land Ownership'
          }
        },
        {
          order: 4,
          id: 'LULC',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/ind/Sidhi_Reference_layers/MapServer',
          layerIds: [3],
          label: {
            en: 'Landuse and Landcover'
          }
        },
        {
          order: 5,
          id: 'GL',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/ind/Sidhi_Reference_layers/MapServer',
          layerIds: [4],
          label: {
            en: 'Forest Cover'
          }
        },
        {
          order: 6,
          id: 'MANG',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/ind/Sidhi_Reference_layers/MapServer',
          layerIds: [5],
          label: {
            en: 'Bamboo Presence'
          }
        },
        {
          order: 7,
          id: 'PA',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/ind/Sidhi_Reference_layers/MapServer',
          layerIds: [6],
          label: {
            en: 'Presence of Irrigation'
          }
        },
        {
          order: 8,
          id: 'WB',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/ind/Sidhi_Reference_layers/MapServer',
          layerIds: [7],
          label: {
            en: 'Slope'
          }
        },
        {
          order: 9,
          id: 'IRRI',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/ind/Sidhi_Reference_layers/MapServer',
          layerIds: [8],
          label: {
            en: 'Protected Area'
          },
          popup: {
            title: {
              en: 'Protected Area'
            },
            content: {
              en: [
                {
                  label: 'Name:',
                  fieldExpression: 'Class'
                },
                {
                  label: 'Area in ha:',
                  fieldExpression: 'Area'
                }
              ]
            }
          }
        },
        {
          order: 10,
          id: 'RIV',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/ind/Sidhi_Reference_layers/MapServer',
          layerIds: [9],
          label: {
            en: 'Rivers'
          },
          popup: {
            title: {
              en: 'Rivers'
            },
            content: {
              en: [
                {
                  label: 'Name:',
                  fieldExpression: 'Class'
                }
              ]
            }
          },
          visible: true
        },
        {
          order: 11,
          id: 'EXC',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/ind/Sidhi_Reference_layers/MapServer',
          layerIds: [10],
          label: {
            en: 'Waterbodies'
          },
          popup: {
            title: {
              en: 'Waterbodies'
            },
            content: {
              en: [
                {
                  label: 'Name:',
                  fieldExpression: 'Class'
                }
              ]
            }
          }
        },
        {
          order: 12,
          id: 'RBA',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/ind/Sidhi_Reference_layers/MapServer',
          layerIds: [11],
          label: {
            en: 'Riverbank Area'
          }
        }
      ]
    },
    GROUP_FMA: {
      order: 3,
      label: {
        en: 'Protection'
      },
      layers: [
        {
          order: 1,
          id: 'PR',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/ind/Sidhi_Protection/MapServer',
          layerIds: [1],
          label: {
            en: 'Protection'
          }
        }
      ]
    },
    GROUP_RO: {
      order: 4,
      label: {
        en: 'Restoration Opportunities'
      },
      layers: [
        {
          order: 1,
          id: 'ANR',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/ind/Sidhi_RO/MapServer',
          layerIds: [1],
          label: {
            en: 'Assisted Natural Regeneration'
          }
        },
        {
          order: 2,
          id: 'MP',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/ind/Sidhi_RO/MapServer',
          layerIds: [2],
          label: {
            en: 'Mixed Plantation'
          }
        },
        {
          order: 3,
          id: 'ANRMP',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/ind/Sidhi_RO/MapServer',
          layerIds: [3],
          label: {
            en: 'Assisted Natural Regeneration/Mixed Plantation'
          }
        },
        {
          order: 4,
          id: 'BP',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/ind/Sidhi_RO/MapServer',
          layerIds: [4],
          label: {
            en: 'Bamboo Plantation'
          }
        },
        {
          order: 5,
          id: 'FMNR',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/ind/Sidhi_RO/MapServer',
          layerIds: [5],
          label: {
            en: 'Farmer Managed Natural Regeneration'
          }
        },
        {
          order: 6,
          id: 'AHF',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/ind/Sidhi_RO/MapServer',
          layerIds: [6],
          label: {
            en: 'Agri-Horti-Forestry'
          }
        },
        {
          order: 7,
          id: 'TOB',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/ind/Sidhi_RO/MapServer',
          layerIds: [7],
          label: {
            en: 'Trees on Boundaries'
          }
        },
        {
          order: 8,
          id: 'RBP',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/ind/Sidhi_RO/MapServer',
          layerIds: [8],
          label: {
            en: 'Riverbank Plantation'
          }
        },
        {
          order: 9,
          id: 'PLD',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/ind/Sidhi_RO/MapServer',
          layerIds: [9],
          label: {
            en: 'Pastureland Development'
          }
        },
        {
          order: 10,
          id: 'CRO',
          type: 'dynamic',
          url:
            'https://gis.forest-atlas.org/server/rest/services/ind/Sidhi_RO/MapServer',
          layerIds: [10],
          visible: true,
          label: {
            en: 'Combined Map of Restoration Interventions'
          }
        }
      ]
    },
    GROUP_IMAGERY: {
      groupType: 'imagery',
      order: 5,
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
        en: 'Basemap'
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
        layerIds: [2]
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
