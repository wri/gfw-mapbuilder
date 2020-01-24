import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store';

const InfoTabView = () => {
  const { activeTab, tabViewVisible } = useSelector(
    (store: RootState) => store.appState.leftPanel
  );

  const tabViewIsVisible = tabViewVisible && activeTab === 'info';
  return <>{tabViewIsVisible && <div>Narrative Tab View</div>}</>;
};

export default InfoTabView;
