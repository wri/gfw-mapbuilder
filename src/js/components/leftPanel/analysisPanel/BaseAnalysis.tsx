/* eslint-disable react/prop-types */
/* eslint-disable no-prototype-builtins */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { createSelector } from 'reselect';

import { mapController } from 'js/controllers/mapController';

import { RootState } from 'js/store';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveFeatures } from 'js/store/mapview/actions';
import { registerGeometry } from 'js/helpers/geometryRegistration';
import VegaChart from './VegaChartContainer';
import analysisTranslations from './analysisTranslations';
import 'css/leftpanel.scss';
import { RangeSlider, MemoDatePicker } from './InputComponents';
import CanopyDensityPicker from 'js/components/sharedComponents/CanopyDensityPicker';

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
}

//Memo'd selectors
const selectAnalysisModules = createSelector(
  (state: RootState) => state.appSettings,
  settings => settings.analysisModules
);

const AnalysisSpinner = (): React.ReactElement => (
  <h4>Geometry is Registering...</h4>
);

const getTodayDate = (): string => {
  const getTodayDate = new Date().toISOString().split('T')[0];
  return getTodayDate;
};

const BaseAnalysis = (): JSX.Element => {
  const dispatch = useDispatch();
  const [vegaSpec, setVegaSpec] = useState(null);
  const [renderEditButton, setRenderEditButton] = useState(false);
  //This is used for date picker analysis module
  const [startDate, setStartDate] = useState(getTodayDate());
  const [endDate, setEndDate] = useState(getTodayDate());

  const selectedLanguage = useSelector(
    (store: RootState) => store.appState.selectedLanguage
  );

  // const { analysisModules } = useSelector(
  //   (store: RootState) => store.appSettings
  // );
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

  function generateWidgetURL(
    uiParams: any,
    widgetID: string,
    geostoreID?: string
  ): string {
    let baseURL = 'https://api.resourcewatch.org/v1/widget/';
    //Add Widget ID
    baseURL = baseURL.concat(widgetID);
    //Figure out if we have Date Range, Date Picker or Canopy Density Params that need appending
    debugger;
    for (const param of uiParams) {
      if (param.inputType === 'datepicker') {
        const todayDate = new Date().toISOString().split('T')[0];
        let datePickerString = `?${param.startParamName}=`;
        if (param.combineParams) {
          console.log(param.combineParams);
          console.log(param.valueSeparator);
          console.log(startDate);
          console.log(endDate);
          const start =
            startDate !== ''
              ? startDate
              : param?.defaultStartDate
              ? param.defaultStartDate
              : todayDate;
          const end =
            endDate !== ''
              ? endDate
              : param?.defaultEndDate
              ? param.defaultEndDate
              : todayDate;
          datePickerString = datePickerString.concat(
            `${start}${param.valueSeparator}${end}`
          );
          baseURL = baseURL.concat(datePickerString);
        }
      } else if (param.inputType === 'rangeSlider') {
        //
      } else if (param.inputType === 'tcd') console.log(param);
    }

    //Add Geostore ID
    baseURL = baseURL.concat(`&geostore=${geostoreID}`);
    console.log(baseURL);
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

  // function handleDateChange(date: string, type: 'start' | 'end'): void {
  //   console.log('setting date');
  //   if (type === 'start') {
  //     setStartDate(date);
  //   }
  //   if (type === 'end') {
  //     setEndDate(date);
  //   }
  // }

  // function testHandler(val: any): void {
  //   setStartDate(val);
  //   // console.log(val);
  // }

  const renderInputComponent = (props: UIParams): JSX.Element | null => {
    const { multi, minDate, maxDate } = props;
    switch (props.inputType) {
      case 'rangeSlider':
        return <RangeSlider />;
      case 'tcd':
        return <CanopyDensityPicker label={false} />;
      case 'datepicker':
        return (
          <MemoDatePicker multi={multi} minDate={minDate} maxDate={maxDate} />
        );
      default:
        return null;
    }
  };

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

  // const setActiveButton = (): void => {
  //   if (renderEditButton) {
  //     setRenderEditButton(false);
  //     mapController.updateSketchVM();
  //   } else {
  //     mapController.completeSketchVM();
  //     setRenderEditButton(true);
  //   }
  // };

  // const setDelete = (): void => {
  //   mapController.deleteSketchVM();
  //   dispatch(setActiveFeatures([]));
  // };

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
