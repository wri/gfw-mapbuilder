import React, { useState, ChangeEvent } from 'react';

import { mapController } from 'js/controllers/mapController';
import { RootState } from 'js/store/index';
import { useSelector } from 'react-redux';
import { LayerProps } from 'js/store/mapview/types';
import { format } from 'date-fns';

interface DateRangeProps {
  layer: LayerProps;
  id: string;
}
const getTodayDate = format(new Date(Date.now()), 'yyyy-MM-dd');

const DateRange = (props: DateRangeProps): JSX.Element => {
  const modisStart = useSelector(
    (store: RootState) => store.appState.leftPanel.modisStart
  );
  const modisEnd = useSelector(
    (store: RootState) => store.appState.leftPanel.modisEnd
  );
  const viirsStart = useSelector(
    (store: RootState) => store.appState.leftPanel.viirsStart
  );
  const viirsEnd = useSelector(
    (store: RootState) => store.appState.leftPanel.viirsEnd
  );

  const { layer } = props;

  const [startDate, setStartDate] = useState<string>(
    props.id === 'VIIRS_ACTIVE_FIRES' ? viirsStart : modisStart
  );
  const [endDate, setEndDate] = useState(
    props.id === 'VIIRS_ACTIVE_FIRES' ? viirsEnd : modisEnd
  );
  const [renderCustomRange, setRenderCustomRange] = useState(false);
  const [definedRange, setDefinedRange] = useState('');

  const updateStartDate = (e: ChangeEvent<HTMLInputElement>): void => {
    setStartDate(e.target.value);
    mapController.setCustomDateRange(layer.id, e.target.value, endDate);
  };

  const updateEndDate = (e: ChangeEvent<HTMLInputElement>): void => {
    setEndDate(e.target.value);
    mapController.setCustomDateRange(layer.id, startDate, e.target.value);
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

  return (
    <>
      <div
        className={`daterange-wrapper ${
          renderCustomRange ? 'expanded-date-section' : ''
        } `}
      >
        <select
          className="date-time-toggle"
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
          onClick={(): void => setCustomRange()}
        >
          Custom Range
        </button>
        {renderCustomRange && (
          <div className="calendar-wrapper">
            <div className="date-section-wrapper">
              <label htmlFor="start-date">Start:</label>
              <input
                className="date-time-toggle input"
                type="date"
                value={startDate}
                min="2018-01-01"
                max={getTodayDate}
                onChange={(e): void => updateStartDate(e)}
              />
            </div>
            <div className="date-section-wrapper">
              <label htmlFor="end-date">End:</label>
              <input
                className="date-time-toggle input"
                type="date"
                value={endDate}
                min="2018-01-01"
                max={getTodayDate}
                onChange={(e): void => updateEndDate(e)}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DateRange;
