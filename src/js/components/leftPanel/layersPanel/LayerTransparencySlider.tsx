import * as React from 'react';
import Slider from 'rc-slider';

import { mapController } from 'js/controllers/mapController';

interface LayerTransparencyProps {
  layerID: string;
  layerOpacity: number | undefined;
}

const LayerTransparencySlider = (
  props: LayerTransparencyProps
): React.ReactElement => {
  const { layerID, layerOpacity } = props;

  const handleOpacityChange = (eventValue: any): void => {
    mapController.setLayerOpacity(layerID, eventValue);
  };

  return (
    <div className="transparency-slider">
      <Slider
        min={0}
        max={1}
        step={0.05}
        value={layerOpacity}
        onChange={handleOpacityChange}
        railStyle={{ height: 5, backgroundColor: 'rgb(240, 171, 0)' }}
        trackStyle={{ backgroundColor: '#e9e9e9', height: 5 }}
        dotStyle={{
          border: `2px solid rgb(240, 171, 0)`,
          height: 10,
          width: 10,
          bottom: -6
        }}
        handleStyle={[
          {
            border: `2px solid rgb(240, 171, 0)`,
            height: 15,
            width: 15
          }
        ]}
      />
    </div>
  );
};

export default LayerTransparencySlider;
