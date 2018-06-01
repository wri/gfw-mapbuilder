import React, {
  Component,
  PropTypes
} from 'react';
import NestedCheckbox from './NestedCheckbox.js';

export default class NestedGroup extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired
  };

  renderNestedCheckbox = layerGroup => {
    const { language } = this.context;
    const { activeLayers, initialLayerOpacities } = this.props;

    const checked = layerGroup.nestedLayers.some(l => activeLayers.indexOf(l.id) > -1);

    return (
      <NestedCheckbox
        key={layerGroup.nestedLayers[0].id}
        groupLabel={layerGroup.label[language]}
        layers={layerGroup.nestedLayers}
        activeLayers={activeLayers}
        checked={checked}
        initialLayerOpacities={initialLayerOpacities}
      />
    );
  }

  render() {
    return (
      <div>
        {this.props.layers.map(this.renderNestedCheckbox)}
      </div>
    );
  }
}

NestedGroup.propTypes = {
  layers: React.PropTypes.array.isRequired
};
