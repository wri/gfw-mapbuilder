import React from 'react';
import Slider, { createSliderWithTooltip } from 'rc-slider';

const SliderWithTooltip = createSliderWithTooltip(Slider);

interface SliderProps {
  min: number;
  max: number;
  step: number | null;
  marks?: any; // ? how do I type this, if it is dynamic?
  opacity?: number;
  density?: number;
  markValueMap?: any; // ? how do I type this, if it is dynamic?
  returnSliderWithTooltip: boolean;
  handleSliderChange?: (eventValue: number) => void;
}

const RangeSlider = (props: SliderProps): JSX.Element => {
  const {
    min,
    max,
    step,
    marks,
    opacity,
    density,
    returnSliderWithTooltip,
    handleSliderChange
  } = props;

  return (
    <div>
      {returnSliderWithTooltip ? (
        <SliderWithTooltip
          min={min}
          max={max}
          step={step}
          marks={marks}
          value={density}
          tipFormatter={(val: number): string => marks[val].label}
          railStyle={{ height: 10, backgroundColor: 'rgb(240, 171, 0)' }}
          trackStyle={{ backgroundColor: '#e9e9e9', height: 10 }}
          activeDotStyle={{ border: '2px solid #e9e9e9' }}
          dotStyle={{
            border: `2px solid rgb(240, 171, 0)`,
            height: 10,
            width: 10,
            bottom: -6
          }}
          handleStyle={[
            {
              border: `2px solid rgb(240, 171, 0)`,
              height: 20,
              width: 20
            }
          ]}
          onChange={handleSliderChange}
        />
      ) : (
        <Slider
          min={min}
          max={max}
          step={step}
          value={opacity}
          onChange={handleSliderChange}
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
      )}
    </div>
  );
};

export default RangeSlider;
