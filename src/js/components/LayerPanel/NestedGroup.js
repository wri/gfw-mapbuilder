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

  constructor(props) {
    super(props);

    this.indigenousAcknowledged = [];
    this.indigenousNotAcknowledged = [];
    this.communityAcknowledged = [];
    this.communityNotAcknowledged = [];

    props.layers.forEach(layer => {
      if (layer.indigenousOrCommunity === 'indigenous') {
        if (layer.acknowledgedByGovt === true) {
          this.indigenousAcknowledged.push(layer);
        } else {
          this.indigenousNotAcknowledged.push(layer);
        }
      } else {
        if (layer.acknowledgedByGovt === true) {
          this.communityAcknowledged.push(layer);
        } else {
          this.communityNotAcknowledged.push(layer);
        }
      }
    });
  }

  render() {
    return (
      <div>
        <span>Indigenous Lands &mdash; traditional or customary rights</span>
        <NestedCheckbox groupLabel={'Acknowledged by government'} layers={this.indigenousAcknowledged} />
        <NestedCheckbox groupLabel={'Not acknowledged by government'} layers={this.indigenousNotAcknowledged} />
        <span>Community Lands &mdash; traditional or customary rights</span>
        <NestedCheckbox groupLabel={'Acknowledged by government'} layers={this.communityAcknowledged} />
        <NestedCheckbox groupLabel={'Not acknowledged by government'} layers={this.communityNotAcknowledged} />
      </div>
    );
  }
}

NestedGroup.propTypes = {
  layers: React.PropTypes.array.isRequired
};
