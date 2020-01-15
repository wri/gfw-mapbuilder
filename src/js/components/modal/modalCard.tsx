import React, { FunctionComponent, useState, useEffect } from 'react';

import '../../../css/modalCard.scss';

interface ModalProps {
  renderModal: boolean;
  children: any;
  setOpenWidget: any;
}

const ModalCard: FunctionComponent<ModalProps> = ({
  renderModal,
  children,
  setOpenWidget
}) => {
  const [widgetClosed, closeWidget] = useState(false);

  useEffect(() => {
    closeWidget(renderModal);
  }, [renderModal]);

  const returnContent = () => {
    if (widgetClosed) {
      return (
        <>
          <div
            className="dim-container"
            onClick={() => setOpenWidget(!widgetClosed)}
          >
            <div className="modal-card-container">
              <button
                className="exit-button"
                onClick={() => setOpenWidget(!widgetClosed)}
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
    }
  };

  return <>{returnContent()}</>;
};

export default ModalCard;
