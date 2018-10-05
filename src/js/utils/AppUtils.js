import geojsonUtil from 'utils/arcgis-to-geojson';
import webmercatorUtils from 'esri/geometry/webMercatorUtils';
import {toQuerystring} from 'utils/params';

const utils = {
  /**
  * Retrieve the object from a given array based on id and value
  * @param {array} - items - Array to search
  * @param {string} - field - Property of unique identifier in object
  * @param {string} - value - value of the unique id
  * @return {Any} - Return whatever object is matched
  */
  getObject: (items, field, value) => {
    let obj;
    items.some((item) => {
      if (item[field] === value) {
        obj = item;
        return true;
      }
    });
    return obj;
  },

    /**
  * Retrieve the object from a given array based on id and value
  * Should be used for webmap layers
  * @param {array} - items - Array to search
  * @param {string} - field - Property of unique identifier in object
  * @param {string} - field2 - Property of unique identifier in object
  * @param {string} - value - value of the unique id
  * @return {Any} - Return whatever object is matched
  */
  getWebMapObject: (items, field, field2, value) => {
    let obj;
    items.some((item) => {
      if (item[field][field2] === value) {
        obj = item;
        return true;
      }
    });
    return obj.layer;
  },

  /**
  * Retrieve the object from a given array based on id and value
  * @param {array} - items - Array to search
  * @param {string} - field - Property of unique identifier in object
  * @param {string} - value - value of the unique id
  * @return {boolean} - Return true if object is matched
  */
  containsObject: (items, field, value) => {
    return items.some(item => item[field] === value);
  },

  /**
  * Checks to make sure lat and lng are within global bounds
  * @param {number} lat - Latitude
  * @param {number} lon - Longitude
  * @return {boolean}
  */
  validLatLng: (lat, lon) => {
    return (lat > -90 && lat < 90) && (lon > -180 && lon < 180);
  },

  /**
  * Round down to the nearest 100s
  */
  roundToHundred: (value) => (Math.floor(value / 100) * 100),

  /**
  * Return true if the document.execCommand exists
  * @return {boolean}
  */
  supportsExecCommand: () => typeof document !== 'undefined' && !!document.execCommand,

  /**
  * Return true if we can succesfully copy item to clipboard, this will query element
  * and try to put the focus on it so we can copy it correctly
  * @param {HTML element} el - Input element
  * @return {boolean}
  */
  copySelectionFrom: el => {
    let status = false;
    if (!utils.supportsExecCommand()) {
      return status;
    }
    // Highlight the input
    el.select();
    // This may not work in all scenarios, wrap in a try catch to prevent any errors
    // and handle accordingly
    try {
      status = document.execCommand('copy');
    } catch (err) {
      console.error(err);
    }
    return status;
  },

  clone: (sourceObject) => {
    return JSON.parse(JSON.stringify(sourceObject));
  },

  registerGeom: (feature, success, failure, options) => {
    const geographic = webmercatorUtils.webMercatorToGeographic(feature.geometry);
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
    const url = 'https://production-api.globalforestwatch.org/v1/geostore';
    const params = content;
    http.open('POST', url, true);

    http.setRequestHeader('Content-type', 'application/json');

    http.onreadystatechange = () => {
      if(http.readyState === 4 && http.status === 200) {
        success(JSON.parse(http.responseText), options);
      } else if (http.readyState === 4) {
        failure(http);
      }
    };
    http.send(params);
  },

  geometrySuccess: (response, options) => {
    const {
      settings,
      lang,
      canopyDensity,
      appid,
      layerId,
      OBJECTID,
      OBJECTID_Field,
      activeSlopeClass,
      activeLayers,
      dynamicLayers,
      tcLossFrom,
      tcLossTo,
      gladFrom,
      gladTo,
      terraIFrom,
      terraITo,
      viirsStartDate,
      viirsEndDate,
      modisStartDate,
      modisEndDate
    } = options;
    const labels = settings.labels[lang];
    const query = {
      title: labels.title,
      subtitle: labels.subtitle,
      logoUrl: settings.logoUrl,
      logoLinkUrl: settings.logoLinkUrl,
      activeSlopeClass: activeSlopeClass,
      webmap: settings.webmap,
      idvalue: response.data.id,
      tcd: canopyDensity,
      lang: lang,
      activeLayers: activeLayers,
      tcLossFrom: tcLossFrom,
      tcLossTo: tcLossTo,
      gladFrom: gladFrom,
      gladTo: gladTo,
      terraIFrom: terraIFrom,
      terraITo: terraITo,
      viirsStartDate: viirsStartDate,
      viirsEndDate: viirsEndDate,
      modisStartDate: modisStartDate,
      modisEndDate: modisEndDate,
      customFeatureTitle: options.selectedFeature.attributes.title || 'Feature Analysis',
      ...(layerId ? {layerId} : {}),
      ...(OBJECTID ? {OBJECTID} : {}),
      ...(OBJECTID_Field ? {OBJECTID_Field} : {})
    };

    // We need the dynamic layers but we cannot encode nested objects, so we will pass them in to query like this:
    // layerId: array of visible layers
    for (const key in dynamicLayers) {
      query[key] = dynamicLayers[key];
    }

    if (appid) {
      query.appid = appid;
    }

    if (window._app.cache) {
      query.cache = window._app.cache;
    }

    const path = toQuerystring(query);

    if (window._app.base === window._app.cache) {
      window.open(`report.html?${path}`);
    } else {
      let appBase = window._app.base;

      if (!appBase) {
        appBase = window.location.origin + window.location.pathname;
      }

      if (appBase.indexOf(window._app.cache) > -1) {
        appBase = appBase.split(window._app.cache)[0];
      }

      if (appBase.slice(-1) !== '/') {
        appBase += '/';
      }

      const reportWindow = window.open(`${appBase}report.html?${path}`);
      reportWindow.analysisMods = settings.analysisModules;
    }
  },

  geometryFailure: (err) => {
    console.log(err);
  },

  /**
  * @param {object} options
  * @property {object} options.selectedFeature - Selected feature should come from infoWindow.getSelectedFeature()
  * @property {string} options.webmap - webmap id
  * @property {string} options.appid - app id
  * @property {string} options.lang - two digit iso code representing current language, en || es || fr || pt
  * @property {number} options.canopyDensity - Current tree cover density settings
  * @property {number} options.activeSlopeClass - Current Slope setting, only relevant for slope analysis
  */
  generateReport: (options) => {
    const { selectedFeature } = options;
    if (selectedFeature.attributes.geostoreId) {
      utils.geometrySuccess({
        data: {
          id: selectedFeature.attributes.geostoreId
        }
      }, options);
    } else {
      utils.registerGeom(selectedFeature, utils.geometrySuccess, utils.geometryFailure, options);
    }
  },

  /**
  * Universal pad function, takes pad(12, '*', 5) and return '***12'
  */
  pad: (content, padding, length) => {
    let item = content.toString(), i = 0;
    while (i < length) {
      item = padding + item;
      i++;
    }
    return item.slice(item.length - length);
  },

  getJulianDate: (timestamp) => {
    const day = 1000 * 60 * 60 * 24;
    const newDate = new Date(timestamp);
    const year = new Date(newDate.getFullYear(), 0, 0);
    const currentDay = Math.ceil((newDate - year) / day);
    //- Year should be 15000 or 16000
    const julianYear = (newDate.getFullYear() - 2000) * 1000;
    return julianYear + currentDay;
  },

  /**
  * Used for calculating the date of a grid code in the Terra-I Layer
  */
  getDateFromGridCode: (gridCode) => {
    const year = Math.floor((gridCode - 1) / 23) + 2004;
    const day = (((gridCode - 1) % 23) * 16) + 1;
    return { year, day };
  },

  /**
  * Inclusive Array generator
  */
  range: (start, end) => {
    const result = [];
    let min = start;
    while (min <= end) {
      result.push(min);
      ++min;
    }
    return result;
  },

  formatNumber: (number) => {

    const numberString = Math.round(number).toString();

    if (number >= 1000) {
      const stringArray = [];
      for (let i = 0; i < numberString.length; i++) {
        stringArray.push(numberString[i]);
      }
      stringArray.reverse();
      const stringWithExtras = [];

      for (let i = 0; i < stringArray.length; i++) {
        if (i !== 0 && i % 3 === 0) {
          stringWithExtras.push(',');
        }
        stringWithExtras.push(stringArray[i]);
      }
      stringWithExtras.reverse();

      return stringWithExtras.join('');
    } else {
      return numberString;
    }
  }

};

export { utils as default };
