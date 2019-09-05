import CustomFeatureControl from 'components/AnalysisPanel/CustomFeatureControl';
import ReportSubscribeButtons from 'components/Shared/ReportSubscribe';
import {attributes} from 'constants/AppConstants';
import text from 'js/languages';
import SVGIcon from 'utils/svgIcon';

import React, {
  Component,
  PropTypes
} from 'react';

export default class InfoWindow extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
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

  render () {
    const {infoWindow} = this.props.map;
    const {language} = this.context;
    let count = 0, selectedIndex = 0;
    let selectedFeature, content, title, footer;
    const {editingEnabled} = this.props;

    if ( infoWindow && infoWindow.getSelectedFeature ) {
      count = infoWindow.count;
      selectedFeature = infoWindow.getSelectedFeature();
      selectedIndex = infoWindow.selectedIndex;
      content = infoWindow._contentPane.innerHTML;
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
    }

    return (
      <div className='infoWindow relative'>
        <div className={`infoWindow__content ${selectedFeature ? '' : 'hidden'}`}>
          <div className='feature-controls'>
            <span>{count} features selected.</span>
            <svg onClick={this.clearFeatures} className='infoWindow__clearFeatures-icon pointer-custom'>
              <SVGIcon id={'shape-close'} />

            </svg>
            <span className={`arrow right ${selectedIndex < count - 1 ? '' : 'disabled'}`} onClick={this.next}>Next</span>
            <span className={`arrow left ${selectedIndex > 0 ? '' : 'disabled'}`} onClick={this.previous}>Prev</span>
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
