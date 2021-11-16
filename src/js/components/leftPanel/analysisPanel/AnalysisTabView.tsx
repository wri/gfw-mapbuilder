import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UploadFile from '../../../../js/components/sharedComponents/UploadFile';
import { mapController } from '../../../../js/controllers/mapController';
import { renderModal, setMultiPolygonSelectionMode } from '../../../../js/store/appState/actions';
import { RootState } from '../../../../js/store';
import BaseAnalysis from '../../../../js/components/leftPanel/analysisPanel/BaseAnalysis';
import { analysisContent } from '../../../../../configs/translations/leftPanel.translations';
import { PolygonIcon } from '../../../../images/PolygonIcon';
import { PenIcon } from '../../../../images/penIcon';
import { SelectionIcon } from '../../../../images/selectionIcon';
import { PlusIcon } from '../../../../images/plusIcon';
import { createSelector } from 'reselect';
import analysisTranslations from './analysisTranslations';
import { BackIcon } from '../../../../images/backIcon';
import styled from 'styled-components';

//Memo'd selectors
const selectActiveFeaturesLength = createSelector(
  (state: RootState) => state.mapviewState,
  mapviewState => mapviewState.activeFeatures.length
);

const selectTabview = createSelector(
  (state: RootState) => state.appState,
  appState => appState.leftPanel.tabViewVisible
);

interface TabProps {
  key: string;
  label: string;
}

const AnalysisTabView = (props: TabProps): JSX.Element => {
  const dispatch = useDispatch();
  const activeTab = useSelector((store: RootState) => store.appState.leftPanel.activeTab);
  const selectedLanguage = useSelector((store: RootState) => store.appState.selectedLanguage);
  const customColorTheme = useSelector((store: RootState) => store.appSettings.customColorTheme);
  const multiPolygonSelection = useSelector((store: RootState) => store.appState.multiPolygonSelectionMode);

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

  const activeFeaturesLength = useSelector(selectActiveFeaturesLength);

  const tabview = useSelector(selectTabview);
  const tabViewIsVisible = tabview && activeTab === props.label;

  const BaseButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 2rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: bold;
    border: none;
    text-transform: uppercase;
    background-color: ${props => (props.disabled ? 'gray' : customColorTheme)};
    color: white;
    margin: 0 auto;
    margin-top: 1rem;
    font-family: $fira-sans;
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

    svg {
      margin-right: 0.5rem;
    }
  `;

  const returnFirstInstruction = (): JSX.Element => {
    if (analyzeYourShapeFirstDirection[1]) {
      return (
        <>
          {analyzeYourShapeFirstDirection[0]}
          <PenIcon height={25} width={25} fill={'#555'} />
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

  const returnVisitTitle = (): JSX.Element => {
    if (visitTitle.length === 2) {
      return (
        <>
          {visitTitle[0]}
          <PenIcon height={21} width={21} fill={'#555'} />
          {visitTitle[1]}
        </>
      );
    } else {
      return (
        <>
          {visitTitle[0]}
          <PenIcon height={21} width={21} fill={'#555'} />
        </>
      );
    }
  };

  const MultiPolygonAnalysis = () => {
    //TODO: how and when do we disable the analyze button?
    //TODO: Add translations
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
      p {
        padding: 0;
        border-bottom: 1px solid gray;
        margin: 0 auto;
        padding: 10px 0 10px 0;
      }
    `;

    const MethodSelection = ({ placeholder }) => {
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
      return (
        <SelectWrap>
          <StyledSelect required>
            <option value="" disabled selected hidden>
              {placeholder}
            </option>
            <option value="1">Analyze a shape on the map</option>
            <option value="2">Analyze your own shape</option>
            <option value="3">Upload Shape file</option>
          </StyledSelect>
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

  const Buffer = () => {
    return (
      <div className="span-wrapper buffer">
        <span className="left" style={{ borderTop: `1px solid ${customColorTheme}` }} /> Or{' '}
        <span className="right" style={{ borderBottom: `1px solid ${customColorTheme}` }} />
      </div>
    );
  };

  const DefaultAnalysisContent = (): JSX.Element => (
    <div className="analysis-tab-container">
      <div className="directions">
        <figure>
          <figcaption className="title">
            <h4>{'Analyze overlapping area between two shapes'}</h4>
          </figcaption>
          <ol>
            <li>Use the layers tab to turn on data layer</li>
            <li>Select 2 shapes.</li>
            <li>Click on the analyze button.</li>
          </ol>
        </figure>
        <BaseButton style={{ width: '15rem' }} onClick={() => dispatch(setMultiPolygonSelectionMode(true))}>
          <SelectionIcon height={18} width={18} fill={'#555'} />
          {'Start Selecting'}
        </BaseButton>
        <Buffer />
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
        <PolygonIcon width={100} height={100} customColorTheme={customColorTheme} />
        <Buffer />
        <figure>
          <figcaption className="title">
            <h4>{analyzeYourShapeTitle}</h4>
          </figcaption>
          <ol>
            <li>{returnFirstInstruction()}</li>
            {analyzeYourShapeDirections.map((direction: string, index: number) => (
              <li key={index}>{direction}</li>
            ))}
          </ol>
        </figure>
        <button
          style={{ backgroundColor: customColorTheme }}
          className="orange-button"
          onClick={(): void => mapController.createPolygonSketch()}
        >
          <PenIcon height={25} width={25} fill={'#555'} />
          {drawButton}
        </button>
        <Buffer />
        <figure>
          <figcaption className="title">
            <h4>{enterCoordinatesTitle}</h4>
          </figcaption>
          <ol>
            {enterCoordinatesDirections.map((direction: string, index: number) => (
              <li key={index}>{direction}</li>
            ))}
          </ol>
        </figure>
        <button
          style={{ backgroundColor: customColorTheme }}
          className="orange-button"
          onClick={() => dispatch(renderModal('PenWidget-CoordinatesForm'))}
        >
          <PlusIcon height={25} width={25} fill={'#000'} />
          {coordinatesButton}
        </button>
        <Buffer />
        <div className="drop-shapefile-container">
          <h4>{returnVisitTitle()}</h4>
          <UploadFile />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {tabViewIsVisible && activeFeaturesLength !== 0 && !multiPolygonSelection && <BaseAnalysis />}
      {tabViewIsVisible && activeFeaturesLength == 0 && !multiPolygonSelection && <DefaultAnalysisContent />}
      {tabViewIsVisible && multiPolygonSelection && <MultiPolygonAnalysis />}
    </>
  );
};

export default AnalysisTabView;
