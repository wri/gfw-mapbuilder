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
  const { areaResults, distanceResults, coordinatesResults } = useSelector(
    (state: RootState) => state.appState.measureContent.results
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

  const resetWidget = (): void => {
    dispatch(
      setMeasureButton({
        areaButton: false,
        distanceButton: false,
        coordinatesButton: false
      })
    );
    setSelectedDropdown([]);
    mapController.setSpecificMeasureWidget({ setNewMeasure: false });
  };

  const setMeasurementUnit = (selectedDropDownOption: string): void => {
    // resetWidget();
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

  const setAreaOption = (): void => {
    if (areaButton) {
      resetWidget();
    } else {
      mapController.setSpecificMeasureWidget({
        setNewMeasure: false
      });
      dispatch(
        setMeasureButton({
          areaButton: true,
          distanceButton: false,
          coordinatesButton: false
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
    if (distanceButton) {
      resetWidget();
    } else {
      mapController.setSpecificMeasureWidget({
        setNewMeasure: false
      });
      dispatch(
        setMeasureButton({
          distanceButton: true,
          areaButton: false,
          coordinatesButton: false
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
    console.log('setLatLongOption', coordinatesButton);
    if (coordinatesButton) {
      resetWidget();
      mapController.getCoordinates(false);
    } else {
      dispatch(
        setMeasureButton({
          coordinatesButton: true,
          distanceButton: false,
          areaButton: false
        })
      );
      setSelectedDropdown(latitudeLongitudeUnits);
      mapController.getCoordinates(true);
      mapController.setSpecificMeasureWidget({
        setNewMeasure: false
      });
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

  const returnMeasurementResults = (): any => {
    if (areaButton) {
      console.log('areaResults', areaResults);
      return (
        <>
          <p>Area: {areaResults?.area}</p>
          <p>Perimeter: {areaResults?.perimeter}</p>
        </>
      );
    }

    if (distanceButton) {
      console.log('distanceResults', distanceResults);
      return (
        <>
          <p>Distance: {distanceResults?.length}</p>
        </>
      );
    }

    if (coordinatesButton) {
      console.log('coordinatesResults', coordinatesResults);
      return (
        <>
          <p>Coordinate results</p>
        </>
      );
    }
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
      {returnMeasurementResults()}
    </div>
  );
};

export default MeasureContent;
