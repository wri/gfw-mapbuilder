import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { createSliderWithTooltip, Range } from 'rc-slider';

import { mapController } from '../../controllers/mapController';

import { setTimeSlider } from '../../store/mapview/actions';

import { RootState } from '../../store';
import { LayerFactory } from '../../helpers/LayerFactory';
import { setGfwIntegratedEnd, setGfwIntegratedStart } from '../../store/appState/actions';

const SliderWithTooltip = createSliderWithTooltip(Range);

interface TimeSliderProps {
  layer?: any;
  layerID: string;
  defaultMarks: any;
  min: number;
  max?: number;
  defaultValue: Array<number> | any;
  steps?: number | null;
  included: boolean;
  type?: string;
}

const TimeSlider = (props: TimeSliderProps): JSX.Element => {
  const dispatch = useDispatch();
  const timeSliderRef = useRef();
  const { layerID } = props;
  const timeSlider = useSelector((store: RootState) => store.mapviewState.timeSlider);
  const [range, setRange] = useState(timeSlider);
  const [playButton, setPlayButton] = useState(true);
  const [startTimeSlider, setStartTimeSlider] = useState(false);
  const customColorTheme = useSelector((store: RootState) => store.appSettings.customColorTheme);
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
  const convertJulianDate = julianDate => {
    return moment(julianDate, 'YYDDD').format('YYYY-MM-DD');
  };
  const setSelectedRange = (selectedRange: Array<number>): void => {
    setRange(selectedRange);
    dispatch(setTimeSlider(selectedRange));
    mapController.updateBaseTile(layerID, selectedRange);

    if (props.type === 'gfw-integrated-alert') {
      const startDate = convertJulianDate(selectedRange[0]);
      const endDate = convertJulianDate(selectedRange[1]);

      const gfwIntegratedLayerOld: any = mapController._map!.findLayerById('GFW_INTEGRATED_ALERTS');
      const gfwIntegratedIndex: number = mapController._map!.layers.indexOf(gfwIntegratedLayerOld);
      mapController._map?.remove(gfwIntegratedLayerOld);
      const gfwIntegratedLayerNew: any = LayerFactory(mapController._mapview, props.layer);
      gfwIntegratedLayerNew.gfwjulianFrom = startDate;
      gfwIntegratedLayerNew.gfwjulianTo = endDate;
      mapController._map?.add(gfwIntegratedLayerNew, gfwIntegratedIndex);
      dispatch(setGfwIntegratedStart(startDate));
      dispatch(setGfwIntegratedEnd(endDate));
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
        min={props.min}
        max={props.max}
        defaultValue={props.defaultValue}
        value={range}
        allowCross={false}
        tipFormatter={(val: number): number => val}
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
        onChange={(value: Array<number>): void => setSelectedRange(value)}
      />
    </div>
  );
};

export default TimeSlider;
