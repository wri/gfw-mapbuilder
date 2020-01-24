import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store';

const LayersTabView = () => {
  const { activeTab, tabViewVisible } = useSelector(
    (store: RootState) => store.appState.leftPanel
  );

  const tabViewIsVisible = tabViewVisible && activeTab === 'layers';
  return <>{tabViewIsVisible && <div>Layers Tab View</div>}</>;
};

export default LayersTabView;
