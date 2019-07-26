import analysisKeys from 'constants/AnalysisConstants';

const analysisImageService = 'https://gis-gfw.wri.org/arcgis/rest/services/image_services/analysis/ImageServer';

const config = {
  shortTermServices : {
    modis24HR: {
      url: 'https://gis-gfw.wri.org/arcgis/rest/services/Fires/FIRMS_Global_MODIS_24hrs/MapServer',
      id: 21
    },
    modis48HR: {
      url: 'https://gis-gfw.wri.org/arcgis/rest/services/Fires/FIRMS_Global_MODIS_48hrs/MapServer',
      id: 21
    },
    modis7D: {
      url: 'https://gis-gfw.wri.org/arcgis/rest/services/Fires/FIRMS_Global_MODIS_7d/MapServer',
      id: 21
    },
    modis1YR: {
      url: 'https://gis-gfw.wri.org/arcgis/rest/services/Fires/FIRMS_Global_MODIS_1yr/MapServer',
      id: 21
    },
    viirs24HR: {
      url: 'https://gis-gfw.wri.org/arcgis/rest/services/Fires/FIRMS_Global_VIIRS_24hrs/MapServer',
      id: 21
    },
    viirs48HR: {
      url: 'https://gis-gfw.wri.org/arcgis/rest/services/Fires/FIRMS_Global_VIIRS_48hrs/MapServer',
      id: 21
    },
    viirs7D: {
      url: 'https://gis-gfw.wri.org/arcgis/rest/services/Fires/FIRMS_Global_VIIRS_7d/MapServer',
      id: 21
    },
    viirs1YR: {
      url: 'https://gis-gfw.wri.org/arcgis/rest/services/Fires/FIRMS_Global_VIIRS_1yr/MapServer',
      id: 0
    }
  },
  
  map: {
    options: {
      navigationMode: 'css-transforms',
      force3DTransforms: true,
      // showAttribution: false,
      fadeOnZoom: true,
      slider: false,
      logo: false
    }
  },

  corsServers: [
    'gis-gfw.wri.org',
    'gis-potico.wri.org',
    'gis-treecover.wri.org',
    'api.globalforestwatch.org',
    'alpha.blueraster.io',
    'staging.blueraster.io',
    'stg.blueraster.com.s3.amazonaws.com',
    'production-api.globalforestwatch.org',
    'production-api.globalforestwatch.org/v1/ogr',
    'production-api.globalforestwatch.org/v1/ogr/convert',
    'api.resourcewatch.org',
    'gis.wri.org',
    'tiles.globalforestwatch.org',
    'staging-api.globalforestwatch.org',
    'wri-01.carto.com',

  ],

  urls: {
    metadataApi: 'https://gis-gfw.wri.org/metadata',
    metadataXmlEndpoint: (sharingHost, itemId) => `${sharingHost}/sharing/rest/content/items/${itemId}/info/metadata/metadata.xml`,
    cartoMetaEndpoint: (cartoUser, cartoLayerId, cartoApiKey) => `https://${cartoUser}.carto.com/api/v1/viz/${cartoLayerId}?api_key=${cartoApiKey}`,
    cartoDataEndpoint: (cartoUser, queryString, cartoApiKey) => `//${cartoUser}.cartodb.com/api/v2/sql?format=TopoJSON&q=${queryString}&api_key=${cartoApiKey}`,
    cartoTemplateEndpoint: (cartoUser, cartoTemplateId, cartoApiKey) => `https://${cartoUser}.carto.com/api/v1/map/named/${cartoTemplateId}?api_key=${cartoApiKey}`,
    esriLegendService: 'https://gis-gfw.wri.org/arcgis/rest/services/legends/MapServer',
    satelliteImageService: 'https://production-api.globalforestwatch.org/recent-tiles',
    analysisDataBaseUrl: 'https://production-api.globalforestwatch.org',
    forestWatchLayerApi: 'https://production-api.globalforestwatch.org/v1/layer',
  },

  upload: {
    portal: 'https://www.arcgis.com/sharing/rest/content/features/generate',
    shapefileParams: (name, spatialReference, extentWidth, mapWidth) => {
      return {
        'name': name,
        'generalize': true,
        'targetSr': spatialReference,
        'maxRecordCount': 1000,
        'reducePrecision': true,
        'numberOfDigitsAfterDecimal': 0,
        'enforceInputFileSizeLimit': true,
        'enforceOutputJsonSizeLimit': true,
        'maxAllowableOffset': extentWidth / mapWidth
      };
    },
    shapefileContent: (params, filetype) => {
      return {
        'publishParameters': params,
        'callback.html': 'textarea',
        'filetype': filetype,
        'f': 'json'
      };
    }
  },

  layerPanel: {
    landCoverDynamics: 'Land Cover Dynamics',
    landCover: 'Land Cover',
    waterStressLegend: {
      min: 'Low',
      max: 'High',
      arid: 'Arid',
      nodata: 'No Data'
    },
    sedimentLegend: {
      min: 'Low',
      max: 'Extreme'
    },
    firesOptions: [
      {label: 'Past Week', value: 7},
      {label: 'Past 72 hours', value: 3},
      {label: 'Past 48 hours', value: 2},
      {label: 'Past 24 hours', value: 1}
    ],
  },
  errors: {
    missingLayerConfig: 'You provided a layer config containing a url but not a type, please specify the layer type in the layer config.',
    incorrectLayerConfig: type => `You provided an invalid type, the application is not configured for type: ${type}. Please use the correct type or implement it in the LayerFactory.`,
    geolocationUnavailable: 'Sorry, it looks like your browser does not support geolocation, please try the latest versions of Safari, Chrome, or Firefox.',
    geolocationFailure: message => `Error retrieving location at this time. ${message}`,
    featureNotFound: 'We could not find a feature available at this point. Please try again.'
  },
  modals: {
    noInfo: 'No Information Available',
    alerts: {
      title: 'Subscribe to GFW Alerts',
      descriptions: {
        email: 'Your email address',
        subscription: 'Name your subscription area',
        subscriptionTypes: 'Select your subscriptions'
      },
      messages: {
        formaSuccess: 'Thank you for subscribing to Forma Alerts.\nYou should receive a confirmation email soon.',
        formaFail: 'There was an error with your request to subscribe to Forma alerts.\rPlease try again later.',
        fireSuccess: 'Thank you for subscribing to Fires Alerts.\rYou should receive a confirmation email soon.',
        fireFail: 'There was an error with your request to subscribe to Fires alerts.\rPlease try again later.'
      }
    },
    canopy: {
      slider: [0, 10, 15, 20, 25, 30, 50, 75, 100]
    },
    share: {
      title: 'Share this view',
      linkInstructions: 'Copy and paste the link to share it or use the buttons below to share on social media.',
      copyFailure: 'Sorry, we were unable to copy this to your clipboard, please press Cmd + c on Mac or Ctrl + c on Windows/Linux.',
      copyButton: 'Copy',
      copiedButton: 'Copied',
      googleUrl: url => `https://plus.google.com/share?url=${url}`,
      twitterUrl: url => `https://twitter.com/share?url=${url}`,
      facebookUrl: url => `https://www.facebook.com/sharer.php?u=${url}`
    },
    imagery: {

      monthsOptions: [
        { label: '4 weeks', value: 4 },
        { label: '3 months', value: 3},
        { label: '6 months', value: 6},
        { label: '12 months', value: 12}
      ],

      imageStyleOptions: [
        { label: 'Natural Color'},
        { label: 'Vegetation Health'}
      ],
    },
  },

  //- Analysis for individual layers are defined below so we can use common keys
  //- Generic/Modules config is here
  //- Since switching to Vega widgets, we no longer use the config analyses below!
  analysis: {
    apiUrl: 'https://production-api.globalforestwatch.org/v1/geostore',
    imageService: analysisImageService,
    pixelSize: 100,
    tcd: {
      id: '$520',
      outputValues: [0, 1],
      inputRanges: (density) => [0, +density, +density, 101]
    },
    restoration: {
      landCoverId: '$1',
      populationId: '$2',
      slopeId: '$3',
      treeCoverId: '$4',
      rainfallId: '$5'
    }
  }
};

