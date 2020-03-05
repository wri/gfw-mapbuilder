import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import UploadFile from 'js/components/sharedComponents/UploadFile';

import { mapController } from 'js/controllers/mapController';

import { renderModal } from 'js/store/appState/actions';

import { RootState } from 'js/store';
import BaseAnalysis from 'js/components/leftPanel/analysisPanel/BaseAnalysis';

import { analysisContent } from 'configs/leftPanel.config';

import { ReactComponent as PolygonIcon } from 'images/polygonIcon.svg';
import { ReactComponent as PenIcon } from 'images/penIcon.svg';
import { ReactComponent as PlusIcon } from 'images/plusIcon.svg';

interface TabProps {
  key: string;
  label: string;
}

const AnalysisTabView = (props: TabProps): JSX.Element => {
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
    visitTitle
  } = analysisContent[selectedLanguage];

  const { activeFeatures } = useSelector(
    (store: RootState) => store.mapviewState
  );

  const tabViewIsVisible = tabViewVisible && activeTab === props.label;

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
        <PolygonIcon width={100} height={100} />
        <div className="span-wrapper">
          <span className="left" /> Or <span className="right" />
        </div>
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
        <div className="span-wrapper buffer">
          <span className="left" /> Or <span className="right" />
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
          className="orange-button"
          onClick={() => dispatch(renderModal('PenWidget-CoordinatesForm'))}
        >
          <PlusIcon height={25} width={25} fill={'#000'} />
          {coordinatesButton}
        </button>
        <div className="span-wrapper buffer">
          <span className="left" /> Or <span className="right" />
        </div>
        <div className="drop-shapefile-container">
          <h4>
            {visitTitle}
            <PenIcon height={21} width={21} fill={'#555'} />
          </h4>
          <UploadFile />
        </div>
      </div>
    </div>
  );

  const TabViewContent = (): JSX.Element | null => {
    if (tabViewIsVisible) {
      //let's check for active features
      if (activeFeatures.length === 0) {
        return <DefaultAnalysisContent />;
      } else {
        return <BaseAnalysis />;
      }
    } else {
      return null;
    }
  };

  return <TabViewContent />;
};

export default AnalysisTabView;
