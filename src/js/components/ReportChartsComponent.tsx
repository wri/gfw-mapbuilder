import * as React from 'react';
import { RootState } from 'js/store';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { AnalysisModule } from 'js/store/appSettings/types';
import { MemoReportRangeSlider } from './ReportRangeSlider';
import { MemoReportDatePicker } from './DatePicker';
import CanopyDensityPicker from 'js/components/sharedComponents/CanopyDensityPicker';
import { UIParams } from 'js/components/leftPanel/analysisPanel/BaseAnalysis';

import { ReactComponent as GearIcon } from '../../../images/gearIcon.svg';
import { ReactComponent as DownloadIcon } from '../../../images/downloadIcon.svg';

const selectAnalysisModules = createSelector(
  (state: RootState) => state.appSettings,
  settings => settings.analysisModules
);

interface ChartModuleProps {
  moduleInfo: AnalysisModule;
  lang: string;
}
const ChartModule = (props: ChartModuleProps): JSX.Element => {
  const { label, uiParams } = props.moduleInfo;
  const language = props.lang;
  const translatedLabel = label[language]
    ? label[language]
    : 'Missing Translation Analysis Label';
  console.log(props);
  const currentAnalysis = props.moduleInfo;
  const [submoduleIsHidden, setSubmoduleIsHidden] = React.useState(false);
  const [inputsAreHidden, setInputsAreHidden] = React.useState(false);
  const [yearRangeValue, setYearRangeValue] = React.useState([]);
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');

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

  return (
    <div className="chart-module">
      <div className="report-top-toolbar">
        <h4 className="report-toolbar-title">{translatedLabel}</h4>
        <div className="report-button-controls">
          <div
            onClick={() => setInputsAreHidden(!inputsAreHidden)}
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
        <div className={inputsAreHidden ? 'hidden' : ''}>
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
        </div>
        <div>Chart</div>
        <div>Chart Description</div>
      </div>
    </div>
  );
};

const ReportChartsComponent = (): JSX.Element => {
  const analysisModules = useSelector(selectAnalysisModules);
  const selectedLanguage = useSelector(
    (store: RootState) => store.appState.selectedLanguage
  );
  console.log(analysisModules);
  console.log('FIREEEEEEE');

  return (
    <div className="chart-area-container">
      {analysisModules.map((module, i) => (
        <ChartModule key={i} moduleInfo={module} lang={selectedLanguage} />
      ))}
    </div>
  );
};

export const MemoReportChartsComponent = React.memo(ReportChartsComponent);
