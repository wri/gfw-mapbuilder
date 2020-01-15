import React, { FunctionComponent } from 'react';

import ShareWidget from './shareWidget';
import PrintWidget from './printWidget';

import '../../../css/mapControls';

const MapWidgets: FunctionComponent = () => {
  return (
    <>
      <div className="widget-wrapper">
        <div className="widget-column">
          <PrintWidget />
          <ShareWidget />
        </div>
        <div className="widget-column">
          <PrintWidget />
          <ShareWidget />
        </div>
      </div>
    </>
  );
};

export default MapWidgets;
