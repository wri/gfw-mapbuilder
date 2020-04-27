import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LanguageDropdown from 'js/components/header/LanguageDropdown';
import ThemeDropdown from 'js/components/header/ThemeDropdown';
import GFWLogin from 'js/components/header/GFWLogin';

import { RootState } from 'js/store/index';
import { setRenderGFWDropdown } from 'js/store/appState/actions';

import 'css/header.scss';
import { createSelector } from 'reselect';

const appSettingsSelector = createSelector(
  (state: RootState) => state.appSettings,
  appSettings => ({
    language: appSettings.language,
    title: appSettings.title,
    subtitle: appSettings.subtitle,
    logoUrl: appSettings.logoUrl,
    logoLinkUrl: appSettings.logoLinkUrl,
    useAlternativeLanguage: appSettings.useAlternativeLanguage,
    alternativeWebmap: appSettings.alternativeWebmap,
    alternativeLanguage: appSettings.alternativeLanguage,
    includeMyGFWLogin: appSettings.includeMyGFWLogin,
    alternativeLanguageTitle: appSettings.alternativeLanguageTitle,
    alternativeLanguageSubtitle: appSettings.alternativeLanguageSubtitle
  })
);

const Header: FunctionComponent = () => {
  const dispatch = useDispatch();
  const {
    language,
    title,
    subtitle,
    logoUrl,
    logoLinkUrl,
    useAlternativeLanguage,
    alternativeWebmap,
    alternativeLanguage,
    includeMyGFWLogin,
    alternativeLanguageTitle,
    alternativeLanguageSubtitle
  } = useSelector(appSettingsSelector);

  const selectedLanguage = useSelector(
    (store: RootState) => store.appState.selectedLanguage
  );

  const isLoggedIn = useSelector(
    (store: RootState) => store.appState.isLoggedIn
  );

  const renderGFWDropdown = useSelector(
    (store: RootState) => store.appState.renderGFWDropdown
  );

  const navLinksInNewTab = useSelector(
    (store: RootState) => store.appSettings.navLinksInNewTab
  );

  const closeGFWDropdown = () => {
    if (renderGFWDropdown) {
      dispatch(setRenderGFWDropdown(false));
    }
  };

  const target = navLinksInNewTab ? '_blank' : '_self';
  const appTitle =
    selectedLanguage === language ? title : alternativeLanguageTitle;
  const appSubtitle =
    selectedLanguage === language ? subtitle : alternativeLanguageSubtitle;

  return (
    <div className="header-container" onClick={() => closeGFWDropdown()}>
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
      </div>
      <div className="selectors-container">
        <ThemeDropdown />
        {useAlternativeLanguage && alternativeWebmap && alternativeLanguage && (
          <LanguageDropdown
            language={language}
            alternativeLanguage={alternativeLanguage}
            selectedLanguage={selectedLanguage}
          />
        )}
        {includeMyGFWLogin && <GFWLogin loggedIn={isLoggedIn} />}
      </div>
    </div>
  );
};

export default Header;
