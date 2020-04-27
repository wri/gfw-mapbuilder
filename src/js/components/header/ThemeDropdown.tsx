import React from 'react';
import { ReactComponent as ThemesIcon } from 'src/images/themesIcon.svg';
import { headerContent } from './header.translations';
import { RootState } from 'js/store/index';
import { useSelector } from 'react-redux';
interface ThemeDropdownProps {
  selectedLanguage: string;
  alternativeLanguage: string;
  mapThemes: string[];
  mapThemeIds: string[];
  alternativeMapThemes: string[];
}

const ThemeDropdown = (props: ThemeDropdownProps): JSX.Element => {
  const [activeTheme, setActiveTheme] = React.useState('');

  const navLinksInNewTab = useSelector(
    (store: RootState) => store.appSettings.navLinksInNewTab
  );
  const target = navLinksInNewTab ? '_blank' : '_self';

  function handleThemeSelection(themeID: string): void {
    console.log(themeID);
    setActiveTheme(themeID);
  }

  const themeMap = props.mapThemeIds.map((id: string, index: number) => {
    return {
      title: props.mapThemes[index],
      alternativeTitle: props.alternativeMapThemes[index],
      id: props.mapThemeIds[index]
    };
  });

  const options = props.mapThemeIds.map((id: string, index: number) => {
    return (
      <li
        key={index}
        role="button"
        aria-labelledby="dropdown-label"
        id="dropdown__selected"
        tabIndex={0}
        onClick={(): void => handleThemeSelection(id)}
        className={activeTheme === id ? 'selected' : ''}
      >
        <a
          target={target}
          href={`${window.location.origin}/?appid=${id}&l=${props.selectedLanguage}`}
        >
          {props.selectedLanguage === props.alternativeLanguage
            ? themeMap[index].alternativeTitle
            : themeMap[index].title}
        </a>
      </li>
    );
  });
  return (
    <div className="theme-dropdown-container">
      <ul className="dropdown">
        <span className="label-wrapper">
          <ThemesIcon height={16} width={16} fill={'#555'} />
          <li className="dropdown-label">
            {headerContent[props.selectedLanguage]?.mapThemes}
          </li>
        </span>
        <ul className="options">{options}</ul>
      </ul>
    </div>
  );
};

export default ThemeDropdown;
