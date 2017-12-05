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

  toggleLayer = (layer) => {
    const { allRadioLayers } = this.props;

    const layersAlreadyHidden = [];

    allRadioLayers.forEach(l => {
      if (l.id === layer.id) {
        l.subId && layerActions.removeAllSubLayers(l.esriLayer);
        return;
      }
      if (layersAlreadyHidden.indexOf(l.id) > -1) return;

      l.esriLayer.hide();
      layerActions.removeActiveLayer(l.id);
      l.subId && layerActions.removeAllSubLayers(l.esriLayer);
      layersAlreadyHidden.push(l.id);
    });

    if (layer.hasOwnProperty('subId')) {
      layerActions.setSubLayers(layer.id, layer.subIndex);
      layer.esriLayer.setVisibleLayers([layer.subIndex]);
      layer.esriLayer.show();
      return;
    }

    layerActions.addActiveLayer(layer.id);
    layer.esriLayer.show();
  }

  renderRadioButton = layer => {
    const { language } = this.context;
    const selected = this.props.activeLayers.indexOf(layer.subId || layer.id) > -1 ? 'active' : '';
    const sublabel = layer.sublabel && (layer.sublabel[language] || layer.sublabel[layer.subIndex][language]);

    return <RadioButton
      key={layer.subId || layer.id}
      selected={selected}
      label={layer.label}
      sublabel={sublabel}
      id={layer.subId || layer.id}
      layer={layer}
      showInfo={this.showInfo}
      toggleLayer={this.toggleLayer}
    />;
  }

  render() {
    const { groupLayers } = this.props;

    return (
      <div>
        {groupLayers.map(this.renderRadioButton)}
      </div>
    );
  }

}

RadioGroup.propTypes = {
  groupLayers: React.PropTypes.array.isRequired
};
