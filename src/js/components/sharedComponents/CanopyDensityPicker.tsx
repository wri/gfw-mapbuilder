import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { renderModal, setActiveTreeMosaicLayer, setTreeMosaicHectaresValue } from '../../store/appState/actions';
import { markValueMap } from '../mapWidgets/widgetContent/CanopyDensityContent';
import { treeMosaicDensityValue } from '../mapWidgets/widgetContent/TreeMosaicContent';
import {
  canopyDensityPickerConfig,
  forestCarbonGrossEmissionConfig,
  forestCarbonGrossRemovalConfig,
  forestCarbonNetFluxConfig,
  treesMosaicConfig,
  treesMosaicHectareConfig,
  tropicalTreeConfig,
  tropicalTreeHectareBtnCongif,
} from '../../../../configs/translations/leftPanel.translations';
import { forestCarbonRemovalValue } from '../mapWidgets/widgetContent/ForestGrossRemovalContent';
import { forestCarbonGrossEmisionValue } from '../mapWidgets/widgetContent/ForestCarbonGrossEmissionContent';
import { forestCarbonNetFluxValue } from '../mapWidgets/widgetContent/ForesCarbonNetFlux';
import { handleCustomColorTheme } from '../../../utils';
import { mapController } from '../../controllers/mapController';
import { LayerFactory } from '../../helpers/LayerFactory';
import './canopyDensityPicker.scss';
import { LAYER_IDS } from '../../../../configs/layer-config';

interface CanopyDensityProps {
  type?: string;
}
const CanopyDensityPicker = (props: CanopyDensityProps): JSX.Element => {
  const allAvailableLayers = useSelector((store: RootState) => store.mapviewState.allAvailableLayers);

  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState<'hectare' | 'meter'>('meter');

  const customColorTheme = useSelector((store: RootState) => store.appSettings.customColorTheme);
  const density = useSelector((store: RootState) => store.appState.leftPanel.density);
  const hectareValue = useSelector((store: RootState) => store.appState.leftPanel.treeMosaicHectaresValue);

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

  const handleClick = async (type: 'meter' | 'hectare') => {
    const layerConfig = allAvailableLayers.find((layer: any) => layer.id === LAYER_IDS.TROPICAL_TREE_COVER) as any;

    if (type === selected) return;
    setSelected(type);
    dispatch(setActiveTreeMosaicLayer(type));

    const mapview = mapController.getMapView();
    mapController.removeMapLayer(LAYER_IDS.TROPICAL_TREE_COVER);
    mapController.updateLayerOpacity(LAYER_IDS.TROPICAL_TREE_COVER, 1);
    const updatedUMDLayer = await LayerFactory(mapview, layerConfig);

    mapController._map?.add(updatedUMDLayer);
  };

  const handleSelect = async (event: any) => {
    const layerConfig = allAvailableLayers.find((layer: any) => layer.id === LAYER_IDS.TROPICAL_TREE_COVER) as any;

    const value = Number(event.target.value);
    dispatch(setTreeMosaicHectaresValue(value));
    const mapview = mapController.getMapView();
    mapController.removeMapLayer(LAYER_IDS.TROPICAL_TREE_COVER);

    const updatedUMDLayer = await LayerFactory(mapview, layerConfig);
    mapController._map?.add(updatedUMDLayer);
  };

  return (
    <div className="canopy-density-picker-wrapper">
      {props.type !== LAYER_IDS.TROPICAL_TREE_COVER && <span> {displayLabel[0]}</span>}

      {props.type === LAYER_IDS.TROPICAL_TREE_COVER && (
        <div className="tropical-tree-cover-toggle-wrapper">
          <div className="toggle-btn">
            <button onClick={() => handleClick('hectare')} className={selected === 'hectare' ? 'active' : ''}>
              {tropicalTreeHectareBtnCongif[selectedLanguage]?.displayLabel[0]}
            </button>
            <button onClick={() => handleClick('meter')} className={selected === 'meter' ? 'active' : ''}>
              {tropicalTreeHectareBtnCongif[selectedLanguage]?.displayLabel[1]}
            </button>
          </div>
          {selected === 'hectare' && (
            <>
              <span>{treesMosaicHectareConfig[selectedLanguage]?.displayLabel[0]}</span>

              <select onChange={handleSelect} value={hectareValue}>
                <option value={10}>{'>10%'}</option>
                <option value={20}>{'>20%'}</option>
                <option value={30}>{'>30%'}</option>
                <option value={40}>{'>40%'}</option>
                <option value={50}>{'>50%'}</option>
                <option value={60}>{'>60%'}</option>
                <option value={70}>{'>70%'}</option>
                <option value={80}>{'>80%'}</option>
                <option value={90}>{'>90%'}</option>
              </select>
              <span className="tree-cover-text">{treesMosaicHectareConfig[selectedLanguage]?.displayLabel[1]}</span>
            </>
          )}
          {selected === 'meter' && <span> {tropicalTreeConfig[selectedLanguage]?.displayLabel[1]}</span>}
        </div>
      )}

      {props.type !== LAYER_IDS.TROPICAL_TREE_COVER && (
        <>
          <button
            className="canopy-density-picker"
            style={{ backgroundColor: `${themeColor}` }}
            onClick={handleDensityButtonClick}
          >{`> ${densityValueMap}%`}</button>
          <span> {displayLabel[1]}</span>
        </>
      )}
    </div>
  );
};

export default CanopyDensityPicker;
