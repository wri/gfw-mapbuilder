import React, { FunctionComponent, useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMeasureResults, setActiveMeasureButton } from '../../../../js/store/appState/actions';
import { mapController } from '../../../../js/controllers/mapController';
import { measureContent } from '../../../../../configs/translations/modal.tanslations';
import { OptionType } from '../../../../js/types/measureWidget';
import { RootState } from '../../../../js/store/index';

import '../../../../css/measureContent.scss';

const ESRICoordinatesWidget = (): JSX.Element => {
  const coordRef = useRef(null);

  useEffect(() => {
    mapController.attachCoordinatesWidget(coordRef);
  }, []);

  return (
    <>
      <div className="esri-coords" ref={coordRef}></div>
    </>
  );
};

interface SpecificDropDownOption {
  text: string;
  esriUnit: string;
}

const ReturnMeasurementResults = (): JSX.Element => {
  const { activeButton } = useSelector((state: RootState) => state.appState.measureContent);
  const { areaResults, distanceResults, coordinateMouseClickResults, coordinatePointerMoveResults } = useSelector(
    (state: RootState) => state.appState.measureContent
  );

  const returnResults = (): JSX.Element | void => {
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
    } else if (activeButton === 'distance') {
      return (
        <>
          <p>
            <strong>Distance Results: </strong>
            {distanceResults?.length}
          </p>
        </>
      );
    } else if (activeButton === 'coordinates') {
      return (
        <>
          <div>
            <ESRICoordinatesWidget />
          </div>
        </>
      );
    }
  };

  return <>{returnResults()}</>;
};

const ReturnDropdown: any = () => {
  const { activeButton } = useSelector((state: RootState) => state.appState.measureContent);

  const { selectedLanguage } = useSelector((state: RootState) => state.appState);

  const { defaultOption, areaUnitsOfLength, distanceUnitsOfLength, latitudeLongitudeUnits } = measureContent[
    selectedLanguage
  ];

  let selectedDropdown = [];

  switch (activeButton) {
    case 'area':
      selectedDropdown = areaUnitsOfLength;
      break;
    case 'distance':
      selectedDropdown = distanceUnitsOfLength;
      break;
    default:
      selectedDropdown = defaultOption;
      break;
  }

  return selectedDropdown.map((lengthUnit: SpecificDropDownOption, index: number) => {
    const { text, esriUnit } = lengthUnit;

    return (
      <option value={esriUnit} key={index}>
        {text}
      </option>
    );
  });
};

const MeasureContent: FunctionComponent = () => {
  const { activeButton } = useSelector((state: RootState) => state.appState.measureContent);
  const selectedLanguage = useSelector((state: RootState) => state.appState.selectedLanguage);

  const { areaUnitsOfLength, distanceUnitsOfLength, latitudeLongitudeUnits } = measureContent[selectedLanguage];

  const [selectedAreaUnit, setSelectedAreaUnit] = useState(areaUnitsOfLength[0].esriUnit);
  const [selectedDistanceUnit, setSelectedDistanceUnit] = useState(distanceUnitsOfLength[0].esriUnit);
  const [selectedCoordinatesUnit, setSelectedCoordinatesUnit] = useState(latitudeLongitudeUnits[0].esriUnit);
  const dispatch = useDispatch();

  const setMeasurementUnit = (
    selectedUnit: __esri.AreaMeasurement2D['unit'] | __esri.DistanceMeasurement2D['unit']
  ): void => {
    if (activeButton === 'area') {
      setSelectedAreaUnit(selectedUnit);
      mapController.updateSelectedMeasureWidget('area', selectedUnit as __esri.AreaMeasurement2D['unit']);
    } else if (activeButton === 'distance') {
      setSelectedDistanceUnit(selectedUnit);
      mapController.updateSelectedMeasureWidget('distance', selectedUnit as __esri.AreaMeasurement2D['unit']);
    }
  };

  const setSelectedWidget = (optionType: OptionType): void => {
    mapController.setActiveMeasureWidget(optionType);
  };

  const setOption = (optionType: OptionType): void => {
    mapController.clearAllWidgets();
    if (activeButton === optionType) {
      dispatch(setActiveMeasureButton(''));
      dispatch(
        setMeasureResults({
          areaResults: {},
          distanceResults: {},
          coordinateMouseClickResults: {},
          coordinatePointerMoveResults: {}
        })
      );
    } else {
      dispatch(setActiveMeasureButton(optionType));
      setSelectedWidget(optionType);
    }
  };

  const returnSelectedUnit = (): string => {
    switch (activeButton) {
      case 'area':
        return selectedAreaUnit;
      case 'distance':
        return selectedDistanceUnit;
      default:
        return '';
    }
  };

  return (
    <div className="measure-options-container">
      <div className="buttons-select-wrapper">
        <button
          onClick={(): void => setOption('area')}
          className={`esri-icon-measure-area ${activeButton === 'area' ? 'selected' : ''}`}
        />
        <button
          onClick={(): void => setOption('distance')}
          className={`esri-icon-measure ${activeButton === 'distance' ? 'selected' : ''}`}
        />
        <button
          onClick={(): void => setOption('coordinates')}
          className={`esri-icon-maps ${activeButton === 'coordinates' ? 'selected' : ''}`}
        />
        {(activeButton === 'area' || activeButton === 'distance' || activeButton === '') && (
          <>
            <span>|</span>
            <select
              value={returnSelectedUnit()}
              onChange={(e): void =>
                setMeasurementUnit(
                  e.target.value as __esri.AreaMeasurement2D['unit'] | __esri.DistanceMeasurement2D['unit']
                )
              }
              disabled={activeButton === '' ? true : false}
            >
              <ReturnDropdown />
            </select>
          </>
        )}
      </div>
      <p>Measurement Result</p>
      <hr />
      <ReturnMeasurementResults />
    </div>
  );
};

export default MeasureContent;
