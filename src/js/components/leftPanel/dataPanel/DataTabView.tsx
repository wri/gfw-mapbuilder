import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'js/store';
import {
  setActiveFeatureIndex,
  setActiveFeatures
} from 'js/store/mapview/actions';
import DataTabFooter from './DataTabFooter';
import DefaultTabView from './DefaultTabView';
import LayerSelector from './LayerSelector';
import { ReactComponent as CloseAttribute } from '../../../../images/closeIcon.svg';
import { mapController } from 'js/controllers/mapController';

interface DataTabProps {
  key: string;
  label: string;
}
const DataTabView = (props: DataTabProps): JSX.Element => {
  const dispatch = useDispatch();
  const { activeTab, tabViewVisible } = useSelector(
    (store: RootState) => store.appState.leftPanel
  );

  const { activeFeatures, activeFeatureIndex } = useSelector(
    (store: RootState) => store.mapviewState
  );

  const FeatureDataView = (): any => {
    const activeLayer = activeFeatures[activeFeatureIndex[0]].layerID;
    const activeLayerInfo = activeFeatures.find(f => f.layerID === activeLayer);
    const activeLayerIndex = activeFeatures.findIndex(
      f => f.layerID === activeLayer
    );
    if (activeLayerInfo) {
      mapController.drawGraphic(
        activeFeatures[activeLayerIndex].features[activeFeatureIndex[1]]
          .geometry
      );
    }
    const LayerAttributesElement = (props: {
      activeLayerInfo: any;
      activeLayerIndex: number;
    }): JSX.Element => {
      const page = activeFeatureIndex[1];

      function turnAttributeTablePage(forward: boolean): void {
        const newPage = forward ? page + 1 : page - 1;
        dispatch(setActiveFeatureIndex([activeLayerIndex, newPage]));
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

      function removeAttribute(): void {
        const oldActiveFeatures = [...activeFeatures];
        // if we are removing last feature from the layer group, remove the whole layer
        if (activeFeatures[activeLayerIndex].features.length === 1) {
          //remove the whole layer
          oldActiveFeatures.splice(activeLayerIndex, 1);
          //update redux store with new features
          dispatch(setActiveFeatures(oldActiveFeatures));
          //update active layerindex as the old one does not exit anymore
          dispatch(setActiveFeatureIndex([0, 0]));
        } else {
          //remove only one feature and keep everything else intact
          oldActiveFeatures[activeLayerIndex].features.splice(
            activeFeatureIndex[1],
            1
          );
          //update redux
          dispatch(setActiveFeatures(oldActiveFeatures));
          //new active page depends if we are on first page or not, if we are on first page, we keep same page, if not we decrement by one
          const newActivePage =
            activeFeatureIndex[1] === 0 ? 0 : activeFeatureIndex[1] - 1;
          dispatch(setActiveFeatureIndex([activeLayerIndex, newActivePage]));
        }
      }

      function handleLayerSwitch(layerID: string): void {
        //Upon layer selection switch, we update the index of the activefeature's layer and zero out the feature itself
        const newLayerIndex = activeFeatures.findIndex(
          f => f.layerID === layerID
        );
        dispatch(setActiveFeatureIndex([newLayerIndex, 0]));
      }

      //determine if next/prev buttons are enabled or disabled
      const prevBtn = page === 0 ? 'disabled' : '';
      const nextBtn =
        page === props.activeLayerInfo.features.length - 1 ? 'disabled' : '';
      return (
        <div className="layer-feature-group">
          <div className="layer-control-container">
            <div className="remove-attribute-button">
              <button id="remove-attr-btn" onClick={removeAttribute}>
                <CloseAttribute width={25} height={25} />
              </button>
            </div>
            <div className="layer-control">
              <LayerSelector
                activeFeatures={activeFeatures}
                activeLayerInfo={activeLayerInfo}
                handleLayerSelection={(layerID: string): void =>
                  handleLayerSwitch(layerID)
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
        <LayerAttributesElement
          activeLayerIndex={activeLayerIndex}
          activeLayerInfo={activeLayerInfo}
        />
        <DataTabFooter />
      </div>
    );
  };

  const tabViewIsVisible = tabViewVisible && activeTab === props.label;

  return (
    <div
      className={
        tabViewIsVisible ? 'tabview-container' : 'hide tabview-container'
      }
    >
      {activeFeatures.length === 0 ? <DefaultTabView /> : <FeatureDataView />}
    </div>
  );
};

export default DataTabView;
