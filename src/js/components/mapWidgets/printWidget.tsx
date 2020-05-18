import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import { renderModal } from '../../store/appState/actions';

import { ReactComponent as PrintIcon } from '../../../images/printIcon.svg';

const PrintWidget: FunctionComponent = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="widget-container">
        <button
          className="image-wrapper"
          aria-label="print widget"
          onClick={() => dispatch(renderModal('PrintWidget'))}
        >
          <PrintIcon height={25} width={25} fill={'#555'} />
        </button>
      </div>
    </>
  );
};

export default PrintWidget;
