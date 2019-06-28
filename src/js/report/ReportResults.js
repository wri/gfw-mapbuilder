import React, {Component} from 'react';
import {getUrlParams} from 'utils/params';
import resources from 'resources';
import arcgisUtils from 'esri/arcgis/utils';
import Graphic from 'esri/graphic';
import layerFactory from 'utils/layerFactory';

let map;

export default class ReportResults extends Component {
    constructor(props) {
      super(props);
    }
    
    createMap = () => {
      const params = getUrlParams(location.href);
      const { basemap } = params;
    
      const options = {
        center: [-8.086, 21.085],
        basemap: basemap || 'topo',
        slider: false,
        logo: false,
        zoom: 2
      };
    
      if (params.sharinghost) { resources.sharinghost = params.sharinghost; }
    
      // Set the sharinghost to the correct location so the app can find the webmap content
      if (!resources.sharinghost) { resources.sharinghost = 'https://www.arcgis.com'; }
      arcgisUtils.arcgisUrl = `${resources.sharinghost}/sharing/rest/content/items`;
    
      arcgisUtils.createMap(params.webmap, 'map', { mapOptions: options }).then(response => {
        map = response.map;
    
        map.disableKeyboardNavigation();
        map.disableMapNavigation();
        map.disableRubberBandZoom();
        map.disablePan();
    
        all({
          feature: this.getFeature(params),
          info: this.getApplicationInfo(params)
        }).always((featureResponse) => {
          //- Bail if anything failed
          if (featureResponse.error) {
            throw featureResponse.error;
          }
    
          const { feature, info } = featureResponse;
    
          //- Add Popup Info Now
          // addTitleAndAttributes(params, feature, info);
          //- Need the map to be loaded to add graphics
          if (map.loaded) {
            this.setupMap(params, feature);
          } else {
            map.on('load', () => {
              this.setupMap(params, feature);
            });
          }
    
          //- Add the settings to the params so we can omit layers or do other things if necessary
          //- If no appid is provided, the value here is essentially resources.js
          params.settings = info.settings;
    
          //- Make sure highcharts is loaded before using it
          // if (window.highchartsPromise.isResolved()) {
          //   runAnalysis(params, feature);
          // } else {
            // window.highchartsPromise.then(() => {
              this.runAnalysis(params, feature);
            // });
          // }
        });
      });
    };
    
     /**
  * Add a graphic to the map and set the map extent
  * Add layers to the map
  */
  setupMap = (params, feature) => {
    const { visibleLayers } = params;
    //- Add a graphic to the map
    const graphic = new Graphic(feature.geometry, symbols.getCustomSymbol());
    const graphicExtent = graphic.geometry.getExtent();
  
    if (graphicExtent) {
      map.setExtent(graphicExtent, true);
    } else {
      map.centerAndZoom(new Point(graphic.geometry), 15);
    }
    map.graphics.add(graphic);
  
    const hasGraphicsLayers = map.graphicsLayerIds.length > 0;
  
    if (hasGraphicsLayers) {
      map.graphicsLayerIds.forEach(id => {
        const layer = map.getLayer(id);
        if (params.activeLayers.indexOf(id) === -1) {
          layer.hide();
          return;
        }
        layer.show();
      });
    }
    map.layerIds.forEach(id => {
  
      if (params.hasOwnProperty(id)) {
        const layer = map.getLayer(id);
  
        if (!params[id].length) {
          layer.setVisibleLayers([-1]);
          return;
        }
  
        const layersVisible = params[id].split(',').map(layerIndex => Number(layerIndex));
  
        layer.setVisibleLayers(layersVisible);
      }
    });
    //- Add the layer to the map
    //- TODO: Old method adds a dynamic layer, this needs to be able to handle all layer types eventually,
    //- Update the layer factory to be more flexible
  
    // we must split into an array to prevent 'TREE_COVER_LOSS' from matching 'TREE_COVER'
    // when using indexOf. With strings this will match
    params.activeLayers = params.activeLayers.split(',');
  
    this.createLayers(resources.layerPanel, params.activeLayers, params.lang, params, feature);
  
  };
  
