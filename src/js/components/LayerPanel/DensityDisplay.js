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

  // static contextTypes = {
  //   language: PropTypes.string.isRequired
  // };

  render () {
    let language;
    if (this.context.language){
      language = this.context.language;
    } else {
      language = this.props.language;
    }
    const { label, canopyDensity } = this.props;
    const hideDefaultLabel = label === '';

    return (
      <div className='tree-cover-canopy-display'>
        <span className='canopy-label'>{label || hideDefaultLabel ? label : text[language].DENSITY_FIRST}</span>
        <span className='canopy-button pointer' onClick={showModal}>{canopyDensity}</span>
        <span className='canopy-label'>{!label && !hideDefaultLabel && text[language].DENSITY_SECOND}</span>
      </div>
    );
  }
}
