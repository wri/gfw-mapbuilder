import layerKeys from 'constants/LayerConstants';
import layerActions from 'actions/LayerActions';
import mapActions from 'actions/MapActions';
import LayersHelper from 'helpers/LayersHelper';
import LayerTransparency from './LayerTransparency';
import utils from 'utils/AppUtils';
import React, {
  Component,
  PropTypes
} from 'react';

const showSubLayer = function showSubLayer (layerItem) {
  const {esriLayer, subIndex} = layerItem;
  //- If this layer is not already in visible layers, add it, then set visible layers
  if (esriLayer.visibleLayers.indexOf(subIndex) === -1) {
    esriLayer.visibleLayers.push(subIndex);
  }
  esriLayer.setVisibleLayers(esriLayer.visibleLayers);
};

const hideSubLayer = function hideSubLayer (layerItem) {
  const {esriLayer, subIndex} = layerItem;
  //- If this layer is in visible layers, remove it, then set visible layers
  const location = esriLayer.visibleLayers.indexOf(subIndex);
  if (location > -1) {
    esriLayer.visibleLayers.splice(location, 1);
  }
  esriLayer.setVisibleLayers(esriLayer.visibleLayers);
};

const showLayer = function showLayer (map, layerId) {
  if (map && map.getLayer) {
    const layer = map.getLayer(layerId);
    if (layer) { layer.show(); }
  }
};

const hideLayer = function hideLayer (map, layerId) {
  if (map && map.getLayer) {
    const layer = map.getLayer(layerId);
    if (layer) { layer.hide(); }
  }
};

export default class LayerCheckbox extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const {map} = this.context;
    if (prevProps.checked !== this.props.checked) {
      if (this.props.checked) {
        if (this.props.subLayer) {
          showSubLayer(this.props.layer);
        } else {
          showLayer(map, this.props.layer.id);
          //- If the legend layer is present, update it
          this.updateLegendLayer(this.props.layer.id, { visible: true });
        }
      } else {
        if (this.props.subLayer) {
          hideSubLayer(this.props.layer);
        } else {
          hideLayer(map, this.props.layer.id);
          //- If the legend layer is present, update it
          this.updateLegendLayer(this.props.layer.id, { visible: false });
        }
      }
    }
  }

  /**
  * There is a dynamic layer with opacity set to 0, turn on or off its sub layers so they show up in the
  * legend, this is great for image services or other layers that don't have a legend but need one
  */
  updateLegendLayer (layerId, options) {
    const {settings, map} = this.context;
    //- The layer could be in any of these two groups
    const lcLayers = settings.layerPanel.GROUP_LC ? settings.layerPanel.GROUP_LC.layers : [];
    const lcdLayers = settings.layerPanel.GROUP_LCD ? settings.layerPanel.GROUP_LCD.layers : [];
    const layersConfig = lcLayers.concat(lcdLayers);

    const conf = utils.getObject(layersConfig, 'id', layerId);
    if (conf && conf.legendLayer !== undefined) {
      const layer = map.getLayer(layerKeys.LEGEND_LAYER);
      const {visibleLayers} = layer;

      if (options.visible) {
        visibleLayers.push(conf.legendLayer);
        layer.show();
      } else {
        visibleLayers.splice(visibleLayers.indexOf(conf.legendLayer), 1);
        if (visibleLayers.length === 0) {
          layer.hide();
        }
      }
    }
  }

  // shouldComponentUpdate(nextProps) {
  //   return nextProps.checked !== this.props.checked ||
  //          nextProps.layer !== this.props.layer ||
  //          !!this.props.children;
  // }

  showInfo () {
    const {layer} = this.props;
    if (layer.disabled) { return; }
    mapActions.showLayerInfo(layer);
    layerActions.showLoading(layer.id);
  }

  toggleLayer () {
    const {layer} = this.props;
    if (layer.disabled) { return; }
    if (layer.subId) {
      // TODO:  Update visible layers.
      if (this.props.checked) {
        layerActions.removeSubLayer(layer);
      } else {
        layerActions.addSubLayer(layer);
      }
    } else {
      if (this.props.checked) {
        layerActions.removeActiveLayer(layer.id);
      } else {
        layerActions.addActiveLayer(layer.id);
      }
    }
  }

  render() {
    const {map, language} = this.context;
    const {layer} = this.props;
    const checked = this.props.checked ? 'active' : '';
    const disabled = layer.disabled ? 'disabled' : '';
    const hidden = LayersHelper.isLayerVisible(map, layer) ? '' : 'hidden';
    const label = typeof layer.label === 'string' ? layer.label : layer.label[language];
    const {sublabel} = layer;

    return (
      <div className={`layer-checkbox relative ${checked} ${disabled} ${hidden}`} >
        <span onClick={this.toggleLayer.bind(this)} className='toggle-switch pointer'><span /></span>
        <span onClick={this.toggleLayer.bind(this)} className='layer-checkbox-label pointer'>
          {label}
        </span>
        <span className={`info-icon pointer ${this.props.iconLoading === this.props.layer.id ? 'iconLoading' : ''}`} onClick={this.showInfo.bind(this)}>
          <svg><use xlinkHref="#shape-info" /></svg>
        </span>
        {!sublabel ? null : <div className='layer-checkbox-sublabel'>{sublabel[language]}</div>}
        {!this.props.children ? null :
          <div className={`layer-content-container flex ${this.props.checked ? '' : 'hidden'}`}>
            {this.props.children}
          </div>
        }
        <LayerTransparency layer={layer} visible={this.props.checked}></LayerTransparency>
      </div>
    );
  }

}

LayerCheckbox.propTypes = {
  layer: React.PropTypes.object.isRequired,
  checked: React.PropTypes.bool.isRequired
};
