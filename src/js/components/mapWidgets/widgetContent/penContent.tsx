import React, { FunctionComponent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { renderModal } from '../../../store/appState/actions';

import { mapController } from '../../../controllers/mapController';

import { penContent } from '../../../../../configs/modal.config';

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
    <div className="modal-content-container">
      <div className="directions">
        <h4 className="title">{drawTitle}</h4>
        <ol>
          {drawInstructions.map((direction: String, i: number) => (
            <li key={i}>{direction}</li>
          ))}
        </ol>
        <button onClick={() => setDrawTool()}>{drawButton}</button>
        <br />
        ---------------------- Or -------------------------
        <h4 className="title">{coordinatesTitle}</h4>
        <ol>
          {coordinatesInstructions.map((direction: String, i: number) => (
            <li key={i}>{direction}</li>
          ))}
        </ol>
        <button>{coordinatesButton}</button>
        <br />
        ---------------------- Or -------------------------
        <br />
        <button>{shapefileButton}</button>
        <p>* {shapefileInstructions}</p>
      </div>
    </div>
  );
};

export default PenContent;
