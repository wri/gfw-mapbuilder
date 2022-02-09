import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { countryList } from './countryList';
import { Select } from '@material-ui/core';

const useSelectStyles = makeStyles({
  root: {
    borderRadius: '4px',
    color: '#555',
    height: '2.2rem',
    padding: '0',
    fontSize: '0.8rem',
    width: '100%'
  }
});

const useMenuItemStyles = makeStyles({
  root: {
    paddingLeft: '10px'
  }
});

type CountryPickerProps = {
  activeCountryCallback: (e: any) => void;
  defaultCountry: string | undefined;
  countryLabel: string;
};

const CountryPicker = (props: CountryPickerProps) => {
  const selectClasses = useSelectStyles();
  const menuItems = useMenuItemStyles();
  const defaultCountry = props.defaultCountry ? props.defaultCountry : '';

  const countryItemsList = Object.keys(countryList).map((iso: string, i: number) => {
    return (
      <option
        selected={defaultCountry === iso}
        className={clsx(selectClasses.root, menuItems.root)}
        key={i}
        value={iso}
      >
        {countryList[iso]}
      </option>
    );
  });

  return (
    <div className="form-section">
      <p className="input-label">{props.countryLabel} *</p>
      <Select
        native
        variant="outlined"
        className={clsx(selectClasses.root)}
        onChange={(e: any): void => props.activeCountryCallback(e.target.value)}
      >
        {countryItemsList}
      </Select>
    </div>
  );
};

export const MemoCountryPicker = React.memo(CountryPicker);
