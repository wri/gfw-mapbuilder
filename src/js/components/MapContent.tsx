import React, { FunctionComponent } from 'react';

import Mapview from '../components/mapview/Mapview';
import MapControl from '../components/mapControls/mapControl';

const MapContent: FunctionComponent = () => {
  return (
    <>
      <MapControl />
      <Mapview />
    </>
  );
};

export default MapContent;
