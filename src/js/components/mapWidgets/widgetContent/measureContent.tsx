import React, { FunctionComponent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  setMeasureButton,
  setMeasureResults,
  setActiveMeasureButton
} from 'js/store/appState/actions';

import { mapController } from 'js/controllers/mapController';

import {
  convertCoordinates,
  convertSquareMetersToSpecificUnit,
  convertMetersToSpecificUnit
} from 'js/utils/helper.util';
import { measureContent } from 'configs/modal.config';

import { RootState } from 'js/store/index';

import 'css/measureContent.scss';

interface SpecificDropDownOption {
  text: string;
  esriUnit: string;
}

const MeasureContent: FunctionComponent = () => {
  const {
    activeButton,
    areaButtonActive,
    distanceButtonActive,
    coordinatesButtonActive
  } = useSelector(
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

  const {
    defaultOption,
    areaUnitsOfLength,
    distanceUnitsOfLength,
    latitudeLongitudeUnits
  } = measureContent[selectedLanguage];

  const [selectedAreaUnit, setSelectedAreaUnit] = useState(
    areaUnitsOfLength[0].esriUnit
  );
  const [selectedDistanceUnit, setSelectedDistanceUnit] = useState(
    distanceUnitsOfLength[0].esriUnit
  );
  const [selectedCoordinatesUnit, setSelectedCoordinatesUnit] = useState(
    latitudeLongitudeUnits[0].esriUnit
  );
  const dispatch = useDispatch();

  const setMeasurementUnit = (selectedUnit: string): void => {
    // * NOTE - if true, clears measurement
    // * and enables selected measurement, while
    // * passing in the selected measurement unit

    if (activeButton === 'area') {
      setSelectedAreaUnit(selectedUnit);
      // const convertedArea = convertSquareMetersToSpecificUnit(
      //   areaResults?.area,
      //   selectedUnit
      // );
      // const convertedPerimeter = convertSquareMetersToSpecificUnit(
      //   areaResults?.perimeter,
      //   selectedUnit
      // );
      // dispatch(
      //   setMeasureResults({
      //     areaResults: { area: convertedArea, perimeter: convertedPerimeter }
      //   })
      // );
      // mapController.setSpecificMeasureWidget({
      //   // measureByDistance: false,
      //   setNewMeasure: false
      // });
      // mapController.setSpecificMeasureWidget({
      //   measureByDistance: false,
      //   setNewMeasure: true,
      //   unitOfLength: selectedUnit
      // });
    } else if (activeButton === 'distance') {
      setSelectedDistanceUnit(selectedUnit);
      // const convertedLength = convertMetersToSpecificUnit(
      //   distanceResults?.length,
      //   selectedUnit
      // );
      // dispatch(
      //   setMeasureResults({
      //     distanceResults: { length: convertedLength }
      //   })
      // );
      // mapController.setSpecificMeasureWidget({
      //   setNewMeasure: false
      // });
      // mapController.setSpecificMeasureWidget({
      //   measureByDistance: true,
      //   setNewMeasure: true,
      //   unitOfLength: selectedUnit
      // });
    } else if (activeButton === 'coordinates') {
      setSelectedCoordinatesUnit(selectedUnit);
      mapController.setActiveMeasureWidget(activeButton, selectedUnit);
      // console.log('coordinateMouseClickResults', coordinateMouseClickResults);
      // const convertedCoordinates = convertCoordinates(
      //   selectedUnit,
      //   coordinateMouseClickResults
      // );
      // dispatch(
      //   setMeasureResults({
      //     coordinateMouseClickResults: convertedCoordinates
      //   })
      // );
      // mapController.setCoordinates(selectedUnit === 'dms' ? true : false);
    }
  };

  const returnMeasurementResults = (): any => {
    // * NOTE - later one we'll want a message saying;
    // * 'select option to see results'
    // * when everything is toggled OFF
    if (activeButton === 'area') {
      return (
        <>
          <p>
            <strong>Area: </strong> {areaResults?.area}
          </p>
          <p>
            <strong>Perimeter: </strong>
            {areaResults?.perimeter}
          </p>
        </>
      );
    }

    if (activeButton === 'distance') {
      return (
        <>
          <p>
            <strong>Distance Results: </strong>
            {distanceResults?.length}
          </p>
        </>
      );
    }

    if (activeButton === 'coordinates') {
      return (
        <>
          <p>
            <strong>Coordinate results</strong>
          </p>
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

  const returnDropdown = (): Array<[]> | Array<JSX.Element> => {
    let selectedDropdown = [];

    switch (activeButton) {
      case 'area':
        selectedDropdown = areaUnitsOfLength;
        break;
      case 'distance':
        selectedDropdown = distanceUnitsOfLength;
        break;
      case 'coordinates':
        selectedDropdown = latitudeLongitudeUnits;
        break;
      default:
        selectedDropdown = defaultOption;
        break;
    }

    return selectedDropdown.map(
      (lengthUnit: SpecificDropDownOption, index: number) => {
        const { text, esriUnit } = lengthUnit;

        return (
          <option value={esriUnit} key={index}>
            {text}
          </option>
        );
      }
    );
  };

  const setSelectedWidget = (optionType: string): void => {
    switch (optionType) {
      case 'area':
        mapController.setActiveMeasureWidget(optionType, selectedAreaUnit);
        break;
      case 'distance':
        mapController.setActiveMeasureWidget(optionType, selectedDistanceUnit);
        break;
      case 'coordinates':
        mapController.setActiveMeasureWidget(
          optionType,
          selectedCoordinatesUnit
        );
        break;
      case '':
        // setSelectedDropdownOption('');
        break;
      default:
        break;
    }
  };

  const setOption = (optionType: string): void => {
    mapController.clearAllWidgets();
    if (activeButton === optionType) {
      dispatch(setActiveMeasureButton(''));
    } else {
      dispatch(setActiveMeasureButton(optionType));
      setSelectedWidget(optionType);
    }
  };

  const returnValue = (): string => {
    switch (activeButton) {
      case 'area':
        return selectedAreaUnit;
      case 'distance':
        return selectedDistanceUnit;
      case 'coordinates':
        return selectedCoordinatesUnit;
      default:
        return '';
    }
  };

  return (
    <div className="measure-options-container">
      <div className="buttons-select-wrapper">
        <button
          onClick={(): void => setOption('area')}
          className={`esri-icon-measure-area ${
            areaButtonActive ? 'selected' : ''
          }`}
        />
        <button
          onClick={(): void => setOption('distance')}
          className={`esri-icon-measure ${
            distanceButtonActive ? 'selected' : ''
          }`}
        />
        <button
          onClick={(): void => setOption('coordinates')}
          className={`esri-icon-maps ${
            coordinatesButtonActive ? 'selected' : ''
          }`}
        />
        <span>|</span>
        <select
          value={returnValue()}
          onChange={(e): void => setMeasurementUnit(e.target.value)}
          onBlur={(): void => console.log('Bonjour, onBlur!')}
          disabled={activeButton === '' ? true : false}
        >
          {returnDropdown()}
        </select>
      </div>
      <p>Measurement Result</p>
      <hr />
      {returnMeasurementResults()}
    </div>
  );
};

export default MeasureContent;
