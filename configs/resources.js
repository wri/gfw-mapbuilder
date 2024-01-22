// export default {
//   webmap: 'de85e3fcc07948238aa6c1afd2a4ceb0',
//   title: 'GFW Mapbuilder',
//   subtitle: 'Make maps that matter',
//   logoUrl: '',
//   logoLinkUrl: '',
//   aboutLinkUrl: '',
//   downloadLinkUrl: '',
//   printServiceUrl: 'https://gis.forest-atlas.org/server/rest/services/print/ExportWebMap/GPServer/Export%20Web%20Map',
//   maskServiceUrl: '',
//   mapThemeIds: '',
//   mapThemes: '',
//   narrative: '',
//   hideHeader: false,
//   hideFooter: false,
//   includeMyGFWLogin: true,
//   navLinksInNewTab: false,
//   customColorTheme: '',
//   language: 'en',
//   useAlternativeLanguage: true,
//   alternativeWebmap: 'de85e3fcc07948238aa6c1afd2a4ceb0',
//   alternativeLanguage: 'fr',
//   alternativeLanguageTitle: 'Mapbuilder',
//   alternativeLanguageSubtitle: 'Make maps that matter',
//   alternativeMapThemes: '',
//   alternativeNarrative: '',
//   alternativeWebmapMenuName: 'Custom Layers',
//   initialExtent: {
//     x: null,
//     y: null,
//     z: null,
//   },
//   includeDocumentsTab: false,
//   iso: '',
//   viirsFires: true,
//   intactForests: true,
//   inpeProdes: true,
//   primaryForests: true,
//   forma: false,
//   aboveGroundBiomass: true,
//   landCover: true,
//   mangroves: false,
//   sadAlerts: false,
//   gladAlerts: true,
//   gfwIntegratedAlertLayer: true,
//   recentImagery: true,
//   carbonSequence: true,
//   carbonEmissions: true,
//   treeCoverHeight: true,
//   treeCover: true,
//   treeCoverGain: true,
//   treeCoverLoss: true,
//   tropicalTreeCover: true,
//   treeMosaicLandscapes: true,
//   forestCarbonGrossRemovals: true,
//   forestCarbonGrossEmissions: true,
//   forestCarbonNetFlux: true,
//   umdLandCover: true,
//   drySpells: true,
//   airQuality: true,
//   windSpeed: true,
//   webmapMenuName: 'Custom Layers',
//   sharinghost: 'https://www.arcgis.com',
//   analyticsCode: '',
//   includeCartoTemplateLayers: false,
//   cartoUser: 'wri-01',
//   cartoTemplateId: 'tpl_07c315f8_c13e_11e4_b457_0e8dde98a187',
//   cartoApiKey: 'your key here',
//   cartoGroupLabel: {
//     en: 'Carto Layers',
//     fr: 'Carto Layers',
//   },
//   disabledAnalysisModules: [], //'VIIRS_FIRES', 'GLAD_ALERTS', 'TC_LOSS', 'IFL', 'LCC'
//   layerPanel: {
//     GROUP_WEBMAP: {
//       order: 2,
//       label: {},
//       layers: [],
//     },
//     GROUP_CLIMATE: {
//       groupType: 'default',
//       order: 4,
//       label: {
//         en: 'Climate',
//         fr: 'Climat',
//         es: 'Clima',
//         pt: 'Clima',
//         id: 'Iklim',
//         zh: '气候',
//         ka: 'კლიმატი',
//         hy: 'Կլիմա',
//         az: 'İqlim',
//         nl: 'Klimaat',
//       },
//       layers: [
//         {
//           id: 'CARBON_SEQ',
//           order: 1,
//           type: 'remoteDataLayer',
//           uuid: 'e7208398-0acd-4f73-a824-c4fe1e356e0c',
//         },
//         {
//           id: 'DRY_SPELLS',
//           order: 3,
//           type: 'remoteDataLayer',
//           uuid: '41936f95-094b-4ad9-8b8a-70fc159bd0ba',
//         },
//         {
//           id: 'AIR_QUALITY',
//           order: 3,
//           type: 'remoteDataLayer',
//           uuid: '67d8aed9-8eb3-4396-99a4-f0eee7295226',
//         },
//         {
//           id: 'WIND_SPEED',
//           order: 4,
//           type: 'remoteDataLayer',
//           uuid: '9fa60bd9-0643-4d0a-a569-0036e902d1f9',
//         },
//         {
//           id: 'FOREST_CARBON_GROSS_REMOVALS',
//           order: 6,
//           type: 'remoteDataLayer',
//           uuid: '79010c83-e62e-4744-96ed-130736daa651', // layer id
//         },
//         {
//           id: 'FOREST_CARBON_GROSS_EMISSIONS',
//           order: 7,
//           type: 'remoteDataLayer',
//           uuid: '0b45cb69-6432-449f-af38-25cdcda85d55',
//         },
//         {
//           id: 'FOREST_CARBON_NET_FLUX',
//           order: 8,
//           type: 'remoteDataLayer',
//           uuid: 'bd768c4b-f5f8-47f9-b6a0-5bb6078f0fac',
//         },
//       ],
//     },
//     GROUP_LCD: {
//       groupType: 'default',
//       order: 1,
//       label: {
//         en: 'Land Cover Dynamics',
//         fr: 'Evolution de la couverture des sols',
//         es: 'Dinámica de la Cobertura del Suelo',
//         pt: 'Dinâmica de cobertura da terra ',
//         id: 'Land Cover Dynamics',
//         zh: '土地覆盖动态数据',
//         ka: 'მიწის საფარის დინამიკა',
//       },
//       layers: [
//         {
//           id: 'TREE_COVER_LOSS',
//           order: 1,
//           type: 'remoteDataLayer',
//           uuid: '2aed67b3-3643-40d3-9c1e-8af9afb5d9e2',
//         },
//         {
//           id: 'TREE_COVER_GAIN',
//           order: 2,
//           type: 'remoteDataLayer',
//           uuid: 'cb016f17-f12d-463a-9dc2-aabcf5db566c',
//         },
//         {
//           id: 'IMAZON_SAD',
//           order: 3,
//           type: 'remoteDataLayer',
//           uuid: '3e9e86ae-e38d-4c59-8484-c8214ca5186a',
//         },
//         {
//           id: 'FORMA_ALERTS',
//           order: 4,
//           type: 'remoteDataLayer',
//           uuid: '56aa7e57-0ac4-446c-a82d-7713904b17c3',
//         },
//         {
//           id: 'GLAD_ALERTS',
//           order: 5,
//           type: 'remoteDataLayer',
//           uuid: '356f862b-3e70-493a-997b-dc2a193410e9',
//         },
//         {
//           id: 'TERRA_I_ALERTS',
//           order: 6,
//           type: 'remoteDataLayer',
//           uuid: '1fc7b0c5-259a-4685-8665-b2f1ed3f808f',
//         },
//         {
//           id: 'VIIRS_ACTIVE_FIRES',
//           order: 7,
//           type: 'remoteDataLayer',
//           uuid: '6d316908-92c8-4f95-8598-f2a0c72786af',
//         },
//         {
//           id: 'GFW_INTEGRATED_ALERTS',
//           order: 8,
//           type: 'remoteDataLayer',
//           uuid: 'bd58f25d-d3bb-4d59-9daa-cecddd27d9f4',
//           groupId: 'GROUP_LCD',
//         },
//         {
//           id: 'GLAD_S2_ALERTS',
//           order: 9,
//           type: 'remoteDataLayer',
//           uuid: '3b869953-48c4-48d0-8023-5c64a311f3dd',
//           groupId: 'GROUP_LCD',
//         },
//         {
//           id: 'RADD_ALERTS',
//           order: 10,
//           type: 'remoteDataLayer',
//           uuid: '440e53d0-36b3-47ad-993a-1c2018c3942c',
//           groupId: 'GROUP_LCD',
//         },
//         {
//           id: 'INPE_CERRADO_PRODES',
//           order: 11,
//           type: 'remoteDataLayer',
//           uuid: 'a2d9e60f-b4f6-4e56-8100-00fb3da2cf8e',
//         },
//         {
//           id: 'INPE_AMAZON_PRODES',
//           order: 12,
//           type: 'remoteDataLayer',
//           uuid: 'ac72942c-d508-4929-b5fb-104e5c948d09',
//         },
//       ],
//     },
//     GROUP_LC: {
//       groupType: 'default',
//       order: 3,
//       label: {
//         en: 'Land Cover',
//         fr: 'Couverture des sols',
//         es: 'Cobertura terrestre',
//         pt: 'Cobertura do Solo',
//         id: 'Land Cover',
//         zh: '土地覆盖',
//         ka: 'მიწის საფარი',
//       },
//       layers: [
//         {
//           id: 'IFL',
//           order: 1,
//           type: 'remoteDataLayer',
//           uuid: '5f815a7d-457e-4eae-a8e5-8864a60696ad',
//         },
//         {
//           id: 'PRIMARY_FORESTS',
//           order: 2,
//           type: 'remoteDataLayer',
//           uuid: 'edffb745-e523-462d-ad1e-3052006a3dbc',
//         },
//         {
//           id: 'AG_BIOMASS',
//           order: 3,
//           type: 'remoteDataLayer',
//           uuid: '04526d47-f3f5-4f76-a939-e5f7861fd085',
//         },
//         {
//           id: 'TREE_COVER',
//           order: 4,
//           type: 'remoteDataLayer',
//           uuid: '2569adca-ef87-42c4-a153-57c5e8ba0ef7',
//         },
//         {
//           id: 'LAND_COVER',
//           order: 5,
//           type: 'remoteDataLayer',
//           uuid: 'b8d3f175-0565-443f-839a-49eb890a4b3d',
//         },
//         {
//           id: 'UMD_LAND_COVER',
//           order: 6,
//           type: 'remoteDataLayer',
//           uuid: 'f22e0529-d398-4ccc-b943-e62d420fea89',
//         },
//         {
//           id: 'TREE_COVER_HEIGHT',
//           order: 7,
//           type: 'remoteDataLayer',
//           uuid: '2a83effa-f8be-425b-9766-502e65525861',
//         },
//         {
//           id: 'TREES_MOSAIC_LANDSCAPES',
//           order: 8,
//           type: 'remoteDataLayer',
//           uuid: '9e0c1e1e-a0a3-457f-a373-4104820f7a50',
//         },
//         {
//           id: 'TROPICAL_TREE_COVER',
//           order: 9,
//           type: 'remoteDataLayer',
//           uuid: 'b9183eca-84ed-48ed-83d5-a146a6e2a079',
//         },
//       ],
//     },
//     GROUP_IMAGERY: {
//       groupType: 'imagery',
//       order: 4,
//       label: {
//         en: 'Recent Imagery',
//         fr: 'Recent Imagery',
//         es: 'Recent Imagery',
//         pt: 'Recent Imagery',
//         id: 'Recent Imagery',
//         zh: 'Recent Imagery',
//         ka: 'Recent Imagery',
//       },
//       layers: [
//         {
//           order: 1,
//           id: 'RECENT_IMAGERY',
//           type: 'imagery',
//           technicalName: 'recent_satellite_imagery',
//           visible: false,
//           label: {
//             en: 'Recent Imagery',
//             fr: 'Recent Imagery',
//             es: 'Recent Imagery',
//             pt: 'Recent Imagery',
//             id: 'Recent Imagery',
//             zh: 'Recent Imagery',
//             ka: 'Recent Imagery',
//           },
//           dynamicSublabel: {
//             en: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
//             fr: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
//             es: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
//             pt: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
//             id: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
//             zh: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
//             ka: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
//           },
//         },
//       ],
//     },
//     GROUP_BASEMAP: {
//       groupType: 'basemap',
//       order: 200,
//       label: {
//         en: 'Basemap',
//         fr: 'Basemap',
//         es: 'Basemap',
//         pt: 'Basemap',
//         id: 'Basemap',
//         zh: 'Basemap',
//         ka: 'საბაზო რუკა',
//       },
//       layers: [
//         {
//           id: 'landsat',
//           thumbnailUrl: 'https://my.gfw-mapbuilder.org/img/basemaps-sdd18a411a3-5bf18f445e58b8766f773184b7741c67.png',
//           templateUrl: 'https://d2h71bpqsyf4vw.cloudfront.net/2016/${level}/${col}/${row}.png',
//           years: [
//             '2000',
//             '2001',
//             '2002',
//             '2003',
//             '2004',
//             '2005',
//             '2006',
//             '2007',
//             '2008',
//             '2009',
//             '2010',
//             '2011',
//             '2012',
//             '2013',
//             '2014',
//             '2015',
//             '2016',
//           ],
//           title: {
//             en: 'Landsat',
//             fr: 'Landsat',
//             es: 'Landsat',
//             pt: 'Landsat',
//             id: 'Landsat',
//             zh: 'Landsat',
//             ka: 'Landsat',
//           },
//         },
//         {
//           id: 'wri_mono',
//           thumbnailUrl: 'https://my.gfw-mapbuilder.org/img/wri_mono.png',
//           title: {
//             en: 'WRI Mono',
//             fr: 'WRI Mono',
//             es: 'WRI Mono',
//             pt: 'WRI Mono',
//             id: 'WRI Mono',
//             zh: 'WRI Mono',
//             ka: 'WRI Mono',
//           },
//         },
//         {
//           id: 'wri_contextual',
//           thumbnailUrl: 'https://my.gfw-mapbuilder.org/img/wri_contextual.png',
//           title: {
//             en: 'WRI Contextual',
//             fr: 'WRI Contextual',
//             es: 'WRI Contextual',
//             pt: 'WRI Contextual',
//             id: 'WRI Contextual',
//             zh: 'WRI Contextual',
//             ka: 'WRI Contextual',
//           },
//         },
//         {
//           id: 'planet',
//           thumbnailUrl: 'https://my.gfw-mapbuilder.org/img/wri_mono.png',
//           url: 'https://tiles.globalforestwatch.org/planet/v1/planet_medres_normalized_analytic/{z}/{x}/{y}.png',
//           visible: true,
//           title: {
//             en: 'Planet',
//             fr: 'Planet',
//             es: 'Planet',
//             pt: 'Planet',
//             id: 'Planet',
//             zh: 'Planet',
//             ka: 'Planet',
//           },
//         },
//       ],
//     },
//     extraLayers: [
//       {
//         id: 'MASK',
//         type: 'dynamic',
//         order: 10000,
//         url: 'https://gis.forest-atlas.org/server/rest/services/country_masks/country_mask_global/MapServer',
//         opacity: 0.35,
//         layerIds: [0],
//       },
//       {
//         id: 'LEGEND_LAYER',
//         type: 'dynamic',
//         url: 'https://gis-gfw.wri.org/arcgis/rest/services/legends/MapServer',
//         visible: false,
//         opacity: 0,
//         layerIds: [],
//       },
//       {
//         id: 'USER_FEATURES',
//         type: 'graphic',
//         visible: true,
//       },
//     ],
//   },
// };

