import * as React from 'react';
import { RootState } from '../../../js/store';
import { useSelector } from 'react-redux';
import { AnalysisModule } from '../../../js/store/appSettings/types';
import { MemoReportRangeSlider } from './ReportRangeSlider';
import { MemoReportDatePicker } from './DatePicker';
import CanopyDensityPicker from '../../../js/components/sharedComponents/CanopyDensityPicker';
import { UIParams } from '../../../js/components/leftPanel/analysisPanel/BaseAnalysis';
import Loader from '../../../js/components/sharedComponents/Loader';
import VegaChart from '../../../js/components/leftPanel/analysisPanel/VegaChartContainer';
import analysisTranslations from '../../../js/components/leftPanel/analysisPanel/analysisTranslations';
import { DownloadOptions } from '../../../js/components/sharedComponents/DownloadOptions';
import styled from 'styled-components';
import { GearIcon } from '../../../images/gearIcon';
import { DownloadIcon } from '../../../images/downloadIcon';
import fragmentationSpec from '../../../js/components/leftPanel/analysisPanel/fragmentationVegaSpec';
import { fetchWCSAnalysis, generateWidgetURL } from '../../../js/components/leftPanel/analysisPanel/analysisUtils';
import { defaultAnalysisModules } from '../../../../configs/analysis-config';
//Dynamic custom theme override using styled-components lib
interface CheckBoxWrapperProps {
  customColorTheme: string;
}
const CheckboxWrapper = styled.div<CheckBoxWrapperProps>`
  .styled-checkbox:checked + .styled-checkboxlabel:before {
    background-color: ${(props) => props.customColorTheme};
  }
`;

function getDefaultYearRange(uiParams: any): null | number[] {
  if (uiParams === 'none') return null;
  const input = uiParams.find((param: any) => param.inputType === 'range-slider');
  if (input) return input.bounds;
  return null;
}

const getTodayDate = new Date().toISOString().split('T')[0];

//@TODO: leave method for now
function getDefaultStartDate(uiParams: any): string {
  if (uiParams === 'none') return '';
  const input = uiParams.find((param: any) => param.type === 'date-picker');
  if (input && input.defaultStartDate) {
    return input.defaultStartDate;
  } else {
    return getTodayDate;
  }
}
//@TODO: leave method for now
function getDefaultEndDate(uiParams: any): string {
  if (uiParams === 'none') return '';
  const input = uiParams.find((param: any) => param.inputType === 'datepicker');
  if (input && input.defaultEndDate) {
    return input.defaultEndDate;
  } else {
    return getTodayDate;
  }
}

interface ChartModuleProps {
  moduleInfo: AnalysisModule;
  lang: string;
  geostoreID: string;
  esriGeometry: __esri.Graphic | undefined;
  activeFeatureAttributes: any;
}

