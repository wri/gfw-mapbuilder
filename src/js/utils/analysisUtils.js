import webmercatorUtils from 'esri/geometry/webMercatorUtils';
import geojsonUtil from 'utils/arcgis-to-geojson';
import QueryTask from 'esri/tasks/QueryTask';
import {analysisConfig} from 'js/config';
import analysisKeys from 'constants/AnalysisConstants';
import esriRequest from 'esri/request';
import Query from 'esri/tasks/query';
import Deferred from 'dojo/Deferred';
import utils from 'utils/AppUtils';
import lang from 'dojo/_base/lang';
import all from 'dojo/promise/all';
import layersHelper from 'helpers/LayersHelper';
import text from 'js/languages';

const INVALID_IMAGE_SIZE = 'The requested image exceeds the size limit.';
const OP_MULTIPLY = 3;
const OP_PLUS = 1;

/**
* check if the error is for an invalid image size so we can retry the request with a
* larger pixel size
*/
const errorIsInvalidImageSize = function errorIsInvalidImageSize (error) {
  return (
    error.code === 400 &&
    error.details &&
    error.details.length > 0 &&
    error.details[0] === INVALID_IMAGE_SIZE
  );
};

/**
* Given a value, generate the input/output values necessary for the remap function
* valid values are 1, 2, or 3
*/
const getSlopeInputOutputValues = function (value) {
  return {
    input: value === 3 ? [0, 3, 3, 3] : [0, value, value, value, value + 1, 3],
    output: value === 3 ? [0, 1] : [0, 1, 0]
  };
};

/**
* Group of formatting functions for results
*/
const formatters = {
  sadAlerts: (response) => {
    let date, month, year, type, area;
    const {features} = response;
    const bin = {};
    /**
    * Bin Structure
    * {
    *   year: {
    *     month: {
    *       type: total
    *     }
    *   }
    * }
    */
    features.forEach((feature) => {
      const st_area = analysisConfig.SAD_ALERTS.outFields[2];
      date = new Date(feature.attributes.date);
      year = date.getFullYear();
      month = date.getMonth();
      type = feature.attributes.data_type;
      area = feature.attributes[st_area];

      if (bin[year] && bin[year][month] && bin[year][month][type]) {
        bin[year][month][type] += area;
      } else if (bin[year] && bin[year][month]) {
        bin[year][month][type] = area;
      } else if (bin[year]) {
        bin[year][month] = {};
        bin[year][month][type] = area;
      } else {
        bin[year] = {};
        bin[year][month] = {};
        bin[year][month][type] = area;
      }
    });

    return {
      alerts: bin
    };
  },
  gladAlerts: function (year, counts, startDate = 1) {
    var results = [];

    for (let i = startDate; i < counts.length; i++) {
      results.push([new Date(year, 0, i).getTime(), counts[i] || 0]);
    }

    return results;
  },
  terraIAlerts: function (counts) {
    var results = [];
    for (let i = 1; i < counts.length; i++) {
      if (counts[i]) {
        const {year, day} = utils.getDateFromGridCode(i);
        results.push([new Date(year, 0, day).getTime(), counts[i]]);
      }
    }
    return results;
  },
  getCounts: (response, pixelSize, noSlice) => {
    const {histograms} = response;
    let counts = histograms && histograms.length === 1 ? histograms[0].counts : [];
    counts = counts.map((value) => ((value * Math.pow(pixelSize, 2) / 10000)));
    //- Normalize the results based on the pixelSize, then remove the first count as it is nulls
    return {
      counts: noSlice ? counts : counts.slice(1)
    };
  },
  getRestorationValues: (response) => {
    const {histograms} = response;
    let counts = histograms && histograms.length === 1 ? histograms[0].counts : [];
    //- Convert the pixel values to Hectares, Math provided by Thomas Maschler
    counts = counts.map((value) => value * 0.09);
    return { counts };
  }
};

/**
* Group of functions for generating rendering and mosaic rules
*/
const rules = {
  mosaicRule: (raster) => {
    return {
      'mosaicMethod': 'esriMosaicLockRaster',
      'mosaicOperation': 'MT_FIRST',
      'lockRasterIds': [raster],
      'ascending': true
    };
  },
  arithmetic: (rasterA, rasterB, operation) => {
    return {
      'rasterFunction': 'Arithmetic',
      'rasterFunctionArguments': {
        'Raster': rasterA,
        'Raster2': rasterB,
        'Operation': operation
      }
    };
  },
  remap: (raster, inputRange, outputValues) => {
    return {
      'rasterFunction': 'Remap',
      'rasterFunctionArguments': {
        'InputRanges': inputRange,
        'OutputValues': outputValues,
        'Raster': raster,
        'AllowUnmatched': false
      }
    };
  }
};

