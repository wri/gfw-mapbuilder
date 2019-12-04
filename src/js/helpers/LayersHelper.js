import layerKeys from 'constants/LayerConstants';
import rasterFuncs from 'utils/rasterFunctions';
import utils from 'utils/AppUtils';
import moment, { isMoment } from 'moment';
import {shortTermServices} from '../config';
import layerActions from '../actions/LayerActions';

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

  updateFiresLayerDefinitions (startDate = null, endDate = null, layer, selectValue = null, map = brApp.map) {
    if (map) {
      const fireID = layer.id.includes('VIIRS_ACTIVE_FIRES') ? 'VIIRS' : 'MODIS';
      const layer24HR = map.getLayer(`${fireID}_ACTIVE_FIRES`);
      const layer48HR = map.getLayer(`${fireID}_ACTIVE_FIRES_48HR`);
      const layer72HR = map.getLayer(`${fireID}_ACTIVE_FIRES_72HR`);
      const layer7D = map.getLayer(`${fireID}_ACTIVE_FIRES_7D`);
      const layer1YR = map.getLayer(`${fireID}_ACTIVE_FIRES_1YR`);
      
      if (selectValue && layer24HR && layer48HR && layer72HR && layer7D && layer1YR) {
          const defs = [];
          switch (parseInt(selectValue)) {
            case 1: //past 24 hours
              layer24HR.show();
              layer48HR.hide();
              layer72HR.hide();
              layer7D.hide();
              layer1YR.hide();
              break;
            case 2: //past 48 hours
              layer24HR.hide();
              layer48HR.show();
              layer72HR.hide();
              layer7D.hide();
              layer1YR.hide();
              break;
            case 3: //past 72 hours
              defs[shortTermServices[`${fireID.toLowerCase()}7D`].id] = `Date > date'${moment(new Date()).subtract(3, 'd').format('YYYY-MM-DD HH:mm:ss')}'`;
              layer72HR.setVisibleLayers([shortTermServices[`${fireID.toLowerCase()}7D`].id]);
              layer72HR.setLayerDefinitions(defs);
              layer24HR.hide();
              layer48HR.hide();
              layer72HR.show();
              layer7D.hide();
              layer1YR.hide();
              break;
            case 4: //past 7 days
              layer24HR.hide();
              layer48HR.hide();
              layer72HR.hide();
              layer7D.show();
              layer1YR.hide();
              break;
            case 5: //past year
              const queryString = this.generateFiresQuery(startDate, endDate);
              defs[shortTermServices[`${fireID.toLowerCase()}1YR`].id] = queryString;
              layer1YR.setLayerDefinitions(defs);
              if (layer24HR.visible || layer48HR.visible || layer72HR.visible || layer7D.visible) {
                layer1YR.show();
              }
              layer24HR.hide();
              layer48HR.hide();
              layer72HR.hide();
              layer7D.hide();
              break;
            default:
              console.log('default');
              break;
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
      let layer = map.getLayer(layerKeys.TREE_COVER);

      if (layer && layerConfig) {
        const renderingRule = rasterFuncs.getColormapRemap(layerConfig.colormap, [density, layerConfig.inputRange[1]], layerConfig.outputRange);
        layer.setRenderingRule(renderingRule);
      } else if (layerConfig) {
        const renderingRule = rasterFuncs.getColormapRemap(layerConfig.colormap, [density, layerConfig.inputRange[1]], layerConfig.outputRange);
        const tcSignal = map.on('layers-add-result', () => {
          tcSignal.remove();
          layer = map.getLayer(layerKeys.TREE_COVER);
          if (layer) {
            layer.setRenderingRule(renderingRule);
          }
        });
      }
    }
  },

  updateAGBiomassLayer (density, map) {
    if (map.loaded) {
      let layer = map.getLayer(layerKeys.AG_BIOMASS);
      const mosaicRule = rasterFuncs.getBiomassMosaicRule(density);

      if (layer) {
        layer.setMosaicRule(mosaicRule);
      } else {
        const bmSignal = map.on('layers-add-result', () => {
          bmSignal.remove();
          layer = map.getLayer(layerKeys.AG_BIOMASS);
          if (layer) {
            layer.setMosaicRule(mosaicRule);
          }
        });
      }
    }
  }

};

export { LayersHelper as default };
