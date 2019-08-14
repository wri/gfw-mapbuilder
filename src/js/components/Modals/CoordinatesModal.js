import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import mapActions from 'actions/MapActions';
import React, { Component, PropTypes } from 'react';
import text from '../../../js/languages';
import SVGIcon from '../../utils/svgIcon';

export default class AnalysisModal extends Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      coordinatesFormat: '',
      count: 0
    };
  }

  close = () => {
    mapActions.toggleCoordinatesModal({ visible: false });
    mapActions.toggleAnalysisModal({visible: false});
  };

  handleCoordinatesFormatChange = evt => {
    this.setState({
      coordinatesFormat: evt.target.value
    });
  };
  
  handleCoordinatesDirectionChange = evt => {
    // this.setState({
    //   coordinatesFormat: evt.target.value
    // });
    console.log('direction changed!!!');
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
  
  addMore = () => {
    console.log('make shape!!!');
  };
  
  makeShape = () => {
    console.log('make shape!!!');
  };

  render () {
    const {language} = this.context;
    const {coordinatesFormat, count} = this.state; 
    const coordinateFormatOptions = text[language].ANALYSIS_COORDINATES_FORMATS;
    const coordinateDirectionOptions = text[language].ANALYSIS_COORDINATES_DIRECTIONS;
    return (
      <ControlledModalWrapper onClose={this.close}>
        <h4 className="analysis-instructions__header">{text[language].ANALYSIS_COORDINATES_HEADER}</h4>
        <div className='relative analysis-coordinates__select-container'>
          <label htmlFor="coordinates-formats" className="analysis-coordinates__label">{text[language].ANALYSIS_COORDINATES_LABELS[2]}</label>
          <select
            value={coordinatesFormat ? coordinatesFormat : coordinateFormatOptions[0]}
            className='analysis-coordinates__select pointer'
            onChange={evt => this.handleCoordinatesFormatChange(evt)}
            id="coordinates-formats"
          >
            {coordinateFormatOptions && coordinateFormatOptions.map(this.createOptions)}
          </select>
          <div className='analysis-coordinates__select-arrow'></div>
        </div>
        
        {(coordinatesFormat === 'Degrees Decimal Minutes (DMS)' || coordinatesFormat === '') &&
          <div className="analysis-coordinates__inputs-container">
            <div className="analysis-coordinates__divider"></div>
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
                  onChange={this.handleCoordinatesDirectionChange}
                  id="coordinates-directions"
                >
                  {coordinateDirectionOptions && coordinateDirectionOptions.map(this.createOptions)}
                </select>
                <div className='analysis-coordinates-directions__select-arrow'></div>
              </div>
            </div>
            <div className="analysis-coordinates__divider"></div>
          </div>
        }
        
        {coordinatesFormat === 'Decimal Degrees (DD)' &&
          <div className="analysis-coordinates__inputs-container">
            <div className="analysis-coordinates__divider"></div>
            <div className="analysis-coordinates-lat-lng-container">
            
            <div className="analysis-coordinates__latitude-container">
              <span className="analysis-coordinates__latitude-label">{text[language].ANALYSIS_COORDINATES_LABELS[0]}</span>
              <div className="analysis-coordinates__latitude">
                <input className="analysis-coordinates__latitude-measurement" type='number' id='latitude-degrees' name='latitude-degrees' />
                <span className="analysis-coordinates__latitude-measurement-label">&deg;</span>
              </div>
            </div>
            <div className="analysis-coordinates__longitude-container">
              <span className="analysis-coordinates__longitude-label">{text[language].ANALYSIS_COORDINATES_LABELS[1]}</span>
              <div className="analysis-coordinates__longitude">
                <input className="analysis-coordinates__longitude-measurement" type='number' id='latitude-decimals' name='latitude-decimals' />
                <span className="analysis-coordinates__longitude-measurement-label">&deg;</span>
              </div>
            </div>
            </div>
            <div className="analysis-coordinates__divider"></div>
          </div>
        }
        
        <div className="fa-button analysis-instructions__add-more-button" onClick={this.addMore}>
          <span className="analysis-instructions__add-more-icon"><SVGIcon id={'icon-add-more'} /></span>
          <span className="analysis-instructions__add-more">{text[language].ANALYSIS_COORDINATES_BUTTONS[1]}</span>
        </div>
        <div className="fa-button gold analysis-instructions__make-shape-button" onClick={this.makeShape}>
          {/* <span className="analysis-instructions__make-shape-icon"><SVGIcon id={'icon-shape'} /></span> */}
          <span className="analysis-instructions__make-shape">{text[language].ANALYSIS_COORDINATES_BUTTONS[2]}</span>
        </div>
      </ControlledModalWrapper>
    );
  }

}
