import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UploadFile from '../../../../js/components/sharedComponents/UploadFile';
import { mapController } from '../../../../js/controllers/mapController';
import { renderModal } from '../../../../js/store/appState/actions';
import { RootState } from '../../../../js/store';
import BaseAnalysis from '../../../../js/components/leftPanel/analysisPanel/BaseAnalysis';
import { analysisContent } from '../../../../../configs/translations/leftPanel.translations';
import { PolygonIcon } from 'images/PolygonIcon';
import { ReactComponent as PenIcon } from 'images/penIcon.svg';
import { ReactComponent as PlusIcon } from 'images/plusIcon.svg';
import { createSelector } from 'reselect';

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
  const activeTab = useSelector(
    (store: RootState) => store.appState.leftPanel.activeTab
  );
  const selectedLanguage = useSelector(
    (store: RootState) => store.appState.selectedLanguage
  );
  const customColorTheme = useSelector(
    (store: RootState) => store.appSettings.customColorTheme
  );

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

  const DefaultAnalysisContent = (): JSX.Element => (
    <div className="analysis-tab-container">
      <div className="directions">
        <figure>
          <figcaption className="title">
            <h4>{analyzeExistingShapeTitle}</h4>
          </figcaption>
          <ol>
            {analyzeExistingShapeDirections.map(
              (direction: string, index: number) => (
                <li key={index}>{direction}</li>
              )
            )}
          </ol>
        </figure>
        <PolygonIcon
          width={100}
          height={100}
          customColorTheme={customColorTheme}
        />
        <div className="span-wrapper">
          <span
            className="left"
            style={{ borderTop: `1px solid ${customColorTheme}` }}
          />{' '}
          Or{' '}
          <span
            className="right"
            style={{ borderBottom: `1px solid ${customColorTheme}` }}
          />
        </div>
        <figure>
          <figcaption className="title">
            <h4>{analyzeYourShapeTitle}</h4>
          </figcaption>
          <ol>
            <li>{returnFirstInstruction()}</li>
            {analyzeYourShapeDirections.map(
              (direction: string, index: number) => (
                <li key={index}>{direction}</li>
              )
            )}
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
        <div className="span-wrapper buffer">
          <span
            className="left"
            style={{ borderTop: `1px solid ${customColorTheme}` }}
          />{' '}
          Or{' '}
          <span
            className="right"
            style={{ borderBottom: `1px solid ${customColorTheme}` }}
          />
        </div>
        <figure>
          <figcaption className="title">
            <h4>{enterCoordinatesTitle}</h4>
          </figcaption>
          <ol>
            {enterCoordinatesDirections.map(
              (direction: string, index: number) => (
                <li key={index}>{direction}</li>
              )
            )}
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
        <div className="span-wrapper buffer">
          <span
            className="left"
            style={{ borderTop: `1px solid ${customColorTheme}` }}
          />{' '}
          Or{' '}
          <span
            className="right"
            style={{ borderBottom: `1px solid ${customColorTheme}` }}
          />
        </div>
        <div className="drop-shapefile-container">
          <h4>{returnVisitTitle()}</h4>
          <UploadFile />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {tabViewIsVisible && activeFeaturesLength !== 0 && <BaseAnalysis />}
      {tabViewIsVisible && activeFeaturesLength == 0 && (
        <DefaultAnalysisContent />
      )}
    </>
  );
};

export default AnalysisTabView;
