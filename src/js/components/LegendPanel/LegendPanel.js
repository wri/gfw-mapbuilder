import layerKeys from 'constants/LayerConstants';
import React, {PropTypes, Component} from 'react';
import mapActions from 'actions/MapActions';
import CartoLegend from 'components/LegendPanel/CartoLegend';
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

    function compare(a, b) {
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
    legendInfos.sort(compare);

    return legendInfos;
  }

  createLegend = (layerDiv, index) => {
    let childComponent;
    const {map, language, settings} = this.context;
    const {activeLayers} = this.props;

    switch(layerDiv.layer.id) {
      case 'IFL':
        childComponent = <LayerLegend url={layerDiv.layer.url} settings={settings} visibleLayers={activeLayers} layerIds={layerDiv.layer.layerIds} map={map} layerId={layerDiv.layer.id} language={language}/>;
        break;
      case 'IMAZON_SAD':
        childComponent = <LayerLegend url={layerDiv.layer.url} settings={settings} visibleLayers={activeLayers} layerIds={layerDiv.layer.layerIds} map={map} layerId={layerDiv.layer.id} language={language}/>;
        break;
      case 'ACTIVE_FIRES':
        childComponent = <LayerLegend url={layerDiv.layer.url} settings={settings} visibleLayers={activeLayers} layerIds={layerDiv.layer.layerIds} map={map} layerId={layerDiv.layer.id} language={language}/>;
        break;
      case 'GLOB_MANGROVE':
        childComponent = <LayerLegend url={urls.esriLegendService} settings={settings} visibleLayers={activeLayers} layerIds={layerDiv.layer.legendLayer} map={map} layerId={layerDiv.layer.id} language={language}/>;
        break;
      case 'AG_BIOMASS':
        childComponent = <LayerLegend url={urls.esriLegendService} settings={settings} visibleLayers={activeLayers} layerIds={layerDiv.layer.legendLayer} map={map} layerId={layerDiv.layer.id} language={language}/>;
        break;
      case 'TERRA_I_ALERTS':
        childComponent = <LayerLegend url={urls.esriLegendService} settings={settings} visibleLayers={activeLayers} layerIds={layerDiv.layer.legendLayer} map={map} layerId={layerDiv.layer.id} language={language}/>;
        break;
      case 'GLAD_ALERTS':
        childComponent = <LayerLegend url={urls.esriLegendService} settings={settings} visibleLayers={activeLayers} layerIds={layerDiv.layer.legendLayer} map={map} layerId={layerDiv.layer.id} language={language}/>;
        break;
      case 'TREE_COVER_GAIN':
        childComponent = <LayerLegend url={urls.esriLegendService} settings={settings} visibleLayers={activeLayers} layerIds={layerDiv.layer.legendLayer} map={map} layerId={layerDiv.layer.id} language={language}/>;
        break;
      case 'TREE_COVER_LOSS':
        childComponent = <LayerLegend url={urls.esriLegendService} settings={settings} visibleLayers={activeLayers} layerIds={layerDiv.layer.legendLayer} map={map} layerId={layerDiv.layer.id} language={language}/>;
        break;
      case 'LAND_COVER':
        childComponent = <LayerLegend url={urls.esriLegendService} settings={settings} visibleLayers={activeLayers} layerIds={layerDiv.layer.legendLayer} map={map} layerId={layerDiv.layer.id} language={language}/>;
        break;
      case 'TREE_COVER':
        childComponent = <LayerLegend url={urls.esriLegendService} settings={settings} visibleLayers={activeLayers} layerIds={layerDiv.layer.legendLayer} map={map} layerId={layerDiv.layer.id} language={language}/>;
        break;
      default:
        // if(layerDiv.layer.type === 'CARTO') {
        //   childComponent = <CartoLegend title={layerDiv.layer.title}/>;
        //   break;
        // } else {
          return false;
        // }
    }
    return (
      <div key={index}>
        <div>{childComponent}</div>
      </div>
    );
  }

  createChildComponent = (childComponent, index) => {
    return (
      <div key={index}>
        <div>{childComponent}</div>
      </div>
    );
  }

  render () {
    const {tableOfContentsVisible, legendOpen, activeLayers} = this.props;
    const {language, settings, map} = this.context;

    const legendLayers = this.getLayersForLegend();

    let rootClasses = legendOpen ? 'legend-panel map-component shadow' : 'legend-panel map-component shadow legend-collapsed';

    //- Hide the legend if the TOC is not visible (eye button)
    if (!tableOfContentsVisible) {
      rootClasses += ' hidden';
    }

    /******************************
     * Processing the webmap legend
     ******************************/
    const webmapChildComponents = [];
    let legendComponents;
    const layerGroups = settings.layerPanel;
    const layers = layerGroups.GROUP_WEBMAP.layers;

    if(layers !== undefined && layers !== [] && layers !== '') {
      // Going through each webmap layer and creating a unique legend component
      layers.forEach((layer, index) => {
        const subLayerConf = utils.getObject(layers, 'subId', layer.subId);
        const layerConf = utils.getWebMapObject(legendLayers, 'layer', 'id', layer.id);
        const childComponent = <WebMapLegend url={layerConf.url} labels={subLayerConf.label} visibility={layer.visible} settings={settings} visibleLayers={activeLayers} map={map} layerSubIndex={subLayerConf.subIndex} layerId={subLayerConf.subId} language={language}/>;
        webmapChildComponents.push(this.createChildComponent(childComponent, index + 1000));
      });

      legendComponents = legendLayers.map(this.createLegend);
      legendComponents = legendComponents.concat(webmapChildComponents);
    } else {
      legendComponents = legendLayers.map(this.createLegend);
    }

    const cartoChildComponents = [];
    const cartoLayers = layerGroups.GROUP_CARTO.layers;

    if(cartoLayers !== undefined && cartoLayers !== [] && cartoLayers !== '') {
      // Going through each webmap layer and creating a unique legend component
      cartoLayers.forEach((layer, index) => {
        const subLayerConf = utils.getObject(cartoLayers, 'subId', layer.subId);
        const childComponent = <CartoLegend layerId={layer.id} labels={subLayerConf.label[language]} settings={settings} visibleLayers={activeLayers} map={map} language={language}/>;
        cartoChildComponents.push(this.createChildComponent(childComponent, index + 2000));
      });
      legendComponents = legendComponents.concat(cartoChildComponents);
    } else {
      legendComponents = legendLayers.map(this.createLegend);
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
          <div id='legend' ref='legendNode' className={`${legendOpen ? '' : 'hidden'}`}></div>
        </div>
      </div>
    );
  }

}
