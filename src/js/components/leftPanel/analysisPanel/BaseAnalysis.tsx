import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import ReactTooltip from 'react-tooltip';
import { RootState } from '../../../store';
import { setActiveFeatures } from '../../../store/mapview/actions';
import { setRenderPopup, setMultiPolygonSelectionMode } from '../../../store/appState/actions';

import { registerGeometry } from '../../../helpers/geometryRegistration';
import fragmentationSpec from './fragmentationVegaSpec';
import VegaChart from './VegaChartContainer';
import analysisTranslations from './analysisTranslations';
import { MemoRangeSlider } from './InputComponents';
import CanopyDensityPicker from '../../../../js/components/sharedComponents/CanopyDensityPicker';
import { DownloadIcon } from '../../../../images/downloadIcon';
import { DownloadOptions } from '../../sharedComponents/DownloadOptions';
import Loader from '../../../../js/components/sharedComponents/Loader';
import { mapController } from '../../../controllers/mapController';
import DataTabFooter from '../dataPanel/DataTabFooter';

import { AnalysisModule, AnalysisParam } from '../../../store/appSettings/types';
import { fetchGFWWidgetConfig, fetchDownloadInfo, fetchWCSAnalysis, generateWidgetURL } from './analysisUtils';
import { DateRangePicker } from '../../sharedComponents/DateRangePicker';

import { defaultAnalysisModules } from '../../../../../configs/analysis-config';

import '../../../../css/leftpanel.scss';
import 'react-datepicker/dist/react-datepicker.css';
import { handleCustomColorTheme } from '../../../../utils';
import { DATES } from '../../../../../configs/dates-config';

type InputTypes = 'range-slider' | 'tcd' | 'date-picker';

