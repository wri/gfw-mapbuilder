import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { mapController } from 'js/controllers/mapController';

import { renderModal } from 'js/store/appState/actions';

import { RootState } from 'js/store';

import { analysisContent } from 'configs/leftPanel.config';

import { ReactComponent as PolygonIcon } from 'images/polygonIcon.svg';
import { ReactComponent as PenIcon } from 'images/penIcon.svg';
import { ReactComponent as PlusIcon } from 'images/plusIcon.svg';

interface Props {
  key: string;
  label: string;
}
const AnalysisTabView = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { selectedLanguage, leftPanel } = useSelector(
    (store: RootState) => store.appState
  );
  const { activeTab, tabViewVisible } = leftPanel;

  const {
    analyzeExistingShapeTitle,
    analyzeExistingShapeDirections,
    analyzeYourShapeTitle,
    analyzeYourShapeDirections,
    drawButton,
    enterCoordinatesTitle,
    enterCoordinatesDirections,
    coordinatesButton,
    visitTitle,
    uploadShapefileTitle,
    uploadShapefileDirections
  } = analysisContent[selectedLanguage];

  const tabViewIsVisible = tabViewVisible && activeTab === props.label;

  return (
    <>
      {tabViewIsVisible && (
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
            <PolygonIcon className="polygon-icon" />
            <hr />
            <figure>
              <figcaption className="title">
                <h4>{analyzeYourShapeTitle}</h4>
              </figcaption>
              <ol>
                {analyzeYourShapeDirections.map(
                  (direction: string, index: number) => (
                    <li key={index}>{direction}</li>
                  )
                )}
              </ol>
            </figure>
            <button
              className="orange-button"
              onClick={(): void => mapController.createPolygonSketch()}
            >
              <PenIcon height={25} width={25} fill={'#555'} />
              {drawButton}
            </button>
            <hr />
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
              className="orange-button"
              onClick={() => dispatch(renderModal('PenWidget-CoordinatesForm'))}
            >
              <PlusIcon height={25} width={25} fill={'#000'} />
              {coordinatesButton}
            </button>
            <hr />
            <div className="drop-shapefile-container">
              <h4>
                {visitTitle}
                <PenIcon height={21} width={21} fill={'#555'} />
              </h4>
              <p>{uploadShapefileTitle}</p>
              <p className="upload-disclaimer">* {uploadShapefileDirections}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnalysisTabView;
