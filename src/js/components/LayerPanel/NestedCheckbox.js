import React, { Component } from 'react';
import LayerCheckbox from './LayerCheckbox';
import LayerActions from 'actions/LayerActions';

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
        LayerActions.removeActiveLayer(layer.id);
      } else {
        layer.esriLayer.show();
        layer.visible = true;
        LayerActions.addActiveLayer(layer.id);
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
        <LayerCheckbox layer={layer} checked={this.props.activeLayers.indexOf(layer.id) > -1} toggleLayer={this.toggleLayer}/>
      </div>
    );
  }

  render() {
    const { groupLabel, layers } = this.props;
    const checked = this.props.checked ? 'active' : '';

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
