import mapActions from 'actions/MapActions';
import text from 'js/languages';
import resources from '../../../resources';
import React, {
  Component,
  PropTypes
} from 'react';

const showModal = function showModal () {
  mapActions.toggleCanopyModal({ visible: true });
};

export default class DensityDisplay extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired
  };

  render () {
    const {language} = this.context;
    const { label } = this.props;
    const hideDefaultLabel = label === '';
    const { customColorTheme, defaultColorTheme } = resources;

    return (
      <div className='tree-cover-canopy-display'>
        <span className='canopy-label'>{label || hideDefaultLabel ? label : text[language].DENSITY_FIRST}</span>
        <span
          style={{backgroundColor: `${customColorTheme !== '' ? customColorTheme : defaultColorTheme}`,
          boxShadow: `0 0 0 2px ${customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}}
          className='canopy-button pointer'
          onClick={showModal}
        >
          {this.props.canopyDensity}
        </span>
        <span className='canopy-label'>{!label && !hideDefaultLabel && text[language].DENSITY_SECOND}</span>
      </div>
    );
  }
}
