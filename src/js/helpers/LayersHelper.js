import layerKeys from 'constants/LayerConstants';
import rasterFuncs from 'utils/rasterFunctions';
import utils from 'utils/AppUtils';
import moment, { isMoment } from 'moment';
import {shortTermServices} from '../config';
import layerFactory from '../utils/layerFactory';
import layerActions from '../actions/LayerActions';

import layerUtils from 'utils/layerUtils';
import DynamicLayer from 'esri/layers/ArcGISDynamicMapServiceLayer';
import resources from 'resources';

const LayersHelper = {

  /**
  * @param {string} layerId - id of layer to show
  */
  showLayer (layerId) {
    const layer = brApp.map.getLayer(layerId);
    if (layer) { layer.show(); }
  },
  showSubLayer (layer) {
    const {esriLayer} = layer;
    esriLayer.setVisibleLayers(esriLayer.visibleLayers);
  },
  /**
  * @param {string} layerId - id of layer to hide
  */
  hideLayer (layerId) {
    const layer = brApp.map.getLayer(layerId);
    if (layer) { layer.hide(); }
  },
  hideSubLayer (layer) {
    const {esriLayer} = layer;
    esriLayer.setVisibleLayers(esriLayer.visibleLayers);
  },

  updateFiresLayerDefinitions (startDate = null, endDate = null, layer, language, selectValue = null) {
    if (brApp.map) {
      const firesLayer = layer.hasOwnProperty('visibleLayers') ? layer : brApp.map.getLayer(layer.id);
      //const newFiresLayer = firesLayer;
      //newFiresLayer.layersId = [21];
      //const fireID = firesLayer.id.includes('VIIRS_ACTIVE_FIRES') ? 'viirs' : 'modis';
      
      const fireID = firesLayer.id.includes('VIIRS_ACTIVE_FIRES') ? 'VIIRS' : 'MODIS';
      const layer24HR = brApp.map.getLayer(`${fireID}_ACTIVE_FIRES_24HR`);
      const layer48HR = brApp.map.getLayer(`${fireID}_ACTIVE_FIRES_48HR`);
      const layer72HR = brApp.map.getLayer(`${fireID}_ACTIVE_FIRES_72HR`);
      const layer7D = brApp.map.getLayer(`${fireID}_ACTIVE_FIRES_7D`);
      const layer1YR = brApp.map.getLayer(`${fireID}_ACTIVE_FIRES_1YR`);
      
      console.log('layer 48', layer48HR);
      
      if (selectValue) {
        if (firesLayer && firesLayer.visible) {
          const defs = [];
          switch (parseInt(selectValue)) {
            case 0: //past 24 hours
              // newFiresLayer.url = shortTermServices[`${fireID}24HR`].url;
              // newFiresLayer._url.path = shortTermServices[`${fireID}24HR`].url;
              // newFiresLayer.setVisibleLayers([shortTermServices[`${fireID}24HR`].id]);
              // brApp.map.removeLayer(firesLayer);
              // brApp.map.addLayer(newFiresLayer);
              // layerActions.removeActiveLayer(firesLayer.id);
              // layerActions.addActiveLayer(newFiresLayer.id);
              // console.log('new fires layer', newFiresLayer);
              layer24HR.hide();
              layer48HR.hide();
              layer72HR.hide();
              layer7D.hide();
              layer1YR.hide();
              firesLayer.show();
              break;
            case 1: //past 48 hours
              // newFiresLayer.url = shortTermServices[`${fireID}48HR`].url;
              // newFiresLayer._url.path = shortTermServices[`${fireID}48HR`].url;
              // newFiresLayer.setVisibleLayers([shortTermServices[`${fireID}48HR`].id]);
              // brApp.map.removeLayer(firesLayer);
              // brApp.map.addLayer(newFiresLayer);
              // layerActions.removeActiveLayer(firesLayer.id);
              // layerActions.addActiveLayer(newFiresLayer.id);
              // console.log('new fires layer', newFiresLayer);
              layer24HR.hide();
              layer48HR.hide();
              layer72HR.hide();
              layer7D.hide();
              layer1YR.hide();
              firesLayer.show();
              break;
            case 2: //past 72 hours
              // newFiresLayer.url = shortTermServices[`${fireID}7D`].url;
              // newFiresLayer._url.path = shortTermServices[`${fireID}7D`].url;
              // newFiresLayer.setVisibleLayers([shortTermServices[`${fireID}7D`].id]);
              // defs[shortTermServices[`${fireID}7D`].id] = `Date > date'${moment(new Date()).subtract(3, 'd').format('YYYY-MM-DD HH:mm:ss')}'`;
              // newFiresLayer.setLayerDefinitions(defs);
              // brApp.map.removeLayer(firesLayer);
              // brApp.map.addLayer(newFiresLayer);
              // layerActions.removeActiveLayer(firesLayer.id);
              // layerActions.addActiveLayer(newFiresLayer.id);
              // console.log('new fires layer', newFiresLayer);
              layer24HR.hide();
              layer48HR.hide();
              layer72HR.hide();
              layer7D.hide();
              layer1YR.hide();
              firesLayer.show();
              break;
            case 3: //past 7 days
              // newFiresLayer.url = shortTermServices[`${fireID}7D`].url;
              // newFiresLayer._url.path = shortTermServices[`${fireID}7D`].url;
              // newFiresLayer.setVisibleLayers([shortTermServices[`${fireID}7D`].id]);
              // brApp.map.removeLayer(firesLayer);
              // brApp.map.addLayer(newFiresLayer);
              // layerActions.removeActiveLayer(firesLayer.id);
              // layerActions.addActiveLayer(newFiresLayer.id);
              // console.log('new fires layer', newFiresLayer);
              layer24HR.hide();
              layer48HR.hide();
              layer72HR.hide();
              layer7D.hide();
              layer1YR.hide();
              firesLayer.show();
              break;
            case 4: //past year
              // const queryString = this.generateFiresQuery(startDate, endDate);
              // newFiresLayer.url = shortTermServices[`${fireID}1YR`].url;
              // newFiresLayer._url.path = shortTermServices[`${fireID}1YR`].url;
              // newFiresLayer.setVisibleLayers([shortTermServices[`${fireID}1YR`].id]);
              // newFiresLayer.visibleLayers.forEach(val => { defs[val] = queryString; });
              // newFiresLayer.setLayerDefinitions(defs);
              // brApp.map.removeLayer(firesLayer);
              // brApp.map.addLayer(newFiresLayer);
              // layerActions.removeActiveLayer(firesLayer.id);
              // layerActions.addActiveLayer(newFiresLayer.id);
              // console.log('new fires layer', newFiresLayer);
              layer24HR.hide();
              layer48HR.hide();
              layer72HR.hide();
              layer7D.hide();
              layer1YR.hide();
              firesLayer.show();
              break;
            default:
              console.log('default');
              break;
          }
          //newFiresLayer.setLayerDefinitions(defs);
        }
      }
    }
  },

  /**
  * Generate a date query for active fires layers
  * @param {number} filterValue - Numeric value representing the number of days to show in the output query
  * @return {string} Query String to use for Fires Filter
  */
  generateFiresQuery (startDate, endDate) {
    if (!isMoment(startDate)) {
      startDate = moment(startDate);
    }

    if (!isMoment(endDate)) {
      endDate = moment(endDate);
    }
    const start = `${startDate.year()}-${startDate.month() + 1}-${startDate.date()} ${startDate.hours()}:${startDate.minutes()}:${startDate.seconds()}`;
    const end = `${endDate.year()}-${endDate.month() + 1}-${endDate.date()} ${endDate.hours()}:${endDate.minutes()}:${endDate.seconds()}`;
    return 'ACQ_DATE > date \'' + start + '\'' + ' AND ' + 'ACQ_DATE < date \'' + end + '\'';
  },

  isLayerVisible (map, layerInfo) {
    // Non-webmap layers, always assume visible.
    let visible = true;
    // Layers have a visibleAtMapScale property which make this easy.
    if (layerInfo.esriLayer && layerInfo.esriLayer.loaded) {
      if (layerInfo.esriLayer.hasOwnProperty('visibleAtMapScale') && !layerInfo.esriLayer.visibleAtMapScale) {
        const scale = map.getScale();
        if ((scale > layerInfo.esriLayer.minScale) || (scale < layerInfo.esriLayer.maxScale)) {
          visible = false;
          layerInfo.visible = visible;
        }
      }
    }
    if (map && map.getScale && layerInfo.esriLayer) {
      // Explicitly check scale depencency for sub-layers in a dynamic map service.
      const scale = map.getScale();
      if (layerInfo.hasScaleDependency && ((scale > layerInfo.minScale && layerInfo.minScale !== 0) || scale < layerInfo.maxScale)) {
        visible = false;
        layerInfo.visible = visible;
      }
    }
    return visible;
  },

  updateTreeCoverDefinitions (density, map, layerPanel) {
    if (map.loaded) {
      //- Get the layer config, I am hardcoding en becuase I do not need anything language specific, just its config
      const lcGroupLayers = layerPanel.GROUP_LC ? layerPanel.GROUP_LC.layers : [];
      const layerConfig = utils.getObject(lcGroupLayers, 'id', layerKeys.TREE_COVER);
      const layer = map.getLayer(layerKeys.TREE_COVER);

      if (layer && layerConfig) {
        const renderingRule = rasterFuncs.getColormapRemap(layerConfig.colormap, [density, layerConfig.inputRange[1]], layerConfig.outputRange);
        layer.setRenderingRule(renderingRule);
      }
    }
  },

  updateAGBiomassLayer (density, map) {
    if (map.loaded) {
      const layer = map.getLayer(layerKeys.AG_BIOMASS);
      const mosaicRule = rasterFuncs.getBiomassMosaicRule(density);

      if (layer) {
        layer.setMosaicRule(mosaicRule);
      }
    }
  }

};

export { LayersHelper as default };
