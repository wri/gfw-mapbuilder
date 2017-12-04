import layerActions from 'actions/LayerActions';
import mapActions from 'actions/MapActions';
import LayerActions from 'actions/LayerActions';
import LayersHelper from 'helpers/LayersHelper';
import LayerTransparency from './LayerTransparency';
import RadioButton from 'js/components/LayerPanel/RadioButton';
import React, {
  Component,
  PropTypes
} from 'react';

export default class RadioGroup extends Component {

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

    // this.layer = brApp.map.getLayer(props.layers[0].id);
    // if (this.layer.visibleLayers) {
    //   LayerActions.removeAllSubLayers.defer(this.layer);
    // } else {
    //   LayerActions.removeActiveLayer(this.layer.id);
    // }

    this.layer = props.layers[0];

    this.state = {
      selected: '',
      exclusiveLayerIds: []
    };
  }

  componentDidMount() {

    // Get the list of unique layer ids that we need to turn off when a radio button is toggled on
    const exclusiveLayerIds = this.props.exclusiveLayerIds
      .filter(id => id !== this.layer.id);
    // after the reduce, we end up with an array of ids that are repeated for each sublayer in each group
    // so we need to filter them down to the unique ids
    // console.log(uniqueIds);
    // this.setState({
    //   exclusiveLayerIds: uniqueIds
    // });
  }

  componentDidUpdate() {
    console.log(this.props.activeLayers);
    // If the layer selected is not in layer.visibleLayers, it is in the other group.
    // So we need to turn all layers in this group off.
    // We also need to check that this doens't happen when all layers are already off,
    // so we check that this.state.selected !== -1
    // if (this.props.dynamicLayers.hasOwnProperty(this.layer.id)) {

    //   if (this.props.dynamicLayers[this.layer.id].indexOf(this.state.selected) === -1
    //     && this.state.selected !== -1) {
    //     this.setState({
    //       selected: -1
    //     });
    //   }
    // }

    // if (!this.props.dynamicLayers.hasOwnProperty(this.layer.id) || this.props.dynamicLayers[this.layer.id].length === 0) {
    //   // this.layer.hide();
    //   // this.layer.setVisibleLayers([-1]);
    // }
  }

  showInfo = (layer) => {

    mapActions.showLayerInfo(layer);
    layerActions.showLoading(layer.id);
  }

  toggleLayer = (event) => {

    // this.state.exclusiveLayerIds.forEach(id => {

    //   const layer = brApp.map.getLayer(id);

    //   if (this.props.dynamicLayers[id] && this.props.dynamicLayers[id].length > 0) {
    //     LayerActions.removeAllSubLayers(layer);
    //     layer.hide();
    //     layer.setVisibleLayers([-1]);
    //   } else if (this.props.activeLayers.indexOf(id) > -1) {
    //     LayerActions.removeActiveLayer(id);
    //   }
    // });

    // const value = event.target.getAttribute('value');
    // const selectedLayer = this.props.layers.filter(l => l.id === value)[0];
    // const selectedValue = selectedLayer.subIndex || selectedLayer.id;

    // if (this.props.dynamicLayers[this.layer.id] && this.props.dynamicLayers[this.layer.id].indexOf(selectedValue) > -1) {

    //   // this.layer.hide();
    //   // this.layer.setVisibleLayers([-1]);
    //   // LayerActions.removeSubLayer(selectedLayer);

    //   this.setState({
    //     selected: selectedLayer.subId
    //   });
    // } else {
    //   if (this.props.dynamicLayers[this.layer.id] && this.props.dynamicLayers[this.layer.id].length > 0) {
    //     // LayerActions.removeAllSubLayers(this.layer);
    //   }
    //   // this.layer.show();
    //   // this.layer.setVisibleLayers([selectedValue]);
    //   // LayerActions.addSubLayer(selectedLayer);

    //   this.setState({
    //     selected: value
    //   });
    // }
  }

  renderRadioButton = layer => {
    const { language } = this.context;
    const turnTheseOff = this.props.exclusiveLayerIds.filter(id => layer.subId ? layer.subId !== id : layer.id !== id);
    const selected = this.props.activeLayers.indexOf(layer.subId || layer.id) > -1 ? 'active' : '';
    const sublabel = layer.sublabel && (layer.sublabel[language] || layer.sublabel[layer.subIndex][language]);

    return <RadioButton
      key={layer.subId || layer.id}
      turnTheseOff={turnTheseOff}
      selected={selected}
      label={layer.label}
      sublabel={sublabel}
      id={layer.subId || layer.id}
      layer={layer}
      showInfo={this.showInfo}
    />;
  }

  // createRadioList = (layer, map, language) => {

  //   const selected = this.state.selected === layer.id ? 'active' : '';
  //   const disabled = layer.esriLayer.disabled ? 'disabled' : '';
  //   const hidden = LayersHelper.isLayerVisible(map, layer.esriLayer) ? '' : 'hidden';

  //   return (
  //     <div key={layer.id} className={`layer-radio relative ${selected} ${disabled} ${hidden}`} >
  //       <span value={layer.id} onClick={this.toggleLayer} className='radio-switch pointer'></span>
  //       <span value={layer.id} onClick={this.toggleLayer} className='layer-radio-label pointer'>
  //         {layer.label}
  //       </span>
  //       <span value={layer.subId} className={`info-icon pointer ${this.props.iconLoading === layer.esriLayer.id ? 'iconLoading' : ''}`} onClick={this.showInfo.bind(this)}>
  //         <svg><use xlinkHref="#shape-info" /></svg>
  //       </span>
  //       {!layer.sublabel ? null : <div className='layer-checkbox-sublabel'>{layer.sublabel[layer.subIndex][language]}</div>}
  //       {!layer.sublabelQuestion ? null : <div className={`${this.state.selected === layer.subIndex ? '' : 'hidden'} sublabel-question`}>{layer.sublabelQuestion}</div>}
  //       <LayerTransparency layer={layer} visible={this.state.selected === layer.id}></LayerTransparency>
  //     </div>
  //   );
  // }

  render() {
    const {layers} = this.props;

    layers.forEach(l => {
      if (l.includedSublayers) {
        l.esriLayer.show();

        if (this.props.dynamicLayers[l.esriLayer.id] && this.props.dynamicLayers[l.esriLayer.id].indexOf(l.subIndex) > -1) {
          l.esriLayer.setVisibleLayers([l.subIndex]);
        }
      } else {
        if (this.props.activeLayers.indexOf(l.id) > -1) {
          l.esriLayer.show();
        } else {
          l.esriLayer.hide();
        }
      }
    });

    return (
      <div>
        {layers.map(this.renderRadioButton)}
      </div>
    );
  }

}

RadioGroup.propTypes = {
  layers: React.PropTypes.array.isRequired
};
