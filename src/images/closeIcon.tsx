import React from 'react';

export const CloseIcon = (props: any) => {
  return (
    <svg {...props} className="svg-icon">
      <svg id="icon-close" viewBox="0 0 25 25">
        <title>Close</title>
        <path
          className="path1"
          d="M 5 19 L 19 5 L 21 7 L 7 21 L 5 19 ZM 7 5 L 21 19 L 19 21 L 5 7 L 7 5 Z"
        ></path>
      </svg>
    </svg>
  );
};
