import layerActions from 'actions/LayerActions';
import mapActions from 'actions/MapActions';
import LayersHelper from 'helpers/LayersHelper';
import LayerTransparency from './LayerTransparency';
import React, {
  Component,
  PropTypes
} from 'react';

export default class LayerRadio extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.layer = brApp.map.getLayer('indicators_legal_security_8140');
    this.state = {
      selected: this.layer.visibleLayers[0] || -1
    };
  }

  componentDidUpdate() {
    // If the layer selected is not in layer.visibleLayers, it is in the other group.
    // So we need to turn all layers in this group off.
    // We also need to check that this doens't happen when all layers are already off,
    // so we check that this.state.selected !== -1
    if (this.layer.visibleLayers.indexOf(this.state.selected) === -1
      && this.state.selected !== -1) {
      this.setState({
        selected: -1
      });
    }
  }

  showInfo (event) {
    const value = event.currentTarget.getAttribute('value');
    const selectedLayer = this.props.layers.filter(l => l.subId === value)[0];

    if (selectedLayer.esriLayer.disabled) { return; }
    mapActions.showLayerInfo(selectedLayer);
    layerActions.showLoading(selectedLayer.id);
  }

  toggleLayer (event) {
    const value = Number(event.target.getAttribute('value'));
    const selectedLayer = this.props.layers.filter(l => l.subIndex === value)[0];
    const selectedValue = selectedLayer.subIndex;

    if (this.state.selected === value) {
      this.layer.hide();
      this.layer.setVisibleLayers([-1]);

      this.setState({
        selected: -1
      });
    } else {
      this.layer.show();
      this.layer.setVisibleLayers([selectedValue]);

      this.setState({
        selected: value
      });
    }
  }

  createRadioList = (layer, map, language) => {

    const selected = this.state.selected === layer.subIndex ? 'active' : '';
    const disabled = layer.esriLayer.disabled ? 'disabled' : '';
    const hidden = LayersHelper.isLayerVisible(map, layer.esriLayer) ? '' : 'hidden';

    return (
      <div key={layer.subId} className={`layer-radio relative ${selected} ${disabled} ${hidden}`} >
        <span value={layer.subIndex} onClick={this.toggleLayer.bind(this)} className='radio-switch pointer'></span>
        <span value={layer.subIndex} onClick={this.toggleLayer.bind(this)} className='layer-radio-label pointer'>
          {layer.label}
        </span>
        <span value={layer.subId} className={`info-icon pointer ${this.props.iconLoading === layer.esriLayer.id ? 'iconLoading' : ''}`} onClick={this.showInfo.bind(this)}>
          <svg><use xlinkHref="#shape-info" /></svg>
        </span>
        {!layer.sublabel ? null : <div className='layer-checkbox-sublabel'>{layer.sublabel[language]}</div>}
        <LayerTransparency layer={layer} visible={this.props.selected}></LayerTransparency>
      </div>
    );
  }

  render() {
    const {map, language} = this.context;
    const {layers} = this.props;

    return (
      <div>
        {layers.map(layer => {
          return this.createRadioList(layer, map, language);
        })}
      </div>
    );
  }

}

LayerRadio.propTypes = {
  layers: React.PropTypes.array.isRequired
};