const computeHistogram = (url, content, success, fail) => {
  //- Format the content properly
  if (content.geometry) { content.geometry = JSON.stringify(content.geometry); }
  if (content.renderingRule) { content.renderingRule = JSON.stringify(content.renderingRule); }
  if (content.mosaicRule) { content.mosaicRule = JSON.stringify(content.mosaicRule); }
  //- Set some defaults if they are not set
  content.geometryType = content.geometryType || 'esriGeometryPolygon';
  content.f = content.f || 'json';

  if (success && fail) {
    esriRequest({
      url: `${url}/computeHistograms`,
      callbackParamName: 'callback',
      content: content,
      handleAs: 'json',
      timeout: 30000
    }, { usePost: true}).then(success, fail);
  } else {
    return esriRequest({
      url: `${url}/computeHistograms`,
      callbackParamName: 'callback',
      content: content,
      handleAs: 'json',
      timeout: 30000
    }, { usePost: true});
  }
};

/**
* Encoder class to help with complex raster
*/
/**
* Encoder class to help with complex raster functions
*/
class Encoder {

  constructor (rasterBoundsA, rasterBoundsB) {
    this.A = this.fromBounds(rasterBoundsA);
    this.B = this.fromBounds(rasterBoundsB);
  }

  /* Helper function */
  fromBounds = (bounds) => {
    const result = [], end = bounds[1];
    let current = bounds[0];
    for (;current <= end; current++) {
      result.push(current);
    }
    return result;
  };

  /* Main Functions */
  //- Get a unique value for two inputs
  encode (a, b) {
    return this.B.length * a + b;
  }
  //- Get values back from a known input value
  decode (value) {
    const b = value % this.B.length;
    const a = (value - b) / this.B.length;
    return [a, b];
  }

  getSimpleRule (rasterA, rasterB, canopyDensity) {
    const tcd = analysisConfig.tcd;
    const tcdRemap = rules.remap(tcd.id, tcd.inputRanges(canopyDensity), tcd.outputValues);
    const outputRule = rules.arithmetic(
      tcdRemap,
      rules.arithmetic(rasterA, rasterB, OP_MULTIPLY),
      OP_MULTIPLY
    );
    //- We need to add an output pixel type to Raster2, need to make sure we need this as I cant remember why it's needed
    outputRule.rasterFunctionArguments.Raster2.outputPixelType = 'U8';
    return outputRule;
  }

  getRule (rasterA, rasterB, canopyDensity) {
    const tcd = analysisConfig.tcd;
    const remapRule = rules.remap(rasterA, [this.A[0], (this.A[this.A.length - 1]) + 1], [this.B.length]);
    const tcdRemap = rules.remap(tcd.id, tcd.inputRanges(canopyDensity), tcd.outputValues);
    const outputRule = rules.arithmetic(
      tcdRemap,
      rules.arithmetic(
        rules.arithmetic(remapRule, rasterA, OP_MULTIPLY),
        rasterB,
        OP_PLUS
      ),
      OP_MULTIPLY
    );
    //- We need to add an output pixel type to Raster2, need to make sure we need this as I cant remember why it's needed
    outputRule.rasterFunctionArguments.Raster2.outputPixelType = 'U8';
    return outputRule;
  }

}

