import webmercatorUtils from 'esri/geometry/webMercatorUtils';
import geojsonUtil from 'utils/arcgis-to-geojson';
import QueryTask from 'esri/tasks/QueryTask';
import {analysisConfig} from 'js/config';
import esriRequest from 'esri/request';
import Query from 'esri/tasks/query';
import Deferred from 'dojo/Deferred';
import utils from 'utils/AppUtils';
import lang from 'dojo/_base/lang';
import all from 'dojo/promise/all';

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
  fires: (response) => {
    return {
      fireCount: response.features ? response.features.length : 0
    };
  },
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
  gladAlerts: function (year, counts) {
    var results = [];
    for (let i = 0; i < counts.length; i++) {
      results.push([new Date(year, 0, i + 1).getTime(), counts[i] || 0]);
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
  getFireCount: (url, geometry) => {
    const queryTask = new QueryTask(url);
    const promise = new Deferred();
    const query = new Query();
    query.geometry = geometry;
    query.returnGeometry = false;
    query.outFields = [''];
    query.where = '1 = 1';
    queryTask.execute(query).then(function (response) {
      promise.resolve(formatters.fires(response));
    }, (error) => {
      promise.resolve(formatters.fires(error));
    });
    return promise;
  },

  /**
  * Get SAD Alerts and format results
  */
  getSADAlerts: (config, geometry) => {
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
      promise.resolve(formatters.sadAlerts(error));
    });
    return promise;
  },

  getGLADAlerts: function (config, geometry) {
    const promise = new Deferred();
    all([
      this.getMosaic(config.lockrasters['2015'], geometry, config.url),
      this.getMosaic(config.lockrasters['2016'], geometry, config.url),
      this.getMosaic(config.lockrasters['2017'], geometry, config.url)
    ]).then(results => {
      const alerts = this.cleanGlad(results);
      promise.resolve(alerts);
    });
    return promise;
  },

  getTerraIAlerts: function (config, geometry) {
    const promise = new Deferred();
    const content = {
      geometry: geometry
    };

    const success = ({histograms}) => {
      const counts = histograms && histograms.length && histograms[0].counts || [];
      promise.resolve(formatters.terraIAlerts(counts));
    };

    const failure = (error) => {
      if (errorIsInvalidImageSize(error) && content.pixelSize !== 500) {
        content.pixelSize = 500;
        computeHistogram(config.url, content, success, failure);
      } else {
        promise.resolve(error);
      }
    };

    computeHistogram(config.url, content, success, failure);
    return promise;
  },

  getCountsWithDensity: (rasterId, geometry, canopyDensity) => {
    const promise = new Deferred();
    const tcd = analysisConfig.tcd;
    const densityRule = rules.remap(tcd.id, tcd.inputRanges(canopyDensity), tcd.outputValues);
    const {imageService, pixelSize} = analysisConfig;

    const content = {
      pixelSize: pixelSize,
      geometry: geometry,
      renderingRule: rules.arithmetic(densityRule, rasterId, OP_MULTIPLY)
    };

    const success = (response) => {
      promise.resolve(formatters.getCounts(response, content.pixelSize));
    };

    const failure = (error) => {
      if (errorIsInvalidImageSize(error) && content.pixelSize !== 500) {
        content.pixelSize = 500;
        computeHistogram(imageService, content, success, failure);
      } else {
        promise.resolve(error);
      }
    };

    computeHistogram(imageService, content, success, failure);
    return promise;
  },

  getMosaic: (lockRaster, geometry, url) => {
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
        promise.resolve(error);
      }
    };

    computeHistogram(url || imageService, content, success, failure);
    return promise;
  },

  getBiomassLoss: (geometry, canopyDensity) => {
    const deferred = new Deferred();
    const geographic = webmercatorUtils.webMercatorToGeographic(geometry);
    const geojson = geojsonUtil.arcgisToGeoJSON(geographic);
    // const content = {
    //   type: 'geojson',
    //   geojson: JSON.stringify(geojson),
    //   dataset: 'biomass-loss',
    //   period: '2001-01-01,2014-12-31',
    //   begin: '2001-01-01',
    //   end: '2014-12-31',
    //   thresh: canopyDensity
    // };

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

    const success = res => {
      const biomassData = {
        geostore: res.data.id,
        period: '2001-01-01,2014-12-31',
        thresh: canopyDensity
      };
      esriRequest({
        url: 'https://production-api.globalforestwatch.org/biomass-loss',
        callbackParamName: 'callback',
        content: biomassData,
        handleAs: 'json',
        timeout: 30000
      }, { usePost: false}).then(biomassResult => {
        deferred.resolve(biomassResult || []);
      }, err => {
        console.error(err);
        deferred.resolve([]);
      });
    };

    const http = new XMLHttpRequest();
    const url = 'https://production-api.globalforestwatch.org/geostore';
    const params = content;
    http.open('POST', url, true);

    http.setRequestHeader('Content-type', 'application/json');

    http.onreadystatechange = () => {
      if(http.readyState === 4 && http.status === 200) {
        success(JSON.parse(http.responseText));
      } else if (http.readyState === 4) {
        deferred.resolve([]);
      }
    };
    http.send(params);

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
        promise.resolve(error);
      }
    };

    computeHistogram(imageService, content, success, failure);
    return promise;
  },

  getSlope: (url, slopeValue, raster, restorationId, geometry) => {
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
        promise.resolve(error);
      }
    };

    computeHistogram(url, content, success, failure);
    return promise;
  },

  cleanGlad: (results) => {
    let alerts = [];
    results.forEach((result, j) => {
      if (j !== results.length - 1) {
        for (var k = result.counts.length; k < 366; k++) {
          result.counts.push(0);
        }
      } else {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start;
        const oneDay = 1000 * 60 * 60 * 24;
        const day = Math.floor(diff / oneDay);

        const dayDiff = day - result.counts.length;

        for (var l = 0; l < dayDiff; l++) {
          result.counts.push(0);
        }
      }

      let year = 2015 + j;
      year = year.toString();
      alerts = alerts.concat(formatters.gladAlerts(year, result.counts));
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
