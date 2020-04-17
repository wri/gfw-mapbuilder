import * as React from 'react';
import { createSliderWithTooltip, Range } from 'rc-slider';

const SliderWithTooltip = createSliderWithTooltip(Range);

function generateMarks(range: number[]): any[] | {} {
  const marksObject = {};
  for (let i = range[0]; i <= range[1]; i++) {
    if (i === range[0] || i === range[1]) {
      marksObject[i] = { label: String(i), style: {} };
    } else {
      marksObject[i] = { label: String(i), style: { display: 'none' } };
    }
  }
  return marksObject;
}

interface RangeSliderProps {
  yearRange: number[];
  handleSliderChange: (val: number[]) => void;
}
const ReportRangeSlider = (props: RangeSliderProps): JSX.Element => {
  //Sync at the start too
  const [activeYearRange, setActiveYearRange] = React.useState<number[]>(
    props.yearRange
  );

  React.useEffect(() => {
    props.handleSliderChange(activeYearRange);
  }, [props]);

  function handleSliderRange(val: number[]): void {
    setActiveYearRange(val);
    props.handleSliderChange(val);
  }

  const marks: any = React.useMemo(() => generateMarks(props.yearRange), [
    props.yearRange
  ]);

  return (
    <div className="time-slider-container">
      <SliderWithTooltip
        min={props.yearRange[0]}
        max={props.yearRange[1]}
        defaultValue={[props.yearRange[0], props.yearRange[1]]}
        value={activeYearRange}
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
        onChange={(value: Array<number>): void => handleSliderRange(value)}
      />
    </div>
  );
};

export const MemoReportRangeSlider = React.memo(ReportRangeSlider);
