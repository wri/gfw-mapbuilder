import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { shareContent } from '../../../../../configs/modal.config';

const ShareContent: FunctionComponent = () => {
  const selectedLanguage = useSelector(
    (state: any) => state.appState.selectedLanguage
  );
  const { title, instructions } = shareContent[selectedLanguage];

  return (
    <div className="modal-content-container">
      <div className="directions">
        <h4 className="title">{title}</h4>
        {/* <h4 className="title">Share this view</h4> */}
        <p>{instructions}</p>
      </div>
    </div>
  );
};

export default ShareContent;
