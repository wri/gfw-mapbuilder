import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store/index';
import LanguageDropdown from 'js/components/header/LanguageDropdown';
import GFWLogin from 'js/components/header/GFWLogin';

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
    alternativeLanguage,
    includeMyGFWLogin
  } = useSelector((store: RootState) => store.appSettings);

  const appState = useSelector((store: RootState) => store.appState);
  const { selectedLanguage, isLoggedIn } = appState;

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
      {includeMyGFWLogin && <GFWLogin loggedIn={isLoggedIn} />}
    </div>
  );
};

export default Header;
