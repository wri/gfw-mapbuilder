// import analysisKeys from 'constants/AnalysisConstants';
// import layerKeys from 'constants/LayerConstants';
import mapActions from 'actions/MapActions';
// import appUtils from 'utils/AppUtils';
import text from 'js/languages';

import React, {
  Component,
  PropTypes
} from 'react';

export default class AnalysisTypeSelect extends Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired
  };

  createOptions = (analysisObj, i) => {
    const { language } = this.context;
    const { analysisId, label } = analysisObj;

    return (
      <option
        key={analysisId + i}
        value={analysisId}
      >
        {label[language] ? label[language] : ''}
      </option>
    );
  }


  handleChange = e => {
    mapActions.setAnalysisType(e.target.value);
  }

  render () {
    const { activeAnalysisType, analysisItems } = this.props;
    const { language } = this.context;

    return (
      <div className='analysis-results__container'>
        <div className='relative analysis-results__select-container'>
          <select
            value={activeAnalysisType || 'default'}
            className='analysis-results__select pointer'
            onChange={this.handleChange}
          >
            <option
              value='default'
              disabled={activeAnalysisType !== 'default'}
            >
              {text[language].DEFAULT_ANALYSIS_LABEL}
            </option>
            {analysisItems.map(this.createOptions)}
          </select>
          <div className='analysis-results__select-arrow' />
        </div>
        {activeAnalysisType === 'default' &&
          <div className='analysis-results__none-selected'>
            <div className='analysis-results__info-container'>
              <div className='analysis-results__info'>
                <div><strong>Analysis not selected</strong></div>
                <div>Select an analysis from the drop-down menu to begin</div>
              </div>
              <div className='analysis-results__chart-icon chart-icon' />
            </div>
          </div>
        }
      </div>
    );
  }
}
