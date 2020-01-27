import React, { FunctionComponent, useState, ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { coordinatesContent } from '../../../../../configs/modal.config';

import '../../../../css/CoordinatesForm';

const CoordinatesForm: FunctionComponent = () => {
  const _formValues = {};
  const [selectedFormat, setSelectedFormat] = useState(0);
  const selectedLanguage = useSelector(
    (state: any) => state.appState.selectedLanguage
  );

  const { degree, minutes, seconds } = coordinatesContent;
  const {
    title,
    dropdownTitle,
    decimalOptions,
    latitude,
    longitude
  } = coordinatesContent[selectedLanguage];

  const setFormValues = (
    coordinateValue: string,
    rowNum: Number,
    coordinateType: string,
    degreeType: string,
    direction: string
  ) => {
    if (_formValues[`row${rowNum}`]) {
      Object.defineProperty(
        _formValues[`row${rowNum}`][coordinateType],
        degreeType,
        {
          value: coordinateValue,
          writable: true
        }
      );
    } else {
      Object.defineProperty(_formValues, `row${rowNum}`, {
        value: {
          [coordinateType]: {
            [degreeType]: coordinateValue,
            direction: direction
          }
        },
        writable: true
      });
    }

    console.log('setFormValues()', _formValues);
  };

  const setCardinalType = (
    specificPoint: string,
    rowNum: number,
    coordinateType: string
  ) => {
    Object.defineProperty(
      _formValues[`row${rowNum}`][coordinateType],
      'cardinalPoint',
      {
        value: specificPoint,
        writable: true
      }
    );
    console.log('setCardinalType()', _formValues);
  };

  const dmsRows = (): any => {
    const rows = [1, 2, 3, 4, 5, 6];
    if (decimalOptions[selectedFormat].includes('DMS')) {
      return rows.map(rowNum => {
        if (rowNum % 2 === 1) {
          return (
            <>
              <div className="dms-wrapper">
                <span>{latitude}</span>
                <div className="input-wrapper">
                  <input
                    type="number"
                    name="latitude coordinates"
                    onChange={e =>
                      setFormValues(
                        e.target.value,
                        rowNum,
                        'latitude',
                        'degree',
                        'north'
                      )
                    }
                  />
                  <span className="degree">{degree}</span>
                  <input
                    type="number"
                    name="latitude coordinates"
                    onChange={e =>
                      setFormValues(
                        e.target.value,
                        rowNum,
                        'latitude',
                        'minutes',
                        'north'
                      )
                    }
                  />
                  <span className="degree">{minutes}</span>
                  <input
                    type="number"
                    name="latitude coordinates"
                    onChange={e =>
                      setFormValues(
                        e.target.value,
                        rowNum,
                        'latitude',
                        'seconds',
                        'north'
                      )
                    }
                  />
                  <span className="degree">{seconds}</span>
                  <select
                    onChange={e =>
                      setCardinalType(e.target.value, rowNum, 'latitude')
                    }
                  >
                    <option value="N" key={`${rowNum}a`}>
                      N
                    </option>
                    <option value="S" key={`${rowNum}b`}>
                      S
                    </option>
                  </select>
                </div>
              </div>
            </>
          );
        } else {
          return (
            <>
              <div className="dms-wrapper">
                <span>{longitude}</span>
                <div className="input-wrapper">
                  <input
                    type="number"
                    name="latitude coordinates"
                    onChange={e =>
                      setFormValues(
                        e.target.value,
                        rowNum,
                        'longitude',
                        'degree',
                        'east'
                      )
                    }
                  />
                  <span className="degree">{degree}</span>
                  <input
                    type="number"
                    name="latitude coordinates"
                    onChange={e =>
                      setFormValues(
                        e.target.value,
                        rowNum,
                        'longitude',
                        'minutes',
                        'east'
                      )
                    }
                  />
                  <span className="degree">{minutes}</span>
                  <input
                    type="number"
                    name="latitude coordinates"
                    onChange={e =>
                      setFormValues(
                        e.target.value,
                        rowNum,
                        'longitude',
                        'seconds',
                        'east'
                      )
                    }
                  />
                  <span className="degree">{seconds}</span>
                  <select
                    onChange={e =>
                      setCardinalType(e.target.value, rowNum, 'longitude')
                    }
                  >
                    <option value="E" key={`${rowNum}a`}>
                      E
                    </option>
                    <option value="W" key={`${rowNum}b`}>
                      W
                    </option>
                  </select>
                </div>
              </div>
              <hr />
            </>
          );
        }
      });
    }
  };

  const setShape = () => {
    console.log('setShape()', _formValues);
    // TODO create polygon from formvalues!
  };

  const returnSelectedContent = (): ReactElement => {
    return (
      <>
        {dmsRows()}
        <div className="buttons-wrapper">
          <button>Add more</button>
          <button className="orange-button" onClick={() => setShape()}>
            Make shape
          </button>
        </div>
      </>
    );
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
        {returnSelectedContent()}
      </div>
    </div>
  );
};

export default CoordinatesForm;
