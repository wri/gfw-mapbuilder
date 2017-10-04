import DynamicLayer from 'esri/layers/ArcGISDynamicMapServiceLayer';
import TiledLayer from 'esri/layers/ArcGISTiledMapServiceLayer';
import ImageLayer from 'esri/layers/ArcGISImageServiceLayer';
import ImageParameters from 'esri/layers/ImageParameters';
import WebTiledLayer from 'esri/layers/WebTiledLayer';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import FeatureLayer from 'esri/layers/FeatureLayer';
import TerraILayer from 'js/layers/TerraILayer';
// import CartoLayer from 'js/layers/CartoLayer';
import GladLayer from 'js/layers/GladLayer';
import TreeCoverLossLayer from 'js/layers/TreeCoverLossLayer';
import TreeCoverGainLayer from 'js/layers/TreeCoverGainLayer';
import layerUtils from 'utils/layerUtils';
import layerKeys from 'constants/LayerConstants';
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
    // case 'carto_template':
    //   options.id = layer.id;
    //   esriLayer = new CartoLayer(layer);
    //   esriLayer.queryBuilder();
    // break;
    case 'tiled':
      options.id = layer.id;
      options.visible = layer.visible || false;
      esriLayer = new TiledLayer(layer.url, options);
      esriLayer.legendLayer = layer.legendLayer || null;
      esriLayer.order = layer.order;
    break;
    case 'webtiled':
      options.id = layer.id;
      options.visible = layer.visible || false;
      if (layer.subDomains) { options.subDomains = layer.subDomains; }
      esriLayer = new WebTiledLayer(layer.url, options);
      esriLayer.legendLayer = layer.legendLayer || null;
      esriLayer.order = layer.order;
    break;
    case 'image':
      options.id = layer.id;
      options.visible = layer.visible || false;
      options.opacity = layer.opacity || 1;
      esriLayer = new ImageLayer(layer.url, options);
      esriLayer.order = layer.order;
      esriLayer.legendLayer = layer.legendLayer || null;
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
      esriLayer.legendLayer = layer.legendLayer || null;
      esriLayer.layerIds = layer.layerIds;
      esriLayer.order = layer.order;
    break;
    case 'feature':
      options.id = layer.id;
      options.visible = layer.visible || false;
      if (layer.id === layerKeys.USER_FEATURES) {
        esriLayer = new GraphicsLayer(options);
      } else {
        if (layer.mode !== undefined) { options.mode = layer.mode; } // mode could be 0, must check against undefined
        if (layer.definitionExpression) { options.definitionExpression = layer.definitionExpression; }
        if (layer.popup) { options.infoTemplate = layerUtils.makeInfoTemplate(layer.popup, lang); }
        esriLayer = new FeatureLayer(layer.url, options);
      }
      esriLayer.legendLayer = layer.legendLayer || null;
      esriLayer.order = layer.order;
    break;
    case 'graphic':
      options.id = layer.id;
      options.visible = layer.visible || false;
      if (layer.popup) { options.infoTemplate = layerUtils.makeInfoTemplate(layer.popup); }
      esriLayer = new GraphicsLayer(options);
      esriLayer.legendLayer = layer.legendLayer || null;
      esriLayer.order = layer.order;
    break;
    case 'glad':
      options.id = layer.id;
      options.url = layer.url;
      options.minDateValue = layer.minDateValue;
      options.maxDateValue = layer.maxDateValue;
      options.confidence = layer.confidence;
      options.visible = layer.visible || false;
      esriLayer = new GladLayer(options);
      esriLayer.legendLayer = layer.legendLayer || null;
      esriLayer.order = layer.order;
    break;
    case 'loss':
      options.id = layer.id;
      options.url = layer.url;
      options.minYear = layer.minYear;
      options.maxYear = layer.maxYear;
      options.visible = layer.visible || false;
      esriLayer = new TreeCoverLossLayer(options);
      esriLayer.legendLayer = layer.legendLayer || null;
      esriLayer.order = layer.order;
    break;
    case 'gain':
      options.id = layer.id;
      options.url = layer.url;
      options.visible = layer.visible || false;
      esriLayer = new TreeCoverGainLayer(options);
      esriLayer.legendLayer = layer.legendLayer || null;
      esriLayer.order = layer.order;
    break;
    case 'terra':
      layer.visible = layer.visible || false;
      esriLayer = new TerraILayer(layer);
      esriLayer.legendLayer = layer.legendLayer || null;
      esriLayer.order = layer.order;
    break;
    default:
      throw new Error(errors.incorrectLayerConfig(layer.type));
  }
  if(layer.label !== undefined) {
    esriLayer.title = layer.label[lang] ? layer.label[lang] : 'null';
  }
  esriLayer.type = layer.type;
  return esriLayer;
};
