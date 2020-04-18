import * as React from 'react';
import { RootState } from 'js/store';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { AnalysisModule } from 'js/store/appSettings/types';
import { MemoReportRangeSlider } from './ReportRangeSlider';
import { MemoReportDatePicker } from './DatePicker';
import CanopyDensityPicker from 'js/components/sharedComponents/CanopyDensityPicker';
import { UIParams } from 'js/components/leftPanel/analysisPanel/BaseAnalysis';
import { markValueMap } from 'js/components/mapWidgets/widgetContent/CanopyDensityContent';
import VegaChart from 'js/components/leftPanel/analysisPanel/VegaChartContainer';
import analysisTranslations from 'js/components/leftPanel/analysisPanel/analysisTranslations';

import { ReactComponent as GearIcon } from '../../../images/gearIcon.svg';
import { ReactComponent as DownloadIcon } from '../../../images/downloadIcon.svg';

const selectAnalysisModules = createSelector(
  (state: RootState) => state.appSettings,
  settings => settings.analysisModules
);

function generateWidgetURL(
  uiParams: any,
  widgetID: string,
  geostoreID: string,
  startDate: string,
  endDate: string,
  analysisYearRange: number[] | null,
  canopyDensity: number,
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
        const start = startDate;
        const end = endDate;
        datePickerString = datePickerString.concat(
          `${start}${param.valueSeparator}${end}`
        );
        baseURL = baseURL.concat(datePickerString);
      }
    } else if (param.inputType === 'rangeSlider') {
      let yearRangeString = `${param.startParamName}=`;
      if (param.combineParams && analysisYearRange) {
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

function getDefaultYearRange(uiParams: any): null | number[] {
  if (uiParams === 'none') return null;
  const input = uiParams.find(
    (param: any) => param.inputType === 'rangeSlider'
  );
  if (input) return input.bounds;
  return null;
}

const getTodayDate = new Date().toISOString().split('T')[0];

function getDefaultStartDate(uiParams: any): string {
  if (uiParams === 'none') return '';
  const input = uiParams.find((param: any) => param.inputType === 'datepicker');
  if (input && input.defaultStartDate) {
    return input.defaultStartDate;
  } else {
    return getTodayDate;
  }
}

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
}
const ChartModule = (props: ChartModuleProps): JSX.Element => {
  const { label, uiParams } = props.moduleInfo;
  const language = props.lang;
  const translatedLabel = label[language]
    ? label[language]
    : 'Missing Translation Analysis Label';

  const density = useSelector(
    (store: RootState) => store.appState.leftPanel.density
  );
  const currentAnalysis = props.moduleInfo;
  const [submoduleIsHidden, setSubmoduleIsHidden] = React.useState(false);
  const [inputsAreHidden, setInputsAreHidden] = React.useState(false);
  const [yearRangeValue, setYearRangeValue] = React.useState<null | number[]>(
    getDefaultYearRange(uiParams)
  );
  const [startDate, setStartDate] = React.useState(
    getDefaultStartDate(uiParams)
  );
  const [endDate, setEndDate] = React.useState(getDefaultEndDate(uiParams));
  const [chartLoading, setChartLoading] = React.useState(true);
  const [chartError, setChartError] = React.useState(false);
  const [vegaSpec, setVegaSpec] = React.useState(null);

  function updateDate(val: any): void {
    setYearRangeValue(val);
  }

  function updateDatePickerValues(start: string, end: string): void {
    setStartDate(start);
    setEndDate(end);
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
        if (bounds)
          return (
            <MemoReportRangeSlider
              yearRange={bounds}
              handleSliderChange={updateDate}
            />
          );
        break;
      case 'tcd':
        return <CanopyDensityPicker label={false} />;
      case 'datepicker':
        return (
          <MemoReportDatePicker
            multi={multi}
            minDate={minDate}
            maxDate={maxDate}
            defaultStartDate={defaultStartDate}
            defaultEndDate={defaultEndDate}
            sendDateValue={updateDatePickerValues}
          />
        );
      default:
        return null;
    }
  };
  React.useEffect(() => {
    console.log('use effect firing');
    console.log(props.geostoreID);

    const widgetURL = generateWidgetURL(
      uiParams,
      props.moduleInfo.widgetId,
      props.geostoreID,
      startDate,
      endDate,
      yearRangeValue,
      density,
      props.moduleInfo.params
    );
    setChartLoading(true);
    fetch(widgetURL)
      .then((response: any) => response.json())
      .then((analysisMod: any) => {
        setChartLoading(false);
        //TODO: we need to handle loading and error states
        console.log(analysisMod.data.attributes.widgetConfig);
        setVegaSpec(analysisMod.data.attributes.widgetConfig);
      })
      .catch(e => {
        console.error(e);
        setChartError(true);
        setChartLoading(false);
      });
    console.log(widgetURL);
  }, [props.geostoreID]);

  return (
    <div className="chart-module">
      <div className="report-top-toolbar">
        <h4 className="report-toolbar-title">{translatedLabel}</h4>
        <div className="report-button-controls">
          <div
            onClick={(): void => setInputsAreHidden(!inputsAreHidden)}
            style={{ cursor: 'pointer' }}
          >
            <GearIcon width={22} height={22} fill={'#888888'} />
          </div>
          <div>
            <DownloadIcon width={25} height={25} />
          </div>
          <div className="layer-checkbox">
            <input
              type="checkbox"
              name="styled-checkbox"
              className="styled-checkbox"
              id={`layer-checkbox-${translatedLabel}`}
              checked={!submoduleIsHidden}
              onChange={(): void => setSubmoduleIsHidden(!submoduleIsHidden)}
            />
            <label
              className="styled-checkboxlabel"
              htmlFor={`layer-checkbox-${translatedLabel}`}
            >
              {'a'}
            </label>
          </div>
        </div>
      </div>
      <div
        className={
          submoduleIsHidden ? 'chart-submodule hidden' : 'chart-submodule'
        }
      >
        <div className={inputsAreHidden ? 'hidden' : 'chart-control-inputs'}>
          {currentAnalysis?.uiParams &&
            currentAnalysis?.uiParams !== 'none' &&
            currentAnalysis?.uiParams.map((uiParam: any, i: number) => {
              return (
                <div className="ui-analysis-wrapper" key={i}>
                  <div className="ui-description">
                    <div className="number">
                      <p>{i + 1}</p>
                    </div>
                    <p>{uiParam.label[language]}</p>
                  </div>
                  <div className="analysis-input">
                    {renderInputComponent(uiParam)}
                  </div>
                </div>
              );
            })}
          <button className="orange-button" onClick={() => console.log('yaya')}>
            {analysisTranslations.runAnalysisButton[language]}
          </button>
        </div>
        <div className="vega-chart-wrapper">
          {vegaSpec && (
            <VegaChart
              spec={vegaSpec}
              language={language}
              report={true}
              chartType={currentAnalysis?.chartType}
            />
          )}
        </div>
        <div>Chart Description</div>
      </div>
    </div>
  );
};

interface ChartProps {
  geostoreID: string;
}
const ReportChartsComponent = (props: ChartProps): JSX.Element => {
  const analysisModules = useSelector(selectAnalysisModules);
  const selectedLanguage = useSelector(
    (store: RootState) => store.appState.selectedLanguage
  );
  return (
    <div className="chart-area-container">
      {analysisModules.map((module, i) => (
        <ChartModule
          key={i}
          moduleInfo={module}
          lang={selectedLanguage}
          geostoreID={props.geostoreID}
        />
      ))}
    </div>
  );
};

export const MemoReportChartsComponent = React.memo(ReportChartsComponent);
