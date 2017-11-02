import React, { PropTypes } from 'react';
import text from 'js/languages';
import utils from 'utils/AppUtils';

const BiomassBadge = (props, context) => {

  const { results } = props;
  const { totalBiomass, averageBiomass } = results;
  const { language } = context;

  if (results.hasOwnProperty('error')) {
    return (
      <div className='results__biomass'>
        <div className='data-error'>
          <h5>{results.message}</h5>
        </div>
      </div>
    );
  } else {

    return (
      <div className='results__biomass'>
        <div className='results__loss-badge'>
          <div className='results__biomass--label'>{text[language].ANALYSIS_TOTAL_BIOMASS_LABEL}</div>
          <span className='results__loss--count'>{utils.formatNumber(totalBiomass)}</span>
          <span className='results__loss--unit'>MgC</span>
        </div>
        <div className='results__gain-badge'>
          <div className='results__biomass--label'>{text[language].ANALYSIS_AVERAGE_BIOMASS_LABEL}</div>
          <span className='results__gain--count'>{utils.formatNumber(averageBiomass)}</span>
          <span className='results__gain--unit'>MgC/Ha</span>
        </div>
      </div>
    );
  }
};

BiomassBadge.propTypes = {
  results: PropTypes.object.isRequired
};

BiomassBadge.contextTypes = {
  language: PropTypes.string.isRequired
};

export { BiomassBadge as default };
