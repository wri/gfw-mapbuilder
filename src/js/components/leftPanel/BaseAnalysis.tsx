/* eslint-disable no-prototype-builtins */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { RootState } from 'js/store';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveFeatures } from 'js/store/mapview/actions';
import { registerGeometry } from 'js/helpers/geometryRegistration';

const AnalysisSpinner = (): React.ReactElement => (
  <h4>Geometry is Registering...</h4>
);

//TODO: This should we swapped for already existing work
const DefaultTabView = (): JSX.Element => (
  <div className="data-tab-default-container">
    <p>Select a shape on the map</p>
  </div>
);

const BaseAnalysis = (): JSX.Element => {
  const dispatch = useDispatch();

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
    setGeostoreReady(false);
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
          activeFeature.attributes.geostoreId = res.data.id; //splice this out and update the copy..?
          dispatch(setActiveFeatures(activeFeatures));
          setGeostoreReady(true);
        });
    }
  }, [activeFeatures, dispatch, activeFeatureIndex]);

  function runAnalysis() {
    console.log('runAnalysis', selectedAnalysis);
    const mod = analysisModules.find(
      module => module.analysisId === selectedAnalysis
    );
    if (mod) {
      const activeLayer = activeFeatures[activeFeatureIndex[0]];
      const activeFeature = activeLayer.features[activeFeatureIndex[1]];
      fetch(
        `https://api.resourcewatch.org/v1/widget/${mod.widgetId}?${activeFeature.attributes.geostoreId}`
      )
        .then((response: any) => response.json())
        .then((analysisMod: any) => {
          console.log('analysisMod', analysisMod);
          //TODO: This is where we stopped!
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
          <button onClick={runAnalysis}>RUN ANALYSIS</button>
        </div>
      ) : (
        <AnalysisSpinner />
      )}
    </>
  );
};

export default BaseAnalysis;
