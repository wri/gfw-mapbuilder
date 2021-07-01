import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../js/store';

const LayerDash = (): JSX.Element => {
  const { infoModalLayerID: dashboardURL } = useSelector(
    (store: RootState) => store.appState
  );
  return (
    <div
      className="layer-dashboard-container"
      style={{ width: '100%', height: '100%' }}
    >
      <iframe width="100%" height="100%" src={dashboardURL}></iframe>
    </div>
  );
};

export default LayerDash;
