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

let layersCategories = {};

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
      selectedIndex: 0,
      featuresCount: 0,
      prevButtonHover: false,
      nextButtonHover: false
    };
  }

  previous = () => {
    //this.context.map.infoWindow.selectPrevious();
    const selectedFeature = this.context.map.infoWindow.getSelectedFeature();
    const features = this.context.map.infoWindow.features;
    console.log('selectedFeature prev', selectedFeature);
    console.log('features prev', features);
    //let count = 0;
    features.forEach(feature => {
      if (feature._layer.name === selectedFeature._layer.name) {
        //count++;
        if (layersCategories[feature._layer.name]) {
          layersCategories[feature._layer.name].count = layersCategories[feature._layer.name].count + 1;
          layersCategories[feature._layer.name].featuresList = [...layersCategories[feature._layer.name].featuresList, feature];
        }
      }
    });
    
    layersCategories = {};
    features.forEach(feature => {
      if (layersCategories[feature._layer.name]) {
        layersCategories[feature._layer.name].count = layersCategories[feature._layer.name].count + 1;
        layersCategories[feature._layer.name].featuresList = [...layersCategories[feature._layer.name].featuresList, feature];
      } else {
        layersCategories[feature._layer.name] = {name: feature._layer.name, count: 1, featuresList: [feature]};
      }
    });
    this.setState({
      selectedIndex: this.state.selectedIndex - 1,
      //activeSelectedFeature: `{"name": "${selectedFeature._layer.name}", "count": "${count}", "featuresList": "${selectedFeature.featuresList.map(feature => feature.attributes[feature._layer.objectIdField]).join()}"}`
    });
  };

  next = () => {
    // this.context.map.infoWindow.selectNext();
    // const selectedFeature = this.context.map.infoWindow.getSelectedFeature();
    // this.setState({
    //   selectedIndex: this.state.selectedIndex + 1,
    //   activeSelectedFeature: `{"name": "${selectedFeature.attributes[selectedFeature._layer.displayField] ? selectedFeature.attributes[selectedFeature._layer.displayField] : selectedFeature.attributes[selectedFeature._layer.objectIdField]}", "id": "${selectedFeature.attributes[selectedFeature._layer.objectIdField]}"}`
    // });
    
    // const {activeSelectedFeature} = this.state;
    // const selectedFeature = JSON.parse(activeSelectedFeature);
    //   const featuresList = selectedFeature.featuresList.split(',');
    //   const features = this.context.map.infoWindow.features;
    //   let index = 0;
    //   for (const feature of features) {
    //     for (const featureItem of featuresList) {
    //         if (feature.attributes[feature._layer.objectIdField].toString() === featureItem) {
    //         index = features.indexOf(feature) + 1;
    //       }
    //     }
    //   }
    //   this.context.map.infoWindow.select(index);
    //   const newSelectedFeature = this.context.map.infoWindow.getSelectedFeature();
    //   console.log('newSelectedFeature', newSelectedFeature);
    //   this.setState({
    //     activeSelectedFeature: `{"name": "${layersCategories[key].name}", "featuresList": "${layersCategories[key].featuresList.map(feature => feature.attributes[feature._layer.objectIdField]).join()}"}`
    //   });
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
  
  selectedFeatureOption = (key, index, layers) => {
    return (
      <option
        value={`{"name": "${layers[key].name}", "count": "${layers[key].count}", "featuresList": "${layers[key].featuresList.map(feature => feature.attributes[feature._layer.objectIdField]).join()}"}`}
        key={`selected-feature-${index}`}
      >
        {`${layers[key].name} (${layers[key].count})`}
      </option>
    );
  };

  createDropdown = (selectedIndex, featuresCount) => {
    const { customColorTheme } = this.context.settings;
    const {prevButtonHover, nextButtonHover, activeSelectedFeature} = this.state;
    const features = this.context.map.infoWindow.features;
    layersCategories = {};
    features.forEach(feature => {
      if (layersCategories[feature._layer.name]) {
        layersCategories[feature._layer.name].count = layersCategories[feature._layer.name].count + 1;
        layersCategories[feature._layer.name].featuresList = [...layersCategories[feature._layer.name].featuresList, feature];
      } else {
        layersCategories[feature._layer.name] = {name: feature._layer.name, count: 1, featuresList: [feature]};
      }
    });
    
    return (
      <div className="relative infoWindow__select-container">
        <select className='infoWindow__select' onChange={this.changeSelectedFeature} value={activeSelectedFeature}>
          {features && features.length ? Object.keys(layersCategories).map((key, index) => this.selectedFeatureOption(key, index, layersCategories)) : null}
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
            style={nextButtonHover ? {backgroundColor: `${selectedIndex < featuresCount - 1 ? (customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme) : '#eee' }`, opacity: `${selectedIndex < featuresCount - 1 ? '0.8' : '1'}`} :
            {backgroundColor: `${selectedIndex < featuresCount - 1 ? (customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme) : '#eee'}`}}
            className={`fa-button color arrow next ${selectedIndex < featuresCount - 1 ? '' : 'disabled'}`}
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
    //let count = 0;
    //let selectedIndex = 0;
    const {selectedIndex, featuresCount} = this.state;
    let selectedFeature, content, title, footer, dropdown, features;
    const {editingEnabled} = this.props;
    
    if ( infoWindow && infoWindow.getSelectedFeature ) {
      //count = infoWindow.count;
      selectedFeature = infoWindow.getSelectedFeature();
      //selectedIndex = infoWindow.selectedIndex;
      content = infoWindow._contentPane.innerHTML;
      features = infoWindow.features;
    }
    
    // console.log('layersCategories', layersCategories);
    // console.log('selected feature', selectedFeature);

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
      dropdown = this.createDropdown(selectedIndex, featuresCount);
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
            {layersCategories && selectedFeature && selectedFeature._layer && selectedFeature._layer.name && layersCategories[selectedFeature._layer.name] ?
            `${layersCategories[selectedFeature._layer.name].featuresList.indexOf(layersCategories[selectedFeature._layer.name].featuresList[selectedIndex]) + 1} /
            ${layersCategories[selectedFeature._layer.name].count}` : null}
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
