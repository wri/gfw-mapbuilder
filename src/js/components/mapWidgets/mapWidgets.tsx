import React, { FunctionComponent } from 'react';

import ShareWidget from './shareWidget';
import PrintWidget from './printWidget';
import PenWidget from './penWidget';
import SearchWidget from './searchWidget';
import HideWidget from './hideWidget';
import RefreshWidget from './refreshWidget';

// import ModalCard from '../modal/modalCard'

import '../../../css/mapWidgets';

// TODO integrate ModalCard here!

const MapWidgets: FunctionComponent = () => {
  return (
    <>
      <div className="widget-wrapper">
        <div className="widget-column">
          <PrintWidget />
          <ShareWidget />
        </div>
        <div className="widget-column">
          <PenWidget />
          <SearchWidget />
        </div>
        <div className="widget-column">
          <HideWidget />
          <RefreshWidget />
        </div>
      </div>
      {/* <ModalCard renderModal={true} children={"test"} setOpenWidget={() => console.log('setOpenWidget()')}/> */}
    </>
  );
};

export default MapWidgets;
