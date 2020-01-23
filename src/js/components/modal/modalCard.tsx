import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PrintContent from '../mapWidgets/widgetContent/printContent';
import ShareContent from '../mapWidgets/widgetContent/shareContent';
import PenContent from '../mapWidgets/widgetContent/penContent';
import SearchContent from '../mapWidgets/widgetContent/searchContent';

import { renderModal } from '../../store/appState/actions';

import '../../../css/modalCard.scss';

const ModalCard: FunctionComponent<{}> = () => {
  const modalType = useSelector((state: any) => state.appState.renderModal);
  const dispatch = useDispatch();

  const handleEscapeKey = (e: React.KeyboardEvent) => {
    if (e.keyCode === 27) {
      // * NOTE ESC button has a keyCode of 27
      dispatch(renderModal(''));
    }
  };

  const returnContent = () => {
    switch (modalType) {
      case 'PrintWidget':
        return <PrintContent />;
      case 'ShareWidget':
        return <ShareContent />;
      case 'PenWidget':
        return <PenContent />;
      case 'SearchWidget':
        return <SearchContent />;
      default:
        break;
    }
  };

  return (
    <>
      <div
        className="dim-container"
        onClick={() => dispatch(renderModal(''))}
      ></div>
      <div className="modal-card-container">
        <button
          className="exit-button"
          onClick={() => dispatch(renderModal(''))}
          onKeyDown={e => handleEscapeKey(e)}
        >
          <svg className="svg-icon">
            <svg id="shape-close" viewBox="0 0 25 25">
              <title>Close</title>
              <path d="M 5 19 L 19 5 L 21 7 L 7 21 L 5 19 ZM 7 5 L 21 19 L 19 21 L 5 7 L 7 5 Z"></path>
            </svg>
          </svg>
        </button>
        {returnContent()}
      </div>
    </>
  );
};

export default ModalCard;
