import React, { FunctionComponent } from 'react';

import ShareWidget from '../mapControls/shareWidget';
import PrintWidget from '../mapControls/printWidget';

import '../../../css/shareWidget';

const MapControl: FunctionComponent = () => {
  return (
    <>
      <ShareWidget />
      <PrintWidget />
    </>
  );
};

export default MapControl;
