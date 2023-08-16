import React from 'react';
import './Banner.scss';
const Banner = () => {
  return (
    <div className="banner">
      <h1 className="banner__text__title">
        Trees in Mosaic Landscape dataset will be deprecated as of Aug 2024. Please update your configurations by going
        to <a href="https://mapbuilder.wri.org/">https://mapbuilder.wri.org/</a>.
      </h1>
    </div>
  );
};

export default Banner;
