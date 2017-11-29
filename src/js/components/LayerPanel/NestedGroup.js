import NestedCheckbox from './NestedCheckbox';
import React, {
  Component,
  PropTypes
} from 'react';

export default class NestedGroup extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired
  };

  renderNestedCheckbox = layerGroup => {
    const { language } = this.context;
    const { activeLayers } = this.props;

    const checked = layerGroup.nestedLayers.some(l => activeLayers.indexOf(l.id) > -1);

    return (
      <NestedCheckbox
        key={layerGroup.nestedLayers[0].id}
        groupLabel={layerGroup.label[language]}
        layers={layerGroup.nestedLayers}
        activeLayers={activeLayers}
        checked={checked}
      />
    );
  }

  render() {

    return (
      <div>
        {this.props.layers.map(this.renderNestedCheckbox)}
        {/*<span className='nested-heading'><strong>Indigenous Lands &mdash; traditional or customary rights</strong></span>
        <NestedCheckbox groupLabel={'Acknowledged by government'} layers={this.indigenousAcknowledged} activeLayers={activeLayers} checked={this.props.layers.some(layer => activeLayers.indexOf(layer.id) > -1)} />
        <NestedCheckbox groupLabel={'Not acknowledged by government'} layers={this.indigenousNotAcknowledged} activeLayers={activeLayers} checked={some(layer => activeLayers.indexOf(layer.id) > -1)} />
        <span className='nested-heading'><strong>Community Lands &mdash; traditional or customary rights</strong></span>
        <NestedCheckbox groupLabel={'Acknowledged by government'} layers={this.communityAcknowledged} activeLayers={activeLayers} checked={some(layer => activeLayers.indexOf(layer.id) > -1)} />
        <NestedCheckbox groupLabel={'Not acknowledged by government'} layers={this.communityNotAcknowledged} activeLayers={activeLayers} checked={some(layer => activeLayers.indexOf(layer.id) > -1)} />*/}
      </div>
    );
  }
}

NestedGroup.propTypes = {
  layers: React.PropTypes.array.isRequired
};
