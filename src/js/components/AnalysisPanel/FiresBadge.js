import React, {PropTypes} from 'react';
import text from 'js/languages';
import utils from 'utils/AppUtils';
import moment from 'moment';

const FiresBadge = ({ results, from, to }, context) => {
  const { language } = context;

  if (typeof results === 'object' && results.hasOwnProperty('error')) {
    return (
      <div className='data-error'>
        <h5>{results.message}</h5>
      </div>
    );
  } else {
    const { value } = results.data.attributes;
    return (
      <div className='results__fires-badge'>
        <div className='results__fires-pre'>{text[language].ANALYSIS_FIRES_PRE}</div>
        <div className='results__fires-count'>{utils.formatNumber(value)}</div>
        <div className='results__fires-active'>{text[language].ANALYSIS_FIRES_ACTIVE}</div>
        <div className='results__fires-post'>{text[language].TIMELINE_START}{moment(from).format('MM/DD/YYYY')}<br />{text[language].TIMELINE_END}{moment(to).format('MM/DD/YYYY')}</div>
      </div>
    );
  }
};

FiresBadge.contextTypes = {
  language: PropTypes.string.isRequired
};

export { FiresBadge as default };
