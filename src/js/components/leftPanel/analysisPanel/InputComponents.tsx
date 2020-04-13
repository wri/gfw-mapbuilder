import * as React from 'react';
import { setAnalysisDateRange } from 'js/store/appState/actions';
import { useDispatch } from 'react-redux';

interface DatePickerProps {
  multi?: boolean;
  minDate: string; //YYYY-MM-DD
  maxDate: string; //YYYY-MM-DD
  defaultStartDate?: string;
  defaultEndDate?: string;
}
const getTodayDate = new Date().toISOString().split('T')[0];

const DatePicker = (props: DatePickerProps): JSX.Element => {
  const dispatch = useDispatch();
  const { multi, minDate, maxDate, defaultEndDate, defaultStartDate } = props;

  const [startDate, setStartDate] = React.useState(
    defaultStartDate ? defaultStartDate : getTodayDate
  );

  const [endDate, setEndDate] = React.useState(
    defaultEndDate ? defaultEndDate : getTodayDate
  );

  function handleStartDateChange(e: any): void {
    setStartDate(e.target.value);
    dispatch(setAnalysisDateRange([startDate, endDate]));
  }

  function handleEndDateChange(e: any): void {
    setEndDate(e.target.value);
    dispatch(setAnalysisDateRange([startDate, endDate]));
  }

  //Sync at the start too
  React.useEffect(() => {
    dispatch(setAnalysisDateRange([startDate, endDate]));
  }, []);

  return (
    <div className="calendar-wrapper">
      <div className="date-section-wrapper">
        <label htmlFor="start-date">Start:</label>
        <input
          className="date-time-toggle input"
          type="date"
          defaultValue={startDate}
          min={minDate ? minDate : undefined}
          onChange={handleStartDateChange}
        />
      </div>
      {multi && (
        <div className="date-section-wrapper">
          <label htmlFor="end-date">End:</label>
          <input
            className="date-time-toggle input"
            type="date"
            value={endDate}
            max={maxDate ? maxDate : undefined}
            onChange={handleEndDateChange}
          />
        </div>
      )}
    </div>
  );
};

export const MemoDatePicker = React.memo(DatePicker);

import { createSliderWithTooltip, Range } from 'rc-slider';
const SliderWithTooltip = createSliderWithTooltip(Range);

export const RangeSlider = (): JSX.Element => {
  const defaultMarks = {
    '2000': {
      label: '2000',
      style: {}
    },
    '2001': {
      label: '2001',
      style: { display: 'none' }
    },
    '2002': {
      label: '2002',
      style: { display: 'none' }
    },
    '2003': {
      label: '2003',
      style: {}
    },
    '2004': {
      label: '2004',
      style: { display: 'none' }
    },
    '2005': {
      label: '2005',
      style: { display: 'none' }
    },
    '2006': {
      label: '2006',
      style: {}
    },
    '2007': {
      label: '2007',
      style: { display: 'none' }
    },
    '2008': {
      label: '2008',
      style: { display: 'none' }
    },
    '2009': {
      label: '2009',
      style: {}
    },
    '2010': {
      label: '2010',
      style: { display: 'none' }
    },
    '2011': {
      label: '2011',
      style: { display: 'none' }
    },
    '2012': {
      label: '2012',
      style: {}
    },
    '2013': {
      label: '2013',
      style: { display: 'none' }
    },
    '2014': {
      label: '2014',
      style: { display: 'none' }
    },
    '2015': {
      label: '2015',
      style: {}
    },
    '2016': {
      label: '2016',
      style: { display: 'none' }
    },
    '2017': {
      label: '2017',
      style: { display: 'none' }
    },
    '2018': {
      label: '2018',
      style: {}
    }
  };
  const [range, setRange] = React.useState([2000, 2018]);

  function handleSliderRange(val: any) {
    console.log(val);
  }

  return (
    <div className="time-slider-container">
      <SliderWithTooltip
        min={2000}
        max={2018}
        defaultValue={[2000, 2018]}
        value={range}
        allowCross={false}
        tipFormatter={(val: number): number => val}
        dots={true}
        marks={defaultMarks}
        railStyle={{ backgroundColor: 'rgb(233, 233, 233)' }}
        handleStyle={[{ borderColor: 'rgb(240, 171, 0)' }]}
        dotStyle={{ border: '1px solid #e9e9e9' }}
        activeDotStyle={{
          border: '1px solid #F0AB00'
        }}
        trackStyle={[{ backgroundColor: 'rgb(240, 171, 0)' }]}
        onChange={(value: Array<number>): void => handleSliderRange(value)}
      />
    </div>
  );
};
