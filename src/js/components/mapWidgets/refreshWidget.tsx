import React, { FunctionComponent, useState } from 'react';

import { ReactComponent as RefreshIcon } from '../../../images/refreshIcon.svg';

const RefreshWidget: FunctionComponent = () => {
  const [refreshARIA, setRefreshARIA] = useState(false);

  const setRefresh = () => {
    setRefreshARIA(!refreshARIA);
    window.location.reload();
  };

  return (
    <>
      <div className="widget-container">
        <button
          className="image-wrapper"
          role="button"
          aria-pressed={refreshARIA}
          onClick={() => setRefresh()}
        >
          <RefreshIcon height={25} width={25} fill={'#555'} />
        </button>
      </div>
    </>
  );
};

export default RefreshWidget;
