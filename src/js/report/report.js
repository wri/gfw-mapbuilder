import React from 'react';
import ReactDOM from 'react-dom';
import analysisKeys from 'constants/AnalysisConstants';
import layerKeys from 'constants/LayerConstants';
import Polygon from 'esri/geometry/Polygon';
import Point from 'esri/geometry/Point';
import QueryTask from 'esri/tasks/QueryTask';
import Query from 'esri/tasks/query';
import {getUrlParams} from 'utils/params';
import {analysisConfig} from 'js/config';
import layerFactory from 'utils/layerFactory';
import geojsonUtil from 'utils/arcgis-to-geojson';
import esriRequest from 'esri/request';
import template from 'utils/template';
import appUtils from 'utils/AppUtils';
import locale from 'dojo/date/locale';
import Deferred from 'dojo/Deferred';
import symbols from 'utils/symbols';
import arcgisUtils from 'esri/arcgis/utils';
import analysisUtils from 'utils/analysisUtils';
import {formatters} from 'utils/analysisUtils';
import all from 'dojo/promise/all';
import Graphic from 'esri/graphic';
import resources from 'resources';
import charts from 'utils/charts';
import number from 'dojo/number';
import text from 'js/languages';
import layersHelper from 'helpers/LayersHelper';
import moment from 'moment';
import on from 'dojo/on';
import VegaChart from 'components/AnalysisPanel/VegaChart';
import BarChart from 'components/AnalysisPanel/BarChart';
import BiomassChart from 'components/AnalysisPanel/BiomassChart';
import CompositionPieChart from 'components/AnalysisPanel/CompositionPieChart';
import TimeSeriesChart from 'components/AnalysisPanel/TimeSeriesChart';
import FiresBadge from 'components/AnalysisPanel/FiresBadge';
import LossGainBadge from 'components/AnalysisPanel/LossGainBadge';
import Badge from 'components/AnalysisPanel/Badge';
import SVGIcon from './../utils/svgIcon';

let map;

const getWebmapInfo = function getWebmapInfo (webmap) {

  return esriRequest({
    url: `${resources.sharinghost}/sharing/rest/content/items/${webmap}/data?f=json`,
    callbackParamName: 'callback'
  });
};

const getApplicationInfo = function getApplicationInfo (params) {
  const { webmap, appid } = params;
  const promise = new Deferred();
  // //- Should probably get any needed params from map.html since it already has
  // //- appInfo, just pass everything needed, if the needed items are too much, then
  // //- fall back to this
  if (webmap) {
    all({
      settings: template.getAppInfo(appid),
      webmap: getWebmapInfo(webmap)
    }).then((results) => {
      promise.resolve(results);
      if (brApp.debug) { console.log('getApplicationInfo.webmap: ', results); }
    });
  } else {
    promise.reject({
      error: new Error('Missing Webmap Id. We need atleast one.')
    });
  }
  return promise;
};

const getFeature = function getFeature (params) {
  const { idvalue } = params;
  const promise = new Deferred();
  if (idvalue) {
    esriRequest({
      url: 'https://production-api.globalforestwatch.org/v1/geostore/' + idvalue,
      callbackParamName: 'callback',
      handleAs: 'json',
      timeout: 30000
    }, { usePost: false}).then(geostoreResult => {
      const esriJson = geojsonUtil.geojsonToArcGIS(geostoreResult.data.attributes.geojson.features[0].geometry);
      promise.resolve({
        attributes: geostoreResult.data.attributes,
        geostoreId: geostoreResult.data.id,
        geometry: geostoreResult.data.attributes.geojson.features[0].geometry.type === 'Point' ? new Point(esriJson) : new Polygon(esriJson),
        title: params.customFeatureTitle,
        isCustom: true // TODO MAKE SURE NOT TO HARD CODE THAT IN
      });
    }, err => {
      console.error(err);
      promise.resolve([]);
    });
  } else {
    promise.reject({ error: new Error('Unable to retrieve feature.') });
  }
  return promise;
};

