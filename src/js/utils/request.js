import FindParameters from 'esri/tasks/FindParameters';
import layerKeys from 'constants/LayerConstants';
import StatisticDefinition from 'esri/tasks/StatisticDefinition';
import QueryTask from 'esri/tasks/QueryTask';
import FindTask from 'esri/tasks/FindTask';
import esriRequest from 'esri/request';
import Query from 'esri/tasks/query';
import Deferred from 'dojo/Deferred';
import geometryUtils from 'utils/geometryUtils';

const needsDynamicQuery = function needsDynamicQuery (url) {
  return /\/dynamicLayer$/.test(url);
};

const request = {
  /**
  * @param {string} url - Url for an esri map service
  * @param {array} layerIds - An array of layer ids
  * @return {Deferred} deferred - A promise, will return either an array of layerInfos or an empty array
  */
  getLegendInfos: (url, layerIds) => {
    const deferred = new Deferred();
    esriRequest({
      url: `${url}/legend`,
      handleAs: 'json',
      callbackParamName: 'callback',
      content: { f: 'json' }
    }).then(res => {
      if (layerIds && typeof layerIds === 'number') {
        layerIds = [layerIds];
      }
      if (layerIds && res && res.layers && res.layers.length > 0) {
        const layers = res.layers.filter(layer => layerIds.indexOf(layer.layerId) > -1);
        const legendInfos = layers.length === 1 ? layers[0].legend : layers.map(layer => layer.legend);
        const legendLength = legendInfos.length;
        legendInfos.map( (legendInfo, index) => {
          if(legendInfo.label === '') {
            // In case we have multiple sub-labels
            if(layers[index] && legendLength === 1) {
              legendInfo.label = layers[index].layerName;
            } else if (legendLength === 1) {
              legendInfo.label = layers[0].layerName;
            }
          }
        });
        deferred.resolve(legendInfos || []);
      }
    }, err => {
      console.error(err);
      deferred.resolve([]);
    });

    return deferred;
  },

  /**
  * @param {string} url - Url for an esri map service
  * @param {array} layerIds - An array of layer ids
  * @return {Deferred} deferred - A promise, will return either an array of layerInfos or an empty array
  */
  getWebMapLegendInfos: (url, layerIds) => {
    const deferred = new Deferred();
    esriRequest({
      url: `${url}/legend`,
      handleAs: 'json',
      callbackParamName: 'callback',
      content: { f: 'json' }
    }).then(res => {
      if (layerIds && typeof layerIds === 'number') {
        layerIds = [layerIds];
      }
      if (layerIds && res && res.layers && res.layers.length > 0) {
        const layers = res.layers.filter(layer => layerIds.indexOf(layer.layerId) > -1);
        const legendInfos = layers.length === 1 ? layers[0].legend : layers.map(layer => layer.legend);
        const legendLength = legendInfos.length;
        legendInfos.map( (legendInfo, index) => {
          if(legendInfo.label === '') {
            // In case we have multiple sub-labels
            if(layers[index] && legendLength === 1) {
              legendInfo.label = layers[index].layerName;
            } else if (legendLength === 1) {
              legendInfo.label = layers[0].layerName;
            }
          }
        });
        deferred.resolve(legendInfos || []);
      }
    }, err => {
      console.error(err);
      deferred.resolve([]);
    });

    return deferred;
  },

  /**
  * @param {string} url - Portal URL for the generate features service
  * @param {object} content - payload for the request
  * @param {DOM} form - form containing an input with files attached to it
  * @return {promise}
  */
  upload (url, content, form) {
    return esriRequest({
      url: url,
      form: form,
      content: content,
      handleAs: 'json'
    });
  },

  queryTaskById (url, objectId) {
    const task = new QueryTask(url);
    const query = new Query();
    query.objectIds = [objectId];
    query.outFields = ['*'];
    query.returnGeometry = true;
    query.maxAllowableOffset = 0;
    return task.execute(query);
  },

  queryTaskByGeometry (url, geometry) {
    const task = new QueryTask(url);
    const query = new Query();
    query.returnGeometry = false;
    query.maxAllowableOffset = 0;
    query.geometry = geometry;
    query.outFields = ['*'];
    return task.execute(query);
  },

  findTaskByLayer (searchValue, options) {
    const task = new FindTask(options.url);
    const params = new FindParameters();
    params.returnGeometry = false;
    params.searchText = searchValue;
    if (options.visibleLayers || (options.layerObject && options.layerObject.visibleLayers)) {
      params.layerIds = options.visibleLayers || options.layerObject.visibleLayers;
    }
    return task.execute(params);
  },

  /**
  * Return the ungeneralized geometry if possible, otherwise, return the generalized geometry from the feature
  * @param {ArcGIS Graphic} feature - feature from an infowindow
  * @return {promise} - will resolve a raw geometry if possible or a generalized one if it can't
  */
  getRawGeometry (feature) {
    const promise = new Deferred();
    const layer = feature._layer;
    const url = layer && layer._url && layer._url.path;
    const id = feature.attributes[layer.objectIdField];

    // Dont bother querying for custom geometry on the user features layer, we already have it
    if (layer.id === layerKeys.USER_FEATURES) {
      promise.resolve(feature.geometry);
    } else if (needsDynamicQuery(url) && layer.source) { // If layer ends in /dynamicLayer, it takes different query params
      const content = {
        layer: JSON.stringify({ source: { type: 'mapLayer', mapLayerId: layer.source.mapLayerId }}),
        objectIds: id,
        returnGeometry: true,
        outFields: '*',
        f: 'json'
      };

      esriRequest({
        url: `${url}/query`,
        handleAs: 'json',
        callbackParamName: 'callback',
        content: content
      }).then((results) => {
        if (results.features.length) {
          promise.resolve(geometryUtils.generatePolygonInSr(results.features[0].geometry, 102100));
        } else {
          promise.resolve(feature.geometry);
        }
      }, () => { promise.resolve(feature.geometry); });
    } else if (url) { // If we have a url , query it
      this.queryTaskById(url, id).then((results) => {
        if (results.features.length) {
          promise.resolve(results.features[0].geometry);
        } else {
          promise.resolve(feature.geometry);
        }
      }, () => { promise.resolve(feature.geometry); });
    } else { // If we can't query it, and it's not a custom feature, just return it, this should not be happening though
      promise.resolve(feature.geometry);
    }

    return promise;
  },

  getLayerStatistics: (options) => {
    const {url, outFields, type, field} = options;
    const task = new QueryTask(url);
    const query = new Query();
    const stat = new StatisticDefinition();
    stat.statisticType = type;
    stat.onStatisticField = stat.outStatisticFieldName = field;

    query.returnGeometry = false;
    query.outFields = outFields;
    query.outStatistics = [stat];
    return task.execute(query);
  }


};

export {request as default};
