import React from 'react';
import { useDispatch } from 'react-redux';
import Slider, { createSliderWithTooltip } from 'rc-slider';

import { mapController } from 'js/controllers/mapController';

import { setCanopyDensity } from 'js/store/appState/actions';
import { Interface } from 'readline';

const SliderWithTooltip = createSliderWithTooltip(Slider);

interface SliderProps {
  min: number;
  max: number;
  step: number | null;
  marks?: any; // ? how do I type this, if it is dynamic?
  opacity?: number;
  density?: number;
  layerID?: string;
  markValueMap?: any; // ? how do I type this, if it is dynamic?
  returnSliderWithTooltip: boolean;
}

const RangeSlider = (props: SliderProps): JSX.Element => {
  const dispatch = useDispatch();
  const {
    min,
    max,
    step,
    marks,
    opacity,
    density,
    layerID,
    returnSliderWithTooltip
  } = props;

  const handleOpacityChange = (eventValue: number): void => {
    if (layerID) {
      mapController.setLayerOpacity(layerID, String(eventValue));
    }
  };

  const handleSliderChange = (eventValue: number): void => {
    dispatch(setCanopyDensity(eventValue));
    // * NOTE: sends % value to modify the layer
    mapController.updateDensityValue(marks[eventValue].value);
  };

  return (
    <div>
      {returnSliderWithTooltip ? (
        <SliderWithTooltip
          min={min}
          max={max}
          step={step}
          marks={marks}
          value={density}
          onChange={handleSliderChange}
          // ? does this need to send the value
          // ? back to the parent component to dynamically maintain data?
          tipFormatter={(val: number): string => marks[val].label}
          railStyle={{ height: 10, backgroundColor: 'rgb(240, 171, 0)' }} // * NOTE: default styles
          trackStyle={{ backgroundColor: '#e9e9e9', height: 10 }} // * NOTE: default styles
          activeDotStyle={{ border: '2px solid #e9e9e9' }} // * NOTE: default styles
          dotStyle={{
            // * NOTE: default styles
            border: `2px solid rgb(240, 171, 0)`,
            height: 10,
            width: 10,
            bottom: -6
          }}
          handleStyle={[
            // * NOTE: default styles
            {
              border: `2px solid rgb(240, 171, 0)`,
              height: 20,
              width: 20
            }
          ]}
        />
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
