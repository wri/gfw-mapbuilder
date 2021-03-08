import * as React from 'react';
import { PrintReportButton } from '../../../../js/components/sharedComponents/PrintReportButton';
import { SubscribeButton } from '../../../../js/components/sharedComponents/SubscribeButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../js/store/index';

const DataTabFooter = (): JSX.Element => {
  const isLoggedIn = useSelector(
    (store: RootState) => store.appState.isLoggedIn
  );

  return (
    <div className="data-tabview-footer">
      <PrintReportButton />
      {isLoggedIn && <SubscribeButton />}
    </div>
  );
};

export default DataTabFooter;
