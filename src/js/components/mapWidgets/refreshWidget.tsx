import React, { FunctionComponent } from 'react';

import { RefreshIcon } from '../../../images/refreshIcon';
//import { ReactComponent as RefreshIcon } from '../../../images/refreshIcon.svg';

const RefreshWidget: FunctionComponent = () => {
  return (
    <>
      <div className="widget-container">
        <button className="image-wrapper" aria-label="refresh widget" onClick={() => window.location.reload()}>
          <RefreshIcon height={25} width={25} fill={'#555'} />
          {/* <img src={RefreshIcon} style={{ width: 140 }} alt="planet-logo" /> */}
        </button>
      </div>
    </>
  );
};

export default RefreshWidget;
