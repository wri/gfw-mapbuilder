import React, { FunctionComponent, useState } from 'react';
import { useSelector } from 'react-redux';

import DMSSection from 'js/components/mapWidgets/widgetContent/coordinatesDMSSection';
import DDSection from 'js/components/mapWidgets/widgetContent/coordinatesDDSection';

import { RootState } from 'js/store/index';

import { coordinatesContent } from 'configs/modal.config';

import 'css/coordinatesForm';

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

interface SpecificDDSection {
  rowNum: number;
  latitude: number;
  longitude: number;
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
  const [ddSections, setDDForm] = useState([
    {
      rowNum: 0,
      latitude: 0,
      longitude: 0
    },
    {
      rowNum: 1,
      latitude: 0,
      longitude: 0
    },
    {
      rowNum: 2,
      latitude: 0,
      longitude: 0
    }
  ]);
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

  const setDDFormValues = ({
    userInput,
    rowNum,
    coordinateType
  }: {
    userInput: number;
    rowNum: number;
    coordinateType: string;
  }): void => {
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
    console.log('setShape()', dmsSections);
    // TODO create polygon from formvalues!
  };

  const addOrRemoveSection = (
    // allSections: Array<SpecificDDSection> | Array<SpecificDMSSection>,
    allSections: Array<any>,
    addSection: boolean
  ): Array<SpecificDDSection> | Array<SpecificDMSSection> => {
    if (addSection) {
      const defaultSection = { ...allSections[0] };
      defaultSection.rowNum = allSections.length + 1;
      allSections.push(defaultSection);
    } else {
      allSections.pop();
    }

    return allSections;
  };

  const setSection = (addSection: boolean): void => {
    if (decimalOptions[selectedFormat].includes('DMS')) {
      const allDMSSections = [...dmsSections];
      const updatedSections = addOrRemoveSection(
        allDMSSections,
        addSection
      ) as Array<SpecificDMSSection>;
      setDMSForm(updatedSections);
    } else {
      const allDDSections = [...ddSections];
      const updatedSections = addOrRemoveSection(
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
