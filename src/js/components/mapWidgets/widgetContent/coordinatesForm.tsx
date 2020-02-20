import React, { FunctionComponent, useState } from 'react';
import { useSelector } from 'react-redux';

import DMSSection from './coordinatesDMSSection';
import DDSection from './coordinatesDDSection';

import { mapController } from 'js/controllers/mapController';

import { RootState } from 'js/store/index';

import { coordinatesContent } from 'configs/modal.config';

import {
  DDFormValues,
  SpecificDDSection,
  SpecificDMSSection,
  DMSFormValues,
  DMSCardinalPoint
} from 'js/interfaces/coordinateForm';

import 'css/coordinatesForm';

const CoordinatesForm: FunctionComponent = () => {
  const [selectedFormat, setSelectedFormat] = useState(0);
  const [ddSections, setDDForm] = useState([
    {
      rowNum: 0,
      latitude: '',
      longitude: ''
    },
    {
      rowNum: 1,
      latitude: '',
      longitude: ''
    },
    {
      rowNum: 2,
      latitude: '',
      longitude: ''
    }
  ]);
  const [dmsSections, setDMSForm] = useState([
    {
      rowNum: 0,
      latitude: {
        degree: '',
        minutes: '',
        seconds: '',
        cardinalPoint: 'N'
      },
      longitude: {
        degree: '',
        minutes: '',
        seconds: '',
        cardinalPoint: 'E'
      }
    },
    {
      rowNum: 1,
      latitude: {
        degree: '',
        minutes: '',
        seconds: '',
        cardinalPoint: 'N'
      },
      longitude: {
        degree: '',
        minutes: '',
        seconds: '',
        cardinalPoint: 'E'
      }
    },
    {
      rowNum: 2,
      latitude: {
        degree: '',
        minutes: '',
        seconds: '',
        cardinalPoint: 'N'
      },
      longitude: {
        degree: '',
        minutes: '',
        seconds: '',
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

  const setDDFormValues = ({
    userInput,
    rowNum,
    coordinateType
  }: DDFormValues): void => {
    const sections = [...ddSections];
    const sectionNum = sections.findIndex(section => section.rowNum === rowNum);

    sections[sectionNum][coordinateType] = userInput;

    setDDForm(sections);
  };

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
    if (decimalOptions[selectedFormat].includes('DMS')) {
      mapController.setPolygon(dmsSections);
    } else {
      // TODO - set polygon via DD form
    }
  };

  const addOrRemoveSection = (
    // allSections: Array<SpecificDDSection> | Array<SpecificDMSSection>,
    defaultSection: SpecificDDSection | SpecificDMSSection,
    allSections: Array<any>,
    addSection: boolean
  ): Array<SpecificDDSection> | Array<SpecificDMSSection> => {
    if (addSection) {
      allSections.push(defaultSection);
    } else {
      allSections.pop();
    }

    return allSections;
  };

  const setSection = (addSection: boolean): void => {
    if (decimalOptions[selectedFormat].includes('DMS')) {
      const allDMSSections = [...dmsSections];
      const defaultDMSSection = {
        rowNum: 0,
        latitude: {
          degree: '',
          minutes: '',
          seconds: '',
          cardinalPoint: 'N'
        },
        longitude: {
          degree: '',
          minutes: '',
          seconds: '',
          cardinalPoint: 'E'
        }
      };

      const updatedSections = addOrRemoveSection(
        defaultDMSSection,
        allDMSSections,
        addSection
      ) as Array<SpecificDMSSection>;
      setDMSForm(updatedSections);
    } else {
      const allDDSections = [...ddSections];
      const defaultDDSection = {
        rowNum: allDDSections.length + 1,
        latitude: '',
        longitude: ''
      };
      const updatedSections = addOrRemoveSection(
        defaultDDSection,
        allDDSections,
        addSection
      ) as Array<SpecificDDSection>;
      setDDForm(updatedSections);
    }
  };

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
        {decimalOptions[selectedFormat].includes('DD') &&
          ddSections.map((ddSection: SpecificDDSection, index: number) => {
            return (
              <DDSection
                key={index}
                ddSection={ddSection}
                setDDFormValues={setDDFormValues}
                degreeSymbol={degree}
                renderRemoveButton={index > 2 ? true : false}
                setSection={setSection}
              />
            );
          })}
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
                setSection={setSection}
              />
            );
          })}
        <div className="buttons-wrapper">
          <button onClick={(): void => setSection(true)}>Add more</button>
          <button className="orange-button" onClick={(): void => setShape()}>
            Make shape
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoordinatesForm;
