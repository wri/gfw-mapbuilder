import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import mapActions from 'actions/MapActions';
import React, { Component, PropTypes } from 'react';
import text from '../../../js/languages';
import SVGIcon from '../../utils/svgIcon';
import geometryUtils from '../../utils/geometryUtils';
import Polygon from 'esri/geometry/Polygon';
import layerKeys from '../../constants/LayerConstants';
import webMercatorUtils from 'esri/geometry/webMercatorUtils';
import SpatialReference from 'esri/SpatialReference';

const defaultDMS = {
  lat: {
    hours: "",
    minutes: "",
    seconds: "",
    direction: "N"
  },
  lng: {
    hours: "",
    minutes: "",
    seconds: "",
    direction: "E"
  }
};

const defaultDD = {
  lat: "",
  lng: ""
};

export default class CoordinatesModal extends Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };


  constructor(props) {
    super(props);
    this.dmsCoordinates = [];
    this.ddCoordinates = [];
    for (let i = 0; i < 3; i++){
      this.dmsCoordinates.push(defaultDMS);
      this.ddCoordinates.push(defaultDD);
    }
    this.state = {
      coordinatesFormat: '',
      dmsCoordinates: this.dmsCoordinates,
      ddCoordinates: this.ddCoordinates,
      error: false
    };
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
      error: false
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
      error: false
    });
  };
  
  updateDMS = (evt, index, type, latlng) => {
    const dmsCoordinate = {lat: {}, lng: {}};
    dmsCoordinate.lat = Object.assign({}, this.state.dmsCoordinates[index].lat);
    dmsCoordinate.lng = Object.assign({}, this.state.dmsCoordinates[index].lng);
    
    if (type !== 'direction'){
      dmsCoordinate[latlng][type] = parseFloat(evt.target.value);
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
  
  updateDD = (evt, index, latlng) => {
    const ddCoordinate = Object.assign({}, this.state.ddCoordinates[index]);
    
    if (latlng === 'lat'){
      ddCoordinate['lat'] = parseFloat(evt.target.value);
    } 
    
    if (latlng === 'lng'){
      ddCoordinate['lng'] = parseFloat(evt.target.value);
    } 
    
    this.setState({
      ddCoordinates: [
        ...this.state.ddCoordinates.slice(0, index),
         ddCoordinate,
         ...this.state.ddCoordinates.slice(index + 1)
      ]
    });
  };
  
  addMore = () => {
    const {language} = this.context;
    const coordinateFormatOptions = text[language].ANALYSIS_COORDINATES_FORMATS;
    const coordinatesFormat = this.state.coordinatesFormat;
    if (coordinatesFormat === coordinateFormatOptions[0]) {
      const dmsCoordinatesCopy = this.state.dmsCoordinates;
      dmsCoordinatesCopy.push(defaultDMS);
      this.setState({
        dmsCoordinates: dmsCoordinatesCopy
      });
    }
    if (coordinatesFormat === coordinateFormatOptions[1]) {
      const ddCoordinatesCopy = this.state.ddCoordinates;
      ddCoordinatesCopy.push(defaultDD);
      this.setState({
        ddCoordinates: ddCoordinatesCopy
      });
    }
  };
  
  validateShape = () => {
    this.setState({
      error: false
    });
    const {language} = this.context;
    const coordinatesFormat = this.state.coordinatesFormat;
    let validated = true;
    if (coordinatesFormat === text[language].ANALYSIS_COORDINATES_FORMATS[0] || coordinatesFormat === '') {
      const values = Object.values(this.state.dmsCoordinates);
      const latitudes = [];
      const longitudes = [];
      
      if (values) {
        values.forEach(value => {
          const {lat, lng} = value;
          if (lat) {
            latitudes.push(lat);
          }
          if (lng) {
            longitudes.push(lng);
          }
        });
        
        if (latitudes.length > 0) {
          latitudes.forEach(latitude => {
            if (
            latitude.hours === '' ||
            latitude.minutes === '' ||
            latitude.seconds === '') {
              this.setState({
                error: true
              });
              validated = false;
            }
          });
        }
        
        if (longitudes.length > 0) {
          longitudes.forEach(longitude => {
            if (
            longitude.hours === '' ||
            longitude.minutes === '' ||
            longitude.seconds === '') {
              this.setState({
                error: true
              });
              validated = false;
            }
          });
        }
      }
    }
    
    if (coordinatesFormat === text[language].ANALYSIS_COORDINATES_FORMATS[1]){
      const values = Object.values(this.state.ddCoordinates);
      if (values) {
        values.forEach(value => {
          if (value.lat === '' || value.lng === ''){
            this.setState({
              error: true
            });
            validated = false;
          }
        });
      }
    }
    
    if (validated){
      this.makeShape();
    }
  };
  
  makeShape = () => {
    const {coordinatesFormat, dmsCoordinates, ddCoordinates} = this.state;
    const {language, map} = this.context;
    let polygon;
    const selectedFeature = map.infoWindow.getSelectedFeature();
    
    map.infoWindow.clearFeatures();
    let layer = map.getLayer(layerKeys.USER_FEATURES);
    layer.remove(selectedFeature);
    brApp.map.graphics.clear();
    mapActions.setAnalysisType('default');
   
    
    if (coordinatesFormat === text[language].ANALYSIS_COORDINATES_FORMATS[0] || coordinatesFormat === '') {
      const values = Object.values(dmsCoordinates);
      const latlngs = [];
      const converted = [];
      let latitude;
      let longitude;
      
      if (values) {
        values.forEach(value => {
          const {lat, lng} = value;
          if (lat.hours < 0) {
            latitude = -(lat.seconds / 3600) - (lat.minutes / 60) + lat.hours;
          } else {
            latitude = (lat.seconds / 3600) + (lat.minutes / 60) + lat.hours;
          }
          if (lng.hours < 0) {
            longitude = -(lng.seconds / 3600) - (lng.minutes / 60) + lng.hours;
          } else {
            longitude = (lng.seconds / 3600) + (lng.minutes / 60) + lng.hours;
          }
          
          
        });
      }
    }
    
    if (coordinatesFormat === text[language].ANALYSIS_COORDINATES_FORMATS[1]) {
      const values = Object.values(ddCoordinates);
      const latlngs = [];
      values.forEach(value => {
        latlngs.push([value.lat, value.lng]);
      });
      const first = latlngs[0];
      latlngs.push(first);
      polygon = new Polygon([...latlngs]);
    }
    
    geometryUtils.generateDrawnPolygon(polygon).then(graphic => {
      layer = map.getLayer(layerKeys.USER_FEATURES);
      if (layer) {
        layer.add(graphic);
        map.infoWindow.setFeatures([graphic]);
      }
    });
    this.close();
  }
  
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
              className='analysis-coordinates-directions__select pointer'
              onChange={evt => this.updateDMS(evt, index, 'direction', 'lat')}
              id={`dms-latitude-direction-${item}`}
              name={`dms-latitude-${item}`}
              value={item.lat.direction}
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
              className='analysis-coordinates-directions__select pointer'
              onChange={evt => this.updateDMS(evt, index, 'direction', 'lng')}
              id={`dms-longitude-direction-${item}`}
              name={`dms-longitude-${item}`}
              value={item.lng.direction}
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
            <input
              onChange={evt => this.updateDD(evt, index, 'lat')}
              className="analysis-coordinates__latitude-measurement"
              type='number' id={`dd-latitude-degrees-${item}`}
              name={`dd-${item}`}
              value={item.lat}
            />
            <span className="analysis-coordinates__latitude-measurement-label">&deg;</span>
          </div>
        </div>
        
        <div className="analysis-coordinates__longitude-container">
          <span className="analysis-coordinates__longitude-label">{text[language].ANALYSIS_COORDINATES_LABELS[1]}</span>
          <div className="analysis-coordinates__longitude">
            <input
              onChange={evt => this.updateDD(evt, index, 'lng')}
              className="analysis-coordinates__longitude-measurement"
              type='number'
              id={`dd-longitude-degrees-${item}`}
              name={`dd-${item}`}
              value={item.lng}
            />
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
    const {coordinatesFormat, dmsCoordinates, ddCoordinates, error} = this.state;
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
        {error && <div className="analysis-coordinates-error">{text[language].ANALYSIS_COORDINATES_ERROR}</div>}
      </ControlledModalWrapper>
    );
  }

}
