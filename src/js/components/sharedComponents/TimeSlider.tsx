import React, { useState } from 'react';
import Slider, { createSliderWithTooltip, Range } from 'rc-slider';

const SliderWithTooltip = createSliderWithTooltip(Range);
// const SliderWithTooltip = createSliderWithTooltip(Slider);

const TimeSlider = (): JSX.Element => {
  const [range, setRange] = useState([2000, 2018]);
  const [startYear, endYear] = range;
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

  const handleSliderChange = (value: any) => {
    console.log('VALUE', value);
    setRange(value);
  };

  return (
    <div className="time-slider">
      <SliderWithTooltip
        min={2000}
        max={2018}
        defaultValue={[2000, 2018]}
        value={range}
        // disabled={true}
        allowCross={false}
        tipFormatter={(val: number): number => val}
        dots={true}
        marks={marks}
        //
        // railStyle={{ height: 10, backgroundColor: 'rgb(240, 171, 0)' }}
        // trackStyle={{ backgroundColor: '#e9e9e9', height: 10 }}
        // activeDotStyle={{ border: '2px solid #e9e9e9' }}
        // dotStyle={{
        //   border: `2px solid rgb(240, 171, 0)`,
        //   height: 10,
        //   width: 10,
        //   bottom: -6
        // }}
        // handleStyle={[
        //   {
        //     border: `2px solid rgb(240, 171, 0)`,
        //     height: 20,
        //     width: 20
        //   }
        // ]}
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default TimeSlider;
