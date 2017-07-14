import layerActions from 'actions/LayerActions';
import mapActions from 'actions/MapActions';
import LayersHelper from 'helpers/LayersHelper';
import LayerTransparency from './LayerTransparency';
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
        }
      } else {
        if (this.props.subLayer) {
          hideSubLayer(this.props.layer);
        } else {
          hideLayer(map, this.props.layer.id);
        }
      }
    }
  }

  showInfo () {
    const {layer} = this.props;
    if (layer.disabled) { return; }
    mapActions.showLayerInfo(layer);
    layerActions.showLoading(layer.id);
  }

  toggleLayer (disabled) {
    if (disabled) { return false; }
    const {layer} = this.props;
    if (layer.disabled) { return false; }
    if (layer.subId) {
      // TODO:  Update visible layers.
      if (this.props.checked) {
        layerActions.removeSubLayer(layer);
        layer.visible = false;
      } else {
        layerActions.addSubLayer(layer);
        layer.visible = true;
      }
    } else {
      if (this.props.checked) {
        layer.visible = false;
        layerActions.removeActiveLayer(layer.id);
      } else {
        layer.visible = true;
        layerActions.addActiveLayer(layer.id);
      }
    }
  }

  loadingSpinner() {
    return (
      <div className='carto-loading'>
        <div className="sk-circle1 carto-loading-child"></div>
        <div className="sk-circle2 carto-loading-child"></div>
        <div className="sk-circle3 carto-loading-child"></div>
        <div className="sk-circle4 carto-loading-child"></div>
        <div className="sk-circle5 carto-loading-child"></div>
        <div className="sk-circle6 carto-loading-child"></div>
        <div className="sk-circle7 carto-loading-child"></div>
        <div className="sk-circle8 carto-loading-child"></div>
        <div className="sk-circle9 carto-loading-child"></div>
        <div className="sk-circle10 carto-loading-child"></div>
        <div className="sk-circle11 carto-loading-child"></div>
        <div className="sk-circle12 carto-loading-child"></div>
      </div>
    );
  }

  render() {
    let loaded = false;
    const {map, language} = this.context;
    const {layer} = this.props;
    const checked = this.props.checked ? 'active' : '';
    let disabled = layer.disabled ? 'disabled' : '';
    const hidden = LayersHelper.isLayerVisible(map, layer) ? '' : 'hidden';
    const label = typeof layer.label === 'string' ? layer.label : layer.label[language];
    const {sublabel} = layer;

    // disabled = 'disabled';
    if (layer.type === 'carto') {
      disabled = 'disabled';
      if(layer.loaded === true) {
        disabled = '';
        loaded = true;
      }
    } else {
      loaded = true;
    }

    const cartoLoading = loaded ? '' : 'carto-loading';

    return (
      <div className={`layer-checkbox relative ${checked} ${disabled} ${hidden}`} >
        {
          cartoLoading === 'carto-loading' ?
          this.loadingSpinner() :
          <span onClick={this.toggleLayer.bind(this, disabled)} className='toggle-switch pointer' ><span /></span>
        }
        <span onClick={this.toggleLayer.bind(this, disabled)} className='layer-checkbox-label pointer'>
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
