import SimpleMarkerSymbol from 'esri/symbols/SimpleMarkerSymbol';
import webMercatorUtils from 'esri/geometry/webMercatorUtils';
import SimpleFillSymbol from 'esri/symbols/SimpleFillSymbol';
import SimpleLineSymbol from 'esri/symbols/SimpleLineSymbol';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import layerInfoCache from 'utils/layerInfoCache';
import geojsonUtil from 'utils/arcgis-to-geojson';
import layerUtils from 'utils/layerUtils';
import layerActions from 'actions/LayerActions';
import Deferred from 'dojo/Deferred';
import Graphic from 'esri/graphic';
import request from 'dojo/request';
import resources from 'resources';
import dojoJSON from 'dojo/json';
import {urls} from 'js/config';
import Color from 'esri/Color';
import declare from 'dojo/_base/declare';

export default declare('CartoLayer', [GraphicsLayer], {
  /*
   * params must contain
   * - user <string> CartoDB User Name
   * - symbolDictionary <object> Dictionary of symbols for features.
   *   - symbol options: point | mulitpoint | polyline | polygon
   * - infoTemplate <esri/InfoTemplate>
   */
  constructor: function(resource) {
    const { cartoColor, cartoIcon, cartoUser, cartoQuery, cartoDataType, cartoLineWidth, popup, id, cartoApiKey, cartoTemplateId } = resource;
    this.cartoUser = cartoUser;
    this.cartoTemplateId = cartoTemplateId;
    this.infoTemplate = popup || null;
    this.cartoQuery = cartoQuery;
    this.cartoApiKey = cartoApiKey;
    this.cartoColor = cartoColor;
    this.cartoIcon = cartoIcon;
    this.cartoDataType = cartoDataType;
    this.cartoLineWidth = cartoLineWidth;
    this.id = id;
    this.visible = false;
    this.cartoLayers = null;
  },

  /*
   *  Takes in the data type of the carto layer
   *  Returns the a symbolDictionary to draw the shapes onto the map
  */
  setParameters: function(cartoDataType, esriObj, esriObjLineSymbol) {
    switch (cartoDataType) {
      case 'Point':
      this.setPointParams(this.cartoUser, esriObj, esriObjLineSymbol);
      break;
      case 'MultiLineString':
      this.setLineParams(this.cartoUser, esriObj, esriObjLineSymbol);
      break;
      case 'MultiPolygon':
      this.setPolygonParams(this.cartoUser, esriObj, esriObjLineSymbol);
      break;
    }
  },

  /*
  *  Gets the layer name from the Carto metadata call
  **/
  getLayerName: function(layer, layerId) {
    const promise = new Deferred();
    layerInfoCache.fetch(layer, layerId).then(layerInfo => {
      this.modalLayerInfo = layerInfo;
      promise.resolve(layerInfo);
    });
    return promise;
  },

  processCartoCSS: function(cartoCSS, type) {
    const cartoObj = {};
    const esriObj = {};
    const esriObjLineSymbol = {};
    // Converting from cartoCSS to arrays
    let right = cartoCSS.match(/[^:\]]+(?=;)/g);
    let left = cartoCSS.match(/.+?(?=:)/g);
    right = right.map(function(string) { return string.trim(); });
    left = left.map(function(string) { return string.trim(); });

    // Creating an object out of the cartoCSS
    left.forEach((leftProp, index) => {
      if(cartoObj[leftProp] === undefined) {
        cartoObj[leftProp] = right[index];
      }
    });

    switch(type) {
      case 'Point':
        cartoObj['marker-opacity'] = cartoObj['marker-opacity'] ? cartoObj['marker-opacity'] : 1;
        esriObj.color = this.convertHex(cartoObj['marker-fill'], cartoObj['marker-opacity']);
        esriObj.size = cartoObj['marker-width'];
        esriObj.style = 'STYLE_CIRCLE';
        esriObjLineSymbol.width = cartoObj['marker-line-width'];
        break;
      case 'MultiPolygon':
        esriObj.color = this.convertHex(cartoObj['polygon-fill'], cartoObj['polygon-opacity']);
        esriObjLineSymbol.color = this.convertHex(cartoObj['line-color'], cartoObj['line-opacity']);
        esriObjLineSymbol.width = cartoObj['line-width'];
        break;
      case 'Polyline':
        // TODO but chances are we are not going to see any polylines
        break;
    }
    return { esriObj, esriObjLineSymbol };
  },

  convertHex: function(hex, opacity){
    const result = [];
    hex = hex.replace('#', '');
    hex = hex.length === 3 ? hex.repeat(2) : hex;

    const red = parseInt(hex.substring(0, 2), 16);
    const green = parseInt(hex.substring(2, 4), 16);
    const blue = parseInt(hex.substring(4, 6), 16);

    result.push(red, green, blue, opacity);
    return result;
  },

  /**
   * The main query function of the CartoDBLayer
   * @param {string} queryString
   */
  query: function(cartoQuery, cartoTemplate, layerNumber, layerIndex, cartocss, layerName, cartoLayers, resolve, reject) {
    var _url = urls.cartoDataEndpoint(this.cartoUser, cartoQuery, this.cartoApiKey);
    var esriJsonLayer = [];
    request.id = 2;

    request(_url, {timeout: 5000}).then((data) => {

      var geojson = dojoJSON.parse(data);
      const meta = this.setMetadataFields(geojson.features[0].properties, layerNumber);
      const { esriObj, esriObjLineSymbol } = this.processCartoCSS(cartocss, geojson.features[0].geometry.type);
      this.setParameters(geojson.features[0].geometry.type, esriObj, esriObjLineSymbol);
      const esriJson = geojsonUtil.geojsonToArcGIS(geojson);

      esriJson.forEach(feature => {
        if (feature.geometry) {
          var graphic = new Graphic(feature);
          //project geometry to web mercator if needed

          if (graphic.geometry.spatialReference.wkid === 4326){
            graphic.setGeometry(
              webMercatorUtils.geographicToWebMercator(graphic.geometry)
            );
          }

          // Set the symbolDictionary depending on the geometry type
          if (!!this.symbolDictionary) {
            graphic.setSymbol(
              this.symbolDictionary[graphic.geometry.type]
            );
          }
          else {
            return this.emit('queryDrawError', {
              message: 'No symbolDictionary for feature'
            });
          }

          esriJsonLayer.push(graphic);
        }
      });

      this.addLayer(esriJsonLayer, cartoTemplate, meta);
      const dataInfo = {symbol: this.symbolDictionary, cartoTemplate: cartoTemplate};
      resolve(dataInfo);

    }, () => {
      cartoLayers.forEach((layer, index) => {
        if(layer.id === layerName) {
          delete cartoLayers[index];
        }
      });
      const tempResources = resources;
      tempResources.layerPanel.GROUP_CARTO.layers = cartoLayers;
      this.cartoLayers = cartoLayers;
      this.loaded = true;
      this.emit('onCartoLayerAdd');
      resolve('err');
    });
  },

  /*
  * Using a Carto map template, get the layers
  * Returns an object of layers with their ID, data type, and query
  **/
  getLayers: function() {
    // Getting the Carto template url
    const _url = urls.cartoTemplateEndpoint(this.cartoUser, this.cartoTemplateId, this.cartoApiKey);
    let json = {};

    // Making a call to get the Carto template
    request(_url).then((template) => {
      json = dojoJSON.parse(template);
      const layers = json.template.layergroup.layers;
      const cartoMapID = json.template.layergroup.stat_tag;
      const cartoLayers = resources.layerPanel.GROUP_CARTO.layers;

      this.getLayerName(cartoLayers[0], cartoMapID).then(response => {
        const all = [];
        layers.forEach((layer, i) => {
          const promise = new Promise((resolve, reject) => {
            const cartoCSS = layer.options.cartocss;
            if(cartoCSS === undefined) {
              resolve('err');
              return;
            }
            const cartoTemplate = 'CARTO_TEMPLATE' + i;
            // Getting the query out of the original carto returned query
            const cartoQuery = layer.options.sql.match(/\((.*?)\)/)[1];
            // Querying carto to get the geojson layer
            cartoLayers.push({
              order: i + 1,
              id: cartoTemplate,
              type: 'carto',
              url: 'cartoLayer',
              // symbolDic: symbolDic,
              label: {
                en: response.layerNames[i - 1],
                fr: response.layerNames[i - 1],
                es: response.layerNames[i - 1],
                pt: response.layerNames[i - 1],
                id: response.layerNames[i - 1],
                zh: response.layerNames[i - 1]
              },
              sublabel: {
                en: '(carto_layer)',
                fr: '(carto_layer)',
                es: '(carto_layer)',
                pt: '(carto_layer)',
                id: '(carto_layer)',
                zh: '(carto_layer)'
              },
              popup: {
                title: {
                  en: response.layerNames[i - 1]
                },
                content: {
                  en: []
                }
              }
            });
            this.query(cartoQuery, cartoTemplate, i - 1, i, cartoCSS, cartoTemplate, cartoLayers, resolve, reject);
          });
          all.push(promise);
        });
        Promise.all(all).then((responses) => {
          responses.forEach((data) => {
            cartoLayers.forEach((layer) => {
              if(data.cartoTemplate === layer.id) {
                layer.symbol = data.symbol;
              }
            });
          });
          // layerActions.updateCartoSymbol(cartoLayers);
        });
        // Removing the first carto layer as it is the template
        cartoLayers.shift();
        const tempResources = resources;
        tempResources.layerPanel.GROUP_CARTO.layers = cartoLayers;
        this.cartoLayers = cartoLayers;
        this.loaded = true;
        this.emit('onCartoLayerAdd');
      });
    });
  },

  /**
  * Adds the layer to the list of graphics. This could be improved not to use
  * the global brApp.map
  **/
  addLayer: function(graphic, id, meta) {
    const graphLayer = new GraphicsLayer({
      id: id,
      visible: false
    });
    for(var i = 0; i < graphic.length; i++) {
      graphLayer.add(graphic[i]);
      graphLayer.setInfoTemplate(layerUtils.makeInfoTemplate(meta, 'en'));
    }
    graphLayer.title = meta.title.en;
    graphLayer.type = 'CARTO';
    brApp.map.addLayer(graphLayer);
    brApp.map.removeLayer('CARTO_TEMPLATE');
    graphLayer.redraw();
  },

  /**
  * Sets the parameters for the Carto points
  **/
  setPointParams: function (cartoUser, esriObj, esriObjLineSymbol) {
    var markerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color(esriObjLineSymbol.color), 1),
                        new Color(esriObj.color));

    const params = {
      user: cartoUser,
      symbolDictionary: {
        point: markerSymbol
      }
    };
    this.symbolDictionary = params.symbolDictionary;
  },

  /**
  * Sets the parameters for the Carto polylines
  **/
  setLineParams: function (cartoUser, esriObj, esriObjLineSymbol) {
    var line = new SimpleLineSymbol();
    line.setStyle(SimpleLineSymbol.STYLE_SOLID);
    line.setColor(new Color(cartoColor));
    line.setWidth(cartoLineWidth);

    const params = {
      user: cartoUser,
      symbolDictionary: {
        polyline: line
      }
    };
    this.symbolDictionary = params.symbolDictionary;
  },

  /**
  * Sets the parameters for the Carto polygons
  **/
  setPolygonParams: function (cartoUser, esriObj, esriObjLineSymbol) {
    var polySymbol = new SimpleFillSymbol(
      SimpleLineSymbol.STYLE_SOLID,
      new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                            new Color([esriObjLineSymbol.color]), 1),
      new Color(esriObj.color));

    const params = {
      user: cartoUser,
      symbolDictionary: {
        polygon: polySymbol
      }
    };
    this.symbolDictionary = params.symbolDictionary;
  },

  setMetadataFields: function(properties, layerNumber) {
    const popupContent = resources.layerPanel.GROUP_CARTO.layers[layerNumber].popup.content.en;
    for(var property in properties) {
      popupContent.push({
        label: property,
        fieldExpression: property
      });
    }
    const meta = resources.layerPanel.GROUP_CARTO.layers[layerNumber].popup;
    return meta;
  }
});
