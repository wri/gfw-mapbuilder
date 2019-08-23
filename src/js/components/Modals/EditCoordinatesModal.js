import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import mapActions from 'actions/MapActions';
import React, { Component, PropTypes } from 'react';
import text from '../../../js/languages';
import SVGIcon from '../../utils/svgIcon';
import geometryUtils from '../../utils/geometryUtils';
import Polygon from 'esri/geometry/Polygon';
import layerKeys from '../../constants/LayerConstants';


export default class EditCoordinatesModal extends Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };


  constructor(props) {
    super(props);
  }

  close = () => {
    mapActions.toggleCoordinatesModal({ visible: false });
    mapActions.toggleAnalysisModal({visible: false});
    const dmsCoordinates = [];
    const ddCoordinates = [];
    for (let i = 0; i < 3; i++){
      dmsCoordinates.push(defaultDMS);
      ddCoordinates.push(defaultDD);
    }
    this.setState({
      coordinatesFormat: '',
      dmsCoordinates,
      ddCoordinates,
      errors: []
    });
  };

  switchCoordinatesFormat = evt => {
    const dmsCoordinates = [];
    const ddCoordinates = [];
    for (let i = 0; i < 3; i++){
      dmsCoordinates.push(defaultDMS);
      ddCoordinates.push(defaultDD);
    }
    this.setState({
      coordinatesFormat: evt.target.value,
      dmsCoordinates,
      ddCoordinates,
      errors: []
    });
  };

  render () {
    const {language} = this.context;
    const {coordinatesFormat, dmsCoordinates, ddCoordinates, errors} = this.state;
    const coordinateFormatOptions = text[language].ANALYSIS_COORDINATES_FORMATS;
    
    return (
      <ControlledModalWrapper onClose={this.close}>
        <h4 className="analysis-instructions__header">{text[language].ANALYSIS_COORDINATES_HEADER}</h4>
        <div className='relative analysis-coordinates__select-container'>
          <label htmlFor="coordinates-formats" className="analysis-coordinates__label">{text[language].ANALYSIS_COORDINATES_LABELS[2]}</label>
          <select
            value={coordinatesFormat ? coordinatesFormat : coordinateFormatOptions[0]}
            className='analysis-coordinates__select pointer'
            onChange={evt => this.switchCoordinatesFormat(evt)}
            id="coordinates-formats"
          >
            {coordinateFormatOptions && coordinateFormatOptions.map(this.createOptions)}
          </select>
          <div className='analysis-coordinates__select-arrow'></div>
        </div>

        {coordinatesFormat === coordinateFormatOptions[1] && <div className="analysis-coordinates__divider-dd"></div>}
        {(coordinatesFormat === coordinateFormatOptions[0] || coordinatesFormat === '') &&
        dmsCoordinates.map((item, index) => this.renderDMS(item, index))}
        {coordinatesFormat === coordinateFormatOptions[1] &&
        ddCoordinates.map((item, index) => this.renderDD(item, index))}
        {coordinatesFormat === coordinateFormatOptions[1] && <div className="analysis-coordinates__divider-dd"></div>}

        <div className="fa-button analysis-instructions__add-more-button" onClick={this.addMore}>
          <span className="analysis-instructions__add-more-icon"><SVGIcon id={'icon-add-more'} /></span>
          <span className="analysis-instructions__add-more">{text[language].ANALYSIS_COORDINATES_BUTTONS[1]}</span>
        </div>
        <div className="fa-button gold analysis-instructions__make-shape-button" onClick={this.validateShape}>
          {/* <span className="analysis-instructions__make-shape-icon"><SVGIcon id={'icon-shape'} /></span> */}
          <span className="analysis-instructions__make-shape">{text[language].ANALYSIS_COORDINATES_BUTTONS[2]}</span>
        </div>
        {errors !== [] && <div className="analysis-coordinates-errors">{errors.map(error => <div className="analysis-coordinates-error"> {text[language].ANALYSIS_COORDINATES_ERROR[error]}</div>)}</div>}
      </ControlledModalWrapper>
    );
  }

}
