import layerKeys from 'constants/LayerConstants';
import rasterFuncs from 'utils/rasterFunctions';
import utils from 'utils/AppUtils';
import moment, { isMoment } from 'moment';

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

  /**
  * @param {number} optionIndex - Index of the selected option in the UI, see js/config
  * @param {boolean} dontRefresh - Whether or not to not fetch a new image
  */
  updateFiresLayerDefinitions (startDate, endDate, layer, dontRefresh) {
    if (brApp.map) {
      const queryString = this.generateFiresQuery(startDate, endDate);
      const firesLayer = layer.hasOwnProperty('visibleLayers') ? layer : brApp.map.getLayer(layer.id);
      const defs = [];

      if (firesLayer) {
        firesLayer.visibleLayers.forEach(val => { defs[val] = queryString; });
        firesLayer.setLayerDefinitions(defs, dontRefresh);
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
