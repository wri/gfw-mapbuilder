import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../js/store/index';
import { DDSectionProps } from '../../../../js/types/coordinateForm';
import { coordinatesContent } from '../../../../../configs/translations/modal.tanslations';
import { TrashCanIcon } from '../../../../images/trashCanIcon';

export default function DDSection(props: DDSectionProps): JSX.Element {
  const selectedLanguage = useSelector((state: RootState) => state.appState.selectedLanguage);
  const { latitudeLabel, longitudeLabel } = coordinatesContent[selectedLanguage];

  const { ddSection, degreeSymbol, renderRemoveButton, setSection, setDDFormValues } = props;
  const { rowNum, latitude, longitude } = ddSection;

  return (
    <>
      {renderRemoveButton && (
        <button onClick={(): void => setSection(false)} className="remove-button">
          REMOVE <TrashCanIcon height={20} width={20} fill={'#555'} />
        </button>
      )}
      <div className="dds-wrapper">
        <div className="degree-section">
          <span>{latitudeLabel}</span>

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
          <span>{longitudeLabel}</span>

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
