import React from 'react';
import Slider, { createSliderWithTooltip } from 'rc-slider';

import { mapController } from 'js/controllers/mapController';

const SliderWithTooltip = createSliderWithTooltip(Slider);

interface SliderProps {
  min: number;
  max: number;
  step: number;
  opacity: number;
  layerID: string;
  returnSliderWithTooltip: boolean;
}

const RangeSlider = (props: SliderProps): JSX.Element => {
  const { min, max, step, opacity, layerID, returnSliderWithTooltip } = props;

  const handleOpacityChange = (eventValue: number): void => {
    mapController.setLayerOpacity(layerID, String(eventValue));
  };

  return (
    <div>
      {returnSliderWithTooltip ? (
        <SliderWithTooltip />
      ) : (
        <Slider
          min={min}
          max={max}
          step={step}
          value={opacity}
          onChange={handleOpacityChange}
        />
      )}
    </div>
  );
};

export default RangeSlider;
