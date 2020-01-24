import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store';

const AnalysisTabView = () => {
  const { activeTab, tabViewVisible } = useSelector(
    (store: RootState) => store.appState.leftPanel
  );

  const tabViewIsVisible = tabViewVisible && activeTab === 'analysis';
  return <>{tabViewIsVisible && <div>Analysis Tab View</div>}</>;
};

export default AnalysisTabView;
