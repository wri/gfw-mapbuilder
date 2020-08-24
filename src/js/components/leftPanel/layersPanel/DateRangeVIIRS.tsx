import React, { useState, ChangeEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { mapController } from 'js/controllers/mapController';
import { RootState } from 'js/store/index';
import { useSelector } from 'react-redux';
import { LayerProps } from 'js/store/mapview/types';
import viirsLayer, { getMaxDateForViirsTiles } from 'js/helpers/viirsLayerUtil';
import { format, subDays, parse } from 'date-fns';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import './datepicker.scss';
import { setViirsStart, setViirsEnd } from 'js/store/appState/actions';

interface DateRangeProps {
  layer: LayerProps;
  id: string;
}

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

  const [startDate, setStartDate] = useState(viirsStart);
  const [endDate, setEndDate] = useState(viirsEnd);
  const [maxDate, setMaxDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [minDate, setMinDate] = useState('');
  const [renderCustomRange, setRenderCustomRange] = useState(false);
  const [definedRange, setDefinedRange] = useState('');
  const dispatch = useDispatch();

  const updateStartDate = (day: Date): void => {
    const dFormat = format(day, 'yyyy-MM-dd');
    setStartDate(dFormat);
    const viirsOnMap = mapController._map?.findLayerById('VIIRS_ACTIVE_FIRES');
    const viirsConfig = allAvailableLayers.find(
      l => l.id === 'VIIRS_ACTIVE_FIRES'
    );
    // // mapController.setCustomDateRange(layer.id, e.target.value, endDate);

    if (viirsOnMap && mapController._map && viirsConfig) {
      const viirsIndex: number = mapController._map!.layers.indexOf(viirsOnMap);
      mapController._map.remove(viirsOnMap);
      const viirsNew = viirsLayer(viirsConfig.id, viirsConfig.url, true, 7, [
        dFormat,
        endDate
      ]);
      mapController._map?.add(viirsNew, viirsIndex);
    }
    dispatch(setViirsStart(String(dFormat)));
  };

  const updateEndDate = (day: Date): void => {
    const dFormat = format(day, 'yyyy-MM-dd');
    setEndDate(dFormat);
    // mapController.setCustomDateRange(layer.id, startDate, e.target.value);

    const viirsOnMap = mapController._map?.findLayerById('VIIRS_ACTIVE_FIRES');
    const viirsConfig = allAvailableLayers.find(
      l => l.id === 'VIIRS_ACTIVE_FIRES'
    );
    if (viirsOnMap && mapController._map && viirsConfig) {
      const viirsIndex: number = mapController._map!.layers.indexOf(viirsOnMap);
      mapController._map.remove(viirsOnMap);
      const viirsNew = viirsLayer(viirsConfig.id, viirsConfig.url, true, 7, [
        startDate,
        dFormat
      ]);
      mapController._map?.add(viirsNew, viirsIndex);
    }
    dispatch(setViirsEnd(String(dFormat)));
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

      const fDate = parse(maxDate, 'yyyy-MM-dd', new Date());
      const startDate = format(
        subDays(fDate, valueMap[e.target.value]),
        'yyyy-MM-dd'
      );
      // const startDate = moment(maxDate)
      //   .subtract(valueMap[e.target.value], 'days')
      //   .format('YYYY-MM-DD');
      setEndDate(maxDate);
      setStartDate(startDate);
      dispatch(setViirsStart(String(startDate)));
      dispatch(setViirsEnd(String(maxDate)));
    }
  };

  const setCustomRange = (): void => {
    setRenderCustomRange(!renderCustomRange);
  };

  useEffect(() => {
    async function getMaxDate(): Promise<void> {
      //TODO:All these default values should be derived from REDUX state!
      const date = await getMaxDateForViirsTiles(); //YYYY-MM-DD
      const fDate = parse(date, 'yyyy-MM-dd', new Date());
      setMaxDate(format(fDate, 'yyy-MM-dd'));
      // const fDate = new Date(date);
      // const ninetyDaysAgo = format(subDays(fDate, 90), 'yyyy-MM-dd');
      // setMaxDate(date);
      // setStartDate(ninetyDaysAgo);
      // setMinDate(ninetyDaysAgo);
      // setEndDate(date);
    }
    getMaxDate();
  }, []);

  const fEndDate = parse(endDate, 'yyyy-MM-dd', new Date());
  const fMaxDate = parse(maxDate, 'yyyy-MM-dd', new Date());
  const fMinDate = parse(startDate, 'yyyy-MM-dd', new Date());
  const ninetyDaysAgo = format(subDays(fEndDate, 90), 'yyyy-MM-dd');
  const fNine = parse(ninetyDaysAgo, 'yyyy-MM-dd', new Date());

  const startDateProps = {
    disabledDays: { after: fMaxDate, before: fNine }
  };

  const endDateProps = {
    disabledDays: { after: fMaxDate, before: fMinDate }
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
