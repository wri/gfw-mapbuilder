import * as React from 'react';
import { RootState } from 'js/store';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { AnalysisModule } from 'js/store/appSettings/types';

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
  console.log(props);
  const language = props.lang;
  const { label } = props.moduleInfo;
  return (
    <div className="chart-module">
      <div className="report-top-toolbar">
        <div className="report-toolbar-title">{label[language]}</div>
        <div className="report-button-controls">
          <div>
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
              id={`layer-checkbox-`}
              checked={true}
              onChange={(): void => console.log('a')}
            />
            <label className="styled-checkboxlabel" htmlFor={`layer-checkbox-`}>
              {'a'}
            </label>
          </div>
        </div>
      </div>
      <div>Input Controls</div>
      <div>Chart</div>
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
