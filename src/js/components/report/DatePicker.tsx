import * as React from 'react';

interface DatePickerProps {
  multi?: boolean;
  minDate: string; //YYYY-MM-DD
  maxDate: string; //YYYY-MM-DD
  defaultStartDate?: string;
  defaultEndDate?: string;
  sendDateValue: (start: string, end: string, id: string) => void;
  customColorTheme: string;
  analysisId: string;
}
const getTodayDate = new Date().toISOString().split('T')[0];

const DatePicker = (props: DatePickerProps): JSX.Element => {
  const { multi, minDate, maxDate, defaultEndDate, defaultStartDate, analysisId } = props;

  const [startDate, setStartDate] = React.useState(defaultStartDate ? defaultStartDate : getTodayDate);

  const [endDate, setEndDate] = React.useState(defaultEndDate ? defaultEndDate : getTodayDate);

  function handleStartDateChange(e: any): void {
    setStartDate(e.target.value);
    props.sendDateValue(e.target.value, endDate, analysisId);
  }

  function handleEndDateChange(e: any): void {
    setEndDate(e.target.value);
    props.sendDateValue(startDate, e.target.value, analysisId);
  }

  return (
    <div className="calendar-wrapper">
      <div className="date-section-wrapper">
        <label htmlFor="start-date">Start:</label>
        <input
          className="date-time-toggle input"
          style={{ border: `1px solid ${props.customColorTheme}` }}
          type="date"
          defaultValue={minDate ? minDate : startDate}
          onChange={handleStartDateChange}
        />
      </div>
      {multi && (
        <div className="date-section-wrapper">
          <label htmlFor="end-date">End:</label>
          <input
            className="date-time-toggle input"
            style={{ border: `1px solid ${props.customColorTheme}` }}
            type="date"
            defaultValue={maxDate ? maxDate : endDate}
            max={maxDate ? maxDate : undefined}
            onChange={handleEndDateChange}
          />
        </div>
      )}
    </div>
  );
};

export const MemoReportDatePicker = React.memo(DatePicker);
