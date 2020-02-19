import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store';
import { ReactComponent as AnalysisIcon } from 'images/analysisPolyIcon.svg';
import { LayerFeatureResult } from 'js/store/mapview/types';

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

const DataTabFooter = () => {
  return (
    <div className="data-tabview-footer">
      <button onClick={() => console.log('Print Report!')}>
        Print Report{' '}
        <img
          src="https://my.gfw-mapbuilder.org/img/print-icon.svg"
          alt="print"
        />
      </button>
    </div>
  );
};

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

  const FeatureDataView = (): any => {
    const [activeLayer, setActiveLayer] = useState(activeFeatures[0].layerID);
    const activeLayerInfo = activeFeatures.find(f => f.layerID === activeLayer);

    const LayerAttributesElement = (props: {
      activeLayerInfo: any;
    }): JSX.Element => {
      const [page, setPage] = useState(0);

      function turnAttributeTablePage(forward: boolean): void {
        let newPage;
        if (forward) {
          newPage =
            page === props.activeLayerInfo.features.length - 1
              ? page
              : page + 1;
        } else {
          newPage = page === 0 ? 0 : page - 1;
        }
        setPage(newPage);
      }

      interface AttributeObject {
        [key: string]: string;
      }
      const AttributeTable = (props: AttributeObject): JSX.Element => {
        return (
          <table>
            <tbody>
              {Object.keys(props.attributes).map((a: string, i: number) => (
                <tr key={i}>
                  <td>{a}</td>
                  <td>{props.attributes[a]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      };

      //determine if next/prev buttons are enabled or disabled
      const prevBtn = page === 0 ? 'disabled' : '';
      const nextBtn =
        page === props.activeLayerInfo.features.length - 1 ? 'disabled' : '';
      return (
        <div className="layer-feature-group">
          <p>Layer Title: {props.activeLayerInfo.layerTitle}</p>
          <div className="attribute-page-buttons">
            <button
              className={`attribute-page-button ${prevBtn}`}
              onClick={() => turnAttributeTablePage(false)}
            >
              Prev
            </button>
            <button
              className={`attribute-page-button ${nextBtn}`}
              onClick={() => turnAttributeTablePage(true)}
            >
              Next
            </button>
          </div>
          <p>
            Page {page + 1} of {props.activeLayerInfo.features.length}
          </p>
          <AttributeTable
            attributes={props.activeLayerInfo.features[page].attributes}
          />
        </div>
      );
    };

    //TODO: needs to be active language aware
    return (
      <div className="data-tabview-container">
        <div>Selector</div>
        <LayerSelector
          activeFeatures={activeFeatures}
          activeLayerInfo={activeLayerInfo}
          handleLayerSelection={handleLayerSelection}
        />
        <LayerAttributesElement activeLayerInfo={activeLayerInfo} />
        <DataTabFooter />
      </div>
    );
  };

  const DataTabViewContent = () => {
    const tabViewIsVisible = tabViewVisible && activeTab === props.label;
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
