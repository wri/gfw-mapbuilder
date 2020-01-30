import React, { FunctionComponent, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import DMSSection from 'js/components/mapWidgets/widgetContent/coordinatesDMSSection';

import { RootState } from 'js/store/index';

import { coordinatesContent } from 'configs/modal.config';

import 'css/CoordinatesForm';

interface SpecificDMSSection {
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
interface DMSFormValues {
  coordinateValue?: string;
  rowNum?: number;
  coordinateType?: string;
  degreeType?: number;
  cardinalPoint?: string;
}

interface DMSCardinalPoint {
  specificPoint?: string;
  rowNum?: number;
  coordinateType?: string;
}

const CoordinatesForm: FunctionComponent = () => {
  const [selectedFormat, setSelectedFormat] = useState(0);
  const [addSection, setAddSection] = useState(0);
  const [defaultSection, setAddDefaultSection] = useState({
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
  });
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

  useEffect(() => {
    const allDMSSections = [...dmsSections];
    const defaultDMSSection = { ...defaultSection };
    const newRowNum = allDMSSections.length + addSection;

    defaultDMSSection.rowNum = newRowNum;

    allDMSSections.push(defaultDMSSection);
    setDMSForm(allDMSSections);
  }, [addSection]);

  // TODO - [ x ] add section for each time addSection is updated
  // TODO - [ ] figure out how to conditionally render remove box

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
    console.log('setShape()', dmsSections);
    // TODO create polygon from formvalues!
  };

  return (
    <div className="coordinates-form-container">
      <div className="directions">
        <div className="titles">
          <h4 className="title">{title}</h4>
          <p>{dropdownTitle}</p>
        </div>
        <select onBlur={(e): void => setSelectedFormat(Number(e.target.value))}>
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
                removeSection={index > 2 ? true : false}
              />
            );
          })}
        <div className="buttons-wrapper">
          <button onClick={(): void => setAddSection(addSection + 1)}>
            Add more
          </button>
          <button className="orange-button" onClick={(): void => setShape()}>
            Make shape
          </button>
        </div>
      </div>
    </div>
  );

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
};

export default CoordinatesForm;
