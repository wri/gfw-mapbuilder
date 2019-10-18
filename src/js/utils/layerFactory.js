import DynamicLayer from 'esri/layers/ArcGISDynamicMapServiceLayer';
import TiledLayer from 'esri/layers/ArcGISTiledMapServiceLayer';
import ImageLayer from 'esri/layers/ArcGISImageServiceLayer';
import ImageParameters from 'esri/layers/ImageParameters';
import WebTiledLayer from 'esri/layers/WebTiledLayer';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import FeatureLayer from 'esri/layers/FeatureLayer';
import WMSLayer from 'esri/layers/WMSLayer';
import WMSLayerInfo from 'esri/layers/WMSLayerInfo';
import Extent from 'esri/geometry/Extent';
import TerraILayer from 'js/layers/TerraILayer';
import CartoLayer from 'js/layers/CartoLayer';
import GladLayer from 'js/layers/GladLayer';
import FormaLayer from 'js/layers/FormaLayer';
import TreeCoverLossLayer from 'js/layers/TreeCoverLossLayer';
import TreeCoverGainLayer from 'js/layers/TreeCoverGainLayer';
import GFWImageryLayer from 'js/layers/GFWImageryLayer';
import PrimaryForestLayer from 'js/layers/PrimaryForestLayer';
import layerUtils from 'utils/layerUtils';
import layerKeys from 'constants/LayerConstants';
import {errors} from 'js/config';
import { addYears } from 'date-fns';
import {shortTermServices} from '../config';
import moment, { isMoment } from 'moment';

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
  // if (layer.hasOwnProperty('esriLayer')) { return layer.esriLayer; } //Actually, let's re-create!

  if ((!layer.url && !layer.versions && layer.type !== 'graphic' && !layer.versions) || !layer.type) { throw new Error(errors.missingLayerConfig); }

  const options = {};
  let esriLayer;
  switch (layer.type) {
    case 'carto':
      esriLayer = new CartoLayer(layer);
      esriLayer.type = layer.type;
      esriLayer.queryBuilder();
    break;
    case 'tiled':
      options.id = layer.id;
      options.visible = layer.visible || false;
      esriLayer = new TiledLayer(layer.url, options);
      esriLayer.legendLayer = layer.legendLayer || null;
      esriLayer.order = layer.order;
      esriLayer.label = layer.label;
    break;
    case 'webtiled':
      options.id = layer.id;
      options.visible = layer.visible || false;
      if (layer.subDomains) { options.subDomains = layer.subDomains; }
      esriLayer = new WebTiledLayer(layer.url, options);
      esriLayer.legendLayer = layer.legendLayer || null;
      esriLayer.order = layer.order;
      esriLayer.label = layer.label;
    break;
    case 'image':
      options.id = layer.id;
      options.visible = layer.visible || false;
      options.opacity = layer.opacity || 1;
      esriLayer = new ImageLayer(layer.url, options);
      esriLayer.order = layer.order;
      esriLayer.legendLayer = layer.legendLayer || null;
      esriLayer.label = layer.label;
    break;
    case 'dynamic':
      // Create some image parameters
      const imageParameters = new ImageParameters();
      imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
      if (!layer.layerIds && layer.versions && layer.versions[0].layerIds) {layer.layerIds = layer.versions[0].layerIds; }
      imageParameters.layerIds = layer.layerIds;
      imageParameters.format = 'png32';
      // Populate the options and then add the layer
      options.id = layer.id;
      options.visible = layer.visible || false;
      options.opacity = layer.opacity || 1.0;
      options.imageParameters = imageParameters;
      //- Add a popup template if configuration is present
      if (layer.popup && layer.layerIds) {
        options.infoTemplates = {};
        const template = layerUtils.makeInfoTemplate(layer.popup, lang);
        layer.layerIds.forEach((id) => { options.infoTemplates[id] = { infoTemplate: template }; });
      }

      if (!options || !options.id || (!layer.layerIds && !layer.versions)) { return false; }
      if (!layer.url && layer.versions && layer.versions[0].url) { layer.url = layer.versions[0].url; }
      
      if (brApp && brApp.map) {
        const fireLayers = [];
        if (layer.id === 'VIIRS_ACTIVE_FIRES') {
          let viirsFortyEightOptions = {};
          let viirsSeventyTwoOptions = {};
          let viirsOneWeekOptions = {};
          let viirsOneYearOptions = {};

          if (layer.esriLayer) {
            Object.keys(layer).forEach(key => {
              if (key !== 'esriLayer') {
                viirsFortyEightOptions[key] = JSON.parse(JSON.stringify(layer[key]));
                viirsSeventyTwoOptions[key] = JSON.parse(JSON.stringify(layer[key]));
                viirsOneWeekOptions[key] = JSON.parse(JSON.stringify(layer[key]));
                viirsOneYearOptions[key] = JSON.parse(JSON.stringify(layer[key]));
              }
            });
          } else {
            viirsFortyEightOptions = JSON.parse(JSON.stringify(layer));
            viirsSeventyTwoOptions = JSON.parse(JSON.stringify(layer));
            viirsOneWeekOptions = JSON.parse(JSON.stringify(layer));
            viirsOneYearOptions = JSON.parse(JSON.stringify(layer));
          }
          const infoTemplate = layerUtils.makeInfoTemplate(layer.popup, lang);

          //48 HRS
          viirsFortyEightOptions.id = 'VIIRS_ACTIVE_FIRES_48HR';
          viirsFortyEightOptions.url = 'https://gis-gfw.wri.org/arcgis/rest/services/Fires/FIRMS_Global_VIIRS_48hrs/MapServer';
          viirsFortyEightOptions.visible = false;
          viirsFortyEightOptions.infoTemplates = {};
          viirsFortyEightOptions.layerIds.forEach((id) => { viirsFortyEightOptions.infoTemplates[id] = { infoTemplate }; });
          
          //72HRS
          viirsSeventyTwoOptions.id = 'VIIRS_ACTIVE_FIRES_72HR';
          viirsSeventyTwoOptions.url = 'https://gis-gfw.wri.org/arcgis/rest/services/Fires/FIRMS_Global_VIIRS_7d/MapServer';
          viirsSeventyTwoOptions.visible = false;
          viirsSeventyTwoOptions.infoTemplates = {};
          viirsSeventyTwoOptions.layerIds.forEach((id) => { viirsSeventyTwoOptions.infoTemplates[id] = { infoTemplate }; });
  
          //7D
          viirsOneWeekOptions.id = 'VIIRS_ACTIVE_FIRES_7D';
          viirsOneWeekOptions.url = 'https://gis-gfw.wri.org/arcgis/rest/services/Fires/FIRMS_Global_VIIRS_7d/MapServer';
          viirsOneWeekOptions.visible = false;
          viirsOneWeekOptions.infoTemplates = {};
          viirsOneWeekOptions.layerIds.forEach((id) => { viirsOneWeekOptions.infoTemplates[id] = { infoTemplate }; });
  
          //1YR
          viirsOneYearOptions.id = 'VIIRS_ACTIVE_FIRES_1YR';
          viirsOneYearOptions.url = 'https://gis-gfw.wri.org/arcgis/rest/services/Fires/FIRMS_Global_VIIRS_1yr/MapServer';
          viirsOneYearOptions.visible = false;
          viirsOneYearOptions.infoTemplates = {};
          viirsOneYearOptions.layerIds = [0];
          viirsOneYearOptions.layerIds.forEach((id) => { viirsOneYearOptions.infoTemplates[id] = { infoTemplate }; });        
  
          const viirsFortyEight = new DynamicLayer(viirsFortyEightOptions.url, viirsFortyEightOptions);
          const viirsSeventyTwo = new DynamicLayer(viirsSeventyTwoOptions.url, viirsSeventyTwoOptions);
          const viirsOneWeek = new DynamicLayer(viirsOneWeekOptions.url, viirsOneWeekOptions);
          const viirsOneYear = new DynamicLayer(viirsOneYearOptions.url, viirsOneYearOptions);
  
          fireLayers.push(viirsFortyEight);
          fireLayers.push(viirsSeventyTwo);
          fireLayers.push(viirsOneWeek);
          fireLayers.push(viirsOneYear);
        }
        
        if (layer.id === 'MODIS_ACTIVE_FIRES') {
        
          let modisFortyEightOptions = {};
          let modisSeventyTwoOptions = {};
          let modisOneWeekOptions = {};
          let modisOneYearOptions = {};

          if (layer.esriLayer) {
            Object.keys(layer).forEach(key => {
              if (key !== 'esriLayer') {
                modisFortyEightOptions[key] = JSON.parse(JSON.stringify(layer[key]));
                modisSeventyTwoOptions[key] = JSON.parse(JSON.stringify(layer[key]));
                modisOneWeekOptions[key] = JSON.parse(JSON.stringify(layer[key]));
                modisOneYearOptions[key] = JSON.parse(JSON.stringify(layer[key]));
              }
            });
          } else {
            modisFortyEightOptions = JSON.parse(JSON.stringify(layer));
            modisSeventyTwoOptions = JSON.parse(JSON.stringify(layer));
            modisOneWeekOptions = JSON.parse(JSON.stringify(layer));
            modisOneYearOptions = JSON.parse(JSON.stringify(layer));
          }
          const infoTemplate = layerUtils.makeInfoTemplate(layer.popup, lang);
          
          //48 HRS
          modisFortyEightOptions.id = 'MODIS_ACTIVE_FIRES_48HR';
          modisFortyEightOptions.url = 'https://gis-gfw.wri.org/arcgis/rest/services/Fires/FIRMS_Global_MODIS_48hrs/MapServer';
          modisFortyEightOptions.visible = false;
          modisFortyEightOptions.infoTemplates = {};
          modisFortyEightOptions.layerIds.forEach((id) => { modisFortyEightOptions.infoTemplates[id] = { infoTemplate }; });
          
          //72 HRS
          modisSeventyTwoOptions.id = 'MODIS_ACTIVE_FIRES_72HR';
          modisSeventyTwoOptions.url = 'https://gis-gfw.wri.org/arcgis/rest/services/Fires/FIRMS_Global_MODIS_7d/MapServer';
          modisSeventyTwoOptions.visible = false;
          modisSeventyTwoOptions.infoTemplates = {};
          modisSeventyTwoOptions.layerIds.forEach((id) => { modisSeventyTwoOptions.infoTemplates[id] = { infoTemplate }; });
  
          //7D
          modisOneWeekOptions.id = 'MODIS_ACTIVE_FIRES_7D';
          modisOneWeekOptions.url = 'https://gis-gfw.wri.org/arcgis/rest/services/Fires/FIRMS_Global_MODIS_7d/MapServer';
          modisOneWeekOptions.visible = false;
          modisOneWeekOptions.infoTemplates = {};
          modisOneWeekOptions.layerIds.forEach((id) => { modisOneWeekOptions.infoTemplates[id] = { infoTemplate }; });
  
          //1YR
          modisOneYearOptions.id = 'MODIS_ACTIVE_FIRES_1YR';
          modisOneYearOptions.url = 'https://gis-gfw.wri.org/arcgis/rest/services/Fires/FIRMS_Global_MODIS_1yr/MapServer';
          modisOneYearOptions.visible = false;
          modisOneYearOptions.infoTemplates = {};
          modisOneYearOptions.layerIds.forEach((id) => { modisOneYearOptions.infoTemplates[id] = { infoTemplate }; });
  
          const modisFortyEight = new DynamicLayer(modisFortyEightOptions.url, modisFortyEightOptions);
          const modisSeventyTwo = new DynamicLayer(modisSeventyTwoOptions.url, modisSeventyTwoOptions);
          const modisOneWeek = new DynamicLayer(modisOneWeekOptions.url, modisOneWeekOptions);
          const modisOneYear = new DynamicLayer(modisOneYearOptions.url, modisOneYearOptions);
  
          fireLayers.push(modisFortyEight);
          fireLayers.push(modisSeventyTwo);
          fireLayers.push(modisOneWeek);
          fireLayers.push(modisOneYear);
        }
  
        if (fireLayers.length > 0) {
          fireLayers.forEach(fireLayer => {
            fireLayer.legendLayer = layer.legendLayer || null;
            fireLayer.layerIds = layer.layerIds;
            fireLayer.order = layer.order;
            fireLayer.label = layer.label;
          });
          brApp.map.addLayers(fireLayers);
        }
      }
      
      esriLayer = new DynamicLayer(layer.url, options);

      esriLayer.legendLayer = layer.legendLayer || null;
      esriLayer.layerIds = layer.layerIds;
      esriLayer.order = layer.order;
      esriLayer.label = layer.label;
    break;
    case 'feature':
      options.id = layer.id;
      options.visible = layer.visible || false;
      options.outFields = ['*'];
      // Feature layers always draw on top of everything, so we
      // will turn down the default opacity a bit to allow us to
      // see the tile layers through the features
      options.opacity = 0.8;
      if (layer.id === layerKeys.USER_FEATURES) {
        esriLayer = new GraphicsLayer(options);
      } else {
        if (layer.mode !== undefined) { options.mode = layer.mode; } // mode could be 0, must check against undefined
        if (layer.definitionExpression) { options.definitionExpression = layer.definitionExpression; }
        if (layer.popup) { options.infoTemplate = layerUtils.makeInfoTemplate(layer.popup, lang); }
        if (layer.minScale) { options.minScale = layer.minScale; }
        if (layer.maxScale) { options.maxScale = layer.maxScale; }
        if (!layer.url && layer.versions && layer.versions[0].url) { layer.url = layer.versions[0].url; }
        esriLayer = new FeatureLayer(layer.url, options);
      }
      esriLayer.legendLayer = layer.legendLayer || null;
      esriLayer.order = layer.order;
      esriLayer.label = layer.label;
    break;
    case 'graphic':
      options.id = layer.id;
      options.visible = layer.visible || false;
      if (layer.popup) { options.infoTemplate = layerUtils.makeInfoTemplate(layer.popup); }
      esriLayer = new GraphicsLayer(options);
      esriLayer.legendLayer = layer.legendLayer || null;
      esriLayer.order = layer.order;
      esriLayer.label = layer.label;
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
      esriLayer.label = layer.label;
    break;
      case 'forma':
        options.id = layer.id;
        options.url = layer.url;
        options.minDateValue = layer.minDateValue;
        options.maxDateValue = layer.maxDateValue;
        options.visible = layer.visible || false;
        esriLayer = new FormaLayer(options);
        esriLayer.legendLayer = layer.legendLayer || null;
        esriLayer.order = layer.order;
        esriLayer.label = layer.label;
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
      esriLayer.label = layer.label;
    break;
    case 'gain':
      options.id = layer.id;
      options.url = layer.url;
      options.visible = layer.visible || false;
      esriLayer = new TreeCoverGainLayer(options);
      esriLayer.legendLayer = layer.legendLayer || null;
      esriLayer.order = layer.order;
      esriLayer.label = layer.label;
    break;
    case 'primed':
      options.id = layer.id;
      options.url = layer.url;
      options.visible = layer.visible || false;
      esriLayer = new PrimaryForestLayer(options);
      esriLayer.legendLayer = layer.legendLayer || null;
      esriLayer.order = layer.order;
      esriLayer.label = layer.label;
    break;
    case 'terra':
      layer.visible = layer.visible || false;
      esriLayer = new TerraILayer(layer);
      esriLayer.legendLayer = layer.legendLayer || null;
      esriLayer.order = layer.order;
      esriLayer.label = layer.label;
    break;
    case 'wms':
      esriLayer = new WMSLayer(layer.url, {
        visibleLayers: [layer.layerName],
        id: layer.id,
        resourceInfo: {
          extent: new Extent(-179, -89, 179, 89, {
            wkid: 4326,
          }),
          layerInfos: [
            new WMSLayerInfo({
              name: layer.layerName,
              title: layer.layerName,
            })
          ],
        },
      });
      esriLayer.spatialReferences[0] = 3857;
      esriLayer.order = layer.order;
      esriLayer.label = layer.label;
      esriLayer.legendLayer = layer.legendLayer || null;
      esriLayer.visible = layer.visible || false;
      esriLayer.opacity = layer.opacity || 1;
    break;
    case 'imagery':
      options.id = layer.id;
      options.url = layer.url;
      options.visible = false;
      esriLayer = new GFWImageryLayer(options);
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
