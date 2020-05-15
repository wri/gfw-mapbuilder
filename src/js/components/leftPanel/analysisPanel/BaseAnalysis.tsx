/* eslint-disable no-prototype-builtins */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';

import { RootState } from 'js/store';
import {
  setActiveFeatures,
  setUserCoordinates
} from 'js/store/mapview/actions';
import { setRenderPopup } from 'js/store/appState/actions';

import { registerGeometry } from 'js/helpers/geometryRegistration';

import VegaChart from './VegaChartContainer';
import analysisTranslations from './analysisTranslations';
import { MemoRangeSlider, MemoDatePicker } from './InputComponents';
import CanopyDensityPicker from 'js/components/sharedComponents/CanopyDensityPicker';
import { markValueMap } from 'js/components/mapWidgets/widgetContent/CanopyDensityContent';
import { ReactComponent as DownloadIcon } from '../../../../images/downloadIcon.svg';
import { DownloadOptions } from 'js/components/sharedComponents/DownloadOptions';
import Loader from 'js/components/sharedComponents/Loader';
import { mapController } from 'js/controllers/mapController';
import DataTabFooter from '../dataPanel/DataTabFooter';

import 'css/leftpanel.scss';

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

const BaseAnalysis = (): JSX.Element => {
  const dispatch = useDispatch();
  const [vegaSpec, setVegaSpec] = useState(null);
  const [chartDownloadURL, setChartDownloadURL] = useState('');
  const [chartDownTitle, setChartDownTitle] = useState('');
  const [base64ChartURL, setBase64ChartURL] = useState('');
  const [downloadOptionsVisible, setDownloadOptionsVisible] = useState(false);
  const [renderEditButton, setRenderEditButton] = useState(true);

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

  const analysisYearRange = useSelector(
    (store: RootState) => store.appState.leftPanel.analysisYearRange
  );

  const customColorTheme = useSelector(
    (store: RootState) => store.appSettings.customColorTheme
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
  }, [activeFeatures, activeFeatureIndex, selectedAnalysis]);

  function generateWidgetURL(
    uiParams: any,
    widgetID: string,
    geostoreID?: string,
    queryParams?: { name: string; value: string }[]
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
        let yearRangeString = `${param.startParamName}=`;
        if (param.combineParams) {
          const start = `${analysisYearRange[0]}-01-01`;
          const end = `${analysisYearRange[1]}-12-31`;
          yearRangeString = yearRangeString.concat(
            `${start}${param.valueSeparator}${end}`
          );
          baseURL = baseURL.concat(yearRangeString);
        }
      } else if (param.inputType === 'tcd') {
        const threshold = `&thresh=${markValueMap[canopyDensity]}`;
        baseURL = baseURL.concat(threshold);
        //&thresh=20
      }
    }

    //Add Geostore ID
    baseURL = baseURL.concat(`&geostore=${geostoreID}`);

    //Check for query Params and append if they exist
    if (queryParams) {
      queryParams.forEach(param => {
        baseURL = baseURL.concat(`&${param.name}=${param.value}`);
      });
    }
    return baseURL;
  }

  function runAnalysis() {
    setBase64ChartURL('');
    setVegaSpec(null);
    const mod = analysisModules.find(
      module => module.analysisId === selectedAnalysis
    );
    if (mod) {
      const activeLayer = activeFeatures[activeFeatureIndex[0]];
      const activeFeature = activeLayer.features[activeFeatureIndex[1]];
      const widgetURL = generateWidgetURL(
        mod.uiParams,
        mod.widgetId,
        activeFeature.attributes.geostoreId,
        mod.params
      );
      fetch(widgetURL)
        .then((response: any) => response.json())
        .then((analysisMod: any) => {
          //TODO: we need to handle loading and error states
          setVegaSpec(analysisMod.data.attributes.widgetConfig);
          const descriptionURL = `https://production-api.globalforestwatch.org/v1/dataset/${analysisMod.data.attributes.dataset}/widget/${mod.widgetId}/metadata?language=${selectedLanguage}`;
          const widgetConfigData =
            analysisMod.data.attributes.widgetConfig.data;
          const downloadUrl = widgetConfigData.find(
            (e: any) => e.name === 'data'
          );

          if (!downloadUrl) return;
          fetch(downloadUrl.url)
            .then((response: any) => response.json())
            .then((data: any) => {
              const chartTitle =
                data.data && data.data.type
                  ? data.data.type + '-analysis.png'
                  : 'analysis.png';
              //unclear why are we matching 'month' here but that's how it was done in 3x
              if (data.data.attributes.downloadUrls?.csv?.includes('month')) {
                setChartDownTitle(chartTitle);
                setChartDownloadURL(
                  'https://production-api.globalforestwatch.org' +
                    data.data.attributes.downloadUrls.csv
                );
              }
            })
            .catch((e: Error) => console.error(e));
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
        return <CanopyDensityPicker />;
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

  const setSaveSketch = (): void => {
    mapController.completeSketchVM();
    setRenderEditButton(true);
    mapController.detachMouseLocationTracking();
    dispatch(setRenderPopup(false));
  };

  const setEditSketch = (): void => {
    setRenderEditButton(false);
    mapController.updateSketchVM(activeFeatureIndex[1]);
    mapController.attachMouseLocationTracking();
    dispatch(setRenderPopup(true));
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

  function handleCloseDownloadOptions(): void {
    setDownloadOptionsVisible(false);
  }

  function handlePNGURL(base64: string): void {
    setBase64ChartURL(base64);
  }

  const returnButtons = (): JSX.Element | undefined => {
    const isUploadOrDrawn =
      (activeLayer as any).layerID === 'user_features' ||
      (activeLayer as any).layerID === 'upload_file_features';

    if (isUploadOrDrawn && renderEditButton) {
      return (
        <>
          <button
            className="orange-button base-analysis-size"
            style={{ backgroundColor: customColorTheme }}
            onClick={(): void => setEditSketch()}
          >
            {analysisTranslations.editButton[selectedLanguage]}
          </button>
          <button className="delete-button" onClick={(): void => setDelete()}>
            {analysisTranslations.deleteButton[selectedLanguage]}
          </button>
        </>
      );
    }

    if (isUploadOrDrawn && renderEditButton === false) {
      return (
        <>
          <button
            className="orange-button base-analysis-size"
            style={{ backgroundColor: customColorTheme }}
            onClick={(): void => setSaveSketch()}
          >
            {analysisTranslations.saveButton[selectedLanguage]}
          </button>
          <button className="delete-button" onClick={(): void => setDelete()}>
            {analysisTranslations.deleteButton[selectedLanguage]}
          </button>
        </>
      );
    }
  };

  return (
    <>
      {geostoreReady ? (
        <div className="base-analysis-content">
          <div className="layer-title">
            <span>{title === null ? 'User Drawn Feature' : title}</span>
            {returnButtons()}
          </div>
          <AnalysisOptions />
          {!vegaSpec && (
            <div className="analysis-instructions">
              <AnalysisInstructions />
            </div>
          )}
          {vegaSpec && (
            <>
              <div
                style={{ cursor: 'pointer', float: 'right' }}
                onClick={(): void =>
                  setDownloadOptionsVisible(!downloadOptionsVisible)
                }
              >
                <DownloadIcon width={25} height={25} />
                {downloadOptionsVisible && (
                  <DownloadOptions
                    report={false}
                    csv={chartDownloadURL}
                    chartDownTitle={chartDownTitle}
                    base64ChartURL={base64ChartURL}
                    closeCB={handleCloseDownloadOptions}
                  />
                )}
              </div>
              <VegaChart
                spec={vegaSpec}
                language={selectedLanguage}
                sendBackURL={handlePNGURL}
              />
              {base64ChartURL === '' && (
                <Loader
                  containerPositionStyling={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-25px',
                    marginLeft: '-25px'
                  }}
                  color={'#cfcdcd'}
                  size={50}
                />
              )}
            </>
          )}
          <button
            disabled={selectedAnalysis === 'default'}
            style={
              selectedAnalysis !== 'default'
                ? { backgroundColor: customColorTheme }
                : {}
            }
            className={
              selectedAnalysis === 'default'
                ? 'orange-button disabled'
                : 'orange-button'
            }
            onClick={runAnalysis}
          >
            {analysisTranslations.runAnalysisButton[selectedLanguage]}
          </button>
          <DataTabFooter />
        </div>
      ) : (
        <div className="base-analysis-content">
          <Loader
            containerPositionStyling={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-25px',
              marginLeft: '-25px'
            }}
            color={'#cfcdcd'}
            size={50}
          />
        </div>
      )}
    </>
  );
};

export default BaseAnalysis;
