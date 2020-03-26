import * as React from 'react';
import Slider, { createSliderWithTooltip } from 'rc-slider';

import { mapController } from 'js/controllers/mapController';

interface LayerTransparencyProps {
  layerID: string;
  layerOpacity: number | undefined;
  sublayer?: boolean;
  parentID?: string;
}

const SliderWithTooltip = createSliderWithTooltip(Slider);

const LayerTransparencySlider = (
  props: LayerTransparencyProps
): React.ReactElement => {
  const { layerID, layerOpacity, sublayer, parentID } = props;

  const handleOpacityChange = (eventValue: any): void => {
    if (layerID === 'VIIRS_ACTIVE_FIRES' || layerID === 'MODIS_ACTIVE_FIRES') {
      mapController.updateMODISorVIIRSOpacity(layerID, eventValue);
    } else {
      // * NOTE: default logic
      mapController.setLayerOpacity(layerID, eventValue, sublayer, parentID);
    }
  };

  return (
    <div className="transparency-slider">
      <SliderWithTooltip
        min={0}
        max={1}
        step={0.05}
        value={layerOpacity}
        tipFormatter={(val: number): string => `${val * 100}%`}
        onChange={handleOpacityChange}
        railStyle={{ height: 5, backgroundColor: '#e9e9e9' }}
        trackStyle={{ backgroundColor: 'rgb(240, 171, 0)', height: 5 }}
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
