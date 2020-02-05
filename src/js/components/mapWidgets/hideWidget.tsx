import React, { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toggleTabviewPanel, toggleTab } from 'js/store/appState/actions';

import { RootState } from 'js/store/index';

import { ReactComponent as HideIcon } from '../../../images/hideIcon.svg';

const HideWidget: FunctionComponent = () => {
  // TODO connect to Redux to toggle leftPanel and Legend
  const dispatch = useDispatch();
  const { tabViewVisible } = useSelector(
    (state: RootState) => state.appState.leftPanel
  );

  const toggleContent = (): void => {
    if (tabViewVisible) {
      // [X] toggle left panel content
      // [ ] toggle layer panel buttons
      // [ ] toggle legend
      dispatch(toggleTabviewPanel(false));
      dispatch(toggleTab(false));
      // turn off
    } else {
      // turn on!
      dispatch(toggleTabviewPanel(true));
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