const createLayers = function createLayers (layerPanel, activeLayers, language, params, feature) {
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

    addTitleAndAttributes(params, feature);
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

const updateAnalysisModules = function functionName(params) {
  let acquiredModules = false;
  window.addEventListener('message', function(e) {
    let info;

    // If the message is from the parent and it says it has the info
    if (e.origin === params.origin && e.data && e.data.command === 'info') { //this fires twice;
      if (!acquiredModules) { //so let's avoid setting it twice
        info = e.data.info;
        // console.log('Info is ' + JSON.stringify(info));
        localStorage.setItem('analysisMods', JSON.stringify(info));
        acquiredModules = true;
      }
    }
  }, false);

  // Ask the page opener (the map) to send us the info
  opener.postMessage('send-info', params.origin);
};

const createMap = function createMap (params) {
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
      feature: getFeature(params),
      info: getApplicationInfo(params)
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
        setupMap(params, feature);
      } else {
        map.on('load', () => {
          setupMap(params, feature);
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
          runAnalysis(params, feature);
        // });
      // }
    });
	});
};

const getLayerConfig = function getLayerConfig (layerPanel, id) {
  let config;
  Object.keys(layerPanel).some(groupKey => {
    return layerPanel[groupKey].layers.some(conf => {
      if (conf.id === id) {
        config = conf;
        return true;
      }
    });
  });
  return config;
};

const generateRow = function generateRows (fieldName, fieldValue) {
  const row = document.createElement('dl');
  const label = document.createElement('dt');
  const value = document.createElement('dd');
  label.innerHTML = fieldName;
  value.innerHTML = fieldValue;
  row.appendChild(label);
  row.appendChild(value);
  return row;
};

const generateSlopeTable = function generateSlopeTable (labels, values) {
  const roundedValues = [];
  values.forEach(value => {
    if (typeof value === 'number') {
      value = Math.round(value / 100) * 100;
    }
    roundedValues.push(value);
  });

  const fragment = document.createDocumentFragment();
  labels.forEach((label, index) => {
    fragment.appendChild(generateRow(label,
      typeof roundedValues[index] === 'number' ? number.format(roundedValues[index]) : values[index]
    ));
  });
  return fragment;
};

/**
* Add a graphic to the map and set the map extent
* Add layers to the map
*/
const setupMap = function setupMap (params, feature) {
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

  createLayers(resources.layerPanel, params.activeLayers, params.lang, params, feature);

};

