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
import Scalebar from 'esri/dijit/Scalebar';
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

let scalebar, paramsApplied = false, mapLoaded = false, legendReady = false;

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

    if (
      prevState.basemap !== basemap ||
      prevState.map !== map
    ) {
      if (!prevState.basemap) {
        basemapUtils.updateBasemap(map, 'osm', settings.layerPanel.GROUP_BASEMAP.layers);
      } else {
        basemapUtils.updateBasemap(map, basemap, settings.layerPanel.GROUP_BASEMAP.layers);
      }
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
      // on layer add
      // if layer is one of our nested layers
      // set visibility-change listener to toggle corresponding feature layers

      const landMapLayerIds = [
        'comm_ind_Documented_8219',
        'comm_ind_NotDocumented_2683',
        'comm_ind_FormalLandClaim_2392',
        'comm_ind_CustomaryTenure_8127',
        'comm_comm_Documented_4717',
        'comm_comm_NotDocumented_9336',
        'comm_comm_FormalLandClaim_5585',
        'comm_comm_CustomaryTenure_6877'
      ];

      response.map.layerIds.forEach(id => {
        if (landMapLayerIds.indexOf(id) > -1) {
          const layer = response.map.getLayer(id);

          layer.on('visibility-change', result => {

            let featurePointLayer;
            let featurePolyLayer;
            const visible = result.visible;

            switch (result.target.id) {
              case 'comm_ind_FormalLandClaim_2392':
              featurePointLayer = response.map.getLayer('indigenous_FormalClaimFeature1');
              featurePolyLayer = response.map.getLayer('indigenous_FormalClaimFeature0');

                break;
              case 'comm_ind_CustomaryTenure_8127':
                featurePointLayer = response.map.getLayer('indigenous_CustomaryFeature1');
                featurePolyLayer = response.map.getLayer('indigenous_CustomaryFeature0');

                break;
              case 'comm_ind_Documented_8219':
                featurePointLayer = response.map.getLayer('indigenous_DocumentedFeature1');
                featurePolyLayer = response.map.getLayer('indigenous_DocumentedFeature0');

                break;
              case 'comm_ind_NotDocumented_2683':
                featurePointLayer = response.map.getLayer('indigenous_NotDocumentedFeature1');
                featurePolyLayer = response.map.getLayer('indigenous_NotDocumentedFeature0');

                break;
              case 'comm_comm_FormalLandClaim_5585':
                featurePointLayer = response.map.getLayer('community_FormalClaimFeature1');
                featurePolyLayer = response.map.getLayer('indigenous_FormalClaimFeature0');

                break;
              case 'comm_comm_CustomaryTenure_6877':
                featurePointLayer = response.map.getLayer('community_CustomaryFeature1');
                featurePolyLayer = response.map.getLayer('community_CustomaryFeature0');

                break;
              case 'comm_comm_Documented_4717':
                featurePointLayer = response.map.getLayer('community_DocumentedFeature1');
                featurePolyLayer = response.map.getLayer('community_DocumentedFeature0');

                break;
              case 'comm_comm_NotDocumented_9336':
                featurePointLayer = response.map.getLayer('community_NotDocumentedFeature1');
                featurePolyLayer = response.map.getLayer('community_NotDocumentedFeature0');

                break;
              default:
            }
            if (visible) {
              if (featurePointLayer) {
                featurePointLayer.show();
              }
              if (featurePolyLayer) {
                featurePolyLayer.show();
              }
            } else {
              if (featurePointLayer) {
                featurePointLayer.hide();
              }
              if (featurePolyLayer) {
                featurePolyLayer.hide();
              }
            }
          });
        }
      });


      //- Add a scalebar
      scalebar = new Scalebar({
        map: response.map,
        scalebarUnit: 'metric'
      });

      on.once(response.map, 'update-end', () => {
        mapActions.createLayers(response.map, settings.layerPanel, this.state.activeLayers, language);
        //- Set the default basemap in the store
        const basemap = itemData && itemData.baseMap;
        basemapUtils.prepareDefaultBasemap(response.map, basemap.baseMapLayers);
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
    const {settings} = this.context;
    const {x, y, z, l} = params;

    const langKeys = Object.keys(settings.labels);

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

  };

  addLayersToLayerPanel = (settings, operationalLayers) => {
    const {language} = this.context, layers = [];
    // Remove any already existing webmap layers
    // settings.layerPanel.GROUP_WEBMAP.layers = [];
    settings.layerPanel.GROUP_INDIGENOUS_INDICATORS = {
      order: 3,
      label: {
        en: 'Indicators of the Legal Security of Indigenous Lands'
      },
      layers: [],
      questionMap: { // key: layerInfo.subIndex, value: question string
        0: 'The average score for the 10 indicators of the legal security of indigenous lands.',
        1: 'Does the law recognize all rights that Indigenous peoples exercise over their lands as lawful forms of ownership?',
        2: 'Does the law give indigenous land rights the same level of protection as the rights under other tenure systems?',
        3: 'Does the law require the government to provide Indigenous peoples with a formal title and map to their land?',
        4: 'Does the law recognize Indigenous peoples as a legal person for the purposes of land ownership?',
        5: 'Does the law recognize Indigenous peoples as the legal authority over the land?',
        6: 'Do the law and formal title recognize that indigenous land rights may be held in perpetuity?',
        7: 'Does the law require the consent of Indigenous peoples before government or an outsider may acquire their land?',
        8: 'Does the law explicitly recognize that indigenous land includes the rights to all trees on the land?',
        9: 'Does the law explicitly recognize that indigenous land includes the rights to local water sources on the land?',
        10: 'Does the law uphold indigenous land rights in the ownership and governance of national parks and other protected areas?',
        11: 'The average score for the 10 indicators of the legal security of community lands.',
        12: 'Does the law recognize all rights that communities exercise over their lands as lawful forms of ownership?',
        13: 'Does the law give community land rights the same level of protection as the rights under other tenure systems?',
        14: 'Does the law require the government to provide communities with a formal title and map to their land?',
        15: 'Does the law recognize the community as a legal person for the purposes of land ownership?',
        16: 'Does the law recognize the community as the legal authority over the land?',
        17: 'Do the law and formal title recognize that community land rights may be held in perpetuity?',
        18: 'Does the law require the consent of communities before government or an outsider may acquire their land?',
        19: 'Does the law explicitly recognize that community land includes the rights to all trees on the land?',
        20: 'Does the law explicitly recognize that community land includes the rights to local water sources on the land?',
        21: 'Does the law uphold community land rights in the ownership and governance of national parks and other protected areas?'
      }
    };

    settings.layerPanel.GROUP_COMMUNITY_INDICATORS = {
      order: 4,
      label: {
        en: 'Indicators of the Legal Security of Community Lands'
      },
      layers: []
    };

    settings.layerPanel.GROUP_INDIGENOUS_LANDS_HELD = {
      order: 2,
      label: {
        en: 'Percent of Country Held by Indigenous Peoples and Communities'
      },
      layers: []
    };

    settings.layerPanel.GROUP_LAND_MAPS = {
      order: 1,
      label: {
        en: 'Indigenous & Community Land Maps'
      },
      layers: []
    };

    settings.layerPanel.GROUP_PRESSURES = {
      order: 6,
      label: {
        en: 'Pressures'
      },
      layers: []
    };
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
    const groupIndigenousIndicators = [];
    const groupCommunityIndicators = [];
    const groupIndigenousLandsHeld = [];
    const groupLandMaps = [];
    const groupPressures = [];
    operationalLayers.forEach((layer) => {
      if (layer.layerType === 'ArcGISMapServiceLayer' && layer.resourceInfo.layers) {
        const dynamicLayers = [];
        layer.resourceInfo.layers.forEach((sublayer) => {
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
            esriLayer: layer.layerObject
          };
          if (layer.id === 'indicators_legal_security_8140' && sublayer.id < 11) {
            layerInfo.sublabelQuestion = settings.layerPanel.GROUP_INDIGENOUS_INDICATORS.questionMap[sublayer.id];
            groupIndigenousIndicators.push(layerInfo);
          } else if (layer.id === 'indicators_legal_security_8140' && sublayer.id >= 11) {
            layerInfo.sublabelQuestion = settings.layerPanel.GROUP_INDIGENOUS_INDICATORS.questionMap[sublayer.id];
            groupCommunityIndicators.push(layerInfo);
          } else if (layer.id === 'percent_IP_community_lands_1264') {
            groupIndigenousLandsHeld.push(layerInfo);
          }
        });
        //   if (layer.esriLayer.url === 'http://gis.wri.org/server/rest/services/LandMark/indicators_legal_security/MapServer' && sublayer.id < 11) {
        //     indigenousLayers.push(layerInfo);
        //   } else if (layer.esriLayer.url === 'http://gis.wri.org/server/rest/services/LandMark/indicators_legal_security/MapServer' && sublayer.id >= 11) {
        //     communityLayers.push(layerInfo);
        //   } else {
        //     dynamicLayers.push(layerInfo);
        //   }
        // });
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

        if (layer.id === 'mining_cached_8843'
          || layer.id === 'land_use_1483'
          || layer.id === 'land_use_5422'
          || layer.id === 'infrastructure_9418') {
            groupPressures.push(layerInfo);
          }

        if (layer.id === 'comm_comm_CustomaryTenure_6877'
          || layer.id === 'comm_comm_NotDocumented_9336'
          || layer.id === 'comm_comm_Documented_4717'
          || layer.id === 'comm_comm_FormalLandClaim_5585'
          || layer.id === 'comm_ind_CustomaryTenure_8127'
          || layer.id === 'comm_ind_FormalLandClaim_2392'
          || layer.id === 'comm_ind_NotDocumented_2683'
          || layer.id === 'comm_ind_Documented_8219') {
            groupLandMaps.push(layerInfo);
          }
        layers.unshift(layerInfo);
      }
    });

    //- Set up the group labels and group layers
    settings.layerPanel.GROUP_INDIGENOUS_INDICATORS.layers = groupIndigenousIndicators;
    settings.layerPanel.GROUP_COMMUNITY_INDICATORS.layers = groupCommunityIndicators;
    settings.layerPanel.GROUP_INDIGENOUS_LANDS_HELD.layers = groupIndigenousLandsHeld;
    settings.layerPanel.GROUP_PRESSURES.layers = groupPressures;
    settings.layerPanel.GROUP_LAND_MAPS.layers = groupLandMaps;
    // settings.layerPanel.GROUP_WEBMAP.label[language] = settings.labels[language] ? settings.labels[language].webmapMenuName : '';

    // if (saveLayersInOtherLang) {
    //   settings.layerPanel.GROUP_WEBMAP.label[settings.alternativeLanguage] = settings.labels[settings.alternativeLanguage].webmapMenuName;
    // }
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

    if (map.loaded === true && mapLoaded === false) {
      mapLoaded = true;
      on.once(map, 'layers-add-result', layersss => {
        legendReady = true;
        this.forceUpdate();
      });
    }

    return (
      <div className={`map-container ${!timeSlider ? 'noSlider' : ''}`}>
        <div ref='map' className='map'>
          <Controls {...this.state} timeEnabled={!!timeSlider} />
          <TabButtons {...this.state} />
          <TabView {...this.state} />
          {legendReady ? <Legend tableOfContentsVisible={this.state.tableOfContentsVisible} activeLayers={activeLayers} legendOpen={this.state.legendOpen} /> : null}
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
