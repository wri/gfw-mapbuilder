import ControlledEditModalWrapper from 'components/Modals/ControlledEditModalWrapper';
import mapActions from 'actions/MapActions';
import mapStore from '../../stores/MapStore';
import React, { Component, PropTypes } from 'react';
import text from '../../../js/languages';
import SVGIcon from '../../utils/svgIcon';
import geometryUtils from '../../utils/geometryUtils';
import Polygon from 'esri/geometry/Polygon';
import layerKeys from '../../constants/LayerConstants';


export default class editCoordinatessModal extends Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };


  constructor(props) {
    super(props);
    this.state = {
      coordinateValue: '',
      ...mapStore.getState()
    };
  }
  
  componentDidMount() {
    mapStore.listen(this.storeDidUpdate);
  }

  storeDidUpdate = () => {
      this.setState(mapStore.getState());
  };

  close = () => {
    mapActions.toggleEditCoordinatesModal({ visible: false });
    mapActions.toggleEditing();
    this.setState({
      coordinateValue: ''
    });
  };
  
  editCoordinates = evt => {
    console.log('value', evt.target.value);
  };
  
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
            {/* <span className="analysis-coordinates__latitude-measurement-label">"</span>
            <select
              className='analysis-coordinates-directions__select pointer'
              onChange={evt => this.updateDMS(evt, index, 'direction', 'lat')}
              id={`dms-latitude-direction-${item}`}
              name={`dms-latitude-${item}`}
              value={item.lat.direction}
            >
              {latitudeDirectionOptions && latitudeDirectionOptions.map(this.createOptions)}
            </select> */}
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
            {/* <span className="analysis-coordinates__longitude-measurement-label">"</span>
            <select
              className='analysis-coordinates-directions__select pointer'
              onChange={evt => this.updateDMS(evt, index, 'direction', 'lng')}
              id={`dms-longitude-direction-${item}`}
              name={`dms-longitude-${item}`}
              value={item.lng.direction}
            >
              {longitudeDirectionOptions && longitudeDirectionOptions.map(this.createOptions)}
            </select> */}
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

  render () {
    const {language} = this.context;
    const {coordinateValue, coordinatesFormat, dmsCoordinates, ddCoordinates} = this.state;
    console.log('coordinatesFormat', coordinatesFormat);
    console.log('dmsCoordinates', dmsCoordinates);
    console.log('ddCoordinates', ddCoordinates);
    return (
      <ControlledEditModalWrapper onClose={this.close}>
        <div className="edit-coordinates-header">
          <h4 className="edit-coordinates-title">
            {
              `${text[language].EDIT_COORDINATES_LABELS[0]}
              ${coordinatesFormat === text[language].ANALYSIS_COORDINATES_FORMATS[0] ? text[language].EDIT_COORDINATES_FORMATS[0] : text[language].EDIT_COORDINATES_FORMATS[1]  }`
            }
          </h4>
          {/* <div className="edit-coordinates-delete">
            <span className="edit-coordinates-delete-text">{text[language].EDIT_COORDINATES_LABELS[1]}</span>
          </div>
        </div>
        <div className='edit-coordinates-input-container'>
          <input
            onChange={evt => this.editCoordinates(evt)}
            className="edit-coordinates-input"
            type='number'
            id="edit-coordinates"
            name="edit-coordinates"
            value={coordinateValue}
          /> */}
          {
            coordinatesFormat === text[language].ANALYSIS_COORDINATES_FORMATS[0] ?
            dmsCoordinates.map((item, index) => this.renderDMS(item, index)) :
            ddCoordinates.map((item, index) => this.renderDD(item, index))
          }
        </div>
      </ControlledEditModalWrapper>
    );
  }

}