const addHeaderContent = function addHeaderContent (params) {
  const {title, logoUrl, logoLinkUrl} = params; 
  console.log('params', params);// subtitle was in params

  document.getElementById('report-title').innerHTML = `${title} Custom Analysis`;
  // document.getElementById('report-subtitle').innerHTML = subtitle;
  // above is now using feature title in addTitleAndAttributes
  //- TODO: This should be modified, logoUrl should come from querying the appid instead of the url since that is safer
  document.getElementById('logo').setAttribute('src', logoUrl);
  document.getElementById('logo-anchor').setAttribute('href', logoLinkUrl);
  document.getElementById('report-icons').innerHTML = `
    <svg class='svg-icon report-header__icon report-header__icon-print'>
      <svg id="icon-print" viewBox="0 0 19 14">
        <title>Print</title>
        <path d="M16.000,10.000 C16.000,10.000 16.000,12.000 16.000,12.000 C16.000,12.000 16.000,13.000 16.000,13.000 C16.000,13.000 16.000,14.000 16.000,14.000 C16.000,14.000 3.000,14.000 3.000,14.000 C3.000,14.000 3.000,13.000 3.000,13.000 C3.000,13.000 3.000,12.000 3.000,12.000 C3.000,12.000 3.000,10.000 3.000,10.000 C3.000,10.000 0.000,10.000 0.000,10.000 C0.000,10.000 0.000,3.000 0.000,3.000 C0.000,3.000 1.000,3.000 1.000,3.000 C1.000,3.000 2.000,3.000 2.000,3.000 C2.000,3.000 3.000,3.000 3.000,3.000 C3.000,3.000 3.000,0.000 3.000,0.000 C3.000,0.000 16.000,0.000 16.000,0.000 C16.000,0.000 16.000,3.000 16.000,3.000 C16.000,3.000 17.000,3.000 17.000,3.000 C17.000,3.000 18.000,3.000 18.000,3.000 C18.000,3.000 19.000,3.000 19.000,3.000 C19.000,3.000 19.000,10.000 19.000,10.000 C19.000,10.000 16.000,10.000 16.000,10.000 ZM5.000,12.000 C5.000,12.000 14.000,12.000 14.000,12.000 C14.000,12.000 14.000,7.993 14.000,7.993 C14.000,7.993 5.000,7.993 5.000,7.993 C5.000,7.993 5.000,12.000 5.000,12.000 ZM2.889,8.002 C2.889,8.002 2.889,8.000 2.889,8.000 C2.889,8.000 3.000,8.000 3.000,8.000 C3.000,8.000 3.000,7.000 3.000,7.000 C3.000,7.000 3.000,6.000 3.000,6.000 C3.000,6.000 16.000,6.000 16.000,6.000 C16.000,6.000 16.000,7.000 16.000,7.000 C16.000,7.000 16.000,8.000 16.000,8.000 C16.000,8.000 16.111,8.000 16.111,8.000 C16.111,8.000 16.111,8.002 16.111,8.002 C16.111,8.002 17.000,8.002 17.000,8.002 C17.000,8.002 17.000,5.000 17.000,5.000 C17.000,5.000 2.000,5.000 2.000,5.000 C2.000,5.000 2.000,8.002 2.000,8.002 C2.000,8.002 2.889,8.002 2.889,8.002 ZM1.000,3.996 C1.000,3.996 1.000,3.996 1.000,3.996 C1.000,3.996 1.000,8.002 1.000,8.002 C1.000,8.002 1.000,8.002 1.000,8.002 C1.000,8.002 1.000,5.000 1.000,5.000 C1.000,5.000 1.000,4.000 1.000,4.000 C1.000,4.000 1.000,3.996 1.000,3.996 ZM2.000,3.996 C2.000,3.996 2.000,4.000 2.000,4.000 C2.000,4.000 17.000,4.000 17.000,4.000 C17.000,4.000 17.000,3.996 17.000,3.996 C17.000,3.996 2.000,3.996 2.000,3.996 ZM18.000,3.996 C18.000,3.996 18.000,3.996 18.000,3.996 C18.000,3.996 18.000,4.000 18.000,4.000 C18.000,4.000 18.000,5.000 18.000,5.000 C18.000,5.000 18.000,8.002 18.000,8.002 C18.000,8.002 18.000,8.002 18.000,8.002 C18.000,8.002 18.000,3.996 18.000,3.996 Z" fillRule="evenodd"></path>
      </svg>
    </svg>
    <svg class='svg-icon report-header__icon report-header__icon-info'>
      <svg id="shape-info" viewBox="0 0 16 32">
      <title>Info</title>
      <path d="M2 16c1.105 0 2 0.895 2 2v8c0 1.105-0.895 2-2 2h-2v4h16v-4h-1.992c-1.102 0-2.008-0.895-2.008-2l-0.004-14h-11.996v4h2zM4 4c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4s-4-1.791-4-4z"></path>
      </svg>
    </svg>
    <svg class='svg-icon report-header__icon'>
      <svg id="icon-share" viewBox="0 0 1024 1024">
        <title>Share</title>
        <path className="path1" d="M183.488 507.392c0 65.024 52.672 117.696 117.696 117.696 31.744 0 60.608-12.544 81.792-32.96l193.792 96.896c-0.576 4.736-0.96 9.6-0.96 14.528 0 65.024 52.672 117.696 117.696 117.696s117.696-52.672 117.696-117.696c0-65.024-52.672-117.696-117.696-117.696-31.744 0-60.48 12.544-81.6 32.96l-193.984-96.896c0.576-4.8 0.96-9.6 0.96-14.528s-0.384-9.728-0.96-14.528l193.792-96.896c21.184 20.416 50.048 32.96 81.792 32.96 65.024 0 117.696-52.672 117.696-117.696s-52.672-117.696-117.696-117.696c-65.024 0-117.696 52.672-117.696 117.696 0 4.928 0.384 9.792 0.96 14.528l-193.792 96.896c-21.184-20.416-50.048-32.96-81.792-32.96-65.024 0-117.696 52.672-117.696 117.696z"></path>
      </svg>
    </svg>`;
  };
  
  const analysisArea = document.getElementById('analysis-area');
  document.getElementById('analysis-area').innerHTML = `
    <span class="analysis-area-subtitle">AREA OF ANALYSIS</span>
  `;
  
  const analysisAreaList = document.createElement('ul');
  analysisAreaList.classList.add('analysis-area-list');
  
  const analysisAreaListItem = document.createElement('li');
  analysisAreaListItem.classList.add('analysis-area-list-item');
  analysisAreaListItem.innerHTML = `L1`;
  
  analysisAreaList.appendChild(analysisAreaListItem);
  document.getElementById('analysis-area').appendChild(analysisAreaList);


