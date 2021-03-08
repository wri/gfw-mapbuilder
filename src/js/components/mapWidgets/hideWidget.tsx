import React, { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setHideWidget } from '../../../js/store/appState/actions';

import { RootState } from '../../../js/store/index';

import { HideIcon } from '../../../images/hideIcon';

const HideWidget: FunctionComponent = () => {
  const dispatch = useDispatch();
  const { hideWidgetActive } = useSelector(
    (state: RootState) => state.appState
  );

  const toggleContent = (): void => {
    dispatch(setHideWidget(!hideWidgetActive));
  };

  return (
    <>
      <div className="widget-container">
        <button
          className="image-wrapper"
          aria-label="hide left panel and legend"
          onClick={toggleContent}
        >
          <HideIcon height={25} width={25} fill={'#555'} />
        </button>
      </div>
    </>
  );
};

export default HideWidget;
