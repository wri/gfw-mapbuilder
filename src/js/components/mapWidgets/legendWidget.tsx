import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHideLegend } from '../../../../src/js/store/appSettings/actions';
import { RootState } from '../../../js/store/index';

import { LegendIcon } from '../../../images/legendIcon';

const LegendWidget: FunctionComponent = () => {
  const dispatch = useDispatch();
  const hideLegend = useSelector(
    (state: RootState) => state.appSettings.hideLegend
  );

  return (
    <>
      <div className="widget-container">
        <button
          className="image-wrapper"
          aria-label="hide left panel and legend"
          onClick={() => dispatch(setHideLegend(!hideLegend))}
        >
          <LegendIcon height={25} width={25} fill={'#555'} />
        </button>
      </div>
    </>
  );
};

export default LegendWidget;