  createLayers = (layerPanel, activeLayers, language, params, feature) => {
    const {tcLossFrom, tcLossTo, gladFrom, gladTo, terraIFrom, terraITo, tcd, viirsFrom, viirsTo, modisFrom, modisTo, activeFilters, activeVersions} = params;
  
    // Update order of layers as required.
    // Layers ordered first by their layer group.
    // Layer groups in order from top to bottom: extraLayers, GROUP_LCD, GROUP_WEBMAP, GROUP_LC, GROUP_BASEMAP.
    // Esri layers have a specified order field within their layer group.
  
    // First need to add webmap layers to layer panel section GROUP_WEBMAP.
    const webMapLayers = [];
    map.layerIds.forEach((layerId) => {
      if (params.hasOwnProperty(layerId)) {
        webMapLayers.push(map.getLayer(layerId));
      }
    });
    // webMapLayers.forEach((webMapLayer, i) => {
    //   webMapLayer.order = i;
    // })
    layerPanel.GROUP_WEBMAP.layers = webMapLayers;
  
    let maxOrder = 0;
    //- Organize and order the layers before adding them to the map
    let layers = Object.keys(layerPanel).filter((groupName) => {
      //- remove basemaps and extra layers, extra layers will be added later and basemaps
      //- handled differently elsewhere
      return groupName !== layerKeys.GROUP_BASEMAP && groupName !== layerKeys.EXTRA_LAYERS;
    }).sort((a, b) => {
      //- Sort the groups based on their order property
      return layerPanel[b].order - layerPanel[a].order;
    }).reduce((list, groupName, groupIndex) => {
      //- Flatten them into a single list but before that,
      //- Multiple the order by 100 so I can sort them more easily below, this is because there
      //- order numbers start at 0 for each group, so group 0, layer 1 would have order of 1
      //- while group 1 layer 1 would have order of 100
      if (groupIndex === 0) {
        maxOrder = layerPanel[groupName].order + 1;
      }
  
      const orderedGroups = layerPanel[groupName].layers.map((layer, index) => {
        layer.order = ((maxOrder - layerPanel[groupName].order) * 100) - (layer.order || index + 1);
        return layer;
      });
      return list.concat(orderedGroups);
  
    }, []);
    //- Add the extra layers now that all the others have been sorted
    layers = layers.concat(layerPanel.extraLayers);
      //- remove custom features from the layersToAdd if we don't need it to avoid AGOL Auth
      layers.forEach((layer, i) => {
        if (layer.id === 'USER_FEATURES') {
          layers.splice(i, 1);
          return;
        }
      });
  
      //- make sure there's only one entry for each dynamic layer
      const uniqueLayers = [];
      const existingIds = [];
      const reducedLayers = layers.filter(l => !l.url && !l.versions).reduce((prevArray, currentItem) => {
        if (currentItem.hasOwnProperty('nestedLayers')) {
          return prevArray.concat(...currentItem.nestedLayers);
        }
        return prevArray.concat(currentItem);
      }, []);
  
      layers = layers.filter(l => l.url || l.versions).concat(reducedLayers);
      layers.forEach(layer => {
        if (existingIds.indexOf(layer.id) === -1) {
          uniqueLayers.push(layer);
          existingIds.push(layer.id);
        }
      });
      //- If we are changing webmaps, and any layer is active, we want to make sure it shows up as active in the new map
      //- Make those updates here to the config as this will trickle down
      uniqueLayers.forEach(layer => {
        layer.visible = activeLayers.indexOf(layer.id) > -1;
      });
  
      // format active version params into an object
      const versions = {};
      if (activeVersions.length) {
        activeVersions.forEach((v) => {
          const version = v.split('|');
          versions[version[0]] = version[1];
        });
      }
  
      // format active filter params into an object
      const filters = {};
      if (activeFilters) {
        activeFilters.forEach((f) => {
          const filter = f.split('|');
          filters[filter[0]] = filter[1];
        });
      }
  
      //- remove layers from config that have no url unless they are of type graphic(which have no url) or if it has multiple versions.
      //- sort by order from the layer config
      //- return an arcgis layer for each config object
      const esriLayers = uniqueLayers.filter(layer => layer && activeLayers.indexOf(layer.id) > -1 && (layer.url || layer.type === 'graphic' || layer.versions)).map((layer) => {
        // Check for active versions matching the layer id
  
        let layerConfig, filterField;
        Object.keys(resources.layerPanel).forEach((group) => {
          const configs = resources.layerPanel[group].layers;
          layerConfig = configs && configs.find((c) => c.id === layer.id);
          if (layerConfig && layerConfig.filterField) {
            filterField = layerConfig.filterField[language];
          }
        });
  
        if (versions[layer.id] && versions[layer.id] !== 0) {
          const groups = Object.keys(resources.layerPanel);
          let versionConfig;
          groups.forEach((group) => {
            const configs = resources.layerPanel[group].layers;
            const layerVersionConfig = configs && configs.find((c) => c.id === layer.id);
            if (layerVersionConfig && layerVersionConfig.versions) {
              versionConfig = layerVersionConfig.versions[versions[layer.id]];
            }
          });
          // Update the layer config object to include active version url / layerIds
          if (versionConfig) {
            layer.url = versionConfig.url;
            if (versionConfig.layerIds) {
              layer.layerIds = versionConfig.layerIds;
            }
          }
          console.log(layer.layerIds, versionConfig.layerIds);
  
        }
        // return layerFactory(layer, language);
  
  
        const mapLayer = layerFactory(layer, language);
  
        // If there are active filters, set definition expressions on layer.
        if (filterField && layer.type === 'feature') {
          mapLayer.setDefinitionExpression(`${filterField} = '${filters[layer.id]}'`);
        } else if (filterField && layer.type === 'dynamic') {
          const layerDefinitions = [];
          layer.layerIds.forEach((id) => {
            layerDefinitions[id] = `${filterField} = '${filters[layer.id]}'`;
          });
          mapLayer.setLayerDefinitions(layerDefinitions);
        }
  
        return mapLayer;
  
      });
  
      // Set the date range for the loss and glad layers
      const lossLayer = esriLayers.filter(layer => layer.id === layerKeys.TREE_COVER_LOSS)[0];
      const gladLayer = esriLayers.filter(layer => layer.id === layerKeys.GLAD_ALERTS)[0];
      const terraILayer = esriLayers.filter(layer => layer.id === layerKeys.TERRA_I_ALERTS)[0];
      const viirsFiresLayer = esriLayers.filter(layer => layer.id === layerKeys.VIIRS_ACTIVE_FIRES)[0];
      const modisFiresLayer = esriLayers.filter(layer => layer.id === layerKeys.MODIS_ACTIVE_FIRES)[0];
  
      if (lossLayer && lossLayer.setDateRange) {
        const yearsArray = analysisConfig[analysisKeys.TC_LOSS].labels;
        const fromYear = yearsArray[tcLossFrom];
        const toYear = yearsArray[tcLossTo];
  
        lossLayer.setDateRange(fromYear - 2000, toYear - 2000);
      }
  
      if (gladLayer && gladLayer.setDateRange) {
        const julianFrom = appUtils.getJulianDate(gladFrom);
        const julianTo = appUtils.getJulianDate(gladTo);
  
        gladLayer.setDateRange(julianFrom, julianTo);
      }
  
      if (terraILayer && terraILayer.setDateRange) {
        const julianFrom = appUtils.getJulianDate(terraIFrom);
        const julianTo = appUtils.getJulianDate(terraITo);
  
        terraILayer.setDateRange(julianFrom, julianTo);
      }
  
      if (viirsFiresLayer) {
        layersHelper.updateFiresLayerDefinitions(viirsFrom, viirsTo, viirsFiresLayer);
      }
  
      if (modisFiresLayer) {
        layersHelper.updateFiresLayerDefinitions(modisFrom, modisTo, modisFiresLayer);
      }
      map.addLayers(esriLayers);
  
      reducedLayers.forEach(layer => {
        const mapLayer = map.getLayer(layer.id);
        if (mapLayer) {
          mapLayer.hide();
          activeLayers.forEach(id => {
            if (id.indexOf(layer.id) > -1) {
              if (layer.hasOwnProperty('includedSublayers')) {
                const subIndex = parseInt(id.substr(layer.id.length + 1));
                mapLayer.setVisibleLayers([subIndex]);
                mapLayer.show();
                return;
              }
              mapLayer.show();
            }
          });
        }
      });
  
      layersHelper.updateTreeCoverDefinitions(tcd, map, layerPanel);
      layersHelper.updateAGBiomassLayer(tcd, map);
  
      if (map.getZoom() > 9) {
        map.setExtent(map.extent, true); //To trigger our custom layers' refresh above certain zoom leves (10 or 11)
      }
  
      this.addTitleAndAttributes(params, feature);
      // If there is an error with a particular layer, handle that here
  
      on.once(map, 'layers-add-result', result => {
        const addedLayers = result.layers;
        // Check for Errors
        const layerErrors = addedLayers.filter(layer => layer.error);
        if (layerErrors.length > 0) { console.error(layerErrors); }
        const webMapLayerIds = map.layerIds.filter((layerId) => params.hasOwnProperty(layerId));
        const esriLayerIds = esriLayers.map(esriLayer => esriLayer.id);
        const baseLayerIds = map.layerIds.filter((layerId) => webMapLayerIds.indexOf(layerId) === -1 && esriLayerIds.indexOf(layerId) === -1);
        uniqueLayers.forEach((l, i) => {
          map.reorderLayer(l, i + baseLayerIds.length);
        });
      });
  };
    
