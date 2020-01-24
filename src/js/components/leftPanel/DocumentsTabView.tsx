import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store';

const DocumentsTabView = () => {
  const { activeTab, tabViewVisible } = useSelector(
    (store: RootState) => store.appState.leftPanel
  );

  const tabViewIsVisible = tabViewVisible && activeTab === 'documents';
  return <>{tabViewIsVisible && <div>Documents Tab View</div>}</>;
};

export default DocumentsTabView;
