import * as React from 'react';
import { PrintReportButton } from 'js/components/sharedComponents/PrintReportButton';

const DataTabFooter = (): JSX.Element => {
  return (
    <div className="data-tabview-footer">
      <PrintReportButton />
    </div>
  );
};

export default DataTabFooter;
