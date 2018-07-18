import React from 'react';
import utils from 'utils/AppUtils';
import moment from 'moment';

const FiresBadge = ({ results, from, to, preLabel, firesLabel, timelineStartLabel, timelineEndLabel }) => {

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
        <div className='results__fires-pre'>{preLabel}</div>
        <div className='results__fires-count'>{utils.formatNumber(value)}</div>
        <div className='results__fires-active'>{firesLabel}</div>
        <div className='results__fires-post'>{timelineStartLabel}{moment(from).format('MM/DD/YYYY')}<br />{timelineEndLabel}{moment(to).format('MM/DD/YYYY')}</div>
      </div>
    );
  }
};

export { FiresBadge as default };
