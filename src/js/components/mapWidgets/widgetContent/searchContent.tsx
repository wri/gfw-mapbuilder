import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'js/store/index';

import { searchContent } from '../../../../../configs/modal.config';

const SearchContent: FunctionComponent = () => {
  const selectedLanguage = useSelector(
    (state: RootState) => state.appState.selectedLanguage
  );

  const { title, buttonTitle, latitude, longitude } = searchContent[
    selectedLanguage
  ];
  return (
    <div className="modal-content-container">
      <div className="directions">
        <div className="form-wrapper">
          <label htmlFor={latitude}>{latitude}:</label>
          <input id={latitude} type="number" className="input-coordinates" />

          <label htmlFor={longitude}>{longitude}:</label>
          <input id={longitude} type="number" className="input-coordinates" />
          <button className="orange-button custom-dimensions">
            {buttonTitle}
          </button>
        </div>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default SearchContent;
