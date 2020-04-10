import * as React from 'react';
import { setAnalysisDateRange } from 'js/store/appState/actions';
import { useDispatch } from 'react-redux';

interface DatePickerProps {
  multi?: boolean;
  minDate: string; //YYYY-MM-DD
  maxDate: string; //YYYY-MM-DD
}

interface CallbackProp {
  sendDate?: (date: string, type: 'start' | 'end') => void;
}
const getTodayDate = new Date().toISOString().split('T')[0];

const DatePicker = (props: DatePickerProps): JSX.Element => {
  const dispatch = useDispatch();
  const { multi, minDate, maxDate } = props;

  const [startDate, setStartDate] = React.useState(getTodayDate);

  const [endDate, setEndDate] = React.useState(getTodayDate);
  function handleStartDateChange(e: any): void {
    setStartDate(e.target.value);
    // dispatch(setAnalysisDateRange([startDate, endDate]));
    // props.sendDate(startDate, endDate);
    // props.sendDate(e.target.value, 'start');
  }

  function handleEndDateChange(e: any): void {
    setEndDate(e.target.value);
    // dispatch(setAnalysisDateRange([startDate, endDate]));
    // props.sendDate(startDate, endDate);
    // props.sendDate(e.target.value, 'end');
  }

  // React.useEffect(() => {
  //   console.log('synccccccccccccc');
  //   props.sendDate(startDate, endDate);
  // }, [startDate, endDate]);

  return (
    <div className="calendar-wrapper">
      <div className="date-section-wrapper">
        <label htmlFor="start-date">Start:</label>
        <input
          className="date-time-toggle input"
          type="date"
          defaultValue={startDate}
          // value={props.startDate}
          min={minDate ? minDate : undefined}
          // onChange={handleStartDateChange}
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

export const RangeSlider = (): JSX.Element => {
  return <p>Range Slider</p>;
};
