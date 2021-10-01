import React from 'react';

export const OpacityIcon = (props: any) => {
  return (
    <svg {...props} className="svg-icon report-header__icon report-header__icon-info">
      <svg {...props} id="shape-info" viewBox="0 0 24 24">
        <title>Opacity Control</title>
        <path d="M12 3.1L7.05 8.05a7 7 0 1 0 9.9 0L12 3.1zm0-2.828l6.364 6.364a9 9 0 1 1-12.728 0L12 .272zM12 18V8a5 5 0 0 1 0 10z" />
      </svg>
    </svg>
  );
};
