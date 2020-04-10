import * as React from 'react';

interface DaySelectorProps {
  setDay: (val: string) => void;
  todayDate: string;
  day: string;
}
export const DaySelector = (props: DaySelectorProps): JSX.Element => {
  return (
    <div className="date-section-wrapper">
      <input
        className="date-time-toggle input imagery-input"
        type="date"
        value={props.day}
        max={props.todayDate}
        onChange={(e): void => props.setDay(e.target.value)}
      />
    </div>
  );
};
