import React, { useState } from 'react';
import { createSliderWithTooltip, Range } from 'rc-slider';

const SliderWithTooltip = createSliderWithTooltip(Range);

const TimeSlider = (): JSX.Element => {
  const [range, setRange] = useState([2000, 2018]);
  const marks = [
    { label: '2000', style: {} },
    { label: '2001', style: {} },
    { label: '2002', style: {} },
    { label: '2003', style: {} },
    { label: '2004', style: {} },
    { label: '2005', style: {} },
    { label: '2006', style: {} },
    { label: '2007', style: {} },
    { label: '2008', style: {} },
    { label: '2009', style: {} },
    { label: '2010', style: {} },
    { label: '2011', style: {} },
    { label: '2012', style: {} },
    { label: '2013', style: {} },
    { label: '2014', style: {} },
    { label: '2015', style: {} },
    { label: '2016', style: {} },
    { label: '2017', style: {} },
    { label: '2018', style: {} }
  ];

  return (
    <div className="time-slider-container">
      <button onClick={(): void => console.log('play time sequence!')}>
        &#9658;
      </button>
      <SliderWithTooltip
        min={2000}
        max={2018}
        defaultValue={[2000, 2018]}
        value={range}
        allowCross={false}
        tipFormatter={(val: number): number => val}
        dots={true}
        marks={marks}
        railStyle={{ backgroundColor: 'rgb(233, 233, 233)' }}
        handleStyle={[{ borderColor: 'rgb(240, 171, 0)' }]}
        dotStyle={{ border: '1px solid #e9e9e9' }}
        activeDotStyle={{
          border: '1px solid #F0AB00'
        }}
        trackStyle={[{ backgroundColor: 'rgb(240, 171, 0)' }]}
        onChange={(value: Array<number>): void => setRange(value)}
      />
    </div>
  );
};

export default TimeSlider;
