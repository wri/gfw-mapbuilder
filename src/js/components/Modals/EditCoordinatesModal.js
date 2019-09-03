import ControlledEditModalWrapper from 'components/Modals/ControlledEditModalWrapper';
import mapActions from 'actions/MapActions';
import MapStore from '../../stores/MapStore';
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
      ...MapStore.getState()
    };
  }
  
  componentDidMount() {
    MapStore.listen(this.storeDidUpdate);
  }
  
  storeDidUpdate = () => {
    this.setState(MapStore.getState());
  };

  close = () => {
    mapActions.toggleEditCoordinatesModal({ visible: false });
    mapActions.toggleEditing();
  };

  render () {
    const {language} = this.context;
    const {currentLat, currentLng} = this.state;
    return (
      <ControlledEditModalWrapper onClose={this.close}>
        <div className="edit-coordinates-header">
            <h4 className="edit-coordinates-title">
                {`${text[language].EDIT_COORDINATES_LABELS[0]}`}
            </h4>
        </div>
          <div className="edit-coordinates-container">
              <div className="edit-coordinates-latitude-container">
                  <span className="edit-coordinates-latitude-label">{`${text[language].EDIT_COORDINATES_LABELS[1]}`}</span>
                  <span className="edit-coordinates-latitude">{currentLat.toFixed(2)}</span>
              </div>
              <div className="edit-coordinates-longitude-container">
                  <span className="edit-coordinates-longitude-label">{`${text[language].EDIT_COORDINATES_LABELS[2]}`}</span>
                  <span className="edit-coordinates-longitude">{currentLng.toFixed(2)}</span>
              </div>
          </div>
      </ControlledEditModalWrapper>
    );
  }
}
