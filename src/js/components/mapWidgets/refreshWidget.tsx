import React, { FunctionComponent } from 'react';

import { ReactComponent as RefreshIcon } from '../../../images/refreshIcon.svg';

const RefreshWidget: FunctionComponent = () => {
  // const [openWidget, setOpenWidget] = useState(false);
  // ? should aria-pressed be maintained via Redux state, or local component state?

  return (
    <>
      <div className="widget-container">
        <button
          className="image-wrapper"
          role="button"
          aria-pressed={true} //openWidget goes here
          onClick={() => console.log('Redux goes here!')}
        >
          <RefreshIcon height={25} width={25} fill={'#555'} />
        </button>
      </div>
    </>
  );
};

export default RefreshWidget;