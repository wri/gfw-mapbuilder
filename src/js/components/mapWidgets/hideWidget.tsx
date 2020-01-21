import React, { FunctionComponent } from 'react';

import { ReactComponent as HideIcon } from '../../../images/hideIcon.svg';

const HideWidget: FunctionComponent = () => {
  // TODO connect to Redux to toggle leftPanel and Legend

  return (
    <>
      <div className="widget-container">
        <button
          className="image-wrapper"
          onClick={() => console.log('hide legend and left panel!')}
        >
          <HideIcon height={25} width={25} fill={'#555'} />
        </button>
      </div>
    </>
  );
};

export default HideWidget;
