import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import { renderModal } from '../../store/appState/actions';

import '../../../css/modalCard.scss';

interface ModalProps {
  children: any;
}

const ModalCard: FunctionComponent<ModalProps> = ({ children }) => {
  const dispatch = useDispatch();

  const returnContent = () => {
    return (
      <>
        <div
          className="dim-container"
          onClick={() => dispatch(renderModal({ renderModal: '' }))}
        >
          <div className="modal-card-container">
            <button
              className="exit-button"
              onClick={() => dispatch(renderModal({ renderModal: '' }))}
            >
              <svg className="svg-icon">
                <svg id="shape-close" viewBox="0 0 25 25">
                  <title>Close</title>
                  <path d="M 5 19 L 19 5 L 21 7 L 7 21 L 5 19 ZM 7 5 L 21 19 L 19 21 L 5 7 L 7 5 Z"></path>
                </svg>
              </svg>
            </button>
            {children}
          </div>
        </div>
      </>
    );
  };

  return <>{returnContent()}</>;
};

export default ModalCard;
