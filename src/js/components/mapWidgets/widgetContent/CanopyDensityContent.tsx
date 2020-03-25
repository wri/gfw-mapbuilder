import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'js/store';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'css/canopyDensityModal';
import { setCanopyDensity } from 'js/store/appState/actions';
import { mapController } from 'js/controllers/mapController';

const SliderWithTooltip = createSliderWithTooltip(Slider);

//TODO: This needs to be Language aware
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
export const markValueMap = {
  1: 10,
  2: 15,
  3: 20,
  4: 25,
  5: 30,
  6: 50,
  7: 75
};

const marks = {
  1: { label: '10%', style: {} },
  2: { label: '15%', style: {} },
  3: { label: '20%', style: {} },
  4: { label: '25%', style: {} },
  5: { label: '30%', style: {} },
  6: { label: '50%', style: {} },
  7: { label: '75%', style: {} }
};

const CanopyDensityContent = (): JSX.Element => {
  const dispatch = useDispatch();
  const { density } = useSelector(
    (store: RootState) => store.appState.leftPanel
  );

  function handleSliderChange(value: number): void {
    dispatch(setCanopyDensity(value));
    //send % value to modify the layer
    mapController.updateDensityValue(markValueMap[value]);
    mapController.updateBiodensityValue(value);
    mapController.updateTreeCoverValue(markValueMap[value]);
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
        tipFormatter={(val: number): string => markValueMap[val] + '%'}
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
