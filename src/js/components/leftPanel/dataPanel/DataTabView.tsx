import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store';
import DataTabFooter from './DataTabFooter';
import DefaultTabView from './DefaultTabView';
import LayerSelector from './LayerSelector';

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
        const newPage = forward ? page + 1 : page - 1;
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
          <div className="layer-controls">
            <LayerSelector
              activeFeatures={activeFeatures}
              activeLayerInfo={activeLayerInfo}
              handleLayerSelection={(layerID: string): void =>
                setActiveLayer(layerID)
              }
            />
            <div className="attribute-page-buttons">
              <button
                className={`attribute-page-button ${prevBtn}`}
                disabled={page === 0}
                onClick={() => turnAttributeTablePage(false)}
              >
                Prev
              </button>
              <button
                className={`attribute-page-button ${nextBtn}`}
                disabled={page === props.activeLayerInfo.features.length - 1}
                onClick={() => turnAttributeTablePage(true)}
              >
                Next
              </button>
            </div>
          </div>
          <div className="page-numbers">
            {page + 1} / {props.activeLayerInfo.features.length}
          </div>
          <div className="layer-title">{props.activeLayerInfo.layerTitle}</div>
          <AttributeTable
            attributes={props.activeLayerInfo.features[page].attributes}
          />
        </div>
      );
    };

    //TODO: needs to be active language aware
    return (
      <div className="data-tabview-container">
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
