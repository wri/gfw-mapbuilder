import React, { FunctionComponent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setMeasureButton } from 'js/store/appState/actions';

import { mapController } from 'js/controllers/mapController';

import { measureContent } from 'configs/modal.config';

import { RootState } from 'js/store/index';

import 'css/measureContent.scss';

interface SpecificDropDownOption {
  text: string;
  esriUnit: string;
}

const MeasureContent: FunctionComponent = () => {
  const { areaButton, distanceButton, coordinatesButton } = useSelector(
    (state: RootState) => state.appState.measureContent.toggleButton
  );
  const selectedLanguage = useSelector(
    (state: RootState) => state.appState.selectedLanguage
  );
  const [selectedDropdown, setSelectedDropdown] = useState([]);
  const {
    areaUnitsOfLength,
    distanceUnitsOfLength,
    latitudeLongitudeUnits
  } = measureContent[selectedLanguage];
  const dispatch = useDispatch();

  const setMeasurementUnit = (selectedDropDownOption: string): void => {
    if (areaButton) {
      mapController.setSpecificMeasureWidget({
        measureByDistance: false,
        setNewMeasure: false
      });
      mapController.setSpecificMeasureWidget({
        measureByDistance: false,
        setNewMeasure: true,
        unitOfLength: selectedDropDownOption
      });
    }

    if (distanceButton) {
      mapController.setSpecificMeasureWidget({
        measureByDistance: true,
        setNewMeasure: false
      });
      mapController.setSpecificMeasureWidget({
        measureByDistance: true,
        setNewMeasure: true,
        unitOfLength: selectedDropDownOption
      });
    }
  };

  const toggleButtonsOff = (): void => {
    dispatch(
      setMeasureButton({
        areaButton: false,
        distanceButton: false,
        coordinatesButton: false
      })
    );
  };

  const setAreaOption = (): void => {
    mapController.setSpecificMeasureWidget({
      measureByDistance: false,
      setNewMeasure: false
    });
    toggleButtonsOff();
    if (areaButton) {
      dispatch(
        setMeasureButton({
          areaButton: false
        })
      );
      setSelectedDropdown([]);
      mapController.setSpecificMeasureWidget({ measureByDistance: false });
    } else {
      dispatch(
        setMeasureButton({
          areaButton: true
        })
      );
      setSelectedDropdown(areaUnitsOfLength);
      mapController.setSpecificMeasureWidget({
        measureByDistance: false,
        setNewMeasure: true,
        unitOfLength: ''
      });
    }
  };

  const setDistanceOption = (): void => {
    mapController.setSpecificMeasureWidget({
      measureByDistance: true,
      setNewMeasure: false
    });
    toggleButtonsOff();
    if (distanceButton) {
      dispatch(
        setMeasureButton({
          distanceButton: false
        })
      );
      setSelectedDropdown([]);
    } else {
      dispatch(
        setMeasureButton({
          distanceButton: true
        })
      );
      setSelectedDropdown(distanceUnitsOfLength);
      mapController.setSpecificMeasureWidget({
        measureByDistance: true,
        setNewMeasure: true,
        unitOfLength: ''
      });
    }
  };

  const setLatLongOption = (): void => {
    toggleButtonsOff();
    if (coordinatesButton) {
      dispatch(
        setMeasureButton({
          coordinatesButton: false
        })
      );
      setSelectedDropdown([]);
    } else {
      dispatch(
        setMeasureButton({
          coordinatesButton: true
        })
      );
      setSelectedDropdown(latitudeLongitudeUnits);
    }
  };

  const returnDropdownOptions = (): JSX.Element[] => {
    return selectedDropdown.map(
      (lengthUnit: SpecificDropDownOption, index: number) => {
        const { text, esriUnit } = lengthUnit;

        return (
          <>
            <option value={esriUnit} key={index}>
              {text}
            </option>
          </>
        );
      }
    );
  };

  return (
    <div className="measure-options-container">
      <div className="buttons-select-wrapper">
        <button
          onClick={(): void => setAreaOption()}
          className={`esri-icon-measure-area ${areaButton ? 'selected' : ''}`}
        />
        <button
          onClick={(): void => setDistanceOption()}
          className={`esri-icon-measure ${distanceButton ? 'selected' : ''}`}
        />
        <button
          onClick={(): void => setLatLongOption()}
          className={`esri-icon-maps ${coordinatesButton ? 'selected' : ''}`}
        />
        <span>|</span>
        <select
          onBlur={(e): void => setMeasurementUnit(e.target.value)}
          disabled={selectedDropdown.length > 0 ? false : true}
        >
          {selectedDropdown.length === 0 && (
            <option defaultValue="Unit">Unit</option>
          )}
          {returnDropdownOptions()}
        </select>
      </div>
      <p>Measurement Result</p>
      <hr />
    </div>
  );
};

export default MeasureContent;
