import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../js/store/index';
import { renderModal } from '../../../js/store/appState/actions';
import { MeasureIcon } from '../../../images/measureIcon';

const MeasureWidget: FunctionComponent = () => {
  const modalType = useSelector(
    (state: RootState) => state.appState.renderModal
  );
  const dispatch = useDispatch();

  const handleWidget = (): void => {
    if (modalType === 'MeasureWidget') {
      dispatch(renderModal(''));
    } else {
      dispatch(renderModal('MeasureWidget'));
    }
  };

  return (
    <>
      <div className="widget-container">
        <button
          className="image-wrapper"
          aria-label="measure widget"
          onClick={handleWidget}
        >
          <MeasureIcon height={25} width={25} fill={'#555'} />
        </button>
      </div>
    </>
  );
};

export default MeasureWidget;
