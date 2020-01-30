import React, { FunctionComponent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'js/store/index';

import { renderModal } from 'js/store/appState/actions';

import { ReactComponent as MeasureIcon } from 'images/measureIcon.svg';

const MeasureWidget: FunctionComponent = () => {
  const modalType = useSelector(
    (state: RootState) => state.appState.renderModal
  );
  const [renderWidget, setRenderWidget] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const toggleMeasureWidget = (): void => {
      if (renderWidget) {
        dispatch(renderModal('MeasureWidget'));
      } else {
        dispatch(renderModal(''));
      }
    };

    toggleMeasureWidget();
  }, [renderWidget]);

  useEffect(() => {
    const toggleByModalType = (): void => {
      if (modalType === 'MeasureWidget') {
        setRenderWidget(true);
      } else {
        setRenderWidget(false);
      }
    };

    toggleByModalType();
  }, [modalType]);

  return (
    <>
      <div className="widget-container">
        <button
          className="image-wrapper"
          onClick={(): void => setRenderWidget(!renderWidget)}
        >
          <MeasureIcon height={25} width={25} fill={'#555'} />
        </button>
      </div>
    </>
  );
};

export default MeasureWidget;
