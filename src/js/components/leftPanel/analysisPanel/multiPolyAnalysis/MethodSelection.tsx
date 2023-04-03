import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { analysisContent } from '../../../../../../configs/translations/leftPanel.translations';
import { penContent } from '../../../../../../configs/translations/modal.tanslations';
import { PenIcon } from '../../../../../images/penIcon';
import { PlusIcon } from '../../../../../images/plusIcon';
import { PolygonIcon } from '../../../../../images/PolygonIcon';
import { handleCustomColorTheme } from '../../../../../utils';
import { mapController } from '../../../../controllers/mapController';
import { renderModal } from '../../../../store/appState/actions';
import UploadFile from '../../../sharedComponents/UploadFile';

const DrawWrap = styled.div`
  color: #767676;
  display: grid;
  justify-content: center;
  justify-items: center;
  font-size: 0.85rem;

  figure {
    margin: 0;
    padding: 0px 10px 0px 10px;

    ol {
      margin: 0;
      padding: 0;
    }
    h4 {
      margin-left: -10px;
    }
  }
`;
const StyledSelect = styled.select`
  appearance: none;
  background-color: transparent;
  height: 35px;
  padding: 5px;
  line-height: inherit;
  border: 1px solid #767676;
  color: #767676;
  opacity: 1;
  z-index: 1;

  // Remove focus outline, will add on alternate element
  &:invalid {
    color: gray;
    opacity: 0.5;
  }
`;
const SelectWrap = styled.div`
  display: grid;
  grid-template-areas: 'select';
  align-items: center;
  position: relative;
  min-width: 15ch;
  max-width: 36ch;
  background-color: #fff;
  background-image: linear-gradient(to top, #f9f9f9, #fff 33%);
  line-height: 1.1;
  padding: 0.25em 0.5em;
  &::after {
    content: '';
    justify-self: end;
    width: 0.8em;
    height: 0.5em;
    margin-right: 10px;
    background-color: #e8a600;
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
  }
  select,
  &::after {
    grid-area: select;
  }
`;

const MethodSelection = ({ placeholder, inputIndex, selectedLanguage, customColorTheme, handleInputSelection }) => {
  const [activeInput, setActiveInput] = React.useState<string>('none');

  const { coordinatesTitle, coordinatesInstructions } = penContent[selectedLanguage];
  const {
    analyzeExistingShapeTitle,
    analyzeExistingShapeDirections,
    analyzeYourShapeTitle,
    analyzeYourShapeFirstDirection,
    analyzeYourShapeDirections,
    drawButton,
    enterCoordinatesTitle,
    enterCoordinatesDirections,
    coordinatesButton,
    visitTitle,
    uploadShapefileTitle,
    enterCoordsTitle,
  } = analysisContent[selectedLanguage];

  const themeColor = handleCustomColorTheme(customColorTheme);

  const ExistingShapeInstruction = () => {
    return (
      <DrawWrap>
        <figure>
          <figcaption className="title">
            <h4>{analyzeExistingShapeTitle}</h4>
          </figcaption>
          <ol>
            {analyzeExistingShapeDirections.map((direction: string, index: number) => (
              <li key={index}>{direction}</li>
            ))}
          </ol>
        </figure>
      </DrawWrap>
    );
  };
  const returnFirstInstruction = (type?): JSX.Element => {
    if (analyzeYourShapeFirstDirection[1]) {
      return (
        <>
          {analyzeYourShapeFirstDirection[0]}
          <PenIcon height={type === 'reduced' ? 18 : 25} width={type === 'reduced' ? 18 : 25} fill={'#555'} />
          {analyzeYourShapeFirstDirection[1]}
        </>
      );
    } else {
      return (
        <>
          {analyzeYourShapeFirstDirection[0]}
          <PenIcon height={25} width={25} fill={'#555'} />
        </>
      );
    }
  };

  const CoordinatesMethod = () => {
    const dispatch = useDispatch();
    return (
      <DrawWrap>
        <figure>
          <figcaption className="title">
            <h4>{coordinatesTitle}</h4>
          </figcaption>
          <ol>
            {coordinatesInstructions.map((direction: string, i: number) => (
              <li key={i}>{direction}</li>
            ))}
          </ol>
        </figure>
        <button
          className="orange-button"
          style={{
            backgroundColor: themeColor,
          }}
          onClick={() => dispatch(renderModal('PenWidget-CoordinatesForm'))}
        >
          <PlusIcon fill={'#fff'} height={25} width={25} />
          {coordinatesButton}
        </button>
      </DrawWrap>
    );
  };
  const DrawMethod = () => {
    return (
      <DrawWrap>
        <figure>
          <figcaption className="title">
            <h4>{analyzeYourShapeTitle}</h4>
          </figcaption>
          <ol>
            <li>{returnFirstInstruction('reduced')}</li>
            {analyzeYourShapeDirections.map((direction: string, index: number) => (
              <li key={index}>{direction}</li>
            ))}
          </ol>
        </figure>
        <PolygonIcon height={100} width={100} customColorTheme={themeColor} />
        <button
          style={{
            backgroundColor: themeColor,
          }}
          className="orange-button"
          onClick={() => mapController.initSketchForMultiple(inputIndex)}
        >
          <PenIcon height={25} width={25} fill={'white'} />
          {drawButton}
        </button>
      </DrawWrap>
    );
  };

  return (
    <SelectWrap>
      <StyledSelect
        required
        value={activeInput}
        onChange={(e) => {
          setActiveInput(e.target.value);
          handleInputSelection(inputIndex);
        }}
      >
        <option value="none" disabled selected hidden>
          {placeholder}
        </option>
        <option value="select">{analyzeExistingShapeTitle}</option>
        <option value="draw">{analyzeYourShapeTitle}</option>
        <option value="upload">{uploadShapefileTitle}</option>
        <option value="coordinates">{enterCoordinatesTitle}</option>
      </StyledSelect>
      {activeInput === 'select' && <ExistingShapeInstruction />}
      {activeInput === 'draw' && <DrawMethod />}
      {activeInput === 'upload' && <UploadFile />}
      {activeInput === 'coordinates' && <CoordinatesMethod />}
    </SelectWrap>
  );
};

// export default React.memo(MethodSelection);
export default MethodSelection;
