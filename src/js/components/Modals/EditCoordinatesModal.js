import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import mapActions from 'actions/MapActions';
import React, { Component, PropTypes } from 'react';
import text from '../../../js/languages';
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
      coordinateValue: ''
    });
  };
  
  editCoordinate = evt => {
    console.log('edit coordinate!');
  };

  render () {
    const {language} = this.context;
    const {coordinateValue} = this.state;
    
    return (
      <ControlledModalWrapper onClose={this.close}>
        <div className="edit-coordinate-header">
          <h4 className="edit-coordinate-title">{text[language].EDIT_COORDINATE_LABELS[0]}</h4>
          <div className="edit-coordinate-delete">
            <span className="edit-coordinate-delete-text">{text[language].EDIT_COORDINATE_LABELS[1]}</span>
            <SVGIcon id={'icon-analysis-remove'} />
          </div>
        </div>
        <div className='edit-coordinate-input-container'>
          <input
            onChange={evt => this.editCoordinate(evt)}
            className="edit-coordinate-input"
            type='number'
            id="edit-coordinate"
            name="edit-coordinate"
            value={coordinateValue}
          />
        </div>
      </ControlledModalWrapper>
    );
  }

}
