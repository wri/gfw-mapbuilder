import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store';

interface Props {
  key: string;
  label: string;
}
const AnalysisTabView = (props: Props) => {
  const { activeTab, tabViewVisible } = useSelector(
    (store: RootState) => store.appState.leftPanel
  );

  const { activeFeatures } = useSelector(
    (store: RootState) => store.mapviewState
  );

  console.log('activeFeatures', activeFeatures);

  const tabViewIsVisible = tabViewVisible && activeTab === props.label;
  console.log('tabViewIsVisible', tabViewIsVisible);
  return <>{tabViewIsVisible && <div>Analysis Tab View</div>}</>;
};

export default AnalysisTabView;
