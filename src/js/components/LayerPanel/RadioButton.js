import React, {Component, PropTypes} from 'react';
import LayerTransparency from './LayerTransparency';
import SVGIcon from 'utils/svgIcon';
import {defaultColorTheme} from '../../config';

export default class RadioButton extends Component {
  static contextTypes = {
    settings: PropTypes.object.isRequired
  };
  
  constructor(props) {
    super(props);
  }

  handleToggleLayer = () => {
    this.props.toggleLayer(this.props.layer);
  };

  handleShowInfo = () => {
    this.props.showInfo(this.props.layer);
  };
  
  render() {
    const {
      selected,
      id,
      label,
      iconLoading,
      sublabel,
      layer,
      initialLayerOpacities
    } = this.props;
    let colorTheme = '';
    const { customColorTheme } = this.context.settings;
    if (selected === 'active' && customColorTheme && customColorTheme !== '') {
        colorTheme = customColorTheme;
    } else if (selected === 'active' && customColorTheme && customColorTheme === '') {
        colorTheme = defaultColorTheme;
    } else {
        colorTheme = '#ffffff';
    }
    
    return (
      <div className={`layer-radio relative ${selected}`} >
        <span onClick={this.handleToggleLayer} style={{backgroundColor: `${colorTheme}`}} className='radio-switch pointer'></span>
        <span onClick={this.handleToggleLayer} className='layer-radio-label pointer'>
          {label}
        </span>
        <span
          style={{backgroundColor: `${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}}
          className={`info-icon pointer ${iconLoading === id ? 'iconLoading' : ''}`}
          onClick={this.handleShowInfo}
        >
          <SVGIcon id={'shape-info'} />
        </span>
        {sublabel && <div className='layer-checkbox-sublabel'>{sublabel}</div>}
        <LayerTransparency initialLayerOpacities={initialLayerOpacities} layer={layer} visible={selected}></LayerTransparency>
      </div>
    );
  }
}

