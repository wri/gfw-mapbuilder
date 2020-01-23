import React, { FunctionComponent, useState } from 'react';
import { useSelector } from 'react-redux';

import { coordinatesContent } from '../../../../../configs/modal.config';

const CoordinatesForm: FunctionComponent = () => {
  const [selectedFormat, setSelectedFormat] = useState(0);
  const selectedLanguage = useSelector(
    (state: any) => state.appState.selectedLanguage
  );
  const { title, dropdownTitle, decimalOptions } = coordinatesContent[
    selectedLanguage
  ];

  const returnSelectedContent = () => {
    if (decimalOptions[selectedFormat].includes('DMS')) {
      return (
        <>
          <p>Latitude</p>
          <input type="number" name="latitude coordinates" />°
          <input type="number" name="latitude coordinates" />'
          <input type="number" name="latitude coordinates" />
          ''
          <select onChange={e => console.log('hmmm', e.target.value)}>
            <option value="N">N</option>
            <option value="S">S</option>
          </select>
          <p>Longitude</p>
          <input type="number" name="longitude coordinates" />°
          <input type="number" name="longitude coordinates" />'
          <input type="number" name="longitude coordinates" />
          ''
          <select>
            <option value="E">E</option>
            <option value="W">W</option>
          </select>
          <br />
          ________________________________________________
          <br />
          <p>Latitude</p>
          <input type="number" name="latitude coordinates" />°
          <input type="number" name="latitude coordinates" />'
          <input type="number" name="latitude coordinates" />
          ''
          <select>
            <option value="N">N</option>
            <option value="S">S</option>
          </select>
          <p>Longitude</p>
          <input type="number" name="longitude coordinates" />°
          <input type="number" name="longitude coordinates" />'
          <input type="number" name="longitude coordinates" />
          ''
          <select>
            <option value="E">E</option>
            <option value="W">W</option>
          </select>
          <br />
          ________________________________________________
          <br />
          <p>Latitude</p>
          <input type="number" name="latitude coordinates" />°
          <input type="number" name="latitude coordinates" />'
          <input type="number" name="latitude coordinates" />
          ''
          <select>
            <option value="N">N</option>
            <option value="S">S</option>
          </select>
          <p>Longitude</p>
          <input type="number" name="longitude coordinates" />°
          <input type="number" name="longitude coordinates" />'
          <input type="number" name="longitude coordinates" />
          ''
          <select>
            <option value="E">E</option>
            <option value="W">W</option>
          </select>
          <br />
          ________________________________________________
          <br />
        </>
      );
    } else {
      return (
        <>
          <div className="dds-wrapper">
            <p>Latitude</p>
            <input type="number" name="latitude coordinates" />°<p>Longitude</p>
            <input type="number" name="longitude coordinates" />°
          </div>
          <br />
          ________________________________________________
          <br />
          <div className="dds-wrapper">
            <p>Latitude</p>
            <input type="number" name="latitude coordinates" />°<p>Longitude</p>
            <input type="number" name="longitude coordinates" />°
          </div>
          <br />
          ________________________________________________
          <br />
          <div className="dds-wrapper">
            <p>Latitude</p>
            <input type="number" name="latitude coordinates" />°<p>Longitude</p>
            <input type="number" name="longitude coordinates" />°
          </div>
          <br />
          ________________________________________________
          <br />
        </>
      );
    }
  };

  return (
    <div className="modal-content-container">
      <div className="directions">
        <h4 className="title">{title}</h4>
        <p>{dropdownTitle}</p>
        <select onChange={e => setSelectedFormat(Number(e.target.value))}>
          {decimalOptions.map((option: String, index: number) => (
            <option value={index} key={index}>
              {option}
            </option>
          ))}
        </select>
        <br />
        ________________________________________________
        <br />
        {returnSelectedContent()}
      </div>
    </div>
  );
};

export default CoordinatesForm;
