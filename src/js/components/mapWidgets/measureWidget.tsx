import React, { FunctionComponent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { renderModal } from 'js/store/appState/actions';

import { ReactComponent as MeasureIcon } from 'images/measureIcon.svg';

const MeasureWidget: FunctionComponent = () => {
  const modalType = useSelector((state: any) => state.appState.renderModal);
  const [renderWidget, setRenderWidget] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    toggleMeasureWidget();
  }, [renderWidget]);

  useEffect(() => {
    toggleByModalType();
  }, [modalType]);

  const toggleMeasureWidget = () => {
    if (renderWidget) {
      dispatch(renderModal('MeasureWidget'));
    } else {
      dispatch(renderModal(''));
    }
  };

  const toggleByModalType = () => {
    if (modalType === 'MeasureWidget') {
      setRenderWidget(true);
    } else {
      setRenderWidget(false);
    }
  };

  return (
    <>
      <div className="widget-container">
        <button
          className="image-wrapper"
          onClick={() => setRenderWidget(!renderWidget)}
        >
          <MeasureIcon height={25} width={25} fill={'#555'} />
        </button>
      </div>
    </>
  );
};

export default MeasureWidget;
