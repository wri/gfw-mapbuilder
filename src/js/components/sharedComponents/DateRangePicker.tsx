import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
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

  return (
    <div className="calendar-wrapper">
      <div className="date-section-wrapper">
        <label htmlFor="start-date">Start </label>
        <DatePicker
          placeholderText="select a day"
          onChange={(date: any) => dispatch(setAnalysisDateRange([format(date, 'yyyy-MM-dd'), analysisDateRange[1]]))}
          selected={new Date(analysisDateRange[0])}
        />
      </div>
      <div className="date-section-wrapper">
        <label htmlFor="end-date">End </label>
        <DatePicker
          placeholderText="select a day"
          onChange={(date: any) => dispatch(setAnalysisDateRange([analysisDateRange[0], format(date, 'yyyy-MM-dd')]))}
          selected={new Date(analysisDateRange[1])}
        />
      </div>
    </div>
  );
}
