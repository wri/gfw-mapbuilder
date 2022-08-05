export const supportedLayers = [
  'feature',
  'dynamic',
  'loss',
  'tree-mosaic',
  'forest-carbon-gross-removals',
  'forest-carbon-gross-emissions',
  'forest-carbon-net-flux',
  'gain',
  'image',
  'webtiled',
  'imagery',
  'glad',
  'integrated-alert-layer',
  'primed',
  'tree-cover',
  'tree-cover-height',
  'co2_emissions',
  'Vector.Layer',
];

export const testing = [
  {
    id: 'planet',
    thumbnailUrl: 'https://my.gfw-mapbuilder.org/img/wri_mono.png',
    url: 'https://tiles.globalforestwatch.org/planet/v1/planet_medres_normalized_analytic/{z}/{x}/{y}.png',
    apiKey: process.env.REACT_APP_PLANET_API_KEY,

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
];
/*export const newRemoteDataLayers = [
  {
    id: 'TREES_MOSAIC_LANDSCAPES',
    order: 7,
    type: 'remoteDataLayer',
    uuid: '9e0c1e1e-a0a3-457f-a373-4104820f7a50',
    groupId: 'GROUP_LC'
  },
  {
    id: 'GFW_INTEGRATED_ALERTS',
    order: 9,
    type: 'remoteDataLayer',
    uuid: 'bd58f25d-d3bb-4d59-9daa-cecddd27d9f4',
    groupId: 'GROUP_LCD'
  },
  {
    id: 'GLAD_S2_ALERTS',
    order: 10,
    type: 'remoteDataLayer',
    uuid: '3b869953-48c4-48d0-8023-5c64a311f3dd',
    groupId: 'GROUP_LCD'
  },
  {
    id: 'RADD_ALERTS',
    order: 11,
    type: 'remoteDataLayer',
    uuid: '440e53d0-36b3-47ad-993a-1c2018c3942c',
    groupId: 'GROUP_LCD'
  }
];
export const defaultAPIFlagshipLayers = [
  {
    groupId: 'GROUP_LC',
    id: 'TREE_COVER_HEIGHT',
    order: 7,
    type: 'remoteDataLayer',
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
    order: 4,
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
];*/

//Layer controls (IDS) // TODO: add layer id
export const densityEnabledLayers = [
  'TREE_COVER_LOSS',
  'AG_BIOMASS',
  'TREE_COVER',
  'TREES_MOSAIC_LANDSCAPES',
  'FOREST_CARBON_GROSS_REMOVALS',
  'FOREST_CARBON_GROSS_EMISSIONS',
  'FOREST_CARBON_NET_FLUX',
];

export const landsatBaselayerURL =
  'https://production-api.globalforestwatch.org/v2/landsat-tiles/2017/{level}/{col}/{row}';

export const landsatBaselayerYears = [2013, 2014, 2015, 2016, 2017];

export const WRIBasemapConfig = {
  wri_mono:
    'https://api.mapbox.com/styles/v1/resourcewatch/ckaoefuc302dw1ipfh7tfi7ll/tiles/256/{level}/{col}/{row}@2x?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjajFlcXZhNzcwMDBqMzNzMTQ0bDN6Y3U4In0.FRcIP_yusVaAy0mwAX1B8w',
  wri_contextual:
    'https://api.mapbox.com/styles/v1/resourcewatch/ckaoehoff02fn1ipfan4jblxh/tiles/256/{level}/{col}/{row}@2x?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjajFlcXZhNzcwMDBqMzNzMTQ0bDN6Y3U4In0.FRcIP_yusVaAy0mwAX1B8w',
};

export const customBasemapIcon = 'https://my.gfw-mapbuilder.org/img/custom_basemap.png';

//Timeslider objects for tree cover loss, dry spells and gfw
export const defaultMarks: any = {
  '2001': {
    label: '2001',
    style: {},
  },
  '2002': {
    label: '2002',
    style: { display: 'none' },
  },
  '2003': {
    label: '2003',
    style: { display: 'none' },
  },
  '2004': {
    label: '2004',
    style: { display: 'none' },
  },
  '2005': {
    label: '2005',
    style: {},
  },
  '2006': {
    label: '2006',
    style: { display: 'none' },
  },
  '2007': {
    label: '2007',
    style: { display: 'none' },
  },
  '2008': {
    label: '2008',
    style: { display: 'none' },
  },
  '2009': {
    label: '2009',
    style: { display: 'none' },
  },
  '2010': {
    label: '2010',
    style: {},
  },
  '2011': {
    label: '2011',
    style: { display: 'none' },
  },
  '2012': {
    label: '2012',
    style: { display: 'none' },
  },
  '2013': {
    label: '2013',
    style: { display: 'none' },
  },
  '2014': {
    label: '2014',
    style: { display: 'none' },
  },
  '2015': {
    label: '2015',
    style: {},
  },
  '2016': {
    label: '2016',
    style: { display: 'none' },
  },
  '2017': {
    label: '2017',
    style: { display: 'none' },
  },
  '2018': {
    label: '2018',
    style: { display: 'none' },
  },
  '2019': {
    label: '2019',
    style: { display: 'none' },
  },
  '2020': {
    label: '2020',
    style: { display: 'none' },
  },
  '2021': {
    label: '2021',
    style: {},
  },
};
export const drySpellMarks = {
  '2030': {
    label: '2030',
    style: {},
  },
  '2050': {
    label: '2050',
    style: {},
  },
  '2080': {
    label: '2080',
    style: {},
  },
};
export const gfwMarks = {
  '0': {
    value: '0',
    label: '2020-03-31',
    style: {},
  },
  '365': {
    value: '365',
    label: '2021-03-31',
    style: {},
  },
  '730': {
    value: '730',
    label: '2022-03-31',
    style: {},
  },
};

export const LAYER_IDS = {
  AIR_QUALITY: 'AIR_QUALITY',
  WIND_SPEED: 'WIND_SPEED',
  DRY_SPELLS: 'DRY_SPELLS',
  GLAD_ALERTS: 'GLAD_ALERTS',
  TREE_COVER_LOSS: 'TREE_COVER_LOSS',
};

export const LAYER_TITLES = {
  AIR_QUALITY: 'Latest Months Average Tropospheric Nitrogen Dioxide (NO₂) (mol/m², millionths)',
};
