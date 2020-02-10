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
  const [selectedDropdownOption, setSelectedDropdownOption] = useState('');

  const {
    areaUnitsOfLength,
    distanceUnitsOfLength,
    latitudeLongitudeUnits
  } = measureContent[selectedLanguage];
  const dispatch = useDispatch();

  const resetWidget = (): void => {
    // dispatch(
    //   setMeasureButton({
    //     areaButtonActive: false,
    //     distanceButtonActive: false,
    //     coordinatesButtonActive: false
    //   })
    // );
    // setSelectedDropdownOption('');
    // mapController.setSpecificMeasureWidget({ setNewMeasure: false });
    // mapController.clearCoordinates();
  };

  const setMeasurementUnit = (selectedUnit: string): void => {
    setSelectedDropdownOption(selectedUnit);
    // * NOTE - if true, clears measurement
    // * and enables selected measurement, while
    // * passing in the selected measurement unit

    if (areaButtonActive) {
      const convertedArea = convertSquareMetersToSpecificUnit(
        areaResults?.area,
        selectedUnit
      );

      const convertedPerimeter = convertSquareMetersToSpecificUnit(
        areaResults?.perimeter,
        selectedUnit
      );

      dispatch(
        setMeasureResults({
          areaResults: { area: convertedArea, perimeter: convertedPerimeter }
        })
      );

      mapController.setSpecificMeasureWidget({
        // measureByDistance: false,
        setNewMeasure: false
      });
      mapController.setSpecificMeasureWidget({
        measureByDistance: false,
        setNewMeasure: true,
        unitOfLength: selectedUnit
      });
    }

    if (distanceButtonActive) {
      const convertedLength = convertMetersToSpecificUnit(
        distanceResults?.length,
        selectedUnit
      );

      dispatch(
        setMeasureResults({
          distanceResults: { length: convertedLength }
        })
      );

      mapController.setSpecificMeasureWidget({
        setNewMeasure: false
      });
      mapController.setSpecificMeasureWidget({
        measureByDistance: true,
        setNewMeasure: true,
        unitOfLength: selectedUnit
      });
    }

    if (coordinatesButtonActive) {
      console.log('coordinateMouseClickResults', coordinateMouseClickResults);
      const convertedCoordinates = convertCoordinates(
        selectedUnit,
        coordinateMouseClickResults
      );

      dispatch(
        setMeasureResults({
          coordinateMouseClickResults: convertedCoordinates
        })
      );
      mapController.setCoordinates(selectedUnit === 'dms' ? true : false);
    }
  };

  const setActiveOption = ({
    areaButtonActive,
    distanceButtonActive,
    coordinatesButtonActive
  }: {
    areaButtonActive: boolean;
    distanceButtonActive: boolean;
    coordinatesButtonActive: boolean;
  }): void => {
    // * NOTE - when an option is set to active,
    // * we're clearing coordinates/measurement widgets
    // * before implementing logic to maintain the Redux store
    // * and setting the measure, area or coordinate widget
    mapController.clearCoordinates();
    mapController.setSpecificMeasureWidget({
      setNewMeasure: false
    });
    dispatch(
      setMeasureButton({
        areaButtonActive,
        distanceButtonActive,
        coordinatesButtonActive
      })
    );

    if (coordinatesButtonActive) {
      mapController.setCoordinates(
        selectedDropdownOption === 'dms' ? true : false
      );
    } else {
      mapController.setSpecificMeasureWidget({
        measureByDistance: distanceButtonActive ? true : false,
        setNewMeasure: true,
        unitOfLength: ''
      });
    }
  };

  const setAreaOption = (): void => {
    // if (areaButtonActive) {
    //   // check activeMeasureOption.length < 1
    //   // check what's active and what is set to
    //   resetWidget(); //setActiveMeasureOption('')
    // } else {
    //   // dispatch setActiveMeasureOption('areaWidget')
    //   setActiveOption({
    //     // ? should we refactor to dynamically set other 2 properties to false
    //     areaButtonActive: true,
    //     distanceButtonActive: false,
    //     coordinatesButtonActive: false
    //   });
    //   setSelectedDropdownOption(areaUnitsOfLength[0].text);
    // }
  };

  const setDistanceOption = (): void => {
    // if (distanceButtonActive) {
    //   resetWidget();
    // } else {
    //   setActiveOption({
    //     // ? should we refactor to dynamically set other 2 properties to false
    //     areaButtonActive: false,
    //     distanceButtonActive: true,
    //     coordinatesButtonActive: false
    //   });
    //   setSelectedDropdownOption(distanceUnitsOfLength[0]);
    // }
  };

  const setCoordinateOption = (): void => {
    // if (coordinatesButtonActive) {
    //   resetWidget();
    // } else {
    //   setActiveOption({
    //     // ? should we refactor to dynamically set other 2 properties to false
    //     areaButtonActive: false,
    //     distanceButtonActive: false,
    //     coordinatesButtonActive: true
    //   });
    //   setSelectedDropdownOption(latitudeLongitudeUnits[0]);
    // }
  };

  const returnDropdownOptions = (): JSX.Element[] => {
    // const selectedDropdown = [];

    // TODO - case statment, checking value of property

    // if (areaButtonActive) {
    //   selectedDropdown = areaUnitsOfLength;
    // }

    // if (distanceButtonActive) {
    //   selectedDropdown = distanceUnitsOfLength;
    // }

    // if (coordinatesButtonActive) {
    //   selectedDropdown = latitudeLongitudeUnits;
    // }

    // TODO

    return [].map((lengthUnit: SpecificDropDownOption, index: number) => {
      const { text, esriUnit } = lengthUnit;

      return (
        <option value={esriUnit} key={index}>
          {text}
        </option>
      );
    });
  };

  const returnMeasurementResults = (): any => {
    // * NOTE - later one we'll want a message saying;
    // * 'select option to see results'
    // * when everything is toggled OFF
    if (areaButtonActive) {
      // TODO check if redux property is === 'areaWidget'
      // return (
      //   <>
      //     <p>
      //       <strong>Area: </strong> {areaResults?.area}
      //     </p>
      //     <p>
      //       <strong>Perimeter: </strong>
      //       {areaResults?.perimeter}
      //     </p>
      //   </>
      // );
    }

    if (distanceButtonActive) {
      // TODO check if redux property is === 'distanceWidget'
      // return (
      //   <>
      //     <p>
      //       <strong>Distance Results: </strong>
      //       {distanceResults?.length}
      //     </p>
      //   </>
      // );
    }

    if (coordinatesButtonActive) {
      // TODO check if redux property is === 'coordinatesWidget'
      // return (
      //   <>
      //     <p>
      //       <strong>Coordinate results</strong>
      //     </p>
      //     <p>
      //       <strong>Mouse click</strong>
      //     </p>
      //     <p>Latitude: {coordinateMouseClickResults?.latitude}</p>
      //     <p>Longitude: {coordinateMouseClickResults?.longitude}</p>
      //     <br />
      //     <p>
      //       <strong>Pointer move</strong>
      //     </p>
      //     <p>Latitude: {coordinatePointerMoveResults?.latitude}</p>
      //     <p>Longitude: {coordinatePointerMoveResults?.longitude}</p>
      //   </>
      // );
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

  const setOption = (optionType: string): void => {
    if (activeButton === optionType) {
      dispatch(setActiveMeasureButton(''));
    } else {
      dispatch(setActiveMeasureButton(optionType));
      // TODO - [ ]
      returnDropdown();
    }
  };

  return (
    <div className="measure-options-container">
      <div className="buttons-select-wrapper">
        <button
          onClick={(): void => setOption('distance')}
          // onClick={(): void => setAreaOption()}
          className={`esri-icon-measure-area ${
            areaButtonActive ? 'selected' : ''
          }`}
        />
        <button
          onClick={(): void => setOption('area')}
          // onClick={(): void => setDistanceOption()}
          className={`esri-icon-measure ${
            distanceButtonActive ? 'selected' : ''
          }`}
        />
        <button
          onClick={(): void => setOption('coordinates')}
          // onClick={(): void => setCoordinateOption()}
          className={`esri-icon-maps ${
            coordinatesButtonActive ? 'selected' : ''
          }`}
        />
        <span>|</span>
        <select
          value={selectedDropdownOption}
          onChange={(e): void => setMeasurementUnit(e.target.value)}
          onBlur={(): void => console.log('Bonjour, onBlur!')}
          disabled={returnDropdown().length > 0 ? false : true}
        >
          {returnDropdown().length === 0 && (
            <option defaultValue="Unit">Unit</option>
          )}
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
