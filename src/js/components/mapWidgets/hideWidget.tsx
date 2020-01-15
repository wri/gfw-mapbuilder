import React, { FunctionComponent, useState } from 'react';

import { ReactComponent as HideIcon } from '../../../images/hideIcon.svg';

const HideWidget: FunctionComponent = () => {
  const [hideARIA, setHideARIA] = useState(false);

  const setHide = () => {
    setHideARIA(!hideARIA);
    // TODO - onClick, dispatch to actionCreator to hide all widgets
  };

  return (
    <>
      <div className="widget-container">
        <button
          className="image-wrapper"
          role="button"
          aria-pressed={hideARIA}
          onClick={() => setHide()}
        >
          <HideIcon height={25} width={25} fill={'#555'} />
        </button>
      </div>
    </>
  );
};

export default HideWidget;
