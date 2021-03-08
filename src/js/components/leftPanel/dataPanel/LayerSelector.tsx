import * as React from 'react';
import { LayerFeatureResult } from '../../../../js/store/mapview/types';

interface LayerSelectorProps {
  activeLayerInfo: LayerFeatureResult | undefined;
  activeFeatures: LayerFeatureResult[];
  handleLayerSelection: Function;
  generateLayerTitle: (activeFeature: any) => string;
}
const LayerSelector = (props: LayerSelectorProps): JSX.Element => {
  const options = props.activeFeatures.map(f => {
    //If we are dealing with sublayer, selection value is sublayerID otherwise it is layerID
    const selectionValue = f.sublayerID ? f.sublayerID : f.layerID;
    const layerTitle = props.generateLayerTitle(f);
    return (
      <option value={selectionValue} key={`${f.layerID}-${f.sublayerID}`}>
        {`${layerTitle} (${f.features.length})`}
      </option>
    );
  });

  //If we are dealing with sublayer, selection value is sublayerID otherwise it is layerID
  const selectionValue = props.activeLayerInfo?.sublayerID
    ? props.activeLayerInfo?.sublayerID
    : props.activeLayerInfo?.layerID;
  return (
    <div className="data-tab-layerselect">
      <label htmlFor="layer-select"></label>
      <select
        name="layer"
        id="layer-select"
        value={selectionValue}
        onChange={(e): void => props.handleLayerSelection(e.target.value)}
      >
        {options}
      </select>
    </div>
  );
};

export default LayerSelector;
