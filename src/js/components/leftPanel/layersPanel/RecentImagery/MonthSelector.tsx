import * as React from 'react';
import imageryText from '../../../../../../configs/translations/imagery.translations';

interface MonthSelectorProps {
  changeMonthHandler: (val: any) => void;
  lang: string;
  monthRange: string;
  customColorTheme: string;
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
      style={{ border: `1px solid ${props.customColorTheme}` }}
      onChange={props.changeMonthHandler}
      value={props.monthRange}
    >
      {options}
    </select>
  );
};
