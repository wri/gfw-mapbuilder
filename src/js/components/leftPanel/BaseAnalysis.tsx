import * as React from 'react';
import { useState, useEffect } from 'react';
import { RootState } from 'js/store';
import { useSelector, useDispatch } from 'react-redux';
import { mapController } from 'js/controllers/mapController';
import { setActiveFeatures } from 'js/store/mapview/actions';

const AnalysisSpinner = (): React.ReactElement => <h4>Geom Registering...</h4>;

const BaseAnalysis = (props: any): JSX.Element => {
  const dispatch = useDispatch();
  const [selectedAnalysis, selectAnalysis] = useState('');

  const { activeFeatures, activeFeatureIndex } = useSelector(
    (store: RootState) => store.mapviewState
  );

  const { analysisModules } = useSelector(
    (store: RootState) => store.appSettings
  );

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

  const DefaultTabView = (props: any): JSX.Element => (
    <div className="data-tab-default-container">
      <p>Select a shape on the map</p>
    </div>
  );

  const AnalysisOptions = (props: any): JSX.Element => (
    <>
      <select
        value={selectedAnalysis}
        onChange={evt => selectAnalysis(evt.target.value)}
      >
        {analysisModules.map((module: any, i: number) => {
          return (
            <option value={module.analysisId} key={i}>
              {module.label.en}
            </option>
          );
        })}
      </select>
      {/* if we have run/slected a chjart, show that chart, ELSE, show the button beloow (either way shows the dropdown above) */}
      <button onClick={runAnalysis}>RUN ANALYSIS</button>
    </>
  );

  if (activeFeatures.length === 0) {
    return <DefaultTabView />;
  } else {
    const activeLayer = activeFeatures[activeFeatureIndex[0]];
    const activeFeature = activeLayer.features[activeFeatureIndex[1]];

    if (activeFeature.attributes.geostoreId) {
      return <AnalysisOptions />;
    }

    mapController
      .registerGeom(activeFeature)
      .then(response => response.json())
      .then(res => {
        activeFeature.attributes.geostoreId = res.data.id; //splice this out and update the copy..?
        dispatch(setActiveFeatures(activeFeatures));
      });

    return <AnalysisSpinner />;
  }
};

export default BaseAnalysis;
