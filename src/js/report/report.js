import DynamicLayer from 'esri/layers/ArcGISDynamicMapServiceLayer';
import ImageParameters from 'esri/layers/ImageParameters';
import webmercatorUtils from 'esri/geometry/webMercatorUtils';
import analysisKeys from 'constants/AnalysisConstants';
import performAnalysis from 'utils/performAnalysis';
import layerKeys from 'constants/LayerConstants';
import Polygon from 'esri/geometry/Polygon';
import {getUrlParams} from 'utils/params';
import {analysisConfig, layerPanelText} from 'js/config';
import layerFactory from 'utils/layerFactory';
import geojsonUtil from 'utils/arcgis-to-geojson';
import esriRequest from 'esri/request';
import template from 'utils/template';
import appUtils from 'utils/AppUtils';
import locale from 'dojo/date/locale';
import Deferred from 'dojo/Deferred';
import symbols from 'utils/symbols';
import arcgisUtils from 'esri/arcgis/utils';
import all from 'dojo/promise/all';
import Graphic from 'esri/graphic';
import resources from 'resources';
import charts from 'utils/charts';
import number from 'dojo/number';
import text from 'js/languages';
import layersHelper from 'helpers/LayersHelper';

let map;

const getWebmapInfo = function getWebmapInfo (webmap) {
  return esriRequest({
    url: `https://www.arcgis.com/sharing/rest/content/items/${webmap}/data?f=json`,
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
        geometry: new Polygon(esriJson),
        title: 'Custom Analysis',
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

const createLayers = function createLayers (layerPanel, activeLayers, language, params) {
  const {tcLossFrom, tcLossTo, gladFrom, gladTo, terraIFrom, terraITo, tcd, viirsFrom, viirsTo, modisFrom, modisTo} = params;

  //- Organize and order the layers before adding them to the map
  let layers = Object.keys(layerPanel).filter((groupName) => {
    //- remove basemaps and extra layers, extra layers will be added later and basemaps
    //- handled differently elsewhere
    return groupName !== layerKeys.GROUP_BASEMAP && groupName !== layerKeys.EXTRA_LAYERS;
  }).sort((a, b) => {
    //- Sort the groups based on their order property
    return layerPanel[a].order < layerPanel[b].order;
  }).reduce((list, groupName) => {
    //- Flatten them into a single list but before that,
    //- Multiple the order by 100 so I can sort them more easily below, this is because there
    //- order numbers start at 0 for each group, so group 0, layer 1 would have order of 1
    //- while group 1 layer 1 would have order of 100, and I need to integrate with webmap layers
    return list.concat(layerPanel[groupName].layers.map((layer, index) => {
      layer.order = (layerPanel[groupName].order * 100) + (layer.order || index);
      return layer;
    }));
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

    //- remove layers from config that have no url unless they are of type graphic(which have no url)
    //- sort by order from the layer config
    //- return an arcgis layer for each config object
    const esriLayers = uniqueLayers.filter(layer => layer && activeLayers.indexOf(layer.id) > -1 && (layer.url || layer.type === 'graphic')).map((layer) => {
      return layerFactory(layer, language);
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

    layersHelper.updateTreeCoverDefinitions(tcd, map, layerPanel);
    layersHelper.updateAGBiomassLayer(tcd, map);

    if (map.getZoom() > 9) {
      map.setExtent(map.extent, true); //To trigger our custom layers' refresh above certain zoom leves (10 or 11)
    }

    // If there is an error with a particular layer, handle that here
    map.on('layers-add-result', result => {
      const addedLayers = result.layers;
      // Check for Errors
      var layerErrors = addedLayers.filter(layer => layer.error);
      if (layerErrors.length > 0) { console.error(layerErrors); }
      //- Sort the layers, Webmap layers need to be ordered, unfortunately graphics/feature
      //- layers wont be sorted, they always show on top
      uniqueLayers.forEach((layer) => {
        if (map.getLayer(layer.id) && layer.order) {
          map.reorderLayer(map.getLayer(layer.id), layer.order);
        }
      });
    });
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
      addTitleAndAttributes(params, feature, info);
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
      if (window.highchartsPromise.isResolved()) {
        runAnalysis(params, feature);
      } else {
        window.highchartsPromise.then(() => {
          runAnalysis(params, feature);
        });
      }
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
  const { service, visibleLayers } = params;
  //- Add a graphic to the map
  const graphic = new Graphic(new Polygon(feature.geometry), symbols.getCustomSymbol());
  const graphicExtent = graphic.geometry.getExtent();
  map.setExtent(graphicExtent, true);
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
  if (service) {
    const imageParameters = new ImageParameters();
    if (visibleLayers) {
      imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
      imageParameters.layerIds = [visibleLayers];
    }
    imageParameters.format = 'png32';

    const currentLayer = new DynamicLayer(service, {
      imageParameters: imageParameters,
      opacity: 0.8
    });

    map.addLayer(currentLayer);
  }

  // we must split into an array to prevent 'TREE_COVER_LOSS' from matching 'TREE_COVER'
  // when using indexOf. With strings this will match
  params.activeLayers = params.activeLayers.split(',');

  createLayers(resources.layerPanel, params.activeLayers, params.lang, params);

};

const addHeaderContent = function addHeaderContent (params) {
  const {title, logoUrl, logoLinkUrl} = params; // subtitle was in params

  document.getElementById('report-title').innerHTML = title;
  // document.getElementById('report-subtitle').innerHTML = subtitle;
  // above is now using feature title in addTitleAndAttributes
  //- TODO: This should be modified, logoUrl should come from querying the appid instead of the url since that is safer
  document.getElementById('logo').setAttribute('src', logoUrl);
  document.getElementById('logo-anchor').setAttribute('href', logoLinkUrl);
};

const addTitleAndAttributes = function addTitleAndAttributes (params, featureInfo, info) {
  const { layerName, layerid, lang } = params;
  const { webmap, settings } = info;
  const { operationalLayers } = webmap;
  //- Generate the attributes listing and set page title
  if (featureInfo.isCustom) {
    // document.getElementById('feature-title').innerHTML = featureInfo.title;
    document.getElementById('report-subtitle').innerHTML = featureInfo.title;
  } else {
    const operationalLayer = operationalLayers.filter((layer) => layerName.search(layer.id) > -1)[0];
    if (operationalLayer) {
      //- layerid is a string but layer.id is a number, convert layerid to int
      const activeLayer = !operationalLayer.layers ? operationalLayer : operationalLayer.layers.filter((layer) => layer.id === +layerid)[0];
      if (activeLayer) {
        const title = activeLayer.popupInfo.title.replace(/{.*}/, featureInfo.title || 'N/A');
        //- generate rows for each field that is visible in popup for the configured layer
        const fragment = document.createDocumentFragment();
        activeLayer.popupInfo.fieldInfos.filter(fieldInfo => fieldInfo.visible).forEach((fieldInfo) => {
          let fieldValue = featureInfo.attributes[fieldInfo.fieldName];
          //- If it is a date, format that correctly
          if (fieldInfo.format && fieldInfo.format.dateFormat) {
            fieldValue = locale.format(new Date(fieldValue));
          //- If it is a number, format that here, may need a better way
          } else if (fieldInfo.format && fieldInfo.format.places !== undefined) {
            fieldValue = number.format(fieldValue, fieldInfo.format);
          }
          fragment.appendChild(generateRow(
            fieldInfo.label,
            fieldValue
          ));
        });
        if (brApp.debug) { console.log('Popup info: ', activeLayer.popupInfo); }
        //- Add title to the page
        // document.getElementById('feature-title').innerHTML = title;
        document.getElementById('report-subtitle').innerHTML = title;
        //- Add the rows to the DOM
        document.getElementById('popup-content').appendChild(fragment);
      }
    } else { //- Try to get it from the layer config
      const id = layerName.replace(`_${layerid}`, '');
      const config = getLayerConfig(settings.layerPanel, id);
      //- Add title
      document.getElementById('report-subtitle').innerHTML = featureInfo.title || '';
      //- Add some popups if available
      if (config.popup) {
        const fields = config.popup.content[lang];
        const fragment = document.createDocumentFragment();
        fields.forEach((field) => {
          // TODO: Figure out how to support popup modifiers like ACQ_DATE:DateString(hideTime:true)
          const fieldName = field.fieldExpression.search(':') > -1 ?
            field.fieldExpression.split(':')[0] : field.fieldExpression;
          fragment.appendChild(generateRow(
            field.label,
            featureInfo.attributes[fieldName]
          ));
        });
        document.getElementById('popup-content').appendChild(fragment);
      }
    }
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

/**
* Each result set needs to create four dom nodes in a container and render charts into each node
*/
const makeRestorationAnalysisCharts = function makeRestorationAnalysisCharts (results, settings, lang, label) {
  const rootNode = document.getElementById('restoration');
  const prefixKey = analysisKeys.ANALYSIS_GROUP_RESTORATION;
  const prefix = text[lang][prefixKey];
  // Format results for individual charts
  const slopeData = formatRestorationData(results.slope, settings.slopeClasses, settings.slopeColors);
  const lcData = formatRestorationData(results.landCover, settings.landCoverClasses, settings.landCoverColors);
  const popData = formatRestorationData(results.population, settings.populationClasses, settings.populationColors);
  const tcData = formatRestorationData(results.treeCover, settings.treeCoverClasses, settings.treeCoverColors);
  const rainfallData = formatRestorationData(results.rainfall, settings.rainfallClasses, settings.rainfallColors);
  // If any if the results have no data (no length), don't render any content
  // If all of the options are disabled, also return
  if (
    !haveSameBoolState(settings.restorationSlopePotential, slopeData.length) ||
    !haveSameBoolState(settings.restorationLandCover, lcData.length) ||
    !haveSameBoolState(settings.restorationPopulation, popData.length) ||
    !haveSameBoolState(settings.restorationTreeCover, tcData.length) ||
    !haveSameBoolState(settings.restorationRainfall, rainfallData.length) ||
    !(
      settings.restorationSlopePotential && settings.restorationLandCover &&
      settings.restorationPopulation && settings.restorationTreeCover &&
      settings.restorationRainfall
    )
  ) { return; }
  // Create all the necessary dom nodes
  const container = document.createElement('div');
  const labelNode = document.createElement('h3');
  const descriptionNode = document.createElement('h4');
  const tableDescriptionNode = document.createElement('h4');
  const gridNode = document.createElement('div');
  const tableGridNode = document.createElement('div');
  const slopeNode = document.createElement('div');
  const lcNode = document.createElement('div');
  const popNode = document.createElement('div');
  const tcNode = document.createElement('div');
  const rainfallNode = document.createElement('div');
  // Append all the nodes to the root node and add classes etc.
  container.setAttribute('class', 'restoration__module');
  labelNode.setAttribute('class', 'restoration__label');
  descriptionNode.setAttribute('class', 'restoration__description');
  tableDescriptionNode.setAttribute('class', 'restoration__description');
  gridNode.setAttribute('class', 'restoration__grid');
  tableGridNode.setAttribute('class', 'restoration__grid');
  slopeNode.setAttribute('class', 'restoration__chart');
  lcNode.setAttribute('class', 'restoration__chart');
  popNode.setAttribute('class', 'restoration__chart');
  tcNode.setAttribute('class', 'restoration__chart');
  rainfallNode.setAttribute('class', 'restoration__chart');
  labelNode.innerHTML = `${prefix} ${label}`;
  descriptionNode.innerHTML = settings.labels[lang].restorationChartDescription;
  tableDescriptionNode.innerHTML = settings.labels[lang].restorationTableDescription;
  container.appendChild(labelNode);
  container.appendChild(descriptionNode);
  container.appendChild(gridNode);
  container.appendChild(tableDescriptionNode);
  container.appendChild(tableGridNode);
  // Push the container to the DOM
  rootNode.appendChild(container);

  if (settings.restorationSlopePotential) {
    gridNode.appendChild(slopeNode);
    tableGridNode.appendChild(generateRestorationTable(text[lang].ANALYSIS_SLOPE_CHART_HEADER, lang, slopeData));
    charts.makeRestorationBarChart(slopeNode, text[lang].ANALYSIS_SLOPE_CHART_HEADER, slopeData);
  }

  if (settings.restorationLandCover) {
    gridNode.appendChild(lcNode);
    tableGridNode.appendChild(generateRestorationTable(text[lang].ANALYSIS_LAND_COVER_CHART_HEADER, lang, lcData));
    charts.makeRestorationBarChart(lcNode, text[lang].ANALYSIS_LAND_COVER_CHART_HEADER, lcData);
  }

  if (settings.restorationPopulation) {
    gridNode.appendChild(popNode);
    tableGridNode.appendChild(generateRestorationTable(text[lang].ANALYSIS_POPULATION_CHART_HEADER, lang, popData));
    charts.makeRestorationBarChart(popNode, text[lang].ANALYSIS_POPULATION_CHART_HEADER, popData);
  }

  if (settings.restorationTreeCover) {
    gridNode.appendChild(tcNode);
    tableGridNode.appendChild(generateRestorationTable(text[lang].ANALYSIS_TREE_COVER_CHART_HEADER, lang, tcData));
    charts.makeRestorationBarChart(tcNode, text[lang].ANALYSIS_TREE_COVER_CHART_HEADER, tcData);
  }

  if (settings.restorationRainfall) {
    gridNode.appendChild(rainfallNode);
    tableGridNode.appendChild(generateRestorationTable(text[lang].ANALYSIS_RAINFALL_CHART_HEADER, lang, rainfallData));
    charts.makeRestorationBarChart(rainfallNode, text[lang].ANALYSIS_RAINFALL_CHART_HEADER, rainfallData);
  }
};

const runAnalysis = function runAnalysis (params, feature) {
  const lcLayers = resources.layerPanel.GROUP_LC ? resources.layerPanel.GROUP_LC.layers : [];
  const lcdLayers = resources.layerPanel.GROUP_LCD ? resources.layerPanel.GROUP_LCD.layers : [];
  const layerConf = appUtils.getObject(lcLayers, 'id', layerKeys.LAND_COVER);
  const lossLabels = analysisConfig[analysisKeys.TC_LOSS].labels;
  const { tcd, lang, settings, activeSlopeClass, tcLossFrom, tcLossTo, gladFrom, gladTo, terraIFrom, terraITo, viirsFrom, viirsTo, modisFrom, modisTo } = params;
  const geographic = webmercatorUtils.geographicToWebMercator(feature.geometry);
  //- Only Analyze layers in the analysis
  if (appUtils.containsObject(lcdLayers, 'id', layerKeys.TREE_COVER_LOSS)) {
    //- Loss/Gain Analysis
    performAnalysis({
      type: analysisKeys.TC_LOSS_GAIN,
      geometry: feature.geometry,
      settings: settings,
      canopyDensity: tcd,
      language: lang,
      geostoreId: feature.geostoreId,
      tcLossFrom: tcLossFrom,
      tcLossTo: tcLossTo
    }).then((results) => {
      const {lossCounts = [], gainTotal, lossTotal} = results;
      const totalLoss = lossTotal;
      const totalGain = gainTotal;
      //- Generate chart for Tree Cover Loss
      const name = text[lang].ANALYSIS_TC_CHART_NAME;
      const colors = analysisConfig[analysisKeys.TC_LOSS].colors;
      const tcLossNode = document.getElementById('tc-loss');
      const series = [{ name: name, data: lossCounts }];

      if (results.lossCounts && results.lossCounts.length && results.lossCounts.some(c => c > 0)) {
        const chartLabels = lossLabels.slice(tcLossFrom, tcLossTo + 1);
        charts.makeSimpleBarChart(tcLossNode, chartLabels, colors, series);
      } else {
        tcLossNode.remove();
      }
      //- Generate content for Loss and Gain Badges
      //- Loss
      document.querySelector('#total-loss-badge .results__loss-gain--label').innerHTML = text[lang].ANALYSIS_TOTAL_LOSS_LABEL;
      document.querySelector('#total-loss-badge .results__loss-gain--range').innerHTML = `${lossLabels[tcLossFrom]} &ndash; ${lossLabels[tcLossTo]}`;
      document.querySelector('.results__loss--count').innerHTML = totalLoss;
      document.getElementById('total-loss-badge').classList.remove('hidden');
      //- Gain
      document.querySelector('#total-gain-badge .results__loss-gain--label').innerHTML = text[lang].ANALYSIS_TOTAL_GAIN_LABEL;
      document.querySelector('#total-gain-badge .results__loss-gain--range').innerHTML = text[lang].ANALYSIS_TOTAL_GAIN_RANGE;
      document.querySelector('.results__gain--count').innerHTML = totalGain;
      document.getElementById('total-gain-badge').classList.remove('hidden');
    });
  } else {
    const lossChart = document.getElementById('tc-loss');
    const lossBadge = document.getElementById('total-loss-badge');
    const gainBadge = document.getElementById('total-gain-badge');
    lossChart.remove();
    lossBadge.remove();
    gainBadge.remove();
  }

  if (settings.landCover && layerConf) {
    performAnalysis({
      type: analysisKeys.LC_LOSS,
      geometry: geographic,
      settings: settings,
      canopyDensity: tcd,
      language: lang
    }).then((results) => {
      const configuredColors = layerConf.colors;
      const labels = layerConf.classes[lang];
      const node = document.getElementById('lc-loss');
      const { counts, encoder, error } = results;

      if (error) {
        node.remove();
        return;
      }

      const Xs = encoder.A;
      const Ys = encoder.B;
      const chartInfo = charts.formatSeriesWithEncoder({
        colors: configuredColors,
        encoder: encoder,
        counts: counts,
        labels: labels,
        Xs: Xs,
        Ys: Ys
      });

      if (chartInfo.series && chartInfo.series.length) {
        charts.makeTotalLossBarChart(node, lossLabels, chartInfo.colors, chartInfo.series);
      } else {
        node.remove();
      }
    });

    //- Land Cover Composition Analysis
    performAnalysis({
      type: analysisKeys.LCC,
      geometry: geographic,
      settings: settings,
      canopyDensity: tcd,
      language: lang
    }).then((results) => {
      const node = document.getElementById('lc-composition');

      const { error } = results;

      if (error) {
        node.remove();
        return;
      }

      if (results.counts && results.counts.length) {
        const series = charts.formatCompositionAnalysis({
          colors: layerConf.colors,
          name: text[lang].ANALYSIS_LCC_CHART_NAME,
          labels: layerConf.classes[lang],
          counts: results.counts
        });

        charts.makeCompositionPieChart(node, series);
      } else {
        node.remove();
      }
    });
  } else {
    const lossNode = document.getElementById('lc-loss');
    const compositionNode = document.getElementById('lc-composition');
    lossNode.remove();
    compositionNode.remove();
  }

  if (settings.aboveGroundBiomass) {
    //- Carbon Stocks with Loss Analysis
    performAnalysis({
      type: analysisKeys.BIO_LOSS,
      geometry: feature.geometry,
      settings: settings,
      canopyDensity: tcd,
      language: lang,
      geostoreId: feature.geostoreId
    }).then((results) => {
      const { labels, colors } = analysisConfig[analysisKeys.BIO_LOSS];
      const { data } = results;
      const node = document.getElementById('bio-loss');
      const {series, grossLoss, grossEmissions} = charts.formatSeriesForBiomassLoss({
        data: data.attributes,
        lossColor: colors.loss,
        carbonColor: colors.carbon,
        lossName: text[lang].ANALYSIS_CARBON_LOSS,
        carbonName: 'MtCO2'
      });

      if (!series.some(s => s.data.some(d => d > 0))) {
        node.remove();
        return;
      }

      charts.makeBiomassLossChart(node, {
        series,
        categories: labels
      }, (chart) => {
        const content = chart.renderer.html(
          `<div class='results__legend-container'>` +
            `<span>${text[lang].ANALYSIS_CARBON_LOSS}</span>` +
            `<span>${Math.round(grossLoss)} Ha</span>` +
          `</div>` +
          `<div class='results__legend-container'>` +
            `<span>${text[lang].ANALYSIS_CARBON_EMISSION}</span>` +
            `<span>${Math.round(grossEmissions)}m MtCO2</span>` +
          `</div>`
        );
        content.element.className = 'result__biomass-totals';
        content.add();

      });
    });
  } else {
    const node = document.getElementById('bio-loss');
    node.remove();
  }

  if (settings.intactForests) {
    //- Intact Forest with Loss Analysis
    performAnalysis({
      type: analysisKeys.INTACT_LOSS,
      geometry: geographic,
      settings: settings,
      canopyDensity: tcd,
      language: lang
    }).then((results) => {
      const configuredColors = analysisConfig[analysisKeys.INTACT_LOSS].colors;
      const labels = text[lang].ANALYSIS_IFL_LABELS;
      const node = document.getElementById('intact-loss');
      const { counts, encoder, error } = results;

      if (error) {
        node.remove();
        return;
      }

      const Xs = encoder.A;
      const Ys = encoder.B;
      const chartInfo = charts.formatSeriesWithEncoder({
        colors: configuredColors,
        encoder: encoder,
        counts: counts,
        labels: labels,
        isSimple: true,
        Xs: Xs,
        Ys: Ys
      });

      if (chartInfo.series && chartInfo.series.length && chartInfo.series[0].data.length) {
        charts.makeTotalLossBarChart(node, lossLabels, chartInfo.colors, chartInfo.series);
      } else {
        node.remove();
      }

    });
  } else {
    const node = document.getElementById('intact-loss');
    node.remove();
  }
  if (settings.viirsFires) {
    //- Fires Analysis
    performAnalysis({
      type: analysisKeys.VIIRS_FIRES,
      geometry: feature.geometry,
      settings: settings,
      canopyDensity: tcd,
      language: lang,
      viirsFrom: viirsFrom,
      viirsTo: viirsTo
    }).then((results) => {

      const node = document.getElementById('viirs-badge');

      const { error } = results;
      if (error) {
        node.remove();
        return;
      }

      document.querySelector('.results__viirs-pre').innerHTML = text[lang].ANALYSIS_FIRES_PRE;
      document.querySelector('.results__viirs-count').innerHTML = results.fireCount;
      document.querySelector('.results__viirs-active').innerHTML = text[lang].ANALYSIS_FIRES_ACTIVE + ' (VIIRS)';
      document.querySelector('.results__viirs-post').innerHTML = `${text[lang].TIMELINE_START}${viirsFrom.toLocaleDateString()}<br/>${text[lang].TIMELINE_END}${viirsTo.toLocaleDateString()}`;
      node.classList.remove('hidden');
    });
  } else {
    const node = document.getElementById('viirs-badge');
    node.remove();
  }

  if (settings.modisFires) {
    //- Fires Analysis
    performAnalysis({
      type: analysisKeys.MODIS_FIRES,
      geometry: feature.geometry,
      settings: settings,
      canopyDensity: tcd,
      language: lang,
      modisFrom: modisFrom,
      modisTo: modisTo
    }).then((results) => {

      const node = document.getElementById('modis-badge');

      const { error } = results;
      if (error) {
        node.remove();
        return;
      }

      document.querySelector('.results__modis-pre').innerHTML = text[lang].ANALYSIS_FIRES_PRE;
      document.querySelector('.results__modis-count').innerHTML = results.fireCount;
      document.querySelector('.results__modis-active').innerHTML = text[lang].ANALYSIS_FIRES_ACTIVE + ' (MODIS)';
      document.querySelector('.results__modis-post').innerHTML = `${text[lang].TIMELINE_START}${modisFrom.toLocaleDateString()}<br/>${text[lang].TIMELINE_END}${modisTo.toLocaleDateString()}`;
      node.classList.remove('hidden');
    });
  } else {
    const node = document.getElementById('modis-badge');
    node.remove();
  }

  //- Mangroves Loss
  if (settings.mangroves) {
    performAnalysis({
      type: analysisKeys.MANGROVE_LOSS,
      geometry: geographic,
      settings: settings,
      canopyDensity: tcd,
      language: lang
    }).then((results) => {
      const node = document.getElementById('mangroves');
      const colors = analysisConfig[analysisKeys.MANGROVE_LOSS].colors;
      const labels = text[lang].ANALYSIS_MANGROVE_LABELS;
      const { counts, encoder } = results;
      const Xs = encoder.A;
      const Ys = encoder.B;
      const chartInfo = charts.formatSeriesWithEncoder({
        colors: colors,
        encoder: encoder,
        counts: counts,
        labels: labels,
        isSimple: true,
        Xs: Xs,
        Ys: Ys
      });

      if (chartInfo.series && chartInfo.series.length && chartInfo.series[0].data.length) {
        charts.makeTotalLossBarChart(node, lossLabels, chartInfo.colors, chartInfo.series);
      } else {
        node.remove();
      }
    });

  } else {
    const node = document.getElementById('mangroves');
    node.remove();
  }

  //- SAD Alerts
  if (settings.sadAlerts) {
    performAnalysis({
      type: analysisKeys.SAD_ALERTS,
      geometry: feature.geometry,
      settings: settings,
      canopyDensity: tcd,
      language: lang
    }).then((results) => {
      const node = document.getElementById('sad-alerts');
      const colors = analysisConfig[analysisKeys.SAD_ALERTS].colors;
      const names = text[lang].ANALYSIS_SAD_ALERT_NAMES;
      const {alerts, error} = results;

      if (error) {
        node.remove();
        return;
      }

      const {categories, series} = charts.formatSadAlerts({ alerts, colors, names });
      if (categories.length) {
        //- Tell the second series to use the second axis
        series[0].yAxis = 1;
        charts.makeDualAxisTimeSeriesChart(node, { series, categories });
      } else {
        node.remove();
      }
    });

  } else {
    const node = document.getElementById('sad-alerts');
    node.remove();
  }

  //- GLAD Alerts
  if (settings.gladAlerts) {
    performAnalysis({
      type: analysisKeys.GLAD_ALERTS,
      geometry: feature.geometry,
      settings: settings,
      canopyDensity: tcd,
      language: lang,
      geostoreId: feature.geostoreId,
      gladFrom: new Date(gladFrom),
      gladTo: new Date(gladTo)
    }).then((results) => {
      const node = document.getElementById('glad-alerts');
      const name = text[lang].ANALYSIS_GLAD_ALERT_NAME;

      const { error } = results;
      if (error || results.length === 0) {
        node.remove();
        return;
      }

      charts.makeTimeSeriesCharts(node, { data: results, name });
    });
  } else {
    const node = document.getElementById('glad-alerts');
    node.remove();
  }

  //- Terra-I Alerts
  if (settings.terraIAlerts) {
    performAnalysis({
      type: analysisKeys.TERRA_I_ALERTS,
      geometry: geographic,
      settings: settings,
      canopyDensity: tcd,
      geostoreId: feature.geostoreId,
      language: lang,
      terraIFrom: new Date(terraIFrom),
      terraITo: new Date(terraITo)
    }).then((results) => {
      const node = document.getElementById('terrai-alerts');
      const name = text[lang].ANALYSIS_TERRA_I_ALERT_NAME;

      const { error } = results;
      if (error || results.length === 0) {
        node.remove();
        return;
      }

      charts.makeTimeSeriesCharts(node, { data: results, name });
    });
  } else {
    const node = document.getElementById('terrai-alerts');
    node.remove();
  }

  if (settings.restorationModule) {
    const infos = settings && settings.labels && settings.labels[lang] && settings.labels[lang].restorationOptions || [];
    // Analyze each configured restoration option
    const requests = infos.map((info) => {
      return performAnalysis({
        type: info.id,
        geometry: feature.geometry,
        settings: settings,
        canopyDensity: tcd,
        language: lang
      });
    });

    all(requests).then((results) => {
      results.forEach((result, index) => {
        makeRestorationAnalysisCharts(result, settings, lang, infos[index].label);
      });
      //- Show the results
      document.getElementById('restoration').classList.remove('hidden');
    });

    // Also perform the slope analysis
    if (settings.restorationSlope) {
      performAnalysis({
        type: analysisKeys.SLOPE,
        geometry: feature.geometry,
        settings: settings,
        canopyDensity: tcd,
        activeSlopeClass: activeSlopeClass,
        language: lang
      }).then((results) => {
        const container = document.getElementById('slope');
        const chartNode = document.getElementById('slope-chart');
        const tableNode = document.getElementById('slope-table');
        const titleNode = document.getElementById('slope-analysis-header');
        const descriptionNode = document.getElementById('slope-analysis-description');
        const {counts = []} = results;
        // const labels = counts.map((v, index) => text[lang].ANALYSIS_SLOPE_OPTION + (index + 1));
        const labels = settings.labels[lang].slopeAnalysisPotentialOptions;
        const colors = settings.slopeAnalysisPotentialColors;
        const tooltips = settings.labels[lang].slopeAnalysisPotentialOptions;
        //- Create a  copy of the counts since I need to add data to it for the table below
        const series = [{ data: counts.slice() }];
        // Render the chart, table, title, description, and unhide the container
        container.classList.remove('hidden');
        titleNode.innerHTML = text[lang].REPORT_SLOPE_TITLE;
        descriptionNode.innerHTML = settings.labels[lang].slopeDescription;
        charts.makeSlopeBarChart(chartNode, labels, colors, tooltips, series);
        //- Push headers into values and labels for the table and totals.
        const total = counts.reduce((a, b) => a + b, 0);
        labels.unshift(text[lang].REPORT_SLOPE_TABLE_TYPE);
        counts.unshift(text[lang].REPORT_SLOPE_TABLE_VALUE);
        labels.push(text[lang].REPORT_TABLE_TOTAL);
        counts.push(total);
        tableNode.appendChild(generateSlopeTable(labels, counts));
      });
    } else {
      const element = document.getElementById('slope');
      if (element) { element.remove(); }
    }
  } else {
    const node = document.getElementById('restoration');
    node.remove();
  }

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
    params.viirsFrom = new Date(viirsStartDate);
    params.viirsTo = new Date(viirsEndDate);
    params.modisFrom = new Date(modisStartDate);
    params.modisTo = new Date(modisEndDate);

    //- Create the map as soon as possible
    createMap(params);
    //- Get all the necessary info

  }

};