const addTitleAndAttributes = function addTitleAndAttributes (params, featureInfo) {
  const { layerId, OBJECTID, OBJECTID_Field, lang } = params;

  if (layerId && OBJECTID) {

    const hashDecoupled = layerId.split('--');
    const url = hashDecoupled[0];
    const id = hashDecoupled[1];
    const mapLayer = map.getLayer(id);

    const queryTask = new QueryTask(url);
    const query = new Query();
    query.where = OBJECTID_Field + ' = ' + OBJECTID;
    query.returnGeometry = false;
    query.outFields = ['*'];
    queryTask.execute(query).then(res => {
      if (res.features && res.features.length > 0) {
        if (mapLayer && mapLayer.infoTemplate) {
          const subTitle = mapLayer.displayField ? res.features[0].attributes[mapLayer.displayField] : featureInfo.title;

          //document.getElementById('report-subtitle').innerHTML = subTitle ? subTitle : '';

          const fragment = document.createDocumentFragment();

          mapLayer.infoTemplate.info.fieldInfos.filter(fieldInfo => fieldInfo.visible).forEach((fieldInfo) => {
            let fieldValue = res.features[0].attributes[fieldInfo.fieldName];
            //- If it is a date, format that correctly
            if (fieldInfo.format && fieldInfo.format.dateFormat) {
              fieldValue = locale.format(new Date(fieldValue));
            //- If it is a number, format that here, may need a better way
            } else if (fieldInfo.format && fieldInfo.format.places !== undefined) {
              fieldValue = number.format(fieldValue, fieldInfo.format);
            }

            if (fieldValue && fieldValue.trim) {
              fieldValue = fieldValue.trim();
              fragment.appendChild(generateRow(
                fieldInfo.label,
                fieldValue
              ));

              document.getElementById('popup-content').appendChild(fragment);
            }

          });
        } else {
          //document.getElementById('report-subtitle').innerHTML = featureInfo.title;
        }
      } else {
          //document.getElementById('report-subtitle').innerHTML = featureInfo.title;
      }

    });
  } else {
   //document.getElementById('report-subtitle').innerHTML = featureInfo.title;
  }
};

/**
* Takes the counts from the restoration requests and formats them for highcharts
*/
const formatRestorationData = (counts, labels, colors) => {
  return labels.map((label, index) => {
    const value = typeof counts[index] === 'number' ?
      appUtils.roundToHundred(counts[index]) :
      counts[index];
    return {
      name: label,
      data: [value],
      color: colors[index]
    };
  }).filter((item) => {
    return item.data[0] && item.name !== 'No Data';
  });
};

