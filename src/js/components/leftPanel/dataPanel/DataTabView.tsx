import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { setActiveFeatureIndex, setActiveFeatures, setDocuments } from '../../../store/mapview/actions';
import { selectActiveTab, setAnalysisFeatureList } from '../../../store/appState/actions';
import DataTabFooter from './DataTabFooter';
import DefaultTabView from './DefaultTabView';
import LayerSelector from './LayerSelector';
import { mapController } from '../../../controllers/mapController';
import { LayerFeatureResult } from '../../../store/mapview/types';
import { getDocuments } from '../../../helpers/mapController/documentsQuery';
import { CloseIcon } from '../../../../images/closeIcon';
import BaseButton from '../../ui/BaseButton';
import styled from 'styled-components';
import { addToMultiPolygonLayer, clearGraphics, clearUserGraphics } from '../../../helpers/MapGraphics';
import { handleCustomColorTheme } from '../../../../utils';
import {
  generateDefaultFieldNames,
  getLayerPopupIfAvailable,
  setAttributesToLocalStorage,
  updateContentProperties,
} from './helpers/index';
import RenderPopupContent from './RenderPopupContent';

export interface AttributeObject {
  [key: string]: string;
}

interface DataTabProps {
  key: string;
  label: string;
}
//Constructs layer tile based on sublayer existence
function generateLayerTitle(activeLayerInfo: any): string {
  let result;
  const { layerTitle, sublayerTitle, displayField } = activeLayerInfo;
  const displayName = activeLayerInfo.features[0]?.attributes[displayField];
  if (sublayerTitle) {
    result = `${sublayerTitle}: ${displayName}`;
  } else {
    result = `${layerTitle}`;
  }
  return result;
}

