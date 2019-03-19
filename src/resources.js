export default {
  "webmap": "1293b7494e9f41eb9219d8b98b757290",
  "title": "FLUIDS Georgia",
  "subtitle": "",
  "logoUrl": "https://geo.forest-atlas.org/system/site_settings/images/000/000/140/original/mepa.png?1530171023",
  "logoLinkUrl": "https://geo.forest-atlas.org",
  "printServiceUrl": "https://gis.mepa.gov.ge/server/rest/services/PrintService/ExportWebMap/GPServer/Export%20Web%20Map",
  "narrative": "<p> ეს რუკები ასახავს ტყისა და მიწათსარგებლობის დინამიურ ცვლილებებს საქართველოს ტერიტორიაზე. რუკები მომზადდა Global Forest Watch პროექტის ფარგლებში, გარემოს დაცვისა და სოფლის მეურნეობის სამინისტროსა და მსოფლიო რესურსების ინსტიტუტის (WRI) ერთიანი ძალისხმევით, გაეროს გარემოსდაცვითი პროგრამის (UNEP) და მსოფლიო გარემოსდაცვითი ფონდის (GEF) დაფინანსებით.</p><p><i> <a href=http://www.moe.gov.ge/en/home target=_blank>MEPA</a>,<a href=https://www.wri.org target=_blank> WRI</a></i></p>",
  "includeSubscribeButton": true,
  "language": "ka",
  "useAlternativeLanguage": true,
  "alternativeWebmap": "ad6eb30b32014a528423bfc068acebf3",
  "alternativeLanguage": "en",
  "alternativeLanguageTitle": "FLUIDS Georgia",
  "alternativeLanguageSubtitle": "",
  "alternativeNarrative": "<p> These maps represent the dynamics of land and forest use/cover change in the Republic of Georgia. This has been made possible through a partnership between the Ministry of Environment Protection and Agriculture of Georgia (MEPA), supported by the World Resources Institute (WRI) in the framework of Global Forest Watch Project, funded by UNEP and GEF.</p><p><i> <a href=http://www.moe.gov.ge/en/home target=_blank>MEPA</a>,<a href=https://www.wri.org target=_blank> WRI</a></i></p>",
  "alternativeWebmapMenuName": "Land Use",
  "includeDocumentsTab": true,
  "includeMeasurementTab": true,
  "iso": "GEO",
  "intactForests": true,
  "viirsFires": true,
  "modisFires": true,
  "aboveGroundBiomass": false,
  "landCover": true,
  "mangroves": false,
  "sadAlerts": false,
  "gladAlerts": false,
  "terraIAlerts": false,
  "primaryForests": false,
  "forma": false,
  "recentImagery": true,
  "webmapMenuName": "მიწათსარგებლობა",
  "sharinghost": "https://gis.mepa.gov.ge/portal",
  "analyticsCode": "UA-62288390-18",
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
      "ka": "ტყით დაფარული ფართობის შემცირება"
    },
    "title": {
      "en": "Tree cover loss",
      "fr": "Perte en couvert arboré",
      "es": "Pérdida de la cobertura arbórea",
      "pt": "Perda de cobertura arbórea",
      "id": "Tree cover loss",
      "zh": "森林覆盖损失",
      "ka": "ტყით დაფარული ფართობის მატება"
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
    "chartBounds": [2001, 2015],
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
      "bounds": [2001, 2015],
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
  }, {
    "analysisId": "Aspect",
    "label": {
      "en": "Aspect in Forested Areas",
      "ka": "ასპექტი ტყიან ზონებში"
    },
    "title": {
      "en": "Aspect in Forested Areas",
      "ka": "ასპექტი ტყიან ზონებში"
    },
    "description": {
      "en": "Analysis only includes forested areas, and some national parks are excluded from the analysis. To view the areas included in the analysis please view the aspect in forested areas layer",
      "ka": "ანალიზი მოიცავს მარტო ტყიან ტერიტორიებს, ეროვნული პარკების ტერიტორიას არ მოიცავს. იმისათვის რომ ნახოთ თუ რა ტერიტორიებს მოიცავს ანალიზი, გთხოვთ იხილოთ ტყიანი ტერიტორიების ასპექტის ფენა"
    },
    "useGfwWidget": true,
    "widgetId": "b55676be-f167-4fe9-9e82-c9453c807d18",
    "uiParams": "none"
  }, {
    "analysisId": "Elevation",
    "label": {
      "en": "Elevation in Forested Areas",
      "ka": "სიმაღლე ტყიან ზონებში"
    },
    "title": {
      "en": "Elevation in Forested Areas",
      "ka": "სიმაღლე ტყიან ზონებში"
    },
    "description": {
      "en": "Analysis only includes forested areas, and some national parks are excluded from the analysis. To view the areas included in the analysis please view the elevation in forested areas layer",
      "ka": "ანალიზი მოიცავს მარტო ტყიან ტერიტორიებს, ეროვნული პარკების ტერიტორიას არ მოიცავს. იმისათვის რომ ნახოთ თუ რა ტერიტორიებს მოიცავს ანალიზი, გთხოვთ იხილოთ ტყიანი ტერიტორიების სიმაღლის ფენა"
    },
    "useGfwWidget": true,
    "widgetId": "3c82a87b-89d5-4fd7-8f45-0dfe3b7d5eef",
    "uiParams": "none"
  }, {
    "analysisId": "Slope",
    "label": {
      "en": "Slope in Forested Areas",
      "ka": "დაქანება ტყიან ზონებში"
    },
    "title": {
      "en": "Slope in Forested Areas",
      "ka": "დაქანება ტყიან ზონებში"
    },
    "description": {
      "en": "Analysis only includes forested areas, and some national parks are excluded from the analysis. To view the areas included in the analysis please view the slope in forested areas layer",
      "ka": "ანალიზი მოიცავს მარტო ტყიან ტერიტორიებს, ეროვნული პარკების ტერიტორიას არ მოიცავს. იმისათვის რომ ნახოთ თუ რა ტერიტორიებს მოიცავს ანალიზი, გთხოვთ იხილოთ ტყიანი ტერიტორიების დაქანების ფენა"
    },
    "useGfwWidget": true,
    "widgetId": "3f73c030-afa9-4159-b435-09bea84616ad",
    "uiParams": "none"
  }, {
    "analysisId": "Hazard",
    "label": {
      "en": "Forest Hazard Risk Anaylsis",
      "ka": "ტყის საფრთხის რისკის ანალიზი"
    },
    "title": {
      "en": "Forest hazard risk anaylsis",
      "ka": "ტყის საფრთხის რისკის ანალიზი"
    },
    "description": {
      "en": "Analysis only includes forested areas, and some national parks are excluded from the analysis. To view the areas included in the analysis please view the forest hazard risk layer",
      "ka": "ანალიზი მოიცავს მარტო ტყიან ტერიტორიებს, ეროვნული პარკების ტერიტორიას არ მოიცავს. იმისათვის რომ ნახოთ თუ რა ტერიტორიებს მოიცავს ანალიზი, გთხოვთ იხილოთ ტყის საფრთხის რისკის ფენა"
    },
    "useGfwWidget": true,
    "widgetId": "cfc1cc0f-b686-49a0-bd4e-4559dce30e68",
    "uiParams": "none"
  }],
  "layerPanel": {
    "GROUP_WEBMAP": {
      "order": 2,
      "label": {},
      "layers": []
    },
    "GROUP_LCD": {
      "order": 1,
      "label": {
        "en": "Land Cover Dynamics",
        "ka": "მიწის საფარის დინამიკა"
      },
      "layers": [{
        "order": 1,
        "id": "TREE_COVER_LOSS",
        "type": "loss",
        "visible": true,
        "url": "https://storage.googleapis.com/wri-public/Hansen17/tiles/hansen_world/v1/tc30/{z}/{x}/{y}.png",
        "minYear": 1,
        "maxYear": 17,
        "technicalName": "tree_cover_loss",
        "legendLayer": [0],
        "label": {
          "en": "Tree cover loss",
          "ka": "ხის ვარჯის კარგვა"
        },
        "sublabel": {
          "en": "(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)",
          "ka": "(წლიური, 30მ, გლობალური, Hansen/UMD/Google/USGS/NASA)"
        }
      }, {
        "order": 2,
        "type": "remoteDataLayer",
        "id": "TREE_COVER_GAIN",
        "uuid": "cb016f17-f12d-463a-9dc2-aabcf5db566c"
      }, {
        "order": 3,
        "id": "VIIRS_ACTIVE_FIRES",
        "type": "remoteDataLayer",
        "uuid": "f34f3c4e-625c-420f-b95e-48dc3543d34d"
      }, {
        "order": 4,
        "id": "MODIS_ACTIVE_FIRES",
        "type": "remoteDataLayer",
        "uuid": "46608c38-0e34-4b82-899d-ba2977b07271"
      }]
    },
    "GROUP_PA": {
      "order": 3,
      "label": {
        "en": "Protected Areas",
        "ka": "დაცული ტერიტორიები"
      },
      "layers": [{
        "order": 1,
        "id": "PAInf",
        "type": "dynamic",
        "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/protected_areas/MapServer",
        "layerIds": [0],
        "label": {
          "en": "Infrastructure of Protected Areas",
          "ka": "ინფრასტრუქტურა"
        },
        "popup": {
          "title": {
            "en": "Infrastructure of Protected Areas",
            "ka": "ინფრასტრუქტურა"
          },
          "content": {
            "ka": [{
              "label": "დასახელება",
              "fieldExpression": "Name_KA"
            }, {
              "label": "დაცული ტერიტორია",
              "fieldExpression": "Protected_Areas_KA"
            }],
            "en": [{
              "label": "Name",
              "fieldExpression": "Name_EN"
            }, {
              "label": "Protected Area",
              "fieldExpression": "Protected_Areas_EN"
            }]
          }
        }
      }, {
        "order": 2,
        "id": "PARoads",
        "type": "dynamic",
        "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/protected_areas/MapServer",
        "layerIds": [1],
        "label": {
          "en": "Touristic Routes of Protected Areas",
          "ka": "ტურისტული ბილიკები"
        },
        "popup": {
          "title": {
            "en": "Touristic Routes of Protected Areas",
            "ka": "ტურისტული ბილიკები"
          },
          "content": {
            "ka": [{
              "label": "დაცული ტერიტორია",
              "fieldExpression": "დაცული_ტერიტორია"
            }, {
              "label": "ნომერი",
              "fieldExpression": "ნომერი"
            }, {
              "label": "ხანგრძლივობა",
              "fieldExpression": "ხანგრძლივობა"
            }, {
              "label": "სირთულე",
              "fieldExpression": "სირთულე"
            }, {
              "label": "დასახელება ტიპი",
              "fieldExpression": "დასახელება_ტიპი"
            }]
          }
        }
      }, {
        "order": 3,
        "id": "PALease",
        "type": "dynamic",
        "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/protected_areas/MapServer",
        "layerIds": [2],
        "label": {
          "en": "Lease of Protected Areas",
          "ka": "იჯარები"
        },
        "popup": {
          "title": {
            "en": "Protected Area Zoning",
            "ka": "ფუნქციური ზონები"
          },
          "content": {
            "ka": [{
              "label": "დაცული ტერიტორია",
              "fieldExpression": "Protected_areas_KA"
            }, {
              "label": "დანიშნულება",
              "fieldExpression": "Purpose_KA"
            }, {
              "label": "ჰექტარი",
              "fieldExpression": "Hectare_KA"
            }],
            "en": [{
              "label": "Protected Area",
              "fieldExpression": "Protected_Area_EN"
            }, {
              "label": "Purpose",
              "fieldExpression": "Purpose_EN"
            }, {
              "label": "Area (ha)",
              "fieldExpression": "Hectare_KA"
            }]
          }
        }
      }, {
        "order": 4,
        "id": "PAFunction",
        "type": "dynamic",
        "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/protected_areas/MapServer",
        "layerIds": [3],
        "label": {
          "en": "Functional Zoning of Protected Areas",
          "ka": "ფუნქციური ზონები"
        },
        "popup": {
          "title": {
            "en": "Functional Zoning of Protected Areas",
            "ka": "ფუნქციური ზონები"
          },
          "content": {
            "ka": [{
              "label": "დაცული ტერიტორია",
              "fieldExpression": "Protected_areas_KA"
            }, {
              "label": "ზონა",
              "fieldExpression": "Zone_KA"
            }, {
              "label": "ფართობი ჰა",
              "fieldExpression": "PA_Area_ha_KA"
            }],
            "en": [{
              "label": "Protected Area",
              "fieldExpression": "Protected_Areas_EN"
            }, {
              "label": "Zone",
              "fieldExpression": "Zone_EN"
            }, {
              "label": "Area (ha)",
              "fieldExpression": "PA_Area_ha_EN"
            }]
          }
        }
      }, {
        "order": 5,
        "id": "PA",
        "type": "dynamic",
        "visible": true,
        "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/protected_areas/MapServer",
        "layerIds": [4],
        "label": {
          "en": "Protected Areas",
          "ka": "დაცული ტერიტორიები"
        },
        "popup": {
          "title": {
            "en": "Protected Areas",
            "ka": "კატეგორიები"
          },
          "content": {
            "ka": [{
              "label": "დაცული ტერიტორია",
              "fieldExpression": "Protected_Areas_KA"
            }, {
              "label": "დაარსების წელი",
              "fieldExpression": "Year_of_Establishment_KA"
            }, {
              "label": "ადმინისტრაცია",
              "fieldExpression": "Administration_KA"
            }, {
              "label": "კატეგორია",
              "fieldExpression": "Category_KA"
            }, {
              "label": "ფართობი ჰა",
              "fieldExpression": "PA_Area_ha_KA"
            }],
            "en": [{
              "label": "Protected Area Name",
              "fieldExpression": "Protected_Areas_EN"
            }, {
              "label": "Year of Establishment",
              "fieldExpression": "Year_of_Establishment_EN"
            }, {
              "label": "Administration",
              "fieldExpression": "Administration_EN"
            }, {
              "label": "Category",
              "fieldExpression": "Category_EN"
            }, {
              "label": "Area (ha)",
              "fieldExpression": "PA_Area_ha_EN"
            }]
          }
        }
      }]
    },
    "GROUP_Hazards": {
      "order": 6,
      "groupType": "radio",
      "label": {
        "en": "Hazards",
        "ka": "საფრთხეები"
      },
      "layers": [{
        "order": 1,
        "id": "ForestHazard",
        "type": "dynamic",
        "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/Hazards/MapServer/",
        "layerIds": [0],
        "opacity": 0.75,
        "label": {
          "en": "Forest General Hazard Risk",
          "ka": "ბუნებრივი კატასტროფები ტყით დაფარულ ტერიტორიებზე"
        }
      }, {
        "order": 2,
        "id": "Elevation",
        "type": "dynamic",
        "opacity": 0.8,
        "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/Hazards_Raster/MapServer",
        "layerIds": [1],
        "label": {
          "en": "Elevation in Forested Areas",
          "ka": "სიმაღლე ტყიან ზონებში"
        }
      }, {
        "order": 3,
        "id": "Slope",
        "type": "dynamic",
        "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/Hazards_Raster/MapServer",
        "layerIds": [0],
        "opacity": 0.8,
        "label": {
          "en": "Slope in Forested Areas",
          "ka": "დაქანება ტყიან ზონებში"
        }
      }, {
        "order": 4,
        "id": "Aspect",
        "type": "dynamic",
        "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/Hazards_Raster/MapServer",
        "layerIds": [2],
        "opacity": 0.8,
        "label": {
          "en": "Aspect in Forested Areas",
          "ka": "ასპექტი ტყიან ზონებში"
        }
      }, {
        "order": 5,
        "id": "Landslide",
        "type": "dynamic",
        "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/Hazards/MapServer/",
        "layerIds": [1],
        "opacity": 0.60,
        "label": {
          "en": "Landslide Zoning",
          "ka": "ბუნებრივი კატასტროფები"
        },
        "popup": {
          "title": {
            "en": "Protected Areas",
            "ka": "კატეგორიები"
          },
          "content": {
            "ka": [{
              "label": "კატეგორია",
              "fieldExpression": "Category_KA"
            }, {
              "label": "ფართობი ჰა",
              "fieldExpression": "Area_ha_KA"
            }],
            "en": [{
              "label": "Category",
              "fieldExpression": "Category_EN"
            }, {
              "label": "Area ha",
              "fieldExpression": "Area_ha_EN"
            }]
          }
        }
      }, {
        "order": 6,
        "id": "Debrisflow",
        "type": "dynamic",
        "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/Hazards/MapServer/",
        "layerIds": [2],
        "opacity": 0.60,
        "label": {
          "en": "Debrisflow Zoning",
          "ka": "რისკის ზონები"
        },
        "popup": {
          "title": {
            "en": "Protected Areas",
            "ka": "კატეგორიები"
          },
          "content": {
            "ka": [{
              "label": "კატეგორია",
              "fieldExpression": "Category_KA"
            }, {
              "label": "ფართობი ჰა",
              "fieldExpression": "Area_ha_KA"
            }],
            "en": [{
              "label": "Category",
              "fieldExpression": "Category_EN"
            }, {
              "label": "Area ha",
              "fieldExpression": "Area_ha_EN"
            }]
          }
        }
      }]
    },
    "GROUP_Bio": {
      "order": 4,
      "label": {
        "en": "Biodiversity",
        "ka": "ბიომრავალფეროვნება"
      },
      "layers": [{
        "order": 1,
        "id": "Woodlands",
        "type": "dynamic",
        "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/Biodiversity/MapServer",
        "layerIds": [0],
        "label": {
          "en": "Habitats",
          "ka": "ჰაბიტატები"
        },
        "popup": {
          "title": {
            "en": "Habitats",
            "ka": "ჰაბიტატები"
          },
          "content": {
            "ka": [{
              "label": "ჰაბიტატი",
              "fieldExpression": "Habitat_KA"
            }, {
              "label": "EUNIS კოდი",
              "fieldExpression": "EUNIS_code_KA"
            }],
            "en": [{
              "label": "Habitat",
              "fieldExpression": "Habitat_EN"
            }, {
              "label": "EUNIS code",
              "fieldExpression": "EUNIS_code_EN"
            }]
          }
        }
      }, {
        "order": 2,
        "id": "Habitats",
        "type": "dynamic",
        "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/Biodiversity/MapServer",
        "layerIds": [1],
        "label": {
          "en": "Habitats",
          "ka": "ჰაბიტატები"
        },
        "popup": {
          "title": {
            "en": "Habitats",
            "ka": "ჰაბიტატები"
          },
          "content": {
            "ka": [{
              "label": "ჰაბიტატი",
              "fieldExpression": "Habitat_KA"
            }, {
              "label": "EUNIS კოდი",
              "fieldExpression": "EUNIS_code_KA"
            }, {
              "label": "ფართობი ჰა",
              "fieldExpression": "Area_ha_KA"
            }],
            "en": [{
              "label": "Habitat",
              "fieldExpression": "Habitat_EN"
            }, {
              "label": "EUNIS code",
              "fieldExpression": "EUNIS_code_EN"
            }, {
              "label": "Area ha",
              "fieldExpression": "Area_ha_EN"
            }]
          }
        }
      }, {
        "order": 3,
        "id": "EmeraldNetwork",
        "type": "dynamic",
        "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/Biodiversity/MapServer",
        "layerIds": [2],
        "label": {
          "en": "Emerald Network",
          "ka": "ზურმუხტის ქსელი"
        },
        "popup": {
          "title": {
            "en": "Emerald Network",
            "ka": "ზურმუხტის ქსელი"
          },
          "content": {
            "ka": [{
              "label": "სტატუსი",
              "fieldExpression": "Status_KA"
            }, {
              "label": "საიტის კოდი",
              "fieldExpression": "Sitecode_KA"
            }, {
              "label": "ფართობი ჰა",
              "fieldExpression": "Area_ha_KA"
            }],
            "en": [{
              "label": "Status",
              "fieldExpression": "Status_EN"
            }, {
              "label": "Sitecode",
              "fieldExpression": "Sitecode_EN"
            }, {
              "label": "Area ha",
              "fieldExpression": "Area_ha_EN"
            }]
          }
        }
      }]
    },
    "GROUP_LC": {
      "order": 5,
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
        "id": "IFL",
        "type": "remoteDataLayer",
        "uuid": "5f815a7d-457e-4eae-a8e5-8864a60696ad"
      }, {
        "order": 2,
        "id": "LAND_COVER",
        "type": "remoteDataLayer",
        "uuid": "b8d3f175-0565-443f-839a-49eb890a4b3d"
      }, {
        "order": 3,
        "id": "TREE_COVER",
        "type": "remoteDataLayer",
        "uuid": "2569adca-ef87-42c4-a153-57c5e8ba0ef7"
      }, {
        "order": 4,
        "id": "GEOFC",
        "type": "dynamic",
        "url": "https://gis.mepa.gov.ge/server/rest/services/atlas/Land_Cover/MapServer/",
        "layerIds": [0],
        "label": {
          "en": "Forest Cover",
          "ka": "ტყის საფარი"
        },
        "sublabel": {
          "en": "GIZ, 2015",
          "ka": "GIZ, 2015"
        }
      }]
    },
    "GROUP_IMAGERY": {
      "groupType": "imagery",
      "order": 7,
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
      "order": 8,
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
      "visible": true,
      "opacity": 0,
      "layerIds": []
    }, {
      "id": "USER_FEATURES",
      "type": "graphic",
      "visible": true
    }]
  }
};
