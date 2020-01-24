import React, { FunctionComponent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { renderModal } from '../../../store/appState/actions';

import { mapController } from '../../../controllers/mapController';

import { penContent } from '../../../../../configs/modal.config';

import { ReactComponent as PolygonIcon } from '../../../../images/PolygonIcon.svg';
import { ReactComponent as PenIcon } from '../../../../images/penIcon.svg';
import { ReactComponent as PlusIcon } from '../../../../images/PlusIcon.svg';

import '../../../../css/penContent.scss';

const PenContent: FunctionComponent = () => {
  const dispatch = useDispatch();

  const selectedLanguage = useSelector(
    (state: any) => state.appState.selectedLanguage
  );
  const {
    drawTitle,
    drawInstructions,
    drawButton,
    coordinatesTitle,
    coordinatesInstructions,
    coordinatesButton,
    shapefileButton,
    shapefileInstructions
  } = penContent[selectedLanguage];

  useEffect(() => {
    mapController.initializeAndSetSketch();
  });

  const setDrawTool = () => {
    dispatch(renderModal(''));
    mapController.createPolygonSketch();
  };

  return (
    <div className="pen-content-container">
      <div className="directions">
        <figure>
          <figcaption className="title">
            <h4>{drawTitle}</h4>
          </figcaption>
          <ol>
            {drawInstructions.map((direction: String, i: number) => (
              <li key={i}>{direction}</li>
            ))}
          </ol>
        </figure>
        <PolygonIcon
          className="polygon-icon"
          fill={'#fff'}
          height={75}
          width={100}
        />
        <button className="orange-button" onClick={() => setDrawTool()}>
          <PenIcon fill={'#000'} height={25} width={25} />
          {drawButton}
        </button>
        <hr />
        <figure>
          <figcaption className="title">
            <h4>{coordinatesTitle}</h4>
          </figcaption>
          <ol>
            {coordinatesInstructions.map((direction: String, i: number) => (
              <li key={i}>{direction}</li>
            ))}
          </ol>
        </figure>
        <button
          className="orange-button"
          onClick={() => dispatch(renderModal('PenWidget-CoordinatesForm'))}
        >
          <PlusIcon fill={'#fff'} height={25} width={25} />
          {coordinatesButton}
        </button>
        <hr />
        <button>{shapefileButton}</button>
        <p className="shapefile-instructions">* {shapefileInstructions}</p>
      </div>
    </div>
  );
};

export default PenContent;
