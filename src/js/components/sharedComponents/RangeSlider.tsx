import * as React from 'react';
import { createSliderWithTooltip, Range } from 'rc-slider';
import { useDispatch } from 'react-redux';
import { setLandCoverYearValue } from '../../store/appState/actions';
import { mapController } from '../../controllers/mapController';
import { LayerFactory } from '../../helpers/LayerFactory';

const SliderWithTooltip = createSliderWithTooltip(Range);

interface RangeSliderProps {
  id: string;
  value: number[];
  defaultValue: number[];
  marks: any;
  layerConfig: any;
}
const RangeSlider = ({ value, defaultValue, marks, id, layerConfig }: RangeSliderProps): JSX.Element => {
  const dispatch = useDispatch();

  async function handleSliderRange(val: number[]) {
    if (id === 'UMD_LAND_COVER') {
      dispatch(setLandCoverYearValue(val));
      layerConfig.url = `https://storage.googleapis.com/lcl_tiles/GLCLU2020/composite${val[0]}/{z}/{x}/{y}.png`;

      const mapview = mapController.getMapView();
      mapController.removeMapLayer(id);
      const updatedUMDLayer = await LayerFactory(mapview, layerConfig);
      mapController._map?.add(updatedUMDLayer);
    }
  }
  return (
    <div className="time-slider-container" style={{ marginLeft: '1rem' }}>
      <SliderWithTooltip
        min={2000}
        max={2020}
        defaultValue={defaultValue}
        value={value}
        allowCross={false}
        step={20}
        dots={false}
        marks={marks}
        railStyle={{ backgroundColor: 'rgb(233, 233, 233)' }}
        handleStyle={[{ borderColor: 'orange' }]}
        onChange={(value: Array<number>) => handleSliderRange(value)}
      />
    </div>
  );
};

export default RangeSlider;
