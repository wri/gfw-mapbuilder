/* eslint-disable no-prototype-builtins */
import * as React from 'react';
import { useState, useEffect } from 'react';

import { mapController } from 'js/controllers/mapController';

import { RootState } from 'js/store';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveFeatures } from 'js/store/mapview/actions';
import { selectActiveTab, toggleTabviewPanel } from 'js/store/appState/actions';
import { registerGeometry } from 'js/helpers/geometryRegistration';
import VegaChart from './VegaChartContainer';
import analysisTranslations from './analysisTranslations';
import 'css/leftpanel.scss';

const AnalysisSpinner = (): React.ReactElement => (
  <h4>Geometry is Registering...</h4>
);

const BaseAnalysis = (): JSX.Element => {
  const dispatch = useDispatch();
  const [vegaSpec, setVegaSpec] = useState(null);
  const [renderEditButton, setRenderEditButton] = useState(false);

  const { selectedLanguage } = useSelector(
    (store: RootState) => store.appState
  );

  const { analysisModules } = useSelector(
    (store: RootState) => store.appSettings
  );

  //Default to the first analysis
  const [selectedAnalysis, setSelectedAnalysis] = useState('default');

  const [geostoreReady, setGeostoreReady] = useState(false);

  const { activeFeatures, activeFeatureIndex } = useSelector(
    (store: RootState) => store.mapviewState
  );

  useEffect(() => {
    const activeLayer = activeFeatures[activeFeatureIndex[0]];
    const activeFeature = activeLayer?.features[activeFeatureIndex[1]];
    //On Base analysis tab we need to fire registration to geostore for the selected feature or the drawn/uploaded shape
    //Determine if we have the geostore already or we need to register it
    if (!activeLayer || activeFeature.attributes.hasOwnProperty('geostoreId')) {
      setGeostoreReady(true);
      return;
    } else {
      registerGeometry(activeFeature)
        .then(response => response.json())
        .then(res => {
          const oldActiveFeatures = [...activeFeatures];
          const activeLayer = oldActiveFeatures[activeFeatureIndex[0]];
          const activeFeature = activeLayer?.features[activeFeatureIndex[1]];
          activeFeature.attributes.geostoreId = res.data.id; //splice this out and update the copy..?
          dispatch(setActiveFeatures(oldActiveFeatures));
          setGeostoreReady(true);
        });
    }
  }, [activeFeatures, activeFeatureIndex]);

  function runAnalysis() {
    const mod = analysisModules.find(
      module => module.analysisId === selectedAnalysis
    );
    if (mod) {
      const activeLayer = activeFeatures[activeFeatureIndex[0]];
      const activeFeature = activeLayer.features[activeFeatureIndex[1]];
      fetch(
        `https://api.resourcewatch.org/v1/widget/${mod.widgetId}?geostore=${activeFeature.attributes.geostoreId}`
      )
        .then((response: any) => response.json())
        .then((analysisMod: any) => {
          //TODO: we need to handle loading and error states
          setVegaSpec(analysisMod.data.attributes.widgetConfig);
        });
    }
  }

  const AnalysisInstructions = (): JSX.Element | null => {
    const currentAnalysis = analysisModules.find(
      module => module.analysisId === selectedAnalysis
    );
    if (selectedAnalysis === 'default') {
      return (
        <>
          <div className="analysis-text">
            <p style={{ fontWeight: 'bold' }}>
              {analysisTranslations.analysisNotSelected[selectedLanguage][0]}
            </p>
            <p>
              {analysisTranslations.analysisNotSelected[selectedLanguage][1]}
            </p>
          </div>
          <div className="chart-icon"></div>
        </>
      );
    } else {
      return (
        <>
          <p style={{ fontWeight: 'bold', fontSize: '16px' }}>
            {currentAnalysis?.title[selectedLanguage]}
          </p>
          <p style={{ fontSize: '12px' }}>
            {currentAnalysis?.description[selectedLanguage]}
          </p>
          <div>
            {currentAnalysis?.uiParams &&
              currentAnalysis?.uiParams !== 'none' &&
              currentAnalysis?.uiParams.map((uiParam: any, i: number) => {
                return (
                  <div className="ui-analysis-wrapper" key={i}>
                    <div className="ui-description">
                      <div className="number">
                        <p>{i + 1}</p>
                      </div>
                      <p>{uiParam.label[selectedLanguage]}</p>
                    </div>
                    <p>{uiParam.inputType}</p>
                  </div>
                );
              })}
          </div>
        </>
      );
    }
  };

  const AnalysisOptions = (): JSX.Element => {
    return (
      <select
        className="analysis-select"
        value={selectedAnalysis || 'default'}
        onChange={e => setSelectedAnalysis(e.target.value)}
      >
        <option value="default">
          {analysisTranslations.defaultAnalysisLabel[selectedLanguage]}
        </option>
        {analysisModules.map((module: any, i: number) => {
          return (
            <option value={module.analysisId} key={i}>
              {module.label[selectedLanguage]}
            </option>
          );
        })}
      </select>
    );
  };

  const setActiveButton = (): void => {
    if (renderEditButton) {
      setRenderEditButton(false);
      mapController.updateSketchVM();
    } else {
      mapController.completeSketchVM();
      setRenderEditButton(true);
    }
  };

  const setDelete = (): void => {
    mapController.deleteSketchVM();
    dispatch(setActiveFeatures([]));
  };

  const activeLayer = activeFeatures[activeFeatureIndex[0]];

  const returnLayerTitle =
    activeLayer && activeLayer.layerTitle ? activeLayer.layerTitle : null;

  const title =
    activeLayer && activeLayer.sublayerTitle
      ? `${activeLayer.layerTitle}: ${activeLayer.sublayerTitle}`
      : returnLayerTitle;

  return (
    <>
      {geostoreReady ? (
        <div className="base-analysis-content">
          <div className="layer-title">
            {title === null ? 'User Drawn Feature' : title}
          </div>
          {renderEditButton ? (
            <button onClick={(): void => setActiveButton()}>Edit</button>
          ) : (
            <button onClick={(): void => setActiveButton()}>Save</button>
          )}
          <button onClick={(): void => setDelete()}>Delete</button>
          <AnalysisOptions />
          {!vegaSpec && (
            <div className="analysis-instructions">
              <AnalysisInstructions />
            </div>
          )}
          {vegaSpec && <VegaChart spec={vegaSpec} />}
          <button
            disabled={selectedAnalysis === 'default'}
            className={
              selectedAnalysis === 'default'
                ? 'orange-button disabled'
                : 'orange-button'
            }
            onClick={runAnalysis}
          >
            {analysisTranslations.runAnalysisButton[selectedLanguage]}
          </button>
        </div>
      ) : (
        <AnalysisSpinner />
      )}
    </>
  );
};

export default BaseAnalysis;
