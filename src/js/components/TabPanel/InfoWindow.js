import CustomFeatureControl from 'components/AnalysisPanel/CustomFeatureControl';
import ReportSubscribeButtons from 'components/Shared/ReportSubscribe';
import {attributes} from 'constants/AppConstants';
import text from 'js/languages';
import SVGIcon from 'utils/svgIcon';
import {defaultColorTheme} from '../../config';

import React, {
  Component,
  PropTypes
} from 'react';

export default class InfoWindow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeSelectedFeature: ''
    };
  }

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
  };
  
  state = {
    buttonHover: false
  };

  previous = () => {
    this.context.map.infoWindow.selectPrevious();
  };

  next = () => {
    this.context.map.infoWindow.selectNext();
  };

  clearFeatures = () => {
    const {map} = this.context;
    const features = map.infoWindow.features;
    const selectedIndex = map.infoWindow.selectedIndex;

    const newFeatures = [
      ...features.slice(0, selectedIndex),
      ...features.slice(selectedIndex + 1)
    ];

    map.infoWindow.clearFeatures();
    map.infoWindow.hide();

    map.infoWindow.setFeatures(newFeatures);
    map.infoWindow.show();
    map.infoWindow.select(0);
  };

  renderInstructionList = (instruction, index) => {
    return (
      <li key={index}>{instruction}</li>
    );
  };
  
  selectedFeatureOption = (feature, index) => <option key={`selected-feature-${index}`} value={feature.attributes[feature._layer.displayField]}>{feature.attributes[feature._layer.displayField]}</option>;
  
  changeSelectedFeature = (evt) => {
    this.setState({
      activeSelectedFeature: evt.target.value
    });
    console.log(this.state.activeSelectedFeature);
  }
  
  toggleHover = () => {
    this.setState({
      buttonHover: !this.state.buttonHover
    });
  };

  createDropdown = (features, selectedIndex, count) => {
    const { customColorTheme } = this.context.settings;
    const {buttonHover} = this.state;
    return (
      <div className="relative infoWindow__select-container">
        <select className='infoWindow__select' onChange={this.changeSelectedFeature} value={this.state.selectedFeature}>
          {features.map(this.selectedFeatureOption)}
        </select>
        <div className='infoWindow__select-arrow' />
        <div className="infowWindow__arrow-container">
          <span
            style={buttonHover ? {backgroundColor: `${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`, opacity: '0.8'} :
            {backgroundColor: `${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}}
            className={`fa-button white arrow left ${selectedIndex > 0 ? '' : 'disabled'}`}
            onClick={this.previous}
          >
            Prev
          </span>
          <span
            style={buttonHover ? {backgroundColor: `${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`, opacity: '0.8'} :
            {backgroundColor: `${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}}
            className={`fa-button color arrow right ${selectedIndex < count - 1 ? '' : 'disabled'}`}
            onClick={this.next}
          >
            Next
          </span>
        </div>
      </div>
    );
  };

  render () {
    const {infoWindow} = this.props.map;
    const {language} = this.context;
    const {activeSelectedFeature} = this.state;
    let count = 0, selectedIndex = 0;
    let selectedFeature, content, title, footer, dropdown, features;
    const {editingEnabled} = this.props;
    
    if(activeSelectedFeature) {
      selectedFeature = activeSelectedFeature;
    } else {
      if ( infoWindow && infoWindow.getSelectedFeature ) {
        count = infoWindow.count;
        selectedFeature = infoWindow.getSelectedFeature();
        selectedIndex = infoWindow.selectedIndex;
        content = infoWindow._contentPane.innerHTML;
        features = infoWindow.features;
      }
    }

    if (selectedFeature) {
      if (selectedFeature.attributes.source === attributes.SOURCE_SEARCH) {
        title = (
          <div className='infoWindow__title'>
            {selectedFeature.infoTemplate.title}
          </div>
        );
      }
      //- For Drawn Features, Give them a Control which can rename or delete the feature
      if (selectedFeature.attributes.source === attributes.SOURCE_DRAW ||
        selectedFeature.attributes.source === attributes.SOURCE_UPLOAD
      ) {
        title = (
          <div className='infoWindow__title'>
            <CustomFeatureControl feature={selectedFeature} editingEnabled={editingEnabled} />
          </div>
        );
      }
      // Add the footer
      footer = (
        <div className='infoWindow__footer'>
          <ReportSubscribeButtons />
        </div>
      );
      
      // Add the dropdown for multiple selected features
      dropdown = this.createDropdown(features, selectedIndex, count);
    }
    // console.log('selected feature', selectedFeature);
    // console.log('features', features);
    
    return (
      <div className='infoWindow relative'>
        <div className={`infoWindow__content ${selectedFeature ? '' : 'hidden'}`}>
          <div className='feature-controls'>
            <svg onClick={this.clearFeatures} className='infoWindow__clearFeatures-icon pointer-custom'>
              <SVGIcon id={'shape-close'} />
            </svg>
            {selectedFeature && selectedFeature.attributes.source === 'draw' ? null : dropdown}
            <span>{count} features selected.</span>
          </div>
          <div className='infoWindow__attribute-display custom-scroll'>
            {title}
            <div dangerouslySetInnerHTML={{__html: content }} />
          </div>
        </div>
        <div className={`infoWindow__instructions ${selectedFeature ? 'hidden' : ''}`}>
          <h4 className='analysis-instructions__header'>
            {text[language].INFO_WINDOW_INSTRUCTION_HEADER}
          </h4>
          <ol className='analysis-instructions__olist'>
            {text[language].INFO_WINDOW_INSTRUCTION_LIST.map(this.renderInstructionList)}
          </ol>
          <div className='analysis-instructions__draw-icon-container'>
            <svg className='analysis-instructions__draw-icon'>
              <SVGIcon id={'icon-analysis-poly'} />
            </svg>
          </div>
        </div>
        {footer}
      </div>
    );
  }

}

InfoWindow.propTypes = {
  map: React.PropTypes.object.isRequired
};
