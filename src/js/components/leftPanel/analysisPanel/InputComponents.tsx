import * as React from 'react';
import { setAnalysisDateRange } from 'js/store/appState/actions';
import { useDispatch } from 'react-redux';

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

export const RangeSlider = (): JSX.Element => {
  return <p>Range Slider</p>;
};
