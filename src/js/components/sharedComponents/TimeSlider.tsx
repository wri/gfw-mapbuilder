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
  const defaultMarks = {
    '2000': {
      label: '2000',
      style: {}
    },
    '2001': {
      label: '2001',
      style: { display: 'none' }
    },
    '2002': {
      label: '2002',
      style: { display: 'none' }
    },
    '2003': {
      label: '2003',
      style: {}
    },
    '2004': {
      label: '2004',
      style: { display: 'none' }
    },
    '2005': {
      label: '2005',
      style: { display: 'none' }
    },
    '2006': {
      label: '2006',
      style: {}
    },
    '2007': {
      label: '2007',
      style: { display: 'none' }
    },
    '2008': {
      label: '2008',
      style: { display: 'none' }
    },
    '2009': {
      label: '2009',
      style: {}
    },
    '2010': {
      label: '2010',
      style: { display: 'none' }
    },
    '2011': {
      label: '2011',
      style: { display: 'none' }
    },
    '2012': {
      label: '2012',
      style: {}
    },
    '2013': {
      label: '2013',
      style: { display: 'none' }
    },
    '2014': {
      label: '2014',
      style: { display: 'none' }
    },
    '2015': {
      label: '2015',
      style: {}
    },
    '2016': {
      label: '2016',
      style: { display: 'none' }
    },
    '2017': {
      label: '2017',
      style: { display: 'none' }
    },
    '2018': {
      label: '2018',
      style: {}
    }
  };

  const dispatch = useDispatch();
  const timeSliderRef = useRef();
  const { layerID } = props;
  const [range, setRange] = useState([2000, 2018]);
  const [playButton, setPlayButton] = useState(true);
  const [startTimeSlider, setStartTimeSlider] = useState(false);
  const { timeSlider } = useSelector((store: RootState) => store.mapviewState);
  const customColorTheme = useSelector(
    (store: RootState) => store.appSettings.customColorTheme
  );
  const [marks, setMarks] = useState(defaultMarks);

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
      setMarks(defaultMarks);
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
      setMarks(defaultMarks);
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
          style={{ color: customColorTheme }}
          onClick={(): void => playOrPauseTimeSlider(true)}
        >
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
        handleStyle={[{ borderColor: customColorTheme }]}
        dotStyle={{ border: '1px solid #e9e9e9' }}
        activeDotStyle={{
          border: `1px solid ${customColorTheme}`
        }}
        trackStyle={[{ backgroundColor: customColorTheme }]}
        className={playButton ? '' : 'playing'}
        onChange={(value: Array<number>): void => setSelectedRange(value)}
      />
    </div>
  );
};

export default TimeSlider;
