import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import { renderModal } from '../../store/appState/actions';

import { ReactComponent as PenIcon } from '../../../images/penIcon.svg';

const PenWidget: FunctionComponent = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="widget-container">
        <button
          className="image-wrapper"
          onClick={() => dispatch(renderModal({ renderModal: 'PenWidget' }))}
        >
          <PenIcon height={25} width={25} fill={'#555'} />
        </button>
      </div>
    </>
  );
};

export default PenWidget;
