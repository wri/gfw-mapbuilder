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

let featuresCategories = {};

export default class InfoWindow extends Component {
  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSelectedFeature: '',
      prevButtonHover: false,
      nextButtonHover: false
    };
  }

  previous = () => {
    this.context.map.infoWindow.selectPrevious();
    const selectedFeature = this.context.map.infoWindow.getSelectedFeature();
    this.setState({
      activeSelectedFeature: `{"name": "${selectedFeature.attributes[selectedFeature._layer.displayField] ? selectedFeature.attributes[selectedFeature._layer.displayField] : selectedFeature.attributes[selectedFeature._layer.objectIdField]}", "id": "${selectedFeature.attributes[selectedFeature._layer.objectIdField]}"}`
    });
  };

  //WIP for tomorrow
  next = () => {
    // this.context.map.infoWindow.selectNext();
    // const selectedFeature = this.context.map.infoWindow.getSelectedFeature();
    // this.setState({
    //   activeSelectedFeature: `{"name": "${selectedFeature.attributes[selectedFeature._layer.displayField] ? selectedFeature.attributes[selectedFeature._layer.displayField] : selectedFeature.attributes[selectedFeature._layer.objectIdField]}", "id": "${selectedFeature.attributes[selectedFeature._layer.objectIdField]}"}`
    // });
    const {activeSelectedFeature} = this.state;
    const selectedFeature = JSON.parse(activeSelectedFeature);
      const featuresList = selectedFeature.featuresList.split(',');
      const features = this.context.map.infoWindow.features;
      let index = 0;
      for (const feature of features) {
        for (const featureItem of featuresList) {
            if (feature.attributes[feature._layer.objectIdField].toString() === featureItem) {
            index = features.indexOf(feature) + 1;
          }
        }
      }
      this.context.map.infoWindow.select(index);
      const newSelectedFeature = this.context.map.infoWindow.getSelectedFeature();
      console.log('newSelectedFeature', newSelectedFeature);
      // this.setState({
      //   activeSelectedFeature: `{"name": "${featuresCategories[key].name}", "featuresList": "${featuresCategories[key].featuresList.map(feature => feature.attributes[feature._layer.objectIdField]).join()}"}`
      // });
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
  
  changeSelectedFeature = evt => {
    this.setState({
      activeSelectedFeature: evt.target.value
    }, () => {
      const selectedFeature = JSON.parse(this.state.activeSelectedFeature);
      const featuresList = selectedFeature.featuresList.split(',');
      const features = this.context.map.infoWindow.features;
      let index = 0;
      for (const feature of features) {
        for (const featureItem of featuresList) {
            if (feature.attributes[feature._layer.objectIdField].toString() === featureItem) {
            index = features.indexOf(feature);
          }
        }
      }
      this.context.map.infoWindow.select(index);
    });
  }
  
  prevToggleHover = () => {
    this.setState({
      prevButtonHover: !this.state.prevButtonHover
    });
  };
  
  nextToggleHover = () => {
    this.setState({
      nextButtonHover: !this.state.nextButtonHover
    });
  };
  
  selectedFeatureOption = (key, index, features) => {
    return (
      <option
        value={`{"name": "${features[key].name}", "featuresList": "${features[key].featuresList.map(feature => feature.attributes[feature._layer.objectIdField]).join()}"}`}
        key={`selected-feature-${index}`}
      >
        {`${features[key].name} (${features[key].count})`}
      </option>
    );
  };

  createDropdown = (selectedIndex, count) => {
    const { customColorTheme } = this.context.settings;
    const {prevButtonHover, nextButtonHover, activeSelectedFeature} = this.state;
    const features = this.context.map.infoWindow.features;
    //const featuresCategories = {};
    featuresCategories = {};
    features.forEach(feature => {
      if (featuresCategories[feature._layer.name]) {
        featuresCategories[feature._layer.name].count = featuresCategories[feature._layer.name].count + 1;
        featuresCategories[feature._layer.name].featuresList = [...featuresCategories[feature._layer.name].featuresList, feature];
      } else {
        featuresCategories[feature._layer.name] = {name: feature._layer.name, count: 1, featuresList: [feature]};
      }
    });
    
    return (
      <div className="relative infoWindow__select-container">
        <select className='infoWindow__select' onChange={this.changeSelectedFeature} value={activeSelectedFeature}>
          {features && features.length ? Object.keys(featuresCategories).map((key, index) => this.selectedFeatureOption(key, index, featuresCategories)) : null}
        </select>
        <div
          style={{color: `${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}}
          className='infoWindow__select-arrow'
        />
        <div className="infoWindow__prev-next-container">
          <span
            style={prevButtonHover ? {backgroundColor: `${selectedIndex > 0 ? (customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme) : '#eee'}`, opacity: `${selectedIndex > 0 ? '0.8' : '1'}`} :
            {backgroundColor: `${selectedIndex > 0 ? (customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme) : '#eee'}`}}
            className={`fa-button color arrow prev ${selectedIndex > 0 ? '' : 'disabled'}`}
            onClick={this.previous}
            onMouseEnter={this.prevToggleHover}
            onMouseLeave={this.prevToggleHover}
          >
            Prev
          </span>
          <span
            style={nextButtonHover ? {backgroundColor: `${selectedIndex < count - 1 ? (customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme) : '#eee' }`, opacity: `${selectedIndex < count - 1 ? '0.8' : '1'}`} :
            {backgroundColor: `${selectedIndex < count - 1 ? (customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme) : '#eee'}`}}
            className={`fa-button color arrow next ${selectedIndex < count - 1 ? '' : 'disabled'}`}
            onClick={this.next}
            onMouseEnter={this.nextToggleHover}
            onMouseLeave={this.nextToggleHover}
          >
            Next
          </span>
        </div>
      </div>
    );
  };

  render () {
    const {infoWindow} = this.context.map;
    const {language} = this.context;
    let count = 0;
    let selectedIndex = 0;
    let selectedFeature, content, title, footer, dropdown, features;
    const {editingEnabled} = this.props;
    
    if ( infoWindow && infoWindow.getSelectedFeature ) {
      count = infoWindow.count;
      selectedFeature = infoWindow.getSelectedFeature();
      selectedIndex = infoWindow.selectedIndex;
      content = infoWindow._contentPane.innerHTML;
      features = infoWindow.features;
    }
    
    console.log('featuresCategories', featuresCategories);
    console.log('selected feature', selectedFeature);

    if (selectedFeature) {
      if (selectedFeature.attributes && selectedFeature.attributes.source && selectedFeature.attributes.source === attributes.SOURCE_SEARCH) {
        title = (
          <div className='infoWindow__title'>
            {selectedFeature.infoTemplate.title}
          </div>
        );
      }
      //- For Drawn Features, Give them a Control which can rename or delete the feature
      if (selectedFeature.attributes && selectedFeature.attributes.source && selectedFeature.attributes.source === attributes.SOURCE_DRAW ||
        selectedFeature.attributes && selectedFeature.attributes.source && selectedFeature.attributes.source === attributes.SOURCE_UPLOAD
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
      dropdown = this.createDropdown(selectedIndex, count);
    }
    if (featuresCategories && selectedFeature){
      console.log('featuresList', featuresCategories[selectedFeature._layer.name].featuresList);
    }
    return (
      <div className='infoWindow relative'>
        <div className={`infoWindow__content ${selectedFeature ? '' : 'hidden'}`}>
          <div className='feature-controls'>
            <svg onClick={this.clearFeatures} className='infoWindow__clearFeatures-icon pointer-custom'>
              <SVGIcon id={'shape-close'} />
            </svg>
            {selectedFeature && selectedFeature.attributes && selectedFeature.attributes.source === 'draw' ? null : dropdown}
          </div>
          <div className="infoWindow__count">
            {featuresCategories && selectedFeature && selectedFeature._layer && selectedFeature._layer.name && featuresCategories[selectedFeature._layer.name] ?
            `${featuresCategories[selectedFeature._layer.name].featuresList.indexOf(featuresCategories[selectedFeature._layer.name].featuresList[selectedIndex]) + 1} / ${featuresCategories[selectedFeature._layer.name].count}` : null}
          </div>
          <div className="infoWindow__title">
            <div dangerouslySetInnerHTML={{__html: content }} />
          </div>
          <div className='infoWindow__attribute-display custom-scroll'>
            {title}
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
