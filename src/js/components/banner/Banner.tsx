import React from 'react';
import './Banner.scss';
import { bannerContent } from '../../../../configs/translations/header.translations';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

// If you want eanble the banner, you need to update ./Banner.scss
const Banner = () => {
  const selectedLanguage = useSelector((store: RootState) => store.appState.selectedLanguage);
  return (
    <div className="banner">
      <h1 className="banner__text__title">
        {bannerContent[selectedLanguage].text}{' '}
        <a
          href={'http://mapbuilder.wri.org/tutorials/tml-to-tcc'}
          rel="noreferrer"
          className="banner__text__link"
          target="_blank"
        >
          {bannerContent[selectedLanguage].linkUrlText}
        </a>
      </h1>
    </div>
  );
};

export default Banner;
