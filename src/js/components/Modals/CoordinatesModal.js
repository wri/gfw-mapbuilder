import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import mapActions from 'actions/MapActions';
import React, { Component, PropTypes } from 'react';
import text from '../../../js/languages';
import SVGIcon from '../../utils/svgIcon';
import geometryUtils from '../../utils/geometryUtils';
import Polygon from 'esri/geometry/Polygon';
import Point from 'esri/geometry/Point';
import layerKeys from '../../constants/LayerConstants';

const defaultDMS = {
  lat: {
    degrees: "",
    minutes: "",
    seconds: "",
    direction: "N"
  },
  lng: {
    degrees: "",
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
      coordinatesFormat: 'Degrees Decimal Minutes (DMS)',
      dmsCoordinates: this.dmsCoordinates,
      ddCoordinates: this.ddCoordinates,
      errors: []
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
      coordinatesFormat: 'Degrees Decimal Minutes (DMS)',
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
    const {coordinatesFormat, dmsCoordinates, ddCoordinates} = this.state;
    if (coordinatesFormat === coordinateFormatOptions[0]) {
      const dmsCoordinatesCopy = dmsCoordinates;
      dmsCoordinatesCopy.push(defaultDMS);
      this.setState({
        dmsCoordinates: dmsCoordinatesCopy
      });
    } else {
      const ddCoordinatesCopy = ddCoordinates;
      ddCoordinatesCopy.push(defaultDD);
      this.setState({
        ddCoordinates: ddCoordinatesCopy
      });
    }
  };
  
  remove = (index) => {
    const {language} = this.context;
    const coordinateFormatOptions = text[language].ANALYSIS_COORDINATES_FORMATS;
    const {coordinatesFormat, dmsCoordinates, ddCoordinates} = this.state;
    if (coordinatesFormat === coordinateFormatOptions[0]) {
      const dmsCoordinatesCopy = dmsCoordinates;
      dmsCoordinatesCopy.splice(index, 1);
      this.setState({
        dmsCoordinates: dmsCoordinatesCopy
      });
    } else {
      const ddCoordinatesCopy = ddCoordinates;
      ddCoordinatesCopy.splice(index, 1);
      this.setState({
        ddCoordinates: ddCoordinatesCopy
      });
    }
  };
  
  validateShape = () => {
    this.setState({
      errors: []
    });
    const {language} = this.context;
    const coordinatesFormat = this.state.coordinatesFormat;
    let validated = true;
    const errors = [];
    if (coordinatesFormat === text[language].ANALYSIS_COORDINATES_FORMATS[0]) {
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
              latitude.degrees === '' ||
              latitude.minutes === '' ||
              latitude.seconds === ''
            ) {
              errors.push(0);
              validated = false;
            }
            if (
              latitude.degrees < 0 ||
              latitude.minutes < 0 ||
              latitude.seconds < 0
            ) {
              errors.push(1);
              validated = false;
            }
            if (
              latitude.degrees > 90 ||
              latitude.minutes > 90 ||
              latitude.seconds > 90
            ) {
              errors.push(2);
              validated = false;
            }
          });
        }
        
        if (longitudes.length > 0) {
          longitudes.forEach(longitude => {
            if (
            longitude.degrees === '' ||
            longitude.minutes === '' ||
            longitude.seconds === ''
            ) {
              errors.push(0);
              validated = false;
            }
            if (
              longitude.degrees < 0 ||
              longitude.minutes < 0 ||
              longitude.seconds < 0
            ) {
              errors.push(1);
              validated = false;
            }
            if (
              longitude.degrees > 180 ||
              longitude.minutes > 180 ||
              longitude.seconds > 180
            ) {
              errors.push(3);
              validated = false;
            }
          });
        }
        const filteredErrors = [...new Set(errors)];
        this.setState({
          errors: filteredErrors
        });
      }
    } else {
      const values = Object.values(this.state.ddCoordinates);
      if (values) {
        values.forEach(value => {
          if (
            value.lat === '' ||
            value.lng === ''
          ){
            errors.push(0);
            validated = false;
          }
          if (
            value.lat < -90 ||
            value.lat > 90
          ){
            errors.push(4);
            validated = false;
          }
          if (
            value.lng < -180 ||
            value.lng > 180
          ){
            errors.push(5);
            validated = false;
          }
        });
        const filteredErrors = [...new Set(errors)];
        this.setState({
          errors: filteredErrors
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
   
    
    if (coordinatesFormat === text[language].ANALYSIS_COORDINATES_FORMATS[0]) {
      const values = Object.values(dmsCoordinates);
      const latlngs = [];
      let latitude;
      let longitude;
      
      if (values) {
        values.forEach(value => {
          const {lat, lng} = value;
          if (lat.direction === 'S') {
            latitude = ((lat.seconds / 3600) - (lat.minutes / 60) + lat.degrees) * -1;
          } else {
            latitude = (lat.seconds / 3600) + (lat.minutes / 60) + lat.degrees;
          }
          if (lng.direction === 'W') {
            longitude = ((lng.seconds / 3600) - (lng.minutes / 60) + lng.degrees) * -1;
          } else {
            longitude = (lng.seconds / 3600) + (lng.minutes / 60) + lng.degrees;
          }
          latlngs.push([longitude, latitude]);
        });
        const first = latlngs[0];
        latlngs.push(first);
        polygon = new Polygon([...latlngs]);
      }
    } else {
      const values = Object.values(ddCoordinates);
      const latlngs = [];
      values.forEach(value => {
        latlngs.push([value.lng, value.lat]);
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
      const graphicExtent = graphic.geometry.getExtent();
      if (graphicExtent) {
        map.setExtent(graphicExtent, true);
      } else {
        map.centerAndZoom(new Point(graphic.geometry), 15);
      }
      map.graphics.add(graphic);
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
        {index > 2 &&
          <div className="analysis-coordinates-remove" onClick={() => this.remove(index)}>
            <span className="analysis-coordinates-remove-text">{text[language].ANALYSIS_COORDINATES_BUTTONS[3]}</span>
            <SVGIcon id={'icon-analysis-remove'} />
          </div>
        }
        <div className="analysis-coordinates__latitude-container">
          <span className="analysis-coordinates__latitude-label">{text[language].ANALYSIS_COORDINATES_LABELS[0]}</span>
          <div className="analysis-coordinates__latitude">
            <input
              onChange={evt => this.updateDMS(evt, index, 'degrees', 'lat')}
              className="analysis-coordinates__latitude-measurement"
              type='number'
              id={`dms-latitude-degrees-${item}`}
              name={`dms-latitude-${item}`}
              value={item.lat.degrees}
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
              onChange={evt => this.updateDMS(evt, index, 'degrees', 'lng')}
              className="analysis-coordinates__longitude-measurement"
              type='number'
              id={`dms-longitude-degrees-${item}`}
              name={`dms-longitude-${item}`}
              value={item.lng.degrees}
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
        {index > 2 &&
          <div className="analysis-coordinates-remove" onClick={() => this.remove(index)}>
            <span className="analysis-coordinates-remove-text">{text[language].ANALYSIS_COORDINATES_BUTTONS[3]}</span>
            <SVGIcon id={'icon-analysis-remove'} />
          </div>
        }
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
    const {coordinatesFormat, dmsCoordinates, ddCoordinates, errors} = this.state;
    const coordinateFormatOptions = text[language].ANALYSIS_COORDINATES_FORMATS;
    
    return (
      <ControlledModalWrapper onClose={this.close}>
        <h4 className="analysis-instructions__header">{text[language].ANALYSIS_COORDINATES_HEADER}</h4>
        <div className='relative analysis-coordinates__select-container'>
          <label htmlFor="coordinates-formats" className="analysis-coordinates__label">{text[language].ANALYSIS_COORDINATES_LABELS[2]}</label>
          <select
            value={coordinatesFormat}
            className='analysis-coordinates__select pointer'
            onChange={evt => this.switchCoordinatesFormat(evt)}
            id="coordinates-formats"
          >
            {coordinateFormatOptions && coordinateFormatOptions.map(this.createOptions)}
          </select>
          <div className='analysis-coordinates__select-arrow'></div>
        </div>

        {coordinatesFormat === coordinateFormatOptions[1] && <div className="analysis-coordinates__divider-dd"></div>}
        {coordinatesFormat === coordinateFormatOptions[0] &&
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
