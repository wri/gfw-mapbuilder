import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import mapActions from 'actions/MapActions';
import React, { Component, PropTypes } from 'react';
import text from '../../../js/languages';
import SVGIcon from '../../utils/svgIcon';

const defaultDMS = {
  lat: {
    hours: "",
    minutes: "",
    seconds: "",
    direction: "E"
  },
  lng: {
    hours: "",
    minutes: "",
    seconds: "",
    direction: "N"
  }
};

export default class CoordinatesModal extends Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired
  };
  

  constructor(props) {
    super(props);
    this.dmsCoordinates = [];
    for (let i = 0; i < 3; i++){
      this.dmsCoordinates.push(defaultDMS);
    }
    this.state = {
      coordinatesFormat: '',
      dmsCoordinates: this.dmsCoordinates,
      error: false
    };
  }

  close = () => {
    mapActions.toggleCoordinatesModal({ visible: false });
    mapActions.toggleAnalysisModal({visible: false});
    const dmsCoordinates = [];
    for (let i = 0; i < 3; i++){
      dmsCoordinates.push(defaultDMS);
    }
    this.setState({
      coordinatesFormat: '',
      dmsCoordinates,
      error: false
    });
  };

  switchCoordinatesFormat = evt => {
    const dmsCoordinates = [];
    for (let i = 0; i < 3; i++){
      dmsCoordinates.push(defaultDMS);
    }
    this.setState({
      coordinatesFormat: evt.target.value,
      dmsCoordinates,
      error: false
    });
  };
  
  updateDMS = (evt, index, type, latlng) => {
    const dmsCoordinate = {lat: {}, lng: {}};
    dmsCoordinate.lat = Object.assign({}, this.state.dmsCoordinates[index].lat);
    dmsCoordinate.lng = Object.assign({}, this.state.dmsCoordinates[index].lng);
    
    if (type !== 'direction'){
      dmsCoordinate[latlng][type] = parseInt(evt.target.value);
    } else {
      dmsCoordinate[latlng][type] = evt.target.value;
    }
    
    this.setState({
      dmsCoordinates: [
        ...this.state.dmsCoordinates.slice(0, index),
         dmsCoordinate,
         ...this.state.dmsCoordinates.slice(index + 1)
      ]
    });
  };
  
  // updateDDValues = evt => {
  //   // Get both latitude and longitude inputs and convert into an array
  //   let ddLatLngValues = [...document.querySelectorAll(`[name=${evt.target.name}]`)];
    
  //   // Map over the array and only grab the input values
  //   ddLatLngValues = ddLatLngValues.map(ddLatLngValue => ddLatLngValue.value);
    
  //   // Make an object copy of ddVals in order to preserve existing geometry points' values
  //   const ddValuesCopy = Object.assign({}, this.state.ddValues);
    
  //   // Grab the number off the end of the event target's name which will be used as the object key in ddValues
  //   const index = evt.target.name.slice(-1);
    
  //   // Set the latitude and longitude values at the key index.
  //   ddValuesCopy[index] = ddLatLngValues;
    
  //   // Set the state of ddValues
  //   this.setState({
  //     ddValues: ddValuesCopy
  //   }, () => console.log('ddValues', this.state.ddValues));
  // };
  
  addMore = () => {
    const dmsCoordinatesCopy = this.state.dmsCoordinates;
    dmsCoordinatesCopy.push(defaultDMS);
    this.setState({
      dmsCoordinates: dmsCoordinatesCopy
    });
  };
  
  makeShape = () => {
    const {language} = this.context;
    const coordinatesFormat = this.state.coordinatesFormat;
    if (coordinatesFormat === text[language].ANALYSIS_COORDINATES_FORMATS[0] || coordinatesFormat === '') {
      const values = Object.values(this.state.dmsCoordinates);
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
      const values = Object.values(this.state.dmsCoordinates);
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
            <input
              onChange={evt => this.updateDMS(evt, index, 'hours', 'lat')}
              className="analysis-coordinates__latitude-measurement"
              type='number'
              id={`dms-latitude-hours-${item}`}
              name={`dms-latitude-${item}`}
              value={item.lat.hours}
            />
            <span className="analysis-coordinates__latitude-measurement-label">&deg;</span>
            <input
              onChange={evt => this.updateDMS(evt, index, 'minutes', 'lat')}
              className="analysis-coordinates__latitude-measurement"
              type='number'
              id={`dms-latitude-minutes-${item}`}
              name={`dms-latitude-${item}`}
              value={item.lat.minutes}
            />
            <span className="analysis-coordinates__latitude-measurement-label">'</span>
            <input
              onChange={evt => this.updateDMS(evt, index, 'seconds', 'lat')}
              className="analysis-coordinates__latitude-measurement"
              type='number'
              id={`dms-latitude-seconds-${item}`}
              name={`dms-latitude-${item}`}
              value={item.lat.seconds}
            />
            <span className="analysis-coordinates__latitude-measurement-label">"</span>
            <select
              value={item.lat.direction}
              className='analysis-coordinates-directions__select pointer'
              onChange={evt => this.updateDMS(evt, index, 'direction', 'lat')}
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
            <input
              onChange={evt => this.updateDMS(evt, index, 'hours', 'lng')}
              className="analysis-coordinates__longitude-measurement"
              type='number'
              id={`dms-longitude-hours-${item}`}
              name={`dms-longitude-${item}`}
              value={item.lng.hours}
            />
            <span className="analysis-coordinates__longitude-measurement-label">&deg;</span>
            <input
              onChange={evt => this.updateDMS(evt, index, 'minutes', 'lng')}
              className="analysis-coordinates__longitude-measurement"
              type='number'
              id={`dms-longitude-minutes-${item}`}
              name={`dms-longitude-${item}`}
              value={item.lng.minutes}
            />
            <span className="analysis-coordinates__longitude-measurement-label">'</span>
            <input
              onChange={evt => this.updateDMS(evt, index, 'seconds', 'lng')}
              className="analysis-coordinates__longitude-measurement"
              type='number' id={`dms-longitude-seconds-${item}`}
              name={`dms-longitude-${item}`}
              value={item.lng.seconds}
            />
            <span className="analysis-coordinates__longitude-measurement-label">"</span>
            <select
              value={item.lng.direction}
              className='analysis-coordinates-directions__select pointer'
              onChange={evt => this.updateDMS(evt, index, 'direction', 'lng')}
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
    const {coordinatesFormat, countArray, error, dmsCoordinates} = this.state;
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
        countArray.map((item, index) => this.renderDD(item, index))}
        {coordinatesFormat === coordinateFormatOptions[1] && <div className="analysis-coordinates__divider-dd"></div>}

        <div className="fa-button analysis-instructions__add-more-button" onClick={this.addMore}>
          <span className="analysis-instructions__add-more-icon"><SVGIcon id={'icon-add-more'} /></span>
          <span className="analysis-instructions__add-more">{text[language].ANALYSIS_COORDINATES_BUTTONS[1]}</span>
        </div>
        <div className="fa-button gold analysis-instructions__make-shape-button" onClick={this.resetError}>
          {/* <span className="analysis-instructions__make-shape-icon"><SVGIcon id={'icon-shape'} /></span> */}
          <span className="analysis-instructions__make-shape">{text[language].ANALYSIS_COORDINATES_BUTTONS[2]}</span>
        </div>
        {error && <div className="analysis-coordinates-error">{text[language].ANALYSIS_COORDINATES_ERROR}</div>}
      </ControlledModalWrapper>
    );
  }

}
