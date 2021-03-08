import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import LanguageDropdown from '../../../js/components/header/LanguageDropdown';
import { RootState } from '../../../js/store/index';
import { headerContent } from '../../../../configs/translations/header.translations';
import GFWLoginOptions from '../../../js/components/mapWidgets/widgetContent/GFWLoginOptions';

import '../../../css/leftpanel.scss';

const MenuTabView = (props: any): JSX.Element => {
  const [renderMyGFWOptions, setRenderMyGFWOptions] = useState(false);
  const logoLinkUrl = useSelector(
    (store: RootState) => store.appSettings.logoLinkUrl
  );
  const navLinksInNewTab = useSelector(
    (store: RootState) => store.appSettings.navLinksInNewTab
  );
  const logoUrl = useSelector((store: RootState) => store.appSettings.logoUrl);
  const selectedLanguage = useSelector(
    (store: RootState) => store.appState.selectedLanguage
  );

  const alternativeLanguage = useSelector(
    (store: RootState) => store.appSettings.alternativeLanguage
  );
  const language = useSelector(
    (store: RootState) => store.appSettings.language
  );
  const title = useSelector((store: RootState) => store.appSettings.title);
  const subtitle = useSelector(
    (store: RootState) => store.appSettings.subtitle
  );
  const alternativeLanguageTitle = useSelector(
    (store: RootState) => store.appSettings.alternativeLanguageTitle
  );
  const alternativeLanguageSubtitle = useSelector(
    (store: RootState) => store.appSettings.alternativeLanguageSubtitle
  );

  const aboutLinkUrl = useSelector(
    (store: RootState) => store.appSettings.aboutLinkUrl
  );

  const tabViewVisible = useSelector(
    (store: RootState) => store.appState.leftPanel.tabViewVisible
  );

  const activeTab = useSelector(
    (store: RootState) => store.appState.leftPanel.activeTab
  );

  const target = navLinksInNewTab ? '_blank' : '_self';

  const appTitle =
    selectedLanguage === language ? title : alternativeLanguageTitle;
  const appSubtitle =
    selectedLanguage === language ? subtitle : alternativeLanguageSubtitle;

  const tabViewIsVisible = tabViewVisible && activeTab === props.label;

  const mapThemeIds = useSelector(
    (store: RootState) => store.appSettings.mapThemeIds
  );

  const mapThemes = useSelector(
    (store: RootState) => store.appSettings.mapThemes
  );
  const alternativeMapThemes = useSelector(
    (store: RootState) => store.appSettings.alternativeMapThemes
  );

  const downloadLinkUrl = useSelector(
    (store: RootState) => store.appSettings.downloadLinkUrl
  );

  const mapThemeArray = mapThemes?.split(';');
  const mapThemeIDArray = mapThemeIds?.split(';');
  const alternativeMapThemeArray = alternativeMapThemes?.split(';');
  const renderThemeDropdown =
    Boolean(mapThemes.length) &&
    mapThemeIDArray.length === mapThemeArray.length;

  const baseURL = new URL((window as any).location);
  const pathName = baseURL.pathname.length === 0 ? '' : baseURL.pathname;
  const shareURLBase = baseURL.origin + pathName;

  const themeMap = mapThemeIDArray.map((id: string, index: number) => {
    return {
      title: mapThemeArray[index],
      alternativeTitle: alternativeMapThemeArray[index],
      id: mapThemeIDArray[index]
    };
  });

  const themeOptions = mapThemeIDArray.map((id: string, index: number) => {
    return (
      <li key={index}>
        <a
          target={target}
          href={`${shareURLBase}?appid=${id}&l=${props.selectedLanguage}`}
        >
          Theme:{' '}
          {props.selectedLanguage === props.alternativeLanguage
            ? themeMap[index].alternativeTitle
            : themeMap[index].title}
        </a>
      </li>
    );
  });

  return (
    <>
      {tabViewIsVisible && (
        <div className="menu-container-wrapper">
          <div className="title-container">
            <a
              href={logoLinkUrl}
              target={target}
              rel="noopener noreferrer"
              tabIndex={0}
            >
              <img
                src={logoUrl}
                alt="Global Forest Watch logo"
                className="gfw-logo"
              />
            </a>
            <div className="titles">
              <h1>{appTitle.toUpperCase()}</h1>
              <h2>{appSubtitle}</h2>
            </div>

            <div className="menu-items">
              {aboutLinkUrl && (
                <li>
                  <a
                    className="header-link"
                    href={aboutLinkUrl}
                    target={target}
                    rel="noopener noreferrer"
                  >
                    {headerContent[selectedLanguage].about}
                  </a>
                </li>
              )}
              {downloadLinkUrl && (
                <li>
                  <a
                    className="header-link"
                    href={aboutLinkUrl}
                    target={target}
                    rel="noopener noreferrer"
                  >
                    {headerContent[selectedLanguage].download}
                  </a>
                </li>
              )}
              <li>
                <button
                  className="my-gfw"
                  onClick={(): void =>
                    setRenderMyGFWOptions(!renderMyGFWOptions)
                  }
                >
                  My GFW
                </button>
              </li>
              {renderMyGFWOptions && <GFWLoginOptions />}
              {themeOptions}
              <LanguageDropdown
                language={language}
                alternativeLanguage={alternativeLanguage}
                selectedLanguage={selectedLanguage}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuTabView;
