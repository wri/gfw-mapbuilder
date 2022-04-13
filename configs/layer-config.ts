export const supportedLayers = [
  'feature',
  'dynamic',
  'loss',
  'tree-mosaic',
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

//Layer controls (IDS)
export const densityEnabledLayers = ['TREE_COVER_LOSS', 'AG_BIOMASS', 'TREE_COVER', 'TREES_MOSAIC_LANDSCAPES'];

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
