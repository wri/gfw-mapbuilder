import React, { useState, ChangeEvent } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { format, parse } from 'date-fns';
import { useSelector } from 'react-redux';

import { mapController } from 'js/controllers/mapController';
import { RootState } from 'js/store/index';
import { LayerProps } from 'js/store/mapview/types';

interface DateRangeProps {
  layer: LayerProps;
  id: string;
}
const getTodayDate = format(new Date(Date.now()), 'yyyy-MM-dd');

const DateRange = (props: DateRangeProps): JSX.Element => {
  const customColorTheme = useSelector(
    (store: RootState) => store.appSettings.customColorTheme
  );
  const modisStart = useSelector(
    (store: RootState) => store.appState.leftPanel.modisStart
  );
  const modisEnd = useSelector(
    (store: RootState) => store.appState.leftPanel.modisEnd
  );

  const { layer } = props;

  const [startDate, setStartDate] = useState<string>(modisStart);
  const [endDate, setEndDate] = useState(modisEnd);
  const [renderCustomRange, setRenderCustomRange] = useState(false);
  const [definedRange, setDefinedRange] = useState('');

  const updateStartDate = (day: Date): void => {
    const dFormat = format(day, 'yyyy-MM-dd');
    setStartDate(dFormat);
    mapController.setCustomDateRange(layer.id, dFormat, endDate);
  };

  const updateEndDate = (day: Date): void => {
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

  const startDateProps = {
    disabledDays: { after: fToday }
  };

  const endDateProps = {
    disabledDays: { after: fToday, before: fStartDate }
  };

  return (
    <>
      <div
        className={`daterange-wrapper ${
          renderCustomRange ? 'expanded-date-section' : ''
        } `}
      >
        <select
          className="date-time-toggle"
          style={{ border: `1px solid ${customColorTheme}` }}
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
          style={{ border: `1px solid ${customColorTheme}` }}
          onClick={(): void => setCustomRange()}
        >
          Custom Range
        </button>
        {renderCustomRange && (
          <div className="calendar-wrapper">
            <div className="date-section-wrapper">
              <label htmlFor="start-date">Start:</label>
              <DayPickerInput
                placeholder="select a day"
                showOverlay={false}
                onDayChange={day => updateStartDate(day)}
                dayPickerProps={startDateProps}
                value={startDate}
              />
            </div>
            <div className="date-section-wrapper">
              <label htmlFor="end-date">End:</label>
              <DayPickerInput
                placeholder="select a day"
                showOverlay={false}
                onDayChange={day => updateEndDate(day)}
                dayPickerProps={endDateProps}
                value={endDate}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DateRange;