  runAnalysis = (params, feature) => {
    const { settings } = params;
    const language = params.lang;
  
    let analysisModules;
    const stringMods = localStorage.getItem('analysisMods');
    analysisModules = stringMods ? JSON.parse(stringMods) : '';
  
    if (!analysisModules) {
      analysisModules = settings.analysisModules;
    }
  
    const { geostoreId } = feature;
    const resultsContainer = document.getElementById('results-container');
  
    // if there is a selectedModule (need to figure out how to pass this, maybe by analysisModuleId),
    // remove it from the analysisModules array so it doesn't go through the loop below
    // and call a separate function that makes an esriRequest (like below) but with the updated
    // params that were passed into the report
  
    analysisModules.forEach((module) => {
      console.log('module', module);
      let uiParamsToAppend = {};
  
      if (Array.isArray(module.uiParams) && module.uiParams.length > 0) {
        module.uiParams.forEach((uiParam) => {
          switch (uiParam.inputType) {
            case 'rangeSlider':
              uiParamsToAppend = handleRangeSliderParams(uiParamsToAppend, uiParam);
              break;
            case 'datepicker':
              uiParamsToAppend = handleDatepickerParams(uiParamsToAppend, uiParam, module.analysisId, params);
              break;
            case 'tcd':
              uiParamsToAppend = handleTcdParams(uiParamsToAppend);
              break;
          }
        });
      }
  
      if (Array.isArray(module.params) && module.params.length > 0) {
        module.params.forEach((param) => {
          uiParamsToAppend = {
            ...uiParamsToAppend,
            [param.name]: param.value,
          };
        });
      }
  
      uiParamsToAppend.geostore = geostoreId;
  
      if (module.useGfwWidget) {
        module.chartType = 'vega';
        const div = document.createElement('div');
        div.id = module.analysisId + '_div';
        div.classList.add('vega-chart-wrapper');
        
        const reportContainerDiv = document.createElement('div');
        reportContainerDiv.classList.add('report-container');
        reportContainerDiv.appendChild(div);
        resultsContainer.appendChild(reportContainerDiv);
        const infoContainerDiv = document.createElement('div');
        infoContainerDiv.classList.add('vega-chart-info-container');
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('vega-chart-info');
        infoDiv.innerHTML = module.description[language];
        infoContainerDiv.appendChild(infoDiv);
        
        const sectionDiv = document.createElement('div');
        
        if (module.analysisId === 'TC_LOSS_GAIN') {
          sectionDiv.classList.add('report-section');
          sectionDiv.innerHTML = `<h1>Forest Change</h1>`;
        }
        
        if (module.analysisId === 'VIIRS_FIRES') {
          sectionDiv.classList.add('report-section');
          sectionDiv.innerHTML = `<h1>Fires</h1>`;
        }
        
        if (module.analysisId === 'GLAD_ALERTS') {
          sectionDiv.classList.add('report-section');
          sectionDiv.innerHTML = `<h1>Alerts</h1>`;
        }
        
        analysisUtils.getCustomAnalysis(module, uiParamsToAppend).then(results => {
          const chartComponent = this.renderResults(results, language, module, params);
          const moduleDiv = document.getElementById(module.analysisId + '_div');
          ReactDOM.render(chartComponent, moduleDiv);
          moduleDiv.appendChild(infoContainerDiv);
          moduleDiv.parentNode.insertBefore(sectionDiv, moduleDiv);
        });
        return;
      }
  
      esriRequest({
        url: module.analysisUrl,
        callbackParamName: 'callback',
        content: uiParamsToAppend,
        handleAs: 'json',
        timeout: 30000
      }, { usePost: false }).then(results => {
        const div = document.createElement('div');
        div.id = module.analysisId;
        div.classList.add('results-chart');
        resultsContainer.appendChild(div);
  
        const chartComponent = this.renderResults(results, language, module, params);
  
        if (!chartComponent) {
          div.remove();
        } else {
          ReactDOM.render(chartComponent, div);
        }
      }, (error) => {
        console.error(error);
      });
    });
  };
    
    render() {
      return(
      
      
      );
    }
}