/**
* Make sure both values are either truthy or falsy, otherwise return flase
*/
const haveSameBoolState = (a, b) => (!!a && !!b) || (!a && !b);

/**
* Renders a table into the restoration analysis section
*/
const generateRestorationTable = function generateRestorationTable (title, lang, series) {
  //- Total of all the data
  const total = series.reduce((a, b) => a + b.data[0], 0);
  const table = document.createElement('div');
  const label = document.createElement('h3');
  //- Create a copy of the data so we don't mutate the original
  const data = series.slice();
  table.setAttribute('class', 'restoration-table');
  label.setAttribute('class', 'restoration-table__header');
  label.innerHTML = title;
  table.appendChild(label);
  //- Unshift in the Headers for the table
  data.unshift({
    name: text[lang].REPORT_RESTORATION_TABLE_TYPE,
    data: [text[lang].REPORT_RESTORATION_TABLE_VALUE]
  });
  //- Push in the totals for the table
  data.push({
    name: text[lang].REPORT_TABLE_TOTAL,
    data: [total]
  });

  data.forEach((datum) => {
    table.appendChild(generateRow(datum.name,
      typeof datum.data[0] === 'number' ?
        number.format(appUtils.roundToHundred(datum.data[0])) :
        datum.data[0]
    ));
  });
  return table;
};

