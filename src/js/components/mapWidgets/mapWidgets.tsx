import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import ShareWidget from './shareWidget';
import PrintWidget from './printWidget';
import PenWidget from './penWidget';
import SearchWidget from './searchWidget';
import HideWidget from './hideWidget';
import RefreshWidget from './refreshWidget';
import ZoomWidget from './zoomWidget';

import setModalContent from '../modal/modal.config';

import ModalCard from '../modal/modalCard';

import '../../../css/mapWidgets';

// TODO integrate ModalCard here!

const MapWidgets: FunctionComponent = () => {
  const renderModal = useSelector((state: any) => state.appState.renderModal);

  const setModal = () => {
    const modalContent = setModalContent(renderModal);

    if (renderModal.length) {
      return <ModalCard children={modalContent} />;
    }
  };

  return (
    <>
      <div className="widget-wrapper">
        <div className="widget-column">
          <ZoomWidget />
        </div>
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
      {setModal()}
    </>
  );
};

export default MapWidgets;
