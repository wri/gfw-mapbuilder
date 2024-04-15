export const supportedLayers = [
  'feature',
  'dynamic',
  'loss',
  'tree-mosaic',
  'tropical-tree-cover',
  'forest-carbon-gross-removals',
  'forest-carbon-gross-emissions',
  'forest-carbon-net-flux',
  'umd-land-cover',
  'gain',
  'image',
  'webtiled',
  'tiled',
  'imagery',
  'glad',
  'integrated-alert-layer',
  'primed',
  'tree-cover',
  'tree-cover-height',
  'co2_emissions',
  'Vector.Layer',
  'base-tile-layer',
  'wms',
];

//Layer controls (IDS) // TODO: add layer id
export const densityEnabledLayers = [
  'TREE_COVER_LOSS',
  'AG_BIOMASS',
  'TREE_COVER',
  'TREES_MOSAIC_LANDSCAPES',
  'TROPICAL_TREE_COVER',
  'FOREST_CARBON_GROSS_REMOVALS',
  'FOREST_CARBON_GROSS_EMISSIONS',
  'FOREST_CARBON_NET_FLUX',
];

export const landsatBaselayerURL =
  'https://production-api.globalforestwatch.org/v2/landsat-tiles/2017/{level}/{col}/{row}';

export const landsatBaselayerYears = [2013, 2014, 2015, 2016, 2017];

export const WRIBasemapConfig = {
  wri_mono:
    'https://api.mapbox.com/styles/v1/resourcewatch/ckaoefuc302dw1ipfh7tfi7ll/tiles/256/{level}/{col}/{row}@2x?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjbHVpdThvMXQwOHE3MnJwNTE5eG5ia2g5In0.MAe9L4aHjj97kAeD-S6KXA',
  wri_contextual:
    'https://api.mapbox.com/styles/v1/resourcewatch/ckaoehoff02fn1ipfan4jblxh/tiles/256/{level}/{col}/{row}@2x?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjbHVpdThvMXQwOHE3MnJwNTE5eG5ia2g5In0.MAe9L4aHjj97kAeD-S6KXA',
};

export const customBasemapIcon = 'https://my.gfw-mapbuilder.org/img/custom_basemap.png';

//Timeslider objects for tree cover loss, dry spells and gfw
// TODO: replace defaultMarks with generateRangeDate method from utils
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

export const landCoverMarks = {
  '2000': {
    value: '2000',
    label: '2000',
    style: {},
  },
  '2020': {
    value: '2020',
    label: '2020',
    style: {},
  },
};

export const LAYER_IDS = {
  AIR_QUALITY: 'AIR_QUALITY',
  WIND_SPEED: 'WIND_SPEED',
  DRY_SPELLS: 'DRY_SPELLS',
  GLAD_ALERTS: 'GLAD_ALERTS',
  GLAD_S2_ALERTS: 'GLAD_S2_ALERTS',
  RADD_ALERTS: 'RADD_ALERTS',
  TREE_COVER_LOSS: 'TREE_COVER_LOSS',
  UMD_LAND_COVER: 'UMD_LAND_COVER',
  GFW_INTEGRATED_ALERTS: 'GFW_INTEGRATED_ALERTS',
  VIIRS_FIRES: 'VIIRS_FIRES',
  GEOGRAPHIC_COVERAGE_LAYER: 'GEOGRAPHIC_COVERAGE_LAYER',
  INPE_CERRADO_PRODES: 'INPE_CERRADO_PRODES',
  INPE_AMAZON_PRODES: 'INPE_AMAZON_PRODES',
  TROPICAL_TREE_COVER: 'TROPICAL_TREE_COVER',
};

export const LAYER_TITLES = {
  AIR_QUALITY: 'Latest Months Average Tropospheric Nitrogen Dioxide (NO₂) (mol/m², millionths)',
};

export const GEOGRAPHIC_COVER_LAYER_URL = {
  UMD_GLAD_LANDSAT_ALERTS:
    'https://tiles.globalforestwatch.org/umd_glad_landsat_alerts_coverage/v2014/default/root.json',
  UMD_GLAD_SENTINEL_ALERTS:
    'https://tiles.globalforestwatch.org/umd_glad_sentinel2_alerts_coverage/v20210413/default/{z}/{x}/{y}.png',
  WUR_RADD_COVERAGE: 'https://tiles.globalforestwatch.org/wur_radd_coverage/v20211016/default/{z}/{x}/{y}.png',
};

export const DATE_PICKER_START_DATES = {
  GFW_INTEGRATED_ALERTS: '2020-03-03',
  GLAD_ALERTS: '2020-01-03',
};
