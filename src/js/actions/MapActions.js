import dispatcher from 'js/dispatcher';
import layerFactory from 'utils/layerFactory';
import layerKeys from 'constants/LayerConstants';
import Point from 'esri/geometry/Point';

class MapActions {
  //- Action to notify the store the map has changed so we can rerender UI changes
  //- if necessary
  mapUpdated () { return {}; }

  infoWindowUpdated ({target}) {
    return (target && target.getSelectedFeature && target.getSelectedFeature()) || false;
  }

  changeActiveTab (tabId) {
    return {
      id: tabId
    };
  }

  setAnalysisType (evt) {
    return {
      type: evt.target.value
    };
  }

  centerAndZoomLatLng (lat, lng) {
    brApp.map.centerAndZoom(new Point(lng, lat), 9);
  }

  //- Straight through dispatches, all have the following format
  /**
  * @param {object} - data
  * @param {boolean} - data.visible
  * @return {object} - data
  */
  toggleAnalysisModal = (data) => data;
  togglePrintModal = (data) => data;
  toggleSearchModal = (data) => data;
  toggleCanopyModal = (data) => data;
  toggleLayerModal = (data) => data;
  toggleTOCVisible = (data) => data;
  showLayerInfo = (layer) => layer;
  updateTimeExtent = (timeExtent) => timeExtent;
  toggleLegendVisible = () => { return {}; };
  toggleMobileTimeWidgetVisible = () => { return {}; };

  updateImazonAlertSettings (type, value) {
    return { type, value };
  }

  changeBasemap (basemap) {
    return basemap;
  }

  updateCanopyDensity (density) {
    return { density };
  }

  updateActiveSlopeClass (classValue) {
    return classValue;
  }

  openTOCAccordion (groupKey) {
    return groupKey;
  }

  createLayers (map, layerPanel, activeLayers, language) {
    //- Organize and order the layers before adding them to the map
    let layers = Object.keys(layerPanel).filter((groupName) => {
      //- remove basemaps and extra layers, extra layers will be added later and basemaps
      //- handled differently elsewhere
      return groupName !== layerKeys.GROUP_BASEMAP && groupName !== layerKeys.EXTRA_LAYERS;
    }).sort((a, b) => {
      //- Sort the groups based on their order property
      return layerPanel[a].order < layerPanel[b].order;
    }).reduce((list, groupName) => {
      //- Flatten them into a single list but before that,
      //- Multiple the order by 100 so I can sort them more easily below, this is because there
      //- order numbers start at 0 for each group, so group 0, layer 1 would have order of 1
      //- while group 1 layer 1 would have order of 100, and I need to integrate with webmap layers
      return list.concat(layerPanel[groupName].layers.map((layer, index) => {
        layer.order = (layerPanel[groupName].order * 100) - (layer.order || index);
        return layer;
      }));
    }, []);

    //- Add the extra layers now that all the others have been sorted
    layers = layers.concat(layerPanel.extraLayers);

    //- make sure there's only one entry for each dynamic layer
    const uniqueLayers = [];
    const existingIds = [];
    layers.forEach(layer => {
      if (existingIds.indexOf(layer.id) === -1) {
        uniqueLayers.push(layer);
        existingIds.push(layer.id);
      }
    });
    //- If we are changing webmaps, and any layer is active, we want to make sure it shows up as active in the new map
    //- Make those updates here to the config as this will trickle down
    uniqueLayers.forEach(layer => {
      layer.visible = activeLayers.indexOf(layer.id) > -1 || layer.visible;
    });
    //- remove layers from config that have no url unless they are of type graphic(which have no url)
    //- sort by order from the layer config
    //- return an arcgis layer for each config object
    const esriLayers = uniqueLayers.filter(layer => layer && (layer.url || layer.type === 'graphic')).map((layer) => {
      return layerFactory(layer, language);
    });
    map.addLayers(esriLayers);
    // If there is an error with a particular layer, handle that here
    map.on('layers-add-result', result => {
      const addedLayers = result.layers;
      // Check for Errors
      var layerErrors = addedLayers.filter(layer => layer.error);
      if (layerErrors.length > 0) { console.error(layerErrors); }
      //- Sort the layers, Webmap layers need to be ordered, unfortunately graphics/feature
      //- layers wont be sorted, they always show on top
      uniqueLayers.forEach((layer) => {
        if (map.getLayer(layer.id) && layer.order) {
          map.reorderLayer(map.getLayer(layer.id), layer.order);
        }
      });
      if (map.getLayer('labels')) {
        map.reorderLayer(map.getLayer('labels'), 200);
      }
    });
    //- Return the layers through the dispatcher so the mapstore can update visible layers
    return {
      layers,
      map
    };
  }

}

export default dispatcher.createActions(MapActions);
