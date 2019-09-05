import React, {Component, PropTypes} from 'react';
import layerKeys from 'constants/LayerConstants';
import mapActions from 'actions/MapActions';
import text from 'js/languages';

const getFeatureName = (feature) => {
  return feature.attributes && feature.attributes.title || '';
};


export default class CustomFeatureControl extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      title: getFeatureName(this.props.feature)
    };
  }

  editName = ({target}) => {
    const {feature} = this.props;
    this.setState({ title: target.value });
    feature.attributes.title = target.value;
  };

  deleteFeature = () => {
    const {feature} = this.props;
    const {map} = this.context;
    map.infoWindow.clearFeatures();
    const layer = map.getLayer(layerKeys.USER_FEATURES);
    layer.remove(feature);
    brApp.map.graphics.clear();
    mapActions.setAnalysisType('default');
    mapActions.toggleEditCoordinatesModal({ visible: false});
    mapActions.resetEditing();
  };

  editPolygon = () => {
    mapActions.toggleEditing();
    mapActions.toggleEditCoordinatesModal({ visible: false});
  };

  render () {
    const {language} = this.context;
    const {editingEnabled} = this.props;

    return (
      <div className='custom-feature__header'>
        <input className='custom-feature__input' type='text' value={this.state.title} onChange={this.editName} />
        <div className='edit-delete-container'>
          <div className='custom-feature__edit pointer-custom' onClick={this.editPolygon}>{editingEnabled ? text[language].EDIT[1] : text[language].EDIT[0]}</div>
          <div className='custom-feature__delete pointer-custom' onClick={this.deleteFeature}>{text[language].DELETE}</div>
        </div>
      </div>
    );
  }
}

CustomFeatureControl.propTypes = {
  feature: PropTypes.object.isRequired
};
