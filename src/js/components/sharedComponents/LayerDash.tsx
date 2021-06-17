import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../js/store';

const LayerDash = (): JSX.Element => {
  const { infoModalLayerID: layerID } = useSelector(
    (store: RootState) => store.appState
  );
  const { layerDashboards } = useSelector(
    (store: RootState) => store.appSettings
  );
  const layerDashboard = layerDashboards?.find(
    config => config.layerTitle.toLowerCase() === layerID.toLowerCase()
  );
  return (
    <div
      className="layer-dashboard-container"
      style={{ width: '100%', height: '100%' }}
    >
      <iframe
        width="100%"
        height="100%"
        src={layerDashboard?.dashboardURL}
      ></iframe>
    </div>
  );
};

export default LayerDash;
