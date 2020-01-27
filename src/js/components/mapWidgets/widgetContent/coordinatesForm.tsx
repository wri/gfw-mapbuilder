import React, { FunctionComponent, useState, ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { coordinatesContent } from '../../../../../configs/modal.config';

import '../../../../css/CoordinatesForm';

function DMSSection(props: any) {
  const {
    dmsSection,
    setDMSFormValues,
    setDMSCardinalType,
    degreeSymbol,
    minuteSymbol,
    secondsSymbol
  } = props;
  const { rowNum, latitude, longitude } = dmsSection;

  return (
    <>
      <div className="dms-wrapper">
        <span>Latitude</span>
        <div className="input-wrapper">
          <input
            type="number"
            name="latitude coordinates"
            value={latitude.degree}
            onChange={e =>
              setDMSFormValues({
                coordinateValue: e.target.value,
                rowNum,
                coordinateType: 'latitude',
                degreeType: 'degree'
              })
            }
          />
          <span className="degree">{degreeSymbol}</span>
          <input
            type="number"
            name="latitude coordinates"
            value={latitude.minutes}
            onChange={e =>
              setDMSFormValues({
                coordinateValue: e.target.value,
                rowNum,
                coordinateType: 'latitude',
                degreeType: 'minutes'
              })
            }
          />
          <span className="degree">{minuteSymbol}</span>
          <input
            type="number"
            name="latitude coordinates"
            value={latitude.seconds}
            onChange={e =>
              setDMSFormValues({
                coordinateValue: e.target.value,
                rowNum,
                coordinateType: 'latitude',
                degreeType: 'seconds'
              })
            }
          />
          <span className="degree">{secondsSymbol}</span>
          <select
            value={latitude.cardinalPoint}
            onChange={e =>
              setDMSCardinalType({
                specificPoint: e.target.value,
                rowNum,
                coordinateType: 'latitude'
              })
            }
          >
            <option value="N">N</option>
            <option value="S">S</option>
          </select>
        </div>
      </div>
      <div className="dms-wrapper">
        <span>Longitude</span>
        <div className="input-wrapper">
          <input
            type="number"
            name="longitude coordinates"
            value={longitude.degree}
            onChange={e =>
              setDMSFormValues({
                coordinateValue: e.target.value,
                rowNum,
                coordinateType: 'longitude',
                degreeType: 'degree'
              })
            }
          />
          <span className="degree">{degreeSymbol}</span>
          <input
            type="number"
            name="longitude coordinates"
            value={longitude.minutes}
            onChange={e =>
              setDMSFormValues({
                coordinateValue: e.target.value,
                rowNum,
                coordinateType: 'longitude',
                degreeType: 'minutes'
              })
            }
          />
          <span className="degree">{minuteSymbol}</span>
          <input
            type="number"
            name="longitude coordinates"
            value={longitude.seconds}
            onChange={e =>
              setDMSFormValues({
                coordinateValue: e.target.value,
                rowNum,
                coordinateType: 'longitude',
                degreeType: 'seconds'
              })
            }
          />
          <span className="degree">{secondsSymbol}</span>
          <select
            value={longitude.cardinalPoint}
            onChange={e =>
              setDMSCardinalType({
                specificPoint: e.target.value,
                rowNum,
                coordinateType: 'longitude'
              })
            }
          >
            <option value="E">E</option>
            <option value="W">W</option>
          </select>
        </div>
      </div>
      <hr />
    </>
  );
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

  interface DMSFormValues {
    coordinateValue: string;
    rowNum: number;
    coordinateType: string;
    degreeType: string;
    cardinalPoint: string;
  }

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

  interface DMSCardinalPoint {
    specificPoint: string;
    rowNum: number;
    coordinateType: string;
  }

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
          dmsSections.map((dmsSection: any) => {
            return (
              <DMSSection
                dmsSection={dmsSection}
                setDMSFormValues={setDMSFormValues}
                setDMSCardinalType={setDMSCardinalType}
                degreeSymbol={degree}
                minuteSymbol={minutes}
                secondsSymbol={seconds}
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