export interface UIParams {
  type: InputTypes;
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
const selectAnalysisDaterange = createSelector(
  (state: RootState) => state.appState,
  (appState) => appState.leftPanel.analysisDateRange
);

const BaseAnalysis = (): JSX.Element => {
  const dispatch = useDispatch();
  const [vegaSpec, setVegaSpec] = useState(null);
  const [chartLoading, setChartLoading] = useState(false);
  const [chartDownloadURL, setChartDownloadURL] = useState('');
  const [chartDownTitle, setChartDownTitle] = useState('');
  const [base64ChartURL, setBase64ChartURL] = useState('');
  const [downloadOptionsVisible, setDownloadOptionsVisible] = useState(false);
  const [renderEditButton, setRenderEditButton] = useState(true);
  const [baseConfig, setBaseConfig] = useState<AnalysisModule>();
  const [chartError, setChartError] = useState(false);

  //This is used for date picker analysis module

  const selectedLanguage = useSelector((store: RootState) => store.appState.selectedLanguage);

  //Default to the first analysis
  const [selectedAnalysis, setSelectedAnalysis] = useState<any>('default');

  const [geostoreReady, setGeostoreReady] = useState(false);

  const activeFeatures = useSelector((store: RootState) => store.mapviewState.activeFeatures);

  const activeFeatureIndex = useSelector((store: RootState) => store.mapviewState.activeFeatureIndex);

  const analysisDateRange = useSelector((store: RootState) => store.appState.leftPanel.analysisDateRange);

  const analysisYearRange = useSelector((store: RootState) => store.appState.leftPanel.analysisYearRange);

  const density = useSelector((store: RootState) => store.appState.leftPanel.density);

  const customColorTheme = useSelector((store: RootState) => store.appSettings.customColorTheme);

  const disabledAnalysisModules = useSelector((store: RootState) => store.appSettings.disabledAnalysisModules);

  const multiPolygonSelection = useSelector((store: RootState) => store.appState.multiPolygonSelectionMode);

  const themeColor = handleCustomColorTheme(customColorTheme);

  useEffect(() => {
    if (selectedAnalysis) {
      const localStorageObj = { type: selectedAnalysis, minDate: analysisDateRange[0], maxDate: analysisDateRange[1] };
      localStorage.setItem('report-date-picker', JSON.stringify(localStorageObj));
    }
  }, [selectedAnalysis, analysisDateRange[0], analysisDateRange[1]]);

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
        .then((response) => response.json())
        .then((res) => {
          if (res?.errors) {
            throw new Error('failed to register geostore');
          }
          const oldActiveFeatures = [...activeFeatures];
          const activeLayer = oldActiveFeatures[activeFeatureIndex[0]];
          const activeFeature = activeLayer?.features[activeFeatureIndex[1]];
          activeFeature.attributes.geostoreId = res.data.id; //splice this out and update the copy..?
          dispatch(setActiveFeatures(oldActiveFeatures));
          setGeostoreReady(true);
        })
        .catch((e) => console.log('failed to register geostore', e));
    }
  }, [dispatch, activeFeatures, activeFeatureIndex, selectedAnalysis]);

  //Main Func to run the analysis with selected option and geometry
  function runAnalysis(): void {
    setBase64ChartURL('');
    setChartLoading(true);
    setVegaSpec(null);
    const mod = defaultAnalysisModules.find((module) => module.analysisId === selectedAnalysis) as AnalysisModule;

    if (!mod) return;
    setBaseConfig(mod);
    const activeLayer = activeFeatures[activeFeatureIndex[0]];
    const activeFeature = activeLayer.features[activeFeatureIndex[1]];

    //Generate GFW Widget URL for the request
    if (mod.widgetId) {
      const widgetURL = generateWidgetURL({
        analysisId: mod.analysisId,
        widgetId: mod.widgetId,
        geostoreId: activeFeature.attributes.geostoreId!,
        sqlString: mod.sqlString,
        startDate: analysisDateRange[0],
        endDate: analysisDateRange[1],
        density: density,
      });

      fetchGFWWidgetConfig(widgetURL).then((res) => {
        //Send attributes over for processing
        setVegaSpec(res);
        //grab download urls if they exist
        const widgetConfigData = res.data;
        const downloadUrl = widgetConfigData.find((e: any) => e.name === 'table');
        if (!downloadUrl || !downloadUrl?.url) return;
        fetchDownloadInfo(downloadUrl.url).then((res: any) => {
          setChartDownTitle(res?.chartTitle ? res.chartTitle : '');
          setChartDownloadURL(res?.downloadUrl ? res.downloadUrl : '');
        });
      });
    } else if (mod.analysisId.includes('FRAGMENTATION') && mod.analysisUrl) {
      fetchWCSAnalysis(mod, mod.analysisUrl, activeFeature, analysisYearRange, selectedLanguage).then((res: any) => {
        //Title value overwrite
        fragmentationSpec.marks[1].encode.enter.text!.value = `${res.data.title}`;
        //Year sublaybel overwrite
        fragmentationSpec.marks[2].encode.enter.text!.value = `${res.data.startYear} - ${res.data.endYear}`;
        //Computed value overwrite
        fragmentationSpec.marks[3].encode.enter.text!.value = res.data.totalResult.toFixed(3);

        //@ts-ignore ts is not liking my hand crafted base spec for some reason
        setVegaSpec(fragmentationSpec);
        setChartDownTitle('');
        setChartDownloadURL('');
      });
    }
  }

  const renderInputComponent = (props: AnalysisParam, analysisConfig: AnalysisModule): JSX.Element | null => {
    const { bounds, type } = props;
    if (type === 'rangeSlider') {
      if (bounds) return <MemoRangeSlider yearRange={bounds} />;
    }

    if (type === 'tcd') {
      return <CanopyDensityPicker />;
    }

    if (type === 'date-picker') {
      return <DateRangePicker />;
    }

    return null;
  };

  const AnalysisInstructions = React.useMemo(
    () => (): JSX.Element | null => {
      const currentAnalysis = defaultAnalysisModules.find((module) => module.analysisId === selectedAnalysis);
      if (selectedAnalysis === 'default') {
        return (
          <>
            <div className="analysis-text">
              <p style={{ fontWeight: 'bold' }}>{analysisTranslations.analysisNotSelected[selectedLanguage][0]}</p>
              <p>{analysisTranslations.analysisNotSelected[selectedLanguage][1]}</p>
            </div>
            <div className="chart-icon"></div>
          </>
        );
      } else {
        return (
          <>
            <p style={{ fontWeight: 'bold', fontSize: '16px' }}>{currentAnalysis?.title[selectedLanguage]}</p>
            <p style={{ fontSize: '12px' }}>{currentAnalysis?.description[selectedLanguage]}</p>
            <div>
              {currentAnalysis?.analysisParams.length !== 0 &&
                currentAnalysis?.analysisParams.map((param: AnalysisParam, i: number) => {
                  return (
                    <div className="ui-analysis-wrapper" key={i}>
                      <div className="ui-description">
                        <div className="number">
                          <p>{i + 1}</p>
                        </div>
                        <p>{param.label[selectedLanguage]}</p>
                      </div>
                      <div className="analysis-input">{renderInputComponent(param, currentAnalysis)}</div>
                    </div>
                  );
                })}
            </div>
          </>
        );
      }
    },
    [selectedAnalysis, selectedLanguage]
  );

  const AnalysisOptions = (): JSX.Element => {
    function handleAnalysisOptionChange(e: any): void {
      setSelectedAnalysis(e.target.value);
      //Nulify Vega chart Result when new analysis option is selected
      setVegaSpec(null);
    }

    return (
      <select className="analysis-select" value={selectedAnalysis || 'default'} onChange={handleAnalysisOptionChange}>
        <option value="default">{analysisTranslations.defaultAnalysisLabel[selectedLanguage]}</option>
        {defaultAnalysisModules
          .filter((m) => {
            if (disabledAnalysisModules?.length) {
              return !disabledAnalysisModules.includes(m.analysisId);
            }
            return true;
          })
          .map((module, i: number) => {
            return (
              <option value={module.analysisId} key={i}>
                {module.label[selectedLanguage] || `Untranslated ${module.analysisId}`}
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

  const returnLayerTitle = activeLayer && activeLayer.layerTitle ? activeLayer.layerTitle : null;

  const title =
    activeLayer && activeLayer.sublayerTitle
      ? `${activeLayer.layerTitle}: ${activeLayer.sublayerTitle}`
      : returnLayerTitle;

  function handleCloseDownloadOptions(): void {
    setDownloadOptionsVisible(false);
  }

  function handlePNGURL(base64: string): void {
    setBase64ChartURL(base64);
    setChartLoading(false);
  }

  function handleChartError() {
    setChartError(true);
    setDownloadOptionsVisible(false);
    setVegaSpec(null);
  }

  function analysisDateRangeHeader() {
    if (selectedAnalysis === 'TC_LOSS_TOTAL') {
      return (
        <div
          style={{
            textAlign: 'center',
            marginTop: 15,
            marginBottom: -20,
          }}
        >
          <span style={{ fontWeight: 600 }}>From: </span>
          <span>{DATES.TREE_COVER_LOSS.min}</span>
          <span style={{ fontWeight: 600 }}> to: </span>
          <span>{DATES.TREE_COVER_LOSS.max}</span>
        </div>
      );
    }
    if (selectedAnalysis === 'VIIRS_FIRES' || selectedAnalysis === 'GLAD_ALERTS') {
      return (
        <div
          style={{
            textAlign: 'center',
            marginTop: 15,
            marginBottom: -20,
          }}
        >
          <span style={{ fontWeight: 600 }}>From: </span>
          <span>{analysisDateRange[0]}</span>
          <span style={{ fontWeight: 600 }}> to: </span>
          <span>{analysisDateRange[1]}</span>
        </div>
      );
    }
  }

  const returnButtons = (): JSX.Element | undefined => {
    const isUploadOrDrawn =
      (activeLayer as any).layerID === 'user_features' || (activeLayer as any).layerID === 'upload_file_features';

    if (isUploadOrDrawn && renderEditButton) {
      return (
        <>
          <button
            className="orange-button base-analysis-size"
            style={{ backgroundColor: themeColor }}
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
            style={{ backgroundColor: themeColor }}
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

  //Analysis is disabled for point and polyline features
  const selectedFeature = activeFeatures[activeFeatureIndex[0]]?.features[activeFeatureIndex[1]] || null;
  const selectedFeatureType = selectedFeature?.geometry?.type;
  const featureIsNotAllowed = selectedFeatureType === 'point' || selectedFeatureType === 'polyline';

  return (
    <>
      {geostoreReady ? (
        <div className="base-analysis-content">
          <div className="layer-title">
            <span>{title === null ? 'User Drawn Feature' : title}</span>
            {returnButtons()}
          </div>
          <AnalysisOptions />
          {!vegaSpec && !chartError && (
            <div className="analysis-instructions" style={{ height: 300 }}>
              <AnalysisInstructions />
            </div>
          )}
          {chartError && (
            <div
              style={{
                height: 368,
                justifyContent: 'center',
                display: 'flex',
                alignContent: 'center',
                alignItems: 'center',
                color: 'red',
                textAlign: 'center',
              }}
            >
              No data exists for this area, please select another area.
            </div>
          )}
          {chartLoading && (
            <>
              <p style={{ textAlign: 'center', marginTop: '30px' }}>Loading Chart...</p>
            </>
          )}
          {vegaSpec && (
            <>
              <div
                style={{ cursor: 'pointer', float: 'right' }}
                onClick={(): void => setDownloadOptionsVisible(!downloadOptionsVisible)}
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
              {analysisDateRangeHeader()}
              <VegaChart
                spec={vegaSpec}
                language={selectedLanguage}
                baseConfig={baseConfig}
                sendBackURL={handlePNGURL}
                sendError={handleChartError}
              />
            </>
          )}
          {!chartError && (
            <span data-tip={'Analysis disabled for point and line features'} data-offset="{'top': -5}">
              <button
                disabled={selectedAnalysis === 'default' || featureIsNotAllowed}
                style={selectedAnalysis !== 'default' ? { backgroundColor: themeColor } : {}}
                className={
                  selectedAnalysis === 'default' || featureIsNotAllowed ? 'orange-button disabled' : 'orange-button'
                }
                onClick={runAnalysis}
              >
                {analysisTranslations.runAnalysisButton[selectedLanguage]}
              </button>
              {!multiPolygonSelection && (
                <button
                  style={{ backgroundColor: themeColor }}
                  className={'orange-button'}
                  onClick={() => {
                    dispatch(setMultiPolygonSelectionMode(true));
                  }}
                >
                  Analyze overlapping area
                </button>
              )}
            </span>
          )}
          <ReactTooltip effect="solid" className="tab-tooltip" disable={!featureIsNotAllowed} />
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
              marginLeft: '-25px',
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
