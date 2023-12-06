import * as React from 'react';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../js/store/index';
import { handleCustomColorTheme } from '../../../../utils';

interface LayerTransparencyProps {
  layerOpacity: number;
  handleOpacityChange: (val: number) => number;
}

const SliderWithTooltip = createSliderWithTooltip(Slider);

const LayerTransparencySlider = ({ layerOpacity, handleOpacityChange }: LayerTransparencyProps): React.ReactElement => {
  const customColorTheme = useSelector((store: RootState) => store.appSettings.customColorTheme);
  const [value, setValue] = React.useState(layerOpacity);
  const themeColor = handleCustomColorTheme(customColorTheme);

  React.useEffect(() => {
    setValue(layerOpacity);
  }, [layerOpacity]);

  const handleChange = (event: number) => {
    const sliderValue = handleOpacityChange(event);
    setValue(sliderValue);
  };

  return (
    <div className="transparency-slider">
      <SliderWithTooltip
        min={0}
        max={1}
        step={0.05}
        value={value}
        tipFormatter={(val: number): string => `${(val * 100).toFixed(0)}%`}
        onChange={handleChange}
        railStyle={{ height: 5, backgroundColor: '#e9e9e9' }}
        trackStyle={{ backgroundColor: `${themeColor}`, height: 5 }}
        dotStyle={{
          border: `2px solid ${themeColor}`,
          height: 10,
          width: 10,
          bottom: -6,
        }}
        handleStyle={{
          border: `2px solid ${themeColor}`,
          height: 15,
          width: 15,
        }}
      />
    </div>
  );
};

export default LayerTransparencySlider;
