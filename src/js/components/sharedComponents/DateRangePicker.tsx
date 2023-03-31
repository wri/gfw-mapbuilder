import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format, add } from 'date-fns';
import DatePicker from 'react-datepicker';
import { RootState } from '../../store';
import { createSelector } from 'reselect';

import { setAnalysisDateRange } from '../../store/appState/actions';

import 'react-datepicker/dist/react-datepicker.css';

const selectAnalysisDaterange = createSelector(
  (state: RootState) => state.appState,
  (appState) => appState.leftPanel.analysisDateRange
);

export function DateRangePicker() {
  const dispatch = useDispatch();
  const analysisDateRange = useSelector(selectAnalysisDaterange);

  const handleDates = (date, type) => {
    if (type === 'start') {
      dispatch(setAnalysisDateRange([format(date, 'yyyy-MM-dd'), analysisDateRange[1]]));
    } else {
      dispatch(setAnalysisDateRange([analysisDateRange[0], format(date, 'yyyy-MM-dd')]));
    }
  };

  const formatDate = (date) => {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth();
    const dayOfMonth = new Date(date).getDate();
    const formattedDate = new Date(year, month, dayOfMonth + 1);

    if (formattedDate) return formattedDate;
    throw new Error('Invalid date DateRangePicker');
  };

  return (
    <div className="calendar-wrapper">
      <div className="date-section-wrapper">
        <label htmlFor="start-date">Start </label>
        <DatePicker
          placeholderText="select a day"
          onChange={(date: any) => handleDates(date, 'start')}
          selected={formatDate(analysisDateRange[0])}
        />
      </div>
      <div className="date-section-wrapper">
        <label htmlFor="end-date">End </label>
        <DatePicker
          placeholderText="select a day"
          onChange={(date: any) => handleDates(date, 'end')}
          selected={formatDate(analysisDateRange[1])}
        />
      </div>
    </div>
  );
}
