import React from 'react';
import './Banner.scss';
const Banner = () => {
  return (
    <div className="banner">
      <h1 className="banner__text__title">
        The Trees in Mosaic Landscapes dataset will be deprecated as of February 2024. Please use our new Tropical Tree
        Cover dataset instead. Find out more at{' '}
        <a href="http://mapbuilder.wri.org/tutorials/tml-to-tcc">Replacing Trees in Mosaic Landscapes - MapBuilder </a>
      </h1>
    </div>
  );
};

export default Banner;
