import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSliderWithTooltip, Range } from 'rc-slider';

import { mapController } from '../../controllers/mapController';

import { setTimeSlider } from '../../store/mapview/actions';

import { RootState } from '../../store';
import { defaultMarks } from '../../../../configs/layer-config';
import { TimeSliderLayerProperties } from '../../types/layersTypes';
import timeSliderUtils from '../../helpers/timeSliderUtils';

const SliderWithTooltip = createSliderWithTooltip(Range);

interface TimeSliderProps {
  layer?: any;
  layerID: string;
}
const defaultLayerProperties: TimeSliderLayerProperties = {
  min: 2001 || new Date(2001),
  max: 2021 || new Date(2021),
  defaultValue: [2001, 2021],
  defaultMarks: defaultMarks,
  steps: 1,
  included: true,
};

const TimeSlider = (props: TimeSliderProps): JSX.Element => {
  const dispatch = useDispatch();
  const timeSliderRef = useRef();

  const timeSlider = useSelector((store: RootState) => store.mapviewState.timeSlider);
  const [timesliderLayerProperties, setTimesliderLayerProperties] = useState(defaultLayerProperties);
  const [range, setRange] = useState(props.layerID !== 'GFW_INTEGRATED_ALERTS' ? timeSlider : [0, 730]);
  const [playButton, setPlayButton] = useState(true);
  const [startTimeSlider, setStartTimeSlider] = useState(false);
  const customColorTheme = useSelector((store: RootState) => store.appSettings.customColorTheme);
  const [marks, setMarks] = useState(timesliderLayerProperties.defaultMarks);

  useEffect(() => {
    const newMaxYear = (range[1] += 1);
    const sliderMarks = { ...marks };

    if (startTimeSlider && range[1] !== timeSlider[1]) {
      (timeSliderRef as any).current = setInterval(
        timeSliderUtils.playSequence,
        1000,
        newMaxYear,
        sliderMarks,
        range,
        props.layerID
      );
      setRange([range[0], newMaxYear]);
    } else if (startTimeSlider && range[1] === timeSlider[1]) {
      setRange([range[0], range[0]]);
      setMarks(timesliderLayerProperties.defaultMarks);
    }

    return (): any => {
      clearInterval(timeSliderRef.current);
    };
  }, [startTimeSlider, range[1], timeSlider[1]]);

  const setSelectedRange = async (selectedRange: Array<number>) => {
    setRange(selectedRange);
    dispatch(setTimeSlider(selectedRange));
    mapController.updateBaseTile(props.layerID, selectedRange);
    timeSliderUtils.setSelectedRange(selectedRange, timesliderLayerProperties, props);
  };

  const playOrPauseTimeSlider = (startPlaying: boolean): any => {
    if (startPlaying) {
      // * NOTE: plays time slider
      setRange([timeSlider[0], timeSlider[0]]);
      mapController.updateBaseTile(props.layerID, [timeSlider[0], timeSlider[0]]);
      setPlayButton(false);
      setStartTimeSlider(true);
    } else {
      // * NOTE: stops & resets time slider
      setRange(timeSlider);
      setMarks(timesliderLayerProperties.defaultMarks);
      mapController.updateBaseTile(props.layerID, timeSlider);
      setStartTimeSlider(false);
      setPlayButton(true);
      clearInterval(timeSliderRef.current);
    }
  };

  const getLayerProperties = (layerID: string) => {
    return {
      min: 2001,
      max: 2021,
      defaultValue: [2001, 2021],
      defaultMarks: defaultMarks,
      steps: 1,
      included: true,
    };
  };

  useEffect(() => {
    setTimesliderLayerProperties(getLayerProperties(props.layerID));
  }, [props.layerID]);

  return (
    <div className="time-slider-container">
      {playButton ? (
        <button
          style={
            timesliderLayerProperties.steps === 1
              ? { color: customColorTheme }
              : { color: customColorTheme, visibility: 'hidden' }
          }
          onClick={(): void => playOrPauseTimeSlider(true)}
        >
          &#9658;
        </button>
      ) : (
        <button onClick={(): void => playOrPauseTimeSlider(false)}>&#10074;&#10074;</button>
      )}

      <SliderWithTooltip
        min={props.layerID === 'GFW_INTEGRATED_ALERTS' ? 0 : timesliderLayerProperties.min}
        max={props.layerID === 'GFW_INTEGRATED_ALERTS' ? 730 : timesliderLayerProperties.max}
        defaultValue={timesliderLayerProperties.defaultValue}
        value={range}
        allowCross={false}
        tipFormatter={
          props.layerID !== 'GFW_INTEGRATED_ALERTS'
            ? (val: number): number => val
            : (val: any): any => timeSliderUtils.convertDate(val, timesliderLayerProperties)
        }
        tipProps={{
          placement: 'top',
          prefixCls: 'rc-slider-tooltip',
        }}
        dots={true}
        marks={marks}
        railStyle={{ backgroundColor: 'rgb(233, 233, 233)' }}
        handleStyle={[{ borderColor: customColorTheme }]}
        dotStyle={{ border: '1px solid #e9e9e9' }}
        activeDotStyle={{
          border: `1px solid ${customColorTheme}`,
        }}
        included={timesliderLayerProperties.included}
        // @ts-ignore
        // This disables marks in between date ranges
        step={timesliderLayerProperties.steps}
        trackStyle={[{ backgroundColor: customColorTheme }]}
        className={playButton ? '' : 'playing'}
        onChange={(value: Array<number>) => setSelectedRange(value)}
      />
    </div>
  );
};

export default TimeSlider;
