import layerActions from 'actions/LayerActions';
import mapActions from 'actions/MapActions';
import LayerActions from 'actions/LayerActions';
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
    props.layers.forEach(layer => {
      layer.visible = false;
    });

    this.layer = brApp.map.getLayer(props.layers[0].id);
    LayerActions.removeAllSubLayers.defer(this.layer);

    this.state = {
      selected: this.layer.visibleLayers[0] || -1,
      exclusiveLayerIds: []
    };
  }

  componentDidMount() {
    // Get the list of unique layer ids that we need to turn off when a radio button is toggled on
    const { settings } = this.context;
    const { layerPanel } = settings;

    const exclusiveLayerIds = settings.exclusiveRadioGroups
    .reduce((result, currentVal) => {

      return [
        ...result,
        ...layerPanel[currentVal].layers.map(l => l.id)
        ];
    }, [])
    .filter(id => id !== this.layer.id);

    const uniqueIds = [];
    exclusiveLayerIds.forEach(id => {
      if (uniqueIds.indexOf(id) === -1) uniqueIds.push(id);
      return;
    });

    this.setState({
      exclusiveLayerIds: uniqueIds
    });
  }

  componentDidUpdate() {
    // If the layer selected is not in layer.visibleLayers, it is in the other group.
    // So we need to turn all layers in this group off.
    // We also need to check that this doens't happen when all layers are already off,
    // so we check that this.state.selected !== -1
    if (this.props.dynamicLayers.hasOwnProperty(this.layer.id)) {

      if (this.props.dynamicLayers[this.layer.id].indexOf(this.state.selected) === -1
        && this.state.selected !== -1) {
        this.setState({
          selected: -1
        });
      }
    }

    if (!this.props.dynamicLayers.hasOwnProperty(this.layer.id) || this.props.dynamicLayers[this.layer.id].length === 0) {
      this.layer.hide();
      this.layer.setVisibleLayers([-1]);
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

    this.state.exclusiveLayerIds.forEach(id => {

      const layer = brApp.map.getLayer(id);

      if (this.props.dynamicLayers[id].length > 0) {
        LayerActions.removeAllSubLayers(layer);
        layer.hide();
        layer.setVisibleLayers([-1]);
      }
    });

    const value = Number(event.target.getAttribute('value'));
    const selectedLayer = this.props.layers.filter(l => l.subIndex === value)[0];
    const selectedValue = selectedLayer.subIndex;

    if (this.props.dynamicLayers[this.layer.id].indexOf(selectedValue) > -1) {
      this.layer.hide();
      this.layer.setVisibleLayers([-1]);
      LayerActions.removeSubLayer(selectedLayer);

      this.setState({
        selected: -1
      });
    } else {
      if (this.props.dynamicLayers[this.layer.id].length > 0) {
        LayerActions.removeAllSubLayers(this.layer);
      }
      this.layer.show();
      this.layer.setVisibleLayers([selectedValue]);
      LayerActions.addSubLayer(selectedLayer);

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
        {!layer.sublabelQuestion ? null : <div className={`${this.state.selected === layer.subIndex ? '' : 'hidden'} sublabel-question`}>{layer.sublabelQuestion}</div>}
        <LayerTransparency layer={layer} visible={this.state.selected === layer.subIndex}></LayerTransparency>
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
