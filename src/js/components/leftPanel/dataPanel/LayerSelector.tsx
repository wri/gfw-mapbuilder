import * as React from 'react';
import { LayerFeatureResult } from 'js/store/mapview/types';

interface LayerSelectorProps {
  activeLayerInfo: LayerFeatureResult | undefined;
  activeFeatures: LayerFeatureResult[];
  handleLayerSelection: Function;
}
const LayerSelector = (props: LayerSelectorProps): JSX.Element => {
  const options = props.activeFeatures.map(f => {
    return (
      <option value={f.layerID} key={f.layerID}>
        {`${f.layerTitle} (${f.features.length})`}
      </option>
    );
  });

  return (
    <div className="data-tab-layerselect">
      <label htmlFor="layer-select"></label>
      <select
        name="layer"
        id="layer-select"
        value={props.activeLayerInfo?.layerID}
        onChange={(e): void => props.handleLayerSelection(e.target.value)}
      >
        {options}
      </select>
    </div>
  );
};

export default LayerSelector;
