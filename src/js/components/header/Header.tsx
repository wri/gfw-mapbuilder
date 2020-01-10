import React, { FunctionComponent } from 'react';

import { LanguageDropdown } from '../../components/header/LanguageDropdown';

import config from '../../../../configs/resources';

import '../../../css/header.scss';

export const Header: FunctionComponent = () => {
  const { title, subtitle, logoUrl, logoLinkUrl } = config;

  return (
    <div className="header-container">
      <div className="title-container">
        <a href={logoLinkUrl} target="_blank" tabIndex={0}>
          <img
            src={logoUrl}
            alt="image of Global Forest Watch logo"
            className="gfw-logo"
          />
        </a>
        <h1>{title.toUpperCase()}</h1>
        <h2>{subtitle}</h2>
      </div>
      <LanguageDropdown />
    </div>
  );
};
