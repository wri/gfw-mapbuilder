import React, { FunctionComponent, DragEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { renderModal } from 'js/store/appState/actions';

import { mapController } from 'js/controllers/mapController';

import { penContent } from 'configs/modal.config';

import { ReactComponent as PolygonIcon } from 'images/polygonIcon.svg';
import { ReactComponent as PenIcon } from 'images/penIcon.svg';
import { ReactComponent as PlusIcon } from 'images/plusIcon.svg';

import 'css/penContent.scss';

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

  const setDrawTool = () => {
    dispatch(renderModal(''));
    mapController.createPolygonSketch();
  };

  const onDragFile = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onDropFile = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    console.log('onDropFile()', file);
  };

  return (
    <div className="pen-content-container">
      <div className="directions">
        <figure>
          <figcaption className="title">
            <h4>{drawTitle}</h4>
          </figcaption>
          <ol>
            {drawInstructions.map((direction: string, i: number) => (
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
            {coordinatesInstructions.map((direction: string, i: number) => (
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
        <div
          onDragOver={(e: DragEvent<HTMLDivElement>): void => onDragFile(e)}
          onDrop={(e: DragEvent<HTMLDivElement>): void => onDropFile(e)}
        >
          <span>{shapefileButton}</span>
        </div>
        <p className="shapefile-instructions">* {shapefileInstructions}</p>
      </div>
    </div>
  );
};

export default PenContent;
