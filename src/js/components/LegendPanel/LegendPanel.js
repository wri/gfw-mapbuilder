import layerKeys from 'constants/LayerConstants';
import React, {PropTypes, Component} from 'react';
import mapActions from 'actions/MapActions';
// import CartoLegend from 'components/LegendPanel/CartoLegend';
import WebMapLegend from 'components/LegendPanel/WebMapLegend';
import WebMapFeatureLayerLegend from 'components/LegendPanel/WebMapFeatureLayerLegend';
import LayerLegend from 'components/LegendPanel/LayerLegend';
import utils from 'utils/AppUtils';
import {urls} from 'js/config';
import text from 'js/languages';

const closeSymbolCode = 9660,
    openSymbolCode = 9650;

export default class LegendPanel extends Component {

  static contextTypes = {
    webmapInfo: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  componentDidMount() {
    if (window && window.innerWidth > 950) {
      mapActions.toggleLegendVisible();
    }
  }

  getLayersForLegend (layers) {
    // Loop through layer ids and if those layers exist, add them to the legend
    // Add any layers we want to exclude from the legend to ignores, including basemapLayerIds
    // If a layer has a legendLayerId configured in the resources.js, you will probably want to add it here to prevent
    // two legends from the same service from showing up
    const ignores = [
      layerKeys.MASK,
      layerKeys.USER_FEATURES,
      layerKeys.LEGEND_LAYER
    ];

    const filteredLayers = layers.filter(l => ignores.indexOf(l.id) === -1);
    return filteredLayers;
  }

  createLegend = layerDiv => {
    let childComponent;

    const {activeLayers} = this.props;

    switch(layerDiv.id) {
      case 'IFL':
        childComponent = <LayerLegend key={layerDiv.id} url={layerDiv.url} visibleLayers={activeLayers} layerIds={layerDiv.layerIds} layerId={layerDiv.id}/>;
        break;
      case 'IMAZON_SAD':
        childComponent = <LayerLegend key={layerDiv.id} url={layerDiv.url} visibleLayers={activeLayers} layerIds={layerDiv.layerIds} layerId={layerDiv.id}/>;
        break;
      case 'VIIRS_ACTIVE_FIRES':
        childComponent = <LayerLegend key={layerDiv.id} url={layerDiv.url} visibleLayers={activeLayers} layerIds={layerDiv.layerIds} layerId={layerDiv.id}/>;
        break;
      case 'MODIS_ACTIVE_FIRES':
        childComponent = <LayerLegend key={layerDiv.id} url={layerDiv.url} visibleLayers={activeLayers} layerIds={layerDiv.layerIds} layerId={layerDiv.id}/>;
        break;
      case 'GLOB_MANGROVE':
        childComponent = <LayerLegend key={layerDiv.id} url={urls.esriLegendService} visibleLayers={activeLayers} layerIds={layerDiv.legendLayer} layerId={layerDiv.id}/>;
        break;
      case 'AG_BIOMASS':
        childComponent = <LayerLegend key={layerDiv.id} url={urls.esriLegendService} visibleLayers={activeLayers} layerIds={layerDiv.legendLayer} layerId={layerDiv.id}/>;
        break;
      case 'TERRA_I_ALERTS':
        childComponent = <LayerLegend key={layerDiv.id} url={urls.esriLegendService} visibleLayers={activeLayers} layerIds={layerDiv.legendLayer} layerId={layerDiv.id}/>;
        break;
      case 'GLAD_ALERTS':
        childComponent = <LayerLegend key={layerDiv.id} url={urls.esriLegendService} visibleLayers={activeLayers} layerIds={layerDiv.legendLayer} layerId={layerDiv.id}/>;
        break;
      case 'TREE_COVER_GAIN':
        childComponent = <LayerLegend key={layerDiv.id} url={urls.esriLegendService} visibleLayers={activeLayers} layerIds={layerDiv.legendLayer} layerId={layerDiv.id}/>;
        break;
      case 'TREE_COVER_LOSS':
        childComponent = <LayerLegend key={layerDiv.id} url={urls.esriLegendService} visibleLayers={activeLayers} layerIds={layerDiv.legendLayer} layerId={layerDiv.id}/>;
        break;
      case 'LAND_COVER':
        childComponent = <LayerLegend key={layerDiv.id} url={urls.esriLegendService} visibleLayers={activeLayers} layerIds={layerDiv.legendLayer} layerId={layerDiv.id}/>;
        break;
      case 'TREE_COVER':
        childComponent = <LayerLegend key={layerDiv.id} url={urls.esriLegendService} visibleLayers={activeLayers} layerIds={layerDiv.legendLayer} layerId={layerDiv.id}/>;
        break;
      default:
        break;
    }
    return childComponent;
  }

  render () {
    const {tableOfContentsVisible, legendOpen, activeLayers, dynamicLayers, allLayers} = this.props;
    const {language, settings, map } = this.context;

    const legendLayers = this.getLayersForLegend(allLayers).sort((a, b) => b.order - a.order);
    const legendComponents = legendLayers.map(this.createLegend);

    let rootClasses = legendOpen ? 'legend-panel map-component shadow' : 'legend-panel map-component shadow legend-collapsed';

    //- Hide the legend if the TOC is not visible (eye button)
    if (!tableOfContentsVisible) {
      rootClasses += ' hidden';
    }

    // Processing the webmap legend
    const layerGroups = settings.layerPanel;
    const layers = layerGroups.GROUP_WEBMAP.layers;

    if (legendLayers.length > 0 && layers !== undefined && layers !== [] && layers !== '') {
      // Going through each webmap layer and creating a unique legend component

      layers.forEach(layer => {
        if (layer.subId) {
          const scale = map.getScale();
          let visible = dynamicLayers.hasOwnProperty(layer.id) && dynamicLayers[layer.id].indexOf(layer.subIndex) > -1;

          if (layer.hasScaleDependency) {
            visible = dynamicLayers.hasOwnProperty(layer.id) && dynamicLayers[layer.id].indexOf(layer.subIndex) > -1 && layer.minScale >= scale && layer.maxScale <= scale;

            if (layer.minScale === 0) {
              visible = dynamicLayers.hasOwnProperty(layer.id) && dynamicLayers[layer.id].indexOf(layer.subIndex) > -1 && layer.maxScale <= scale;
            }

            if (layer.maxScale === 0) {
              visible = dynamicLayers.hasOwnProperty(layer.id) && dynamicLayers[layer.id].indexOf(layer.subIndex) > -1 && layer.minScale >= scale;
            }
          }

          const layerConf = utils.getObject(legendLayers, 'id', layer.id);
          const esriLayer = layerConf.esriLayer;

          const childComponent = <WebMapLegend key={layer.subId} url={esriLayer.url} labels={layer.label} visibility={visible} visibleLayers={activeLayers} layerSubIndex={layer.subIndex} layerId={layer.subId} />;

          const panelLocation = legendLayers.indexOf(layerConf);
          legendComponents.splice(panelLocation, 0, childComponent);
        } else {
          const layerConf = utils.getObject(legendLayers, 'id', layer.id);
          const esriLayer = layerConf.esriLayer;

          let childComponent;

          if (esriLayer.type === 'Feature Layer') {
            childComponent = <WebMapFeatureLayerLegend key={esriLayer.id} layer={esriLayer} visibility={activeLayers.indexOf(esriLayer.id) > -1 && esriLayer.visibleAtMapScale} visibleLayers={activeLayers} />;
          } else {
            if (esriLayer.layerInfos && esriLayer.layerInfos.length > 0) {
              esriLayer.layerId = esriLayer.layerInfos[0].id;
            }

            childComponent = <WebMapLegend key={layer.id} url={esriLayer.url} labels={layer.label} visibility={activeLayers.indexOf(layer.id) > -1} visibleLayers={activeLayers} layerId={esriLayer.layerId} />;
          }

          const panelLocation = legendLayers.indexOf(layerConf);
          legendComponents.splice(panelLocation, 0, childComponent);
        }
      });
    }

    return (
      <div className={rootClasses}>

        <div className='legend-title mobile-hide' onClick={mapActions.toggleLegendVisible}>
          <span>
            {text[language].LEGEND}
          </span>
          <span className='layer-category-caret' onClick={mapActions.toggleLegendVisible}>
            {String.fromCharCode(legendOpen ? closeSymbolCode : openSymbolCode)}
          </span>
        </div>

        <div title='close' className='legend-close close-icon pointer mobile-show' onClick={mapActions.toggleLegendVisible}>
          <svg className='svg-icon'>
            <use xlinkHref="#shape-close" />
          </svg>
        </div>

        <div className='legend-layers'>
          <div className='legendContainer'>{legendComponents}</div>
        </div>
      </div>
    );
  }

}
