import React, { Component, PropTypes } from 'react';
import LayerCheckbox from './LayerCheckbox';
import LayerActions from 'actions/LayerActions';
import {defaultColorTheme} from '../../config';

export default class NestedCheckbox extends Component {
  static contextTypes = {
    settings: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      groupChecked: false
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.checked !== this.props.checked) {
      this.setState({
        groupChecked: this.props.checked
      });
    }
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
        <LayerCheckbox initialLayerOpacities={this.props.initialLayerOpacities} layer={layer} checked={this.props.activeLayers.indexOf(layer.id) > -1} toggleLayer={this.toggleLayer}/>
      </div>
    );
  }

  render() {
    const { groupLabel, layers } = this.props;
    const checked = this.props.checked ? 'active' : '';
    let colorTheme = '';
    const { customColorTheme } = this.context.settings;
    if (checked === 'active' && customColorTheme && customColorTheme !== '') {
        colorTheme = customColorTheme;
    } else if (checked === 'active' && (!customColorTheme || customColorTheme === '')) {
        colorTheme = defaultColorTheme;
    } else {
        colorTheme = '#929292';
    }

    return (
      <div>
        <div className={`layer-checkbox relative ${checked}`}>
          <span onClick={this.toggleGroup} style={{backgroundColor: `${colorTheme}`}} className='toggle-switch pointer'><span /></span>
          <span onClick={this.toggleGroup} className='layer-checkbox-label pointer'>
            <strong>{groupLabel}</strong>
          </span>
          {layers.map(this.renderTree)}
        </div>
      </div>
    );
  }
}
