/* eslint no-unused-vars: 0 */
/* Creating some esri dijits needs the above rule disabled, choosing this over no-new */
import MobileTimeWidget from 'components/MapControls/MobileTimeWidget';
import FooterInfos from 'components/MapControls/FooterInfos';
import AnalysisModal from 'components/Modals/AnalysisModal';
import Controls from 'components/MapControls/ControlPanel';
import TimeWidget from 'components/MapControls/TimeWidget';
import CanopyModal from 'components/Modals/CanopyModal';
import LayerModal from 'components/Modals/LayerModal';
import Legend from 'components/LegendPanel/LegendPanel';
import TabButtons from 'components/TabPanel/TabButtons';
import SearchModal from 'components/Modals/SearchModal';
import PrintModal from 'components/Modals/PrintModal';
import TabView from 'components/TabPanel/TabView';
import layerKeys from 'constants/LayerConstants';
import arcgisUtils from 'esri/arcgis/utils';
import mapActions from 'actions/MapActions';
import appActions from 'actions/AppActions';
import layerActions from 'actions/LayerActions';
import Scalebar from 'esri/dijit/Scalebar';
import {actionTypes} from 'constants/AppConstants';
import on from 'dojo/on';
import {getUrlParams} from 'utils/params';
import basemapUtils from 'utils/basemapUtils';
import analysisUtils from 'utils/analysisUtils';
import MapStore from 'stores/MapStore';
import esriRequest from 'esri/request';
import {mapConfig} from 'js/config';
import utils from 'utils/AppUtils';
import resources from 'resources';
import React, {
  Component,
  PropTypes
} from 'react';

let scalebar, paramsApplied = false;

const getTimeInfo = (operationalLayer) => {
  return operationalLayer.resourceInfo && operationalLayer.resourceInfo.timeInfo;
};

const getTimeEnabledLayer = (webmapInfo) => {
  let timeLayer;
  if (webmapInfo && webmapInfo.operationalLayers) {
    webmapInfo.operationalLayers.some((layer) => {
      if (layer && layer.resourceInfo && layer.resourceInfo.timeInfo) {
        timeLayer = layer;
        return true;
      }
    });
  }
  return timeLayer;
};

