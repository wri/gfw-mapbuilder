import React, { FunctionComponent, useState, ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { coordinatesContent } from '../../../../../configs/modal.config';

import '../../../../css/CoordinatesForm';

const CoordinatesForm: FunctionComponent = () => {
  const _rows = [1, 2, 3, 4, 5, 6];
  let _formValues = {};
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

  const setValues = (
    coordinateValue: string,
    rowNum: Number,
    coordinateType: string,
    degreeType: string
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
            [degreeType]: coordinateValue
          }
        },
        writable: true
      });
    }

    console.log('component _formValues', _formValues);
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

  const latitudeLongitudeRow = (): any => {
    if (decimalOptions[selectedFormat].includes('DMS')) {
      return _rows.map(rowNum => {
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
                      setValues(e.target.value, rowNum, 'latitude', 'degree')
                    }
                  />
                  <span className="degree">{degree}</span>
                  <input
                    type="number"
                    name="latitude coordinates"
                    onChange={e =>
                      setValues(e.target.value, rowNum, 'latitude', 'minutes')
                    }
                  />
                  <span className="degree">{minutes}</span>
                  <input
                    type="number"
                    name="latitude coordinates"
                    onChange={e =>
                      setValues(e.target.value, rowNum, 'latitude', 'seconds')
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
                      setValues(e.target.value, rowNum, 'longitude', 'degree')
                    }
                  />
                  <span className="degree">{degree}</span>
                  <input
                    type="number"
                    name="latitude coordinates"
                    onChange={e =>
                      setValues(e.target.value, rowNum, 'longitude', 'minutes')
                    }
                  />
                  <span className="degree">{minutes}</span>
                  <input
                    type="number"
                    name="latitude coordinates"
                    onChange={e =>
                      setValues(e.target.value, rowNum, 'longitude', 'seconds')
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

  const returnSelectedContent = (): ReactElement => {
    return (
      <>
        {latitudeLongitudeRow()}
        <div className="buttons-wrapper">
          <button>Add more</button>
          <button className="orange-button">Make shape</button>
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
