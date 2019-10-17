import layerActions from 'actions/LayerActions';
import mapActions from 'actions/MapActions';
import layerKeys from 'constants/LayerConstants';
import LayersHelper from 'helpers/LayersHelper';
import LayerTransparency from './LayerTransparency';
import SVGIcon from 'utils/svgIcon';
import {defaultColorTheme} from '../../config';
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
  if (esriLayer.visible === false) { esriLayer.show(); }
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

  toggleLayer () {
    const {layer} = this.props;
    const {map} = this.context;
    
    const fireID = layer.id.includes('VIIRS_ACTIVE_FIRES') ? 'VIIRS' : 'MODIS';
    const layer24HR = map.getLayer(`${fireID}_ACTIVE_FIRES`);
    const layer48HR = map.getLayer(`${fireID}_ACTIVE_FIRES_48HR`);
    const layer72HR = map.getLayer(`${fireID}_ACTIVE_FIRES_72HR`);
    const layer7D = map.getLayer(`${fireID}_ACTIVE_FIRES_7D`);
    const layer1YR = map.getLayer(`${fireID}_ACTIVE_FIRES_1YR`);

    if (layer.disabled) { return; }
    if (layer.subId) {
      if (this.props.checked) {
        layerActions.removeSubLayer(layer);
        layer.visible = false;
        layerActions.removeActiveLayer(layer);
        if (fireID) {
          layer24HR.hide();
          layer48HR.hide();
          layer72HR.hide();
          layer7D.hide();
          layer1YR.hide();
        }
        if (fireID === 'VIIRS') {
          layerActions.updateViirsCustomRange(false);
          layerActions.updateActiveViirsOption(1);
          layerActions.updateActiveViirsOptionLabel('Past 24 hours');
        } else {
          layerActions.updateModisCustomRange(false);
          layerActions.updateActiveModisOption(1);
          layerActions.updateActiveModisOptionLabel('Past 24 hours');
        }
        map.infoWindow.clearFeatures();
      } else {
        layerActions.addSubLayer(layer);
        layer.visible = true;
        layerActions.addActiveLayer(layer.id);
      }
    } else {
      if (this.props.checked) {
        layer.visible = false;
        layerActions.removeActiveLayer(layer.id);
        if (fireID) {
          layer24HR.hide();
          layer48HR.hide();
          layer72HR.hide();
          layer7D.hide();
          layer1YR.hide();
        }
        if (fireID === 'VIIRS') {
          layerActions.updateViirsCustomRange(false);
          layerActions.updateActiveViirsOption(1);
          layerActions.updateActiveViirsOptionLabel('Past 24 hours');
        } else {
          layerActions.updateModisCustomRange(false);
          layerActions.updateActiveModisOption(1);
          layerActions.updateActiveModisOptionLabel('Past 24 hours');
        }
        map.infoWindow.clearFeatures();
      } else {
        layer.visible = true;
        layerActions.addActiveLayer(layer.id);
      }
    }

    if (layer.id === layerKeys.RECENT_IMAGERY) {
      mapActions.toggleImageryVisible(layer.visible); // Imagery Modal
      if (!layer.visible) {
        const imageryGraphicsLayer = map.getLayer('imageryGraphicsLayer');
        if (imageryGraphicsLayer) { map.removeLayer(imageryGraphicsLayer); }
      }
    }
  }

  render() {
    const {map, language} = this.context;
    const {layer, initialLayerOpacities, onEdit, dynamicSublabel} = this.props;
    const checked = this.props.checked ? 'active' : '';
    const disabled = layer.disabled ? 'disabled' : '';
    const hidden = LayersHelper.isLayerVisible(map, layer) ? '' : 'hidden';
    let label = layer.label ? layer.label[language] ? layer.label[language] : layer.label : '';
    if (typeof label === 'object') {
      label = '';
    }

    if (label === '' && layer.label) {
      const langs = Object.keys(layer.label);
      if (langs.length > 0) {
        label = layer.label[langs[0]];
      }
    }

    const {sublabel} = layer;
    
    let colorTheme = '';
    const { customColorTheme } = this.context.settings;
    if (checked === 'active' && customColorTheme && customColorTheme !== '') {
        colorTheme = customColorTheme;
    } else if (checked === 'active' && (!customColorTheme || customColorTheme === '')) {
        colorTheme = defaultColorTheme;
    } else {
        colorTheme = '#929292';
    }

    return (
      <div className={`layer-checkbox relative ${checked} ${disabled} ${hidden}`} >
        <span onClick={this.toggleLayer.bind(this)} style={{backgroundColor: `${colorTheme}`}} className='toggle-switch pointer'><span /></span>
        <span onClick={this.toggleLayer.bind(this)} className='layer-checkbox-label pointer'>
          {label}
        </span>
        {onEdit && this.props.checked &&
        <div
          style={{border: `1px solid ${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}}
          className='fa-button sml white layer-edit'
          onClick={onEdit}
        >
          <span className='layer-edit-text'>Edit</span>
        </div>}

        <span style={{backgroundColor: `${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}} className={`info-icon pointer ${this.props.iconLoading === this.props.layer.id ? 'iconLoading' : ''}`} onClick={this.showInfo.bind(this)}>
          <SVGIcon id={'shape-info'} />
        </span>
        {!sublabel ? null : <div className='layer-checkbox-sublabel'>{sublabel[language]}</div>}
        {!dynamicSublabel ? null : <div className='layer-checkbox-sublabel dynamic'>{dynamicSublabel}</div>}

        {!this.props.children ? null :
          <div className={`layer-content-container flex ${this.props.checked ? '' : 'hidden'}`}>
            {this.props.children}
          </div>
        }
        <LayerTransparency initialLayerOpacities={initialLayerOpacities} layer={layer} visible={this.props.checked}></LayerTransparency>
      </div>
    );
  }

}

LayerCheckbox.propTypes = {
  layer: React.PropTypes.object.isRequired,
  checked: React.PropTypes.bool.isRequired
};
