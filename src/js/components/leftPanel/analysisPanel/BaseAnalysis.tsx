/* eslint-disable react/prop-types */
/* eslint-disable no-prototype-builtins */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { createSelector } from 'reselect';
import { RootState } from 'js/store';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveFeatures } from 'js/store/mapview/actions';
import { registerGeometry } from 'js/helpers/geometryRegistration';
import VegaChart from './VegaChartContainer';
import analysisTranslations from './analysisTranslations';
import 'css/leftpanel.scss';
import { MemoRangeSlider, MemoDatePicker } from './InputComponents';
import CanopyDensityPicker from 'js/components/sharedComponents/CanopyDensityPicker';
import { markValueMap } from 'js/components/mapWidgets/widgetContent/CanopyDensityContent';

type InputTypes = 'rangeSlider' | 'tcd' | 'datepicker';
export interface UIParams {
  inputType: InputTypes;
  startParamName: string;
  combineParams: boolean;
  endParamName?: string;
  valueSeparator?: string;
  multi?: boolean;
  minDate: string; //YYYY-MM-DD
  maxDate: string; //YYYY-MM-DD
  defaultStartDate: string; //YYYY-MM-DD
  defaultEndDate: string; //YYYY-MM-DD
  bounds?: number[];
}

//Memo'd selectors
const selectAnalysisModules = createSelector(
  (state: RootState) => state.appSettings,
  settings => settings.analysisModules
);
const selectAnalysisDaterange = createSelector(
  (state: RootState) => state.appState,
  appState => appState.leftPanel.analysisDateRange
);

const AnalysisSpinner = (): React.ReactElement => (
  <h4>Geometry is Registering...</h4>
);

const BaseAnalysis = (): JSX.Element => {
  const dispatch = useDispatch();
  const [vegaSpec, setVegaSpec] = useState(null);
  //This is used for date picker analysis module

  const selectedLanguage = useSelector(
    (store: RootState) => store.appState.selectedLanguage
  );
  const canopyDensity = useSelector(
    (store: RootState) => store.appState.leftPanel.density
  );
  const analysisModules = useSelector(selectAnalysisModules);

  //Default to the first analysis
  const [selectedAnalysis, setSelectedAnalysis] = useState('default');

  const [geostoreReady, setGeostoreReady] = useState(false);

  const activeFeatures = useSelector(
    (store: RootState) => store.mapviewState.activeFeatures
  );

  const activeFeatureIndex = useSelector(
    (store: RootState) => store.mapviewState.activeFeatureIndex
  );

  const analysisDateRange = useSelector(selectAnalysisDaterange);

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
  }, [activeFeatures, activeFeatureIndex, selectedAnalysis]);

  function generateWidgetURL(
    uiParams: any,
    widgetID: string,
    geostoreID?: string
  ): string {
    let baseURL = 'https://api.resourcewatch.org/v1/widget/';
    //Add Widget ID
    baseURL = baseURL.concat(`${widgetID}?`);
    //Figure out if we have Date Range, Date Picker or Canopy Density Params that need appending
    for (const param of uiParams) {
      if (param.inputType === 'datepicker') {
        let datePickerString = `${param.startParamName}=`;
        if (param.combineParams) {
          const start = analysisDateRange[0];
          const end = analysisDateRange[1];
          datePickerString = datePickerString.concat(
            `${start}${param.valueSeparator}${end}`
          );
          baseURL = baseURL.concat(datePickerString);
        }
      } else if (param.inputType === 'rangeSlider') {
        //
      } else if (param.inputType === 'tcd') {
        const threshold = `&thresh=${markValueMap[canopyDensity]}`;
        baseURL = baseURL.concat(threshold);
        //&thresh=20
      }
    }

    //Add Geostore ID
    baseURL = baseURL.concat(`&geostore=${geostoreID}`);
    return baseURL;
  }

  function runAnalysis() {
    const mod = analysisModules.find(
      module => module.analysisId === selectedAnalysis
    );
    if (mod) {
      const activeLayer = activeFeatures[activeFeatureIndex[0]];
      const activeFeature = activeLayer.features[activeFeatureIndex[1]];
      const widgetURL = generateWidgetURL(
        mod.uiParams,
        mod.widgetId,
        activeFeature.attributes.geostoreId
      );
      fetch(widgetURL)
        .then((response: any) => response.json())
        .then((analysisMod: any) => {
          //TODO: we need to handle loading and error states
          setVegaSpec(analysisMod.data.attributes.widgetConfig);
        });
    }
  }

  const renderInputComponent = (
    props: UIParams
  ): JSX.Element | null | undefined => {
    const {
      multi,
      minDate,
      maxDate,
      defaultStartDate,
      defaultEndDate,
      bounds
    } = props;
    switch (props.inputType) {
      case 'rangeSlider':
        if (bounds) return <MemoRangeSlider yearRange={bounds} />;
        break;
      case 'tcd':
        return <CanopyDensityPicker label={false} />;
      case 'datepicker':
        return (
          <MemoDatePicker
            multi={multi}
            minDate={minDate}
            maxDate={maxDate}
            defaultStartDate={defaultStartDate}
            defaultEndDate={defaultEndDate}
          />
        );
      default:
        return null;
    }
  };

  const AnalysisInstructions = React.useMemo(
    () => (): JSX.Element | null => {
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
                      <div className="analysis-input">
                        {renderInputComponent(uiParam)}
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        );
      }
    },
    [analysisModules, selectedAnalysis, selectedLanguage]
  );

  const AnalysisOptions = (): JSX.Element => {
    function handleAnalysisOptionChange(e: any): void {
      setSelectedAnalysis(e.target.value);
      //Nulify Vega chart Result when new analysis option is selected
      setVegaSpec(null);
    }

    return (
      <select
        className="analysis-select"
        value={selectedAnalysis || 'default'}
        onChange={handleAnalysisOptionChange}
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

  const activeLayer = activeFeatures[activeFeatureIndex[0]];
  const layerTitle = activeLayer.sublayerTitle
    ? `${activeLayer.layerTitle}: ${activeLayer.sublayerTitle}`
    : activeLayer.layerTitle;

  return (
    <>
      {geostoreReady ? (
        <div className="base-analysis-content">
          <div className="layer-title">{layerTitle}</div>
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
