import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { printContent } from '../../../../../configs/modal.config';

const PrintContent: FunctionComponent = () => {
  const selectedLanguage = useSelector(
    (state: any) => state.appState.selectedLanguage
  );
  const { buttonLabel } = printContent[selectedLanguage];

  return (
    <div className="modal-content-container">
      <div className="directions">
        <p>{buttonLabel}</p>
      </div>
    </div>
  );
};

export default PrintContent;
