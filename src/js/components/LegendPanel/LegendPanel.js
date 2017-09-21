import layerKeys from 'constants/LayerConstants';
import React, {PropTypes, Component} from 'react';
import mapActions from 'actions/MapActions';
// import CartoLegend from 'components/LegendPanel/CartoLegend';
import WebMapLegend from 'components/LegendPanel/WebMapLegend';
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

  getLayersForLegend () {
    const {map} = this.context;
    const {basemapLayerIds, graphicsLayerIds} = map;
    let {layerIds = []} = map;
    const legendInfos = [];
    let ids = [];

    // Loop through layer ids and if those layers exist, add them to the legend
    // Add any layers we want to exclude from the legend to ignores, including basemapLayerIds
    // If a layer has a legendLayerId configured in the resources.js, you will probably want to add it here to prevent
    // two legends from the same service from showing up
    let ignores = [
      layerKeys.MASK,
      layerKeys.USER_FEATURES
    ];

    //- Add basemap layers and graphics layers
    if (basemapLayerIds) {
      ignores = ignores.concat(basemapLayerIds);
    }

    if (graphicsLayerIds) {
      layerIds = layerIds.concat(graphicsLayerIds);
    }

    if (layerIds) {
      //- Remove layers to ignore
      ids = layerIds.filter(id => ignores.indexOf(id) === -1);
      ids.forEach((layerId) => {
        const layer = map.getLayer(layerId);
        if (layer) {
          legendInfos.push({ layer });
        }
      });
    }
    legendInfos.sort(this.compare);

    return legendInfos;
  }

  compare = (a, b) => {
    if(a.layer.order === undefined) {
      a.layer.order = 0;
    }
    if(b.layer.order === undefined) {
      b.layer.order = 0;
    }
    if(a.layer.order < b.layer.order) {
      return 1;
    }
    if(a.layer.order > b.layer.order) {
      return -1;
    }
    return 0;
  }

  createLegend = (layerDiv, index) => {
    let childComponent;

    const {activeLayers} = this.props;

    switch(layerDiv.layer.id) {
      case 'IFL':
        childComponent = <LayerLegend url={layerDiv.layer.url} visibleLayers={activeLayers} layerIds={layerDiv.layer.layerIds} layerId={layerDiv.layer.id}/>;
        break;
      case 'IMAZON_SAD':
        childComponent = <LayerLegend url={layerDiv.layer.url} visibleLayers={activeLayers} layerIds={layerDiv.layer.layerIds} layerId={layerDiv.layer.id}/>;
        break;
      case 'VIIRS_ACTIVE_FIRES':
        childComponent = <LayerLegend url={layerDiv.layer.url} visibleLayers={activeLayers} layerIds={layerDiv.layer.layerIds} layerId={layerDiv.layer.id}/>;
        break;
      case 'MODIS_ACTIVE_FIRES':
        childComponent = <LayerLegend url={layerDiv.layer.url} visibleLayers={activeLayers} layerIds={layerDiv.layer.layerIds} layerId={layerDiv.layer.id}/>;
        break;
      case 'GLOB_MANGROVE':
        childComponent = <LayerLegend url={urls.esriLegendService} visibleLayers={activeLayers} layerIds={layerDiv.layer.legendLayer} layerId={layerDiv.layer.id}/>;
        break;
      case 'AG_BIOMASS':
        childComponent = <LayerLegend url={urls.esriLegendService} visibleLayers={activeLayers} layerIds={layerDiv.layer.legendLayer} layerId={layerDiv.layer.id}/>;
        break;
      case 'TERRA_I_ALERTS':
        childComponent = <LayerLegend url={urls.esriLegendService} visibleLayers={activeLayers} layerIds={layerDiv.layer.legendLayer} layerId={layerDiv.layer.id}/>;
        break;
      case 'GLAD_ALERTS':
        childComponent = <LayerLegend url={urls.esriLegendService} visibleLayers={activeLayers} layerIds={layerDiv.layer.legendLayer} layerId={layerDiv.layer.id}/>;
        break;
      case 'TREE_COVER_GAIN':
        childComponent = <LayerLegend url={urls.esriLegendService} visibleLayers={activeLayers} layerIds={layerDiv.layer.legendLayer} layerId={layerDiv.layer.id}/>;
        break;
      case 'TREE_COVER_LOSS':
        childComponent = <LayerLegend url={urls.esriLegendService} visibleLayers={activeLayers} layerIds={layerDiv.layer.legendLayer} layerId={layerDiv.layer.id}/>;
        break;
      case 'LAND_COVER':
        childComponent = <LayerLegend url={urls.esriLegendService} visibleLayers={activeLayers} layerIds={layerDiv.layer.legendLayer} layerId={layerDiv.layer.id}/>;
        break;
      case 'TREE_COVER':
        childComponent = <LayerLegend url={urls.esriLegendService} visibleLayers={activeLayers} layerIds={layerDiv.layer.legendLayer} layerId={layerDiv.layer.id}/>;
        break;
      default:
        if(layerDiv.layer.type === undefined && layerDiv.layer.arcgisProps && layerDiv.layer._basemapGalleryLayerType !== 'basemap') {
          // console.log('done');
        //   // return layerDiv;
        //   layerDiv.layer.dynamicLayerInfos.map((layer) => {
            // childComponent = <WebMapLegend url={layerDiv.layer.url} visibleLayers={activeLayers} layerId={layerDiv.layer.id}/>;
        //     console.log('done');
        //     return childComponent;
        //   });
        } else {
          return false;
        }
        // if(layerDiv.layer.type === 'CARTO') {
        //   childComponent = <CartoLegend title={layerDiv.layer.title}/>;
        // } else {
        // break;
        // }
    }
    return (
        <div>{childComponent}</div>
    );
  }

  webmapDiv = (childComponent, index) => {
    return (
      <div key={index}>
        <div>{childComponent}</div>
      </div>
    );
  }

  render () {
    const {tableOfContentsVisible, legendOpen, activeLayers} = this.props;
    const {language, settings } = this.context;

    const legendLayers = this.getLayersForLegend();

    let rootClasses = legendOpen ? 'legend-panel map-component shadow' : 'legend-panel map-component shadow legend-collapsed';

    //- Hide the legend if the TOC is not visible (eye button)
    if (!tableOfContentsVisible) {
      rootClasses += ' hidden';
    }

    // Processing the webmap legend
    const webmapChildComponents = [];
    let legendComponents = [];
    const layerGroups = settings.layerPanel;
    // const layers = layerGroups.GROUP_WEBMAP.layers;
    const layers = layerGroups.GROUP_INDIGENOUS_INDICATORS.layers;

    const layersTwo = layerGroups.GROUP_COMMUNITY_INDICATORS.layers;
    const layersThree = layerGroups.GROUP_INDIGENOUS_LANDS_HELD.layers;
    const layersFour = layerGroups.GROUP_PRESSURES.layers;
    const layersFive = layerGroups.GROUP_LAND_MAPS.layers;

    if (layers !== undefined && layers !== [] && layers !== [-1] && layers !== '') {
      layers.forEach(layer => {
        const subLayerConf = utils.getObject(layerGroups.GROUP_INDIGENOUS_INDICATORS.layers, 'subId', layer.subId);
        const layerConf = utils.getWebMapObject(legendLayers, 'layer', 'id', layer.id);
        const childComponent = <WebMapLegend key={subLayerConf.subId} url={layerConf.url} labels={subLayerConf.label} visibility={layer.visible && layer.esriLayer.visible} visibleLayers={activeLayers} layerSubIndex={subLayerConf.subIndex} layerId={subLayerConf.subId}/>;
        webmapChildComponents.push(childComponent);
      });
    }
    if (layersTwo !== undefined && layersTwo !== [] && layersTwo !== [-1] && layersTwo !== '') {
      layersTwo.forEach(layer => {
        const subLayerConf = utils.getObject(layerGroups.GROUP_COMMUNITY_INDICATORS.layers, 'subId', layer.subId);
        const layerConf = utils.getWebMapObject(legendLayers, 'layer', 'id', layer.id);
        const childComponent = <WebMapLegend key={subLayerConf.subId} url={layerConf.url} labels={subLayerConf.label} visibility={layer.visible} visibleLayers={activeLayers} layerSubIndex={subLayerConf.subIndex} layerId={subLayerConf.subId}/>;
        webmapChildComponents.push(childComponent);
      });
    }
    if (layersThree !== undefined && layersThree !== [] && layersThree !== [-1] && layersThree !== '') {
      layersThree.forEach(layer => {
        const subLayerConf = utils.getObject(layerGroups.GROUP_INDIGENOUS_LANDS_HELD.layers, 'subId', layer.subId);
        const layerConf = utils.getWebMapObject(legendLayers, 'layer', 'id', layer.id);
        const childComponent = <WebMapLegend key={subLayerConf.subId} url={layerConf.url} labels={subLayerConf.label} visibility={layer.visible} visibleLayers={activeLayers} layerSubIndex={subLayerConf.subIndex} layerId={subLayerConf.subId}/>;
        webmapChildComponents.push(childComponent);
      });
    }
    if (layersFour !== undefined && layersFour !== [] && layersFour !== [-1] && layersFour !== '') {
      layersFour.forEach(layer => {
        const subLayerConf = utils.getObject(layerGroups.GROUP_PRESSURES.layers, 'subId', layer.subId);
        const layerConf = utils.getWebMapObject(legendLayers, 'layer', 'id', layer.id);
        const childComponent = <WebMapLegend key={subLayerConf.Id} url={layerConf.url} labels={subLayerConf.label} visibility={layer.visible} visibleLayers={activeLayers} layerSubIndex={subLayerConf.subIndex} layerId={subLayerConf.subId}/>;
        webmapChildComponents.push(childComponent);
      });
    }
    if (layersFive !== undefined && layersFive !== [] && layersFive !== [-1] && layersFive !== '') {
      layersFive.forEach(layer => {
        const subLayerConf = utils.getObject(layerGroups.GROUP_LAND_MAPS.layers, 'subId', layer.subId);
        const layerConf = utils.getWebMapObject(legendLayers, 'layer', 'id', layer.id);
        const childComponent = <WebMapLegend key={layerConf.id} url={layerConf.url} labels={subLayerConf.label} visibility={layer.visible} visibleLayers={activeLayers} layerSubIndex={subLayerConf.subIndex} layerId={subLayerConf.subId}/>;
        webmapChildComponents.push(childComponent);
      });
    }

    legendComponents = legendComponents.concat(legendLayers.map(this.createLegend));
    legendComponents = legendComponents.concat(webmapChildComponents);

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
