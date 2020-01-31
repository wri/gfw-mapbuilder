import React, { FunctionComponent } from 'react';

import 'css/measureContent.scss';

interface SpecificDropDownOption {
  text: string;
  esriUnit: string;
}

const MeasureContent: FunctionComponent = () => {
  const returnDropdownOptions = (): JSX.Element[] => {
    return [].map((lengthUnit: SpecificDropDownOption, index: number) => {
      const { text, esriUnit } = lengthUnit;

      return (
        <>
          <option value={esriUnit} key={index}>
            {text}
          </option>
        </>
      );
    });
  };

  const setAreaOption = (): void => {
    console.log('setAreaOption');
  };

  const setDistanceOption = (): void => {
    console.log('setDistanceOption');
  };

  const setLatLongOption = (): void => {
    console.log('setLatLongOption');
  };

  return (
    <div className="measure-options-container">
      <div className="buttons-select-wrapper">
        <button
          onClick={(): void => setAreaOption()}
          className="esri-icon-measure-area"
        />
        <button
          onClick={(): void => setDistanceOption()}
          className="esri-icon-measure"
        />
        <button
          onClick={(): void => setLatLongOption()}
          className="esri-icon-maps"
        />
        <span>|</span>
        <select
          onBlur={(e): void => console.log(e.target.value)}
          disabled={[].length ? false : true}
        >
          {[].length === 0 && <option defaultValue="Unit">Unit</option>}
          {returnDropdownOptions()}
        </select>
      </div>
      <p>Measurement Result</p>
      <hr />
    </div>
  );
};

export default MeasureContent;
