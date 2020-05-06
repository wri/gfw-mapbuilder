export const allowedLayers = [
  'feature',
  'dynamic',
  'loss',
  'gain',
  'image',
  'webtiled',
  'imagery',
  'glad',
  'terra',
  'primed'
]; //To be: tiled, webtiled, image, dynamic, feature, graphic, and custom (loss, gain, glad, etc)

//Layer controls (IDS)
export const densityEnabledLayers = [
  'TREE_COVER_LOSS',
  'AG_BIOMASS',
  'TREE_COVER'
];

export const landsatBaselayerURL =
  'https://production-api.globalforestwatch.org/v2/landsat-tiles/2017/{level}/{col}/{row}';

export const landsatBaselayerYears = [2013, 2014, 2015, 2016, 2017];
