import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Select } from '@material-ui/core';

type LanguageItem = { id: string; label: string };
const languageList: LanguageItem[] = [
  {
    id: 'en',
    label: 'English'
  },
  {
    id: 'zh',
    label: '中文'
  },
  {
    id: 'fr',
    label: 'Français'
  },
  {
    id: 'id',
    label: 'Bahasa Indonesia'
  },
  {
    id: 'pt_BR',
    label: 'Português (Brasil)'
  },
  {
    id: 'es_MX',
    label: 'Español (Mexico)'
  }
];

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

type LanguagePickerProps = {
  activeLanguageCallback: (e: any) => void;
  defaultValue: string;
};

const LanguagePicker = (props: LanguagePickerProps) => {
  const selectClasses = useSelectStyles();
  const menuItems = useMenuItemStyles();

  const countryItemsList = languageList.map(
    (languageItem: LanguageItem, i: number) => {
      return (
        <option
          className={clsx(selectClasses.root, menuItems.root)}
          key={i}
          value={languageItem.id}
        >
          {languageItem.label}
        </option>
      );
    }
  );

  return (
    <div className="form-section" style={{ marginTop: '5px' }}>
      <Select
        native
        variant="outlined"
        value={props.defaultValue}
        className={clsx(selectClasses.root)}
        onChange={(e: any): void =>
          props.activeLanguageCallback(e.target.value)
        }
      >
        {countryItemsList}
      </Select>
    </div>
  );
};

export const MemoLanguagePicker = React.memo(LanguagePicker);
