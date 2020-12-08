import * as React from 'react';
import imageryText from '../../../../../../configs/translations/imagery.translations';

interface ImageStylePickerProps {
  lang: string;
  imageryStyle: string;
  changeStyleHandler: (val: any) => void;
  customColorTheme: string;
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
      style={{ border: `1px solid ${props.customColorTheme}` }}
      className="date-time-toggle imagery-style"
      onChange={props.changeStyleHandler}
      value={props.imageryStyle}
    >
      {options}
    </select>
  );
};
