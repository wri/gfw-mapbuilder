import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { renderModal } from '../../store/appState/actions';

import '../../../css/modalCard.scss';

interface ModalProps {
  children: any;
}

const ModalCard: FunctionComponent<ModalProps> = ({ children }) => {
  const modalType = useSelector((state: any) => state.appState.renderModal);
  const dispatch = useDispatch();

  const setModalClassName = () => {
    switch (modalType) {
      case 'PrintWidget':
        return 'print-modal';
      case 'ShareWidget':
        return 'share-modal';
      case 'PenWidget':
        return 'pen-modal';
      case 'SearchWidget':
        return 'search-modal';
      default:
        break;
    }
  };

  const returnContent = () => {
    return (
      <>
        <div
          className="dim-container"
          onClick={() => dispatch(renderModal({ renderModal: '' }))}
        ></div>
        <div className={`modal-card-container ${setModalClassName()}`}>
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
      </>
    );
  };

  return <>{returnContent()}</>;
};

export default ModalCard;
