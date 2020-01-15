import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import { renderModal } from '../../store/appState/actions';

import { ReactComponent as PrintIcon } from '../../../images/PrintIcon.svg';

const PrintWidget: FunctionComponent = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="widget-container">
        <button
          className="image-wrapper"
          onClick={() => dispatch(renderModal({ renderModal: 'PrintWidget' }))}
        >
          <PrintIcon height={25} width={25} fill={'#555'} />
        </button>
      </div>
    </>
  );
};

export default PrintWidget;
