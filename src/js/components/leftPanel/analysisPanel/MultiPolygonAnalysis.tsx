import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import BaseButton from '../../ui/BaseButton';
import { BackIcon } from '../../../../images/backIcon';
import { setMultiPolygonSelectionMode } from '../../../store/appState/actions';
import { PenIcon } from '../../../../images/penIcon';
import { PolygonIcon } from '../../../../images/PolygonIcon';
import { analysisContent } from '../../../../../configs/translations/leftPanel.translations';
import { mapController } from '../../../controllers/mapController';
import UploadFile from '../../sharedComponents/UploadFile';

const MultiPolygonAnalysis = () => {
  const selectedLanguage = useSelector((store: RootState) => store.appState.selectedLanguage);
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
    visitTitle
  } = analysisContent[selectedLanguage];

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
  //TODO: how and when do we disable the analyze button?
  //TODO: Add translations
  const dispatch = useDispatch();
  const customColorTheme = useSelector((store: RootState) => store.appSettings.customColorTheme);
  const dis = false;

  const BottomBtnWrap = styled.div`
    display: grid;
    grid-template-columns: 80px 160px;
    gap: 15px;
    padding: 0 15px 10px 15px;
  `;
  const BackButton = styled(BaseButton)`
    background-color: white;
    color: ${customColorTheme};
    border: 2px solid ${customColorTheme};
    text-transform: capitalize;
  `;
  const MultiPolyWrap = styled.div`
    padding: 0 15px 10px 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: #767676;
    p {
      padding: 0;
      border-bottom: 1px solid gray;
      margin: 0 auto;
      padding: 10px 0 10px 0;
    }
  `;

  const MethodSelection = ({ placeholder }) => {
    const [activeInput, setActiveInput] = React.useState<string>('none');
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
          <PolygonIcon height={100} width={100} customColorTheme={customColorTheme} />
          <button
            style={{ backgroundColor: customColorTheme }}
            className="orange-button"
            onClick={(): void => mapController.createPolygonSketch()}
          >
            <PenIcon height={25} width={25} fill={'white'} />
            {drawButton}
          </button>
        </DrawWrap>
      );
    };
    return (
      <SelectWrap>
        <StyledSelect required value={activeInput} onChange={e => setActiveInput(e.target.value)}>
          <option value="none" disabled selected hidden>
            {placeholder}
          </option>
          <option value="select">Analyze a shape on the map</option>
          <option value="draw">Analyze your own shape</option>
          <option value="upload">Upload Shape file</option>
        </StyledSelect>
        {activeInput === 'select' && <ExistingShapeInstruction />}
        {activeInput === 'draw' && <DrawMethod />}
        {activeInput === 'upload' && <UploadFile />}
      </SelectWrap>
    );
  };
  return (
    <div>
      <MultiPolyWrap>
        <p>Analyze overlapping area between two shapes</p>
        <MethodSelection placeholder="Select shape 1 ..." />
        <MethodSelection placeholder="Select shape 2 ..." />
      </MultiPolyWrap>
      <BottomBtnWrap>
        <BackButton
          disabled={dis}
          onClick={() => {
            dispatch(setMultiPolygonSelectionMode(false));
          }}
        >
          <BackIcon height={12} width={12} fill={customColorTheme} />
          {'Back'}
        </BackButton>
        <BaseButton
          disabled={dis}
          onClick={() => {
            console.log('analyze?');
          }}
        >
          {'ANALYZE'}
        </BaseButton>
      </BottomBtnWrap>
    </div>
  );
};

export default React.memo(MultiPolygonAnalysis);
