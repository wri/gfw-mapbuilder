import React, { useState, ChangeEvent } from 'react';

import { LayerProps } from 'js/store/mapview/types';

interface DateRangeProps {
  layer: LayerProps;
}

const DateRange = (props: DateRangeProps): JSX.Element => {
  const { layer } = props;
  console.log('<DateRange/>', layer);

  const returnDateToday = (): string => {
    const dateToday = new Date().toLocaleDateString();
    const [monthToday, dayToday, yearToday] = dateToday.split('/');
    const dayTodayFormatted = dayToday.length === 1 ? `0${dayToday}` : dayToday;
    const monthTodayFormatted =
      monthToday.length === 1 ? `0${monthToday}` : monthToday;
    const dateTodayFormatted = `${yearToday}-${monthTodayFormatted}-${dayTodayFormatted}`;

    return dateTodayFormatted;
  };

  const [startDate, setStartDate] = useState(returnDateToday());
  const [endDate, setEndDate] = useState(returnDateToday());

  const setDate = (
    updateStartDate: boolean,
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    if (updateStartDate) {
      setStartDate(e.target.value);
    } else {
      setEndDate(e.target.value);
    }
  };

  /**
   * TODO
   * [ ] set min of input dynamically
   */

  return (
    <>
      <div className="date-section-wrapper">
        <label htmlFor="start-date">Start:</label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          min="2018-01-01"
          max={returnDateToday()}
          onChange={(e): void => setDate(true, e)}
        />
      </div>
      <div className="date-section-wrapper">
        <label htmlFor="end-date">End:</label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          min="2018-01-01"
          max={returnDateToday()}
          onChange={(e): void => setDate(false, e)}
        />
      </div>
    </>
  );
};

export default DateRange;