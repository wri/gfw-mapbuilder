import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'js/store';
import { renderModal } from 'js/store/appState/actions';
import { marks } from 'js/components/mapWidgets/widgetContent/CanopyDensityContent';

//TODO: Language awareness
//
const CanopyDensityPicker = (): JSX.Element => {
  const dispatch = useDispatch();
  const { density } = useSelector(
    (store: RootState) => store.appState.leftPanel
  );

  function handleDensityButtonClick(): void {
    dispatch(renderModal('CanopyDensity'));
    //fire modal out
  }

  return (
    <>
      <div>
        <span>Change canopy density</span>
        <button
          className="canopy-density-picker"
          onClick={handleDensityButtonClick}
        >{`> ${marks[density]}`}</button>
      </div>
    </>
  );
};

export default CanopyDensityPicker;
