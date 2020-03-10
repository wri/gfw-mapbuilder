import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider, { createSliderWithTooltip } from 'rc-slider';

import RangeSlider from 'js/components/sharedComponents/RangeSlider';

import { mapController } from 'js/controllers/mapController';

import { setCanopyDensity } from 'js/store/appState/actions';
import { RootState } from 'js/store';

import 'rc-slider/assets/index.css';

import 'css/canopyDensityModal';

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

export const marks = {
  1: { value: 10, label: '10%', style: {} },
  2: { value: 15, label: '15%', style: {} },
  3: { value: 20, label: '20%', style: {} },
  4: { value: 25, label: '25%', style: {} },
  5: { value: 30, label: '30%', style: {} },
  6: { value: 50, label: '50%', style: {} },
  7: { value: 75, label: '75%', style: {} }
};

const CanopyDensityContent = (): JSX.Element => {
  const dispatch = useDispatch();
  const { density } = useSelector(
    (store: RootState) => store.appState.leftPanel
  );

  const handleSliderChange = (eventValue: number): void => {
    dispatch(setCanopyDensity(eventValue));
    // * NOTE: sends % value to modify the layer
    mapController.updateDensityValue(marks[eventValue].value);
  };

  return (
    <div className="canopy-density-container">
      <div>
        Adjust the minimum canopy density for tree cover and tree cover loss
      </div>
      <div className="tree-range">
        <div className="tree"></div>
        <div className="forest"></div>
      </div>
      <RangeSlider
        min={0}
        max={8}
        step={null}
        marks={marks}
        density={density}
        returnSliderWithTooltip={true}
        handleSliderChange={handleSliderChange}
      />
    </div>
  );
};

export default CanopyDensityContent;
