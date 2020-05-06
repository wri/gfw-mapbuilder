import * as React from 'react';

import { createSliderWithTooltip, Range } from 'rc-slider';
const SliderWithTooltip = createSliderWithTooltip(Range);

interface CloudSliderProps {
  handleSliderChange: (val: any) => void;
  cloudRange: number[];
  customColorTheme: string;
}

export const CloudSlider = (props: CloudSliderProps): JSX.Element => {
  const defaultRange = [0, 100];
  const marks = {
    '0': {
      label: '0',
      style: {}
    },
    '50': {
      label: '50',
      style: {}
    },
    '100': {
      label: '100',
      style: {}
    }
  };
  return (
    <SliderWithTooltip
      allowCross={false}
      className="cloud-slider"
      defaultValue={defaultRange}
      marks={marks}
      min={defaultRange[0]}
      max={defaultRange[1]}
      value={props.cloudRange}
      tipFormatter={(val: number): number => val}
      step={25}
      railStyle={{ backgroundColor: props.customColorTheme }}
      handleStyle={[{ borderColor: props.customColorTheme }]}
      dotStyle={{ border: '1px solid #e9e9e9' }}
      activeDotStyle={{
        border: `1px solid ${props.customColorTheme}`
      }}
      trackStyle={[{ backgroundColor: props.customColorTheme }]}
      onChange={props.handleSliderChange}
    />
  );
};
