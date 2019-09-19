import mapActions from 'actions/MapActions';
import text from 'js/languages';
import resources from '../../../resources';
import React, {
  Component,
  PropTypes
} from 'react';
import {defaultColorTheme} from '../../config';

const showModal = function showModal () {
  mapActions.toggleCanopyModal({ visible: true });
};

export default class DensityDisplay extends Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired
  };
  
  constructor (props) {
    super(props);
    this.state = {
      buttonHover: false
    };
  }

  toggleHover = () => {
    this.setState({
      buttonHover: !this.state.buttonHover
    });
  };

  render () {
    let language;
    if (this.context.language){
      language = this.context.language;
    } else {
      language = this.props.language;
    }
    const { label, canopyDensity } = this.props;
    const {buttonHover} = this.state;
    const hideDefaultLabel = label === '';
    let customColorTheme;
    if (this.context.settings) {
      customColorTheme = this.context.settings.customColorTheme;
    } else {
      customColorTheme = resources.customColorTheme;
    }

    return (
      <div className='tree-cover-canopy-display'>
        <span className='canopy-label'>{label || hideDefaultLabel ? label : text[language].DENSITY_FIRST}</span>
        <div
          style={buttonHover ? {backgroundColor: `${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`, opacity: '0.8'} :
          {backgroundColor: `${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}}
          className='canopy-button pointer'
          onClick={showModal}
          onMouseEnter={this.toggleHover}
          onMouseLeave={this.toggleHover}
        >
          {canopyDensity}
        </div>
        <span className='canopy-label'>{!label && !hideDefaultLabel && text[language].DENSITY_SECOND}</span>
      </div>
    );
  }
}
