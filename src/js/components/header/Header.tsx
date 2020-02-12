import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store/index';
import LanguageDropdown from 'js/components/header/LanguageDropdown';
import GFWLogin from 'js/components/header/GFWLogin';

import 'css/header.scss';

const Header: FunctionComponent = () => {
  const settings = useSelector((store: RootState) => store.appSettings);

  const appState = useSelector((store: RootState) => store.appState);

  const {
    language,
    title,
    subtitle,
    logoUrl,
    logoLinkUrl,
    useAlternativeLanguage,
    alternativeWebmap,
    alternativeLanguage,
    includeMyGFWLogin
  } = settings;
  const { selectedLanguage } = appState;

  return (
    <div className="header-container">
      <div className="title-container">
        <a
          href={logoLinkUrl}
          target="_blank"
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
          <h1>{title.toUpperCase()}</h1>
          <h2>{subtitle}</h2>
        </div>
      </div>
      {useAlternativeLanguage && alternativeWebmap && alternativeLanguage && (
        <LanguageDropdown
          language={language}
          alternativeLanguage={alternativeLanguage}
          selectedLanguage={selectedLanguage}
        />
      )}
      {includeMyGFWLogin && (
        <GFWLogin
          language={language}
          alternativeLanguage={alternativeLanguage}
          selectedLanguage={selectedLanguage}
        />
      )}
    </div>
  );
};

export default Header;
