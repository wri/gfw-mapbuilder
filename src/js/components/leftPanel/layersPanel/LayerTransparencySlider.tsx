import * as React from 'react';
import { useState } from 'react';
import { mapController } from 'js/controllers/mapController';

interface LayerTransparencyProps {
  layerID: string;
}

const LayerTransparencySlider = (
  props: LayerTransparencyProps
): React.ReactElement => {
  const { layerID } = props;

  const [localLayerOpacity, setlocalLayerOpacity] = useState(
    mapController.getLayerOpacity(layerID)
  );

  function handleOpacityChange(e: any) {
    setlocalLayerOpacity(e.target.value);
    mapController.setLayerOpacity(layerID, e.target.value);
  }

  return (
    <div className="transparency-slider">
      <p>Transparency Slider</p>
      <input
        type="range"
        min="0.1"
        max="1"
        step="0.05"
        name="tslider"
        id=""
        value={localLayerOpacity}
        onChange={handleOpacityChange}
      />
      <label htmlFor="tslider">{localLayerOpacity}</label>
    </div>
  );
};

export default LayerTransparencySlider;
