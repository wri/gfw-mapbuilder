import React, { PropTypes } from 'react';
import text from 'js/languages';
import { analysisConfig } from 'js/config';
import utils from 'utils/AppUtils';
import analysisKeys from 'constants/AnalysisConstants';

const LossGainBadge = (props, context) => {

  const { lossFromSelectIndex, lossToSelectIndex, results } = props;
  const { lossTotal, gainTotal } = results;
  const { language } = context;
  const labelArray = analysisConfig[analysisKeys.TC_LOSS].labels;

  if (results.hasOwnProperty('error')) {
    return (
      <div className='results__loss-gain'>
        <div className='data-error'>
          <h5>{results.message}</h5>
        </div>
      </div>
    );
  } else {

    return (
      <div className='results__loss-gain'>
        <div className='results__loss-badge'>
          <div className='results__loss-gain--label'>{text[language].ANALYSIS_TOTAL_LOSS_LABEL}</div>
          <div className='results__loss-gain--range'>{labelArray[lossFromSelectIndex]} &ndash; {labelArray[lossToSelectIndex]}</div>
          <span className='results__loss--count'>{utils.formatNumber(lossTotal)}</span>
          <span className='results__loss--unit'>Ha</span>
        </div>
        <div className='results__gain-badge'>
          <div className='results__loss-gain--label'>{text[language].ANALYSIS_TOTAL_GAIN_LABEL}</div>
          <div className='results__loss-gain--range'>{text[language].ANALYSIS_TOTAL_GAIN_RANGE}</div>
          <span className='results__gain--count'>{utils.formatNumber(gainTotal)}</span>
          <span className='results__gain--unit'>Ha</span>
        </div>
      </div>
    );
  }
};

LossGainBadge.propTypes = {
  lossFromSelectIndex: PropTypes.number.isRequired,
  lossToSelectIndex: PropTypes.number.isRequired
};

LossGainBadge.contextTypes = {
  language: PropTypes.string.isRequired
};

export { LossGainBadge as default };
