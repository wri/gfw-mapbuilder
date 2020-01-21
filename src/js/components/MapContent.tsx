import React, { FunctionComponent } from 'react';

import Mapview from '../components/mapview/Mapview';
import MapWidgets from './mapWidgets/mapWidgets';

const MapContent: FunctionComponent = () => {
  return (
    <>
      <MapWidgets />
      <Mapview />
    </>
  );
};

export default MapContent;
