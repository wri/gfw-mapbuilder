import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'js/store';
import { renderModal } from 'js/store/appState/actions';
import { markValueMap } from 'js/components/mapWidgets/widgetContent/CanopyDensityContent';

import { canopyDensityPickerConfig } from 'configs/leftPanel.translations';

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
  const selectedLanguage = useSelector(
    (store: RootState) => store.appState.selectedLanguage
  );

  const { displayLabel } = canopyDensityPickerConfig[selectedLanguage];

  function handleDensityButtonClick(): void {
    dispatch(renderModal('CanopyDensity'));
  }

  return (
    <>
      <div>
        {props.label &&
          displayLabel.map((label: string, index: number) => {
            if (index === 0) {
              return (
                <div key={index}>
                  <span>
                    {label}{' '}
                    <button
                      className="canopy-density-picker"
                      style={{ backgroundColor: `${customColorTheme}` }}
                      onClick={handleDensityButtonClick}
                    >{`> ${markValueMap[density]}%`}</button>
                  </span>
                </div>
              );
            } else {
              return (
                <div key={index}>
                  <span> {label}</span>
                </div>
              );
            }
          })}
      </div>
    </>
  );
};

export default CanopyDensityPicker;
