import React from 'react';
import Slider, { createSliderWithTooltip } from 'rc-slider';

const SliderWithTooltip = createSliderWithTooltip(Slider);

const TheSlider = (): JSX.Element => {
  return (
    <div>
      <p>RC slider</p>
    </div>
  );
};

export default TheSlider;
