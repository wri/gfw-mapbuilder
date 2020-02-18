import React from 'react';

interface DMSFormValues {
  // TODO - import from coordinatesForm.tsx
  rowNum: number;
  latitude: number;
  longitude: number;
}

interface DDSection {
  ddSection: {
    rowNum: number;
    latitude: number;
    longitude: number;
  };
  degreeSymbol: string;
  setDDFormValues: (formValues: DMSFormValues) => void;
}

export default function DDSection(props: DDSection): JSX.Element {
  const { ddSection, degreeSymbol } = props;
  const { rowNum, latitude, longitude } = ddSection;

  return (
    <>
      <div className="dds-wrapper">
        <div className="dds-input">
          <p>{latitude}</p>
          <div className="degree-input">
            <input type="number" name="latitude coordinates" />
            <span>{degreeSymbol}</span>
          </div>
        </div>
        <div className="dds-input">
          <p>{longitude}</p>
          <div className="degree-input">
            <input type="number" name="longitude coordinates" />
            <span>{degreeSymbol}</span>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}
