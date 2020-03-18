import * as React from 'react';
import { mapController } from 'js/controllers/mapController';
import 'css/layer-toggle-checkbox.scss';

interface LayerToggleProps {
  layerIsVisible: boolean | undefined;
  layerID: string;
  sublayer?: boolean;
  parentID?: string;
}

const LayerToggleSwitch = (props: LayerToggleProps): React.ReactElement => {
  const { layerIsVisible, layerID, sublayer, parentID } = props;
  return (
    <div className="layer-checkbox">
      <input
        type="checkbox"
        name="styled-checkbox"
        className="styled-checkbox"
        id={`layer-checkbox-${layerID}`}
        checked={layerIsVisible}
        onChange={(): void =>
          mapController.toggleLayerVisibility(layerID, sublayer, parentID)
        }
      />
      <label
        className="styled-checkboxlabel"
        htmlFor={`layer-checkbox-${layerID}`}
      >
        {layerID}
      </label>
    </div>
  );
};

export default LayerToggleSwitch;
