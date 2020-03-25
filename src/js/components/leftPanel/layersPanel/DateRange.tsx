import React, { useState, ChangeEvent } from 'react';

import { mapController } from 'js/controllers/mapController';

import { LayerProps } from 'js/store/mapview/types';

interface DateRangeProps {
  layer: LayerProps;
}

const returnDateToday = (): string => {
  const dateToday = new Date().toLocaleDateString();
  const [monthToday, dayToday, yearToday] = dateToday.split('/');
  const dayTodayFormatted = dayToday.length === 1 ? `0${dayToday}` : dayToday;
  const monthTodayFormatted =
    monthToday.length === 1 ? `0${monthToday}` : monthToday;
  const dateTodayFormatted = `${yearToday}-${monthTodayFormatted}-${dayTodayFormatted}`;
  return dateTodayFormatted;
};

const DateRange = (props: DateRangeProps): JSX.Element => {
  const { layer } = props;

  const [startDate, setStartDate] = useState(returnDateToday());
  const [endDate, setEndDate] = useState(returnDateToday());
  const [renderCustomRange, setRenderCustomRange] = useState(false);
  const [definedRange, setDefinedRange] = useState('');

  const updateStartDate = (e: ChangeEvent<HTMLInputElement>): void => {
    setStartDate(e.target.value);
    mapController.setCustomDateRange(layer.id, e.target.value, endDate);
  };

  const updateEndDate = (e: ChangeEvent<HTMLInputElement>): void => {
    setEndDate(e.target.value);
    mapController.setCustomDateRange(layer.id, e.target.value, endDate);
  };

  const setDefinedDateRange = (e: ChangeEvent<HTMLSelectElement>): void => {
    if (e.target.value === 'Select a date range') {
      setDefinedRange('');
      setRenderCustomRange(false);
      mapController.resetDefinedDateRange(layer.id);
      return;
    }

    setDefinedRange(e.target.value);
    setRenderCustomRange(false);
    mapController.setDefinedDateRange(layer.id, e.target.value);
  };

  /**
   * TODO [ ] set min of input dynamically
   */

  return (
    <>
      <div className="dropdown-wrapper">
        <select
          onChange={(e): void => setDefinedDateRange(e)}
          value={definedRange.length ? definedRange : 'Select a date range'}
        >
          <option value={'Select a date range'}>Select a date range</option>
          <option value={'24 hrs'}>Past 24 hours</option>
          <option value={'48 hrs'}>Past 48 hours</option>
          <option value={'72 hrs'}>Past 72 hours</option>
          <option value={'7 days'}>Past week</option>
        </select>
      </div>
      <button onClick={(): void => setRenderCustomRange(!renderCustomRange)}>
        Custom Range
      </button>
      {renderCustomRange && (
        <>
          <div className="date-section-wrapper">
            <label htmlFor="start-date">Start:</label>
            <input
              type="date"
              id="start-date"
              value={startDate}
              min="2018-01-01"
              max={returnDateToday()}
              onChange={(e): void => updateStartDate(e)}
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
              onChange={(e): void => updateEndDate(e)}
            />
          </div>
        </>
      )}
    </>
  );
};

export default DateRange;
