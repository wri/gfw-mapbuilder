import React, { FunctionComponent } from 'react';

interface ModalProps {
  renderModal: boolean;
  children: any;
}

const ModalCard: FunctionComponent<ModalProps> = ({
  renderModal,
  children
}) => {
  const returnCard = () => {
    if (renderModal) {
      return (
        <div className="modal-wrapper">
          <span>ModalCard</span>
          {children}
        </div>
      );
    }
  };

  return <>{returnCard()}</>;
};

export default ModalCard;