export default {
  /**
  * Fetch and format fire results
  */
  getFireCount: (url, geometry, startDate, endDate, language) => {
    const queryTask = new QueryTask(url);
    const promise = new Deferred();
    const query = new Query();
    const layerDef = layersHelper.generateFiresQuery(startDate, endDate);
    query.geometry = geometry;
    query.returnGeometry = false;
    query.outFields = [''];
    query.where = layerDef;
    queryTask.executeForCount(query).then(function (response) {
      promise.resolve({fireCount: response});
    }, (error) => {
      console.error(error);
      promise.resolve({error: error, message: text[language].ANALYSIS_ERROR_FIRE_COUNT});
    });
    return promise;
  },

  /**
  * Get SAD Alerts and format results
  */
  getSADAlerts: (config, geometry, language) => {
    const queryTask = new QueryTask(config.url);
    const promise = new Deferred();
    const query = new Query();
    query.geometry = geometry;
    query.returnGeometry = false;
    query.outFields = config.outFields;
    query.where = '1 = 1';
    queryTask.execute(query).then(function (response) {
      promise.resolve(formatters.sadAlerts(response));
    }, (error) => {
      console.error(error);
      promise.resolve({error: error, message: text[language].ANALYSIS_ERROR_SAD});
    });
    return promise;
  },

  getGLADAlerts: function (config, geostoreId, gladFrom, gladTo, language) {
    const promise = new Deferred();
    const gladConfig = analysisConfig[analysisKeys.GLAD_ALERTS];
    const startDate = gladFrom.toISOString().split('T')[0];
    const endDate = gladTo.toISOString().split('T')[0];

    const gladData = {
      geostore: geostoreId,
      period: `${startDate},${endDate}`,
      aggregate_values: 'True',
      aggregate_by: 'day'
    };
    esriRequest({
      url: gladConfig.analysisUrl,
      callbackParamName: 'callback',
      content: gladData,
      handleAs: 'json',
      timeout: 30000
    }, { usePost: false }).then(gladResult => {
      const alerts = this.cleanAlerts(gladResult.data.attributes);
      promise.resolve(alerts || []);
    }, err => {
      console.error(err);
      promise.resolve({ error: err, message: text[language].ANALYSIS_ERROR_GLAD });
    });

    return promise;
  },

  getTerraIAlerts: function (config, geostoreId, terraIFrom, terraITo, language) {

    const promise = new Deferred();
    const terraIConfig = analysisConfig[analysisKeys.TERRA_I_ALERTS];
    const startDate = terraIFrom.toISOString().split('T')[0];
    const endDate = terraITo.toISOString().split('T')[0];

    const terraIData = {
      geostore: geostoreId,
      period: `${startDate},${endDate}`,
      aggregate_values: 'True',
      aggregate_by: 'day'
    };
    esriRequest({
      url: terraIConfig.analysisUrl,
      callbackParamName: 'callback',
      content: terraIData,
      handleAs: 'json',
      timeout: 30000
    }, { usePost: false }).then(terraIResult => {
      const alerts = this.cleanAlerts(terraIResult.data.attributes);
      promise.resolve(alerts || []);
    }, err => {
      console.error(err);
      promise.resolve({ error: err, message: text[language].ANALYSIS_ERROR_TERRA_I });
    });

    return promise;
  },

  getCountsWithDensity: function (geostoreId, canopyDensity, tcLossFrom, tcLossTo) {
    const deferred = new Deferred();
    const tcLossGainConfig = analysisConfig[analysisKeys.TC_LOSS_GAIN];
    const yearsArray = analysisConfig[analysisKeys.TC_LOSS].labels;

    const lossGainData = {
      geostore: geostoreId,
      period: `${yearsArray[tcLossFrom]}-01-01,${yearsArray[tcLossTo]}-12-31`,
      thresh: canopyDensity,
      aggregate_values: false
    };
    esriRequest({
      url: tcLossGainConfig.analysisUrl,
      callbackParamName: 'callback',
      content: lossGainData,
      handleAs: 'json',
      timeout: 30000
    }, { usePost: false }).then(lossGainResult => {
      deferred.resolve(lossGainResult || []);
    }, err => {
      console.error(err);
      deferred.resolve({ error: err });
    });

    return deferred;
  },

  getMosaic: (language, lockRaster, geometry, url) => {
    const promise = new Deferred();
    const {imageService, pixelSize} = analysisConfig;
    const content = {
      pixelSize: pixelSize,
      geometry: geometry,
      mosaicRule: rules.mosaicRule(lockRaster)
    };

    const success = (response) => {
      promise.resolve(formatters.getCounts(response, content.pixelSize));
    };

    const failure = (error) => {
      if (errorIsInvalidImageSize(error) && content.pixelSize !== 500) {
        content.pixelSize = 500;
        computeHistogram(url || imageService, content, success, failure);
      } else {
        promise.resolve({error: error, message: text[language].ANALYSIS_ERROR_LAND_COVER_COMPOSITION});
      }
    };

    computeHistogram(url || imageService, content, success, failure);
    return promise;
  },

  getBiomassLoss: function (geostoreId, canopyDensity, language) {
    const deferred = new Deferred();
    const biomassConfig = analysisConfig[analysisKeys.BIO_LOSS];

    const biomassData = {
      geostore: geostoreId,
      period: `${biomassConfig.startDate}-01-01,${biomassConfig.endDate}-12-31`,
      thresh: canopyDensity
    };
    esriRequest({
      url: biomassConfig.analysisUrl,
      callbackParamName: 'callback',
      content: biomassData,
      handleAs: 'json',
      timeout: 30000
    }, { usePost: false }).then(biomassResult => {
      deferred.resolve(biomassResult || []);
    }, err => {
      console.error(err);
      deferred.resolve({ error: err, message: text[language].ANALYSIS_ERROR_BIO_LOSS });
    });

    return deferred;
  },

  getCrossedWithLoss: (config, lossConfig, geometry, options) => {
    const promise = new Deferred();
    const {imageService, pixelSize} = analysisConfig;
    const encoder = new Encoder(lossConfig.bounds, config.bounds);
    const rasterId = config.remap ? config.remap : config.id;
    const renderingRule = options.simple ?
                          encoder.getSimpleRule(lossConfig.id, rasterId, options.canopyDensity) :
                          encoder.getRule(lossConfig.id, rasterId, options.canopyDensity);

    const content = {
      geometry: geometry,
      pixelSize: pixelSize,
      renderingRule: renderingRule
    };

    const success = (response) => {
      promise.resolve({
        counts: formatters.getCounts(response, content.pixelSize, true).counts,
        encoder: encoder,
        options: options
      });
    };

    const failure = (error) => {
      if (errorIsInvalidImageSize(error) && content.pixelSize !== 500) {
        content.pixelSize = 500;
        computeHistogram(imageService, content, success, failure);
      } else {
        console.error(error);
        promise.resolve({ error });
      }
    };

    computeHistogram(imageService, content, success, failure);
    return promise;
  },

  registerGeom: (geometry) => {
    const deferred = new Deferred();
    const geographic = webmercatorUtils.webMercatorToGeographic(geometry);
    const geojson = geojsonUtil.arcgisToGeoJSON(geographic);

    const geoStore = {
      'geojson': {
        'type': 'FeatureCollection',
        'features': [{
          'type': 'Feature',
          'properties': {},
          'geometry': geojson
        }]
      }
    };

    const content = JSON.stringify(geoStore);

    const http = new XMLHttpRequest();
    const url = analysisConfig.apiUrl;
    const params = content;

    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/json');

    http.onreadystatechange = () => {
      if (http.readyState === 4 && http.status === 200) {
        deferred.resolve(JSON.parse(http.responseText));
      } else if (http.readyState === 4) {
        deferred.resolve({ error: 'There was an error while registering the shape in the geostore', status: http.status });
      }
    };
    http.send(params);
    return deferred;
  },

  getSlope: (url, slopeValue, raster, restorationId, geometry, language) => {
    const values = getSlopeInputOutputValues(slopeValue);
    const {pixelSize} = analysisConfig;
    const promise = new Deferred();
    //- Get rendering rule
    const renderingRule = rules.arithmetic(
      rules.remap(raster, values.input, values.output),
      restorationId,
      OP_MULTIPLY
    );

    const content = {
      pixelSize: pixelSize,
      geometry: geometry,
      renderingRule: renderingRule
    };

    const success = (response) => {
      //- get the counts and remove the no data value, which is the first value
      const counts = formatters.getCounts(response, content.pixelSize).counts;
      promise.resolve({
        counts: counts.slice(1)
      });
    };

    const failure = (error) => {
      if (errorIsInvalidImageSize(error) && content.pixelSize !== 500) {
        content.pixelSize = 500;
        computeHistogram(url, content, success, failure);
      } else {
        promise.resolve({ error, message: text[language].ANALYSIS_ERROR_SLOPE });
      }
    };

    computeHistogram(url, content, success, failure);
    return promise;
  },

  cleanAlerts: (results) => {
    let alerts = [];
    const sortedYears = Object.keys(results)
      .filter(key => !isNaN(Number(key)))
      .map(year => Number(year))
      .sort((a, b) => a - b);

    sortedYears.forEach((year, index) => {
        const alertsTmp = [];
        const sortedKeys = results[year] ? Object.keys(results[year]).map(key => Number(key)) : [];

        if (sortedKeys.length === 0) { return; }

        if (sortedYears.length === 1) { // if there is only one year selected we need start and end dates
          const firstAlertOfYear = sortedKeys.sort((a, b) => a - b)[0];
          const startDate = firstAlertOfYear - 10;
          const lastAlertOfYear = sortedKeys.sort((a, b) => b - a)[0];
          const endDate = lastAlertOfYear + 10;

          for (let i = 0; i <= endDate; i++) {

            if (results[year].hasOwnProperty(i)) {
              alertsTmp.push(results[year][i]);
            } else {
              alertsTmp.push(0);
            }
          }

          alerts = alerts.concat(formatters.gladAlerts(year, alertsTmp, startDate));

        } else { // if there is more than one year

          if (index === 0) { // if it's the first year

            const firstAlertOfYear = sortedKeys.sort((a, b) => a - b)[0];
            const startDate = firstAlertOfYear - 10;

            for (let j = 0; j < 365; j++) {
              if (results[year].hasOwnProperty(j)) {
                alertsTmp.push(results[year][j]);
              } else {
                alertsTmp.push(0);
              }
            }

            alerts = alerts.concat(formatters.gladAlerts(year, alertsTmp, startDate));

          } else if (index === sortedYears.length - 1) { // if it's the last year

            const lastAlertOfYear = sortedKeys.sort((a, b) => b - a)[0];
            const endDate = lastAlertOfYear + 10;

            for (let k = 0; k <= endDate; k++) {
              if (results[year].hasOwnProperty(k)) {
                alertsTmp.push(results[year][k]);
              } else {
                alertsTmp.push(0);
              }
            }

            alerts = alerts.concat(formatters.gladAlerts(year, alertsTmp));

          } else { // if it's any year other than the first or last

            for (let l = 0; l < 365; l++) {
              if (results[year].hasOwnProperty(l)) {
                alertsTmp.push(results[year][l]);
              } else {
                alertsTmp.push(0);
              }
            }

            alerts = alerts.concat(formatters.gladAlerts(year, alertsTmp));
          }
        }
    });
    return alerts;
  },

  getRestoration: (url, rasterId, geometry, settings) => {
    const promise = new Deferred();
    const {pixelSize, restoration} = analysisConfig;
    const content = { pixelSize, geometry };
    //- Generate rendering rules for all the options
    const lcContent = lang.delegate(content, {renderingRule: rules.arithmetic(restoration.landCoverId, rasterId, OP_MULTIPLY)});
    const tcContent = lang.delegate(content, {renderingRule: rules.arithmetic(restoration.treeCoverId, rasterId, OP_MULTIPLY)});
    const popContent = lang.delegate(content, {renderingRule: rules.arithmetic(restoration.populationId, rasterId, OP_MULTIPLY)});
    const slopeContent = lang.delegate(content, {renderingRule: rules.arithmetic(restoration.slopeId, rasterId, OP_MULTIPLY)});
    const rainfallContent = lang.delegate(content, {renderingRule: rules.arithmetic(restoration.rainfallId, rasterId, OP_MULTIPLY)});
    const promises = {};

    if (settings.restorationLandCover) {
      promises.LC = computeHistogram(url, lcContent);
    }

    if (settings.restorationPopulation) {
      promises.TC = computeHistogram(url, tcContent);
    }

    if (settings.restorationTreeCover) {
      promises.POP = computeHistogram(url, popContent);
    }

    if (settings.restorationSlopePotential) {
      promises.SLOPE = computeHistogram(url, slopeContent);
    }

    if (settings.restorationRainfall) {
      promises.RAINFALL = computeHistogram(url, rainfallContent);
    }

    all(promises).always((results) => {
      //- the first value is No Data, don't slice as the charts formatting function will remove this
      if (!results.error) {
        promise.resolve({
          landCover: results.LC ? formatters.getCounts(results.LC, content.pixelSize, true).counts : [0],
          treeCover: results.TC ? formatters.getCounts(results.TC, content.pixelSize, true).counts : [0],
          population: results.POP ? formatters.getCounts(results.POP, content.pixelSize, true).counts : [0],
          slope: results.SLOPE ? formatters.getCounts(results.SLOPE, content.pixelSize, true).counts : [0],
          rainfall: results.RAINFALL ? formatters.getCounts(results.RAINFALL, content.pixelSize, true).counts : [0]
        });
      } else {
        promise.resolve(results);
      }
    });

    return promise;
  }

};
