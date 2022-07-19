import * as React from 'react';
import { createSliderWithTooltip, Range } from 'rc-slider';
import { useDispatch } from 'react-redux';
import { setLandCoverYearValue } from '../../store/appState/actions';
import { mapController } from '../../controllers/mapController';
import { LayerFactory } from '../../helpers/LayerFactory';

const SliderWithTooltip = createSliderWithTooltip(Range);

function generateMarks(range: number[]): any[] | {} {
  const marksObject = {};
  for (let i = range[0]; i <= range[1]; i++) {
    if (i === range[0] || i === range[1]) {
      marksObject[i] = { label: String(i), style: {} };
    } else {
      marksObject[i] = { label: String(i), style: { display: 'none' } };
    }
  }
  return marksObject;
}

interface RangeSliderProps {
  //   yearRange: number[];
  //   handleSliderChange: (val: number[]) => void;
  //   customColorTheme: string;
  id: string;
  value: number[];
  defaultValue: number[];
  marks: any;
  layerConfig: any;
}
const RangeSlider = ({ value, defaultValue, marks, id, layerConfig }: RangeSliderProps): JSX.Element => {
  const dispatch = useDispatch();
  //   const [activeYearRange, setActiveYearRange] = React.useState<number[]>(props.yearRange);

  async function handleSliderRange(val: number[]) {
    if (id === 'UMD_LAND_COVER') {
      dispatch(setLandCoverYearValue(val));
      const toggleUrl = `https://storage.googleapis.com/lcl_tiles/GLCLU2020/composite${val[0]}/{z}/{x}/{y}.png`;
      layerConfig.url = toggleUrl;

      const mapview = mapController.getMapView();
      mapController.removeMapLayer(id);
      const updatedUMDLayer = await LayerFactory(mapview, layerConfig);
      mapController._map?.add(updatedUMDLayer);
    }
    // setActiveYearRange(val);
    // props.handleSliderChange(val);
  }
  //   const marks: any = React.useMemo(() => generateMarks(props.yearRange), [
  //     props.yearRange
  //   ]);

  return (
    <div className="time-slider-container" style={{ marginLeft: '1rem' }}>
      <SliderWithTooltip
        // min={props.yearRange[0]}
        // max={props.yearRange[1]}
        min={2000}
        max={2020}
        defaultValue={defaultValue}
        value={value}
        allowCross={false}
        step={20}
        // tipFormatter={(val: number): number => val}
        dots={false}
        marks={marks}
        railStyle={{ backgroundColor: 'rgb(233, 233, 233)' }}
        handleStyle={[{ borderColor: 'orange' }]}
        dotStyle={{ border: '1px solid #e9e9e9' }}
        // activeDotStyle={{
        //   border: `1px solid red`,
        // }}
        trackStyle={[{ backgroundColor: 'white', border: '1px solid rgb(214, 214, 214)' }]}
        onChange={(value: Array<number>) => handleSliderRange(value)}
      />
    </div>
  );
};

export default RangeSlider;
