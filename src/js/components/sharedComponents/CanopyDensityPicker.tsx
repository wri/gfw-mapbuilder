import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { renderModal } from '../../store/appState/actions';
import { markValueMap } from '../mapWidgets/widgetContent/CanopyDensityContent';
import { treeMosaicDensityValue } from '../mapWidgets/widgetContent/TreeMosaicContent';
import {
  canopyDensityPickerConfig,
  forestCarbonGrossEmissionConfig,
  forestCarbonGrossRemovalConfig,
  forestCarbonNetFluxConfig,
  treesMosaicConfig,
} from '../../../../configs/translations/leftPanel.translations';
import { forestCarbonRemovalValue } from '../mapWidgets/widgetContent/ForestGrossRemovalContent';
import { forestCarbonGrossEmisionValue } from '../mapWidgets/widgetContent/ForestCarbonGrossEmissionContent';
import { forestCarbonNetFluxValue } from '../mapWidgets/widgetContent/ForesCarbonNetFlux';
import { handleCustomColorTheme } from '../../../utils';

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

  const themeColor = handleCustomColorTheme(customColorTheme);

  if (props.type === 'TREES_MOSAIC_LANDSCAPES') {
    config = treesMosaicConfig[selectedLanguage];
    densityValueMap = treeMosaicDensityValue[density];
  } else if (props.type === 'FOREST_CARBON_GROSS_REMOVALS') {
    config = forestCarbonGrossRemovalConfig[selectedLanguage];
    densityValueMap = forestCarbonRemovalValue[density] || forestCarbonRemovalValue[2];
  } else if (props.type === 'FOREST_CARBON_GROSS_EMISSIONS') {
    config = forestCarbonGrossEmissionConfig[selectedLanguage];
    densityValueMap = forestCarbonGrossEmisionValue[density] || forestCarbonRemovalValue[2];
  } else if (props.type === 'FOREST_CARBON_NET_FLUX') {
    config = forestCarbonNetFluxConfig[selectedLanguage];
    densityValueMap = forestCarbonNetFluxValue[density] || forestCarbonRemovalValue[2];
  }
  const { displayLabel } = config;

  function handleDensityButtonClick(): void {
    if (props.type === 'TREES_MOSAIC_LANDSCAPES') {
      dispatch(renderModal('treeMosaic'));
    } else if (props.type === 'FOREST_CARBON_GROSS_REMOVALS') {
      dispatch(renderModal('forestCarbonRemoval'));
    } else if (props.type === 'FOREST_CARBON_GROSS_EMISSIONS') {
      dispatch(renderModal('forestCarbonGrossEmissions'));
    } else if (props.type === 'FOREST_CARBON_NET_FLUX') {
      dispatch(renderModal('forestCarbonNetFlux'));
    } else {
      dispatch(renderModal('CanopyDensity'));
    }
  }

  return (
    <div className="canopy-density-picker-wrapper">
      <span>{displayLabel[0]} </span>
      <button
        className="canopy-density-picker"
        style={{ backgroundColor: `${themeColor}` }}
        onClick={handleDensityButtonClick}
      >{`> ${densityValueMap}%`}</button>
      <span> {displayLabel[1]}</span>
    </div>
  );
};

export default CanopyDensityPicker;
