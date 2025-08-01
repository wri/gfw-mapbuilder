/* export default {
  webmap: '4563142bba62461ab4e0de9480919e95',
  title: 'GFW Mapbuilder',
  subtitle: 'Make maps that matter',
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
  includeMyGFWLogin: true,
  navLinksInNewTab: false,
  customColorTheme: '',
  language: 'en',
  useAlternativeLanguage: true,
  alternativeWebmap: '4563142bba62461ab4e0de9480919e95',
  alternativeLanguage: 'fr',
  alternativeLanguageTitle: 'Mapbuilder',
  alternativeLanguageSubtitle: 'Make maps that matter',
  alternativeMapThemes: '',
  alternativeNarrative: '',
  alternativeWebmapMenuName: 'Custom Layers',
  initialExtent: {
    x: null,
    y: null,
    z: null,
  },
  includeDocumentsTab: false,
  iso: '',
  viirsFires: true,
  intactForests: true,
  inpeProdes: true,
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
  treeCoverHeight: true,
  treeCover: true,
  treeCoverGain: true,
  treeCoverLoss: true,
  tropicalTreeCover: true,
  treeMosaicLandscapes: false,
  forestCarbonGrossRemovals: true,
  forestCarbonGrossEmissions: true,
  forestCarbonNetFlux: true,
  umdLandCover: true,
  drySpells: true,
  airQuality: true,
  windSpeed: true,
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
  disabledAnalysisModules: [], //'VIIRS_FIRES', 'GLAD_ALERTS', 'TC_LOSS', 'IFL', 'LCC'
  layerPanel: {
    GROUP_WEBMAP: {
      order: 2,
      label: {},
      layers: [],
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
        nl: 'Klimaat',
      },
      layers: [
        {
          id: 'CARBON_SEQ',
          order: 1,
          type: 'remoteDataLayer',
          uuid: 'e7208398-0acd-4f73-a824-c4fe1e356e0c',
        },
        {
          id: 'DRY_SPELLS',
          order: 3,
          type: 'remoteDataLayer',
          uuid: '41936f95-094b-4ad9-8b8a-70fc159bd0ba',
        },
        {
          id: 'AIR_QUALITY',
          order: 3,
          type: 'remoteDataLayer',
          uuid: '67d8aed9-8eb3-4396-99a4-f0eee7295226',
        },
        {
          id: 'WIND_SPEED',
          order: 4,
          type: 'remoteDataLayer',
          uuid: '9fa60bd9-0643-4d0a-a569-0036e902d1f9',
        },
        {
          id: 'FOREST_CARBON_GROSS_REMOVALS',
          order: 6,
          type: 'remoteDataLayer',
          uuid: '79010c83-e62e-4744-96ed-130736daa651', // layer id
        },
        {
          id: 'FOREST_CARBON_GROSS_EMISSIONS',
          order: 7,
          type: 'remoteDataLayer',
          uuid: '0b45cb69-6432-449f-af38-25cdcda85d55',
        },
        {
          id: 'FOREST_CARBON_NET_FLUX',
          order: 8,
          type: 'remoteDataLayer',
          uuid: 'bd768c4b-f5f8-47f9-b6a0-5bb6078f0fac',
        },
      ],
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
        ka: 'მიწის საფარის დინამიკა',
      },
      layers: [
        {
          id: 'TREE_COVER_LOSS',
          order: 1,
          type: 'remoteDataLayer',
          uuid: '2aed67b3-3643-40d3-9c1e-8af9afb5d9e2',
        },
        {
          id: 'TREE_COVER_GAIN',
          order: 2,
          type: 'remoteDataLayer',
          uuid: 'cb016f17-f12d-463a-9dc2-aabcf5db566c',
        },
        {
          id: 'IMAZON_SAD',
          order: 3,
          type: 'remoteDataLayer',
          uuid: '3e9e86ae-e38d-4c59-8484-c8214ca5186a',
        },
        {
          id: 'FORMA_ALERTS',
          order: 4,
          type: 'remoteDataLayer',
          uuid: '56aa7e57-0ac4-446c-a82d-7713904b17c3',
        },
        {
          id: 'GLAD_ALERTS',
          order: 5,
          type: 'remoteDataLayer',
          uuid: '356f862b-3e70-493a-997b-dc2a193410e9',
        },
        {
          id: 'TERRA_I_ALERTS',
          order: 6,
          type: 'remoteDataLayer',
          uuid: '1fc7b0c5-259a-4685-8665-b2f1ed3f808f',
        },
        {
          id: 'VIIRS_ACTIVE_FIRES',
          order: 7,
          type: 'remoteDataLayer',
          uuid: '6d316908-92c8-4f95-8598-f2a0c72786af',
        },
        {
          id: 'GFW_INTEGRATED_ALERTS',
          order: 8,
          type: 'remoteDataLayer',
          uuid: 'bd58f25d-d3bb-4d59-9daa-cecddd27d9f4',
          groupId: 'GROUP_LCD',
        },
        {
          id: 'GLAD_S2_ALERTS',
          order: 9,
          type: 'remoteDataLayer',
          uuid: '3b869953-48c4-48d0-8023-5c64a311f3dd',
          groupId: 'GROUP_LCD',
        },
        {
          id: 'RADD_ALERTS',
          order: 10,
          type: 'remoteDataLayer',
          uuid: '440e53d0-36b3-47ad-993a-1c2018c3942c',
          groupId: 'GROUP_LCD',
        },
        {
          id: 'INPE_CERRADO_PRODES',
          order: 11,
          type: 'remoteDataLayer',
          uuid: 'a2d9e60f-b4f6-4e56-8100-00fb3da2cf8e',
        },
        {
          id: 'INPE_AMAZON_PRODES',
          order: 12,
          type: 'remoteDataLayer',
          uuid: 'ac72942c-d508-4929-b5fb-104e5c948d09',
        },
      ],
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
        ka: 'მიწის საფარი',
      },
      layers: [
        {
          id: 'IFL',
          order: 1,
          type: 'remoteDataLayer',
          uuid: '5f815a7d-457e-4eae-a8e5-8864a60696ad',
        },
        {
          id: 'PRIMARY_FORESTS',
          order: 2,
          type: 'remoteDataLayer',
          uuid: 'edffb745-e523-462d-ad1e-3052006a3dbc',
        },
        {
          id: 'AG_BIOMASS',
          order: 3,
          type: 'remoteDataLayer',
          uuid: '04526d47-f3f5-4f76-a939-e5f7861fd085',
        },
        {
          id: 'TREE_COVER',
          order: 4,
          type: 'remoteDataLayer',
          uuid: '2569adca-ef87-42c4-a153-57c5e8ba0ef7',
        },
        {
          id: 'LAND_COVER',
          order: 5,
          type: 'remoteDataLayer',
          uuid: 'b8d3f175-0565-443f-839a-49eb890a4b3d',
        },
        {
          id: 'UMD_LAND_COVER',
          order: 6,
          type: 'remoteDataLayer',
          uuid: 'f22e0529-d398-4ccc-b943-e62d420fea89',
        },
        {
          id: 'TREE_COVER_HEIGHT',
          order: 7,
          type: 'remoteDataLayer',
          uuid: '2a83effa-f8be-425b-9766-502e65525861',
        },
        {
          id: 'TREES_MOSAIC_LANDSCAPES',
          order: 8,
          type: 'remoteDataLayer',
          uuid: '9e0c1e1e-a0a3-457f-a373-4104820f7a50',
        },
        {
          id: 'TROPICAL_TREE_COVER',
          order: 9,
          type: 'remoteDataLayer',
          uuid: 'b9183eca-84ed-48ed-83d5-a146a6e2a079',
        },
      ],
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
        ka: 'Recent Imagery',
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
            ka: 'Recent Imagery',
          },
          dynamicSublabel: {
            en: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
            fr: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
            es: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
            pt: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
            id: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
            zh: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
            ka: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
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
        },
      ],
    },
    extraLayers: [
      {
        id: 'MASK',
        type: 'dynamic',
        order: 10000,
        url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/World_Countries_(Generalized)/FeatureServer',
        //url: 'https://gis.forest-atlas.org/server/rest/services/country_masks/country_mask_global/MapServer',
        opacity: 0.35,
        layerIds: [0],
      },

      {
        id: 'USER_FEATURES',
        type: 'graphic',
        visible: true,
      },
    ],
  },
}; */

