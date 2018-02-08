import mapActions from 'actions/MapActions';
import text from 'js/languages';
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

    return (
      <div className='tree-cover-canopy-display'>
        <span className='canopy-label'>{label ? label : text[language].DENSITY_FIRST}</span>
        <span className='canopy-button pointer' onClick={showModal}>{this.props.canopyDensity}</span>
        <span className='canopy-label'>{!label && text[language].DENSITY_SECOND}</span>
      </div>
    );
  }
}
