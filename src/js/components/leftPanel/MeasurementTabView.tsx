import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store';

const MeasurementTabView = () => {
  const { activeTab, tabViewVisible } = useSelector(
    (store: RootState) => store.appState.leftPanel
  );

  const tabViewIsVisible = tabViewVisible && activeTab === 'measurement';
  return <>{tabViewIsVisible && <div>Measurement Tab View</div>}</>;
};

export default MeasurementTabView;
