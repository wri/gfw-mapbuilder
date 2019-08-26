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

  render () {
    const {language} = this.context;
    const {coordinateValue} = this.state;
    
    return (
      <ControlledEditModalWrapper onClose={this.close}>
        <div className="edit-coordinates-header">
          <h4 className="edit-coordinates-title">{text[language].EDIT_COORDINATE_LABELS[0]}</h4>
          <div className="edit-coordinates-delete">
            <span className="edit-coordinates-delete-text">{text[language].EDIT_COORDINATE_LABELS[1]}</span>
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
          />
        </div>
      </ControlledEditModalWrapper>
    );
  }

}
