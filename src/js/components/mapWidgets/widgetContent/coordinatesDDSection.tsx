import React from 'react';

import { DDSectionProps } from 'js/interfaces/coordinateForm';

import { ReactComponent as TrashCanIcon } from 'images/trashCanIcon.svg';

export default function DDSection(props: DDSectionProps): JSX.Element {
  const {
    ddSection,
    degreeSymbol,
    renderRemoveButton,
    setSection,
    setDDFormValues
  } = props;
  const { rowNum, latitude, longitude } = ddSection;

  return (
    <>
      {renderRemoveButton && (
        <button
          onClick={(): void => setSection(false)}
          className="remove-button"
        >
          REMOVE <TrashCanIcon height={20} width={20} fill={'#555'} />
        </button>
      )}
      <div className="dds-wrapper">
        <div className="degree-section">
          <span>Latitude</span>

          <div className="input-wrapper">
            <input
              type="number"
              name="latitude coordinates"
              value={latitude}
              min={-90}
              max={90}
              onChange={(e): void =>
                setDDFormValues({
                  userInput: e.target.value,
                  rowNum,
                  coordinateType: 'latitude'
                })
              }
            />
            <span>{degreeSymbol}</span>
          </div>
        </div>
        <div className="degree-section">
          <span>Longitude</span>

          <div className="input-wrapper">
            <input
              type="number"
              name="longitude coordinates"
              value={longitude}
              min={-180}
              max={180}
              onChange={(e): void =>
                setDDFormValues({
                  userInput: e.target.value,
                  rowNum,
                  coordinateType: 'longitude'
                })
              }
            />
            <span>{degreeSymbol}</span>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}
