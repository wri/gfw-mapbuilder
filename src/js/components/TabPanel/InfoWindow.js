import CustomFeatureControl from 'components/AnalysisPanel/CustomFeatureControl';
import ReportSubscribeButtons from 'components/Shared/ReportSubscribe';
import {attributes} from 'constants/AppConstants';
import text from 'js/languages';
import SVGIcon from 'utils/svgIcon';
import {defaultColorTheme} from '../../config';
import mapActions from '../../actions/MapActions';
import MapStore from '../../stores/MapStore';

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
      featuresCount: 1,
      prevButtonHover: false,
      nextButtonHover: false,
      ...MapStore.getState()
    };
  }
  
  componentDidMount() {
    MapStore.listen(this.storeDidUpdate);
  }
  
  storeDidUpdate = () => {
    this.setState(MapStore.getState());
  };

  previous = () => {
    // //this.context.map.infoWindow.selectPrevious();
    // const selectedFeature = this.context.map.infoWindow.getSelectedFeature();
    // const features = this.context.map.infoWindow.features;
    // console.log('selectedFeature prev', selectedFeature);
    // console.log('features prev', features);
    // //let count = 0;
    // features.forEach(feature => {
    //   if (feature._layer.name === selectedFeature._layer.name) {
    //     //count++;
    //     if (layersCategories[feature._layer.name]) {
    //       layersCategories[feature._layer.name].count = layersCategories[feature._layer.name].count + 1;
    //       layersCategories[feature._layer.name].featuresList = [...layersCategories[feature._layer.name].featuresList, feature];
    //     }
    //   }
    // });
    
    // layersCategories = {};
    // features.forEach(feature => {
    //   if (layersCategories[feature._layer.name]) {
    //     layersCategories[feature._layer.name].count = layersCategories[feature._layer.name].count + 1;
    //     layersCategories[feature._layer.name].featuresList = [...layersCategories[feature._layer.name].featuresList, feature];
    //   } else {
    //     layersCategories[feature._layer.name] = {name: feature._layer.name, count: 1, featuresList: [feature]};
    //   }
    // });
    // this.setState({
    //   selectIndex: this.state.selectIndex - 1
    //   //activeSelectedFeature: `{"name": "${selectedFeature._layer.name}", "count": "${count}", "featuresList": "${selectedFeature.featuresList.map(feature => feature.attributes[feature._layer.objectIdField]).join()}"}`
    // });

    // this.setState({
    //   selectIndex: this.state.selectIndex - 1
    // });
    if (this.state.selectIndex > 0) {
      mapActions.decreaseSelectIndex();
    }
  };

  next = () => {
    // // this.context.map.infoWindow.selectNext();
    // // const selectedFeature = this.context.map.infoWindow.getSelectedFeature();
    // // this.setState({
    // //   selectIndex: this.state.selectIndex + 1,
    // //   activeSelectedFeature: `{"name": "${selectedFeature.attributes[selectedFeature._layer.displayField] ? selectedFeature.attributes[selectedFeature._layer.displayField] : selectedFeature.attributes[selectedFeature._layer.objectIdField]}", "id": "${selectedFeature.attributes[selectedFeature._layer.objectIdField]}"}`
    // // });
    //const selectedFeature = this.context.map.infoWindow.getSelectedFeature();
    const {activeSelectedFeature, selectIndex} = this.state;
    const selectedFeature = JSON.parse(activeSelectedFeature);
    const featuresList = selectedFeature.featuresList.split(',');
    // const features = this.context.map.infoWindow.features;
    // const lastFeature = featuresList[featuresList.length - 1];
    // let lastIndex = 0;
    // let index = 0;
    // for (const feature of features) {
    //   for (const featureItem of featuresList) {
    //       if (feature.attributes[feature._layer.objectIdField].toString() === featureItem) {
    //       index = features.indexOf(feature) + 1;
    //       lastIndex = features.indexOf(lastFeature);
    //     }
    //   }
    // }
    // if (index < lastIndex) {
    //   //this.context.map.infoWindow.select(index);
    //   this.context.map.infoWindow.selectNext();
    //   const newSelectedFeature = this.context.map.infoWindow.getSelectedFeature();
    //   console.log('newSelectedFeature', newSelectedFeature);
    //   this.setState({
    //     selectIndex: this.state.selectIndex + 1
    //     //activeSelectedFeature: `{"name": "${selectedFeature._layer.name}", "count": "${count}", "featuresList": "${selectedFeature.featuresList.map(feature => feature.attributes[feature._layer.objectIdField]).join()}"}`
    //   });
      
    //   // this.setState({
    //   //   activeSelectedFeature: `{"name": "${layersCategories[key].name}", "featuresList": "${layersCategories[key].featuresList.map(feature => feature.attributes[feature._layer.objectIdField]).join()}"}`
    //   // });
    // }
    
    // this.setState({
    //   selectIndex: this.state.selectIndex + 1
    // });
    if (selectIndex < featuresList.length && selectIndex !== featuresList.length - 1) {
      mapActions.increaseSelectIndex();
    } else {
      return;
    }
  };

  clearFeatures = () => {
    const {map} = this.context;
    const features = map.infoWindow.features;
    const selectIndex = map.infoWindow.selectIndex;

    const newFeatures = [
      ...features.slice(0, selectIndex),
      ...features.slice(selectIndex + 1)
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
    const features = this.context.map.infoWindow.features;
    const selectedFeature = JSON.parse(evt.target.value);
    const featuresList = selectedFeature.featuresList.split(',');
    let index = 0;
    for (const feature of features) {
      for (const featureItem of featuresList) {
        if (feature.attributes[feature._layer.objectIdField].toString() === featureItem) {
          index = features.indexOf(feature);
        }
      }
    }
    this.context.map.infoWindow.select(index);
    this.setState({
      activeSelectedFeature: evt.target.value,
      featuresCount: featuresList.length
    });
    mapActions.resetSelectIndex();
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
  
  componentDidUpdate(prevProps, prevState) {
      if (this.context.map.infoWindow.features && prevState.activeSelectedFeature === '') {
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
      const layersKeys = Object.keys(layersCategories);
      const firstFeature = layersCategories[layersKeys[0]];
      const activeSelectedFeature = `{"name": "${firstFeature.name}", "count": "${firstFeature.count}", "featuresList": "${firstFeature.featuresList.map(feature => feature.attributes[feature._layer.objectIdField]).join()}"}`;
      this.setState({
        activeSelectedFeature,
        featuresCount: firstFeature.count
      });
    }
  }

  createDropdown = () => {
    const { customColorTheme } = this.context.settings;
    const {prevButtonHover, nextButtonHover, activeSelectedFeature, selectIndex, featuresCount} = this.state;
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
    const layersKeys = Object.keys(layersCategories);
    return (
      <div className="relative infoWindow__select-container">
        <select className='infoWindow__select' onChange={this.changeSelectedFeature} value={activeSelectedFeature}>
          {features && features.length ? layersKeys.map((key, index) => this.selectedFeatureOption(key, index, layersCategories)) : null}
        </select>
        <div
          style={{color: `${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}}
          className='infoWindow__select-arrow'
        />
        <div className="infoWindow__prev-next-container">
          <span
            style={prevButtonHover ? {backgroundColor: `${selectIndex > 0 ? (customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme) : '#eee'}`, opacity: `${selectIndex > 0 ? '0.8' : '1'}`} :
            {backgroundColor: `${selectIndex > 0 ? (customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme) : '#eee'}`}}
            className={`fa-button color arrow prev ${selectIndex > 0 ? '' : 'disabled'}`}
            onClick={this.previous}
            onMouseEnter={this.prevToggleHover}
            onMouseLeave={this.prevToggleHover}
          >
            Prev
          </span>
          <span
            style={nextButtonHover ? {backgroundColor: `${selectIndex < featuresCount - 1 ? (customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme) : '#eee'}`, opacity: `${layersCategories[layersKeys[selectIndex]].count > 1 || selectIndex < featuresCount - 1 ? '0.8' : '1'}`} :
            {backgroundColor: `${selectIndex < featuresCount - 1 ? (customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme) : '#eee'}`}}
            className={`fa-button color arrow next ${selectIndex < featuresCount - 1 ? '' : 'disabled'}`}
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
    //let selectIndex = 0;
    const {selectIndex, featuresCount} = this.state;
    let selectedFeature, content, title, footer, dropdown, features;
    const {editingEnabled} = this.props;
    
    if ( infoWindow && infoWindow.getSelectedFeature ) {
      //count = infoWindow.count;
      selectedFeature = infoWindow.getSelectedFeature();
      //selectIndex = infoWindow.selectIndex;
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
      dropdown = this.createDropdown();
    }
    
    console.log('info window index', this.state.selectIndex);
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
            `${layersCategories[selectedFeature._layer.name].featuresList.indexOf(layersCategories[selectedFeature._layer.name].featuresList[selectIndex]) + 1} /
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
