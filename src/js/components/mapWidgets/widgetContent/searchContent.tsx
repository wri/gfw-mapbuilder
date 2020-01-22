import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { searchContent } from '../../../../../configs/modal.config';

const SearchContent: FunctionComponent = () => {
  const selectedLanguage = useSelector(
    (state: any) => state.appState.selectedLanguage
  );

  const { title, buttonTitle, latitude, longitude } = searchContent[
    selectedLanguage
  ];
  return (
    <div className="modal-content-container">
      <div className="directions">
        <div>
          <span>{latitude}:</span>
          <span>{longitude}</span>
          <button>{buttonTitle}</button>
        </div>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default SearchContent;
