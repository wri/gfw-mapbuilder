/* eslint-disable no-prototype-builtins */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { RootState } from 'js/store';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveFeatures } from 'js/store/mapview/actions';
import { registerGeometry } from 'js/helpers/geometryRegistration';
import VegaChart from './VegaChartContainer';

const AnalysisSpinner = (): React.ReactElement => (
  <h4>Geometry is Registering...</h4>
);

const BaseAnalysis = (): JSX.Element => {
  const dispatch = useDispatch();
  const [vegaSpec, setVegaSpec] = useState(null);
  const { analysisModules } = useSelector(
    (store: RootState) => store.appSettings
  );

  //Default to the first analysis
  const [selectedAnalysis, setSelectedAnalysis] = useState(
    analysisModules[0].analysisId
  );

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
      console.log(
        'we have no features or it already has geostoreID, do nothing'
      );
      setGeostoreReady(true);
      return;
    } else {
      console.log('feature does not exist, we need to register it');
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
    console.log('runAnalysis', selectedAnalysis);
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
          console.log(activeFeature.attributes.geostoreId);
          console.log('analysisMod', analysisMod);
          console.log(analysisMod.data.widgetConfig);
          //TODO: we need to handle loading and error states
          setVegaSpec(analysisMod.data.attributes.widgetConfig);
        });
    }
  }

  const AnalysisOptions = (): JSX.Element => (
    <select
      value={selectedAnalysis}
      onChange={e => setSelectedAnalysis(e.target.value)}
    >
      {analysisModules.map((module: any, i: number) => {
        return (
          <option value={module.analysisId} key={i}>
            {module.label.en}
          </option>
        );
      })}
    </select>
  );

  return (
    <>
      {geostoreReady ? (
        <div>
          <AnalysisOptions />
          {vegaSpec && <VegaChart spec={vegaSpec} />}
          <button onClick={runAnalysis}>RUN ANALYSIS</button>
        </div>
      ) : (
        <AnalysisSpinner />
      )}
    </>
  );
};

export default BaseAnalysis;
