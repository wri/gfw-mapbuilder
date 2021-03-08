import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { renderModal } from '../../store/appState/actions';

import { ShareIcon } from '../../../images/shareIcon';

const ShareWidget: FunctionComponent = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="widget-container">
        <button
          className="image-wrapper"
          aria-label="share widget"
          onClick={() => dispatch(renderModal('ShareWidget'))}
        >
          <ShareIcon height={25} width={25} fill={'#555'} />
        </button>
      </div>
    </>
  );
};

export default ShareWidget;
