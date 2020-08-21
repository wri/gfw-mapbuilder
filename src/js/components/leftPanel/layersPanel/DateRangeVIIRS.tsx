import React, { useState, ChangeEvent, useEffect } from 'react';

import { mapController } from 'js/controllers/mapController';
import { RootState } from 'js/store/index';
import { useSelector } from 'react-redux';
import { LayerProps } from 'js/store/mapview/types';
import viirsLayer, { getMaxDateForViirsTiles } from 'js/helpers/viirsLayerUtil';
import { format, subDays } from 'date-fns';

interface DateRangeProps {
  layer: LayerProps;
  id: string;
}
// const getTodayDate = format(new Date(Date.now()), 'yyyy-MM-dd');

const valueMap = {
  '24 hrs': 1,
  '48 hrs': 2,
  '72 hrs': 3,
  '7 days': 7
};
const DateRange = (props: DateRangeProps): JSX.Element => {
  const customColorTheme = useSelector(
    (store: RootState) => store.appSettings.customColorTheme
  );
  //TODO: VIIRS Start is today - 90 days ago is the max, and today is not really today, it is the max date from the API!
  const viirsStart = useSelector(
    (store: RootState) => store.appState.leftPanel.viirsStart
  );
  const viirsEnd = useSelector(
    (store: RootState) => store.appState.leftPanel.viirsEnd
  );

  const allAvailableLayers = useSelector(
    (store: RootState) => store.mapviewState.allAvailableLayers
  );

  const { layer } = props;

  const [startDate, setStartDate] = useState<string>(viirsStart);
  const [endDate, setEndDate] = useState(viirsEnd);
  const [maxDate, setMaxDate] = useState('');
  const [minDate, setMinDate] = useState('');
  const [renderCustomRange, setRenderCustomRange] = useState(false);
  const [definedRange, setDefinedRange] = useState('');

  const updateStartDate = (e: ChangeEvent<HTMLInputElement>): void => {
    setStartDate(e.target.value);
    // mapController.setCustomDateRange(layer.id, e.target.value, endDate);

    const viirsOnMap = mapController._map?.findLayerById('VIIRS_ACTIVE_FIRES');
    const viirsConfig = allAvailableLayers.find(
      l => l.id === 'VIIRS_ACTIVE_FIRES'
    );
    if (viirsOnMap && mapController._map && viirsConfig) {
      const viirsIndex: number = mapController._map!.layers.indexOf(viirsOnMap);
      mapController._map.remove(viirsOnMap);
      const viirsNew = viirsLayer(
        viirsConfig.id,
        viirsConfig.url,
        true,
        valueMap[e.target.value],
        [e.target.value, endDate]
      );
      mapController._map?.add(viirsNew, viirsIndex);
    }
  };

  const updateEndDate = (e: ChangeEvent<HTMLInputElement>): void => {
    setEndDate(e.target.value);
    // mapController.setCustomDateRange(layer.id, startDate, e.target.value);

    const viirsOnMap = mapController._map?.findLayerById('VIIRS_ACTIVE_FIRES');
    const viirsConfig = allAvailableLayers.find(
      l => l.id === 'VIIRS_ACTIVE_FIRES'
    );
    if (viirsOnMap && mapController._map && viirsConfig) {
      const viirsIndex: number = mapController._map!.layers.indexOf(viirsOnMap);
      mapController._map.remove(viirsOnMap);
      const viirsNew = viirsLayer(
        viirsConfig.id,
        viirsConfig.url,
        true,
        valueMap[e.target.value],
        [startDate, e.target.value]
      );
      mapController._map?.add(viirsNew, viirsIndex);
      console.log('gogo');
    }
  };

  const setDefinedDateRange = (e: ChangeEvent<HTMLSelectElement>): void => {
    console.log(e.target.value);
    setRenderCustomRange(false);
    setDefinedRange(e.target.value);

    const viirsOnMap = mapController._map?.findLayerById('VIIRS_ACTIVE_FIRES');
    const viirsConfig = allAvailableLayers.find(
      l => l.id === 'VIIRS_ACTIVE_FIRES'
    );
    if (viirsOnMap && mapController._map && viirsConfig) {
      const viirsIndex: number = mapController._map!.layers.indexOf(viirsOnMap);
      mapController._map.remove(viirsOnMap);
      const viirsNew = viirsLayer(
        viirsConfig.id,
        viirsConfig.url,
        true,
        valueMap[e.target.value]
      );
      mapController._map?.add(viirsNew, viirsIndex);
    }
    // mapController.setDefinedDateRange(layer.id, e.target.value);
    // mapController.resetCustomDateRange();
  };

  const setCustomRange = (): void => {
    setRenderCustomRange(!renderCustomRange);

    // setDefinedRange('24 hrs');
    // mapController.setDefinedDateRange(layer.id, '24 hrs');
    // mapController.resetCustomDateRange();
  };

  useEffect(() => {
    async function getMaxDate(): Promise<void> {
      const date = await getMaxDateForViirsTiles(); //YYYY-MM-DD
      const fDate = new Date(date);
      const ninetyDaysAgo = format(subDays(fDate, 90), 'yyyy-MM-dd');
      console.log(ninetyDaysAgo);
      console.log(date);
      //Set the defaults
      setMaxDate(date);
      setStartDate(ninetyDaysAgo);
      setMinDate(ninetyDaysAgo);
      setEndDate(date);
    }
    getMaxDate();
  }, []);

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
              <input
                className="date-time-toggle input"
                style={{ border: `1px solid ${customColorTheme}` }}
                type="date"
                value={startDate}
                min={minDate}
                max={maxDate}
                onChange={(e): void => updateStartDate(e)}
              />
            </div>
            <div className="date-section-wrapper">
              <label htmlFor="end-date">End:</label>
              <input
                className="date-time-toggle input"
                style={{ border: `1px solid ${customColorTheme}` }}
                type="date"
                value={endDate}
                min={minDate}
                max={maxDate}
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
