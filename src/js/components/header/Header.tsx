import React, { FunctionComponent } from 'react';

import LanguageDropdown from '../../components/header/LanguageDropdown';

import config from '../../../../configs/resources';

import '../../../css/header.scss';

const Header: FunctionComponent = () => {
  const { title, subtitle, logoUrl, logoLinkUrl } = config;

  return (
    <div className="header-container">
      <div className="title-container">
        <a href={logoLinkUrl} target="_blank" rel="noreferrer" tabIndex={0}>
          <img
            src={logoUrl}
            alt="image of Global Forest Watch logo"
            className="gfw-logo"
          />
        </a>
        <div className="titles">
          <h1>{title.toUpperCase()}</h1>
          <h2>{subtitle}</h2>
        </div>
      </div>
      <LanguageDropdown />
    </div>
  );
};

export default Header;