//- Configure Analysis here
config.analysis[analysisKeys.INTACT_LOSS] = {
  id: '$9',
  bounds: [0, 1],
  colors: ['#186513']
};

config.analysis[analysisKeys.MANGROVE_LOSS] = {
  id: '$564',
  bounds: [0, 1],
  colors: ['#06FFAA']
};

config.analysis[analysisKeys.SAD_ALERTS] = {
  url: 'https://gis-gfw.wri.org/arcgis/rest/services/forest_change/MapServer/2',
  outFields: ['date', 'data_type', 'shape_Area'],
  colors: {
    degrad: '#FA98B9',
    defor: '#F13689'
  }
};

config.analysis[analysisKeys.GLAD_ALERTS] = {
  url: 'https://gis-gfw.wri.org/arcgis/rest/services/image_services/glad_alerts_analysis/ImageServer',
  lockrasters: {
    '2015': 6,
    '2016': 4,
    '2017': 9
  },
  analysisUrl: 'https://production-api.globalforestwatch.org/widget/dae27aaf-6dc6-4cc4-ac65-9901ed3f162b',
  startDate: '2015',
  endDate: new Date().getFullYear()
};

// config.analysis[analysisKeys.TERRA_I_ALERTS] = {
//   url: 'https://gis-gfw.wri.org/arcgis/rest/services/image_services/terrai_analysis/ImageServer',
//   analysisUrl: 'https://production-api.globalforestwatch.org/v1/terrai-alerts'
// };

