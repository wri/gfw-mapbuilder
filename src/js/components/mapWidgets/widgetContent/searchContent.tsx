import React, {
  FunctionComponent,
  useRef,
  useEffect,
  useState,
  ChangeEvent
} from 'react';
import { useSelector } from 'react-redux';

import { mapController } from 'js/controllers/mapController';

import { RootState } from 'js/store/index';

import { searchContent } from '../../../../../configs/modal.config';

const SearchContent: FunctionComponent = () => {
  const searchRef = useRef(null);
  const [latitudeInput, setLatitude] = useState('');
  const [longitudeInput, setLongitude] = useState('');
  const selectedLanguage = useSelector(
    (state: RootState) => state.appState.selectedLanguage
  );
  const { title, buttonTitle, latitude, longitude } = searchContent[
    selectedLanguage
  ];

  useEffect(() => {
    mapController.initializeSearchWidget(searchRef);
  }, [searchRef]);

  const setSearch = (): void => {
    mapController.setSearchWidget(latitudeInput, longitudeInput);
  };

  return (
    <div className="modal-content-container">
      <div className="directions">
        <div className="form-wrapper">
          <label htmlFor={latitude}>{latitude}:</label>
          <input
            value={latitudeInput}
            id={latitude}
            type="number"
            className="input-coordinates"
            onChange={(e: ChangeEvent<HTMLInputElement>): void =>
              setLatitude(e.target.value)
            }
          />

          <label htmlFor={longitude}>{longitude}:</label>
          <input
            value={longitudeInput}
            id={longitude}
            type="number"
            className="input-coordinates"
            onChange={(e: ChangeEvent<HTMLInputElement>): void =>
              setLongitude(e.target.value)
            }
          />
          <button
            className="orange-button custom-dimensions"
            onClick={setSearch}
          >
            {buttonTitle}
          </button>
        </div>
      </div>
      <div className="search-widget-wrapper">
        <p>{title}</p>
        <div ref={searchRef}></div>
      </div>
    </div>
  );
};

export default SearchContent;
