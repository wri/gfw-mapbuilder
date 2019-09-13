import React, {Component, PropTypes} from 'react';
import layerKeys from 'constants/LayerConstants';
import mapActions from 'actions/MapActions';
import text from 'js/languages';

const getFeatureName = (feature) => {
  return feature.attributes && feature.attributes.title || '';
};

export default class CustomFeatureControl extends Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      title: getFeatureName(this.props.feature),
      buttonHover: false
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
  
  toggleHover = () => {
    this.setState({
      buttonHover: !this.state.buttonHover
    });
  };

  render () {
    const {language} = this.context;
    const {editingEnabled} = this.props;
    const {buttonHover} = this.state;
    const { customColorTheme, defaultColorTheme } = this.context.settings;

    return (
      <div className='custom-feature__header'>
        <input className='custom-feature__input' type='text' value={this.state.title} onChange={this.editName} />
        <div className='edit-delete-container'>
          <div
            style={buttonHover ? {backgroundColor: `${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`, opacity: '0.8'} :
                {backgroundColor: `${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}}
            className='fa-button color pointer-custom'
            onClick={this.editPolygon}
            onMouseEnter={this.toggleHover}
            onMouseLeave={this.toggleHover}
          >
            {editingEnabled ? text[language].EDIT[1] : text[language].EDIT[0]}
          </div>
          <div className='custom-feature__delete pointer-custom' onClick={this.deleteFeature}>{text[language].DELETE}</div>
        </div>
      </div>
    );
  }
}

CustomFeatureControl.propTypes = {
  feature: PropTypes.object.isRequired
};
