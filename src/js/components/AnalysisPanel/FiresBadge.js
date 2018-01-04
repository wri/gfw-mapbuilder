import React, {PropTypes} from 'react';
import text from 'js/languages';
import utils from 'utils/AppUtils';
import moment from 'moment';

const FiresBadge = (props, context) => {
  const { language } = context;

  if (typeof props.results === 'object' && props.results.hasOwnProperty('error')) {
    return (
      <div className='data-error'>
        <h5>{props.results.message}</h5>
      </div>
    );
  } else {
    return (
      <div className='results__fires-badge'>
        <div className='results__fires-pre'>{text[language].ANALYSIS_FIRES_PRE}</div>
        <div className='results__fires-count'>{utils.formatNumber(props.count)}</div>
        <div className='results__fires-active'>{text[language].ANALYSIS_FIRES_ACTIVE}</div>
        <div className='results__fires-post'>{text[language].TIMELINE_START}{moment(props.from).format('MM/DD/YYYY')}<br />{text[language].TIMELINE_END}{moment(props.to).format('MM/DD/YYYY')}</div>
      </div>
    );
  }
};

FiresBadge.propTypes = {
  count: PropTypes.number.isRequired
};

FiresBadge.contextTypes = {
  language: PropTypes.string.isRequired
};

export { FiresBadge as default };
