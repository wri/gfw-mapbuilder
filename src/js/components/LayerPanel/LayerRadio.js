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

    this.state = {
      selected: ''
    };
  }

  showInfo (event) {
    const value = event.currentTarget.getAttribute('value');
    const selectedLayer = this.props.layers.filter(l => l.subId === value)[0];

    if (selectedLayer.esriLayer.disabled) { return; }
    mapActions.showLayerInfo(selectedLayer);
    layerActions.showLoading(selectedLayer.id);
  }

  toggleLayer (event) {
    const value = event.target.getAttribute('value');
    const selectedLayer = this.props.layers.filter(l => l.subId === value)[0];

    if (selectedLayer.esriLayer.disabled) {return;}

    if (this.state.selected === value) {
      layerActions.removeSubLayer(selectedLayer);
      selectedLayer.visible = false;
      this.setState({
        selected: ''
      });
      return;
    }

    layerActions.addSubLayer(selectedLayer);
    selectedLayer.visible = true;
    this.setState({
      selected: value
    });
  }

  createRadioList = (layer, map, language) => {

    const selected = this.state.selected === layer.subId ? 'active' : '';
    const disabled = layer.esriLayer.disabled ? 'disabled' : '';
    const hidden = LayersHelper.isLayerVisible(map, layer.esriLayer) ? '' : 'hidden';

    return (
      <div key={layer.subId} className={`layer-radio relative ${selected} ${disabled} ${hidden}`} >
        <span value={layer.subId} onClick={this.toggleLayer.bind(this)} className='radio-switch pointer'></span>
        <span value={layer.subId} onClick={this.toggleLayer.bind(this)} className='layer-radio-label pointer'>
          {layer.label}
        </span>
        <span value={layer.subId} className={`info-icon pointer ${this.props.iconLoading === layer.esriLayer.id ? 'iconLoading' : ''}`} onClick={this.showInfo.bind(this)}>
          <svg><use xlinkHref="#shape-info" /></svg>
        </span>
        {!layer.sublabel ? null : <div className='layer-checkbox-sublabel'>{layer.sublabel[language]}</div>}
        {!this.props.children ? null :
          <div className={`layer-content-container flex ${selected ? '' : 'hidden'}`}>
            {this.props.children}
          </div>
        }
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
