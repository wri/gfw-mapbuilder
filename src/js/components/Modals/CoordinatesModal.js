import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import mapActions from 'actions/MapActions';
import React, { Component, PropTypes } from 'react';
import text from '../../../js/languages';

export default class AnalysisModal extends Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      DMS: true,
      DD: false
    };
  }

  close = () => {
    mapActions.toggleCoordinatesModal({ visible: false });
  };

  handleCoordinatesFormatChange = () => {
    this.setState({
      DMS: !this.state.DMS,
      DD: !this.state.DD
    });
  };
  
  createOptions = (option, index) => {
    return (
      <option
        key={`option-${index}`}
        value={option}
      >
        {option}
      </option>
    );
  };

  render () {
    const {language} = this.context;
    const coordinateFormatOptions = text[language].ANALYSIS_COORDINATES_FORMATS;
    const coordinateDirectionOptions = text[language].ANALYSIS_COORDINATES_DIRECTIONS;
    return (
      <ControlledModalWrapper onClose={this.close}>
        <h4 className="analysis-instructions__header">{text[language].ANALYSIS_COORDINATES_HEADER}</h4>
        <div className='relative analysis-coordinates__select-container'>
          <label htmlFor="coordinates-formats" className="analysis-coordinates__label">{text[language].ANALYSIS_COORDINATES_LABELS[2]}</label>
          <select
            value={coordinateFormatOptions && coordinateFormatOptions[0]}
            className='analysis-coordinates__select pointer'
            onChange={this.handleCoordinatesFormatChange}
            id="coordinates-formats"
          >
            {coordinateFormatOptions && coordinateFormatOptions.map(this.createOptions)}
          </select>
          <div className='analysis-coordinates__select-arrow'></div>
        </div>
        <div className="analysis-coordinates__divider"></div>
        
        <div className="analysis-coordinates__inputs-container">
          <div className="analysis-coordinates__latitude-container">
            <span className="analysis-coordinates__latitude-label">{text[language].ANALYSIS_COORDINATES_LABELS[0]}</span>
            <div className="analysis-coordinates__latitude">
              <input className="analysis-coordinates__latitude-measurement" type='number' id='latitude-degrees' name='latitude-degrees' />
              <span className="analysis-coordinates__latitude-measurement-label">&deg;</span>
              <input className="analysis-coordinates__latitude-measurement" type='number' id='latitude-decimals' name='latitude-decimals' />
              <span className="analysis-coordinates__latitude-measurement-label">'</span>
              <input className="analysis-coordinates__latitude-measurement" type='number' id='latitude-minutes' name='latitude-minutes' />
              <span className="analysis-coordinates__latitude-measurement-label">"</span>
              <select
                value={coordinateDirectionOptions && coordinateDirectionOptions[0]}
                className='analysis-coordinates-directions__select pointer'
                onChange={this.handleCoordinatesFormatChange}
                id="coordinates-directions"
              >
                {coordinateDirectionOptions && coordinateDirectionOptions.map(this.createOptions)}
              </select>
              <div className='analysis-coordinates-directions__select-arrow'></div>
            </div>
          </div>
          <div className="analysis-coordinates__longitude-container">
            <span className="analysis-coordinates__longitude-label">{text[language].ANALYSIS_COORDINATES_LABELS[1]}</span>
            <div className="analysis-coordinates__longitude">
              <input className="analysis-coordinates__longitude-measurement" type='number' id='longitude-degrees' name='longitude-degrees' />
              <span className="analysis-coordinates__longitude-measurement-label">&deg;</span>
              <input className="analysis-coordinates__longitude-measurement" type='number' id='longitude-decimals' name='longitude-decimals' />
              <span className="analysis-coordinates__longitude-measurement-label">'</span>
              <input className="analysis-coordinates__longitude-measurement" type='number' id='longitude-minutes' name='longitude-minutes' />
              <span className="analysis-coordinates__longitude-measurement-label">"</span>
              <select
                value={coordinateDirectionOptions && coordinateDirectionOptions[0]}
                className='analysis-coordinates-directions__select pointer'
                onChange={this.handleCoordinatesFormatChange}
                id="coordinates-directions"
              >
                {coordinateDirectionOptions && coordinateDirectionOptions.map(this.createOptions)}
              </select>
              <div className='analysis-coordinates-directions__select-arrow'></div>
            </div>
          </div>
          <div className="analysis-coordinates__divider"></div>
        </div>
      </ControlledModalWrapper>
    );
  }

}