const ChartModule = (props: ChartModuleProps): JSX.Element => {
  const { label, analysisParams } = props.moduleInfo;
  const language = props.lang;
  const translatedLabel = label[language] ? label[language] : 'Missing Translation Analysis Label';

  const density = useSelector((store: RootState) => store.appState.leftPanel.density);
  const gladStart = useSelector((store: RootState) => store.appState.leftPanel.gladStart);
  const gladEnd = useSelector((store: RootState) => store.appState.leftPanel.gladEnd);
  const customColorTheme = useSelector((store: RootState) => store.appSettings.customColorTheme);
  const viirsStart = useSelector((store: RootState) => store.appState.leftPanel.viirsStart);
  const viirsEnd = useSelector((store: RootState) => store.appState.leftPanel.viirsEnd);
  const currentAnalysis = props.moduleInfo;
  const [submoduleIsHidden, setSubmoduleIsHidden] = React.useState(false);
  const [baseConfig, setBaseConfig] = React.useState<AnalysisModule>();
  const [inputsAreHidden, setInputsAreHidden] = React.useState(true);
  const [yearRangeValue, setYearRangeValue] = React.useState<null | number[]>(getDefaultYearRange(analysisParams));
  const [startDate, setStartDate] = React.useState(gladStart);
  const [endDate, setEndDate] = React.useState(gladEnd);
  const [chartLoading, setChartLoading] = React.useState(true);
  const [chartError, setChartError] = React.useState(false);
  const [vegaSpec, setVegaSpec] = React.useState(null);
  const [downloadUrl, setDownloadUrl] = React.useState('');
  const [downloadOptionsVisible, setDownloadOptionsVisible] = React.useState(false);
  const [chartDownloadTitle, setChartDownloadTitle] = React.useState('analysis.png');
  const [base64ChartURL, setBase64ChartURL] = React.useState('');
  const [chartDescription, setChartDescription] = React.useState<null | string>(null);

  //We want to re-render chart if user clicks on the 'run analysis' button, this is one way to do it, there may be better options
  const [forceRender, setForceRender] = React.useReducer((x) => x + 1, 0);

  function updateDate(val: any): void {
    setYearRangeValue(val);
  }

  function updateDatePickerValues(start: string, end: string): void {
    setStartDate(start);
    setEndDate(end);
  }

  const renderInputComponent = (props: UIParams, analysisId): JSX.Element | null | undefined => {
    const { multi, minDate, maxDate, defaultStartDate, defaultEndDate, bounds } = props;
    switch (props.type) {
      case 'range-slider':
        if (bounds)
          return (
            <MemoReportRangeSlider
              yearRange={bounds}
              handleSliderChange={updateDate}
              customColorTheme={customColorTheme}
            />
          );
        break;
      case 'tcd':
        return <CanopyDensityPicker />;
      case 'date-picker':
        return (
          <MemoReportDatePicker
            multi={multi}
            minDate={minDate}
            maxDate={maxDate}
            defaultStartDate={analysisId === 'VIIRS_FIRES' ? viirsStart : defaultStartDate}
            defaultEndDate={analysisId === 'VIIRS_FIRES' ? viirsEnd : defaultEndDate}
            sendDateValue={updateDatePickerValues}
            customColorTheme={customColorTheme}
          />
        );
      default:
        return null;
    }
  };

  React.useEffect(() => {
    setChartLoading(true);
    if (props.moduleInfo.widgetId) {
      const stDate = props.moduleInfo.analysisId === 'VIIRS_FIRES' ? viirsStart : startDate;
      const enDate = props.moduleInfo.analysisId === 'VIIRS_FIRES' ? viirsEnd : endDate;
      // GFW WIDGET
      const widgetURL = generateWidgetURL({
        widgetId: props.moduleInfo.widgetId,
        geostoreId: props.geostoreID,
        startDate: stDate,
        endDate: enDate,
        density: density,
        analysisId: props.moduleInfo.analysisId,
        sqlString: props.moduleInfo.sqlString,
      });

      fetch(widgetURL)
        .then((response: any) => response.json())
        .then((analysisMod: any) => {
          setChartLoading(false);
          setBaseConfig(props.moduleInfo);

          const descriptionURL = `https://production-api.globalforestwatch.org/v1/dataset/${analysisMod.data.attributes.dataset}/widget/${props.moduleInfo.widgetId}/metadata?language=${language}`;

          fetch(descriptionURL)
            .then((response: any) => response.json())
            .then((data: any) => {
              setChartDescription(data && data?.data[0]?.attributes?.description);
            })
            .catch((e) => {
              setChartDescription('Error retrieving chart analysis description.');
              console.error(e);
            });
          //download urls
          const widgetConfigData = analysisMod.data.attributes.widgetConfig.data;
          const downloadUrl = widgetConfigData.find((e: any) => e.name === 'data');

          // WCS specific modules need attribute data to be passed down as well, GFW analysis mods do not need that but we send it anyway,
          // they get ignored downstream at Chart creator
          const newSpec = analysisMod.data.attributes.widgetConfig;
          newSpec['attributes'] = props.activeFeatureAttributes;
          setVegaSpec(newSpec);
        })
        .catch((e) => {
          console.error(e);
          setChartError(true);
          setChartLoading(false);
        });
    } else if (props.moduleInfo.analysisId.includes('FRAGMENTATION') && props.moduleInfo.analysisUrl) {
      //HANDLE WCS Fragmentation analysis modules
      fetchWCSAnalysis(
        props.moduleInfo,
        props.moduleInfo.analysisUrl,
        props.esriGeometry,
        yearRangeValue,
        language
      ).then((res: any) => {
        setChartLoading(false);
        setChartError(false);
        //Title value overwrite
        fragmentationSpec.marks[1].encode.enter.text!.value = `${res.data.title}`;
        //Year sublaybel overwrite
        fragmentationSpec.marks[2].encode.enter.text!.value = res.data.startYear
          ? `${res.data.startYear} - ${res.data.endYear}`
          : '';
        //Computed value overwrite
        fragmentationSpec.marks[3].encode.enter.text!.value = res.data.totalResult.toFixed(3);
        fragmentationSpec.width = 500;
        fragmentationSpec.marks[0].encode.enter.width!.signal = '460';
        fragmentationSpec.signals = [];
        //@ts-ignore ts is not liking my hand crafted base spec for some reason
        setVegaSpec(fragmentationSpec);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.geostoreID, forceRender]);

  function handlePNGURL(base64: string): void {
    setBase64ChartURL(base64);
  }

  function handleCloseDownloadOptions(): void {
    setDownloadOptionsVisible(false);
  }

  return (
    <div className={submoduleIsHidden ? 'print-hidden' : 'chart-module'}>
      <div className="report-top-toolbar">
        <h4 className="report-toolbar-title">{translatedLabel}</h4>
        <div className="report-button-controls">
          {currentAnalysis?.analysisParams?.length !== 0 ? (
            <div onClick={(): void => setInputsAreHidden(!inputsAreHidden)} style={{ cursor: 'pointer' }}>
              <GearIcon width={22} height={22} fill={'#888888'} />
            </div>
          ) : (
            <div></div>
          )}
          <div style={{ cursor: 'pointer' }} onClick={(): void => setDownloadOptionsVisible(!downloadOptionsVisible)}>
            <DownloadIcon width={25} height={25} />
            {downloadOptionsVisible && (
              <DownloadOptions
                report={true}
                csv={downloadUrl}
                chartDownTitle={chartDownloadTitle}
                base64ChartURL={base64ChartURL}
                closeCB={handleCloseDownloadOptions}
              />
            )}
          </div>

          <CheckboxWrapper customColorTheme={customColorTheme}>
            <div className="layer-checkbox">
              <input
                type="checkbox"
                name="styled-checkbox"
                className="styled-checkbox"
                id={`layer-checkbox-${translatedLabel}`}
                checked={!submoduleIsHidden}
                onChange={(): void => setSubmoduleIsHidden(!submoduleIsHidden)}
              />
              <label className="styled-checkboxlabel" htmlFor={`layer-checkbox-${translatedLabel}`}>
                {'a'}
              </label>
            </div>
          </CheckboxWrapper>
        </div>
      </div>
      <div className={submoduleIsHidden ? 'chart-submodule hidden' : 'chart-submodule'}>
        <div className={inputsAreHidden ? 'hidden' : 'chart-control-inputs'}>
          {currentAnalysis?.analysisParams?.length !== 0 &&
            currentAnalysis?.analysisParams.map((uiParam: any, i: number) => {
              return (
                <div className="ui-analysis-wrapper" key={i}>
                  <div className="ui-description">
                    <div className="number">
                      <p>{i + 1}</p>
                    </div>
                    <p>{uiParam.label[language]}</p>
                  </div>
                  <div className="analysis-input">{renderInputComponent(uiParam, currentAnalysis.analysisId)}</div>
                </div>
              );
            })}
          {currentAnalysis?.analysisParams.length !== 0 && (
            <button
              className="orange-button"
              style={{ backgroundColor: customColorTheme }}
              onClick={(): void => setForceRender()}
            >
              {analysisTranslations.runAnalysisButton[language]}
            </button>
          )}
        </div>
        <div className="vega-chart-wrapper">
          <>
            {!chartLoading && vegaSpec ? (
              <VegaChart
                spec={vegaSpec}
                baseConfig={baseConfig}
                language={language}
                report={true}
                chartType={currentAnalysis?.chartType}
                sendBackURL={handlePNGURL}
              />
            ) : (
              <div style={{ width: 900, height: 344, background: '#8080801f' }}>
                <Loader
                  containerPositionStyling={{
                    position: 'relative',
                    top: '40%',
                    left: '50%',
                    marginLeft: '-50px',
                  }}
                  color={'#cfcdcd'}
                  size={100}
                />
              </div>
            )}
          </>
        </div>
        <div className="vega-chart-description">{chartDescription}</div>
      </div>
      <div className="pagebreak"></div>
    </div>
  );
};

interface ChartProps {
  geostoreID: string;
  esriGeometry: __esri.Graphic | undefined;
  attributes: any;
}
const ReportChartsComponent = (props: ChartProps): JSX.Element => {
  const selectedLanguage = useSelector((store: RootState) => store.appState.selectedLanguage);
  const disabledAnalysisModules = useSelector((store: RootState) => store.appSettings.disabledAnalysisModules);

  return (
    <div className="chart-area-container">
      {defaultAnalysisModules
        .filter((m) => {
          if (disabledAnalysisModules?.length) {
            return !disabledAnalysisModules.includes(m.analysisId);
          }
          return true;
        })
        .map((module, i) => (
          <ChartModule
            key={i}
            moduleInfo={module}
            lang={selectedLanguage}
            geostoreID={props.geostoreID}
            esriGeometry={props.esriGeometry}
            activeFeatureAttributes={props.attributes}
          />
        ))}
    </div>
  );
};

export const MemoReportChartsComponent = React.memo(ReportChartsComponent);
