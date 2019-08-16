import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import mapActions from 'actions/MapActions';
import React, { Component, PropTypes } from 'react';
import text from '../../../js/languages';
import SVGIcon from '../../utils/svgIcon';

let count = 3;

export default class AnalysisModal extends Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired
  };
  

  constructor(props) {
    super(props);
    this.state = {
      coordinatesFormat: '',
      countArray: [1, 2, 3],
      dmsLatValues: {},
      dmsLngValues: {}
    };
  }

  close = () => {
    mapActions.toggleCoordinatesModal({ visible: false });
    mapActions.toggleAnalysisModal({visible: false});
    this.count = 3;
    this.setState({
      coordinatesFormat: '',
      countArray: [1, 2, 3],
      dmsLatValues: {},
      dmsLngValues: {},
      dmsDirectionValues: {}
    });
  };

  switchCoordinatesFormat = evt => {
    this.setState({
      coordinatesFormat: evt.target.value
    });
  };
  
  updateDMSDirectionValues = (evt) => {
    // this.setState({
    //   coordinatesFormat: evt.target.value
    // });
    console.log('TEST');
  };
  
  updateDMSLatValues = (evt) => {
    // Get all latitude inputs and convert into a regular array
    let dmsLats = [...document.querySelectorAll(`[name=${evt.target.name}]`)];
    
    // Create array with only the input values
    dmsLats = dmsLats.map(dmsLat => parseInt(dmsLat.value));
    
    // Create an object copy of the current dmsLatValues state to preserve any latitude arrays already stored
    const dmsLatValuesCopy = Object.assign({}, this.state.dmsLatValues);
    
    // Assign latitude array as new property on the copy object or overwrite if it already exists
    dmsLatValuesCopy[evt.target.name] = dmsLats;
    
    // Update state of dmsLatValues to the copy object
    this.setState({
      dmsLatValues: dmsLatValuesCopy
    });
  };
  
  updateDMSLngValues = (evt) => {
    // Get all longitude inputs and convert into a regular array
    let dmsLngs = [...document.querySelectorAll(`[name=${evt.target.name}]`)];
    
    // Create array with only the input values
    dmsLngs = dmsLngs.map(dmsLng => parseInt(dmsLng.value));
    
    // Create an object copy of the current dmsLngValues state to preserve any longitude arrays already stored
    const dmsLngValuesCopy = Object.assign({}, this.state.dmsLngValues);
    
    // Assign longitude array as new property on the copy object or overwrite if it already exists
    dmsLngValuesCopy[evt.target.name] = dmsLngs;
    
    // Update state of dmsLngValues to the copy object
    this.setState({
      dmsLngValues: dmsLngValuesCopy
    });
  };
  
  renderDMS = (item, index) => {
    const {language} = this.context;
    const latitudeDirectionOptions = text[language].ANALYSIS_COORDINATES_LATITUDE_DIRECTIONS;
    const longitudeDirectionOptions = text[language].ANALYSIS_COORDINATES_LONGITUDE_DIRECTIONS;
    
    return (
      <div key={`DMS-${index}`}>
      {index === 0 && <div className="analysis-coordinates__divider-dms"></div>}
      <div className="analysis-coordinates__inputs-container-dms">
        <div className="analysis-coordinates__latitude-container">
          <span className="analysis-coordinates__latitude-label">{text[language].ANALYSIS_COORDINATES_LABELS[0]}</span>
          <div className="analysis-coordinates__latitude">
            <input onChange={this.updateDMSLatValues} className="analysis-coordinates__latitude-measurement" type='number' id={`dms-latitude-degrees-${count}`} name={`dms-latitude-${count}`} />
            <span className="analysis-coordinates__latitude-measurement-label">&deg;</span>
            <input onChange={this.updateDMSLatValues} className="analysis-coordinates__latitude-measurement" type='number' id={`dms-latitude-decimals-${count}`} name={`dms-latitude-${count}`} />
            <span className="analysis-coordinates__latitude-measurement-label">'</span>
            <input onChange={this.updateDMSLatValues} className="analysis-coordinates__latitude-measurement" type='number' id={`dms-latitude-minutes-${count}`} name={`dms-latitude-${count}`} />
            <span className="analysis-coordinates__latitude-measurement-label">"</span>
            <select
              value={latitudeDirectionOptions && latitudeDirectionOptions[0]}
              className='analysis-coordinates-directions__select pointer'
              onChange={this.updateDMSDirectionValues}
              id={`dms-latitude-direction-${count}`}
              name={`dms-latitude-${count}`}
            >
              {latitudeDirectionOptions && latitudeDirectionOptions.map(this.createOptions)}
            </select>
            <div className='analysis-coordinates-directions__select-arrow'></div>
          </div>
        </div>
        
        <div className="analysis-coordinates__longitude-container">
          <span className="analysis-coordinates__longitude-label">{text[language].ANALYSIS_COORDINATES_LABELS[1]}</span>
          <div className="analysis-coordinates__longitude">
            <input onChange={this.updateDMSLngValues} className="analysis-coordinates__longitude-measurement" type='number' id={`dms-longitude-degrees-${count}`} name={`dms-longitude-${count}`} />
            <span className="analysis-coordinates__longitude-measurement-label">&deg;</span>
            <input onChange={this.updateDMSLngValues} className="analysis-coordinates__longitude-measurement" type='number' id={`dms-longitude-decimals-${count}`} name={`dms-longitude-${count}`} />
            <span className="analysis-coordinates__longitude-measurement-label">'</span>
            <input onChange={this.updateDMSLngValues} className="analysis-coordinates__longitude-measurement" type='number' id={`dms-longitude-minutes-${count}`} name={`dms-longitude-${count}`} />
            <span className="analysis-coordinates__longitude-measurement-label">"</span>
            <select
              value={longitudeDirectionOptions && longitudeDirectionOptions[0]}
              className='analysis-coordinates-directions__select pointer'
              onChange={this.updateDMSDirectionValues}
              id={`dms-longitude-direction-${count}`}
              name={`dms-longitude-${count}`}
            >
              {longitudeDirectionOptions && longitudeDirectionOptions.map(this.createOptions)}
            </select>
            <div className='analysis-coordinates-directions__select-arrow'></div>
          </div>
        </div>
      </div>
      <div className="analysis-coordinates__divider-dms"></div>
      </div>
    );
  };
  
  renderDD = (item, index) => {
    const {language} = this.context;
    return (
      <div key={`DD-${index}`} className="analysis-coordinates__inputs-container-dd">
        {index > 0 && <div className="analysis-coordinates__divider-dd"></div>}
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
    </div>
    );
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
    count = count + 1;
    const countArray = this.state.countArray;
    countArray.push(count);
    console.log('countArray', countArray);
    console.log('current count:', count);
    this.setState({
      countArray
    });
  };
  
  makeShape = () => {
    console.log('make shape!!!');
  };

  render () {
    const {language} = this.context;
    const {coordinatesFormat, countArray} = this.state;
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
        
        {coordinatesFormat === 'Decimal Degrees (DD)' && <div className="analysis-coordinates__divider-dd"></div>}
        {(coordinatesFormat === 'Degrees Decimal Minutes (DMS)' || coordinatesFormat === '') &&
        countArray.map((item, index) => this.renderDMS(item, index))}
        {coordinatesFormat === 'Decimal Degrees (DD)' &&
        countArray.map((item, index) => this.renderDD(item, index))}
        {coordinatesFormat === 'Decimal Degrees (DD)' && <div className="analysis-coordinates__divider-dd"></div>}
        
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
