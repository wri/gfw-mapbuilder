import React, { FunctionComponent, useState } from 'react';
import { useSelector } from 'react-redux';

import DMSSection from 'js/components/mapWidgets/widgetContent/coordinatesDMSSection';

import { mapController } from 'js/controllers/mapController';

import { RootState } from 'js/store/index';

import { coordinatesContent } from 'configs/modal.config';

import 'css/coordinatesForm';

export interface SpecificDMSSection {
  rowNum: number;
  latitude: {
    degree: number;
    minutes: number;
    seconds: number;
    cardinalPoint: string;
  };
  longitude: {
    degree: number;
    minutes: number;
    seconds: number;
    cardinalPoint: string;
  };
}
export interface DMSFormValues {
  coordinateValue: number;
  rowNum: number;
  coordinateType: string;
  degreeType: string;
  cardinalPoint?: string;
}

interface DMSCardinalPoint {
  specificPoint?: string;
  rowNum?: number;
  coordinateType?: string;
}

const CoordinatesForm: FunctionComponent = () => {
  const [selectedFormat, setSelectedFormat] = useState(0);
  const [dmsSections, setDMSForm] = useState([
    {
      rowNum: 0,
      latitude: {
        degree: 0,
        minutes: 0,
        seconds: 0,
        cardinalPoint: 'N'
      },
      longitude: {
        degree: 0,
        minutes: 0,
        seconds: 0,
        cardinalPoint: 'E'
      }
    },
    {
      rowNum: 1,
      latitude: {
        degree: 0,
        minutes: 0,
        seconds: 0,
        cardinalPoint: 'N'
      },
      longitude: {
        degree: 0,
        minutes: 0,
        seconds: 0,
        cardinalPoint: 'E'
      }
    },
    {
      rowNum: 2,
      latitude: {
        degree: 0,
        minutes: 0,
        seconds: 0,
        cardinalPoint: 'N'
      },
      longitude: {
        degree: 0,
        minutes: 0,
        seconds: 0,
        cardinalPoint: 'E'
      }
    }
  ]);
  const selectedLanguage = useSelector(
    (state: RootState) => state.appState.selectedLanguage
  );

  const { degree, minutes, seconds } = coordinatesContent;
  const { title, dropdownTitle, decimalOptions } = coordinatesContent[
    selectedLanguage
  ];

  const setDMSFormValues = ({
    coordinateValue,
    rowNum,
    coordinateType,
    degreeType
  }: DMSFormValues): void => {
    const sections = [...dmsSections];
    const sectionNum = sections.findIndex(section => section.rowNum === rowNum);

    if (coordinateType) {
      sections[sectionNum][coordinateType][degreeType] = coordinateValue;
    }

    setDMSForm(sections);
  };

  const setDMSCardinalType = ({
    specificPoint,
    rowNum,
    coordinateType
  }: DMSCardinalPoint): void => {
    const sections = [...dmsSections];
    const sectionNum = sections.findIndex(section => section.rowNum === rowNum);

    if (coordinateType) {
      sections[sectionNum][coordinateType].cardinalPoint = specificPoint;
    }

    setDMSForm(sections);
  };

  const setShape = (): void => {
    mapController.setPolygon(dmsSections);
  };

  const addOrRemoveSection = (addSection: boolean): void => {
    const allDMSSections = [...dmsSections];

    if (addSection) {
      const defaultDMSSection = { ...dmsSections[0] };
      defaultDMSSection.rowNum = allDMSSections.length + 1;
      allDMSSections.push(defaultDMSSection);
    } else {
      allDMSSections.pop();
    }

    setDMSForm(allDMSSections);
  };

  // if (decimalOptions[selectedFormat].includes('DD')) {
  //   return (
  //     <>
  //       <div className="dds-wrapper">
  //         <div className="dds-input">
  //           <p>{latitude}</p>
  //           <div className="degree-input">
  //             <input type="number" name="latitude coordinates" />
  //             <span>{degree}</span>
  //           </div>
  //         </div>
  //         <div className="dds-input">
  //           <p>{longitude}</p>
  //           <div className="degree-input">
  //             <input type="number" name="longitude coordinates" />
  //             <span>{degree}</span>
  //           </div>
  //         </div>
  //       </div>
  //       <hr />
  //       {/* <div className="dds-wrapper">
  //         <div className="dds-input">
  //           <p>{latitude}</p>
  //           <div className="degree-input">
  //             <input type="number" name="latitude coordinates" />
  //             <span>{degree}</span>
  //           </div>
  //         </div>
  //         <div className="dds-input">
  //           <p>{longitude}</p>
  //           <div className="degree-input">
  //             <input type="number" name="longitude coordinates" />
  //             <span>{degree}</span>
  //           </div>
  //         </div>
  //       </div>
  //       <hr />
  //       <div className="dds-wrapper">
  //         <div className="dds-input">
  //           <p>{latitude}</p>
  //           <div className="degree-input">
  //             <input type="number" name="latitude coordinates" />
  //             <span>{degree}</span>
  //           </div>
  //         </div>
  //         <div className="dds-input">
  //           <p>{longitude}</p>
  //           <div className="degree-input">
  //             <input type="number" name="longitude coordinates" />
  //             <span>{degree}</span>
  //           </div>
  //         </div>
  //       </div> */}
  //       <hr />
  //     </>
  //   );
  // }
  // };

  return (
    <div className="coordinates-form-container">
      <div className="directions">
        <div className="titles">
          <h4 className="title">{title}</h4>
          <p>{dropdownTitle}</p>
        </div>
        <select onChange={e => setSelectedFormat(Number(e.target.value))}>
          {decimalOptions.map((option: string, index: number) => (
            <option value={index} key={index}>
              {option}
            </option>
          ))}
        </select>
        <hr />
        {decimalOptions[selectedFormat].includes('DMS') &&
          dmsSections.map((dmsSection: SpecificDMSSection, index: number) => {
            return (
              <DMSSection
                dmsSection={dmsSection}
                setDMSFormValues={setDMSFormValues}
                setDMSCardinalType={setDMSCardinalType}
                degreeSymbol={degree}
                minuteSymbol={minutes}
                secondsSymbol={seconds}
                key={index}
                renderRemoveButton={index > 2 ? true : false}
                addOrRemoveSection={addOrRemoveSection}
              />
            );
          })}
        <div className="buttons-wrapper">
          <button onClick={(): void => addOrRemoveSection(true)}>
            Add more
          </button>
          <button className="orange-button" onClick={(): void => setShape()}>
            Make shape
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoordinatesForm;