config.analysis[analysisKeys.BIO_LOSS] = {
  // id: '$524',
  // bounds: [0, 2],
  // labels: ['1 - 19', '20 - 79', '>= 80'],
  // colors: ['#fdffcc', '#f1bc8b', '#d56f4a'],
  // remap: {
  //   'rasterFunction': 'Remap',
  //   'rasterFunctionArguments': {
  //     'InputRanges': [0, 20, 20, 80, 80, 1000],
  //     'OutputValues': [0, 1, 2],
  //     'Raster': '$524',
  //     'AllowUnmatched': false
  //   }
  // },
  labels: [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014],
  url: '',
  colors: {
    loss: '#FF6699',
    carbon: '#BEBCC2'
  },
  analysisUrl: 'https://production-api.globalforestwatch.org/widget/https://production-api.globalforestwatch.org/widget/937a74e7-f616-4d1d-91b3-e69c68e278aa',
  startDate: '2001',
  endDate: '2014'
};

config.analysis[analysisKeys.SLOPE] = {
  id: '$3',
  restoration: '$6',
  slopeOptions: [
    { label: '<= 30%', value: 1 },
    { label: '30% - 60%', value: 2 },
    { label: '> 60%', value: 3 }
  ]
};

config.analysis[analysisKeys.TC_LOSS_GAIN] = {
  lossRaster: '$530',
  gainRaster: '$527',
  analysisUrl: 'https://production-api.globalforestwatch.org/widget/e6c01eff-0d79-4865-a431-65d6adb89589'
};

config.analysis[analysisKeys.TC_LOSS] = {
  id: '$530',
  colors: ['#cf5188'],
  // TODO: Generate these dynamically
  bounds: [1, 18],
  labels: [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018]
};

config.analysis[analysisKeys.VIIRS_FIRES] = {
  url: 'https://gis-gfw.wri.org/arcgis/rest/services/Fires/FIRMS_Global_VIIRS_1yr/MapServer/0',
  analysisUrl: 'https://production-api.globalforestwatch.org/widget/97b82853-d9fb-4e74-b9b3-2fac7937f38f',
};

config.analysis[analysisKeys.MODIS_FIRES] = {
  url: 'https://gis-gfw.wri.org/arcgis/rest/services/Fires/FIRMS_Global_MODIS_1yr/MapServer/21'
};

config.analysis[analysisKeys.LCC] = {
  analysisUrl: 'https://production-api.globalforestwatch.org/widget/65dc8170-0049-48e7-94ba-fa846fcb295c',
};

config.analysis[analysisKeys.IFL] = {
  analysisUrl: 'https://production-api.globalforestwatch.org/widget/d0d22aeb-9642-4c4d-a310-f7fb95a48c21',
};

export const mapConfig = config.map;
export const uploadConfig = config.upload;
export const analysisConfig = config.analysis;
export const corsServers = config.corsServers;
export const layerPanelText = config.layerPanel;
export const layerInformation = config.layerInformation;
export const modalText = config.modals;
export const errors = config.errors;
export const urls = config.urls;
export const shortTermServices = config.shortTermServices;
