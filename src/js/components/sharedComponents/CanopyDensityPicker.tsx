import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { renderModal } from '../../store/appState/actions';
import { markValueMap } from '../mapWidgets/widgetContent/CanopyDensityContent';
import { treeMosaicDensityValue } from '../mapWidgets/widgetContent/TreeMosaicContent';
import { canopyDensityPickerConfig, treesMosaicConfig } from '../../../../configs/translations/leftPanel.translations';

interface CanopyDensityProps {
  type?: string;
}
const CanopyDensityPicker = (props: CanopyDensityProps): JSX.Element => {
  const dispatch = useDispatch();

  const customColorTheme = useSelector((store: RootState) => store.appSettings.customColorTheme);
  const density = useSelector((store: RootState) => store.appState.leftPanel.density);
  const selectedLanguage = useSelector((store: RootState) => store.appState.selectedLanguage);
  let config = canopyDensityPickerConfig[selectedLanguage];
  let densityValueMap = markValueMap[density];
  if (props.type === 'TREES_MOSAIC_LANDSCAPES') {
    config = treesMosaicConfig[selectedLanguage];
    densityValueMap = treeMosaicDensityValue[density];
  }
  const { displayLabel } = config;

  function handleDensityButtonClick(): void {
    if (props.type === 'TREES_MOSAIC_LANDSCAPES') {
      dispatch(renderModal('treeMosaic'));
    } else {
      dispatch(renderModal('CanopyDensity'));
    }
  }
  return (
    <div className="canopy-density-picker-wrapper">
      <span>{displayLabel[0]} </span>
      <button
        className="canopy-density-picker"
        style={{ backgroundColor: `${customColorTheme}` }}
        onClick={handleDensityButtonClick}
      >{`> ${densityValueMap}%`}</button>
      <span> {displayLabel[1]}</span>
    </div>
  );
};

export default CanopyDensityPicker;
