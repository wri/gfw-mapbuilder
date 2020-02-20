import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store/index';
import LanguageDropdown from 'js/components/header/LanguageDropdown';

import 'css/header.scss';

// import config from '../../../../configs/resources';

const Header: FunctionComponent = () => {
  const {
    language,
    title,
    subtitle,
    logoUrl,
    logoLinkUrl,
    useAlternativeLanguage,
    alternativeWebmap,
    alternativeLanguage
  } = useSelector((store: RootState) => store.appSettings);

  const appState = useSelector((store: RootState) => store.appState);
  const selectedLanguage = appState.selectedLanguage;

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
    </div>
  );
};

export default Header;
