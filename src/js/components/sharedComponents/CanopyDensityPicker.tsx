import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../js/store';
import { renderModal } from '../../../js/store/appState/actions';
import { markValueMap } from '../../../js/components/mapWidgets/widgetContent/CanopyDensityContent';

import { canopyDensityPickerConfig } from '../../../../configs/translations/leftPanel.translations';

const CanopyDensityPicker = (): JSX.Element => {
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
    <div className="canopy-density-picker-wrapper">
      <span>{displayLabel[0]} </span>
      <button
        className="canopy-density-picker"
        style={{ backgroundColor: `${customColorTheme}` }}
        onClick={handleDensityButtonClick}
      >{`> ${markValueMap[density]}%`}</button>
      <span> {displayLabel[1]}</span>
    </div>
  );
};

export default CanopyDensityPicker;
