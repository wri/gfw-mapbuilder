import React, { FunctionComponent } from 'react';

import ShareWidget from '../mapControls/shareWidget';
import PrintWidget from '../mapControls/printWidget';

import '../../../css/mapControls';

const MapControl: FunctionComponent = () => {
  return (
    <>
      <div className="widget-wrapper">
        <PrintWidget />
        <ShareWidget />
      </div>
    </>
  );
};

export default MapControl;
