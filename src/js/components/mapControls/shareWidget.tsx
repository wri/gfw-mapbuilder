import React, { FunctionComponent } from 'react';

import '../../../css/shareWidget';

const ShareWidget: FunctionComponent = () => {
  return (
    <div className="share-widget-container">
      <div className="image-wrapper">
        <svg className="svg-icon">
          <svg id="icon-share" viewBox="0 0 1024 1024">
            <title>Share</title>
            <path
              className="path1"
              d="M183.488 507.392c0 65.024 52.672 117.696 117.696 117.696 31.744 0 60.608-12.544 81.792-32.96l193.792 96.896c-0.576 4.736-0.96 9.6-0.96 14.528 0 65.024 52.672 117.696 117.696 117.696s117.696-52.672 117.696-117.696c0-65.024-52.672-117.696-117.696-117.696-31.744 0-60.48 12.544-81.6 32.96l-193.984-96.896c0.576-4.8 0.96-9.6 0.96-14.528s-0.384-9.728-0.96-14.528l193.792-96.896c21.184 20.416 50.048 32.96 81.792 32.96 65.024 0 117.696-52.672 117.696-117.696s-52.672-117.696-117.696-117.696c-65.024 0-117.696 52.672-117.696 117.696 0 4.928 0.384 9.792 0.96 14.528l-193.792 96.896c-21.184-20.416-50.048-32.96-81.792-32.96-65.024 0-117.696 52.672-117.696 117.696z"
            ></path>
          </svg>
        </svg>
      </div>
    </div>
  );
};

export default ShareWidget;
