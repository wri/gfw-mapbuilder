import React, { FunctionComponent, createRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { mapController } from 'js/controllers/mapController';

import { printContent } from '../../../../../configs/modal.config';
import { RootState } from 'js/store/index';

const PrintContent: FunctionComponent = () => {
  const printContentRef = createRef() as React.MutableRefObject<
    HTMLInputElement
  >;
  const selectedLanguage = useSelector(
    (state: RootState) => state.appState.selectedLanguage
  );
  const { buttonLabel, dropdownLabel, printOptions } = printContent[
    selectedLanguage
  ];

  useEffect(() => {
    // ? ASK - Is there a better way to set the container without
    // ? re-initializing the print widget?
    // mapController.initializePrintWidget(printContentRef.current);
    console.log('printContentRef.current', printContentRef.current);

    mapController.setPrintWidget(printContentRef.current);
  }, []);

  return (
    <div className="modal-content-container">
      <div className="directions">
        <p>{buttonLabel}</p>
      </div>
      <div className="print-widget-ref" ref={printContentRef}></div>
    </div>
  );
};

export default PrintContent;
