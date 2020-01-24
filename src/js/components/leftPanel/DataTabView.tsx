import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store';

const DataTabView = () => {
  const { activeTab, tabViewVisible } = useSelector(
    (store: RootState) => store.appState.leftPanel
  );

  const tabViewIsVisible = tabViewVisible && activeTab === 'data';
  return <>{tabViewIsVisible && <div>Data Tab View</div>}</>;
};

export default DataTabView;
