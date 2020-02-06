import React, { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toggleTabviewPanel, toggleTab } from 'js/store/appState/actions';

import { mapController } from 'js/controllers/mapController';

import { RootState } from 'js/store/index';

import { ReactComponent as HideIcon } from '../../../images/hideIcon.svg';

const HideWidget: FunctionComponent = () => {
  const dispatch = useDispatch();
  const { tabViewVisible } = useSelector(
    (state: RootState) => state.appState.leftPanel
  );

  const toggleContent = (): void => {
    if (tabViewVisible) {
      dispatch(toggleTabviewPanel(false));
      dispatch(toggleTab(false));
      mapController.toggleLegend(false);
    } else {
      dispatch(toggleTabviewPanel(true));
      dispatch(toggleTab(true));
      mapController.toggleLegend(true);
    }
  };

  return (
    <>
      <div className="widget-container">
        <button className="image-wrapper" onClick={toggleContent}>
          <HideIcon height={25} width={25} fill={'#555'} />
        </button>
      </div>
    </>
  );
};

export default HideWidget;
