define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {

    //- NOTE: New Forest Atlas 2.0 Options, These are the raw values coming from ArcGIS Online from

    //- General Settings
    // webmap to use for testing metadata.xml fetching/parsing - 4d426ef4be0f483e9dab047fbb4c6718
    // webmap to use for testing document attachments - b514d31339954ba9a0c5822135bc2001
    // webmap to use for testing time enabled layers - 9416e5b5beea4d329dbbfdc3312d2c35
    // webmap to use for deployment, this should be the default - de85e3fcc07948238aa6c1afd2a4ceb0
    webmap: 'de85e3fcc07948238aa6c1afd2a4ceb0',
    title: 'GFW Mapbuilder',
    subtitle: 'Make maps that matter',
    logoUrl: './css/images/gfw-logo.png',
    logoLinkUrl: 'http://www.gfw-mapbuilder.org/',
    aboutLinkUrl: '', // http://www.gfw-mapbuilder.org/
    downloadLinkUrl: '', // http://data.globalforestwatch.org/
    printServiceUrl: 'http://gis.forest-atlas.org/arcgis/rest/services/print/ExportWebMap/GPServer/Export%20Web%20Map',
    maskServiceUrl: '', // e.g. http://gis-forest-atlas.wri.org/arcgis/rest/services/CMR/CMR_00_Africa/MapServer
    mapThemeIds: '', // e.g. 1c38ba1095fe49e3ba234bf9105c1077;c76d788b7487476bae4d09a4e933be19
    mapThemes: '', // e.g. Forest Atlas of Cameroon;Forest Atlas of Equatorial Guinea
    narrative: '',
    includeSubscribeButton: false,
    includeMyGFWLogin: false,
    navLinksInNewTab: false,
    //- Language Settings
    language: 'en',
    useAlternativeLanguage: false,
    alternativeWebmap: '',
    alternativeLanguage: 'fr',
    alternativeLanguageTitle: 'GFW Mapbuilder',
    alternativeLanguageSubtitle: 'Make maps that matter',
    alternativeMapThemes: '', // e.g. Forest Atlas of Cameroon;Forest Atlas of Equatorial Guinea
    alternativeNarrative: '',
    alternativeWebmapMenuName: 'Land Use',
    //- Documents Settings
    includeDocumentsTab: false,
    documentsDirectory: 'https://cmr.forest-atlas.org/resources/docs/',
    documentsMapserver: 'http://gis.forest-atlas.org/arcgis/rest/services/CMR/documents_administratifs/MapServer',
    //- Layers/Analysis Settings
    iso: '',
    activeFires: true,
    intactForests: true,
    aboveGroundBiomass: true,
    landCover: true,
    mangroves: true,
    sadAlerts: true,
    gladAlerts: true,
    terraIAlerts: true,
    webmapMenuName: 'Land Use',
    //- Restoration Module settings
    restorationModule: false,
    restorationImageServer: 'http://gis-gfw.wri.org/arcgis/rest/services/image_services/eth_restoration_module2/ImageServer', //'http://gis-gfw.wri.org/arcgis/rest/services/image_services/eth_restoration_module/ImageServer'
    slopePotentialOptions: 'Potential for commercial plantation on bare soil and shrubland only;Potential for agri-silviculture and agro-silvo-pastoralism, and woodlot;Potential for establishing natural forest only;Potential for restocking degraded natural forest only;Potential for woodlot only;Potential for silvo-pastoralism only;Potential for tree-buffer zone along rivers, lakes and reservoirs only;Potential for commercial plantation as buffer zone around (NF)PAs;Two restoration options identified as having potential;Three or more restoration options identified as having potential',
    alternativeSlopePotentialOptions: 'Potential for commercial plantation on bare soil and shrubland only;Potential for agri-silviculture and agro-silvo-pastoralism, and woodlot;Potential for establishing natural forest only;Potential for restocking degraded natural forest only;Potential for woodlot only;Potential for silvo-pastoralism only;Potential for tree-buffer zone along rivers, lakes and reservoirs only;Potential for commercial plantation as buffer zone around (NF)PAs;Two restoration options identified as having potential;Three or more restoration options identified as having potential',
    slopePotentialColors: 'rgb(234,199,253);rgb(253,178,46);rgb(88,126,15);rgb(210,147,116);rgb(245,208,139);rgb(177,177,36);rgb(26,176,144);rgb(175,15,143);rgb(217,254,199);rgb(255,254,137);',
    restorationOptions: 'establishing natural forest outside of cropland;restocking of degraded natural forest;agri-silviculture and agro-silvo-pastoralism;silvo-pastoralism;woodlot;commercial plantation on bare soil and shrubland;commercial plantation as buffer zone to national forest priority areas and protected areas;tree-based buffer zone along rivers, lakes and reservoirs;',
    alternativeRestorationOptions: 'establishing natural forest outside of cropland;restocking of degraded natural forest;agri-silviculture and agro-silvo-pastoralism;silvo-pastoralism;woodlot;commercial plantation on bare soil and shrubland;commercial plantation as buffer zone to national forest priority areas and protected areas;tree-based buffer zone along rivers, lakes and reservoirs;',
    restorationOptionsRasterIds: '9;10;6;11;13;8;7;12;',
    slopeClassNames: 'No Data;<= 30%;30 - 60%;> 60%;',
    slopeClassColors: 'rgb(0, 0, 0);rgb(255, 235, 175);rgb(115, 115, 0);rgb(168, 0, 0);',
    treeCoverClassNames: 'No Data;<= 10%;10 - 30%;> 30%;',
    treeCoverClassColors: 'rgb(0, 0, 0);rgb(180, 215, 158);rgb(245, 245, 122);rgb(205, 170, 102);',
    landCoverClassNames: 'No Data;Forestland;Grassland;Cropland;Wetland and Waterbodies;Settlement;Bare soil;',
    landCoverClassColors: 'rgb(0, 0, 0);rgb(0, 174, 0);rgb(255, 255, 0);rgb(255, 155, 190);rgb(0, 238, 238);rgb(255, 0, 0);rgb(255, 255, 188);',
    populationClassNames: 'No Data;<= 20;20 - 50;50 - 150;150 - 500;> 500;',
    populationClassColors: 'rgb(0, 0, 0);rgb(255, 255, 128);rgb(250, 209, 85);rgb(242, 167, 46);rgb(173, 83, 19);rgb(107, 0, 0);',
    rainfallClassNames: 'No Data;Class 1;Class 2;Class 3;',
    rainfallClassColors: 'rgb(0, 0, 0);rgb(255, 0, 0), rgb(0, 255, 0);rgb(0, 0, 255);',
    //- Include/Exclude various restoration analysis types
    restorationSlope: true, //- Main Slope Analysis
    restorationSlopePotential: true, //- Part of the various restoration options
    restorationTreeCover: true,
    restorationLandCover: true,
    restorationPopulation: true,
    restorationRainfall: true,

    // Options not configurable from AGOL but can be from here
    restorationChartDescription: 'Some explanatory text for this anlaysis',
    restorationTableDescription: 'Some explanatory text for this anlaysis',
    slopeDescription: 'Some explanatory text for this anlaysis',
    alternativeRestorationChartDescription: 'Some explanatory text for this anlaysis',
    alternativeRestorationTableDescription: 'Some explanatory text for this anlaysis',
    alternativeSlopeDescription: 'Some explanatory text for this anlaysis',
    // DO NOT MODIFY SHARINGHOST unless you are configuring this for a Portal Environment
    sharinghost: 'http://www.arcgis.com',
    analyticsCode: 'UA-62288390-15',
    userFeatureToken: {
      //- Localhost token for BR office
      'localhost': 'TjEeQfPMtR-0kjqzTqIZ7R-NAzGK1Z2sEQo6Dzt17O42DeIlaAxdqeg7GPMANVcC',
      'alpha.blueraster.io': 'TjEeQfPMtR-0kjqzTqIZ7dagw25IJzDP02-D9WnUmPbMjcX-0zyr-9A_I9IqrImwJOwVpL_5qxPZAT-heBZ4RQ..',
      'alpha.blueraster.io.s3.amazonaws.com': 'TjEeQfPMtR-0kjqzTqIZ7dagw25IJzDP02-D9WnUmPbMjcX-0zyr-9A_I9IqrImwJOwVpL_5qxPZAT-heBZ4RQ..',
      //- Github token
      'wri.github.io': 'TjEeQfPMtR-0kjqzTqIZ7cl-o01RHvmC7tVmcyLHrT3-TfMZbwysm9txFEib56OM',
      //- Other production tokens
      'my.gfw-mapbuilder.org': 'HChmm-nytaxWk0D4nKljrtwXUelpvdU3R5vZ3jA1H7aqX5jcgUWd-H2dHXpm6ENNEFuRfPl_WgQMQYbgffjedA..',
      'wri-sites.s3-website-us-east-1.amazonaws.com': 'xtpo8j176BbwJJDdlfLlDyvkZbSYFLxiub2ND-fWDVpOpPhSfwcm0wiMHJktvhG3oBwivVuykjMgz90rherwt_b9tR4vRfggoMgqIIQzN8ufDziAtmpI2xl7niY82c0P'
    },

    /**
    * Layer panel configuration, anything with an = is optional, {object=}
    * Order at the group level controls the order of the accordions, the top most accordion's layers
    * will also be the top most layers on the map. The order in the layer level controls how those layers
    * are organized within their own group
    ** @name layerPanel
    ** Both labels and sublabels are objects whose properties are ISO codes for supported languages
    ** and values are string labels
    * @property {object=} label - Label for the group in the layer panel
    * @property {number} order - Order the accordions, and their layers, appear in the UI and the map, MUST START AT 1
    * @property {object[]=} layers - Layers placed in the various accordions
    * @property {object[]=} extraLayers - Layers not placed in the Layer panel but are on the map
    * @property {number} layers[].order - Order of this layer in this section only
    * @property {string} layers[].id - Must be a unique id for the layer
    * @property {string} layers[].type - The type of the layer, valid values are currently one of the following:
    ** tiled | webtiled | image | dynamic | feature | graphic | glad | terra
    * @property {boolean=} layers[].visible - Default visibility of the layer, default is false
    * @property {string} layers[].technicalName - Technical name for the GFW Metadata API
    * @property {number=} layers[].legendLayer - Optional layer id for an extra legend
    * @property {string} layers[].url - URL for the service
    * @property {object=} layers[].label - Label for the layer in the UI
    * @property {object=} layers[].sublabel - Sublabel for the layer in the UI
    * @property {boolean=} layers[].{ANY} - Any additional layer params that need to be passed through
    * @property {object=} popup - Popup configuration for the layer if it is available
    */
    layerPanel: {
      GROUP_WEBMAP: {
        order: 2,
        label: {}, // Configurable via alternativeWebmapMenuName and webmapMenuName above
        layers: [] // Will get filled in with layers from the webmap
      },
      GROUP_LCD: {
        order: 1,
        label: {
          en: 'Land Cover Dynamics',
          fr: 'Evolution de la couverture des sols',
          es: 'Dinámica de la Cobertura del Suelo',
          pt: 'Land Cover Dynamics',
          id: 'Land Cover Dynamics',
          zh: '土地覆盖动态数据'
        },
        layers: [{
          order: 1,
          id: 'TREE_COVER_LOSS',
          type: 'image',
          url: 'http://gis-treecover.wri.org/arcgis/rest/services/ForestCover_lossyear_density/ImageServer',
          technicalName: 'tree_cover_loss',
          legendLayer: 0,
          colormap: [[1, 219, 101, 152]],
          inputRange: [1, 15],
          outputRange: [1],
          label: {
            en: 'Tree cover loss',
            fr: 'Perte en couvert arboré',
            es: 'Pérdida de la cobertura arbórea',
            pt: 'Tree cover loss',
            id: 'Tree cover loss',
            zh: '森林覆盖损失'
          },
          sublabel: {
            en: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            fr: '(annuel, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            es: '(anual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            pt: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            id: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            zh: '(每年更新, 30米, 全球覆盖, 汉森/马里兰大学/谷歌/美国地质测量局(USGS)/美国宇航局(NASA))'
          }
        }, {
          order: 2,
          id: 'TREE_COVER_GAIN',
          type: 'image',
          url: 'http://gis-treecover.wri.org/arcgis/rest/services/ForestGain_2000_2012/ImageServer',
          technicalName: 'tree_cover_gain',
          legendLayer: 1,
          label: {
            en: 'Tree cover gain',
            fr: 'Gain en couvert arboré',
            es: 'Aumento de la cobertura arbórea',
            pt: 'Tree cover gain',
            id: 'Tree cover gain',
            zh: '森林覆盖增加'
          },
          sublabel: {
            en: '(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            fr: '(12 ans, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            es: '(12 años, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            pt: '(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            id: '(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            zh: '(12 年, 30米, 全球覆盖, 汉森/马里兰大学/谷歌/美国地质测量局(USGS)/美国宇航局(NASA))'
          }
        }, {
          order: 3,
          id: 'IMAZON_SAD',
          type: 'dynamic',
          url: 'http://gis-gfw.wri.org/arcgis/rest/services/forest_change/MapServer',
          technicalName: 'imazon_sad',
          layerIds: [2],
          label: {
            en: 'SAD alerts',
            fr: 'Alertes SAD',
            es: 'SAD alerts',
            pt: 'SAD alerts',
            id: 'SAD alerts',
            zh: 'SAD alerts'
          },
          sublabel: {
            en: '(monthly, 250m, Brazilian Amazon, Imazon)',
            fr: '(mensuel, 250m, Amazonie brésilienne, Imazon)',
            es: '(monthly, 250m, Brazilian Amazon, Imazon)',
            pt: '(monthly, 250m, Brazilian Amazon, Imazon)',
            id: '(monthly, 250m, Brazilian Amazon, Imazon)',
            zh: '(monthly, 250m, Brazilian Amazon, Imazon)'
          }
        }, {
          order: 4,
          id: 'GLAD_ALERTS',
          type: 'glad',
          url: 'http://wri-tiles.s3.amazonaws.com/glad_prod/tiles/{z}/{x}/{y}.png',
          technicalName: 'umd_landsat_alerts',
          legendLayer: 7,
          minDateValue: 15000,
          maxDateValue: 16365,
          confidence: [0, 1],
          label: {
            en: 'Glad Alerts',
            fr: 'Alertes Glad',
            es: 'Glad Alerts',
            pt: 'Glad Alerts',
            id: 'Glad Alerts',
            zh: 'Glad Alerts'
          },
          sublabel: {
            en: '(weekly, 30m, select countries, UMD/ GLAD)',
            fr: '(hebdomadaire, 30m, certains pays, UMD/ GLAD)',
            es: '(weekly, 30m, select countries, UMD/ GLAD)',
            pt: '(weekly, 30m, select countries, UMD/ GLAD)',
            id: '(weekly, 30m, select countries, UMD/ GLAD)',
            zh: '(weekly, 30m, select countries, UMD/ GLAD)'
          }
        }, {
          order: 5,
          id: 'TERRA_I_ALERTS',
          type: 'terra',
          url: 'http://wri-tiles.s3.amazonaws.com/terrai_prod/tiles/{z}/{x}/{y}.png',
          technicalName: 'terra_i_alerts',
          legendLayer: 13,
          maxZoom: 10,
          minDateValue: 4000, //We know data starts in 2004
          // We are setting this way over max, the max date will get set set when TerraIControls mounts
          // We set this over max so all data is visible by default, and it will update the dates when available
          maxDateValue: 20000,
          imageServer: 'http://gis-gfw.wri.org/arcgis/rest/services/image_services/terrai_analysis/ImageServer',
          label: {
            en: 'Terra-I Alerts',
            fr: 'Alertes Terra-I',
            es: 'Terra-I Alerts',
            pt: 'Terra-I Alerts',
            id: 'Terra-I Alerts',
            zh: 'Terra-I Alerts'
          },
          sublabel: {
            en: '(monthly, 250m, Latin America, CIAT)',
            fr: '(mensuel, 250m, Amérique Latine, CIAT)',
            es: '(monthly, 250m, Latin America, CIAT)',
            pt: '(monthly, 250m, Latin America, CIAT)',
            id: '(monthly, 250m, Latin America, CIAT)',
            zh: '(monthly, 250m, Latin America, CIAT)'
          }
        }, {
          order: 6,
          id: 'ACTIVE_FIRES',
          type: 'dynamic',
          url: 'http://gis-potico.wri.org/arcgis/rest/services/Fires/Global_Fires/MapServer',
          technicalName: 'noaa18_fires',
          layerIds: [0, 1, 2, 3],
          label: {
            en: 'Active fires',
            fr: 'Feux actifs',
            es: 'Incendios activos',
            pt: 'Active fires',
            id: 'Active fires',
            zh: '活跃火点'
          },
          sublabel: {
            en: '(daily, 1km, global, NASA)',
            fr: '(journalier, 1km, global, NASA)',
            es: '活跃火点',
            pt: '(daily, 1km, global, NASA)',
            id: '(daily, 1km, global, NASA)',
            zh: '(每天更新, 1千米, 全球覆盖, 美国宇航局（NASA))'
          },
          popup: {
            title: {
              en: 'Active Fires'
            },
            content: {
              en: [{ 'label': 'Brightness', 'fieldExpression': 'BRIGHTNESS' }, { 'label': 'Confidence', 'fieldExpression': 'CONFIDENCE' }, { 'label': 'Latitude', 'fieldExpression': 'LATITUDE' }, { 'label': 'Longitude', 'fieldExpression': 'LONGITUDE' }, { 'label': 'Acquisition Date', 'fieldExpression': 'ACQ_DATE:DateString(hideTime:true)' }, { 'label': 'Acquisition Time', 'fieldExpression': 'ACQ_TIME' }]
            }
          }
        }]
      },
      GROUP_LC: {
        order: 3,
        label: {
          en: 'Land Cover',
          fr: 'Couverture des sols',
          es: 'Cobertura vegetal',
          pt: 'Land Cover',
          id: 'Land Cover',
          zh: '土地覆盖'
        },
        layers: [{
          order: 1,
          id: 'GLOB_MANGROVE',
          type: 'webtiled',
          url: 'http://{subDomain}.ashbu.cartocdn.com/wri-01/api/v1/map/23a7c3aea64174198a46c1fb4211023f:1467735931596/0/{level}/{col}/{row}.png',
          subDomains: [0, 1, 2, 3],
          technicalName: 'global_mangroves',
          legendLayer: 11,
          label: {
            en: 'Global Mangrove',
            fr: 'Global Mangrove',
            es: 'Global Mangrove',
            pt: 'Global Mangrove',
            id: 'Global Mangrove',
            zh: 'Global Mangrove'
          }
        }, {
          order: 2,
          id: 'IFL',
          type: 'dynamic',
          url: 'http://gis-gfw.wri.org/arcgis/rest/services/forest_cover/MapServer',
          technicalName: 'intact_forest_landscapes_change',
          layerIds: [0],
          label: {
            en: 'Intact Forest Landscape',
            fr: 'Paysage forestier intact',
            es: 'Paisajes Forestales Intactos',
            pt: 'Intact Forest Landscape',
            id: 'Intact Forest Landscape',
            zh: '原生森林景观'
          }
        }, {
          order: 3,
          id: 'AG_BIOMASS',
          type: 'image',
          url: 'http://gis-gfw.wri.org/arcgis/rest/services/image_services/whrc_carbon_tcd/ImageServer',
          technicalName: 'aboveground_biomass',
          legendLayer: 8,
          label: {
            en: 'Aboveground Live Woody Biomass Density',
            fr: 'Densité de la biomasse aérienne vivante',
            es: 'Aboveground Live Woody Biomass Density',
            pt: 'Aboveground Live Woody Biomass Density',
            id: 'Aboveground Live Woody Biomass Density',
            zh: 'Aboveground Live Woody Biomass Density'
          }
        }, {
          order: 4,
          id: 'LAND_COVER',
          type: 'dynamic',
          url: 'http://gis-gfw.wri.org/arcgis/rest/services/forest_cover/MapServer',
          technicalName: 'global_landcover',
          layerIds: [10],
          rasterId: '$523',
          bounds: [1, 20],
          classes: {
            en: ['Dense moist forest', 'Submontane forest', 'Mountain forest', 'Edaphic forest', 'Mangrove', 'Forest-savanna mosaic', 'Rural complex and young secondary forest', 'Closed to open deciduous woodland', 'Savanna woodland-Tree savanna', 'Shrubland', 'Grassland', 'Aquatic grassland', 'Swamp grassland', 'Sparse vegetation', 'Mosaic cultivated areas/vegeatation( herbaceous or shrub)', 'Agriculture', 'Irrigated agriculture', 'Bare areas', 'Artificial surfaces and associated areas', 'Water Bodies'],
            fr: ['Dense moist forest', 'Submontane forest', 'Mountain forest', 'Edaphic forest', 'Mangrove', 'Forest-savanna mosaic', 'Rural complex and young secondary forest', 'Closed to open deciduous woodland', 'Savanna woodland-Tree savanna', 'Shrubland', 'Grassland', 'Aquatic grassland', 'Swamp grassland', 'Sparse vegetation', 'Mosaic cultivated areas/vegeatation( herbaceous or shrub)', 'Agriculture', 'Irrigated agriculture', 'Bare areas', 'Artificial surfaces and associated areas', 'Water Bodies'],
            es: ['Dense moist forest', 'Submontane forest', 'Mountain forest', 'Edaphic forest', 'Mangrove', 'Forest-savanna mosaic', 'Rural complex and young secondary forest', 'Closed to open deciduous woodland', 'Savanna woodland-Tree savanna', 'Shrubland', 'Grassland', 'Aquatic grassland', 'Swamp grassland', 'Sparse vegetation', 'Mosaic cultivated areas/vegeatation( herbaceous or shrub)', 'Agriculture', 'Irrigated agriculture', 'Bare areas', 'Artificial surfaces and associated areas', 'Water Bodies'],
            pt: ['Dense moist forest', 'Submontane forest', 'Mountain forest', 'Edaphic forest', 'Mangrove', 'Forest-savanna mosaic', 'Rural complex and young secondary forest', 'Closed to open deciduous woodland', 'Savanna woodland-Tree savanna', 'Shrubland', 'Grassland', 'Aquatic grassland', 'Swamp grassland', 'Sparse vegetation', 'Mosaic cultivated areas/vegeatation( herbaceous or shrub)', 'Agriculture', 'Irrigated agriculture', 'Bare areas', 'Artificial surfaces and associated areas', 'Water Bodies'],
            id: ['Dense moist forest', 'Submontane forest', 'Mountain forest', 'Edaphic forest', 'Mangrove', 'Forest-savanna mosaic', 'Rural complex and young secondary forest', 'Closed to open deciduous woodland', 'Savanna woodland-Tree savanna', 'Shrubland', 'Grassland', 'Aquatic grassland', 'Swamp grassland', 'Sparse vegetation', 'Mosaic cultivated areas/vegeatation( herbaceous or shrub)', 'Agriculture', 'Irrigated agriculture', 'Bare areas', 'Artificial surfaces and associated areas', 'Water Bodies'],
            zh: ['Dense moist forest', 'Submontane forest', 'Mountain forest', 'Edaphic forest', 'Mangrove', 'Forest-savanna mosaic', 'Rural complex and young secondary forest', 'Closed to open deciduous woodland', 'Savanna woodland-Tree savanna', 'Shrubland', 'Grassland', 'Aquatic grassland', 'Swamp grassland', 'Sparse vegetation', 'Mosaic cultivated areas/vegeatation( herbaceous or shrub)', 'Agriculture', 'Irrigated agriculture', 'Bare areas', 'Artificial surfaces and associated areas', 'Water Bodies']
          },
          colors: ['#3B823D', '#7CA079', '#AAB785', '#355936', '#5BBCF8', '#8BB94B', '#F0F979', '#7B8840', '#CABA4F', '#D3A162', '#FDCA76', '#C1E5DC', '#7AD3AB', '#F3F3AF', '#F6988F', '#FFFFF0', '#FFFFF0', '#A7A7A7', '#F83D48', '#353C92'],
          label: {
            en: 'Land cover',
            fr: 'Couverture des sols',
            es: 'Cobertura vegetal',
            pt: 'Land cover',
            id: 'Land cover',
            zh: '土地覆盖'
          }
        }, {
          order: 5,
          id: 'TREE_COVER',
          type: 'image',
          url: 'http://gis-treecover.wri.org/arcgis/rest/services/TreeCover2000/ImageServer',
          technicalName: 'tree_cover',
          colormap: [[1, 0, 179, 0]],
          inputRange: [30, 101],
          outputRange: [1],
          opacity: 0.8,
          legendLayer: 2,
          label: {
            en: 'Tree cover density',
            fr: 'Densité du couvert arboré',
            es: 'Densidad de follaje',
            pt: 'Tree cover density',
            id: 'Tree cover density',
            zh: '森林覆盖密度'
          },
          sublabel: {
            en: '(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)',
            fr: '(année 2000, 30m global, Hansen/UMD/Google/USGS/NASA)',
            es: '(2000, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            pt: '(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)',
            id: '(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)',
            zh: '(2000年, 30米 全球覆盖, 汉森/马里兰大学/谷歌/美国地质测量局(USGS)/美国宇航局(NASA))'
          }
        }]
      },
      GROUP_BASEMAP: {
        order: 4,
        label: {
          en: 'Basemap',
          fr: 'Basemap',
          es: 'Basemap',
          pt: 'Basemap',
          id: 'Basemap',
          zh: 'Basemap'
        },
        layers: [{
          id: 'landsat',
          thumbnailUrl: 'http://www.globalforestwatch.org/assets/basemaps-s84b6feb159-b5c7519937c9732128e8b42b5865e7c2.png',
          templateUrl: 'https://wri-tiles.s3.amazonaws.com/umd_landsat/2013/${level}/${row}/${col}.png',
          years: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013'],
          title: {
            en: 'Landsat',
            fr: 'Landsat',
            es: 'Landsat',
            pt: 'Landsat',
            id: 'Landsat',
            zh: 'Landsat'
          }
        }, {
          id: 'wri_mono',
          thumbnailUrl: './css/images/wri_mono.png',
          title: {
            en: 'WRI Mono',
            fr: 'WRI Mono',
            es: 'WRI Mono',
            pt: 'WRI Mono',
            id: 'WRI Mono',
            zh: 'WRI Mono'
          }
        }, {
          id: 'wri_contextual',
          thumbnailUrl: './css/images/wri_contextual.png',
          title: {
            en: 'WRI Contextual',
            fr: 'WRI Contextual',
            es: 'WRI Contextual',
            pt: 'WRI Contextual',
            id: 'WRI Contextual',
            zh: 'WRI Contextual'
          }
        }]
      },
      extraLayers: [{
        id: 'MASK',
        type: 'dynamic',
        url: 'http://gis.forest-atlas.org/arcgis/rest/services/country_masks/country_mask_global/MapServer',
        opacity: 0.35,
        layerIds: [0]
      }, {
        id: 'LEGEND_LAYER',
        type: 'dynamic',
        url: 'http://gis-gfw.wri.org/arcgis/rest/services/legends/MapServer',
        visible: false,
        opacity: 0,
        layerIds: []
      }, {
        id: 'USER_FEATURES',
        type: 'feature',
        definitionExpression: '1 = 2', // show no features from the service ever
        mode: 0, // equals MODE_SNAPSHOT
        url: 'http://gis-gfw.wri.org/arcgis/rest/services/user_features/FeatureServer/1',
        visible: true
      }]
    }
  };
});
