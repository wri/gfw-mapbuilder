import React, { FunctionComponent, useState } from 'react';
import { useSelector } from 'react-redux';

import DMSSection from 'js/components/mapWidgets/widgetContent/coordinatesDMSSection';

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
  coordinateValue: string;
  rowNum: number;
  coordinateType: string;
  degreeType: number;
  cardinalPoint: string;
}

interface DMSCardinalPoint {
  specificPoint: string;
  rowNum: number;
  coordinateType: string;
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
    (state: any) => state.appState.selectedLanguage
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
  }: DMSFormValues) => {
    const sections = [...dmsSections];
    const sectionNum = sections.findIndex(section => section.rowNum === rowNum);

    sections[sectionNum][coordinateType][degreeType] = coordinateValue;

    setDMSForm(sections);
  };

  const setDMSCardinalType = ({
    specificPoint,
    rowNum,
    coordinateType
  }: DMSCardinalPoint) => {
    const sections = [...dmsSections];
    const sectionNum = sections.findIndex(section => section.rowNum === rowNum);

    sections[sectionNum][coordinateType].cardinalPoint = specificPoint;

    setDMSForm(sections);
  };

  const setShape = () => {
    console.log('setShape()', dmsSections);
    // TODO create polygon from formvalues!
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
          {decimalOptions.map((option: String, index: number) => (
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
              />
            );
          })}
        <div className="buttons-wrapper">
          <button>Add more</button>
          <button className="orange-button" onClick={() => setShape()}>
            Make shape
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoordinatesForm;
