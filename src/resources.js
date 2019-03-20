export default {
  "webmap": "6142e76453354c0b83633370e6a6f006",
  "title": "Atlas Forestier du Cameroun",
  "subtitle": "Ministère des Forêts et de la Faune",
  "webmapMenuName": "Affectation des Terres",
  "logoUrl": "https://cmr.forest-atlas.org/system/site_settings/images/000/000/094/original/CAMEROON.png?1487267590",
  "logoLinkUrl": "http://www.minfof.cm/",
  "printServiceUrl": "https://gis.forest-atlas.org/server/rest/services/print/ExportWebMap/GPServer/Export%20Web%20Map",
  "narrative": "<p>Ce thème présente la situation générale de l\'affectation des terres au Cameroun. Sont représentés : les permis minier (d\'exploitation et de recherche), les zones d\'intérêt cynégétique, les ventes de coupe, les forêts de production (UFA et forêt communale), les forêts communautaires, les aires protégées, les réserves forestières et les plantations agro industrielle.</p>",
  "includeSubscribeButton": false,
  "language": "fr",
  "useAlternativeLanguage": true,
  "alternativeWebmap": "b96ee7fcd75e405dbf9a8b5a44ae734a",
  "alternativeLanguage": "en",
  "alternativeLanguageTitle": "Forest Atlas of Cameroon",
  "alternativeLanguageSubtitle": "Ministry of Forest and Wildlife",
  "alternativeNarrative": "<p>This map show the general land use allocation in Cameroon. It includes mining permits, hunting zones, various forest titles as well as agro-industrial plantations</p>",
  "alternativeWebmapMenuName": "Land Use",
  "includeDocumentsTab": true,
  "includeMeasurementTab": true,
  "iso": "CMR",
  "viirsFires": true,
  "modisFires": true,
  "intactForests": true,
  "primaryForests": false,
  "forma": true,
  "intactForests": true,
  "aboveGroundBiomass": true,
  "landCover": true,
  "mangroves": false,
  "sadAlerts": false,
  "gladAlerts": true,
  "terraIAlerts": true,
  "recentImagery": true,
  "sharinghost": "https://www.arcgis.com",
  "analyticsCode": "UA-62288390-1",
  "analysisModules": [{
    "analysisId": "TC_LOSS_GAIN",
    "label": {
      "en": "Total tree cover loss/ gain",
      "fr": "Total perte/ gain en couvert arboré",
      "es": "Pérdida/ Aumento de la cobertura arbórea",
      "pt": "Perda/ Ganho de cobertura arbórea",
      "id": "Total tree cover loss/ gain",
      "zh": "森林覆盖损失/ 森林覆盖增加",
      "ka": "ხის ვარჯის კარგვა/ ნამატი"
    },
    "title": {
      "en": "Forest Loss Analysis",
      "fr": "Forest Loss Analysis",
      "es": "Forest Loss Analysis",
      "pt": "Forest Loss Analysis",
      "id": "Forest Loss Analysis",
      "zh": "Forest Loss Analysis",
      "ka": "Forest Loss Analysis"
    },
    "description": {
      "en": "Select range and tree cover density then click the run analysis button to see results",
      "fr": "Select range and tree cover density then click the run analysis button to see results",
      "es": "Select range and tree cover density then click the run analysis button to see results",
      "pt": "Select range and tree cover density then click the run analysis button to see results",
      "id": "Select range and tree cover density then click the run analysis button to see results",
      "zh": "Select range and tree cover density then click the run analysis button to see results",
      "ka": "Select range and tree cover density then click the run analysis button to see results"
    },
    "chartType": "badge",
    "valueAttribute": "data.attributes.loss",
    "analysisUrl": "https://production-api.globalforestwatch.org/v1/umd-loss-gain",
    "uiParams": [{
      "inputType": "rangeSlider",
      "startParamName": "period",
      "combineParams": true,
      "valueSeparator": ",",
      "bounds": [2001, 2017],
      "valueType": "date",
      "label": {
        "en": "Select range for analysis",
        "fr": "Select range for analysis",
        "es": "Select range for analysis",
        "pt": "Select range for analysis",
        "id": "Select range for analysis",
        "zh": "Select range for analysis",
        "ka": "Select range for analysis"
      }
    }, {
      "name": "thresh",
      "inputType": "tcd",
      "label": {
        "en": "Select tree cover density: ",
        "fr": "Select tree cover density: ",
        "es": "Select tree cover density: ",
        "pt": "Select tree cover density: ",
        "id": "Select tree cover density: ",
        "zh": "Select tree cover density: ",
        "ka": "Select tree cover density: "
      }
    }]
  }, {
    "analysisId": "TC_LOSS",
    "label": {
      "en": "Tree cover loss",
      "fr": "Perte en couvert arboré",
      "es": "Pérdida de la cobertura arbórea",
      "pt": "Perda de cobertura arbórea",
      "id": "Tree cover loss",
      "zh": "森林覆盖损失",
      "ka": "ხის ვარჯის კარგვა"
    },
    "title": {
      "en": "Tree cover loss",
      "fr": "Perte en couvert arboré",
      "es": "Pérdida de la cobertura arbórea",
      "pt": "Perda de cobertura arbórea",
      "id": "Tree cover loss",
      "zh": "森林覆盖损失",
      "ka": "ხის ვარჯის კარგვა"
    },
    "description": {
      "en": "Select range and tree cover density then click the run analysis button to see results",
      "fr": "Select range and tree cover density then click the run analysis button to see results",
      "es": "Select range and tree cover density then click the run analysis button to see results",
      "pt": "Select range and tree cover density then click the run analysis button to see results",
      "id": "Select range and tree cover density then click the run analysis button to see results",
      "zh": "Select range and tree cover density then click the run analysis button to see results",
      "ka": "Select range and tree cover density then click the run analysis button to see results"
    },
    "chartType": "bar",
    "chartBounds": [2001, 2017],
    "analysisUrl": "https://production-api.globalforestwatch.org/v1/umd-loss-gain",
    "uiParams": [{
      "inputType": "rangeSlider",
      "startParamName": "period",
      "combineParams": true,
      "valueSeparator": ",",
      "bounds": [2001, 2017],
      "valueType": "date",
      "label": {
        "en": "Select range for analysis",
        "fr": "Select range for analysis",
        "es": "Select range for analysis",
        "pt": "Select range for analysis",
        "id": "Select range for analysis",
        "zh": "Select range for analysis",
        "ka": "Select range for analysis"
      }
    }, {
      "name": "thresh",
      "inputType": "tcd",
      "label": {
        "en": "Select tree cover density: ",
        "fr": "Select tree cover density: ",
        "es": "Select tree cover density: ",
        "pt": "Select tree cover density: ",
        "id": "Select tree cover density: ",
        "zh": "Select tree cover density: ",
        "ka": "Select tree cover density: "
      }
    }],
    "params": [{
      "name": "aggregate_values",
      "value": "false"
    }]
  }, {
    "analysisId": "BIO_LOSS",
    "label": {
      "en": "Aboveground Live Woody Biomass Density",
      "fr": "Densité de la biomasse aérienne vivante",
      "es": "Densidad de la biomasa viva en la superficie del suelo",
      "pt": "Densidade de biomassa viva acima do solo",
      "id": "Aboveground Live Woody Biomass Density",
      "zh": "Aboveground Live Woody Biomass Density",
      "ka": "მიწისზედა ცოცხალი ტყის ბიომასის სიხშირე"
    },
    "title": {
      "en": "Aboveground Live Woody Biomass Density",
      "fr": "Densité de la biomasse aérienne vivante",
      "es": "Densidad de la biomasa viva en la superficie del suelo",
      "pt": "Densidade de biomassa viva acima do solo",
      "id": "Aboveground Live Woody Biomass Density",
      "zh": "Aboveground Live Woody Biomass Density",
      "ka": "მიწისზედა ცოცხალი ტყის ბიომასის სიხშირე"
    },
    "chartType": "biomassLoss",
    "colors": {
      "loss": "#FF6699",
      "carbon": "#BEBCC2"
    },
    "analysisUrl": "https://production-api.globalforestwatch.org/v1/biomass-loss",
    "uiParams": [{
      "inputType": "rangeSlider",
      "startParamName": "period",
      "combineParams": true,
      "valueSeparator": ",",
      "bounds": [2001, 2014],
      "valueType": "date",
      "label": {
        "en": "Select range for analysis",
        "fr": "Select range for analysis",
        "es": "Select range for analysis",
        "pt": "Select range for analysis",
        "id": "Select range for analysis",
        "zh": "Select range for analysis",
        "ka": "Select range for analysis"
      }
    }, {
      "name": "thresh",
      "inputType": "tcd",
      "label": {
        "en": "Select tree cover density: ",
        "fr": "Select tree cover density: ",
        "es": "Select tree cover density: ",
        "pt": "Select tree cover density: ",
        "id": "Select tree cover density: ",
        "zh": "Select tree cover density: ",
        "ka": "Select tree cover density: "
      }
    }]
  }, {
    "analysisId": "IFL",
    "label": {
      "en": "Intact Forest Landscape",
      "fr": "Paysage forestier intact",
      "es": "Paisajes Forestales Intactos",
      "pt": "Paisagens Florestais Intactas",
      "id": "Intact Forest Landscape",
      "zh": "原生森林景观",
      "ka": "ხელუხლებელი ტყის ლანდშაფტი"
    },
    "chartType": "bar",
    "chartBounds": [2001, 2017],
    "colors": ["#186513"],
    "analysisUrl": "https://production-api.globalforestwatch.org/v1/loss-by-landcover",
    "params": [{
      "name": "layer",
      "value": "ifl2000"
    }],
    "uiParams": [{
      "inputType": "rangeSlider",
      "startParamName": "period",
      "combineParams": true,
      "valueSeparator": ",",
      "bounds": [2001, 2017],
      "valueType": "date",
      "label": {
        "en": "Select range for analysis",
        "fr": "Select range for analysis",
        "es": "Select range for analysis",
        "pt": "Select range for analysis",
        "id": "Select range for analysis",
        "zh": "Select range for analysis",
        "ka": "Select range for analysis"
      }
    }, {
      "name": "thresh",
      "inputType": "tcd",
      "label": {
        "en": "Select tree cover density: ",
        "fr": "Select tree cover density: ",
        "es": "Select tree cover density: ",
        "pt": "Select tree cover density: ",
        "id": "Select tree cover density: ",
        "zh": "Select tree cover density: ",
        "ka": "Select tree cover density: "
      }
    }]
  }, {
    "analysisId": "GLAD_ALERTS",
    "label": {
      "en": "GLAD Alerts",
      "fr": "Alertes GLAD",
      "es": "Alertas GLAD",
      "pt": "Alertas GLAD",
      "id": "GLAD Alerts",
      "zh": "GLAD Alerts",
      "ka": "GLAD შეტყობინებები"
    },
    "title": {
      "en": "GLAD Alerts",
      "fr": "Alertes GLAD",
      "es": "Alertas GLAD",
      "pt": "Alertas GLAD",
      "id": "GLAD Alerts",
      "zh": "GLAD Alerts",
      "ka": "GLAD შეტყობინებები"
    },
    "chartType": "timeSeries",
    "analysisUrl": "https://production-api.globalforestwatch.org/v1/glad-alerts",
    "uiParams": [{
      "inputType": "datepicker",
      "startParamName": "period",
      "combineParams": true,
      "valueSeparator": ",",
      "multi": true,
      "defaultStartDate": "2016-01-01",
      "minDate": "2015-01-01",
      "label": {
        "en": "Select range for analysis",
        "fr": "Select range for analysis",
        "es": "Select range for analysis",
        "pt": "Select range for analysis",
        "id": "Select range for analysis",
        "zh": "Select range for analysis",
        "ka": "Select range for analysis"
      }
    }],
    "params": [{
      "name": "aggregate_values",
      "value": "true"
    }, {
      "name": "aggregate_by",
      "value": "day"
    }]
  }, {
    "analysisId": "TERRAI_ALERTS",
    "label": {
      "en": "Terra-I Alerts",
      "fr": "Alertes Terra-I",
      "es": "Alertas Terra-I",
      "pt": "Alertas Terra-I",
      "id": "Terra-I Alerts",
      "zh": "Terra-I Alerts",
      "ka": "Terra-I შეტყობინებები"
    },
    "chartType": "timeSeries",
    "analysisUrl": "https://production-api.globalforestwatch.org/v1/terrai-alerts",
    "uiParams": [{
      "inputType": "datepicker",
      "startParamName": "period",
      "combineParams": true,
      "valueSeparator": ",",
      "multi": true,
      "defaultStartDate": "2006-06-20",
      "minDate": "2004-01-01",
      "maxDate": "2016-07-12",
      "label": {
        "en": "Select date(s) for analysis",
        "fr": "Select date(s) for analysis",
        "es": "Select date(s) for analysis",
        "pt": "Select date(s) for analysis",
        "id": "Select date(s) for analysis",
        "zh": "Select date(s) for analysis",
        "ka": "Select date(s) for analysis"
      }
    }],
    "params": [{
      "name": "aggregate_values",
      "value": "true"
    }, {
      "name": "aggregate_by",
      "value": "day"
    }]
  }, {
    "analysisId": "VIIRS_FIRES",
    "label": {
      "en": "VIIRS Active Fires",
      "fr": "Feux actifs VIIRS",
      "es": "Incendios activos VIIRS",
      "pt": "Incêndios ativos VIIRS",
      "id": "VIIRS Active fires",
      "zh": "活跃火点 VIIRS",
      "ka": "VIIRS აქტიური ხანძრები"
    },
    "chartType": "badge",
    "valueAttribute": "data.attributes.value",
    "badgeLabel": {
      "en": "Active Fires",
      "fr": "Feux actifs",
      "es": "Incendios activos",
      "pt": "Incêndios ativos",
      "id": "Active fires",
      "zh": "活跃火点",
      "ka": "აქტიური ხანძრები"
    },
    "color": "#5ea1ed",
    "analysisUrl": "https://production-api.globalforestwatch.org/v1/viirs-active-fires",
    "uiParams": [{
      "inputType": "datepicker",
      "startParamName": "period",
      "combineParams": true,
      "valueSeparator": ",",
      "multi": true,
      "minDate": "2004-01-01",
      "label": {
        "en": "Select date(s) for analysis",
        "fr": "Select date(s) for analysis",
        "es": "Select date(s) for analysis",
        "pt": "Select date(s) for analysis",
        "id": "Select date(s) for analysis",
        "zh": "Select date(s) for analysis",
        "ka": "Select date(s) for analysis"
      }
    }]
  }, {
    "analysisId": "LCC",
    "label": {
      "en": "Land Cover Composition",
      "fr": "Couverture des sols",
      "es": "Cobertura terrestre",
      "pt": "Cobertura do Solo",
      "id": "Land Cover",
      "zh": "土地覆盖",
      "ka": "მიწის საფარი"
    },
    "title": {
      "en": "Land Cover Composition",
      "fr": "Couverture des sols",
      "es": "Cobertura terrestre",
      "pt": "Cobertura do Solo",
      "id": "Land Cover",
      "zh": "土地覆盖",
      "ka": "მიწის საფარი"
    },
    "description": {
      "en": "Land cover data is from 2015 and provided by the European Space Agency (ESA), the data was reclassified according to IPCC categories. ",
      "fr": "Land cover data is from 2015 and provided by the European Space Agency (ESA), the data was reclassified according to IPCC categories. ",
      "es": "Land cover data is from 2015 and provided by the European Space Agency (ESA), the data was reclassified according to IPCC categories. ",
      "pt": "Land cover data is from 2015 and provided by the European Space Agency (ESA), the data was reclassified according to IPCC categories. ",
      "id": "Land cover data is from 2015 and provided by the European Space Agency (ESA), the data was reclassified according to IPCC categories. ",
      "zh": "Land cover data is from 2015 and provided by the European Space Agency (ESA), the data was reclassified according to IPCC categories. ",
      "ka": "Land cover data is from 2015 and provided by the European Space Agency (ESA), the data was reclassified according to IPCC categories. "
    },
    "useGfwWidget": true,
    "widgetId": "f4e138a2-98f9-4f1a-9f12-a93e4e05e7c2",
    "uiParams": "none",
    "params": [{
      "name": "layer",
      "value": "gfw-landcover-2015"
    }]
  }],
  "layerPanel": {
    "GROUP_WEBMAP": {
      "order": 2,
      "label": {},
      "layers": []
    },
    "GROUP_LCD": {
      "grouptype": "default",
      "order": 1,
      "label": {
        "en": "Land Cover Dynamics",
        "fr": "Evolution de la couverture des sols",
        "es": "Dinámica de la Cobertura del Suelo",
        "pt": "Dinâmica de cobertura da terra",
        "id": "Land Cover Dynamics",
        "zh": "土地覆盖动态数据",
        "ka": "მიწის საფარის დინამიკა"
      },
      "layers": [{
        "order": 1,
        "id": "TREE_COVER_LOSS",
        "type": "remoteDataLayer",
        "uuid": "0721f089-b887-4d49-bad3-4b19261de208"
      }, {
        "order": 2,
        "type": "remoteDataLayer",
        "id": "TREE_COVER_GAIN",
        "uuid": "cb016f17-f12d-463a-9dc2-aabcf5db566c"
      }, {
        "order": 3,
        "type": "remoteDataLayer",
        "id": "IMAZON_SAD",
        "uuid": "3e9e86ae-e38d-4c59-8484-c8214ca5186a"
      }, {
        "order": 4,
        "id": "GLAD_ALERTS",
        "type": "remoteDataLayer",
        "uuid": "356f862b-3e70-493a-997b-dc2a193410e9"
      }, {
        "order": 5,
        "id": "FORMA_ALERTS",
        "type": "remoteDataLayer",
        "uuid": "56aa7e57-0ac4-446c-a82d-7713904b17c3"
      }, {
        "order": 6,
        "id": "TERRA_I_ALERTS",
        "type": "remoteDataLayer",
        "uuid": "1fc7b0c5-259a-4685-8665-b2f1ed3f808f"
      }, {
        "order": 7,
        "id": "VIIRS_ACTIVE_FIRES",
        "type": "remoteDataLayer",
        "uuid": "f34f3c4e-625c-420f-b95e-48dc3543d34d"
      }, {
        "order": 8,
        "id": "MODIS_ACTIVE_FIRES",
        "type": "remoteDataLayer",
        "uuid": "46608c38-0e34-4b82-899d-ba2977b07271"
      }]
    },
    "GROUP_LC": {
      "groupttype": "default",
      "order": 3,
      "label": {
        "en": "Land Cover",
        "fr": "Couverture des sols",
        "es": "Cobertura terrestre",
        "pt": "Cobertura do Solo",
        "id": "Land Cover",
        "zh": "土地覆盖",
        "ka": "მიწის საფარი"
      },
      "layers": [{
        "order": 1,
        "id": "GLOB_MANGROVE",
        "type": "remoteDataLayer",
        "uuid": "533cbe18-22a6-46ac-99ca-027c96f33ac3"
      }, {
        "order": 2,
        "id": "IFL",
        "type": "remoteDataLayer",
        "uuid": "5f815a7d-457e-4eae-a8e5-8864a60696ad"
      }, {
        "order": 3,
        "id": "PRIMARY_FORESTS",
        "type": "remoteDataLayer",
        "uuid": "d3fd9685-6fb6-4f2f-afe1-d53dde7248e5"
      }, {
        "order": 4,
        "id": "AG_BIOMASS",
        "type": "remoteDataLayer",
        "uuid": "04526d47-f3f5-4f76-a939-e5f7861fd085"
      }, {
        "order": 5,
        "id": "LAND_COVER",
        "type": "remoteDataLayer",
        "uuid": "b8d3f175-0565-443f-839a-49eb890a4b3d"
      }, {
        "order": 6,
        "id": "TREE_COVER",
        "type": "remoteDataLayer",
        "uuid": "2569adca-ef87-42c4-a153-57c5e8ba0ef7"
      }]
    },
    "GROUP_IMAGERY": {
      "grouptype": "imagery",
      "order": 4,
      "label": {
        "en": "Recent Imagery",
        "fr": "Recent Imagery",
        "es": "Recent Imagery",
        "pt": "Recent Imagery",
        "id": "Recent Imagery",
        "zh": "Recent Imagery",
        "ka": "Recent Imagery"
      },
      "layers": [{
        "order": 1,
        "id": "RECENT_IMAGERY",
        "type": "imagery",
        "technicalName": "recent_satellite_imagery",
        "visible": false,
        "label": {
          "en": "Recent Imagery",
          "fr": "Recent Imagery",
          "es": "Recent Imagery",
          "pt": "Recent Imagery",
          "id": "Recent Imagery",
          "zh": "Recent Imagery",
          "ka": "Recent Imagery"
        },
        "dynamicSublabel": {
          "en": "({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})",
          "fr": "({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})",
          "es": "({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})",
          "pt": "({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})",
          "id": "({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})",
          "zh": "({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})",
          "ka": "({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})"
        }
      }]
    },
    "GROUP_BASEMAP": {
      "groupType": "basemap",
      "order": 6,
      "label": {
        "en": "Basemap",
        "fr": "Basemap",
        "es": "Basemap",
        "pt": "Basemap",
        "id": "Basemap",
        "zh": "Basemap",
        "ka": "საბაზო რუკა"
      },
      "layers": [{
        "id": "landsat",
        "thumbnailUrl": "https://my.gfw-mapbuilder.org/img/basemaps-sdd18a411a3-5bf18f445e58b8766f773184b7741c67.png",
        "templateUrl": "https://d2h71bpqsyf4vw.cloudfront.net/2016/${level}/${col}/${row}.png",
        "years": ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"],
        "title": {
          "en": "Landsat",
          "fr": "Landsat",
          "es": "Landsat",
          "pt": "Landsat",
          "id": "Landsat",
          "zh": "Landsat",
          "ka": "Landsat"
        }
      }, {
        "id": "wri_mono",
        "thumbnailUrl": "https://my.gfw-mapbuilder.org/img/wri_mono.png",
        "title": {
          "en": "WRI Mono",
          "fr": "WRI Mono",
          "es": "WRI Mono",
          "pt": "WRI Mono",
          "id": "WRI Mono",
          "zh": "WRI Mono",
          "ka": "WRI Mono"
        }
      }, {
        "id": "wri_contextual",
        "thumbnailUrl": "https://my.gfw-mapbuilder.org/img/wri_contextual.png",
        "title": {
          "en": "WRI Contextual",
          "fr": "WRI Contextual",
          "es": "WRI Contextual",
          "pt": "WRI Contextual",
          "id": "WRI Contextual",
          "zh": "WRI Contextual",
          "ka": "WRI Contextual"
        }
      }]
    },
    "extraLayers": [{
      "id": "MASK",
      "type": "dynamic",
      "order": 10000,
      "url": "https://gis.forest-atlas.org/server/rest/services/country_masks/country_mask_global/MapServer",
      "opacity": 0.35,
      "layerIds": [0]
    }, {
      "id": "LEGEND_LAYER",
      "type": "dynamic",
      "url": "https://gis-gfw.wri.org/arcgis/rest/services/legends/MapServer",
      "visible": false,
      "opacity": 0,
      "layerIds": []
    }, {
      "id": "USER_FEATURES",
      "type": "graphic",
      "visible": true
    }]
  }
};
