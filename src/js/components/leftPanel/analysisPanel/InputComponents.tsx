import * as React from 'react';
import {
  setAnalysisDateRange,
  setAnalysisYearRange
} from 'js/store/appState/actions';
import { useDispatch } from 'react-redux';
import { createSliderWithTooltip, Range } from 'rc-slider';
const SliderWithTooltip = createSliderWithTooltip(Range);

interface DatePickerProps {
  multi?: boolean;
  minDate: string; //YYYY-MM-DD
  maxDate: string; //YYYY-MM-DD
  defaultStartDate?: string;
  defaultEndDate?: string;
}
const getTodayDate = new Date().toISOString().split('T')[0];

const DatePicker = (props: DatePickerProps): JSX.Element => {
  const dispatch = useDispatch();
  const { multi, minDate, maxDate, defaultEndDate, defaultStartDate } = props;

  const [startDate, setStartDate] = React.useState(
    defaultStartDate ? defaultStartDate : getTodayDate
  );

  const [endDate, setEndDate] = React.useState(
    defaultEndDate ? defaultEndDate : getTodayDate
  );

  function handleStartDateChange(e: any): void {
    setStartDate(e.target.value);
    dispatch(setAnalysisDateRange([startDate, endDate]));
  }

  function handleEndDateChange(e: any): void {
    setEndDate(e.target.value);
    dispatch(setAnalysisDateRange([startDate, endDate]));
  }

  //Sync at the start too
  React.useEffect(() => {
    dispatch(setAnalysisDateRange([startDate, endDate]));
  }, []);

  return (
    <div className="calendar-wrapper">
      <div className="date-section-wrapper">
        <label htmlFor="start-date">Start:</label>
        <input
          className="date-time-toggle input"
          type="date"
          defaultValue={startDate}
          min={minDate ? minDate : undefined}
          onChange={handleStartDateChange}
        />
      </div>
      {multi && (
        <div className="date-section-wrapper">
          <label htmlFor="end-date">End:</label>
          <input
            className="date-time-toggle input"
            type="date"
            value={endDate}
            max={maxDate ? maxDate : undefined}
            onChange={handleEndDateChange}
          />
        </div>
      )}
    </div>
  );
};

export const MemoDatePicker = React.memo(DatePicker);

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
  yearRange: number[];
}
const RangeSlider = (props: RangeSliderProps): JSX.Element => {
  //Sync at the start too
  const dispatch = useDispatch();

  const [activeYearRange, setActiveYearRange] = React.useState<number[]>(
    props.yearRange
  );

  React.useEffect(() => {
    dispatch(setAnalysisYearRange(activeYearRange));
  }, []);

  function handleSliderRange(val: number[]): void {
    setActiveYearRange(val);
    dispatch(setAnalysisYearRange(val));
  }

  const marks: any = React.useMemo(() => generateMarks(props.yearRange), [
    props.yearRange
  ]);

  return (
    <div className="time-slider-container">
      <SliderWithTooltip
        min={props.yearRange[0]}
        max={props.yearRange[1]}
        defaultValue={[props.yearRange[0], props.yearRange[1]]}
        value={activeYearRange}
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
        onChange={(value: Array<number>): void => handleSliderRange(value)}
      />
    </div>
  );
};

export const MemoRangeSlider = React.memo(RangeSlider);
