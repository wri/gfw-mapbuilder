import React, { FunctionComponent } from 'react';
import { RefreshIcon } from '../../../images/refreshIcon';

const RefreshWidget: FunctionComponent = () => {
  return (
    <>
      <div className="widget-container">
        <button className="image-wrapper" aria-label="refresh widget" onClick={() => window.location.reload()}>
          <RefreshIcon height={25} width={25} fill={'#555'} />
        </button>
      </div>
    </>
  );
};

export default RefreshWidget;
