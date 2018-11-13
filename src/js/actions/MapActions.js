import dispatcher from 'js/dispatcher';
import layerFactory from 'utils/layerFactory';
import layerKeys from 'constants/LayerConstants';
// import CartoLayer from 'js/layers/CartoLayer';
import appActions from 'actions/AppActions';
import resources from 'resources';
import Point from 'esri/geometry/Point';
import AppUtils from '../utils/AppUtils';

let layersCreated = false;

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

  setAnalysisType (value) {
    return value;
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
  toggleSubscriptionsModal = (data) => data;
  toggleSubscribeModal = (data) => data;
  toggleConfirmModal = (data) => data;
  toggleTOCVisible = (data) => data;
  showLayerInfo = (layer) => layer;
  updateTimeExtent = (timeExtent) => timeExtent;
  toggleEditing = () => { return {}; };
  toggleLegendVisible = () => { return {}; };
  toggleMobileTimeWidgetVisible = () => { return {}; };

  toggleLogin = (data) => data;

  deleteSubscription (subscription) {
    return subscription;
  }

  setUserSubscriptions (subscriptions) {
    return subscriptions;
  }

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
    let maxOrder = 0;
    let layers = Object.keys(layerPanel).filter((groupName) => {
      //- remove basemaps and extra layers, extra layers will be added later and basemaps
      //- handled differently elsewhere
      return groupName !== layerKeys.GROUP_BASEMAP && groupName !== layerKeys.EXTRA_LAYERS;
    }).sort((a, b) => {
      //- Sort the groups based on their order property
      return layerPanel[b].order - layerPanel[a].order;
    }).reduce((list, groupName, groupIndex) => {
        //- Flatten them into a single list but before that,
        //- Multiple the order by 100 so I can sort them more easily below, this is because there
        //- order numbers start at 0 for each group, so group 0, layer 1 would have order of 1
        //- while group 1 layer 1 would have order of 100, and I need to integrate with webmap layers
      if (groupIndex === 0) {
        maxOrder = layerPanel[groupName].order + 1;
      }

      const orderedGroups = layerPanel[groupName].layers.map((layer, index) => {
        if (layersCreated === false || groupName === 'GROUP_WEBMAP') {
          layer.order = ((maxOrder - layerPanel[groupName].order) * 100) - (layer.order || index);
        }

        return layer;
      });
      return list.concat(orderedGroups);


    }, []);
    //- Add the extra layers now that all the others have been sorted
    layers = layers.concat(layerPanel.extraLayers);

    //- make sure there's only one entry for each dynamic layer
    const reducedLayers = layers.reduce((prevArray, currentItem) => {
      if (currentItem.hasOwnProperty('nestedLayers')) {
        return prevArray.concat(...currentItem.nestedLayers);
      }
      return prevArray.concat(currentItem);
    }, []);
    const uniqueLayers = [];
    const existingIds = [];

    reducedLayers
      .forEach(layer => {
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
    const esriLayers = uniqueLayers
      .filter(layer => layer && (layer.url || layer.type === 'graphic')).map((layer) => {
        return layerFactory(layer, language);
      }).sort((a, b) => a.order - b.order);

    map.addLayers(esriLayers);
    // If there is an error with a particular layer, handle that here
    map.on('layers-add-result', result => {
      const addedLayers = result.layers;
      // Prepare the carto layer
      var cartoLayers = addedLayers.filter(layer => layer.layer.cartoUser);
      cartoLayers.forEach((cartoLayer) => {
        cartoLayer.layer.on('onCartoLayerAdd', evt => {
          const tempResources = resources;
          tempResources.layerPanel.GROUP_CARTO.layers = evt.target.cartoLayers;
          appActions.applySettings(tempResources);
        });
      });

      // Check for Errors
      var layerErrors = addedLayers.filter(layer => layer.error);
      if (layerErrors.length > 0) { console.error(layerErrors); }
      //- Sort the layers, Webmap layers need to be ordered, unfortunately graphics/feature
      //- layers wont be sorted, they always show on top

      uniqueLayers.forEach((l, i) => {
        map.reorderLayer(l, i + 1);
      });

      if (map.getLayer('labels')) {
        map.reorderLayer(map.getLayer('labels'), 200);
      }
      // Appending the mask to the end of the parent div to make sure mask is always on top of all layers
      var mask = document.getElementById('esri.Map_0_MASK');
      if (mask && mask.parentNode) {
        mask.parentNode.appendChild(mask);
      }
    });

    // Replace context.settings.layerPanel layers with the newly configured esriLayers
    Object.keys(layerPanel)
      .filter(groupKey => (
        // filter out the groups we don't need
        groupKey !== layerKeys.GROUP_BASEMAP
        && groupKey !== layerKeys.GROUP_WEBMAP
        && groupKey !== layerKeys.EXTRA_LAYERS
      ))
      .forEach(group => {
        layerPanel[group].layers.map(l => {
          // for each layer, replace with the configured layer in 'layers'
          if (l.hasOwnProperty('nestedLayers')) { // this is a nested group
            l.nestedLayers.map(nl => {
              if (nl.url) {
                const nestedLayer = AppUtils.getObject(esriLayers, 'id', nl.id);
                nl.esriLayer = nestedLayer;
              }
              return nl;
            });
            return l;
          }
          // if this is not a nested layer
          // make sure it is not a webmap layer
          // (don't replace layers without a url property)
          if (l.url) {
            const layer = AppUtils.getObject(esriLayers, 'id', l.id);
            l.esriLayer = layer;
          }
          return l;
        });
      });

    layersCreated = true;

    //- Return the layers through the dispatcher so the mapstore can update visible layers
    return {
      layers,
      map
    };
  }

  toggleAnalysisTab(bool) {
    return bool;
  }

  updateExclusiveRadioIds(arr) {
    return arr;
  }

  updateAnalysisParams(params) {
    return params;
  }

  updateAnalysisSliderIndices = params => params;

  activateDrawButton(bool) {
    return bool;
  }

}

export default dispatcher.createActions(MapActions);
