import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSliderWithTooltip, Range } from 'rc-slider';

import { mapController } from '../../controllers/mapController';

import { setTimeSlider } from '../../store/mapview/actions';

import { RootState } from '../../store';
import { LayerFactory } from '../../helpers/LayerFactory';
import { setGfwIntegratedEnd, setGfwIntegratedStart, setGladEnd, setGladStart } from '../../store/appState/actions';

const SliderWithTooltip = createSliderWithTooltip(Range);

interface TimeSliderProps {
  layer?: any;
  layerID: string;
  defaultMarks: any;
  min: number | any;
  max?: number | any;
  defaultValue: Array<number> | any;
  steps?: number | null;
  included: boolean;
  type?: string;
}

const TimeSlider = (props: TimeSliderProps): JSX.Element => {
  const dispatch = useDispatch();
  const timeSliderRef = useRef();
  const { layerID, min, max } = props;
  const timeSlider = useSelector((store: RootState) => store.mapviewState.timeSlider);
  const [range, setRange] = useState(props.type !== 'gfw-integrated-alert' ? timeSlider : [0, 730]);
  const [playButton, setPlayButton] = useState(true);
  const [startTimeSlider, setStartTimeSlider] = useState(false);
  const customColorTheme = useSelector((store: RootState) => store.appSettings.customColorTheme);
  const gfwLayer = useSelector((store: RootState) => store.appState.leftPanel.gfwLayer);
  const allAvailableLayers = useSelector((store: RootState) => store.mapviewState.allAvailableLayers);
  const [marks, setMarks] = useState(props.defaultMarks);

  useEffect(() => {
    const updateMarks = (newMaxYear: number): void => {
      const sliderMarks = { ...marks };

      const oneYearPrior = newMaxYear - 1;
      const twoYearsPrior = newMaxYear - 2;
      const oneYearLater = newMaxYear + 1;
      const twoYearsLater = newMaxYear + 2;

      if (sliderMarks[twoYearsPrior]) {
        sliderMarks[twoYearsPrior].style.display = 'none';
      }

      if (sliderMarks[oneYearPrior]) {
        sliderMarks[oneYearPrior].style.display = 'none';
      }

      if (sliderMarks[oneYearLater]) {
        sliderMarks[oneYearLater].style.display = 'none';
      }

      if (sliderMarks[twoYearsLater]) {
        sliderMarks[twoYearsLater].style.display = 'none';
      }

      if (sliderMarks[newMaxYear]) {
        sliderMarks[newMaxYear].style.display = 'block';
      }

      setMarks({ ...sliderMarks });
    };

    const playSequence = (): void => {
      const newMaxYear = (range[1] += 1);

      setRange([range[0], newMaxYear]);
      updateMarks(newMaxYear);
      mapController.updateBaseTile(layerID, [range[0], newMaxYear]);
    };

    if (startTimeSlider && range[1] !== timeSlider[1]) {
      (timeSliderRef as any).current = setInterval(playSequence, 1000);
    } else if (startTimeSlider && range[1] === timeSlider[1]) {
      setRange([range[0], range[0]]);
      setMarks(props.defaultMarks);
    }

    return (): any => {
      clearInterval(timeSliderRef.current);
    };
  }, [startTimeSlider, range[1], timeSlider[1]]);

  const convertDate = value => {
    const nextStartDate = new Date(min.getTime() || max.getTime());
    nextStartDate.setDate(value);
    return new Date(nextStartDate.getTime() - nextStartDate.getTimezoneOffset() * 60000).toISOString().split('T')[0];
  };
  const setSelectedRange = async (selectedRange: Array<number>) => {
    setRange(selectedRange);
    dispatch(setTimeSlider(selectedRange));
    mapController.updateBaseTile(layerID, selectedRange);
    const convertStartDate = convertDate(selectedRange[0]);
    const convertEndDate = convertDate(selectedRange[1]);
    //@ts-ignore
    const end = new Date(convertEndDate).getJulian();
    //@ts-ignore
    const start = new Date(convertStartDate).getJulian();
    if (props.type === 'gfw-integrated-alert' && gfwLayer === 'GFW_INTEGRATED_ALERTS') {
      const gfwIntegratedLayerOld: any = mapController._map!.findLayerById('GFW_INTEGRATED_ALERTS');
      const gfwIntegratedIndex: number = mapController._map!.layers.indexOf(gfwIntegratedLayerOld);
      mapController._map?.remove(gfwIntegratedLayerOld);

      const gfwIntegratedLayerNew: any = LayerFactory(mapController._mapview, props.layer);
      gfwIntegratedLayerNew.gfwjulianFrom = convertStartDate;
      gfwIntegratedLayerNew.gfwjulianTo = convertEndDate;
      mapController._map?.add(gfwIntegratedLayerNew, gfwIntegratedIndex);

      dispatch(setGfwIntegratedStart(convertStartDate));
      dispatch(setGfwIntegratedEnd(convertEndDate));
    } else {
      const gladLayerConfig: any = allAvailableLayers.filter((layer: any) => layer.id === 'GLAD_ALERTS');
      const gladLayerOld: any = mapController._map!.findLayerById('GLAD_ALERTS');
      const gladIndex: number = mapController._map!.layers.indexOf(gladLayerOld);
      mapController._map?.remove(gladLayerOld);
      const gladLayerNew: any = await LayerFactory(mapController._mapview, gladLayerConfig[0]);
      gladLayerNew.julianFrom = start;
      gladLayerNew.julianTo = end;
      mapController._map?.add(gladLayerNew, gladIndex);
      const selectedLayer = mapController._map!.findLayerById('GLAD_ALERTS');
      selectedLayer.visible = true;
      dispatch(setGladStart(convertStartDate));
      dispatch(setGladEnd(convertEndDate));
    }
  };

  const playOrPauseTimeSlider = (startPlaying: boolean): any => {
    if (startPlaying) {
      // * NOTE: plays time slider
      setRange([timeSlider[0], timeSlider[0]]);
      mapController.updateBaseTile(layerID, [timeSlider[0], timeSlider[0]]);
      setPlayButton(false);
      setStartTimeSlider(true);
    } else {
      // * NOTE: stops & resets time slider
      setRange(timeSlider);
      setMarks(props.defaultMarks);
      mapController.updateBaseTile(layerID, timeSlider);
      setStartTimeSlider(false);
      setPlayButton(true);
      clearInterval(timeSliderRef.current);
    }
  };

  return (
    <div className="time-slider-container">
      {playButton ? (
        <button
          style={props.steps === 1 ? { color: customColorTheme } : { color: customColorTheme, visibility: 'hidden' }}
          onClick={(): void => playOrPauseTimeSlider(true)}
        >
          &#9658;
        </button>
      ) : (
        <button onClick={(): void => playOrPauseTimeSlider(false)}>&#10074;&#10074;</button>
      )}

      <SliderWithTooltip
        min={props.type === 'gfw-integrated-alert' ? 0 : props.min}
        max={props.type === 'gfw-integrated-alert' ? 730 : props.max}
        defaultValue={props.defaultValue}
        value={range}
        allowCross={false}
        tipFormatter={
          props.type !== 'gfw-integrated-alert' ? (val: number): number => val : (val: any): any => convertDate(val)
        }
        tipProps={{
          placement: 'top',
          prefixCls: 'rc-slider-tooltip'
        }}
        dots={true}
        marks={marks}
        railStyle={{ backgroundColor: 'rgb(233, 233, 233)' }}
        handleStyle={[{ borderColor: customColorTheme }]}
        dotStyle={{ border: '1px solid #e9e9e9' }}
        activeDotStyle={{
          border: `1px solid ${customColorTheme}`
        }}
        included={props.included}
        // @ts-ignore
        // This disables marks in between date ranges
        step={props.steps}
        trackStyle={[{ backgroundColor: customColorTheme }]}
        className={playButton ? '' : 'playing'}
        onChange={(value: Array<number>) => setSelectedRange(value)}
      />
    </div>
  );
};

export default TimeSlider;