export default {
  webmap: 'eef33b58005045539e697f57d7bec5c2',
  title: 'Popup config media test',
  subtitle: 'MB Test',
  logoUrl: '',
  logoLinkUrl: '',
  aboutLinkUrl: '',
  downloadLinkUrl: '',
  printServiceUrl: 'https://gis.forest-atlas.org/server/rest/services/print/ExportWebMap/GPServer/Export%20Web%20Map',
  maskServiceUrl: '',
  mapThemeIds: '',
  mapThemes: '',
  narrative: '',
  hideHeader: false,
  hideFooter: false,
  includeMyGFWLogin: false,
  navLinksInNewTab: false,
  customColorTheme: '',
  language: 'en',
  useAlternativeLanguage: false,
  alternativeWebmap: '',
  alternativeLanguage: false,
  alternativeLanguageTitle: 'MapBuilder',
  alternativeLanguageSubtitle: 'Make maps that matter',
  alternativeMapThemes: '',
  alternativeNarrative: '',
  alternativeWebmapMenuName: 'Custom Layers',
  initialExtent: {
    x: null,
    y: null,
    z: null,
  },
  includeDocumentsTab: true,
  iso: '',
  viirsFires: false,
  intactForests: false,
  inpeProdes: true,
  primaryForests: false,
  forma: false,
  aboveGroundBiomass: false,
  landCover: false,
  mangroves: false,
  sadAlerts: false,
  gladAlerts: false,
  gfwIntegratedAlertLayer: false,
  recentImagery: false,
  carbonSequence: false,
  carbonEmissions: false,
  treeCoverHeight: false,
  treeCover: false,
  treeCoverGain: false,
  treeCoverLoss: true,
  tropicalTreeCover: false,
  treeMosaicLandscapes: false,
  forestCarbonGrossRemovals: false,
  forestCarbonGrossEmissions: false,
  forestCarbonNetFlux: false,
  umdLandCover: false,
  drySpells: false,
  airQuality: false,
  windSpeed: false,
  webmapMenuName: 'Custom Layers',
  sharinghost: 'https://www.arcgis.com',
  analyticsCode: '',
  includeCartoTemplateLayers: false,
  cartoUser: 'wri-01',
  cartoTemplateId: 'tpl_07c315f8_c13e_11e4_b457_0e8dde98a187',
  cartoApiKey: 'your key here',
  cartoGroupLabel: {
    en: 'Carto Layers',
    fr: 'Carto Layers',
  },
  disabledAnalysisModules: [],
  layerPanel: {
    CUSTOM_GROUP: {
      order: 1,
      label: {
        en: 'My custom layers',
      },
      layers: [
        {
          id: 'Monitoring areas',
          type: 'feature',
          url: 'https://services.arcgis.com/hBEMHCkbQdfV906F/arcgis/rest/services/Monitoring_Areas_(Public)/FeatureServer/0',
          label: {
            en: 'Monitoring areas',
          },
          popup: {
            title: {
              en: 'Media links',
            },
            content: {
              en: [
                {
                  label: 'Photo One',
                  fieldExpression: 'Photo_1',
                },
                // {
                //   label: 'Photo Two',
                //   fieldExpression: 'Photo_2',
                // },
                // {
                //   label: 'Video One',
                //   fieldExpression: 'Video_1',
                // },
              ],
            },
          },
        },
      ],
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
        ka: 'საბაზო რუკა',
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
            '2016',
          ],
          title: {
            en: 'Landsat',
            fr: 'Landsat',
            es: 'Landsat',
            pt: 'Landsat',
            id: 'Landsat',
            zh: 'Landsat',
            ka: 'Landsat',
          },
          order: 1,
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
            ka: 'WRI Mono',
          },
          order: 2,
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
            ka: 'WRI Contextual',
          },
          order: 3,
        },
        {
          id: 'planet',
          thumbnailUrl: 'https://my.gfw-mapbuilder.org/img/wri_mono.png',
          url: 'https://tiles.globalforestwatch.org/planet/v1/planet_medres_normalized_analytic/{z}/{x}/{y}.png',
          visible: true,
          title: {
            en: 'Planet',
            fr: 'Planet',
            es: 'Planet',
            pt: 'Planet',
            id: 'Planet',
            zh: 'Planet',
            ka: 'Planet',
          },
          order: 4,
        },
      ],
    },
    extraLayers: [
      {
        id: 'MASK',
        type: 'dynamic',
        order: 10000,
        url: 'https://gis.forest-atlas.org/server/rest/services/country_masks/country_mask_global/MapServer',
        opacity: 0.35,
        layerIds: [0],
      },
      {
        id: 'LEGEND_LAYER',
        type: 'dynamic',
        url: 'https://gis-gfw.wri.org/arcgis/rest/services/legends/MapServer',
        visible: false,
        opacity: 0,
        layerIds: [],
      },
      {
        id: 'USER_FEATURES',
        type: 'graphic',
        visible: true,
      },
    ],
  },
};
