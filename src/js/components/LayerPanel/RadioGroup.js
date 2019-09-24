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
        if (l.subId || l.layerIds) { layerActions.removeAllSubLayers(l.esriLayer); }
        return;
      }
      if (layersAlreadyHidden.indexOf(l.id) > -1) {
        return;
      }

      layerActions.removeActiveLayer(l.subId || l.id);
      if (l.subId || l.layerIds) { layerActions.removeAllSubLayers(l.esriLayer); }
      layersAlreadyHidden.push(l.id);
    });

    // If the item you clicked is already on
    // turn it off and return from the fucntion.
    if (activeLayers.indexOf(layer.subId || layer.id) > -1) {
      layerActions.removeActiveLayer(layer.subId || layer.id);
      if (layer.subId || layer.layerIds) { layerActions.removeAllSubLayers(layer.esriLayer); }
      return;
    }

    if (layer.hasOwnProperty('subId')) {
      layerActions.setSubLayers(layer, layer.subIndex);
      layer.esriLayer.setVisibleLayers([layer.subIndex]);
      return;
    }

    if (layer.hasOwnProperty('layerIds')) {
      layerActions.setSubLayers(layer, ...layer.layerIds);
      layer.esriLayer.setVisibleLayers(layer.layerIds);
      return;
    }

    layerActions.addActiveLayer(layer.id);
  }

  renderRadioButton = layer => {
    const { language } = this.context;
    const selected = this.props.activeLayers.indexOf(layer.subId || layer.id) > -1 ? 'active' : '';
    const sublabel = layer.sublabel ? (layer.sublabel[language] || layer.sublabel[layer.subIndex]) : '';
    return <RadioButton
      key={layer.subId || layer.id}
      selected={selected}
      label={layer.label ? layer.label[language] : ''}
      sublabel={sublabel}
      id={layer.subId || layer.id}
      layer={layer}
      showInfo={this.showInfo}
      iconLoading={this.props.iconLoading}
      toggleLayer={this.toggleLayer}
      initialLayerOpacities={this.props.initialLayerOpacities}
    />;
  }

  handleLayerVisibility = (groupLayers, dynamicLayers, activeLayers) => {
    const layerToShow = groupLayers
      .filter(l => l.subId ? activeLayers.indexOf(l.subId) > -1 : activeLayers.indexOf(l.id) > -1)[0];
    const layersToHide = groupLayers
      .filter(l => l.subId ? activeLayers.indexOf(l.subId) === -1 : activeLayers.indexOf(l.id) === -1);

    layersToHide.forEach(l => {
      if (l.esriLayer) {
        if (l.subId || l.layerIds) {
          l.esriLayer.setVisibleLayers([-1]);
        }
        l.esriLayer.hide();
        return;
      }

    });

    if (layerToShow && layerToShow.esriLayer) {
      if (layerToShow.subId || layerToShow.layerIds) {
        layerToShow.esriLayer.setVisibleLayers(dynamicLayers[layerToShow.id]);
      }
      layerToShow.esriLayer.show();
      return;
    }
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
