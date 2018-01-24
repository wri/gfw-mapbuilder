import React, { Component, PropTypes } from 'react';
import layerActions from 'actions/LayerActions';
import mapActions from 'actions/MapActions';
import RadioButton from './RadioButton';

 export default class RadioGroup extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired
  };

  showInfo = (layer) => {

    mapActions.showLayerInfo(layer);
    layerActions.showLoading(layer.subId);
  }

  toggleLayer = (layer) => {
    const { allRadioLayers, activeLayers } = this.props;

    const layersAlreadyHidden = [];

    allRadioLayers.forEach(l => {
      if (l.id === layer.id) {
        if (l.subId) { layerActions.removeAllSubLayers(l.esriLayer); }
        return;
      }
      if (layersAlreadyHidden.indexOf(l.id) > -1) {
        return;
      }

      l.esriLayer.hide();
      layerActions.removeActiveLayer(l.subId || l.id);
      if (l.subId) { layerActions.removeAllSubLayers(l.esriLayer); }
      layersAlreadyHidden.push(l.id);
    });

    // If the item you clicked is already on
    // turn it off and return from the fucntion.
    if (activeLayers.indexOf(layer.subId || layer.id) > -1) {
      layer.esriLayer.hide();
      layerActions.removeActiveLayer(layer.subId || layer.id);
      if (layer.subId) { layerActions.removeAllSubLayers(layer.esriLayer); }
      return;
    }

    if (layer.hasOwnProperty('subId')) {
      layerActions.setSubLayers(layer.id, layer.subIndex);
      layer.esriLayer.setVisibleLayers([layer.subIndex]);
      return;
    }

    layerActions.addActiveLayer(layer.id);
  }

  renderRadioButton = layer => {
    const selected = this.props.activeLayers.indexOf(layer.subId || layer.id) > -1 ? 'active' : '';
    return <RadioButton
      key={layer.subId || layer.id}
      selected={selected}
      label={layer.label[this.context.language]}
      sublabel={layer.sublabel[this.context.language]}
      id={layer.subId || layer.id}
      layer={layer}
      showInfo={this.showInfo}
      iconLoading={this.props.iconLoading}
      toggleLayer={this.toggleLayer}
    />;
  }

  handleLayerVisibility = (groupLayers, dynamicLayers, activeLayers) => {
    groupLayers.forEach(layer => {
      if (!layer.esriLayer) { return; }
      if (layer.subId) {
        if (dynamicLayers.hasOwnProperty(layer.id) && dynamicLayers[layer.id].length > 0) {
          layer.esriLayer.show();
          return;
        }

        layer.esriLayer.hide();
        return;
      }

      if (activeLayers.indexOf(layer.id) > -1) {
        layer.esriLayer.show();
        return;
      }

      layer.esriLayer.hide();
    });
  }

  render() {

    const { dynamicLayers, activeLayers, groupLayers } = this.props;
    this.handleLayerVisibility(groupLayers, dynamicLayers, activeLayers);

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
