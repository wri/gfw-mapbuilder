import React, { Component } from 'react';
import LayerCheckbox from './LayerCheckbox';

export default class NestedCheckbox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      groupChecked: false
    };
  }


  toggleGroup = () => {

    this.props.layers.forEach(layer => {
      if (this.state.groupChecked) {
        layer.esriLayer.hide();
        layer.visible = false;
      } else {
        layer.esriLayer.show();
        layer.visible = true;
      }
    });

    this.setState(prevState => {
      return {groupChecked: !prevState.groupChecked};
    });
  }

  toggleLayer = () => {
    let shouldActivateGroup = false;
    this.props.layers.forEach(layer => {
      if (layer.visible) {
        shouldActivateGroup = true;
      }
    });

    if (shouldActivateGroup) {
      this.setState({groupChecked: true});
    } else {
      this.setState({groupChecked: false});
    }
  }

  renderTree = layer => {
    return (
      <div key={layer.id} style={{ left: '30px', position: 'relative', paddingRight: '30px' }}>
        <LayerCheckbox layer={layer} checked={layer.visible} toggleLayer={this.toggleLayer}/>
      </div>
    );
  }

  render() {
    const { groupLabel, layers } = this.props;
    const checked = this.state.groupChecked ? 'active' : '';

    return (
      <div>
        <div className={`layer-checkbox relative ${checked}`}>
          <span onClick={this.toggleGroup} className='toggle-switch pointer'><span /></span>
          <span onClick={this.toggleGroup} className='layer-checkbox-label pointer'>
            {groupLabel}
          </span>
          {layers.map(this.renderTree)}
        </div>
      </div>
    );
  }
}
