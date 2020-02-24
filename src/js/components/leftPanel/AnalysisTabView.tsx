import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store';

interface Props {
  key: string;
  label: string;
}

interface TabProps {
  key: string;
  label: string;
}

const DefaultTabView = (): JSX.Element => (
  <div className="data-tab-default-container">
    <p>Select a shape on the map</p>
  </div>
);

const AnalysisComp = (): JSX.Element => (
  <div className="data-tab-default-container">
    <p>Select a shape on the map</p>
  </div>
);

const AnalysisTabView = (props: Props) => {
  const { activeTab, tabViewVisible } = useSelector(
    (store: RootState) => store.appState.leftPanel
  );

  const { activeFeatures, activeFeatureIndex } = useSelector(
    (store: RootState) => store.mapviewState
  );

  console.log('activeFeatures', activeFeatures);
  console.log('activeFeatureIndex', activeFeatureIndex);
  //activeFeatures[activeLayerIndex].features
  //const activeLayer = activeFeatures[activeFeatureIndex[0]].layerID;

  const tabViewIsVisible = tabViewVisible && activeTab === props.label;
  console.log('tabViewIsVisible', tabViewIsVisible);
  return tabViewIsVisible ? DefaultTabView : <RegisterSpin />;
};

export default AnalysisTabView;
