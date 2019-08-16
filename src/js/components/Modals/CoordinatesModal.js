import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import mapActions from 'actions/MapActions';
import React, { Component, PropTypes } from 'react';
import text from '../../../js/languages';
import SVGIcon from '../../utils/svgIcon';

let count = 3;

export default class CoordinatesModal extends Component {

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
      dmsLngValues: {},
      ddValues: {},
      dmsValues: {},
      error: false
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
      dmsValues: {},
      ddValues: {},
      error: false
    });
  };

  switchCoordinatesFormat = evt => {
    this.setState({
      coordinatesFormat: evt.target.value,
      countArray: [1, 2, 3],
      dmsLatValues: {},
      dmsLngValues: {},
      dmsValues: {},
      ddValues: {},
      error: false
    });
  };
  
  updateDMSLatValues = evt => {
    // Get all latitude inputs and convert into a regular array
    let dmsLats = [...document.querySelectorAll(`[name=${evt.target.name}]`)];
    
    // Create array with only the input values
    dmsLats = dmsLats.map(dmsLat => dmsLat.value);
    
    // Create an object copy of the current dmsLatValues state to preserve any latitude arrays already stored
    const dmsLatValuesCopy = Object.assign({}, this.state.dmsLatValues);
    
    // Grab only the number that is on the end of the name.
    // This will be used later as an object key in dmsValues to combine both the latitude and longitude values for the same geometry point together.
    const index = evt.target.name.slice(-1);
    
    // Assign latitude array as new property on the copy object or overwrite if it already exists
    dmsLatValuesCopy[index] = dmsLats;
    
    
    // Update state of dmsLatValues to the copy object
    // Call updateDMSValues to update the latitude values for the corresponding geometry point by passing in the index value.
    this.setState({
      dmsLatValues: dmsLatValuesCopy
    }, () => this.updateDMSValues(index));
    
  };
  
  updateDMSLngValues = evt => {
    // Get all longitude inputs and convert into a regular array
    let dmsLngs = [...document.querySelectorAll(`[name=${evt.target.name}]`)];
    
    // Create array with only the input values
    dmsLngs = dmsLngs.map(dmsLng => dmsLng.value);
    
    // Create an object copy of the current dmsLngValues state to preserve any longitude arrays already stored
    const dmsLngValuesCopy = Object.assign({}, this.state.dmsLngValues);
    
    // Grab only the number that is on the end of the name.
    // This will be used later as an object key in dmsValues to combine both the latitude and longitude arrays for the same geometry point together.
    const index = evt.target.name.slice(-1);
    
    // Assign longitude array as new property on the copy object or overwrite if it already exists
    dmsLngValuesCopy[index] = dmsLngs;
    
    // Update state of dmsLngValues to the copy object
    // Call updateDMSValues to update the longitude values for the corresponding geometry point by passing in the index value.
    this.setState({
      dmsLngValues: dmsLngValuesCopy
    }, () => this.updateDMSValues(index));
  };
  
  updateDMSValues = index => {
    // Create copy of dmsValues in order to retain other geometry point's latitude and longitude arrays.
    // We only want to update the longitude or latitude value that was just changed for a particular geometry point.
    const dmsValuesCopy = Object.assign({}, this.state.dmsValues);
    
    // Get all of the latValues and lngValues from state
    const latValues = this.state.dmsLatValues;
    const lngValues = this.state.dmsLngValues;
    
    // Only update the latitude and longitude properties for the geometry point at the index value
    dmsValuesCopy[index] = {
      latitude: latValues[index],
      longitude: lngValues[index]
    };
    
    // Finally set the state of dmsValues
    this.setState({
      dmsValues: dmsValuesCopy
    }, () => console.log(this.state.dmsValues));
  };
  
  updateDDValues = evt => {
    // Get both latitude and longitude inputs and convert into an array
    let ddLatLngValues = [...document.querySelectorAll(`[name=${evt.target.name}]`)];
    
    // Map over the array and only grab the input values
    ddLatLngValues = ddLatLngValues.map(ddLatLngValue => ddLatLngValue.value);
    
    // Make an object copy of ddVals in order to preserve existing geometry points' values
    const ddValuesCopy = Object.assign({}, this.state.ddValues);
    
    // Grab the number off the end of the event target's name which will be used as the object key in ddValues
    const index = evt.target.name.slice(-1);
    
    // Set the latitude and longitude values at the key index.
    ddValuesCopy[index] = ddLatLngValues;
    
    // Set the state of ddValues
    this.setState({
      ddValues: ddValuesCopy
    }, () => console.log('ddValues', this.state.ddValues));
  };
  
  addMore = () => {
    count = count + 1;
    const countArray = this.state.countArray;
    countArray.push(count);
    this.setState({
      countArray
    });
  };
  
  makeShape = () => {
    const {language} = this.context;
    const coordinatesFormat = this.state.coordinatesFormat;
    if (coordinatesFormat === text[language].ANALYSIS_COORDINATES_FORMATS[0] || coordinatesFormat === '') {
      const values = Object.values(this.state.dmsValues);
      const latitudes = [];
      const longitudes = [];
      
      if (values) {
        values.forEach(value => {
          const {latitude, longitude} = value;
          if (latitude) {
            latitudes.push(latitude);
          }
          if (longitude) {
            longitudes.push(longitude);
          }
        });
        
        if (latitudes.length > 0) {
          latitudes.forEach(lat => {
            if (lat.includes('')) {
              this.setState({
                error: true
              });
            }
          });
        } else {
          this.setState({
            error: true
          });
        }
        if (longitudes.length > 0) {
          longitudes.forEach(lng => {
            if (lng.includes('')) {
              this.setState({
                error: true
              });
            }
          });
        } else {
          this.setState({
            error: true
          });
        }
      }
    }
    
    if (coordinatesFormat === text[language].ANALYSIS_COORDINATES_FORMATS[1]){
      const values = Object.values(this.state.ddValues);
      if (values) {
        values.forEach(value => {
          if (value.includes('')){
            this.setState({
              error: true
            });
          }
        });
      } else {
        this.setState({
          error: true
        });
      }
    }
  };
  
  resetError = () => {
    this.setState({
      error: false
    }, () => this.makeShape());
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
            <input onChange={this.updateDMSLatValues} className="analysis-coordinates__latitude-measurement" type='number' id={`dms-latitude-degrees-${item}`} name={`dms-latitude-${item}`} />
            <span className="analysis-coordinates__latitude-measurement-label">&deg;</span>
            <input onChange={this.updateDMSLatValues} className="analysis-coordinates__latitude-measurement" type='number' id={`dms-latitude-minutes-${item}`} name={`dms-latitude-${item}`} />
            <span className="analysis-coordinates__latitude-measurement-label">'</span>
            <input onChange={this.updateDMSLatValues} className="analysis-coordinates__latitude-measurement" type='number' id={`dms-latitude-seconds-${item}`} name={`dms-latitude-${item}`} />
            <span className="analysis-coordinates__latitude-measurement-label">"</span>
            <select
              value={latitudeDirectionOptions && latitudeDirectionOptions[0]}
              className='analysis-coordinates-directions__select pointer'
              onChange={this.updateDMSLatValues}
              id={`dms-latitude-direction-${item}`}
              name={`dms-latitude-${item}`}
            >
              {latitudeDirectionOptions && latitudeDirectionOptions.map(this.createOptions)}
            </select>
            <div className='analysis-coordinates-directions__select-arrow'></div>
          </div>
        </div>
        
        <div className="analysis-coordinates__longitude-container">
          <span className="analysis-coordinates__longitude-label">{text[language].ANALYSIS_COORDINATES_LABELS[1]}</span>
          <div className="analysis-coordinates__longitude">
            <input onChange={this.updateDMSLngValues} className="analysis-coordinates__longitude-measurement" type='number' id={`dms-longitude-degrees-${item}`} name={`dms-longitude-${item}`} />
            <span className="analysis-coordinates__longitude-measurement-label">&deg;</span>
            <input onChange={this.updateDMSLngValues} className="analysis-coordinates__longitude-measurement" type='number' id={`dms-longitude-minutes-${item}`} name={`dms-longitude-${item}`} />
            <span className="analysis-coordinates__longitude-measurement-label">'</span>
            <input onChange={this.updateDMSLngValues} className="analysis-coordinates__longitude-measurement" type='number' id={`dms-longitude-seconds-${item}`} name={`dms-longitude-${item}`} />
            <span className="analysis-coordinates__longitude-measurement-label">"</span>
            <select
              value={longitudeDirectionOptions && longitudeDirectionOptions[0]}
              className='analysis-coordinates-directions__select pointer'
              onChange={this.updateDMSLngValues}
              id={`dms-longitude-direction-${item}`}
              name={`dms-longitude-${item}`}
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
            <input onChange={this.updateDDValues} className="analysis-coordinates__latitude-measurement" type='number' id={`dd-latitude-degrees-${item}`} name={`dd-${item}`} />
            <span className="analysis-coordinates__latitude-measurement-label">&deg;</span>
          </div>
        </div>
        <div className="analysis-coordinates__longitude-container">
          <span className="analysis-coordinates__longitude-label">{text[language].ANALYSIS_COORDINATES_LABELS[1]}</span>
          <div className="analysis-coordinates__longitude">
            <input onChange={this.updateDDValues} className="analysis-coordinates__longitude-measurement" type='number' id={`dd-longitude-degrees-${item}`} name={`dd-${item}`} />
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

  render () {
    const {language} = this.context;
    const {coordinatesFormat, countArray, error} = this.state;
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
        countArray.map((item, index) => this.renderDMS(item, index))}
        {coordinatesFormat === coordinateFormatOptions[1] &&
        countArray.map((item, index) => this.renderDD(item, index))}
        {coordinatesFormat === coordinateFormatOptions[1] && <div className="analysis-coordinates__divider-dd"></div>}

        <div className="fa-button analysis-instructions__add-more-button" onClick={this.addMore}>
          <span className="analysis-instructions__add-more-icon"><SVGIcon id={'icon-add-more'} /></span>
          <span className="analysis-instructions__add-more">{text[language].ANALYSIS_COORDINATES_BUTTONS[1]}</span>
        </div>
        <div className="fa-button gold analysis-instructions__make-shape-button" onClick={this.makeShape}>
          {/* <span className="analysis-instructions__make-shape-icon"><SVGIcon id={'icon-shape'} /></span> */}
          <span className="analysis-instructions__make-shape">{text[language].ANALYSIS_COORDINATES_BUTTONS[2]}</span>
        </div>
        {error && <div className="analysis-coordinates-error">{text[language].ANALYSIS_COORDINATES_ERROR}</div>}
      </ControlledModalWrapper>
    );
  }

}
