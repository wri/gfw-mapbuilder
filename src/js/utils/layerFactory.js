import DynamicLayer from 'esri/layers/ArcGISDynamicMapServiceLayer';
import TiledLayer from 'esri/layers/ArcGISTiledMapServiceLayer';
import ImageLayer from 'esri/layers/ArcGISImageServiceLayer';
import ImageParameters from 'esri/layers/ImageParameters';
import WebTiledLayer from 'esri/layers/WebTiledLayer';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import FeatureLayer from 'esri/layers/FeatureLayer';
import TerraILayer from 'js/layers/TerraILayer';
import WFSLayer from 'esri/layers/WFSLayer';
import GladLayer from 'js/layers/GladLayer';
import TreeCoverLossLayer from 'js/layers/TreeCoverLossLayer';
import TreeCoverGainLayer from 'js/layers/TreeCoverGainLayer';
import layerUtils from 'utils/layerUtils';
import {errors} from 'js/config';

/**
* Helper function to make infoTemplates
*/

/**
* Map Function that gets called for each entry in the provided layers config and returns an array of ArcGIS Layers
* @param {object} layer - Layer Config object, see the layersConfig object in js/map/config.js for example
* @return {Layer} esriLayer - Some sort of esri layer, current types are:
*   - ArcGISDynamicMapServiceLayer
*   - ArcGISTiledMapServiceLayer
*   - ArcGISImageServiceLayer
*   - FeatureLayer
*/
export default (layer, lang) => {
  if (layer.hasOwnProperty('esriLayer')) { return layer.esriLayer; }

  if ((!layer.url && layer.type !== 'graphic') || !layer.type) { throw new Error(errors.missingLayerConfig); }

  const options = {};
  let esriLayer;
  switch (layer.type) {
    case 'wfs':
      options.id = layer.id;
      options.visible = layer.visible || false;
      options.url = 'http://139.255.83.75:3000/geoserver/smallholder_database/wfs?SERVICE=WFS&REQUEST=GetCapabilities';
      options.name = 'bidang_smallholder';
      // esriLayer = new WFSLayer(opts);
      var opts = {
        'url': 'https://ahocevar.com/geoserver/wfs?SERVICE=WFS&REQUEST=GetCapabilities',
        'version': '1.1.0',
        'name': 'usa:states',
        'wkid': 4326
      };
      debugger;
      esriLayer = new WFSLayer(opts);
      esriLayer.setPolygonSymbol();
      // esriLayer.fromJson(opts);
      console.log(esriLayer);
      console.log('tes');
      break;
    case 'tiled':
      options.id = layer.id;
      options.visible = layer.visible || false;
      esriLayer = new TiledLayer(layer.url, options);
    break;
    case 'webtiled':
      options.id = layer.id;
      options.visible = layer.visible || false;
      if (layer.subDomains) { options.subDomains = layer.subDomains; }
      esriLayer = new WebTiledLayer(layer.url, options);
    break;
    case 'image':
      options.id = layer.id;
      options.visible = layer.visible || false;
      options.opacity = layer.opacity || 1;
      esriLayer = new ImageLayer(layer.url, options);
    break;
    case 'dynamic':
      // Create some image parameters
      const imageParameters = new ImageParameters();
      imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
      imageParameters.layerIds = layer.layerIds;
      imageParameters.format = 'png32';
      // Populate the options and then add the layer
      options.id = layer.id;
      options.visible = layer.visible || false;
      options.opacity = layer.opacity || 1.0;
      options.imageParameters = imageParameters;
      //- Add a popup template if configuration is present
      if (layer.popup) {
        options.infoTemplates = {};
        const template = layerUtils.makeInfoTemplate(layer.popup, lang);
        layer.layerIds.forEach((id) => { options.infoTemplates[id] = { infoTemplate: template }; });
      }
      esriLayer = new DynamicLayer(layer.url, options);
    break;
    case 'feature':
      options.id = layer.id;
      options.visible = layer.visible || false;
      if (layer.mode !== undefined) { options.mode = layer.mode; } // mode could be 0, must check against undefined
      if (layer.definitionExpression) { options.definitionExpression = layer.definitionExpression; }
      if (layer.popup) { options.infoTemplate = layerUtils.makeInfoTemplate(layer.popup, lang); }
      esriLayer = new FeatureLayer(layer.url, options);
    break;
    case 'graphic':
      options.id = layer.id;
      options.visible = layer.visible || false;
      if (layer.popup) { options.infoTemplate = layerUtils.makeInfoTemplate(layer.popup); }
      esriLayer = new GraphicsLayer(options);
    break;
    case 'glad':
      options.id = layer.id;
      options.url = layer.url;
      options.minDateValue = layer.minDateValue;
      options.maxDateValue = layer.maxDateValue;
      options.confidence = layer.confidence;
      options.visible = layer.visible || false;
      esriLayer = new GladLayer(options);
    break;
    case 'loss':
      options.id = layer.id;
      options.url = layer.url;
      options.minYear = layer.minYear;
      options.maxYear = layer.maxYear;
      // options.confidence = layer.confidence;
      options.visible = layer.visible || false;
      esriLayer = new TreeCoverLossLayer(options);
    break;
    case 'gain':
      options.id = layer.id;
      options.url = layer.url;
      // options.minYear = layer.minYear;
      // options.maxYear = layer.maxYear;
      // options.confidence = layer.confidence;
      options.visible = layer.visible || false;
      esriLayer = new TreeCoverGainLayer(options);
    break;
    case 'terra':
      layer.visible = layer.visible || false;
      esriLayer = new TerraILayer(layer);
    break;
    default:
      throw new Error(errors.incorrectLayerConfig(layer.type));
  }

  return esriLayer;
};
