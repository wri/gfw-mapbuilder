import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'js/store';
import { renderModal } from 'js/store/appState/actions';
import { markValueMap } from 'js/components/mapWidgets/widgetContent/CanopyDensityContent';

//TODO: Language awareness
//
interface CanopyDensityPickerProps {
  label: boolean;
}

const CanopyDensityPicker = (props: CanopyDensityPickerProps): JSX.Element => {
  const dispatch = useDispatch();

  const customColorTheme = useSelector(
    (store: RootState) => store.appSettings.customColorTheme
  );
  const density = useSelector(
    (store: RootState) => store.appState.leftPanel.density
  );

  function handleDensityButtonClick(): void {
    dispatch(renderModal('CanopyDensity'));
  }

  return (
    <>
      <div>
        {props.label && <span>Change canopy density</span>}
        <button
          className="canopy-density-picker"
          style={{ backgroundColor: `${customColorTheme}` }}
          onClick={handleDensityButtonClick}
        >{`> ${markValueMap[density]}%`}</button>
      </div>
    </>
  );
};

export default CanopyDensityPicker;
