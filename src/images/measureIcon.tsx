import React from 'react';

export const MeasureIcon = (props: any) => {
  return (
    <svg {...props} className="svg-icon">
      <svg id="icon-measure" viewBox="0 0 11 25">
        <title>Measure</title>
        <path fill="#555" d="M10 1v23H1V1h9m1-1H0v25h11V0z"></path>
        <path fill="#555" d="M10 3.999H5v1h5v-1z"></path>
        <g fill="#555">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.476 8.475h3.579v.048H6.476z"
          ></path>
          <path d="M10.531 7.999H6v1h4.531v-1z"></path>
        </g>
        <path fill="#555" d="M10 11.999H5v1h5v-1z"></path>
        <g fill="#555">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.476 16.475h3.579v.048H6.476z"
          ></path>
          <path d="M10.531 15.999H6v1h4.531v-1z"></path>
        </g>
        <path fill="#555" d="M10 19.999H5v1h5v-1z"></path>
      </svg>
    </svg>
  );
};
