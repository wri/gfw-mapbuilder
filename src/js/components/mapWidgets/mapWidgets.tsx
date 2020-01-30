import React, { FunctionComponent } from 'react';

import ShareWidget from './shareWidget';
import PrintWidget from './printWidget';
import PenWidget from './penWidget';
import SearchWidget from './searchWidget';
import HideWidget from './hideWidget';
import RefreshWidget from './refreshWidget';
import ZoomWidget from './zoomWidget';
import MeasureWidget from './measureWidget';

import '../../../css/mapWidgets';

const MapWidgets: FunctionComponent = () => {
  return (
    <>
      <div className="widget-wrapper">
        <div className="widget-row">
          <ZoomWidget />
        </div>
        <div className="widget-row">
          <ShareWidget />
          <PrintWidget />
        </div>
        <div className="widget-row">
          <PenWidget />
          <SearchWidget />
        </div>
        <div className="widget-row">
          <HideWidget />
          {/* <RefreshWidget /> */}
          <MeasureWidget />
        </div>
      </div>
    </>
  );
};

export default MapWidgets;
