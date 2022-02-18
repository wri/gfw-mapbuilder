export const supportedLayers = [
  'feature',
  'dynamic',
  'loss',
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
  'Vector.Layer'
];

//Layer controls (IDS)
export const densityEnabledLayers = ['TREE_COVER_LOSS', 'AG_BIOMASS', 'TREE_COVER'];

export const landsatBaselayerURL =
  'https://production-api.globalforestwatch.org/v2/landsat-tiles/2017/{level}/{col}/{row}';

export const landsatBaselayerYears = [2013, 2014, 2015, 2016, 2017];

export const WRIBasemapConfig = {
  wri_mono:
    'https://api.mapbox.com/styles/v1/resourcewatch/ckaoefuc302dw1ipfh7tfi7ll/tiles/256/{level}/{col}/{row}@2x?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjajFlcXZhNzcwMDBqMzNzMTQ0bDN6Y3U4In0.FRcIP_yusVaAy0mwAX1B8w',
  wri_contextual:
    'https://api.mapbox.com/styles/v1/resourcewatch/ckaoehoff02fn1ipfan4jblxh/tiles/256/{level}/{col}/{row}@2x?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjajFlcXZhNzcwMDBqMzNzMTQ0bDN6Y3U4In0.FRcIP_yusVaAy0mwAX1B8w'
};

export const customBasemapIcon = 'https://my.gfw-mapbuilder.org/img/custom_basemap.png';