const DataTabView = (props: DataTabProps): JSX.Element => {
  const dispatch = useDispatch();
  const [layerTitle, setLayerTitle] = React.useState('');
  const activeTab = useSelector((store: RootState) => store.appState.leftPanel.activeTab);
  const tabViewVisible = useSelector((store: RootState) => store.appState.leftPanel.tabViewVisible);
  const activeFeatures = useSelector((store: RootState) => store.mapviewState.activeFeatures);
  const activeFeatureIndex = useSelector((store: RootState) => store.mapviewState.activeFeatureIndex);
  const customColorTheme = useSelector((store: RootState) => store.appSettings.customColorTheme);
  const multiPolygonSelection = useSelector((store: RootState) => store.appState.multiPolygonSelectionMode);
  const analysisFeatureList = useSelector((store: RootState) => store.appState.analysisFeatureList);
  const activeMultiInput = useSelector((store: RootState) => store.appState.activeMultiInput);
  const selectedLanguage = useSelector((state: RootState) => state.appState.selectedLanguage);

  const themeColor = handleCustomColorTheme(customColorTheme);
  const leftPanel = useSelector((store: RootState) => store.appSettings.layerPanel);

  const FeatureDataView = (): JSX.Element => {
    const activeLayerInfo = activeFeatures[activeFeatureIndex[0]];
    //short circuit component in case no feature is found
    if (!activeLayerInfo) return <></>;

    const getLayerPopup = getLayerPopupIfAvailable(leftPanel, activeLayerInfo.layerID);
    const newFields = updateContentProperties(getLayerPopup, selectedLanguage);

    //If layer has sublayers, we are using sublayerID to compare, otherwise it is layerID
    function findLayer(f: LayerFeatureResult): boolean {
      const layerProp = f.sublayerID ? 'sublayerID' : 'layerID';
      const activeLayer = f.sublayerID ? f.sublayerID : f.layerID;
      return String(activeLayer) === String(activeLayerInfo[layerProp]);
    }

    const activeLayerIndex = activeFeatures.findIndex(findLayer);
    if (activeLayerInfo && activeFeatures[activeLayerIndex]) {
      const activeFeature = new Array(activeFeatures[activeLayerIndex].features[activeFeatureIndex[1]]);
      if (
        activeLayerInfo.layerID !== 'user_features' &&
        activeLayerInfo.layerID !== 'upload_file_features' &&
        activeLayerInfo.layerID !== 'multi_poly_graphics' &&
        activeLayerInfo.layerID !== 'overlap-feature-layer'
      ) {
        mapController.drawGraphic(activeFeature);
      }
    }

    const LayerAttributesElement = (props: { activeLayerInfo: any; activeLayerIndex: number }): JSX.Element => {
      const page = activeFeatureIndex[1];

      async function turnAttributeTablePage(forward: boolean): Promise<void> {
        const newPage = forward ? page + 1 : page - 1;
        const activeFeature = new Array(activeFeatures[activeLayerIndex].features[newPage]);
        if (activeLayerInfo.layerID !== 'user_features' && activeLayerInfo.layerID !== 'upload_file_features') {
          await mapController.drawGraphic(activeFeature);
        } else {
          mapController.updateActivePolyGraphic(activeFeature);
        }

        dispatch(setActiveFeatureIndex([activeLayerIndex, newPage]));
      }

      const AttributeTable = (props: AttributeObject): JSX.Element => {
        //If we have fieldNames on activeLayerInfo we use it to map over attributes, otherwise, we use all attributes available
        const { attributes } = props;
        const fieldNames = activeLayerInfo?.fieldNames;

        setAttributesToLocalStorage({ layerTitle, attributes, fieldNames, newFields });
        const defaultFieldNames = generateDefaultFieldNames(attributes);

        return (
          <table className="table-container" cellPadding={0} cellSpacing={0}>
            <tbody>
              {/* if hosted layer has popup properties available then display labels defined in popup */}
              {newFields !== null && <RenderPopupContent attributes={attributes} fieldNames={newFields} />}
              {/* if hosted layer has no popup properties available then display labels defined in fieldNames */}
              {fieldNames && newFields === null && (
                <RenderPopupContent attributes={attributes} fieldNames={fieldNames} />
              )}
              {/* render deafult properties if none of the avobe is true */}

              {!fieldNames && newFields === null && (
                <RenderPopupContent attributes={attributes} fieldNames={defaultFieldNames} />
              )}
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
          //clean out graphics layer from all leftover highligh graphics
          mapController.removeAllGraphics('active-feature-layer');
        } else {
          //remove only one feature and keep everything else intact
          oldActiveFeatures[activeLayerIndex].features.splice(activeFeatureIndex[1], 1);
          //update redux
          dispatch(setActiveFeatures(oldActiveFeatures));
          //new active page depends if we are on first page or not, if we are on first page, we keep same page, if not we decrement by one
          const newActivePage = activeFeatureIndex[1] === 0 ? 0 : activeFeatureIndex[1] - 1;
          dispatch(setActiveFeatureIndex([activeLayerIndex, newActivePage]));
        }
      }

      function handleLayerSwitch(id: string): void {
        //If layer has sublayers, we are using sublayerID to compare, otherwise it is layerID
        function findLayer(f: LayerFeatureResult): boolean {
          const activeLayer = f.sublayerID ? f.sublayerID : f.layerID;
          return String(activeLayer) === String(id);
        }
        const newLayerIndex: number = activeFeatures.findIndex(findLayer);
        dispatch(setActiveFeatureIndex([newLayerIndex, 0]));
      }

      //determine if next/prev buttons are enabled or disabled
      const enabledButtonCustomStyle = {
        backgroundColor: themeColor,
        color: '#FFF',
      };
      const disabledButtonCustomStyle = {
        backgroundColor: 'rgb(238, 238, 238)',
        color: '#555',
      };

      const prevBtn = page === 0 ? disabledButtonCustomStyle : enabledButtonCustomStyle;
      const nextBtn =
        page === props.activeLayerInfo.features.length - 1 ? disabledButtonCustomStyle : enabledButtonCustomStyle;

      React.useEffect(() => {
        //Attempt to fetch documents associated with the selected feature, this
        //useEffect should used only for that purpose and should dispatch
        //results to the redux so documents tab can be appropriately styled
        const selectedFeatureInfo = activeFeatures[activeFeatureIndex[0]];

        const { sublayerID, layerID } = selectedFeatureInfo;

        setLayerTitle(generateLayerTitle(props.activeLayerInfo));

        const selectedFeature = selectedFeatureInfo.features[activeFeatureIndex[1]];

        const urlProperties = {
          sublayerID,
          specificFeatureID: selectedFeature.objectid,
          layerID,
        };

        getDocuments(urlProperties)
          .then((res) => {
            dispatch(setDocuments(res));
          })
          .catch(() => dispatch(setDocuments(null)));
      }, [activeFeatures, activeFeatureIndex]);

      const TopWrap = styled.div`
        display: flex;
        align-items: center;
      `;

      const AddToAnalysisButton = styled(BaseButton)`
        margin: 0 0 0 5px;
        background-color: ${themeColor};
        color: white;
        font-size: 0.7rem;
        min-height: 15px;
        padding: 5px 0px 5px 0px;
        margin-left: 5px;
        width: 150px;
      `;

      return (
        <div className="layer-feature-group">
          <div className="layer-control-container">
            <div className="layer-control">
              <LayerSelector
                generateLayerTitle={generateLayerTitle}
                activeFeatures={activeFeatures}
                activeLayerInfo={activeLayerInfo}
                handleLayerSelection={(layerID: string): void => handleLayerSwitch(layerID)}
              />
              <div className="attribute-page-buttons">
                <button
                  className={`attribute-page-button ${prevBtn}`}
                  style={prevBtn}
                  disabled={page === 0}
                  onClick={() => turnAttributeTablePage(false)}
                >
                  Prev
                </button>
                <button
                  className={`attribute-page-button ${nextBtn}`}
                  style={nextBtn}
                  disabled={page === props.activeLayerInfo.features.length - 1}
                  onClick={() => turnAttributeTablePage(true)}
                >
                  Next
                </button>
              </div>
            </div>
            <div className="remove-attribute-button">
              <button id="remove-attr-btn" onClick={removeAttribute}>
                <CloseIcon width={20} height={20} />
              </button>
            </div>
          </div>
          <TopWrap>
            {multiPolygonSelection && !(analysisFeatureList[0] && analysisFeatureList[1]) && (
              <AddToAnalysisButton
                customColorTheme={themeColor}
                onClick={() => {
                  clearGraphics();
                  clearUserGraphics();

                  const activeFeature = activeFeatures[activeFeatureIndex[0]].features[activeFeatureIndex[1]];
                  const formatFeatures: LayerFeatureResult = {
                    layerID: 'multi_poly_graphics',
                    featureID: `multi_poly_graphics-${activeFeature.objectid}`,
                    layerTitle: 'Multi Polygon Features',
                    features: [activeFeature],
                    fieldNames: null,
                  };
                  const oldList = [...analysisFeatureList];
                  oldList[activeMultiInput] = formatFeatures;
                  dispatch(setAnalysisFeatureList(oldList));
                  addToMultiPolygonLayer(activeFeature);
                  dispatch(selectActiveTab('analysis'));
                }}
              >
                add to analysis
              </AddToAnalysisButton>
            )}
            <div className="page-numbers">
              {page + 1} / {props.activeLayerInfo.features.length}
            </div>
          </TopWrap>
          <div className="layer-title">{layerTitle}</div>
          <hr />
          <AttributeTable attributes={props.activeLayerInfo.features[page].attributes} />
        </div>
      );
    };

    //TODO: needs to be active language aware!
    return (
      <div className="data-tabview-container">
        <LayerAttributesElement activeLayerIndex={activeLayerIndex} activeLayerInfo={activeLayerInfo} />
        <DataTabFooter />
      </div>
    );
  };

  const tabViewIsVisible = tabViewVisible && activeTab === props.label;

  return (
    <div className={tabViewIsVisible ? 'tabview-container' : 'hide tabview-container'}>
      {activeFeatures.length === 0 ? <DefaultTabView customColorTheme={themeColor} /> : <FeatureDataView />}
    </div>
  );
};

export default DataTabView;
