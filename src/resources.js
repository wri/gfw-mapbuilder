export default {
	//- NOTE: New Forest Atlas 2.0 Options, These are the raw values coming from ArcGIS Online from
	//- General Settings
	// webmap to use for testing metadata.xml fetching/parsing - 4d426ef4be0f483e9dab047fbb4c6718
	// webmap to use for testing document attachments - b514d31339954ba9a0c5822135bc2001
	// webmap to use for testing time enabled layers - 9416e5b5beea4d329dbbfdc3312d2c35
	// webmap to use for deployment, this should be the default - de85e3fcc07948238aa6c1afd2a4ceb0
	webmap: 'de85e3fcc07948238aa6c1afd2a4ceb0',
	title: 'GFW Mapbuilder',
	subtitle: 'Make maps that matter',
	logoUrl: 'https://my.gfw-mapbuilder.org/img/gfw-logo.png',
	logoLinkUrl: 'https://www.gfw-mapbuilder.org/',
	aboutLinkUrl: '', // http://www.gfw-mapbuilder.org/
	downloadLinkUrl: '', // http://data.globalforestwatch.org/
	printServiceUrl: 'https://gis.forest-atlas.org/server/rest/services/print/ExportWebMap/GPServer/Export%20Web%20Map',
	maskServiceUrl: '', // e.g. http://gis-forest-atlas.wri.org/arcgis/rest/services/CMR/CMR_00_Africa/MapServer
	mapThemeIds: '', // e.g. 1c38ba1095fe49e3ba234bf9105c1077;c76d788b7487476bae4d09a4e933be19
	mapThemes: '', // e.g. Forest Atlas of Cameroon;Forest Atlas of Equatorial Guinea
	narrative: '',
	hideHeader: false,
	hideFooter: false,
	includeMyGFWLogin: true,
	navLinksInNewTab: false,
	customColorTheme: '#17eae7',
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
	initialExtent: {
	  x: null, // -122.3,
	  y: null, // 47.6,
	  z: null, // 9,
	},
	//- Tab Settings
	includeDocumentsTab: false,
	includeMeasurementTab: false,
	//- Layers/Analysis Settings
	iso: '',
	viirsFires: true,
	modisFires: true,
	intactForests: true,
	primaryForests: true,
	forma: false,
	aboveGroundBiomass: true,
	landCover: true,
	mangroves: false,
	sadAlerts: true,
	gladAlerts: true,
	terraIAlerts: true,
	recentImagery: true,
	webmapMenuName: 'Land Use',
	// DO NOT MODIFY SHARINGHOST unless you are configuring this for a Portal Environment
	sharinghost: 'https://www.arcgis.com',
	analyticsCode: '',
	includeCartoTemplateLayers: false,
	cartoUser: 'wri-01',
	cartoTemplateId: 'tpl_07c315f8_c13e_11e4_b457_0e8dde98a187',
	cartoApiKey: 'your key here',
	cartoGroupLabel: {
	  en: 'Carto Layers',
	  fr: 'Carto Layers',
	},
  
	/**
	 * Custom Analysis Module Configuration
	 * This section provides the opportunity to define additional custom analysis modules.
	 * The modules are dependent on gfw widgets registered to the GFW API, so if you would
	 * like to define a custom module, you must first create a widget and register it.
	 *
	 * (we probably will NOT use the value property. we will just loop through all analysisModules
	 * and create a dropdown option for each if they have all of the required properties. maybe they have an order to sort them? This also
	 * means that all of the standard analyses will get their own entry in this array.)
	 * @property {string} value - a unique value for this analysis module
	 * @property {string} label - the label for the analysis in the dropdown
	 * @property {string} group - what group this analysis belongs to (maybe this is how we can differentiate
	 * the 'standard' analyses any thing with group 'standard' will not be required to have a widget
	 * until we get widgets for all of them)
	 * @property {string} widgetId - the widgetId from the gfw-api
	 * @property {string} queryUrl - the url to query for the analysis data
	 * @property {object[]} params - any params to pass along with the query url
	 * @property {string} params[].key - query param key
	 * @property {string} params[].value - query param value
	 *
	 * (geostore is automatically appended with each request)
	 */
	analysisModules: [{
		analysisId: 'TC_LOSS_GAIN',
		chartType: 'badge',
		label: {
		  en: 'Total tree cover loss/ gain',
		  fr: 'Perte/gain total de la couverture arborée',
		  es: 'Pérdida/ganancia de cobertura arbórea total',
		  pt: 'Perda/ganho total de cobertura arbórea',
		  id: 'Total kehilangan/perolehan tutupan pohon ',
		  zh: '总森林覆盖减少/增加面积量',
		  ka: 'ხის ვარჯის საერთო კარგვა / მატება'
		},
		"title": {
		  "en": "Land use-land cover in areas with combined potential"
		},
		"description": {
		  "en": "Note: The boundaries of large areas of interest are simplified to enhance calculation performance. Area statistics were rounded down to the nearest hundred."
		},
		"chartType": "bar",
		"useGfwWidget": true,
		"widgetId": "22aeebf0-d82c-4656-9cbe-6f1ac62c9006",
		"uiParams": "none"
	  },
	  {
		"analysisId": "VEGA_RESTORATION_SLOPE",
		"chartType": "badge",
		"label": {
		  "en": "Slope in areas with combined potential"
		},
		"title": {
		  "en": "Slope in areas with combined potential"
		},
		"description": {
		  "en": "Note: The boundaries of large areas of interest are simplified to enhance calculation performance. Area statistics were rounded down to the nearest hundred."
		},
		"chartType": "bar",
		"useGfwWidget": true,
		"widgetId": "83ceb30a-ce4f-44e4-a3da-442008eb8979",
		"uiParams": "none"
	  },
	  {
		"analysisId": "VEGA_RESTORATION_POP_DEN",
		"chartType": "badge",
		"label": {
		  "en": "Population density in areas with combined potential"
		},
		"title": {
		  "en": "Population density in areas with combined potential"
		},
		"description": {
		  "en": "Note: The boundaries of large areas of interest are simplified to enhance calculation performance. Area statistics were rounded down to the nearest hundred."
		},
		"chartType": "bar",
		"useGfwWidget": true,
		"widgetId": "b5bd1739-12c6-4e12-8e6e-bba11034db57",
		"uiParams": "none"
	  },
	  {
		"analysisId": "VEGA_RESTORATION_TREE_COVER",
		"chartType": "badge",
		"label": {
		  "en": "Tree cover in areas with combined potential"
		},
		"title": {
		  "en": "Tree cover in areas with combined potential"
		},
		"description": {
		  "en": "Note: The boundaries of large areas of interest are simplified to enhance calculation performance. Area statistics were rounded down to the nearest hundred."
		},
		"chartType": "bar",
		"useGfwWidget": true,
		"widgetId": "b1460ee1-bd54-4d61-a44c-5ca80b50c5e7",
		"uiParams": "none"
	  },
	  {
		"analysisId": "VEGA_RESTORATION_RAINFALL",
		"chartType": "badge",
		"label": {
		  "en": "Average annual rainfall in areas with combined potential"
		},
		"title": {
		  "en": "Average annual rainfall in areas with combined potential"
		},
		"description": {
		  "en": "Note: The boundaries of large areas of interest are simplified to enhance calculation performance. Area statistics were rounded down to the nearest hundred."
		},
		"chartType": "bar",
		"useGfwWidget": true,
		"widgetId": "1839280b-c62f-436b-824c-5bfbbb9e923b",
		"uiParams": "none"
	  }
	],
	"layerPanel": {
	  "GROUP_WEBMAP": {
		"order": 4,
		"label": {
  
		},
		"layers": []
	  },
	  "GROUP_POT": {
		"order": 3,
		"groupType": "radio",
		"label": {
		  "en": "Restoration Potential"
		},
		"layers": [{
			"order": 1,
			"id": "CP",
			"type": "dynamic",
			"url": "https://gis.forest-atlas.org/server/rest/services/eth/00_AllPotOptions/MapServer",
			"layerIds": [302],
			"technicalName": "eth_combinedpotential",
			"visible": true,
			"label": {
			  "en": "Areas with combined potential"
			},
			"sublabel": {
			  "en": ""
			}
		  },
		  {
			"order": 2,
			"id": "LCCP",
			"type": "dynamic",
			"url": "https://gis.forest-atlas.org/server/rest/services/eth/00_AllPotOptions/MapServer",
			"layerIds": [299],
			"technicalName": "eth_landcover_combinedpotential",
			"label": {
			  "en": "Land use-land cover in areas with combined potential"
			},
			"sublabel": {
			  "en": ""
			}
		  },
		  {
			"order": 3,
			"id": "SCP",
			"type": "dynamic",
			"url": "https://gis.forest-atlas.org/server/rest/services/eth/00_AllPotOptions/MapServer",
			"layerIds": [298],
			"technicalName": "eth_slope_combinedpotential",
			"label": {
			  "en": "Slope in areas with combined potential"
			},
			"sublabel": {
			  "en": ""
			}
		  },
		  {
			"order": 4,
			"id": "PDCP",
			"type": "dynamic",
			"url": "https://gis.forest-atlas.org/server/rest/services/eth/00_AllPotOptions/MapServer",
			"layerIds": [297],
			"technicalName": "eth_population_combinedpotential",
			"label": {
			  "en": "Population density in areas with combined potential"
			},
			"sublabel": {
			  "en": ""
			}
		  },
		  {
			"order": 5,
			"id": "TCCP",
			"type": "dynamic",
			"url": "https://gis.forest-atlas.org/server/rest/services/eth/00_AllPotOptions/MapServer",
			"layerIds": [296],
			"technicalName": "eth_treecover_combinedpotential",
			"label": {
			  "en": "Tree cover in areas with combined potential"
			},
			"sublabel": {
			  "en": ""
			}
		  },
		  {
			"order": 6,
			"id": "RCP",
			"type": "dynamic",
			"url": "https://gis.forest-atlas.org/server/rest/services/eth/00_AllPotOptions/MapServer",
			"layerIds": [295],
			"technicalName": "eth_rainfall_combinedpotential",
			"label": {
			  "en": "Average annual rainfall in areas with combined potential"
			},
			"sublabel": {
			  "en": ""
			}
		  }
		]
	  },
	  "ADMIN": {
		"order": 1,
		"label": {
		  "en": "Administrative Boundaries"
		},
		"layers": [{
			"order": 1,
			"id": "ADM-WOREDA",
			"type": "dynamic",
			"url": "https://gis.forest-atlas.org/server/rest/services/eth/AdminBoundaries/MapServer",
			"layerIds": [278],
			"technicalName": "eth_woreda",
			"label": {
			  "en": "Woreda boundaries"
			},
			"sublabel": {
			  "en": "(census boundaries 2007 - not authoritative)"
			},
			"visible": false,
			"popup": {
			  "title": {
				"en": "Woreda (2007 census) boundaries"
			  },
			  "content": {
				"en": [{
					"label": "Region (2007 census) name",
					"fieldExpression": "R_NAME"
				  },
				  {
					"label": "Zone (2007 census) name",
					"fieldExpression": "Z_NAME"
				  },
				  {
					"label": "Woreda (2007 census) name",
					"fieldExpression": "W_NAME"
				  }
				]
			  }
			}
		  },
		  {
			"order": 2,
			"id": "ADM-ZONAL",
			"type": "dynamic",
			"url": "https://gis.forest-atlas.org/server/rest/services/eth/AdminBoundaries/MapServer",
			"layerIds": [185],
			"technicalName": "eth_zones",
			"label": {
			  "en": "Zonal boundaries"
			},
			"sublabel": {
			  "en": "(census boundaries 2007 - not authoritative)"
			},
			"visible": false,
			"popup": {
			  "title": {
				"en": "Zonal (2007 census) boundaries"
			  },
			  "content": {
				"en": [{
					"label": "Region (2007 census) name",
					"fieldExpression": "R_NAME"
				  },
				  {
					"label": "Zone (2007 census) name",
					"fieldExpression": "Z_NAME"
				  }
				]
			  }
			}
		  },
		  {
			"order": 3,
			"id": "ADM-REGION",
			"type": "dynamic",
			"url": "https://gis.forest-atlas.org/server/rest/services/eth/AdminBoundaries/MapServer",
			"layerIds": [186],
			"technicalName": "eth_regions",
			"label": {
			  "en": "Regional boundaries"
			},
			"sublabel": {
			  "en": "(census boundaries 2007 - not authoritative)"
			},
			"visible": true,
			"popup": {
			  "title": {
				"en": "Regional (2007 census) boundaries"
			  },
			  "content": {
				"en": [{
				  "label": "Region (2007 census) name",
				  "fieldExpression": "R_NAME"
				}]
			  }
			}
		  }
		]
	  },
	  "GROUP_PL": {
		"order": 2,
		"label": {
		  "en": "Priority Landscapes"
		},
		"layers": [{
		  "order": 4,
		  "id": "P_LS",
		  "type": "dynamic",
		  "url": "https://gis.forest-atlas.org/server/rest/services/eth/priority_landscapes/MapServer",
		  "layerIds": [282],
		  "technicalName": "eth_priority_landscapes",
		  "label": {
			"en": "Priority landscapes for cross-sectoral implementation"
		  },
		  "visible": false,
		  "popup": {
			"title": {
			  "en": "Priority landscapes for cross-sectoral implementation"
			},
			"content": {
			  "en": [{
				  "label": "Overall national ranking",
				  "fieldExpression": "Overall"
				},
				{
				  "label": "Priority level",
				  "fieldExpression": "Priority"
				}
			  ]
			}
		  }
		}]
	  },
	  "GROUP_REF": {
		"order": 5,
		"groupType": "radio",
		"label": {
		  "en": "Reference Layers"
		},
		"layers": [{
			"order": 1,
			"id": "LULC",
			"type": "dynamic",
			"url": "https://gis.forest-atlas.org/server/rest/services/eth/BiophysicalData/MapServer",
			"layerIds": [192],
			"technicalName": "eth_landcover",
			"label": {
			  "en": "Land use-land cover (2013)"
			},
			"sublabel": {
			  "en": ""
			}
		  },
		  {
			"order": 2,
			"id": "SLOPE",
			"type": "dynamic",
			"url": "https://gis.forest-atlas.org/server/rest/services/eth/BiophysicalData/MapServer",
			"layerIds": [199],
			"technicalName": "eth_slope",
			"label": {
			  "en": "Slope"
			},
			"sublabel": {
			  "en": ""
			}
		  },
		  {
			"order": 3,
			"id": "POP-DENSITY",
			"type": "dynamic",
			"url": "https://gis.forest-atlas.org/server/rest/services/eth/BiophysicalData/MapServer",
			"layerIds": [196],
			"technicalName": "eth_population",
			"label": {
			  "en": "Population density (2007)"
			},
			"sublabel": {
			  "en": ""
			}
		  },
		  {
			"order": 4,
			"id": "TREECOVER",
			"type": "dynamic",
			"url": "https://gis.forest-atlas.org/server/rest/services/eth/BiophysicalData/MapServer",
			"layerIds": [193],
			"technicalName": "eth_treecover",
			"label": {
			  "en": "Tree cover (2010)"
			},
			"sublabel": {
			  "en": ""
			}
		  },
		  {
			"order": 5,
			"id": "RAINFALL",
			"type": "dynamic",
			"url": "https://gis.forest-atlas.org/server/rest/services/eth/BiophysicalData/MapServer",
			"layerIds": [194],
			"technicalName": "eth_rainfall",
			"label": {
			  "en": "Average annual rainfall"
			},
			"sublabel": {
			  "en": ""
			}
		  }
		]
	  },
	  "GROUP_IMAGERY": {
		"grouptype": "imagery",
		"order": 4,
		"label": {
		  "en": "Recent Imagery",
		  "fr": "Imagerie récente",
		  "es": "Imágenes recientes",
		  "pt": "Imagens recentes",
		  "id": "Citra Satelit Terbaru",
		  "zh": "Recent Imagery",
		  "ka": "ბოლო გამოსახულება"
		},
		"layers": [{
		  "order": 1,
		  "id": "RECENT_IMAGERY",
		  "type": "imagery",
		  "technicalName": "recent_satellite_imagery",
		  "visible": false,
		  "label": {
			"en": "Recent Imagery",
			"fr": "Imagerie récente",
			"es": "Imágenes recientes",
			"pt": "Imagens recentes",
			"id": "Citra Satelit Terbaru",
			"zh": "云层覆盖",
			"ka": "ბოლო გამოსახულება"
		  },
		  "dynamicSublabel": {
			"en": "({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})",
			"fr": "({DATE_TIME}, {CLOUD_COVERAGE}% Imagerie récente, {INSTRUMENT})",
			"es": "({DATE_TIME}, {CLOUD_COVERAGE}% Cobertura de nubes, {INSTRUMENT})",
			"pt": "({DATE_TIME}, {CLOUD_COVERAGE}% Cobertura de nuvens, {INSTRUMENT})",
			"id": "({DATE_TIME}, {CLOUD_COVERAGE}% Tutupan Awan, {INSTRUMENT})",
			"zh": "({DATE_TIME}, {CLOUD_COVERAGE}% 近期图像, {INSTRUMENT})",
			"ka": "({DATE_TIME}, {CLOUD_COVERAGE}% ღრუბლიანობა, {INSTRUMENT})"
		  }
		}]
	  },
	  "GROUP_BASEMAP": {
		"groupType": "basemap",
		"order": 7,
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
		  "id": "wri_mono",
		  "thumbnailUrl": "https://my.gfw-mapbuilder.org/img/wri_mono.png",
		  "title": {
			"en": "Grey Basemap"
		  }
		}]
	  },
	  "extraLayers": [{
		  "id": "MASK",
		  "type": "dynamic",
		  "order": 10000,
		  "url": "https://gis.forest-atlas.org/server/rest/services/country_masks/country_mask_global/MapServer",
		  "opacity": 0.35,
		  "layerIds": [3]
		},
		{
		  "id": "LEGEND_LAYER",
		  "type": "dynamic",
		  "url": "https://gis-gfw.wri.org/arcgis/rest/services/legends/MapServer",
		  "visible": false,
		  "opacity": 0,
		  "layerIds": []
		},
		{
		  "id": "USER_FEATURES",
		  "type": "graphic",
		  "visible": true
		}
	  ]
	},
	"otherFieldsModules": ""
  };
  