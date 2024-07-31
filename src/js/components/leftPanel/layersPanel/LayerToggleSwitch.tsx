import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { mapController } from '../../../controllers/mapController';
import styled from 'styled-components';
import '../../../../css/layer-toggle-checkbox.scss';
import { handleCustomColorTheme } from '../../../../utils';
import { LAYER_IDS } from '../../../../../configs/layer-config';
import { setProdesLayer } from '../../../store/appState/actions';
import ToggleComponent from '../../ui/ToggleComponent';
//Dynamic custom theme override using styled-components lib
interface CheckBoxWrapperProps {
  customColorTheme: string;
}
//Override speudo element styling with our custom style
const CheckboxWrapper = styled.div<CheckBoxWrapperProps>`
  .styled-checkbox:checked + .styled-checkboxlabel:before {
    background-color: ${(props) => props.customColorTheme};
  }
`;

interface LayerToggleProps {
  layerIsVisible: boolean | undefined;
  layerID: string;
  sublayer?: boolean;
  parentID?: string;
  isError?: boolean;
}

const LayerToggleSwitch = (props: LayerToggleProps): React.ReactElement => {
  const customColorTheme = useSelector((store: RootState) => store.appSettings.customColorTheme);
  const { layerIsVisible, layerID, sublayer, parentID } = props;
  const [isChecked, setIsChecked] = React.useState(layerIsVisible);
  const themeColor = handleCustomColorTheme(customColorTheme);
  const dispatch = useDispatch();

  const toggleVisibility = (checked: boolean): void => {
    if (layerID === 'MODIS_ACTIVE_FIRES') {
      mapController.toggleVIIRSorMODIS(layerID);
    } else {
      if (layerID === LAYER_IDS.INPE_CERRADO_PRODES || layerID === LAYER_IDS.INPE_AMAZON_PRODES) {
        mapController.toggleProdLayers(checked, layerID);
      } else {
        mapController.toggleLayerVisibility(checked, layerID, sublayer, parentID);
      }
    }

    if (layerID === LAYER_IDS.INPE_CERRADO_PRODES || layerID === LAYER_IDS.INPE_AMAZON_PRODES) {
      if (checked === false) {
        const cerradoProdLayer = mapController._map?.findLayerById(LAYER_IDS.INPE_CERRADO_PRODES);
        const amazonProdLayer = mapController._map?.findLayerById(LAYER_IDS.INPE_AMAZON_PRODES);
        cerradoProdLayer!.visible = false;
        amazonProdLayer!.visible = false;
        dispatch(setProdesLayer(cerradoProdLayer?.id));
      }
    }
    setIsChecked(checked);
  };

  const { isError = false } = props;
  return (
    <CheckboxWrapper customColorTheme={themeColor}>
      <div className="layer-checkbox">
        <ToggleComponent
          themeColor={themeColor}
          onChange={toggleVisibility}
          checked={!!isChecked}
          disabled={isError}
          layerName={layerID}
        />
        <label className="styled-checkboxlabel" htmlFor={`layer-checkbox-${layerID}`}>
          {layerID}
        </label>
      </div>
    </CheckboxWrapper>
  );
};

export default LayerToggleSwitch;
