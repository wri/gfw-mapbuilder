import React, { useState, ChangeEvent } from 'react';
import { format, parse } from 'date-fns';
import { useSelector } from 'react-redux';

import { mapController } from '../../../../js/controllers/mapController';
import { RootState } from '../../../../js/store/index';
import { LayerProps } from '../../../../js/store/mapview/types';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { handleCustomColorTheme } from '../../../../utils';

const getTodayDate = format(new Date(Date.now()), 'yyyy-MM-dd');

interface DateRangeProps {
  layer: LayerProps;
  id: string;
}
const DateRange = (props: DateRangeProps): JSX.Element => {
  const customColorTheme = useSelector((store: RootState) => store.appSettings.customColorTheme);
  const modisStart = useSelector((store: RootState) => store.appState.leftPanel.modisStart);
  const modisEnd = useSelector((store: RootState) => store.appState.leftPanel.modisEnd);

  const { layer } = props;

  const [startDate, setStartDate] = useState<string>(modisStart);
  const [endDate, setEndDate] = useState(modisEnd);
  const [renderCustomRange, setRenderCustomRange] = useState(false);
  const [definedRange, setDefinedRange] = useState('');

  const themeColor = handleCustomColorTheme(customColorTheme);

  const updateStartDate = (day: any): void => {
    const dFormat = format(day, 'yyyy-MM-dd');
    setStartDate(dFormat);
    mapController.setCustomDateRange(layer.id, dFormat, endDate);
  };

  const updateEndDate = (day: any): void => {
    const dFormat = format(day, 'yyyy-MM-dd');
    setEndDate(dFormat);
    mapController.setCustomDateRange(layer.id, startDate, dFormat);
  };

  const setDefinedDateRange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setDefinedRange(e.target.value);
    setRenderCustomRange(false);
    mapController.setDefinedDateRange(layer.id, e.target.value);
    mapController.resetCustomDateRange();
  };

  const setCustomRange = (): void => {
    setRenderCustomRange(!renderCustomRange);

    setDefinedRange('24 hrs');
    mapController.setDefinedDateRange(layer.id, '24 hrs');
    mapController.resetCustomDateRange();
  };

  const fStartDate = parse(startDate, 'yyyy-MM-dd', new Date());
  const fToday = parse(getTodayDate, 'yyyy-MM-dd', new Date());

  return (
    <>
      <div className="daterange-wrapper">
        <select
          className="date-time-toggle"
          style={{ border: `1px solid ${themeColor}` }}
          onChange={(e): void => setDefinedDateRange(e)}
          value={definedRange.length ? definedRange : '24 hrs'}
        >
          <option value={'24 hrs'}>Past 24 hours</option>
          <option value={'48 hrs'}>Past 48 hours</option>
          <option value={'72 hrs'}>Past 72 hours</option>
          <option value={'7 days'}>Past week</option>
        </select>
        <button
          className="date-time-toggle"
          style={{ border: `1px solid ${themeColor}` }}
          onClick={(): void => setCustomRange()}
        >
          Custom Range
        </button>
        {renderCustomRange && (
          <div className="calendar-wrapper">
            <div className="date-section-wrapper">
              <label htmlFor="start-date">Start:</label>
              <DatePicker
                placeholderText="select a day"
                onChange={(date) => updateStartDate(date)}
                selected={new Date(startDate)}
                maxDate={fToday}
              />
            </div>
            <div className="date-section-wrapper">
              <label htmlFor="end-date">End:</label>
              <DatePicker
                placeholderText="select a day"
                onChange={(date) => updateEndDate(date)}
                selected={new Date(endDate)}
                maxDate={fToday}
                minDate={fStartDate}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DateRange;
