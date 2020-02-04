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
  const {
    areaResults,
    distanceResults,
    coordinateMouseClickResults,
    coordinatePointerMoveResults
  } = useSelector((state: RootState) => state.appState.measureContent.results);

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
    mapController.getCoordinates(false);
  };

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
        setNewMeasure: false
      });
      mapController.setSpecificMeasureWidget({
        measureByDistance: true,
        setNewMeasure: true,
        unitOfLength: selectedDropDownOption
      });
    }
  };

  const setActiveOption = ({
    areaButton,
    distanceButton,
    coordinatesButton
  }: {
    areaButton: boolean;
    distanceButton: boolean;
    coordinatesButton: boolean;
  }): void => {
    mapController.getCoordinates(false);
    mapController.setSpecificMeasureWidget({
      setNewMeasure: false
    });
    dispatch(
      setMeasureButton({
        areaButton,
        distanceButton,
        coordinatesButton
      })
    );

    if (coordinatesButton) {
      mapController.getCoordinates(true);
    } else {
      mapController.setSpecificMeasureWidget({
        measureByDistance: distanceButton ? true : false,
        setNewMeasure: true,
        unitOfLength: ''
      });
    }
  };

  const setAreaOption = (): void => {
    if (areaButton) {
      resetWidget();
    } else {
      setActiveOption({
        areaButton: true,
        distanceButton: false,
        coordinatesButton: false
      });
      setSelectedDropdown(areaUnitsOfLength);
    }
  };

  const setDistanceOption = (): void => {
    if (distanceButton) {
      resetWidget();
    } else {
      setActiveOption({
        areaButton: false,
        distanceButton: true,
        coordinatesButton: false
      });
      setSelectedDropdown(distanceUnitsOfLength);
    }
  };

  const setLatLongOption = (): void => {
    if (coordinatesButton) {
      resetWidget();
    } else {
      setActiveOption({
        coordinatesButton: true,
        distanceButton: false,
        areaButton: false
      });
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

  const returnMeasurementResults = (): any => {
    if (areaButton) {
      return (
        <>
          <p>Area: {areaResults?.area}</p>
          <p>Perimeter: {areaResults?.perimeter}</p>
        </>
      );
    }

    if (distanceButton) {
      return (
        <>
          <p>Distance: {distanceResults?.length}</p>
        </>
      );
    }

    if (coordinatesButton) {
      return (
        <>
          <p>Coordinate results</p>
          <p>
            <strong>Mouse click</strong>
          </p>
          <p>Latitude: {coordinateMouseClickResults?.latitude}</p>
          <p>Longitude: {coordinateMouseClickResults?.longitude}</p>
          <br />

          <p>
            <strong>Pointer move</strong>
          </p>
          <p>Latitude: {coordinatePointerMoveResults?.latitude}</p>
          <p>Longitude: {coordinatePointerMoveResults?.longitude}</p>
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
