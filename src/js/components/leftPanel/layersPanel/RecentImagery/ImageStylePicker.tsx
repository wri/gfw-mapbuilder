import * as React from 'react';
import imageryText from './imageryLanguages';

interface ImageStylePickerProps {
  lang: string;
  imageryStyle: string;
  changeStyleHandler: (val: any) => void;
}
export const ImageStylePicker = (props: ImageStylePickerProps): JSX.Element => {
  const options = imageryText[props.lang].imageStyleOptions.map(
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
      className="date-time-toggle imagery-style"
      onChange={props.changeStyleHandler}
      value={props.imageryStyle}
    >
      {options}
    </select>
  );
};
