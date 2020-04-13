import * as React from 'react';
import imageryText from './imageryLanguages';

interface MonthSelectorProps {
  changeMonthHandler: (val: any) => void;
  lang: string;
  monthRange: string;
}

export const MonthSelector = (props: MonthSelectorProps): JSX.Element => {
  const options = imageryText[props.lang].monthsOptions.map(
    (option: any, i: number) => {
      return (
        <option key={i} value={option.value}>
          {option.label}
        </option>
      );
    }
  );
  return (
    <select
      className="date-time-toggle imagery"
      onChange={props.changeMonthHandler}
      value={props.monthRange}
    >
      {options}
    </select>
  );
};
