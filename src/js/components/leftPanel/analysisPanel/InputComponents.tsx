import * as React from 'react';
import { UIParams } from './BaseAnalysis';
interface DatePickerProps {
  startParamName: string;
  combineParams: boolean;
  endParamName?: string;
  valueSeparator?: string;
  multi?: boolean;
  minDate: string; //YYYY-MM-DD
  maxDate: string; //YYYY-MM-DD
  defaultStartDate: string; //YYYY-MM-DD
  defaultEndDate: string; //YYYY-MM-DD
}

const getTodayDate = (): string => {
  const getTodayDate = new Date().toISOString().split('T')[0];
  return getTodayDate;
};

interface CallbackProp {
  sendDate: (date: string, period: 'start' | 'end') => void;
}

export const DatePicker = (props: UIParams & CallbackProp): JSX.Element => {
  console.log(props);
  const {
    startParamName,
    combineParams,
    endParamName,
    valueSeparator,
    multi,
    minDate,
    maxDate,
    defaultStartDate,
    defaultEndDate
  } = props;
  const [startDate, setStartDate] = React.useState(
    defaultStartDate ? defaultStartDate : getTodayDate()
  );
  const [endDate, setEndDate] = React.useState(
    defaultEndDate ? defaultEndDate : getTodayDate()
  );
  function handleStartDateChange(e: any): void {
    setStartDate(e.target.value);
    props.sendDate(e.target.value, 'start');
    console.log(e.target.value);
  }

  function handleEndDateChange(e: any): void {
    setEndDate(e.target.value);
    props.sendDate(e.target.value, 'end');
  }

  return (
    <div className="calendar-wrapper">
      <div className="date-section-wrapper">
        <label htmlFor="start-date">Start:</label>
        <input
          className="date-time-toggle input"
          type="date"
          value={startDate}
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

export const RangeSlider = (): JSX.Element => {
  return <p>Range Slider</p>;
};
