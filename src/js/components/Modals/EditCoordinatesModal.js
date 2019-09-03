import ControlledEditModalWrapper from 'components/Modals/ControlledEditModalWrapper';
import mapActions from 'actions/MapActions';
import mapStore from '../../stores/MapStore';
import React, { Component, PropTypes } from 'react';
import text from '../../languages';
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
    this.state = {
      latitude: '',
      longitude: ''
    };
  }

  close = () => {
    mapActions.toggleEditCoordinatesModal({ visible: false });
    mapActions.toggleEditing();
    this.setState({
      latitude: '',
      longitude: ''
    });
  };

  render () {
    const {language} = this.context;
    const {latitude, longitude} = this.state;
    return (
      <ControlledEditModalWrapper onClose={this.close}>
        <div className="edit-coordinates-header">
            <h4 className="edit-coordinates-title">
                {`${text[language].EDIT_COORDINATES_LABELS[0]}`}
            </h4>
            <div className="edit-coordinates-container">
                <div className="edit-coordinates-latitude-container">
                    <span className="edit-coordinates-latitude-label">Latitude: </span>
                    <span className="edit-coordinates-latitude">{latitude}</span>
                </div>
                <div className="edit-coordinates-longitude-container">
                    <span className="edit-coordinates-longitude-label">Longitude: </span>
                    <span className="edit-coordinates-longitude">{longitude}</span>
                </div>
            </div>
        </div>
      </ControlledEditModalWrapper>
    );
  }
}