export default {
  webmap: 'f44474c063cc444aa1c99dd82dafc1f2',
  title: '',
  subtitle: '',
  logoUrl: '',
  logoLinkUrl: 'https://haynatiora-one-madagascar.hub.arcgis.com/',
  aboutLinkUrl: '',
  downloadLinkUrl: '',
  printServiceUrl: 'https://gis.forest-atlas.org/server/rest/services/print/ExportWebMap/GPServer/Export%20Web%20Map',
  maskServiceUrl: '',
  mapThemeIds: '',
  mapThemes: '',
  narrative:
    'Le portail Hay Natiora est conçu pour partager les connaissances et améliorer la prise de décision basée sur des données et informations fiables ; c’est aussi un outil qui joue le rôle d’interface et permet la collaboration entre les différents acteurs, ceux qui gèrent les ressources naturelles, ceux qui font la recherche, ceux qui planifient le développement et ceux qui adaptent les politiques.',
  hideHeader: false,
  hideFooter: false,
  includeMyGFWLogin: false,
  navLinksInNewTab: true,
  customColorTheme: '#f8b571',
  language: 'fr',
  useAlternativeLanguage: true,
  alternativeWebmap: 'f44474c063cc444aa1c99dd82dafc1f2',
  alternativeLanguage: 'en',
  alternativeLanguageTitle: 'Hay Natiora',
  alternativeLanguageSubtitle: '',
  alternativeMapThemes: '',
  alternativeNarrative:
    'The Hay Natiora portal is designed to share knowledge and improve decision-making based on reliable data and information; it is also a tool that acts as an interface and enables collaboration between different actors, those who manage natural resources, those who conduct research, those who plan development and those who adapt policies.',
  alternativeWebmapMenuName: 'EN Web map menu name',
  initialExtent: {
    x: null,
    y: null,
    z: null,
  },
  includeDocumentsTab: true,
  iso: 'MDG',
  viirsFires: true,
  intactForests: true,
  primaryForests: true,
  forma: true,
  aboveGroundBiomass: true,
  landCover: true,
  mangroves: false,
  sadAlerts: false,
  gladAlerts: true,
  gladS2Alerts: true,
  raddAlerts: true,
  gfwIntegratedAlertLayer: true,
  recentImagery: false,
  carbonSequence: true,
  carbonEmissions: false,
  treeCoverHeight: true,
  treeCover: true,
  treeCoverGain: true,
  treeCoverLoss: true,
  treeMosaicLandscapes: true,
  forestCarbonGrossRemovals: true,
  forestCarbonGrossEmissions: true,
  forestCarbonNetFlux: true,
  umdLandCover: true,
  drySpells: true,
  airQuality: true,
  windSpeed: true,
  webmapMenuName: 'Titre du menu de la carte',
  sharinghost: 'https://www.arcgis.com',
  analyticsCode: 'UA-62288390-30',
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
    GROUP_GADM36ADMIN: {
      grouptype: 'default',
      order: 1,
      label: {
        en: 'Administrative boundaries',
        fr: 'Limite administrative',
      },
      layers: [
        {
          order: 1,
          id: 'GADM36_COM',
          type: 'dynamic',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/limite_administrative/FeatureServer/0',
          label: {
            en: 'Communes',
            fr: 'Communes',
          },
          sublabel: {
            en: '(2018, Madagascar, GADM)',
            fr: '(2018, Madagascar, GADM)',
          },
          filterField: {
            en: 'NAME_4',
            fr: 'NAME_4',
          },
          filterLabel: {
            en: 'Commune',
            fr: 'Commune',
          },
          popup: {
            title: {
              en: 'Communes',
              fr: 'Communes',
            },
            content: {
              en: [
                {
                  label: 'Commune',
                  fieldExpression: 'NAME_4',
                },
                {
                  label: 'District',
                  fieldExpression: 'NAME_3',
                },
                {
                  label: 'Region',
                  fieldExpression: 'NAME_2',
                },
                {
                  label: 'Country',
                  fieldExpression: 'NAME_0',
                },
              ],
              fr: [
                {
                  label: 'Commune',
                  fieldExpression: 'NAME_4',
                },
                {
                  label: 'District',
                  fieldExpression: 'NAME_3',
                },
                {
                  label: 'Région',
                  fieldExpression: 'NAME_2',
                },
                {
                  label: 'Pays',
                  fieldExpression: 'NAME_0',
                },
              ],
            },
          },
        },
        {
          order: 2,
          id: 'GADM36_DIS',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/limite_administrative/FeatureServer/1',
          label: {
            en: 'Districts',
            fr: 'Districts',
          },
          sublabel: {
            en: '(2018, Madagascar, GADM)',
            fr: '(2018, Madagascar, GADM)',
          },
          filterField: {
            en: 'NAME_3',
            fr: 'NAME_3',
          },
          filterLabel: {
            en: 'District',
            fr: 'District',
          },
          popup: {
            title: {
              en: 'Districts',
              fr: 'Districts',
            },
            content: {
              en: [
                {
                  label: 'District',
                  fieldExpression: 'NAME_3',
                },
                {
                  label: 'Region',
                  fieldExpression: 'NAME_2',
                },
                {
                  label: 'Country',
                  fieldExpression: 'NAME_0',
                },
              ],
              fr: [
                {
                  label: 'District',
                  fieldExpression: 'NAME_3',
                },
                {
                  label: 'Région',
                  fieldExpression: 'NAME_2',
                },
                {
                  label: 'Pays',
                  fieldExpression: 'NAME_0',
                },
              ],
            },
          },
        },
        {
          order: 3,
          id: 'GADM36_REG',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/limite_administrative/FeatureServer/2',
          label: {
            en: 'Regions',
            fr: 'Régions',
          },
          sublabel: {
            en: '(2018, Madagascar, GADM)',
            fr: '(2018, Madagascar, GADM)',
          },
          filterField: {
            en: 'NAME_2',
            fr: 'NAME_2',
          },
          filterLabel: {
            en: 'Region',
            fr: 'Région',
          },
          popup: {
            title: {
              en: 'Regions',
              fr: 'Régions',
            },
            content: {
              en: [
                {
                  label: 'Region',
                  fieldExpression: 'NAME_2',
                },
                {
                  label: 'Country',
                  fieldExpression: 'NAME_0',
                },
              ],
              fr: [
                {
                  label: 'Région',
                  fieldExpression: 'NAME_2',
                },
                {
                  label: 'Pays',
                  fieldExpression: 'NAME_0',
                },
              ],
            },
          },
        },
        {
          order: 4,
          id: 'GADM36_COU',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/limite_administrative/FeatureServer/3',
          label: {
            en: 'Country',
            fr: 'Pays',
          },
          sublabel: {
            en: '(2018, Madagascar, GADM)',
            fr: '(2018, Madagascar, GADM)',
          },
          popup: {
            title: {
              en: 'Country',
              fr: 'Pays',
            },
            content: {
              en: [
                {
                  label: 'Country',
                  fieldExpression: 'NAME_0',
                },
              ],
              fr: [
                {
                  label: 'Pays',
                  fieldExpression: 'NAME_0',
                },
              ],
            },
          },
        },
      ],
    },
    GROUP_FEUX: {
      groupType: 'default',
      order: 2,
      label: {
        en: 'Fire alerts',
        fr: 'Alertes feux',
        es: 'Fire alerts',
        pt: 'Fire alerts',
        id: 'Fire alerts',
        zh: 'Fire alerts',
        ka: 'Fire alerts',
      },
      layers: [
        {
          id: 'VIIRS_ACTIVE_FIRES',
          order: 1,
          type: 'remoteDataLayer',
          uuid: '6d316908-92c8-4f95-8598-f2a0c72786af',
        },
      ],
    },
    GROUP_DEFORESTATION: {
      groupType: 'default',
      order: 3,
      label: {
        en: 'Deforestation alerts',
        fr: 'Alertes de déforestation',
        es: 'Deforestation alerts',
        pt: 'Deforestation alerts',
        id: 'Deforestation alerts',
        zh: 'Deforestation alerts',
        ka: 'Deforestation alerts',
      },
      layers: [
        {
          id: 'GFW_INTEGRATED_ALERTS',
          order: 1,
          type: 'remoteDataLayer',
          uuid: 'bd58f25d-d3bb-4d59-9daa-cecddd27d9f4',
          groupId: 'GROUP_DEFORESTATION',
        },
        {
          id: 'GLAD_ALERTS',
          order: 2,
          type: 'remoteDataLayer',
          uuid: '356f862b-3e70-493a-997b-dc2a193410e9',
        },
        {
          id: 'GLAD_S2_ALERTS',
          order: 3,
          type: 'remoteDataLayer',
          uuid: '3b869953-48c4-48d0-8023-5c64a311f3dd',
          groupId: 'GROUP_DEFORESTATION',
        },
        {
          id: 'RADD_ALERTS',
          order: 4,
          type: 'remoteDataLayer',
          uuid: '440e53d0-36b3-47ad-993a-1c2018c3942c',
          groupId: 'GROUP_DEFORESTATION',
        },
      ],
    },
    GROUP_LANDTENURE: {
      grouptype: 'default',
      order: 5,
      label: {
        en: 'Land status',
        fr: 'Statut des terres',
      },
      layers: [
        {
          order: 1,
          id: 'OCCFONCIERE',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Statut_des_terres/FeatureServer/0',
          label: {
            en: 'Land parcel',
            fr: 'Occupation foncière',
          },
          sublabel: {
            en: '(2019, Menabe, Sehatra Iombonana ho an’ny Fananan-tany)',
            fr: '(2019, Menabe, Sehatra Iombonana ho an’ny Fananan-tany)',
          },
          popup: {
            title: {
              en: 'Land parcel',
              fr: 'Occupation foncière',
            },
            content: {
              en: [
                {
                  label: 'Land parcel identification',
                  fieldExpression: 'ID_PAR',
                },
                {
                  label: 'Commune',
                  fieldExpression: 'COM',
                },
                {
                  label: 'Fokontany',
                  fieldExpression: 'FKT',
                },
                {
                  label: 'Village',
                  fieldExpression: 'VILLAGE',
                },
                {
                  label: 'Land use',
                  fieldExpression: 'UTILISATIO',
                },
              ],
              fr: [
                {
                  label: 'Identification parcelle',
                  fieldExpression: 'ID_PAR',
                },
                {
                  label: 'Commune',
                  fieldExpression: 'COM',
                },
                {
                  label: 'Fokontany',
                  fieldExpression: 'FKT',
                },
                {
                  label: 'Village',
                  fieldExpression: 'VILLAGE',
                },
                {
                  label: 'Utilisation',
                  fieldExpression: 'UTILISATIO',
                },
              ],
            },
          },
        },
        {
          order: 2,
          id: 'SUP_RECENS',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Statut_des_terres/FeatureServer/1',
          label: {
            en: 'Surveyed area',
            fr: 'Superficie recensée',
          },
          sublabel: {
            en: '(2019, Menabe, Sehatra Iombonana ho an’ny Fananan-tany)',
            fr: '(2019, Menabe, Sehatra Iombonana ho an’ny Fananan-tany)',
          },
          popup: {
            title: {
              en: 'Surveyed area',
              fr: 'Superficie recensée',
            },
            content: {
              en: [
                {
                  label: 'Name',
                  fieldExpression: 'MYNAME',
                },
                {
                  label: 'Area (ha)',
                  fieldExpression: 'AREA_HA',
                },
              ],
              fr: [
                {
                  label: 'Nom',
                  fieldExpression: 'MYNAME',
                },
                {
                  label: 'Superficie (ha)',
                  fieldExpression: 'AREA_HA',
                },
              ],
            },
          },
        },
        {
          order: 3,
          id: 'ZOC',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Statut_des_terres/FeatureServer/2',
          label: {
            en: 'Controled occupied zone',
            fr: 'Zone d’occupation controlée',
          },
          sublabel: {
            en: '(2019, Menabe, Sehatra Iombonana ho an’ny Fananan-tany)',
            fr: '(2019, Menabe, Sehatra Iombonana ho an’ny Fananan-tany)',
          },
          popup: {
            title: {
              en: 'Controled occupied zone',
              fr: 'Zone d’occupation controlée',
            },
            content: {
              en: [
                {
                  label: 'Name',
                  fieldExpression: 'Name',
                },
              ],
              fr: [
                {
                  label: 'Nom',
                  fieldExpression: 'Name',
                },
              ],
            },
          },
        },
        {
          order: 4,
          id: 'ZUD',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Statut_des_terres/FeatureServer/3',
          label: {
            en: 'Controled used zone',
            fr: 'Zone d’utilisation controlée',
          },
          sublabel: {
            en: '(2019, Menabe, Sehatra Iombonana ho an’ny Fananan-tany)',
            fr: '(2019, Menabe, Sehatra Iombonana ho an’ny Fananan-tany)',
          },
          popup: {
            title: {
              en: 'Controled used zone',
              fr: 'Zone d’utilisation controlée',
            },
            content: {
              en: [
                {
                  label: 'Description',
                  fieldExpression: 'descriptio',
                },
                {
                  label: 'Area (ha)',
                  fieldExpression: 'Superf_ha',
                },
              ],
              fr: [
                {
                  label: 'Description',
                  fieldExpression: 'descriptio',
                },
                {
                  label: 'Superficie (ha)',
                  fieldExpression: 'Superf_ha',
                },
              ],
            },
          },
        },
        {
          order: 5,
          id: 'PPNT',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Statut_des_terres/FeatureServer/4',
          label: {
            en: 'Private property without title',
            fr: 'Propriété privée non titrée',
          },
          sublabel: {
            en: '(2019, Menabe, Sehatra Iombonana ho an’ny Fananan-tany)',
            fr: '(2019, Menabe, Sehatra Iombonana ho an’ny Fananan-tany)',
          },
          popup: {
            title: {
              en: 'Private property without title',
              fr: 'Propriété privée non titrée',
            },
            content: {
              en: [
                {
                  label: 'Name',
                  fieldExpression: 'MYNAME',
                },
                {
                  label: 'Area (ha)',
                  fieldExpression: 'Surf',
                },
              ],
              fr: [
                {
                  label: 'Nom',
                  fieldExpression: 'MYNAME',
                },
                {
                  label: 'Superficie (ha)',
                  fieldExpression: 'Surf',
                },
              ],
            },
          },
        },
        {
          order: 6,
          id: 'PPT',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Statut_des_terres/FeatureServer/5',
          label: {
            en: 'Private property with title',
            fr: 'Propriété privée titrée',
          },
          sublabel: {
            en: '(2019, Menabe, Sehatra Iombonana ho an’ny Fananan-tany)',
            fr: '(2019, Menabe, Sehatra Iombonana ho an’ny Fananan-tany)',
          },
          popup: {
            title: {
              en: 'Private property with title',
              fr: 'Propriété privée titrée',
            },
            content: {
              en: [
                {
                  label: 'Name',
                  fieldExpression: 'MYNAME',
                },
                {
                  label: 'Area (ha)',
                  fieldExpression: 'Surf',
                },
              ],
              fr: [
                {
                  label: 'Nom',
                  fieldExpression: 'MYNAME',
                },
                {
                  label: 'Superficie (ha)',
                  fieldExpression: 'Surf',
                },
              ],
            },
          },
        },
        {
          order: 7,
          id: 'SUP_DOM_PUBLIQUE',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Statut_des_terres/FeatureServer/6',
          label: {
            en: 'Public domain',
            fr: 'Domaine publique',
          },
          sublabel: {
            en: '(2019, Menabe, Sehatra Iombonana ho an’ny Fananan-tany)',
            fr: '(2019, Menabe, Sehatra Iombonana ho an’ny Fananan-tany)',
          },
          popup: {
            title: {
              en: 'Public domain',
              fr: 'Domaine publique',
            },
            content: {
              en: [
                {
                  label: 'Name',
                  fieldExpression: 'MYNAME',
                },
                {
                  label: 'Area (ha)',
                  fieldExpression: 'Surf',
                },
              ],
              fr: [
                {
                  label: 'Nom',
                  fieldExpression: 'MYNAME',
                },
                {
                  label: 'Superficie (ha)',
                  fieldExpression: 'Surf',
                },
              ],
            },
          },
        },
        {
          order: 8,
          id: 'SUP_DOM_PRIVATE',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Statut_des_terres/FeatureServer/7',
          label: {
            en: 'Private domain',
            fr: 'Domaine privé',
          },
          sublabel: {
            en: '(2019, Menabe, Sehatra Iombonana ho an’ny Fananan-tany)',
            fr: '(2019, Menabe, Sehatra Iombonana ho an’ny Fananan-tany)',
          },
          popup: {
            title: {
              en: 'Private domain',
              fr: 'Domaine privé',
            },
            content: {
              en: [
                {
                  label: 'Name',
                  fieldExpression: 'MYNAME',
                },
                {
                  label: 'Area (ha)',
                  fieldExpression: 'Surf',
                },
              ],
              fr: [
                {
                  label: 'Nom',
                  fieldExpression: 'MYNAME',
                },
                {
                  label: 'Superficie (ha)',
                  fieldExpression: 'Surf',
                },
              ],
            },
          },
        },
      ],
    },
    GROUP_CONSERVATIONTER: {
      groupType: 'default',
      order: 6,
      label: {
        en: 'Terrestrial conservation',
        fr: 'Conservation terrestre',
      },
      layers: [
        {
          id: 'TER_APZON',
          order: 1,
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Conservation_terrestre/FeatureServer/0',
          label: {
            en: 'Protected areas zonation',
            fr: 'Aire protégée zonage',
          },
          sublabel: {
            en: '(Madagascar, Ministry of Environment and Sustainable Development)',
            fr: '(Madagascar, Ministère de l’Environnement et du Développement Durable)',
          },
          popup: {
            title: {
              en: 'Protected areas zonation',
              fr: 'Aire protégée zonage',
            },
            content: {
              en: [
                {
                  label: 'Name',
                  fieldExpression: 'short_nom',
                },
                {
                  label: 'Zonation',
                  fieldExpression: 'zonage',
                },
                {
                  label: 'Toponymie',
                  fieldExpression: 'toponyme',
                },
                {
                  label: 'Area (ha)',
                  fieldExpression: 'sup_sig_ha',
                },
              ],
              fr: [
                {
                  label: 'Nom',
                  fieldExpression: 'short_nom',
                },
                {
                  label: 'Zonage',
                  fieldExpression: 'zonage',
                },
                {
                  label: 'Toponyme',
                  fieldExpression: 'toponyme',
                },
                {
                  label: 'Superficie (ha)',
                  fieldExpression: 'sup_sig_ha',
                },
              ],
            },
          },
        },
        {
          id: 'APTER_APTER',
          order: 2,
          type: 'feature',
          visible: false,
          opacity: 0.7,
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Conservation_terrestre/FeatureServer/1',
          label: {
            en: 'Terrestrial protected areas',
            fr: 'Aire protégée terrestre',
          },
          sublabel: {
            en: '(2015, Madagascar, Ministry of Environment and Sustainable Development)',
            fr: '(2015, Madagascar, Ministère de l’Environnement et du Développement Durable)',
          },
          filterField: {
            en: 'short_name',
            fr: 'short_name',
          },
          filterLabel: {
            en: 'Name',
            fr: 'Nom',
          },
          popup: {
            title: {
              en: 'Terrestrial protected areas',
              fr: 'Aire protégée terrestre',
            },
            content: {
              en: [
                {
                  label: 'Name',
                  fieldExpression: 'short_name',
                },
                {
                  label: 'Full name',
                  fieldExpression: 'full_name',
                },
                {
                  label: 'Province',
                  fieldExpression: 'province',
                },
                {
                  label: 'Region',
                  fieldExpression: 'region',
                },
                {
                  label: 'District',
                  fieldExpression: 'district',
                },
                {
                  label: 'Administrative area (ha)',
                  fieldExpression: 'sup_adm_ha',
                },
                {
                  label: 'Area in decree (ha)',
                  fieldExpression: 'sup_dec_ha',
                },
                {
                  label: 'Area GIS (ha)',
                  fieldExpression: 'sup_sig_ha',
                },
                {
                  label: 'Legal status',
                  fieldExpression: 'statut_iur',
                },
                {
                  label: 'IUCN category',
                  fieldExpression: 'cat_uicn',
                },
                {
                  label: 'Manager',
                  fieldExpression: 'gest_1',
                },
                {
                  label: 'Manager (Short)',
                  fieldExpression: 'gest_2',
                },
                {
                  label: 'Creation status',
                  fieldExpression: 'statu_crea',
                },
                {
                  label: 'Definition status',
                  fieldExpression: 'statu_def',
                },
                {
                  label: 'Creation date',
                  fieldExpression: 'date_crea',
                },
                {
                  label: 'Management',
                  fieldExpression: 'gouvernanc',
                },
                {
                  label: 'Protected area type',
                  fieldExpression: 'type_',
                },
              ],
              fr: [
                {
                  label: 'Nom',
                  fieldExpression: 'short_name',
                },
                {
                  label: 'Nom complet',
                  fieldExpression: 'full_name',
                },
                {
                  label: 'Province',
                  fieldExpression: 'province',
                },
                {
                  label: 'Région',
                  fieldExpression: 'region',
                },
                {
                  label: 'District',
                  fieldExpression: 'district',
                },
                {
                  label: 'Superficie administrative (ha)',
                  fieldExpression: 'sup_adm_ha',
                },
                {
                  label: 'Superficie décret (ha)',
                  fieldExpression: 'sup_dec_ha',
                },
                {
                  label: 'Superficie SIG (ha)',
                  fieldExpression: 'sup_sig_ha',
                },
                {
                  label: 'Statut juridique',
                  fieldExpression: 'statut_iur',
                },
                {
                  label: 'Catégorie UICN',
                  fieldExpression: 'cat_uicn',
                },
                {
                  label: 'Gestionnaire',
                  fieldExpression: 'gest_1',
                },
                {
                  label: 'Gestionnaire (Abr.)',
                  fieldExpression: 'gest_2',
                },
                {
                  label: 'Statut de création',
                  fieldExpression: 'statu_crea',
                },
                {
                  label: 'Statut de définition',
                  fieldExpression: 'statu_def',
                },
                {
                  label: 'Date de création',
                  fieldExpression: 'date_crea',
                },
                {
                  label: 'Gouvernance',
                  fieldExpression: 'gouvernanc',
                },
                {
                  label: 'Type d’aire protégée',
                  fieldExpression: 'type_',
                },
              ],
            },
          },
        },
        {
          order: 3,
          id: 'APTER_SAPM',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Conservation_terrestre/FeatureServer/2',
          label: {
            en: 'Extension and potential terrestrial areas',
            fr: 'Aires d’extension et aires potentielles terrestres',
          },
          sublabel: {
            en: '(2016, Madagascar, Ministry of Environment and Sustainable Development)',
            fr: '(2016, Madagascar, Ministère de l’Environnement et du Développement Durable)',
          },
          popup: {
            title: {
              en: 'Extension and potential terrestrial areas',
              fr: 'Aires d’extension et aires potentielles terrestres',
            },
            content: {
              en: [
                {
                  label: 'Manager',
                  fieldExpression: 'DATAADMIN',
                },
                {
                  label: 'Name',
                  fieldExpression: 'NOM',
                },
                {
                  label: 'Other name (1)',
                  fieldExpression: 'AUTRE_NOM',
                },
                {
                  label: 'Other name (2)',
                  fieldExpression: 'AUTRES_NOM',
                },
                {
                  label: 'Creation year',
                  fieldExpression: 'ANNEE_CREA',
                },
                {
                  label: 'IUCN Category',
                  fieldExpression: 'CAT__IUCN',
                },
                {
                  label: 'Decree',
                  fieldExpression: 'CREATION',
                },
                {
                  label: 'Status',
                  fieldExpression: 'STATUT_AP',
                },
                {
                  label: 'Status (Short)',
                  fieldExpression: 'STATUT',
                },
                {
                  label: 'Description',
                  fieldExpression: 'Descript_1',
                },
                {
                  label: 'Class',
                  fieldExpression: 'CLASSE',
                },
                {
                  label: 'Type',
                  fieldExpression: 'TYPE',
                },
                {
                  label: 'Perimeter',
                  fieldExpression: 'Perim',
                },
                {
                  label: 'Area (ha)',
                  fieldExpression: 'Area_Hecta',
                },
                {
                  label: 'Area GIS (ha)',
                  fieldExpression: 'AREAHA_SIG',
                },
              ],
              fr: [
                {
                  label: 'Gestionnaire',
                  fieldExpression: 'DATAADMIN',
                },
                {
                  label: 'Nom',
                  fieldExpression: 'NOM',
                },
                {
                  label: 'Autre nom (1)',
                  fieldExpression: 'AUTRE_NOM',
                },
                {
                  label: 'Autre nom (2)',
                  fieldExpression: 'AUTRES_NOM',
                },
                {
                  label: 'Année de création',
                  fieldExpression: 'ANNEE_CREA',
                },
                {
                  label: 'Catégorie UICN',
                  fieldExpression: 'CAT__IUCN',
                },
                {
                  label: 'Décret',
                  fieldExpression: 'CREATION',
                },
                {
                  label: 'Statut',
                  fieldExpression: 'STATUT_AP',
                },
                {
                  label: 'Statut(Abr.)',
                  fieldExpression: 'STATUT',
                },
                {
                  label: 'Description',
                  fieldExpression: 'Descript_1',
                },
                {
                  label: 'Classe',
                  fieldExpression: 'CLASSE',
                },
                {
                  label: 'Type',
                  fieldExpression: 'TYPE',
                },
                {
                  label: 'Périmètre',
                  fieldExpression: 'Perim',
                },
                {
                  label: 'Supericie (ha)',
                  fieldExpression: 'Area_Hecta',
                },
                {
                  label: 'Superficie SIG (ha)',
                  fieldExpression: 'AREAHA_SIG',
                },
              ],
            },
          },
        },
        {
          order: 4,
          id: 'TER_TGRN',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Conservation_terrestre/FeatureServer/3',
          label: {
            en: 'Transfer of natural resource management',
            fr: 'Transfert de gestion des ressources naturelles (TGRN)',
          },
          sublabel: {
            en: '(Madagascar, Ministry of Environment and Sustainable Development)',
            fr: '(Madagascar, Ministère de l’Environnement et du Développement Durable)',
          },
          popup: {
            title: {
              en: 'Limit TGRN',
              fr: 'Limite des TGRN',
            },
            content: {
              en: [
                {
                  label: 'Name',
                  fieldExpression: 'voi',
                },
              ],
              fr: [
                {
                  label: 'Nom',
                  fieldExpression: 'voi',
                },
              ],
            },
          },
        },
      ],
    },
    GROUP_FORESTCOVER: {
      groupType: 'nested',
      order: 7,
      label: {
        en: 'Forest cover',
        fr: 'Couverture forestière',
      },
      layers: [
        {
          order: 3,
          id: 'SUBGROUP_ONE',
          label: {
            en: 'Forest cover PERR-FH (ONE et al. 2015)',
            fr: 'Couverture forestière PERR-FH (ONE et al. 2015)',
          },
          nestedLayers: [
            {
              order: 1,
              id: 'FCCMDG2013',
              type: 'tiled',
              url: 'https://tiles.arcgis.com/tiles/iv56fY5TFtS8nlsY/arcgis/rest/services/Couverture_forestiere/MapServer',
              layerIds: [1],
              label: {
                en: 'Year 2013',
                fr: 'Année 2013',
              },
              sublabel: {
                en: '(2013, Madagascar, ONE/DGF/MNP/WCS/Etc Terra)',
                fr: '(2013, Madagascar, ONE/DGF/MNP/WCS/Etc Terra)',
              },
            },
            {
              order: 2,
              id: 'FCCMDG2010',
              type: 'tiled',
              url: 'https://tiles.arcgis.com/tiles/iv56fY5TFtS8nlsY/arcgis/rest/services/Couverture_forestiere/MapServer',
              layerIds: [2],
              label: {
                en: 'Year 2010',
                fr: 'Année 2010',
              },
              sublabel: {
                en: '(2010, Madagascar, ONE/DGF/MNP/WCS/Etc Terra)',
                fr: '(2010, Madagascar, ONE/DGF/MNP/WCS/Etc Terra)',
              },
            },
            {
              order: 3,
              id: 'FCCMDG2005',
              type: 'tiled',
              url: 'https://tiles.arcgis.com/tiles/iv56fY5TFtS8nlsY/arcgis/rest/services/Couverture_forestiere/MapServer',
              layerIds: [3],
              label: {
                en: 'Year 2005',
                fr: 'Année 2005',
              },
              sublabel: {
                en: '(2005, Madagascar, ONE/DGF/MNP/WCS/Etc Terra)',
                fr: '(2005, Madagascar, ONE/DGF/MNP/WCS/Etc Terra)',
              },
            },
          ],
        },
        {
          order: 4,
          id: 'SUBGROUP_VIEILLEDENT',
          label: {
            en: 'Forest cover (Vieilledent et al. 2018)',
            fr: 'Couverture forestière (Vieilledent et al. 2018)',
          },
          nestedLayers: [
            {
              order: 1,
              id: 'FORMDG2017',
              type: 'tiled',
              url: 'https://tiles.arcgis.com/tiles/iv56fY5TFtS8nlsY/arcgis/rest/services/Couverture_forestiere/MapServer',
              layerIds: [5],
              label: {
                en: 'Year 2017',
                fr: 'Année 2017',
              },
              sublabel: {
                en: '(2017, Madagascar, Vieilledent et al.)',
                fr: '(2017, Madagascar, Vieilledent et al.)',
              },
            },
            {
              order: 2,
              id: 'FORMDG2015',
              type: 'tiled',
              url: 'https://tiles.arcgis.com/tiles/iv56fY5TFtS8nlsY/arcgis/rest/services/Couverture_forestiere/MapServer',
              layerIds: [6],
              label: {
                en: 'Year 2015',
                fr: 'Année 2015',
              },
              sublabel: {
                en: '(2015, Madagascar, Vieilledent et al.)',
                fr: '(2015, Madagascar, Vieilledent et al.)',
              },
            },
            {
              order: 3,
              id: 'FORMDG2010',
              type: 'tiled',
              url: 'https://tiles.arcgis.com/tiles/iv56fY5TFtS8nlsY/arcgis/rest/services/Couverture_forestiere/MapServer',
              layerIds: [7],
              label: {
                en: 'Year 2010',
                fr: 'Année 2010',
              },
              sublabel: {
                en: '(2010, Madagascar, Vieilledent et al.)',
                fr: '(2010, Madagascar, Vieilledent et al.)',
              },
            },
            {
              order: 4,
              id: 'FORMDG2005',
              type: 'tiled',
              url: 'https://tiles.arcgis.com/tiles/iv56fY5TFtS8nlsY/arcgis/rest/services/Couverture_forestiere/MapServer',
              layerIds: [8],
              label: {
                en: 'Year 2005',
                fr: 'Année 2005',
              },
              sublabel: {
                en: '(2005, Madagascar, Vieilledent et al.)',
                fr: '(2005, Madagascar, Vieilledent et al.)',
              },
            },
            {
              order: 5,
              id: 'FORMDG2000',
              type: 'tiled',
              url: 'https://tiles.arcgis.com/tiles/iv56fY5TFtS8nlsY/arcgis/rest/services/Couverture_forestiere/MapServer',
              layerIds: [9],
              label: {
                en: 'Year 2000',
                fr: 'Année 2000',
              },
              sublabel: {
                en: '(2000, Madagascar, Vieilledent et al.)',
                fr: '(2000, Madagascar, Vieilledent et al.)',
              },
            },
            {
              order: 6,
              id: 'FORMDG1990',
              type: 'tiled',
              url: 'https://tiles.arcgis.com/tiles/iv56fY5TFtS8nlsY/arcgis/rest/services/Couverture_forestiere/MapServer',
              layerIds: [10],
              label: {
                en: 'Year 1990',
                fr: 'Année 1990',
              },
              sublabel: {
                en: '(1990, Madagascar, Vieilledent et al.)',
                fr: '(1990, Madagascar, Vieilledent et al.)',
              },
            },
            {
              order: 7,
              id: 'FORMDG1973',
              type: 'tiled',
              url: 'https://tiles.arcgis.com/tiles/iv56fY5TFtS8nlsY/arcgis/rest/services/Couverture_forestiere/MapServer',
              layerIds: [11],
              label: {
                en: 'Year 1973',
                fr: 'Année 1973',
              },
              sublabel: {
                en: '(1973, Madagascar, Vieilledent et al.)',
                fr: '(1973, Madagascar, Vieilledent et al.)',
              },
            },
            {
              order: 8,
              id: 'FORMDG1953',
              type: 'tiled',
              url: 'https://tiles.arcgis.com/tiles/iv56fY5TFtS8nlsY/arcgis/rest/services/Couverture_forestiere/MapServer',
              layerIds: [12],
              label: {
                en: 'Year 1953',
                fr: 'Année 1953',
              },
              sublabel: {
                en: '(1953, Madagascar, Vieilledent et al.)',
                fr: '(1953, Madagascar, Vieilledent et al.)',
              },
            },
          ],
        },
      ],
    },
    GROUP_CONSERVATIONMAR: {
      groupType: 'default',
      order: 9,
      label: {
        en: 'Marine conservation',
        fr: 'Conservation marine',
      },
      layers: [
        {
          id: 'MAR_AP',
          order: 1,
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Conservation_marine/FeatureServer/0',
          label: {
            en: 'Marine protected areas',
            fr: 'Aires marines protégées',
          },
          sublabel: {
            en: '(2015, Madagascar, Ministry of Environment and Sustainable Development)',
            fr: '(2015, Madagascar, Ministère de l’Environnement et du Développement Durable)',
          },
          popup: {
            title: {
              en: 'Marine protected areas',
              fr: 'Aires marines protégées',
            },
            content: {
              en: [
                {
                  label: 'Name',
                  fieldExpression: 'short_name',
                },
                {
                  label: 'Full name',
                  fieldExpression: 'full_name',
                },
                {
                  label: 'Province',
                  fieldExpression: 'province',
                },
                {
                  label: 'Region',
                  fieldExpression: 'region',
                },
                {
                  label: 'District',
                  fieldExpression: 'district',
                },
                {
                  label: 'Administrative area (ha)',
                  fieldExpression: 'sup_adm_ha',
                },
                {
                  label: 'Area in decree (ha)',
                  fieldExpression: 'sup_dec_ha',
                },
                {
                  label: 'Area GIS (ha)',
                  fieldExpression: 'sup_sig_ha',
                },
                {
                  label: 'Legal status',
                  fieldExpression: 'statut_iur',
                },
                {
                  label: 'IUCN category',
                  fieldExpression: 'cat_uicn',
                },
                {
                  label: 'Manager',
                  fieldExpression: 'gest_1',
                },
                {
                  label: 'Manager (Short)',
                  fieldExpression: 'gest_2',
                },
                {
                  label: 'Creation status',
                  fieldExpression: 'statu_crea',
                },
                {
                  label: 'Definition status',
                  fieldExpression: 'statu_def',
                },
                {
                  label: 'Creation date',
                  fieldExpression: 'date_crea',
                },
                {
                  label: 'Management',
                  fieldExpression: 'gouvernanc',
                },
                {
                  label: 'Protected area type',
                  fieldExpression: 'type_',
                },
              ],
              fr: [
                {
                  label: 'Nom',
                  fieldExpression: 'short_name',
                },
                {
                  label: 'Nom complet',
                  fieldExpression: 'full_name',
                },
                {
                  label: 'Province',
                  fieldExpression: 'province',
                },
                {
                  label: 'Région',
                  fieldExpression: 'region',
                },
                {
                  label: 'District',
                  fieldExpression: 'district',
                },
                {
                  label: 'Superficie administrative (ha)',
                  fieldExpression: 'sup_adm_ha',
                },
                {
                  label: 'Superficie décret (ha)',
                  fieldExpression: 'sup_dec_ha',
                },
                {
                  label: 'Superficie SIG (ha)',
                  fieldExpression: 'sup_sig_ha',
                },
                {
                  label: 'Statut juridique',
                  fieldExpression: 'statut_iur',
                },
                {
                  label: 'Catégorie UICN',
                  fieldExpression: 'cat_uicn',
                },
                {
                  label: 'Gestionnaire',
                  fieldExpression: 'gest_1',
                },
                {
                  label: 'Gestionnaire (Abr.)',
                  fieldExpression: 'gest_2',
                },
                {
                  label: 'Statut de création',
                  fieldExpression: 'statu_crea',
                },
                {
                  label: 'Statut de définition',
                  fieldExpression: 'statu_def',
                },
                {
                  label: 'Date de création',
                  fieldExpression: 'date_crea',
                },
                {
                  label: 'Gouvernance',
                  fieldExpression: 'gouvernanc',
                },
                {
                  label: 'Type d’aire protégée',
                  fieldExpression: 'type_',
                },
              ],
            },
          },
        },
        {
          order: 2,
          id: 'MAR_LMMA_MADA',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Conservation_marine/FeatureServer/1',
          label: {
            en: 'Locally Managed Marine Area (LMMA)',
            fr: 'Zone marine gérée localement (LMMA)',
          },
          sublabel: {
            en: '(Madagascar, Ministry of Environment and Sustainable Development, WWF Madagascar, WCS Madagascar, Blue Ventures, Asity Madagascar, Mihary)',
            fr: '(Madagascar, Ministère de l’Environnement et du Développement Durable, WWF Madagascar, WCS Madagascar, Blue Ventures, Asity Madagascar, Mihary)',
          },
          popup: {
            title: {
              en: 'Locally Managed Marine Area (LMMA)',
              fr: 'Zone marine gérée localement (LMMA)',
            },
            content: {
              en: [
                {
                  label: 'Name',
                  fieldExpression: 'LMMA_Name',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'Y',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'X',
                },
                {
                  label: 'Localisation',
                  fieldExpression: 'Localisati',
                },
                {
                  label: 'District',
                  fieldExpression: 'District',
                },
                {
                  label: 'Region',
                  fieldExpression: 'Region',
                },
                {
                  label: 'Promoting',
                  fieldExpression: 'Promoting',
                },
                {
                  label: 'Year of establishment',
                  fieldExpression: 'YEAR_OFES2',
                },
                {
                  label: 'Legislation',
                  fieldExpression: 'Legislatio',
                },
                {
                  label: 'Habitats',
                  fieldExpression: 'Habitats_p',
                },
                {
                  label: 'Zonations',
                  fieldExpression: 'Zonations',
                },
                {
                  label: 'Financial',
                  fieldExpression: 'Financial',
                },
              ],
              fr: [
                {
                  label: 'Nom',
                  fieldExpression: 'LMMA_Name',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'Y',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'X',
                },
                {
                  label: 'Localisation',
                  fieldExpression: 'Localisati',
                },
                {
                  label: 'District',
                  fieldExpression: 'District',
                },
                {
                  label: 'Région',
                  fieldExpression: 'Region',
                },
                {
                  label: 'Promoteur',
                  fieldExpression: 'Promoting',
                },
                {
                  label: 'Année',
                  fieldExpression: 'YEAR_OFES2',
                },
                {
                  label: 'Législation',
                  fieldExpression: 'Legislatio',
                },
                {
                  label: 'Habitats',
                  fieldExpression: 'Habitats_p',
                },
                {
                  label: 'Zonages',
                  fieldExpression: 'Zonations',
                },
                {
                  label: 'Financement',
                  fieldExpression: 'Financial',
                },
              ],
            },
          },
        },
        {
          order: 3,
          id: 'MAR_ZPCM',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Conservation_marine/FeatureServer/2',
          label: {
            en: 'Potential marine conservation zone',
            fr: 'Zone potentielle de conservation marine (ZPCM)',
          },
          sublabel: {
            en: '(2017, Madagascar, WCS)',
            fr: '(2017, Madagascar, WCS)',
          },
          popup: {
            title: {
              en: 'Potential marine conservation zone',
              fr: 'Zone potentielle de conservation marine (ZPCM)',
            },
            content: {
              en: [
                {
                  label: 'Name',
                  fieldExpression: 'DESCRIP',
                },
                {
                  label: 'Area GIS (ha)',
                  fieldExpression: 'AREA_HA',
                },
              ],
              fr: [
                {
                  label: 'Nom',
                  fieldExpression: 'DESCRIP',
                },
                {
                  label: 'Superficie SIG (ha)',
                  fieldExpression: 'AREA_HA',
                },
              ],
            },
          },
        },
      ],
    },
    GROUP_PECHEMAR: {
      groupType: 'nested',
      order: 10,
      label: {
        en: 'Maritime fisheries',
        fr: 'Pêches maritimes',
      },
      layers: [
        {
          order: 1,
          id: 'SUBGROUP_PECHEMARIT',
          label: {
            en: 'Maritime fisheries',
            fr: 'Pêches maritimes',
          },
          nestedLayers: [
            {
              id: 'MAR_SHRIMP',
              dashboardURL: 'https://one-madagascar.maps.arcgis.com/apps/dashboards/1889eafddf4a40529958ac17d16ff052',
              order: 1,
              type: 'feature',
              url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Peches_maritimes/FeatureServer/0',
              label: {
                en: 'Shrimp catch evolution, 2008-2018',
                fr: 'Evolution de la capture crevettière, 2008-2018',
              },
              sublabel: {
                en: '(Madagascar, Ministry of Agriculture, Livestock and Fisheries)',
                fr: '(Madagascar, Ministère de l’Agriculture, de l’Elevage et de la Pêche)',
              },
              popup: {
                title: {
                  en: 'Shrimp potential (tonnes)',
                  fr: 'Potentiel crevette (tonnes)',
                },
                content: {
                  en: [
                    {
                      label: 'Cell',
                      fieldExpression: 'Cell',
                    },
                    {
                      label: 'Zone grande',
                      fieldExpression: 'ZGrande',
                    },
                    {
                      label: 'Zone petite',
                      fieldExpression: 'ZPetite',
                    },
                    {
                      label: 'Shrimp potential (tonnes)',
                      fieldExpression: 'Shrimp_Potential',
                    },
                  ],
                  fr: [
                    {
                      label: 'Cell',
                      fieldExpression: 'Cell',
                    },
                    {
                      label: 'Zone grande',
                      fieldExpression: 'ZGrande',
                    },
                    {
                      label: 'Zone petite',
                      fieldExpression: 'ZPetite',
                    },
                    {
                      label: 'Potentiel crevette (tonnes)',
                      fieldExpression: 'Shrimp_Potential',
                    },
                  ],
                },
              },
            },
            {
              id: 'MAR_PAP',
              order: 2,
              type: 'feature',
              url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Peches_maritimes/FeatureServer/1',
              label: {
                en: 'Fisheries management plans',
                fr: 'Plans d’aménagement des pêches (PAP)',
              },
              sublabel: {
                en: '(Madagascar, Ministry of Agriculture, Livestock and Fisheries)',
                fr: '(Madagascar, Ministère de l’Agriculture, de l’Elevage et de la Pêche)',
              },
              popup: {
                title: {
                  en: 'PAP boundaries',
                  fr: 'Limite PAP',
                },
                content: {
                  en: [
                    {
                      label: 'Name',
                      fieldExpression: 'NAME',
                    },
                    {
                      label: 'Full name',
                      fieldExpression: 'ORIG_NAME',
                    },
                  ],
                  fr: [
                    {
                      label: 'Nom',
                      fieldExpression: 'NAME',
                    },
                    {
                      label: 'Nom complet',
                      fieldExpression: 'ORIG_NAME',
                    },
                  ],
                },
              },
            },
          ],
        },
        {
          order: 2,
          id: 'SUBGROUP_ECP2013',
          label: {
            en: 'Madagascar Fisheries Characterization, 2013 ECP',
            fr: 'Profil de la petite pêche - Enquête cadre 2013',
          },
          nestedLayers: [
            {
              id: 'ECP2013_FISHER_SUMMARY',
              dashboardURL: 'https://one-madagascar.maps.arcgis.com/apps/dashboards/866024bbe6e94b8093e21664d7553857',
              order: 1,
              type: 'feature',
              url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Peches_maritimes/FeatureServer/2',
              label: {
                en: 'Percentage of Fishermen',
                fr: 'Pourcentage de pêcheurs',
              },
              sublabel: {
                en: '(2013, Madagascar, Ministry of Agriculture, Livestock and Fisheries)',
                fr: '(2013, Madagascar, Ministère de l’Agriculture, de l’Elevage et de la Pêche)',
              },
              popup: {
                title: {
                  en: 'Percentage of Fishermen',
                  fr: 'Pourcentage de pêcheurs',
                },
                content: {
                  en: [
                    {
                      label: 'Region',
                      fieldExpression: 'NAME_2',
                    },
                    {
                      label: 'Number of fishing households',
                      fieldExpression: 'MENAGEPECHEUR',
                    },
                    {
                      label: 'Population of the fishing households',
                      fieldExpression: 'POP_MENAGEPECHEUR',
                    },
                    {
                      label: 'Total number of fishers',
                      fieldExpression: 'TOTAL_PECHEUR',
                    },
                    {
                      label: 'Number of male fishers',
                      fieldExpression: 'PECHEUR_HOMME',
                    },
                    {
                      label: 'Number of female fishers',
                      fieldExpression: 'PECHEUR_FEMME',
                    },
                    {
                      label: 'Percentage of Fishermen by population',
                      fieldExpression: 'PERC_PEC_N',
                    },
                  ],
                  fr: [
                    {
                      label: 'Région',
                      fieldExpression: 'NAME_2',
                    },
                    {
                      label: 'Ménages de Pêcheurs',
                      fieldExpression: 'MENAGEPECHEUR',
                    },
                    {
                      label: 'Population des Ménages de Pêcheurs',
                      fieldExpression: 'POP_MENAGEPECHEUR',
                    },
                    {
                      label: 'Nombre total des pêcheurs',
                      fieldExpression: 'TOTAL_PECHEUR',
                    },
                    {
                      label: 'Nombre de pêcheurs hommes',
                      fieldExpression: 'PECHEUR_HOMME',
                    },
                    {
                      label: 'Nombre de pêcheurs femmes',
                      fieldExpression: 'PECHEUR_FEMME',
                    },
                    {
                      label: 'Pourcentage de pêcheurs par population',
                      fieldExpression: 'PERC_PEC_N',
                    },
                  ],
                },
              },
            },
            {
              id: 'ECP2013_CANOE_SUMMARY',
              order: 2,
              type: 'feature',
              url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Peches_maritimes/FeatureServer/3',
              label: {
                en: 'Total number of canoes',
                fr: 'Nombre total de pirogues',
              },
              sublabel: {
                en: '(2013, Madagascar, Ministry of Agriculture, Livestock and Fisheries)',
                fr: '(2013, Madagascar, Ministère de l’Agriculture, de l’Elevage et de la Pêche)',
              },
              popup: {
                title: {
                  en: 'Total number of canoes',
                  fr: 'Nombre total de pirogues',
                },
                content: {
                  en: [
                    {
                      label: 'Region',
                      fieldExpression: 'NAME_2',
                    },
                    {
                      label: 'Total number of canoes',
                      fieldExpression: 'TOT_PIRO',
                    },
                    {
                      label: 'Fishing households with no canoes',
                      fieldExpression: 'PIRO_0',
                    },
                    {
                      label: 'Fishing households with 1 canoes',
                      fieldExpression: 'PIRO_1',
                    },
                    {
                      label: 'Fishing households with 2 canoes',
                      fieldExpression: 'PIRO_2',
                    },
                    {
                      label: 'Fishing households with 3 canoes',
                      fieldExpression: 'PIRO_3',
                    },
                    {
                      label: 'Fishing households with 4 or more canoes',
                      fieldExpression: 'PIRO_4_',
                    },
                    {
                      label: 'Fishing households with no nets',
                      fieldExpression: 'FILET_0',
                    },
                    {
                      label: 'Fishing households with 1 net',
                      fieldExpression: 'FILET_1',
                    },
                    {
                      label: 'Fishing households with 2 nets',
                      fieldExpression: 'FILET_2',
                    },
                    {
                      label: 'Fishing households with 3 nets',
                      fieldExpression: 'FILET_3',
                    },
                    {
                      label: 'Fishing households with 4 or more nets',
                      fieldExpression: 'FILET_4_',
                    },
                    {
                      label: 'Fishing households with no lines',
                      fieldExpression: 'LIGNE_0',
                    },
                    {
                      label: 'Fishing households with 1 line',
                      fieldExpression: 'LIGNE_1',
                    },
                    {
                      label: 'Fishing households with 2 lines',
                      fieldExpression: 'LIGNE_2',
                    },
                    {
                      label: 'Fishing households with 3 lines',
                      fieldExpression: 'LIGNE_3',
                    },
                    {
                      label: 'Fishing households with 4 or more lines',
                      fieldExpression: 'LIGNE_4_',
                    },
                    {
                      label: 'Fishing households with no boat motors',
                      fieldExpression: 'ENGIN_0',
                    },
                    {
                      label: 'Fishing households with 1 boat motor',
                      fieldExpression: 'ENGIN_1',
                    },
                    {
                      label: 'Fishing households with 2 boat motors',
                      fieldExpression: 'ENGIN_2',
                    },
                    {
                      label: 'Fishing households with 3 boat motors',
                      fieldExpression: 'ENGIN_3',
                    },
                    {
                      label: 'Fishing households with 4 or more boat motors',
                      fieldExpression: 'ENGIN_4_',
                    },
                    {
                      label: 'Fishing households with no other gear type',
                      fieldExpression: 'OTHER_0',
                    },
                    {
                      label: 'Fishing households with 1 other gear type',
                      fieldExpression: 'OTHER_1',
                    },
                    {
                      label: 'Fishing households with 2 other gear types',
                      fieldExpression: 'OTHER_2',
                    },
                    {
                      label: 'Fishing households with 3 other gear types',
                      fieldExpression: 'OTHER_3',
                    },
                    {
                      label: 'Fishing households with 4 or more other gear types',
                      fieldExpression: 'OTHER_4',
                    },
                  ],
                  fr: [
                    {
                      label: 'Région',
                      fieldExpression: 'NAME_2',
                    },
                    {
                      label: 'Nombre total de pirogues',
                      fieldExpression: 'TOT_PIRO',
                    },
                    {
                      label: 'Ménages de pêcheurs avec 0 pirogue',
                      fieldExpression: 'PIRO_0',
                    },
                    {
                      label: 'Ménages de pêcheurs avec 1 pirogue',
                      fieldExpression: 'PIRO_1',
                    },
                    {
                      label: 'Ménages de pêcheurs avec 2 pirogue',
                      fieldExpression: 'PIRO_2',
                    },
                    {
                      label: 'Ménages de pêcheurs avec 3 pirogues',
                      fieldExpression: 'PIRO_3',
                    },
                    {
                      label: 'Ménages de pêcheurs avec 4 pirogues ou plus',
                      fieldExpression: 'PIRO_4_',
                    },
                    {
                      label: 'Ménages de pêcheurs avec 0 filet',
                      fieldExpression: 'FILET_0',
                    },
                    {
                      label: 'Ménages de pêcheurs avec 1 filet',
                      fieldExpression: 'FILET_1',
                    },
                    {
                      label: 'Ménages de pêcheurs avec 2 filets',
                      fieldExpression: 'FILET_2',
                    },
                    {
                      label: 'Ménages de pêcheurs avec 3 filets',
                      fieldExpression: 'FILET_3',
                    },
                    {
                      label: 'Ménages de pêcheurs avec 4 filets ou plus',
                      fieldExpression: 'FILET_4_',
                    },
                    {
                      label: 'Ménages de pêcheurs avec 0 ligne',
                      fieldExpression: 'LIGNE_0',
                    },
                    {
                      label: 'Ménages de pêcheurs avec 1 ligne',
                      fieldExpression: 'LIGNE_1',
                    },
                    {
                      label: 'Ménages de pêcheurs avec 2 lignes',
                      fieldExpression: 'LIGNE_2',
                    },
                    {
                      label: 'Ménages de pêcheurs avec 3 lignes',
                      fieldExpression: 'LIGNE_3',
                    },
                    {
                      label: 'Ménages de pêcheurs avec 4 lignes ou plus',
                      fieldExpression: 'LIGNE_4_',
                    },
                    {
                      label: 'Ménages de pêcheurs avec 0 engin motorisé',
                      fieldExpression: 'ENGIN_0',
                    },
                    {
                      label: 'Ménages de pêcheurs avec 1 engin motorisé',
                      fieldExpression: 'ENGIN_1',
                    },
                    {
                      label: 'Ménages de pêcheurs avec 2 engins motorisé',
                      fieldExpression: 'ENGIN_2',
                    },
                    {
                      label: 'Ménages de pêcheurs avec 3 engins motorisé',
                      fieldExpression: 'ENGIN_3',
                    },
                    {
                      label: 'Ménages de pêcheurs avec 4 engins motorisé ou plus',
                      fieldExpression: 'ENGIN_4_',
                    },
                    {
                      label: 'Ménages de pêcheurs avec 0 autre équipement',
                      fieldExpression: 'OTHER_0',
                    },
                    {
                      label: 'Ménages de pêcheurs avec 1 autre équipement',
                      fieldExpression: 'OTHER_1',
                    },
                    {
                      label: 'Ménages de pêcheurs avec 2 autres équipement',
                      fieldExpression: 'OTHER_2',
                    },
                    {
                      label: 'Ménages de pêcheurs avec 3 autres équipement',
                      fieldExpression: 'OTHER_3',
                    },
                    {
                      label: 'Ménages de pêcheurs avec 4 autres équipement ou plus',
                      fieldExpression: 'OTHER_4_',
                    },
                  ],
                },
              },
            },
            {
              id: 'ECP2013_GEAR_NET',
              order: 3,
              type: 'feature',
              url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Peches_maritimes/FeatureServer/4',
              label: {
                en: 'Total number of nets',
                fr: 'Nombre total de filets',
              },
              sublabel: {
                en: '(2013, Madagascar, Ministry of Agriculture, Livestock and Fisheries)',
                fr: '(2013, Madagascar, Ministère de l’Agriculture, de l’Elevage et de la Pêche)',
              },
              popup: {
                title: {
                  en: 'Total number of nets',
                  fr: 'Nombre total de filets',
                },
                content: {
                  en: [
                    {
                      label: 'Region',
                      fieldExpression: 'NAME_2',
                    },
                    {
                      label: 'Jarifa',
                      fieldExpression: 'JARIFA',
                    },
                    {
                      label: 'Filet ZZ',
                      fieldExpression: 'FILETZZ',
                    },
                    {
                      label: 'Senne',
                      fieldExpression: 'SENNE',
                    },
                    {
                      label: 'Periky',
                      fieldExpression: 'PERIKY',
                    },
                    {
                      label: 'Petit chalut',
                      fieldExpression: 'PETITCHALUT',
                    },
                    {
                      label: 'Tremail',
                      fieldExpression: 'TREMAIL',
                    },
                    {
                      label: 'Epuisette',
                      fieldExpression: 'EPUISETTE',
                    },
                    {
                      label: 'Maillant',
                      fieldExpression: 'MAILLANT',
                    },
                    {
                      label: 'Other',
                      fieldExpression: 'AUTRE',
                    },
                    {
                      label: 'Total',
                      fieldExpression: 'TOT_FIL',
                    },
                  ],
                  fr: [
                    {
                      label: 'Région',
                      fieldExpression: 'NAME_2',
                    },
                    {
                      label: 'Jarifa',
                      fieldExpression: 'JARIFA',
                    },
                    {
                      label: 'Filet ZZ',
                      fieldExpression: 'FILETZZ',
                    },
                    {
                      label: 'Senne',
                      fieldExpression: 'SENNE',
                    },
                    {
                      label: 'Periky',
                      fieldExpression: 'PERIKY',
                    },
                    {
                      label: 'Petit chalut',
                      fieldExpression: 'PETITCHALUT',
                    },
                    {
                      label: 'Tremail',
                      fieldExpression: 'TREMAIL',
                    },
                    {
                      label: 'Epuisette',
                      fieldExpression: 'EPUISETTE',
                    },
                    {
                      label: 'Maillant',
                      fieldExpression: 'MAILLANT',
                    },
                    {
                      label: 'Autre',
                      fieldExpression: 'AUTRE',
                    },
                    {
                      label: 'Total',
                      fieldExpression: 'TOT_FIL',
                    },
                  ],
                },
              },
            },
            {
              id: 'ECP2013_GEAR_LINE',
              order: 4,
              type: 'feature',
              url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Peches_maritimes/FeatureServer/5',
              label: {
                en: 'Total number of lines',
                fr: 'Nombre total de lignes',
              },
              sublabel: {
                en: '(2013, Madagascar, Ministry of Agriculture, Livestock and Fisheries)',
                fr: '(2013, Madagascar, Ministère de l’Agriculture, de l’Elevage et de la Pêche)',
              },
              popup: {
                title: {
                  en: 'Total number of lines',
                  fr: 'Nombre total de lignes',
                },
                content: {
                  en: [
                    {
                      label: 'Region',
                      fieldExpression: 'NAME_2',
                    },
                    {
                      label: 'Palangre',
                      fieldExpression: 'PALANGRE',
                    },
                    {
                      label: 'Palangrotte',
                      fieldExpression: 'PALANGROTTE',
                    },
                    {
                      label: 'Traine',
                      fieldExpression: 'TRAINE',
                    },
                    {
                      label: 'Turlute',
                      fieldExpression: 'TURLUTE',
                    },
                    {
                      label: 'Other',
                      fieldExpression: 'AUTRE',
                    },
                    {
                      label: 'Total',
                      fieldExpression: 'TOT_LIG',
                    },
                  ],
                  fr: [
                    {
                      label: 'Région',
                      fieldExpression: 'NAME_2',
                    },
                    {
                      label: 'Palangre',
                      fieldExpression: 'PALANGRE',
                    },
                    {
                      label: 'Palangrotte',
                      fieldExpression: 'PALANGROTTE',
                    },
                    {
                      label: 'Traine',
                      fieldExpression: 'TRAINE',
                    },
                    {
                      label: 'Turlute',
                      fieldExpression: 'TURLUTE',
                    },
                    {
                      label: 'Autre',
                      fieldExpression: 'AUTRE',
                    },
                    {
                      label: 'Total',
                      fieldExpression: 'TOT_LIG',
                    },
                  ],
                },
              },
            },
            {
              id: 'ECP2013_GEAR_OTHER',
              order: 5,
              type: 'feature',
              url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Peches_maritimes/FeatureServer/6',
              label: {
                en: 'Total number of other fishing gear types',
                fr: 'Nombre total des autres équipements de pêches',
              },
              sublabel: {
                en: '(2013, Madagascar, Ministry of Agriculture, Livestock and Fisheries)',
                fr: '(2013, Madagascar, Ministère de l’Agriculture, de l’Elevage et de la Pêche)',
              },
              popup: {
                title: {
                  en: 'Total number of other fishing gear types',
                  fr: 'Nombre total des autres équipements de pêches',
                },
                content: {
                  en: [
                    {
                      label: 'Region',
                      fieldExpression: 'NAME_2',
                    },
                    {
                      label: 'Nasse',
                      fieldExpression: 'NASSE',
                    },
                    {
                      label: 'Casier',
                      fieldExpression: 'CASIER',
                    },
                    {
                      label: 'Other casier',
                      fieldExpression: 'A_CASIER',
                    },
                    {
                      label: 'Kopiko',
                      fieldExpression: 'KOPIKO',
                    },
                    {
                      label: 'Valakira',
                      fieldExpression: 'VALAKIRA',
                    },
                    {
                      label: 'Other barrage',
                      fieldExpression: 'A_BARRAGE',
                    },
                    {
                      label: 'Moustiquaire',
                      fieldExpression: 'MOUSTIQUAIRE',
                    },
                    {
                      label: 'Epervier',
                      fieldExpression: 'EPERVIER',
                    },
                    {
                      label: 'Balance crabe',
                      fieldExpression: 'BALANCECRABE',
                    },
                    {
                      label: 'Other crabe',
                      fieldExpression: 'A_CRABE',
                    },
                    {
                      label: 'Fusil',
                      fieldExpression: 'FUSIL',
                    },
                    {
                      label: 'Harpon',
                      fieldExpression: 'HARPON',
                    },
                    {
                      label: 'Other harpon',
                      fieldExpression: 'A_HARPON',
                    },
                    {
                      label: 'Plonge simple',
                      fieldExpression: 'PLONGESIMPLE',
                    },
                    {
                      label: 'Plonge bouteille',
                      fieldExpression: 'PLONGEBOUTEILLE',
                    },
                    {
                      label: 'Other plonge',
                      fieldExpression: 'A_PLONGE',
                    },
                    {
                      label: 'Total',
                      fieldExpression: 'TOT_AUT',
                    },
                  ],
                  fr: [
                    {
                      label: 'Région',
                      fieldExpression: 'NAME_2',
                    },
                    {
                      label: 'Nasse',
                      fieldExpression: 'NASSE',
                    },
                    {
                      label: 'Casier',
                      fieldExpression: 'CASIER',
                    },
                    {
                      label: 'Autre casier',
                      fieldExpression: 'A_CASIER',
                    },
                    {
                      label: 'Kopiko',
                      fieldExpression: 'KOPIKO',
                    },
                    {
                      label: 'Valakira',
                      fieldExpression: 'VALAKIRA',
                    },
                    {
                      label: 'Autre barrage',
                      fieldExpression: 'A_BARRAGE',
                    },
                    {
                      label: 'Moustiquaire',
                      fieldExpression: 'MOUSTIQUAIRE',
                    },
                    {
                      label: 'Epervier',
                      fieldExpression: 'EPERVIER',
                    },
                    {
                      label: 'Balance crabe',
                      fieldExpression: 'BALANCECRABE',
                    },
                    {
                      label: 'Autre crabe',
                      fieldExpression: 'A_CRABE',
                    },
                    {
                      label: 'Fusil',
                      fieldExpression: 'FUSIL',
                    },
                    {
                      label: 'Harpon',
                      fieldExpression: 'HARPON',
                    },
                    {
                      label: 'Autre harpon',
                      fieldExpression: 'A_HARPON',
                    },
                    {
                      label: 'Plonge simple',
                      fieldExpression: 'PLONGESIMPLE',
                    },
                    {
                      label: 'Plonge bouteille',
                      fieldExpression: 'PLONGEBOUTEILLE',
                    },
                    {
                      label: 'Autre plonge',
                      fieldExpression: 'A_PLONGE',
                    },
                    {
                      label: 'Total',
                      fieldExpression: 'TOT_AUT',
                    },
                  ],
                },
              },
            },
          ],
        },
      ],
    },
    GROUP_MARREGION: {
      groupType: 'default',
      order: 11,
      label: {
        en: 'Marine regions',
        fr: 'Environnement marin',
      },
      layers: [
        {
          order: 1,
          id: '12 nautical miles zones (territorial seas)',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Environnement_marin/FeatureServer/0',
          label: {
            en: '12 nautical miles zones (territorial seas)',
            fr: 'Zones de 12 milles nautiques (mers territoriales)',
          },
          sublabel: {
            en: '(2019, Global, Flanders Marine Institute)',
            fr: '(2019, Mondiale, Flanders Marine Institute)',
          },
          popup: {
            title: {
              en: '12 nautical miles zones (territorial seas)',
              fr: 'Zones de 12 milles nautiques (mers territoriales)',
            },
            content: {
              en: [
                {
                  label: 'Name',
                  fieldExpression: 'TERRITORY1',
                },
                {
                  label: 'Type',
                  fieldExpression: 'POL_TYPE',
                },
              ],
              fr: [
                {
                  label: 'Nom',
                  fieldExpression: 'TERRITORY1',
                },
                {
                  label: 'Type',
                  fieldExpression: 'POL_TYPE',
                },
              ],
            },
          },
        },
        {
          order: 2,
          id: '24 nautical miles zones (contiguous zones)',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Environnement_marin/FeatureServer/1',
          label: {
            en: '24 nautical miles zones (contiguous zones)',
            fr: 'Zones de 24 milles nautiques (zones contiguës)',
          },
          sublabel: {
            en: '(2019, Global, Flanders Marine Institute)',
            fr: '(2019, Mondiale, Flanders Marine Institute)',
          },
          popup: {
            title: {
              en: '24 nautical miles zones (contiguous zones)',
              fr: 'Zones de 24 milles nautiques (zones contiguës)',
            },
            content: {
              en: [
                {
                  label: 'Name',
                  fieldExpression: 'TERRITORY1',
                },
                {
                  label: 'Type',
                  fieldExpression: 'POL_TYPE',
                },
              ],
              fr: [
                {
                  label: 'Nom',
                  fieldExpression: 'TERRITORY1',
                },
                {
                  label: 'Type',
                  fieldExpression: 'POL_TYPE',
                },
              ],
            },
          },
        },
        {
          order: 3,
          id: 'Exclusive Economic Zone (200NM)',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Environnement_marin/FeatureServer/2',
          label: {
            en: 'Exclusive Economic Zone (200NM)',
            fr: 'Zone Economique Exclusive (200NM)',
          },
          sublabel: {
            en: '(2019, Global, Flanders Marine Institute)',
            fr: '(2019, Mondiale, Flanders Marine Institute)',
          },
          popup: {
            title: {
              en: 'Exclusive Economic Zone (200NM)',
              fr: 'Zone Economique Exclusive (200NM)',
            },
            content: {
              en: [
                {
                  label: 'Name',
                  fieldExpression: 'TERRITORY3',
                },
                {
                  label: 'Type',
                  fieldExpression: 'POL_TYPE',
                },
              ],
              fr: [
                {
                  label: 'Nom',
                  fieldExpression: 'TERRITORY3',
                },
                {
                  label: 'Type',
                  fieldExpression: 'POL_TYPE',
                },
              ],
            },
          },
        },
      ],
    },
    GROUP_RAMSAR: {
      grouptype: 'default',
      order: 12,
      label: {
        en: 'Ramsar Sites',
        fr: 'Sites Ramsar',
      },
      layers: [
        {
          order: 1,
          id: 'RS_01_MDT',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Sites_Ramsar/FeatureServer/0',
          label: {
            en: 'Marais de Torotorofotsy',
            fr: 'Marais de Torotorofotsy',
          },
          sublabel: {
            en: '(Inscription: 2005/Publication: 2016, Alaotra Mangoro/Madagascar, Ramsar Sites Information Service)',
            fr: '(Inscription: 2005/Publication: 2016, Alaotra Mangoro/Madagascar, Service d’Information sur les Sites Ramsar)',
          },
          popup: {
            title: {
              en: 'Marais de Torotorofotsy',
              fr: 'Marais de Torotorofotsy',
            },
            content: {
              en: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Designation date',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Area (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
              fr: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Date de désignation',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Superficie (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
            },
          },
        },
        {
          order: 2,
          id: 'RS_02_SBA',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Sites_Ramsar/FeatureServer/1',
          label: {
            en: 'Site Bioculturel d’Antrema',
            fr: 'Site Bioculturel d’Antrema',
          },
          sublabel: {
            en: '(Inscription: 2017/Publication: 2017, Boeny/Madagascar, Ramsar Sites Information Service)',
            fr: '(Inscription: 2017/Publication: 2017, Boeny/Madagascar, Service d’Information sur les Sites Ramsar)',
          },
          popup: {
            title: {
              en: 'Site Bioculturel d’Antrema',
              fr: 'Site Bioculturel d’Antrema',
            },
            content: {
              en: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Designation date',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Area (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
              fr: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Date de désignation',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Superficie (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
            },
          },
        },
        {
          order: 3,
          id: 'RS_03_MDT',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Sites_Ramsar/FeatureServer/2',
          label: {
            en: 'Mangroves de Tsiribihina',
            fr: 'Mangroves de Tsiribihina',
          },
          sublabel: {
            en: '(Inscription: 2017/Publication: 2017, Menabe/Madagascar, Ramsar Sites Information Service)',
            fr: '(Inscription: 2017/Publication: 2017, Menabe/Madagascar, Service d’Information sur les Sites Ramsar)',
          },
          popup: {
            title: {
              en: 'Mangroves de Tsiribihina',
              fr: 'Mangroves de Tsiribihina',
            },
            content: {
              en: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Designation date',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Area (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
              fr: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Date de désignation',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Superficie (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
            },
          },
        },
        {
          order: 4,
          id: 'RS_04_ZHDLO',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Sites_Ramsar/FeatureServer/3',
          label: {
            en: 'Zones humides de l’Onilahy',
            fr: 'Zones humides de l’Onilahy',
          },
          sublabel: {
            en: '(Inscription: 2017/Publication: 2017, Sud-Ouest/Madagascar, Ramsar Sites Information Service)',
            fr: '(Inscription: 2017/Publication: 2017, Sud-Ouest/Madagascar, Service d’Information sur les Sites Ramsar)',
          },
          popup: {
            title: {
              en: 'Zones humides de l’Onilahy',
              fr: 'Zones humides de l’Onilahy',
            },
            content: {
              en: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Designation date',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Area (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
              fr: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Date de désignation',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Superficie (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
            },
          },
        },
        {
          order: 5,
          id: 'RS_05_LS',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Sites_Ramsar/FeatureServer/4',
          label: {
            en: 'Lac Sofia',
            fr: 'Lac Sofia',
          },
          sublabel: {
            en: '(Inscription: 2017/Publication: 2017, Sofia/Madagascar, Ramsar Sites Information Service)',
            fr: '(Inscription: 2017/Publication: 2017, Sofia/Madagascar, Service d’Information sur les Sites Ramsar)',
          },
          popup: {
            title: {
              en: 'Lac Sofia',
              fr: 'Lac Sofia',
            },
            content: {
              en: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Designation date',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Area (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
              fr: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Date de désignation',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Superficie (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
            },
          },
        },
        {
          order: 6,
          id: 'RS_06_PDT',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Sites_Ramsar/FeatureServer/5',
          label: {
            en: 'Parc de Tsarasaotra',
            fr: 'Parc de Tsarasaotra',
          },
          sublabel: {
            en: '(Inscription: 2005/Publication: 2017, Antananarivo/Madagascar, Ramsar Sites Information Service)',
            fr: '(Inscription: 2005/Publication: 2017, Antananarivo/Madagascar, Service d’Information sur les Sites Ramsar)',
          },
          popup: {
            title: {
              en: 'Parc de Tsarasaotra',
              fr: 'Parc de Tsarasaotra',
            },
            content: {
              en: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Designation date',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Area (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
              fr: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Date de désignation',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Superficie (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
            },
          },
        },
        {
          order: 7,
          id: 'RS_07_CDLDM',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Sites_Ramsar/FeatureServer/6',
          label: {
            en: 'Complexe des lacs de Manambolomaty',
            fr: 'Complexe des lacs de Manambolomaty',
          },
          sublabel: {
            en: '(Inscription: 1998/Publication: 2016, Melaky/Madagascar, Ramsar Sites Information Service)',
            fr: '(Inscription: 1998/Publication: 2016, Melaky/Madagascar, Service d’Information sur les Sites Ramsar)',
          },
          popup: {
            title: {
              en: 'Complexe des lacs de Manambolomaty',
              fr: 'Complexe des lacs de Manambolomaty',
            },
            content: {
              en: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Designation date',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Area (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
              fr: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Date de désignation',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Superficie (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
            },
          },
        },
        {
          order: 8,
          id: 'RS_08_CDZHDB',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Sites_Ramsar/FeatureServer/7',
          label: {
            en: 'Complexe des Zones Humides de Bemanevika',
            fr: 'Complexe des Zones Humides de Bemanevika',
          },
          sublabel: {
            en: '(Inscription: 2017/Publication: 2017, Sofia/Madagascar, Ramsar Sites Information Service)',
            fr: '(Inscription: 2017/Publication: 2017, Sofia/Madagascar, Service d’Information sur les Sites Ramsar)',
          },
          popup: {
            title: {
              en: 'Complexe des Zones Humides de Bemanevika',
              fr: 'Complexe des Zones Humides de Bemanevika',
            },
            content: {
              en: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Designation date',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Area (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
              fr: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Date de désignation',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Superficie (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
            },
          },
        },
        {
          order: 9,
          id: 'RS_09_BDCNVA',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Sites_Ramsar/FeatureServer/8',
          label: {
            en: 'Barrière de Corail Nosy Ve Androka',
            fr: 'Barrière de Corail Nosy Ve Androka',
          },
          sublabel: {
            en: '(Inscription: 2017/Publication: 2017, Sud-Ouest/Madagascar, Ramsar Sites Information Service)',
            fr: '(Inscription: 2017/Publication: 2017, Sud-Ouest/Madagascar, Service d’Information sur les Sites Ramsar)',
          },
          popup: {
            title: {
              en: 'Barrière de Corail Nosy Ve Androka',
              fr: 'Barrière de Corail Nosy Ve Androka',
            },
            content: {
              en: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Designation date',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Area (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
              fr: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Date de désignation',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Superficie (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
            },
          },
        },
        {
          order: 10,
          id: 'RS_10_CDLAESCLAS',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Sites_Ramsar/FeatureServer/9',
          label: {
            en: 'Complexe des lacs Ambondro et Sirave (CLAS)',
            fr: 'Complexe des lacs Ambondro et Sirave (CLAS)',
          },
          sublabel: {
            en: '(Inscription: 2015/Publication: 2015, Menabe/Madagascar, Ramsar Sites Information Service)',
            fr: '(Inscription: 2015/Publication: 2015, Menabe/Madagascar, Service d’Information sur les Sites Ramsar)',
          },
          popup: {
            title: {
              en: 'Complexe des lacs Ambondro et Sirave (CLAS)',
              fr: 'Complexe des lacs Ambondro et Sirave (CLAS)',
            },
            content: {
              en: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Designation date',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Area (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
              fr: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Date de désignation',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Superficie (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
            },
          },
        },
        {
          order: 11,
          id: 'RS_11_LLALZHEBV',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Sites_Ramsar/FeatureServer/10',
          label: {
            en: 'Le Lac Alaotra - Les Zones Humides et Bassins Versants',
            fr: 'Le Lac Alaotra - Les Zones Humides et Bassins Versants',
          },
          sublabel: {
            en: '(Inscription: 2003/Publication: 2016, Alaotra Mangoro/Madagascar, Ramsar Sites Information Service)',
            fr: '(Inscription: 2003/Publication: 2016, Alaotra Mangoro/Madagascar, Service d’Information sur les Sites Ramsar)',
          },
          popup: {
            title: {
              en: 'Le Lac Alaotra - Les Zones Humides et Bassins Versants',
              fr: 'Le Lac Alaotra - Les Zones Humides et Bassins Versants',
            },
            content: {
              en: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Designation date',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Area (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
              fr: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Date de désignation',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Superficie (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
            },
          },
        },
        {
          order: 12,
          id: 'RS_12_PNT',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Sites_Ramsar/FeatureServer/11',
          label: {
            en: 'Parc national Tsimanampesotse',
            fr: 'Parc national Tsimanampesotse',
          },
          sublabel: {
            en: '(Inscription: 1998/Publication: 2015, Sud-Ouest/Madagascar, Ramsar Sites Information Service)',
            fr: '(Inscription: 1998/Publication: 2015, Sud-Ouest/Madagascar, Service d’Information sur les Sites Ramsar)',
          },
          popup: {
            title: {
              en: 'Parc national Tsimanampesotse',
              fr: 'Parc national Tsimanampesotse',
            },
            content: {
              en: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Designation date',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Area (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
              fr: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Date de désignation',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Superficie (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
            },
          },
        },
        {
          order: 13,
          id: 'RS_13_ZHACLSA',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Sites_Ramsar/FeatureServer/12',
          label: {
            en: 'Zones Humides Ankarafantsika (CLSA)',
            fr: 'Zones Humides Ankarafantsika (CLSA)',
          },
          sublabel: {
            en: '(Inscription: 2017/Publication: 2017, Boeny/Madagascar, Ramsar Sites Information Service)',
            fr: '(Inscription: 2017/Publication: 2017, Boeny/Madagascar, Service d’Information sur les Sites Ramsar)',
          },
          popup: {
            title: {
              en: 'Zones Humides Ankarafantsika (CLSA)',
              fr: 'Zones Humides Ankarafantsika (CLSA)',
            },
            content: {
              en: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Designation date',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Area (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
              fr: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Date de désignation',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Superficie (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
            },
          },
        },
        {
          order: 14,
          id: 'RS_14_RNEA',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Sites_Ramsar/FeatureServer/13',
          label: {
            en: 'Rivière Nosivolo et affluents',
            fr: 'Rivière Nosivolo et affluents',
          },
          sublabel: {
            en: '(Inscription: 2010/Publication: 2017, Atsinanana/Madagascar, Ramsar Sites Information Service)',
            fr: '(Inscription: 2010/Publication: 2017, Atsinanana/Madagascar, Service d’Information sur les Sites Ramsar)',
          },
          popup: {
            title: {
              en: 'Rivière Nosivolo et affluents',
              fr: 'Rivière Nosivolo et affluents',
            },
            content: {
              en: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Designation date',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Area (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
              fr: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Date de désignation',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Superficie (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
            },
          },
        },
        {
          order: 15,
          id: 'RS_15_ZHDB',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Sites_Ramsar/FeatureServer/14',
          label: {
            en: 'Zones humides de Bedo',
            fr: 'Zones humides de Bedo',
          },
          sublabel: {
            en: '(Inscription: 2007/Publication: 2016, Menabe/Madagascar, Ramsar Sites Information Service)',
            fr: '(Inscription: 2007/Publication: 2016, Menabe/Madagascar, Service d’Information sur les Sites Ramsar)',
          },
          popup: {
            title: {
              en: 'Zones humides de Bedo',
              fr: 'Zones humides de Bedo',
            },
            content: {
              en: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Designation date',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Area (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
              fr: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Date de désignation',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Superficie (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
            },
          },
        },
        {
          order: 16,
          id: 'RS_16_ZHDS',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Sites_Ramsar/FeatureServer/15',
          label: {
            en: 'Zones Humides de Sahamalaza',
            fr: 'Zones Humides de Sahamalaza',
          },
          sublabel: {
            en: '(Inscription: 2017/Publication: 2017, Sofia/Diana/Madagascar, Ramsar Sites Information Service)',
            fr: '(Inscription: 2017/Publication: 2017, Sofia/Diana/Madagascar, Service d’Information sur les Sites Ramsar)',
          },
          popup: {
            title: {
              en: 'Zones Humides de Sahamalaza',
              fr: 'Zones Humides de Sahamalaza',
            },
            content: {
              en: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Designation date',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Area (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
              fr: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Date de désignation',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Superficie (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
            },
          },
        },
        {
          order: 17,
          id: 'RS_17_IB',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Sites_Ramsar/FeatureServer/16',
          label: {
            en: 'Iles Barren',
            fr: 'Iles Barren',
          },
          sublabel: {
            en: '(Inscription: 2017/Publication: 2017, Melaky/Madagascar, Ramsar Sites Information Service)',
            fr: '(Inscription: 2017/Publication: 2017, Melaky/Madagascar, Service d’Information sur les Sites Ramsar)',
          },
          popup: {
            title: {
              en: 'Iles Barren',
              fr: 'Iles Barren',
            },
            content: {
              en: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Designation date',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Area (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
              fr: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Date de désignation',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Superficie (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
            },
          },
        },
        {
          order: 18,
          id: 'RS_18_ZHDA',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Sites_Ramsar/FeatureServer/17',
          label: {
            en: 'Zones humides d’Ambondrobe',
            fr: 'Zones humides d’Ambondrobe',
          },
          sublabel: {
            en: '(Inscription: 2017/Publication: 2017, Menabe/Madagascar, Ramsar Sites Information Service)',
            fr: '(Inscription: 2017/Publication: 2017, Menabe/Madagascar, Service d’Information sur les Sites Ramsar)',
          },
          popup: {
            title: {
              en: 'Zones humides d’Ambondrobe',
              fr: 'Zones humides d’Ambondrobe',
            },
            content: {
              en: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Designation date',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Area (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
              fr: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Date de désignation',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Superficie (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
            },
          },
        },
        {
          order: 19,
          id: 'RS_19_ZHDM',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Sites_Ramsar/FeatureServer/18',
          label: {
            en: 'Zone Humide de Mandrozo',
            fr: 'Zone Humide de Mandrozo',
          },
          sublabel: {
            en: '(Inscription: 2012/Publication: 2019, Melaky/Madagascar, Ramsar Sites Information Service)',
            fr: '(Inscription: 2012/Publication: 2019, Melaky/Madagascar, Service d’Information sur les Sites Ramsar)',
          },
          popup: {
            title: {
              en: 'Zone Humide de Mandrozo',
              fr: 'Zone Humide de Mandrozo',
            },
            content: {
              en: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Designation date',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Area (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
              fr: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Date de désignation',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Superficie (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
            },
          },
        },
        {
          order: 20,
          id: 'RS_20_LK',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Sites_Ramsar/FeatureServer/19',
          label: {
            en: 'Lac Kinkony',
            fr: 'Lac Kinkony',
          },
          sublabel: {
            en: '(Inscription: 2012/Publication: 2012, Boeny/Madagascar, Ramsar Sites Information Service)',
            fr: '(Inscription: 2012/Publication: 2012, Boeny/Madagascar, Service d’Information sur les Sites Ramsar)',
          },
          popup: {
            title: {
              en: 'Lac Kinkony',
              fr: 'Lac Kinkony',
            },
            content: {
              en: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Designation date',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Area (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
              fr: [
                {
                  label: 'Site',
                  fieldExpression: 'SITE',
                },
                {
                  label: 'Date de désignation',
                  fieldExpression: 'DATEDESIG',
                },
                {
                  label: 'Location',
                  fieldExpression: 'LOCAL',
                },
                {
                  label: 'Superficie (ha)',
                  fieldExpression: 'AREAHA_OFF',
                },
                {
                  label: 'Latitude',
                  fieldExpression: 'LAT',
                },
                {
                  label: 'Longitude',
                  fieldExpression: 'LON',
                },
              ],
            },
          },
        },
      ],
    },
    GROUP_POP: {
      grouptype: 'default',
      order: 13,
      label: {
        en: 'Population',
        fr: 'Population',
      },
      layers: [
        {
          order: 1,
          id: 'POP',
          dashboardURL:
            'https://gis.forest-atlas.org/portal/apps/opsdashboard/index.html#/48fdac174c774b0591dcc7854103146d',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Population/FeatureServer/0',
          label: {
            en: 'Population density by region',
            fr: 'Densité de la population par région',
          },
          popup: {
            title: {
              en: 'Population density by region',
              fr: 'Densité de la population par région',
            },
            content: {
              en: [
                {
                  label: 'Population',
                  fieldExpression: 'NPRESURENS',
                },
                {
                  label: 'Region',
                  fieldExpression: 'NAME_2',
                },
              ],
              fr: [
                {
                  label: 'Population',
                  fieldExpression: 'NPRESURENS',
                },
                {
                  label: 'Région',
                  fieldExpression: 'NAME_2',
                },
              ],
            },
          },
        },
        {
          order: 2,
          id: 'POP_district',
          dashboardURL:
            'https://gis.forest-atlas.org/portal/apps/opsdashboard/index.html#/c97430d7f5a647439526729c8fbb5271',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Population/FeatureServer/1',
          label: {
            en: 'Population number per district',
            fr: 'Nombre de population par district',
          },
          popup: {
            title: {
              en: 'Population number per district',
              fr: 'Nombre de population par district',
            },
            content: {
              en: [
                {
                  label: 'Population',
                  fieldExpression: 'NPRESURENS',
                },
                {
                  label: 'District',
                  fieldExpression: 'NAME_3',
                },
                {
                  label: 'Region',
                  fieldExpression: 'NAME_2',
                },
              ],
              fr: [
                {
                  label: 'Population',
                  fieldExpression: 'NPRESURENS',
                },
                {
                  label: 'District',
                  fieldExpression: 'NAME_3',
                },
                {
                  label: 'Region',
                  fieldExpression: 'NAME_2',
                },
              ],
            },
          },
        },
      ],
    },
    GROUP_BIO: {
      grouptype: 'default',
      order: 14,
      label: {
        en: 'Biodiversity',
        fr: 'Biodiversité',
      },
      layers: [
        {
          order: 1,
          id: 'BIO',
          type: 'feature',
          url: 'https://services7.arcgis.com/iv56fY5TFtS8nlsY/arcgis/rest/services/Biodiversite/FeatureServer',
          label: {
            en: "Lemurs' distribution",
            fr: 'Distribution des lémuriens',
          },
          sublabel: {
            en: '(2021, Madagascar, Madagascar lemurs portal)',
            fr: '(2021, Madagascar, Portail des lémuriens de Madagascar)',
          },
          popup: {
            title: {
              en: "Lemurs' distribution (Madagascar lemurs portal)",
              fr: 'Distribution des lémuriens (Portail des lémuriens de Madagascar)',
            },
            content: {
              en: [
                {
                  label: 'Institution code',
                  fieldExpression: 'INSC',
                },
                {
                  label: 'Scientific name',
                  fieldExpression: 'SCINAME',
                },
                {
                  label: 'Kingdom',
                  fieldExpression: 'KINGDOM',
                },
                {
                  label: 'Phylum',
                  fieldExpression: 'PHYLUM',
                },
                {
                  label: 'Class',
                  fieldExpression: 'CLASS',
                },
                {
                  label: 'Order',
                  fieldExpression: 'ORDER_',
                },
                {
                  label: 'Family',
                  fieldExpression: 'FAMILY',
                },
                {
                  label: 'Genus',
                  fieldExpression: 'GENUS',
                },
                {
                  label: 'Sub genus',
                  fieldExpression: 'SUBGENUS',
                },
              ],
              fr: [
                {
                  label: "Code de l'institution",
                  fieldExpression: 'INSC',
                },
                {
                  label: 'Nom scientifique',
                  fieldExpression: 'SCINAME',
                },
                {
                  label: 'Kingdom',
                  fieldExpression: 'KINGDOM',
                },
                {
                  label: 'Phylum',
                  fieldExpression: 'PHYLUM',
                },
                {
                  label: 'Classe',
                  fieldExpression: 'CLASS',
                },
                {
                  label: 'Ordre',
                  fieldExpression: 'ORDER_',
                },
                {
                  label: 'Famille',
                  fieldExpression: 'FAMILY',
                },
                {
                  label: 'Genre',
                  fieldExpression: 'GENUS',
                },
                {
                  label: 'Sub genre',
                  fieldExpression: 'SUBGENUS',
                },
              ],
            },
          },
        },
      ],
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
        nl: 'Klimaat',
      },
      layers: [
        {
          id: 'FOREST_CARBON_NET_FLUX',
          order: 1,
          type: 'remoteDataLayer',
          uuid: 'bd768c4b-f5f8-47f9-b6a0-5bb6078f0fac',
          real_order: 0,
        },
        {
          id: 'FOREST_CARBON_GROSS_REMOVALS',
          order: 2,
          type: 'remoteDataLayer',
          uuid: '79010c83-e62e-4744-96ed-130736daa651',
        },
        {
          id: 'FOREST_CARBON_GROSS_EMISSIONS',
          order: 3,
          type: 'remoteDataLayer',
          uuid: '0b45cb69-6432-449f-af38-25cdcda85d55',
        },
        {
          id: 'AIR_QUALITY',
          order: 4,
          type: 'remoteDataLayer',
          uuid: '67d8aed9-8eb3-4396-99a4-f0eee7295226',
        },
        {
          id: 'DRY_SPELLS',
          order: 5,
          type: 'remoteDataLayer',
          uuid: '41936f95-094b-4ad9-8b8a-70fc159bd0ba',
        },
        {
          id: 'WIND_SPEED',
          order: 6,
          type: 'remoteDataLayer',
          uuid: '9fa60bd9-0643-4d0a-a569-0036e902d1f9',
        },
        {
          id: 'CARBON_SEQ',
          order: 7,
          type: 'remoteDataLayer',
          uuid: 'e7208398-0acd-4f73-a824-c4fe1e356e0c',
        },
      ],
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
        ka: 'მიწის საფარის დინამიკა',
      },
      layers: [
        {
          id: 'GFW_INTEGRATED_ALERTS',
          order: 1,
          type: 'remoteDataLayer',
          uuid: 'bd58f25d-d3bb-4d59-9daa-cecddd27d9f4',
          groupId: 'GROUP_LCD',
        },
        {
          id: 'FORMA_ALERTS',
          order: 2,
          type: 'remoteDataLayer',
          uuid: '56aa7e57-0ac4-446c-a82d-7713904b17c3',
        },
        {
          id: 'TREE_COVER_GAIN',
          order: 3,
          type: 'remoteDataLayer',
          uuid: 'cb016f17-f12d-463a-9dc2-aabcf5db566c',
        },
        {
          id: 'VIIRS_ACTIVE_FIRES',
          order: 4,
          type: 'remoteDataLayer',
          uuid: '6d316908-92c8-4f95-8598-f2a0c72786af',
        },
        {
          id: 'TREE_COVER_LOSS',
          order: 5,
          type: 'remoteDataLayer',
          uuid: '2aed67b3-3643-40d3-9c1e-8af9afb5d9e2',
        },
        {
          id: 'IMAZON_SAD',
          order: 6,
          type: 'remoteDataLayer',
          uuid: '3e9e86ae-e38d-4c59-8484-c8214ca5186a',
        },
        {
          id: 'GLAD_ALERTS',
          order: 7,
          type: 'remoteDataLayer',
          uuid: '356f862b-3e70-493a-997b-dc2a193410e9',
        },
        {
          id: 'TERRA_I_ALERTS',
          order: 8,
          type: 'remoteDataLayer',
          uuid: '1fc7b0c5-259a-4685-8665-b2f1ed3f808f',
        },
        {
          id: 'GLAD_S2_ALERTS',
          order: 9,
          type: 'remoteDataLayer',
          uuid: '3b869953-48c4-48d0-8023-5c64a311f3dd',
          groupId: 'GROUP_LCD',
        },
        {
          id: 'RADD_ALERTS',
          order: 10,
          type: 'remoteDataLayer',
          uuid: '440e53d0-36b3-47ad-993a-1c2018c3942c',
          groupId: 'GROUP_LCD',
        },
      ],
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
        ka: 'მიწის საფარი',
      },
      layers: [
        {
          id: 'UMD_LAND_COVER',
          order: 1,
          type: 'remoteDataLayer',
          uuid: 'f22e0529-d398-4ccc-b943-e62d420fea89',
        },
        {
          id: 'TREES_MOSAIC_LANDSCAPES',
          order: 2,
          type: 'remoteDataLayer',
          uuid: '9e0c1e1e-a0a3-457f-a373-4104820f7a50',
        },
        {
          id: 'LAND_COVER',
          order: 3,
          type: 'remoteDataLayer',
          uuid: 'b8d3f175-0565-443f-839a-49eb890a4b3d',
        },
        {
          id: 'TREE_COVER_HEIGHT',
          order: 4,
          type: 'remoteDataLayer',
          uuid: '2a83effa-f8be-425b-9766-502e65525861',
        },
        {
          id: 'TREE_COVER',
          order: 5,
          type: 'remoteDataLayer',
          uuid: '2569adca-ef87-42c4-a153-57c5e8ba0ef7',
        },
        {
          id: 'AG_BIOMASS',
          order: 6,
          type: 'remoteDataLayer',
          uuid: '04526d47-f3f5-4f76-a939-e5f7861fd085',
        },
        {
          id: 'PRIMARY_FORESTS',
          order: 7,
          type: 'remoteDataLayer',
          uuid: 'edffb745-e523-462d-ad1e-3052006a3dbc',
        },
        {
          id: 'IFL',
          order: 8,
          type: 'remoteDataLayer',
          uuid: '5f815a7d-457e-4eae-a8e5-8864a60696ad',
        },
      ],
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
        ka: 'Recent Imagery',
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
            ka: 'Recent Imagery',
          },
          dynamicSublabel: {
            en: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
            fr: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
            es: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
            pt: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
            id: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
            zh: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
            ka: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
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
        type: 'feature',

        //type: 'dynamic',
        order: 10000,
        //url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/World_Countries_(Generalized)/FeatureServer',
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
  webmap_url: 'https://worldresources.maps.arcgis.com/home/webmap/viewer.html?webmap=f44474c063cc444aa1c99dd82dafc1f2',
  alternativeWebmap_url:
    'https://worldresources.maps.arcgis.com/home/webmap/viewer.html?webmap=f44474c063cc444aa1c99dd82dafc1f2',
};
