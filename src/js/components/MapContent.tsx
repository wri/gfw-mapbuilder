import React, { FunctionComponent } from 'react';

import { Mapview } from './mapview/Mapview';
import ShareWidget from '../components/mapControls/shareWidget';

const MapContent: FunctionComponent = () => {
  return (
    <>
      <ShareWidget />
      <Mapview />
    </>
  );
};

export default MapContent;