const renderResults = (results, lang, config, params) => {
  if (results.hasOwnProperty('error')) {
    return null;
  }

  const { chartType, label, colors, analysisId } = config;
  const defaultColors = ['#cf5188'];
  let chartComponent = null;

  switch (chartType) {
    case 'bar': {
      const { chartBounds, valueAttribute } = config;
      const labels = [...Array(chartBounds[1] + 1 - chartBounds[0])] // create a new arr out of the bounds difference
      .map((i, idx) => idx + chartBounds[0]); // fill in the values based on the bounds

      let counts = [];

      switch (analysisId) {
        case 'TC_LOSS': {
          let lossObj = null;
          if (!results.hasOwnProperty('error')) {
            lossObj = results.data.attributes.loss;
            counts = Object.values(lossObj);
          }
          break;
        }
        case 'IFL': {
          if (!results.hasOwnProperty('error')) {

            results.data.attributes.histogram[0].result.forEach(histo => {
              counts.push(Math.round(histo.result * 100) / 100);
            });
          }
          break;
        }
        default: {
          counts = results;
          if (valueAttribute) {
            counts = valueAttribute.split('.').reduce((prevVal, currentVal) => {
              if (!prevVal.hasOwnProperty(currentVal)) {
                throw new Error(`response object does not contain property: '${currentVal}'. Check the 'valueAttribute' config`);
              }
              return prevVal[currentVal];
            }, results);
          }
        }
      }

      const chartColors = colors || defaultColors;

      chartComponent = <BarChart
        name={label[lang]}
        counts={counts}
        colors={chartColors}
        labels={labels}
        results={results}
        encoder={null}
      />;
      break;
    }
    case 'timeSeries': {
      const { valueAttribute } = config;

      let data = [];

      switch (analysisId) {
        case 'GLAD_ALERTS': {
          if (!results.hasOwnProperty('error')) {
            data = formatters.alerts(results.data.attributes.value);
          }
          break;
        }
        case 'TERRAI_ALERTS': {
          if (!results.hasOwnProperty('error')) {
            data = formatters.alerts(results.data.attributes.value);
          }
          break;
        }
        default: {
          data = results;

          if (valueAttribute) {
            // see https://github.com/wri/gfw-mapbuilder/wiki/Chart-Types:-Bar#valueattribute-string
            // for more information on using the valueAttribute property
            data = valueAttribute.split('.').reduce((prevVal, currentVal) => {
              if (!prevVal.hasOwnProperty(currentVal)) {
                throw new Error(`response object does not contain property: '${currentVal}'. Check the 'valueAttribute' config`);
              }
              return prevVal[currentVal];
            }, results);
          }
        }
      }
      chartComponent = <TimeSeriesChart data={data} name={label[lang] ? label[lang] : ''} />;
      break;
    }
    case 'badge': {
      const {
        tcLossFrom,
        tcLossTo,
        viirsEndDate,
        viirsStartDate,
      } = params;

      const { valueAttribute, color, badgeLabel } = config;

      switch (analysisId) {
        case 'TC_LOSS_GAIN':
          chartComponent = <LossGainBadge
            results={results}
            lossFromSelectIndex={Number(tcLossFrom)}
            lossToSelectIndex={Number(tcLossTo)}
            totalLossLabel={text[lang].ANALYSIS_TOTAL_LOSS_LABEL}
            totalGainLabel={text[lang].ANALYSIS_TOTAL_GAIN_LABEL}
            totalGainRange={text[lang].ANALYSIS_TOTAL_GAIN_RANGE}
          />;
          break;
        case 'VIIRS_FIRES':
          chartComponent = <FiresBadge
            results={results}
            from={viirsStartDate}
            to={viirsEndDate}
            preLabel={text[lang].ANALYSIS_FIRES_PRE}
            firesLabel={text[lang].ANALYSIS_FIRES_ACTIVE}
            timelineStartLabel={text[lang].TIMELINE_START}
            timelineEndLabel={text[lang].TIMELINE_END}
          />;
          break;
        default:
          chartComponent = <Badge results={results} valueAttribute={valueAttribute} color={color} label={badgeLabel[lang]} />;

      }
      break;
    }
    case 'biomassLoss': {
      const chartColors = colors || { loss: '#FF6699', carbon: '#BEBCC2' };

      chartComponent = <BiomassChart
        payload={results}
        colors={chartColors}
        lossName={text[lang].ANALYSIS_CARBON_LOSS}
        carbonName={text[lang].ANALYSIS_CARBON_EMISSION}
        />;
      break;
    }
    case 'lccPie': {
      const data = {
        counts: []
      };
      if (!results.hasOwnProperty('error')) {
        results.data.attributes.histogram.forEach(histo => {
          if (!data[histo.className]) {
            data[histo.className] = 0;
          }
          histo.result.forEach(year => {
            data[histo.className] += year.result;
          });
          data.counts.push(Math.round(data[histo.className] * 100) / 100);
        });
      }

      chartComponent = <CompositionPieChart
        results={results}
        name={label[lang]}
        counts={data.counts}
        colors={colors}
        labels={config.classes[lang]}
      />;
      break;
    }
    case 'vega':
      chartComponent = <VegaChart results={results} language={lang} />;
      break;
    default:
      break;
  }

  return chartComponent;
};

const handleRangeSliderParams = (paramsObject, paramModule) => {
  const { bounds, valueType, combineParams, startParamName, endParamName, valueSeparator } = paramModule;
  let startValue = bounds[0];
  let endValue = bounds[1];

  if (valueType === 'date') {
    startValue = `${startValue}-01-01`;
    endValue = `${endValue}-12-31`;
  }

  if (combineParams) {
    if (!valueSeparator) {
      throw new Error("no 'valueSeparator' property configured. If using 'combineParams', you must supply a 'valueSeparator'. Check your analysisModule config.");
    }
    return {
      ...paramsObject,
      [startParamName]: `${startValue}${valueSeparator}${endValue}`,
    };
  }

  return {
    ...paramsObject,
    [startParamName]: `${startValue}`,
    [endParamName]: `${endValue}`,
  };
};

