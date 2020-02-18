import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store';
import { ReactComponent as AnalysisIcon } from 'images/analysisPolyIcon.svg';
import Graphic from 'esri/Graphic';

interface DataTabProps {
  key: string;
  label: string;
}

const DataTabView = (props: DataTabProps) => {
  const { activeTab, tabViewVisible } = useSelector(
    (store: RootState) => store.appState.leftPanel
  );

  const { activeFeatures } = useSelector(
    (store: RootState) => store.mapviewState
  );

  const tabViewIsVisible = tabViewVisible && activeTab === props.label;

  const DefaultTabView = () => (
    <div className="data-tab-default-container">
      <p>Select a shape on the map</p>
      <ol>
        <li>Use the layers tab to turn on a data layer</li>
        <li>Select a shape on the map</li>
      </ol>
      <AnalysisIcon width={100} height={100} />
    </div>
  );

  interface FeatureDataProps {
    featureGroup: Graphic[];
  }
  const FeatureDataView = (): any => {
    const FeatureGroupElement = (props: any) => {
      const [page, setPage] = useState(0);
      const groupTitle = props.layerFeatureGroup.layerTitle;
      const attributes = props.layerFeatureGroup.features.map(
        (group: any) => group.attributes
      );

      function turnPage(): void {
        if (page !== attributes.length - 1) {
          setPage(page + 1);
        }
      }
      return (
        <>
          <p>Layer Title: {groupTitle}</p>
          <p>Attributes:</p>
          <p>{JSON.stringify(attributes[page])}</p>
          <p>
            Page {page + 1} of {attributes.length}
          </p>
          <button onClick={turnPage}>next page</button>
        </>
      );
    };
    return activeFeatures.map((layerFeatureGroup, i) => (
      <div key={i}>
        <FeatureGroupElement layerFeatureGroup={layerFeatureGroup} />
      </div>
    ));
  };

  const DataTabViewContent = () => {
    if (!tabViewIsVisible) {
      return null;
    } else {
      return activeFeatures.length === 0 ? (
        <DefaultTabView />
      ) : (
        <FeatureDataView />
      );
    }
  };

  return <DataTabViewContent />;
};

export default DataTabView;
