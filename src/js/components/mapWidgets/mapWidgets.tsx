import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import ShareWidget from './shareWidget';
import PrintWidget from './printWidget';
import PenWidget from './penWidget';
import SearchWidget from './searchWidget';
import HideWidget from './hideWidget';
import RefreshWidget from './refreshWidget';
import ZoomWidget from './zoomWidget';

import ModalCard from '../modal/modalCard';

import '../../../css/mapWidgets';

const MapWidgets: FunctionComponent = () => {
  const modalType = useSelector((state: any) => state.appState.renderModal);

  return (
    <>
      <div className="widget-wrapper">
        <div className="widget-column">
          <ZoomWidget />
        </div>
        <div className="widget-column">
          <ShareWidget />
          <PrintWidget />
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
      {modalType.length ? <ModalCard /> : null}
    </>
  );
};

export default MapWidgets;
