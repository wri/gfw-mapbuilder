import React from 'react';
import './Banner.scss';
import { bannerContent } from '../../../../configs/translations/header.translations';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Banner = () => {
  const selectedLanguage = useSelector((store: RootState) => store.appState.selectedLanguage);
  console.log(bannerContent);
  console.log(selectedLanguage);
  console.log(bannerContent[selectedLanguage].text);
  return (
    <div className="banner">
      <h1 className="banner__text__title">
        {bannerContent[selectedLanguage].text}{' '}
        <a href={'http://mapbuilder.wri.org/tutorials/tml-to-tcc'} className="banner__text__link">
          {bannerContent[selectedLanguage].linkUrlText}
        </a>
      </h1>
    </div>
  );
};

export default Banner;