export default class Map extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired
  };

  static childContextTypes = {
    activeWebmap: PropTypes.string,
    webmapInfo: PropTypes.object,
    map: PropTypes.object
  };

  getChildContext = () => {
    return {
      activeWebmap: this.props.activeWebmap,
      webmapInfo: this.state.webmapInfo,
      map: this.state.map
    };
  };

  constructor (props) {
    super(props);
    this.map = {};
    this.webmapInfo = {};
    this.state = {
      map: {},
      webmapInfo: {},
      ...MapStore.getState()
    };

  }

  componentDidMount() {
    MapStore.listen(this.storeDidUpdate);
  }

  componentDidUpdate (prevProps, prevState) {
    const {settings, language} = this.context;
    const {activeWebmap} = this.props;
    const {basemap, map} = this.state;

    // If the webmap is retrieved from AGOL or the resources file, or it changes
    if (
      prevProps.activeWebmap === undefined && activeWebmap ||
      prevProps.activeWebmap !== undefined && prevProps.activeWebmap !== activeWebmap
    ) {
      const options = mapConfig.options;

      if (map.destroy) {
        // Don't let the extent change to the new map
        options.extent = map.extent;
        map.destroy();
        scalebar.destroy();
      }

      this.createMap(activeWebmap, options);
    }

    if ((prevState.basemap !== basemap || prevState.map !== map) && map.loaded) {
      basemapUtils.updateBasemap(map, basemap, settings.layerPanel.GROUP_BASEMAP.layers);
    }
  }

  storeDidUpdate = () => {
    this.setState(MapStore.getState());
  };

  createMap = (webmap, options) => {
    const {language, settings} = this.context;

    arcgisUtils.createMap(webmap, this.refs.map, { mapOptions: options, usePopupManager: true }).then(response => {
      // Add operational layers from the webmap to the array of layers from the config file.
      const {itemData} = response.itemInfo;
      this.addLayersToLayerPanel(settings, itemData.operationalLayers);
      // Store a map reference and clear out any default graphics
      response.map.graphics.clear();
      //- Attach events I need for the info window
      response.map.infoWindow.on('show, hide, set-features, selection-change', mapActions.infoWindowUpdated);
      response.map.on('zoom-end', mapActions.mapUpdated);

      //- Add a scalebar
      scalebar = new Scalebar({
        map: response.map,
        scalebarUnit: 'metric'
      });

      on.once(response.map, 'update-end', () => {
        mapActions.createLayers(response.map, settings.layerPanel, this.state.activeLayers, language);
        this.applyLayerStateFromUrl(response.map, itemData);
        //- Apply the mask layer defintion if present
        if (settings.iso && settings.iso !== '') {
          const maskLayer = response.map.getLayer(layerKeys.MASK);
          if (maskLayer) {
            const layerDefs = [];
            maskLayer.visibleLayers.forEach((layerNum) => {
              layerDefs[layerNum] = `code_iso3 <> '${encodeURIComponent(settings.iso)}'`;
            });
            maskLayer.setLayerDefinitions(layerDefs);
            maskLayer.show();
          }
        }

        //- Add click event for user-features layer
        const userFeaturesLayer = response.map.getLayer(layerKeys.USER_FEATURES);
        userFeaturesLayer.on('click', (evt) => {
          if (evt.graphic && evt.graphic.attributes) {
            evt.stopPropagation();
            if (!evt.graphic.attributes.geostoreId) {
              analysisUtils.registerGeom(evt.graphic.geometry).then(res => {
                evt.graphic.attributes.geostoreId = res.data.id;
                response.map.infoWindow.setFeatures([evt.graphic]);
              });
            } else {
              response.map.infoWindow.setFeatures([evt.graphic]);
            }
          }
        });
      });
      //- Set the map's extent to its current extent to trigger our update-end
      response.map.setExtent(response.map.extent);

      //- Load any shared state if available but only on first load
      if (!paramsApplied) {
        this.applyStateFromUrl(response.map, getUrlParams(location.search));
        paramsApplied = true;
      }
      //- Make the map a global in debug mode for easier debugging
      if (brApp.debug) { brApp.map = response.map; }

      //- Update local state since the map is ready now, keep above userFeaturesLayer
      //- If that layer has an invalid token, it may cause issues
      this.setState({
        webmapInfo: response.itemInfo.itemData,
        map: response.map
      });
    });
  };

  applyStateFromUrl = (map, params) => {
    console.log(params);
    const {settings} = this.context;
    const {x, y, z, l, b, t, c, gs, ge, ts, te, ls, le} = params;

    const langKeys = Object.keys(settings.labels);

    //TODO: If we have a '#' at the start of our location.search, this won't work properly --> Our params come back as an empty object!
    // so check our 'getUrlParams' function

    // Set zoom. If we have a language, set that after we have gotten our hash-initiated extent
    if (x && y && z && l && langKeys.indexOf(l) > -1) {
      on.once(map, 'extent-change', () => {
        appActions.setLanguage.defer(l);
      });

      map.centerAndZoom([x, y], z);
    } else if (x && y && z) {
      map.centerAndZoom([x, y], z);
    } else if (l && langKeys.indexOf(l) > -1) {
      appActions.setLanguage.defer(l);
    }

    if (t) {
      mapActions.changeActiveTab(t);
    }

    if (c) {
      mapActions.updateCanopyDensity(c);
    }

    if (gs) {
      layerActions.updateGladStartDate(new Date(gs));
    }
    if (ge) {
      layerActions.updateGladEndDate(new Date(ge));
    }

    if (ls && le) {
      layerActions.updateLossTimeline({
        fromSelectedIndex: parseInt(ls),
        toSelectedIndex: parseInt(le)
      });
    }

  };

  /**
  * NOTE: We are applying state here for certain properties because of the timing of these actions: certain things
  * like terrai & basemaps need to be set After our map has been loaded or layers have been added
  */
  applyLayerStateFromUrl = (map, itemData) => {
    const basemap = itemData && itemData.baseMap;
    const params = getUrlParams(location.search);

    //- Set the default basemap in the store
    basemapUtils.prepareDefaultBasemap(map, basemap.baseMapLayers, params);

    if (params.b) {
      mapActions.changeBasemap(params.b);
    }
    if (params.a) {
      const layerIds = params.a.split(',');
      layerIds.forEach(layerId => {
        // TODO: Confirm this with layerIds and subId's!
        layerActions.addActiveLayer(layerId);
      });
    }
    if (params.ts) {
      layerActions.updateTerraIStartDate(new Date(params.ts));
    }
    if (params.te) {
      layerActions.updateTerraIEndDate(new Date(params.te));
    }

    if (params.vs && params.ve) {
      layerActions.updateViirsStartDate(new Date(params.vs));
      layerActions.updateViirsEndDate(new Date(params.ve));
    }

    if (params.ms && params.me) {
      layerActions.updateModisStartDate(new Date(params.ms));
      layerActions.updateModisEndDate(new Date(params.me));
    }

    if (params.ism && params.iem && params.isy && params.iey) {
      mapActions.updateImazonAlertSettings(actionTypes.UPDATE_IMAZON_START_MONTH, parseInt(params.ism));
      mapActions.updateImazonAlertSettings(actionTypes.UPDATE_IMAZON_END_MONTH, parseInt(params.iem));
      mapActions.updateImazonAlertSettings(actionTypes.UPDATE_IMAZON_START_YEAR, parseInt(params.isy));
      mapActions.updateImazonAlertSettings(actionTypes.UPDATE_IMAZON_END_YEAR, parseInt(params.iey));
    }
  }

  addLayersToLayerPanel = (settings, operationalLayers) => {
    const {language} = this.context, layers = [];
    // Remove any already existing webmap layers
    settings.layerPanel.GROUP_WEBMAP.layers = [];
    // If an additional language is configured but no additional webmap is, we need to push the layer config into both
    // languages so the original webmap works in both views
    const saveLayersInOtherLang = (
      // !settings.alternativeWebmap && //This statement can't grab certain bilingual labels
      settings.alternativeLanguage &&
      settings.useAlternativeLanguage
    );
    // Add the layers to the webmap group
    /**
    * NOTE: We use unshift because pushing the layers into an array results in a list that is
    * reversed from the webmap in ArcGIS Online, however, dynamic layers show up as separate layers in
    * our UI, but not in AGOL, so we need to not reverse those individual layers but make sure as a group
    * they show up in the correct location, which is why they have different logic for adding them to
    * the list than any other layers, push them in an array, then unshift in reverse order
    */
    operationalLayers.forEach((layer) => {
      if (layer.layerType === 'ArcGISMapServiceLayer' && layer.resourceInfo.layers) {
        const dynamicLayers = [];
        layer.resourceInfo.layers.forEach((sublayer, idx) => {
          const visible = layer.layerObject.visibleLayers.indexOf(sublayer.id) > -1;
          const scaleDependency = (sublayer.minScale > 0 || sublayer.maxScale > 0);
          const layerInfo = {
            id: layer.id,
            subId: `${layer.id}_${sublayer.id}`,
            subIndex: sublayer.id,
            hasScaleDependency: scaleDependency,
            maxScale: sublayer.maxScale,
            minScale: sublayer.minScale,
            label: sublayer.name,
            opacity: 1,
            visible: visible,
            order: sublayer.order || idx + 1,
            esriLayer: layer.layerObject
          };
          dynamicLayers.push(layerInfo);
        });
        // Push the dynamic layers into the array in their current order
        for (let i = dynamicLayers.length - 1; i >= 0; i--) {
          layers.unshift(dynamicLayers[i]);
        }
      } else if (layer.layerType === 'ArcGISFeatureLayer' && layer.featureCollection && layer.featureCollection.layers) {
        layer.featureCollection.layers.forEach((sublayer) => {
          const layerInfo = {
            id: sublayer.id,
            label: sublayer.title,
            opacity: sublayer.opacity,
            visible: layer.visibility,
            esriLayer: sublayer.layerObject,
            itemId: layer.itemId
          };
          layers.unshift(layerInfo);
        });
      } else {
        const layerInfo = {
          id: layer.id,
          label: layer.title,
          opacity: layer.opacity,
          visible: layer.visibility,
          esriLayer: layer.layerObject,
          itemId: layer.itemId
        };
        layers.unshift(layerInfo);
      }
    });

    //- Set up the group labels and group layers
    settings.layerPanel.GROUP_WEBMAP.layers = layers;
    settings.layerPanel.GROUP_WEBMAP.label[language] = settings.labels[language] ? settings.labels[language].webmapMenuName : '';

    if (saveLayersInOtherLang) {
      settings.layerPanel.GROUP_WEBMAP.label[settings.alternativeLanguage] = settings.labels[settings.alternativeLanguage].webmapMenuName;
    }
  };

  render () {
    const {
      mobileTimeWidgetVisible,
      currentTimeExtent,
      printModalVisible,
      analysisModalVisible,
      searchModalVisible,
      canopyModalVisible,
      layerModalVisible,
      modalLayerInfo,
      webmapInfo,
      map,
      activeLayers
    } = this.state;

    const { settings } = this.context;

    const timeSlider = webmapInfo && webmapInfo.widgets && webmapInfo.widgets.timeSlider;
    const timeWidgets = [];

    if (timeSlider) {
      const layer = getTimeEnabledLayer(webmapInfo);
      timeWidgets.push(<TimeWidget
                        map={map}
                        currentTimeExtent={currentTimeExtent}
                        timeInfo={getTimeInfo(layer)}
                        sliderProps={timeSlider.properties} />);
      timeWidgets.push(<MobileTimeWidget
                        map={map}
                        visible={mobileTimeWidgetVisible}
                        currentTimeExtent={currentTimeExtent}
                        timeInfo={getTimeInfo(layer)} />);
    }

    return (
      <div className={`map-container ${!timeSlider ? 'noSlider' : ''}`}>
        <div ref='map' className='map'>
          <Controls {...this.state} timeEnabled={!!timeSlider} />
          <TabButtons {...this.state} />
          <TabView {...this.state} />
          {map.loaded ? <Legend
              allLayers={this.state.allLayers}
              tableOfContentsVisible={this.state.tableOfContentsVisible}
              activeLayers={activeLayers}
              legendOpen={this.state.legendOpen}
              dynamicLayers={this.state.dynamicLayers}
              legendOpacity={this.state.legendOpacity}
            /> : null}
          <FooterInfos hidden={settings.hideFooter} map={map} />
          {timeWidgets}
          <svg className={`map__viewfinder${map.loaded ? '' : ' hidden'}`}>
            <use xlinkHref='#shape-crosshairs' />
          </svg>
        </div>
        <div className={`analysis-modal-container modal-wrapper ${analysisModalVisible ? '' : 'hidden'}`}>
          <AnalysisModal />
        </div>
        <div className={`print-modal-container modal-wrapper ${printModalVisible ? '' : 'hidden'}`}>
          <PrintModal />
        </div>
        <div className={`search-modal-container modal-wrapper ${searchModalVisible ? '' : 'hidden'}`}>
          <SearchModal />
        </div>
        <div className={`canopy-modal-container modal-wrapper ${canopyModalVisible ? '' : 'hidden'}`}>
          <CanopyModal />
        </div>
        <div className={`layer-modal-container modal-wrapper ${layerModalVisible ? '' : 'hidden'}`}>
          <LayerModal info={modalLayerInfo} />
        </div>
      </div>
    );
  }
}
