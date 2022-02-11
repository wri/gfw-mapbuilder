import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { countryList } from './countryList';
import { Select } from '@material-ui/core';
import { editProfileTranslations } from '../../../../configs/translations/staticOptions';

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
  formErrors: any;
  activeCountryCallback: (e: any) => void;
  defaultCountry: string | undefined;
  countryLabel: string;
  register: any;
  required: any;
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
        {...props.register('aoiCountry' || 'country', { required: true })}
        native
        variant="outlined"
        className={clsx(selectClasses.root)}
        onChange={(e: any): void => props.activeCountryCallback(e.target.value)}
      >
        {countryItemsList}
      </Select>
      {props.formErrors.aoiCountry && <p className="input-error">{props.required}</p>}
    </div>
  );
};

export const MemoCountryPicker = React.memo(CountryPicker);
