import React, { PropTypes } from 'react';
import { analysisConfig } from 'js/config';
import utils from 'utils/AppUtils';
import analysisKeys from 'constants/AnalysisConstants';

const LossGainBadge = (props) => {

  const {
    lossFromSelectIndex,
    lossToSelectIndex,
    results,
    totalLossLabel,
    totalGainLabel,
    totalGainRange,
  } = props;

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
    const { loss, gain } = results.data.attributes;

    return (
      <div className='results__loss-gain'>
        <div className='results__loss-badge'>
          <div className='results__loss-gain--label'>{totalLossLabel}</div>
          <div className='results__loss-gain--range'>{labelArray[lossFromSelectIndex]} &ndash; {labelArray[lossToSelectIndex]}</div>
          <div className='results__loss--count-container'>
            <span className='results__loss--count'>{utils.formatNumber(loss)}</span>
            <span className='results__loss--unit'>Ha</span>
          </div>
        </div>
        <div className='results__gain-badge'>
          <div className='results__loss-gain--label'>{totalGainLabel}</div>
          <div className='results__loss-gain--range'>{totalGainRange}</div>
          <div className='results__gain--count-container'>
            <span className='results__gain--count'>{utils.formatNumber(gain)}</span>
            <span className='results__gain--unit'>Ha</span>
          </div>
        </div>
      </div>
    );
  }
};

LossGainBadge.propTypes = {
  lossFromSelectIndex: PropTypes.number.isRequired,
  lossToSelectIndex: PropTypes.number.isRequired
};

export { LossGainBadge as default };
