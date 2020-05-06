import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store/index';
import { mapController } from 'js/controllers/mapController';
import styled from 'styled-components';
import 'css/layer-toggle-checkbox.scss';

interface LayerToggleProps {
  layerIsVisible: boolean | undefined;
  layerID: string;
  sublayer?: boolean;
  parentID?: string;
}

const LayerToggleSwitch = (props: LayerToggleProps): React.ReactElement => {
  const customColorTheme = useSelector(
    (store: RootState) => store.appSettings.customColorTheme
  );

  const { layerIsVisible, layerID, sublayer, parentID } = props;

  const toggleVisibility = (): void => {
    if (layerID === 'VIIRS_ACTIVE_FIRES' || layerID === 'MODIS_ACTIVE_FIRES') {
      mapController.toggleVIIRSorMODIS(layerID);
    } else {
      mapController.toggleLayerVisibility(layerID, sublayer, parentID);
    }
  };

  //Override speudo element styling with our custom style
  const CheckboxWrapper = styled.div`
    .styled-checkbox:checked + .styled-checkboxlabel:before {
      background-color: ${customColorTheme};
    }
  `;

  return (
    <CheckboxWrapper>
      <div className="layer-checkbox">
        <input
          type="checkbox"
          name="styled-checkbox"
          className="styled-checkbox"
          id={`layer-checkbox-${layerID}`}
          checked={layerIsVisible}
          onChange={(): void => toggleVisibility()}
        />
        <label
          className="styled-checkboxlabel"
          htmlFor={`layer-checkbox-${layerID}`}
        >
          {layerID}
        </label>
      </div>
    </CheckboxWrapper>
  );
};

export default LayerToggleSwitch;
