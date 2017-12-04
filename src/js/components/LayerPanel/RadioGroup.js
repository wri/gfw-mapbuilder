import layerActions from 'actions/LayerActions';
import mapActions from 'actions/MapActions';
import RadioButton from './RadioButton';
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

  showInfo = (layer) => {

    mapActions.showLayerInfo(layer);
    layerActions.showLoading(layer.id);
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

  render() {
    const {layers} = this.props;

    layers.forEach(l => {
      if (l.includedSublayers) {
        l.esriLayer.show();

        if (this.props.dynamicLayers[l.esriLayer.id] && this.props.dynamicLayers[l.esriLayer.id].indexOf(l.subIndex) > -1) {
          l.esriLayer.setVisibleLayers([l.subIndex]);
        }

        if (this.props.dynamicLayers[l.esriLayer.id] && this.props.dynamicLayers[l.esriLayer.id].length === 0) {
          l.esriLayer.hide();
        }
      } else {
        if (this.props.activeLayers.indexOf(l.id) > -1) {
          l.esriLayer.show();
          layers.forEach(layer => {
            if (layer.id !== l.id) {
              layer.esriLayer.hide();
            }
          });
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
