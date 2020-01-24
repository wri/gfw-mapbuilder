import React, { FunctionComponent } from 'react';

import Mapview from '../components/mapview/Mapview';
import MapWidgets from './mapWidgets/mapWidgets';
import LeftPanel from './leftPanel/LeftPanel';

const MapContent: FunctionComponent = () => {
  return (
    <>
      <LeftPanel />
      <MapWidgets />
      <Mapview />
    </>
  );
};

export default MapContent;
