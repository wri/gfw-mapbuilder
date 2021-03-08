import React from 'react';

export const InfoIcon = (props: any) => {
  return (
    <svg
      {...props}
      className="svg-icon report-header__icon report-header__icon-info"
    >
      <svg {...props} id="shape-info" viewBox="0 0 16 32">
        <title>Report Info</title>
        <path d="M2 16c1.105 0 2 0.895 2 2v8c0 1.105-0.895 2-2 2h-2v4h16v-4h-1.992c-1.102 0-2.008-0.895-2.008-2l-0.004-14h-11.996v4h2zM4 4c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4s-4-1.791-4-4z"></path>
      </svg>
    </svg>
  );
};
