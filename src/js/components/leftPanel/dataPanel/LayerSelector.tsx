import * as React from 'react';
import { LayerFeatureResult } from 'js/store/mapview/types';

interface LayerSelectorProps {
  activeLayerInfo: LayerFeatureResult | undefined;
  activeFeatures: LayerFeatureResult[];
  handleLayerSelection: Function;
}
const LayerSelector = (props: LayerSelectorProps): JSX.Element => {
  const options = props.activeFeatures.map(f => {
    //if we are dealing with sublayer value is sublayer id, otherwise it is layer id
    const selectionValue = f.sublayerID ? f.sublayerID : f.layerID;
    const layerTitle = f.sublayerTitle
      ? `${f.layerTitle}: ${f.sublayerTitle}`
      : f.layerTitle;

    return (
      <option value={selectionValue} key={`${f.layerID}-${f.sublayerID}`}>
        {layerTitle}
      </option>
    );
  });

  const selectionValue = props.activeLayerInfo?.sublayerID
    ? props.activeLayerInfo?.sublayerID
    : props.activeLayerInfo?.layerID;
  console.log(selectionValue);
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
