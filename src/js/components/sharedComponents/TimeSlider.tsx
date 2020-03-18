import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createSliderWithTooltip, Range } from 'rc-slider';

import { mapController } from 'js/controllers/mapController';

import { setTimeSlider } from 'js/store/mapview/actions';

import { RootState } from 'js/store/index';

const SliderWithTooltip = createSliderWithTooltip(Range);

interface TimeSliderProps {
  layerID: string;
}

const TimeSlider = (props: TimeSliderProps): JSX.Element => {
  const dispatch = useDispatch();
  const timeSliderRef = useRef();
  const { layerID } = props;
  const [range, setRange] = useState([2000, 2018]);
  const [playButton, setPlayButton] = useState(true);
  const [startTimeSlider, setStartTimeSlider] = useState(false);
  const { timeSlider } = useSelector((store: RootState) => store.mapviewState);

  const marks = {
    0: { label: '2000', style: {} },
    1: { label: '2001', style: {} },
    2: { label: '2002', style: {} },
    3: { label: '2003', style: {} },
    4: { label: '2004', style: {} },
    5: { label: '2005', style: {} },
    6: { label: '2006', style: {} },
    7: { label: '2007', style: {} },
    8: { label: '2008', style: {} },
    9: { label: '2009', style: {} },
    10: { label: '2010', style: {} },
    11: { label: '2011', style: {} },
    12: { label: '2012', style: {} },
    13: { label: '2013', style: {} },
    14: { label: '2014', style: {} },
    15: { label: '2015', style: {} },
    16: { label: '2016', style: {} },
    17: { label: '2017', style: {} },
    18: { label: '2018', style: {} }
  };

  useEffect(() => {
    const playSequence = (): void => {
      const newMaxYear = (range[1] += 1);
      setRange([range[0], newMaxYear]);
      mapController.updateBaseTile(layerID, [range[0], newMaxYear]);
    };

    if (startTimeSlider && range[1] !== timeSlider[1]) {
      (timeSliderRef as any).current = setInterval(playSequence, 1000);
    } else if (startTimeSlider && range[1] === timeSlider[1]) {
      setRange([range[0], range[0]]);
    }

    return (): any => {
      clearInterval(timeSliderRef.current);
    };
  }, [startTimeSlider, range[1], timeSlider[1]]);

  const setSelectedRange = (selectedRange: Array<number>): void => {
    setRange(selectedRange);
    dispatch(setTimeSlider(selectedRange));
    mapController.updateBaseTile(layerID, selectedRange);
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
      mapController.updateBaseTile(layerID, timeSlider);
      setStartTimeSlider(false);
      setPlayButton(true);
      clearInterval(timeSliderRef.current);
    }
  };

  return (
    <div className="time-slider-container">
      {playButton ? (
        <button onClick={(): void => playOrPauseTimeSlider(true)}>
          &#9658;
        </button>
      ) : (
        <button onClick={(): void => playOrPauseTimeSlider(false)}>
          &#10074;&#10074;
        </button>
      )}
      <SliderWithTooltip
        min={2000}
        max={2018}
        defaultValue={[2000, 2018]}
        value={range}
        allowCross={false}
        tipFormatter={(val: number): number => val}
        dots={true}
        marks={marks}
        railStyle={{ backgroundColor: 'rgb(233, 233, 233)' }}
        handleStyle={[{ borderColor: 'rgb(240, 171, 0)' }]}
        dotStyle={{ border: '1px solid #e9e9e9' }}
        activeDotStyle={{
          border: '1px solid #F0AB00'
        }}
        trackStyle={[{ backgroundColor: 'rgb(240, 171, 0)' }]}
        onChange={(value: Array<number>): void => setSelectedRange(value)}
      />
    </div>
  );
};

export default TimeSlider;
