import React, { useState } from 'react';
import { createSliderWithTooltip, Range } from 'rc-slider';

import { mapController } from 'js/controllers/mapController';

const SliderWithTooltip = createSliderWithTooltip(Range);

interface TimeSliderProps {
  layerID: string;
}

const TimeSlider = (props: TimeSliderProps): JSX.Element => {
  const { layerID } = props;
  const [range, setRange] = useState([2000, 2018]);
  const [playButton, setPlayButton] = useState(true);
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

  const setSelectedRange = (selectedRange: Array<number>): void => {
    setRange(selectedRange);
    mapController.updateBaseTile(layerID, selectedRange);
  };

  const playSequence = (): void => {
    const [minYear, maxYear] = range;
    const endRange = maxYear;
    let mode = 0;
    setPlayButton(false);
    setSelectedRange([minYear, minYear]);

    for (let sequenceYear = minYear; sequenceYear <= endRange; sequenceYear++) {
      mode++;

      setTimeout(() => {
        setSelectedRange([minYear, sequenceYear]);
      }, mode * 1000);
    }
  };

  const pauseSequence = (): void => {
    // clearTimeout(timeout); // ? How do I cancel setTimeout() and override the for loop?
    setPlayButton(true);
    setSelectedRange([2000, 2018]);
    mapController.updateBaseTile(layerID, [2000, 2018]);
  };

  return (
    <div className="time-slider-container">
      {playButton ? (
        <button onClick={(): void => playSequence()}>&#9658;</button>
      ) : (
        <button onClick={(): void => pauseSequence()}>&#10074;&#10074;</button>
      )}
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
        onChange={(value: Array<number>): void => setSelectedRange(value)}
      />
    </div>
  );
};

export default TimeSlider;