const handleDatepickerParams = (paramsObject, paramModule, analysisId, reportProperties) => {
  const {
    combineParams,
    valueSeparator,
    startParamName,
    endParamName,
    defaultStartDate,
    minDate,
    maxDate,
    multi,
  } = paramModule;

  const {
    viirsStartDate,
  } = reportProperties;

  let startDate = defaultStartDate || minDate;
  const endDate = maxDate || moment().format('YYYY-MM-DD');

  if (analysisId === 'VIIRS_FIRES') {
    startDate = moment(viirsStartDate).format('YYYY-MM-DD');
  }

  if (combineParams) {
    if (!valueSeparator) {
      throw new Error("no 'valueSeparator' property configured. If using 'combineParams', you must supply a 'valueSeparator'. Check your analysisModule config.");
    }
    return {
      ...paramsObject,
      [startParamName]: `${startDate}${valueSeparator}${endDate}`,
    };
  }
  const isMultiPicker = multi === true || multi === 'true';

  return {
    ...paramsObject,
    [startParamName]: `${startDate}`,
    ...(isMultiPicker ? { [endParamName]: `${endDate}` } : {}),
  };
};

const handleTcdParams = (paramsObject) => {
  return {
    ...paramsObject,
    thresh: '30'
  };
};

const runAnalysis = function runAnalysis (params, feature) {
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
      div.classList.add('vega-chart');
      //const label = document.createElement('h3');
      //label.classList.add('vega-chart-label');
      //label.innerHTML = module.label.en;
      //resultsContainer.appendChild(label);
      resultsContainer.appendChild(div);
      const infoDiv = document.createElement('div');
      infoDiv.classList.add('vega-chart-info');
      infoDiv.innerHTML = module.description[language];
      analysisUtils.getCustomAnalysis(module, uiParamsToAppend).then(results => {
        
        const chartComponent = renderResults(results, language, module, params);
        const moduleDiv = document.getElementById(module.analysisId + '_div');
        ReactDOM.render(chartComponent, moduleDiv);
        moduleDiv.appendChild(infoDiv);
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

      const chartComponent = renderResults(results, language, module, params);

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

export default {

  /**
  * TODO: Add documentation to README.md
  * TEST URL:
  * http://localhost:3000/report.html?idvalue=8&service=http%3A%2F%2Fgis-forestatlas.wri.org%2Farcgis%2Frest%2Fservices%2FGNQ%2FGNQ_online_en%2FMapServer&layerid=6&webmap=5e094aba9465448186287c2300ef879e&basemap=topo&visibleLayers=0%2C1%2C2%2C3%2C4%2C5%2C6&layerName=GNQ_online_en_474&tcd=30&lang=en
  * Required URL Params
  ** webmap or appid
  * Other Params needed
  ** layerid - layer number in dynamic service
  ** service - map service of selected feature
  ** idvalue - objectid of the selected feature
  ** layerName - id of the layer from AGOL, I need this to add attributes
  ** basemap - basemap to use, default is topo
  ** visibleLayers - visible layers of dynamic layer selected feature belongs too, default is all
  ** tcd - tree cover density
  ** activeSlopeClass - Slope setting
  ** lang - current app language
  * Params in local storage
  ** custom-feature - { geometry: esriGeometry, attributes: object, title: string }
  */

  /**
  * Example call from the app
  appUtils.generateReport({
    selectedFeature: selectedFeature,
    settings: settings,
    canopyDensity: canopyDensity,
    lang: language
  });
  */

  run () {
    //- Get params necessary for the report
    const params = getUrlParams(location.href);
    if (brApp.debug) { console.log(params); }
    //- Add Title, Subtitle, and logo right away
    addHeaderContent(params);
    //- Convert stringified dates back to date objects for analysis
    const { viirsStartDate, viirsEndDate, modisStartDate, modisEndDate } = params;
    params.viirsFrom = moment(new Date(viirsStartDate));
    params.viirsTo = moment(new Date(viirsEndDate));
    params.modisFrom = moment(new Date(modisStartDate));
    params.modisTo = moment(new Date(modisEndDate));
    params.activeFilters = params.activeFilters.split(',');
    params.activeVersions = params.activeVersions.split(',');

    if (opener) { //If this report.html was opened via the map (rather than a url paste)
      updateAnalysisModules(params);
    }

    //- Create the map as soon as possible
    createMap(params);
    //- Get all the necessary info

  }

};
