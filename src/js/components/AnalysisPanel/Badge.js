import React from 'react';
import utils from 'utils/AppUtils';

const Badge = ({ results, label, valueAttribute, color }) => {
  const value = valueAttribute.split('.').reduce((prevVal, currentVal) => {
    if (!prevVal.hasOwnProperty(currentVal)) {
      throw new Error(`response object does not contain property: '${currentVal}'. Check the 'valueAttribute' config`);
    }
    return prevVal[currentVal];
  }, results);

  const style = {
    borderColor: color,
    color,
  };

  if (typeof results === 'object' && results.hasOwnProperty('error')) {
    return (
      <div className='data-error'>
        <h5>{results.message}</h5>
      </div>
    );
  } else {
    return (
      <div className='results__badge' style={style}>
        <div className='results__badge-label'>{label}</div>
        <div className='results__badge-value'>{utils.formatNumber(value)}</div>
      </div>
    );
  }
};

export { Badge as default };
