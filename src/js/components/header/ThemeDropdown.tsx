import React from 'react';
// import { mapController } from 'js/controllers/mapController';
import { ReactComponent as ThemesIcon } from 'src/images/themesIcon.svg';

interface DropProps {
  language?: string;
  alternativeLanguage?: string;
  selectedLanguage?: string;
}

const ThemeDropdown = (): JSX.Element => {
  return (
    <div className="theme-dropdown-container">
      <ul className="dropdown">
        <span className="label-wrapper">
          <ThemesIcon height={16} width={16} fill={'#555'} />
          <li className="dropdown-label">Themes select them</li>
        </span>
        <ul className="options">
          <li
            role="button"
            aria-labelledby="dropdown-label"
            id="dropdown__selected"
            tabIndex={0}
            onClick={(): void => console.log('a')}
            className={'selected'}
          >
            option1
          </li>
          <li
            role="button"
            aria-labelledby="dropdown-label"
            id="dropdown__selected"
            tabIndex={0}
            onClick={(): void => console.log('a')}
            className={''}
          >
            option2
          </li>
        </ul>
      </ul>
    </div>
  );
};

export default ThemeDropdown;
