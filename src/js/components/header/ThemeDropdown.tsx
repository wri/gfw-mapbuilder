import React from 'react';
import { ThemeIcon } from '../../../images/themeIcon';
import { headerContent } from '../../../../configs/translations/header.translations';
import { RootState } from '../../../js/store/index';
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

  //@ts-ignore
  const baseURL = new URL(window.location);
  const pathName = baseURL.pathname.length === 0 ? '' : baseURL.pathname;
  const shareURLBase = baseURL.origin + pathName;
  const options = props.mapThemeIds.map((id: string, index: number) => {
    return (
      <li
        key={index}
        role="button"
        aria-labelledby="dropdown-label"
        id={`dropdown__selected label_${index}`}
        tabIndex={0}
        onClick={(): void => handleThemeSelection(id)}
        className={activeTheme === id ? 'selected' : ''}
      >
        <a
          target={target}
          style={{ textDecoration: 'none', color: 'inherit' }}
          href={`${shareURLBase}?appid=${id}&l=${props.selectedLanguage}`}
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
        <span className="label-wrapper" role="listitem">
          <ThemeIcon height={16} width={16} fill={'#555'} />
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
