import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { penContent } from '../../../../../configs/modal.config';

const PenContent: FunctionComponent = () => {
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

  return (
    <div className="modal-content-container">
      <div className="directions">
        <h4 className="title">{drawTitle}</h4>
        <ol>
          {drawInstructions.map((direction: String) => (
            <li>{direction}</li>
          ))}
        </ol>
        <button>{drawButton}</button>
        <br />
        ---------------------- Or -------------------------
        <h4 className="title">{coordinatesTitle}</h4>
        <ol>
          {coordinatesInstructions.map((direction: String) => (
            <li>{direction}</li>
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
