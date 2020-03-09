import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'js/store';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'css/canopyDensityModal';
import { setCanopyDensity } from 'js/store/appState/actions';

const SliderWithTooltip = createSliderWithTooltip(Slider);

//TODO: This needs to be Language aware
/////- These tells me the raster id needed to filter the biomass layer based on canopyDensity > this is from rasterFunction utils
/*

const BIOMASS_DENSITY_ID_LOOKUP = {
  '10': '1',
  '15': '2',
  '20': '3',
  '25': '4',
  '30': '5',
  '50': '6',
  '75': '7'
};
*/

export const marks = {
  1: '10%',
  2: '15%',
  3: '20%',
  4: '25%',
  5: '30%',
  6: '50%',
  7: '75%'
};

const CanopyDensityContent = (): JSX.Element => {
  const dispatch = useDispatch();
  const { density } = useSelector(
    (store: RootState) => store.appState.leftPanel
  );

  function handleSliderChange(value: any): void {
    console.log(value);
    dispatch(setCanopyDensity(value));
  }

  return (
    <div className="canopy-density-container">
      <div>
        Adjust the minimum canopy density for tree cover and tree cover loss
      </div>
      <div className="tree-range">
        <div className="tree"></div>
        <div className="forest"></div>
      </div>
      <SliderWithTooltip
        min={0}
        max={8}
        step={null}
        marks={marks}
        defaultValue={density}
        tipFormatter={(val: number): string => marks[val]}
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
    </div>
  );
};

export default CanopyDensityContent;
