import React, { FunctionComponent, useState } from 'react';
import { useSelector } from 'react-redux';

import { coordinatesContent } from '../../../../../configs/modal.config';

import '../../../../css/CoordinatesForm';

const CoordinatesForm: FunctionComponent = () => {
  const [selectedFormat, setSelectedFormat] = useState(0);
  const selectedLanguage = useSelector(
    (state: any) => state.appState.selectedLanguage
  );

  const { degree, apostrophe, quotes } = coordinatesContent;
  const {
    title,
    dropdownTitle,
    decimalOptions,
    latitude,
    longitude
  } = coordinatesContent[selectedLanguage];

  const returnSelectedContent = () => {
    if (decimalOptions[selectedFormat].includes('DMS')) {
      return (
        <>
          <div className="dms-wrapper">
            <span>{latitude}</span>
            <div className="input-wrapper">
              <input type="number" name="latitude coordinates" />
              <span className="degree">{degree}</span>
              <input type="number" name="latitude coordinates" />
              <span className="degree">{apostrophe}</span>
              <input type="number" name="latitude coordinates" />
              <span className="degree">{quotes}</span>
              <select onChange={e => console.log('hmmm', e.target.value)}>
                <option value="N">N</option>
                <option value="S">S</option>
              </select>
            </div>
          </div>
          <div className="dms-wrapper">
            <span>{longitude}</span>
            <div className="input-wrapper">
              <input type="number" name="latitude coordinates" />
              <span className="degree">{degree}</span>
              <input type="number" name="latitude coordinates" />
              <span className="degree">{apostrophe}</span>
              <input type="number" name="latitude coordinates" />
              <span className="degree">{quotes}</span>
              <select onChange={e => console.log('hmmm', e.target.value)}>
                <option value="E">E</option>
                <option value="W">W</option>
              </select>
            </div>
          </div>
          <hr />
          <div className="dms-wrapper">
            <span>{latitude}</span>
            <div className="input-wrapper">
              <input type="number" name="latitude coordinates" />
              <span className="degree">{degree}</span>
              <input type="number" name="latitude coordinates" />
              <span className="degree">{apostrophe}</span>
              <input type="number" name="latitude coordinates" />
              <span className="degree">{quotes}</span>
              <select onChange={e => console.log('hmmm', e.target.value)}>
                <option value="N">N</option>
                <option value="S">S</option>
              </select>
            </div>
          </div>
          <div className="dms-wrapper">
            <span>{longitude}</span>
            <div className="input-wrapper">
              <input type="number" name="latitude coordinates" />
              <span className="degree">{degree}</span>
              <input type="number" name="latitude coordinates" />
              <span className="degree">{apostrophe}</span>
              <input type="number" name="latitude coordinates" />
              <span className="degree">{quotes}</span>
              <select onChange={e => console.log('hmmm', e.target.value)}>
                <option value="E">E</option>
                <option value="W">W</option>
              </select>
            </div>
          </div>
          <hr />
          <div className="dms-wrapper">
            <span>{latitude}</span>
            <div className="input-wrapper">
              <input type="number" name="latitude coordinates" />
              <span className="degree">{degree}</span>
              <input type="number" name="latitude coordinates" />
              <span className="degree">{apostrophe}</span>
              <input type="number" name="latitude coordinates" />
              <span className="degree">{quotes}</span>
              <select onChange={e => console.log('hmmm', e.target.value)}>
                <option value="N">N</option>
                <option value="S">S</option>
              </select>
            </div>
          </div>
          <div className="dms-wrapper">
            <span>{longitude}</span>
            <div className="input-wrapper">
              <input type="number" name="latitude coordinates" />
              <span className="degree">{degree}</span>
              <input type="number" name="latitude coordinates" />
              <span className="degree">{apostrophe}</span>
              <input type="number" name="latitude coordinates" />
              <span className="degree">{quotes}</span>
              <select onChange={e => console.log('hmmm', e.target.value)}>
                <option value="E">E</option>
                <option value="W">W</option>
              </select>
            </div>
          </div>
          <hr />
          <div className="buttons-wrapper">
            <button>Add more</button>
            <button className="orange-button">Make shape</button>
          </div>
        </>
      );
    }

    if (decimalOptions[selectedFormat].includes('DD')) {
      return (
        <>
          <div className="dds-wrapper">
            <div className="dds-input">
              <p>{latitude}</p>
              <div className="degree-input">
                <input type="number" name="latitude coordinates" />
                <span>{degree}</span>
              </div>
            </div>
            <div className="dds-input">
              <p>{longitude}</p>
              <div className="degree-input">
                <input type="number" name="longitude coordinates" />
                <span>{degree}</span>
              </div>
            </div>
          </div>
          <hr />
          {/* <div className="dds-wrapper">
            <div className="dds-input">
              <p>{latitude}</p>
              <div className="degree-input">
                <input type="number" name="latitude coordinates" />
                <span>{degree}</span>
              </div>
            </div>
            <div className="dds-input">
              <p>{longitude}</p>
              <div className="degree-input">
                <input type="number" name="longitude coordinates" />
                <span>{degree}</span>
              </div>
            </div>
          </div>
          <hr />
          <div className="dds-wrapper">
            <div className="dds-input">
              <p>{latitude}</p>
              <div className="degree-input">
                <input type="number" name="latitude coordinates" />
                <span>{degree}</span>
              </div>
            </div>
            <div className="dds-input">
              <p>{longitude}</p>
              <div className="degree-input">
                <input type="number" name="longitude coordinates" />
                <span>{degree}</span>
              </div>
            </div>
          </div> */}
          <hr />
        </>
      );
    }
  };

  return (
    <div className="coordinates-form-container">
      <div className="directions">
        <div className="titles">
          <h4 className="title">{title}</h4>
          <p>{dropdownTitle}</p>
        </div>
        <select onChange={e => setSelectedFormat(Number(e.target.value))}>
          {decimalOptions.map((option: String, index: number) => (
            <option value={index} key={index}>
              {option}
            </option>
          ))}
        </select>
        <hr />
        {returnSelectedContent()}
      </div>
    </div>
  );
};

export default CoordinatesForm;
