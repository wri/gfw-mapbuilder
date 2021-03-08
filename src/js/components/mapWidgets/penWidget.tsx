import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { renderModal } from '../../store/appState/actions';

import { PenIcon } from '../../../images/penIcon';

const PenWidget: FunctionComponent = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="widget-container">
        <button
          className="image-wrapper"
          aria-label="pen widget"
          onClick={() => dispatch(renderModal('PenWidget'))}
        >
          <PenIcon height={25} width={25} fill={'#555'} />
        </button>
      </div>
    </>
  );
};

export default PenWidget;
