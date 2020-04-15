import * as React from 'react';
import 'css/report.scss';

interface ReportProps {
  mapview: React.FunctionComponent;
}

const Report = (props: ReportProps): JSX.Element => {
  return (
    <div className="report">
      <div className="report-header">
        <p>Header</p>
        <p>print btn</p>
        <p>share btn</p>
      </div>
      <div className="report-map">
        <props.mapview />
      </div>
      <div className="report-analysis">
        <p>Analysis area</p>
      </div>
      <div className="report-charts">
        <p>Charts area</p>
      </div>
    </div>
  );
};

export default Report;
