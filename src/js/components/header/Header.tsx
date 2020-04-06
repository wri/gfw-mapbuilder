import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LanguageDropdown from 'js/components/header/LanguageDropdown';
import GFWLogin from 'js/components/header/GFWLogin';

import { RootState } from 'js/store/index';
import { setRenderGFWDropdown } from 'js/store/appState/actions';

import 'css/header.scss';

// import config from '../../../../configs/resources';

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
    includeMyGFWLogin
  } = useSelector((store: RootState) => store.appSettings);

  const { selectedLanguage, isLoggedIn, renderGFWDropdown } = useSelector(
    (store: RootState) => store.appState
  );

  const closeGFWDropdown = () => {
    if (renderGFWDropdown) {
      dispatch(setRenderGFWDropdown(false));
    }
  };

  return (
    <div className="header-container" onClick={() => closeGFWDropdown()}>
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
