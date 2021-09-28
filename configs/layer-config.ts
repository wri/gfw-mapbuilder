export const supportedLayers = [
  'feature',
  'dynamic',
  'loss',
  'gain',
  'image',
  'webtiled',
  'imagery',
  'glad',
  'primed',
  'tree-cover',
  'tree-cover-height',
  'co2_emissions',
  'Vector.Layer'
];

// export const baseMetadataURL = 'https://api.resourcewatch.org/v1/gfw-metadata/'; //append metadata id to the url to retrieve it, attributes.applicationConfig.metadata

//Hard coded layers that will always be added to the application unless opt out option is specified in the config, UUID denotes gfw-api layer ID, this is used to pull in layer from gfw-api that we dont control, layers used in Flagship (globalforestwatch.org) are consumed this way
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
  }
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

export const analysisSQLConfigs = {
  VIIRS_FIRES:
    'select COALESCE(sum(alert__count), 0)  as "sum" from nasa_viirs_fire_alerts where alert__date >= {startDate} and alert__date <= {endDate}',
  GLAD_ALERTS:
    'select COALESCE(sum(alert__count), 0)  as "sum" from umd_glad_landsat_alerts where umd_glad_landsat_alerts__date >= {startDate} and umd_glad_landsat_alerts__date <= {endDate}'
};

// "sum of all glad alerts within an AOI from from Jan 1, 2021 till Jan 31, 2021

// https://staging-data-api.globalforestwatch.org/dataset/umd_glad_landsat_alerts/latest/query?geostore_id=1d568c183033da6c17cc28c4aecf1bcf&geostore_origin=rw&sql=select sum(alert__count) from umd_glad_landsat_alerts where umd_glad_landsat_alerts__date >= '2021-01-01' and umd_glad_landsat_alerts__date <= '2021-01-31'"
