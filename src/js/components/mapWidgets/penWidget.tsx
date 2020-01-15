import React, { FunctionComponent, useState } from 'react';

import { ReactComponent as PenIcon } from '../../../images/penIcon.svg';

const PenWidget: FunctionComponent = () => {
  const [penARIA, setPenARIA] = useState(false);

  const setPen = () => {
    setPenARIA(!penARIA);
    // TODO - onClick, dispatch to actionCreator to render Modal
  };

  return (
    <>
      <div className="widget-container">
        <button
          className="image-wrapper"
          role="button"
          aria-pressed={penARIA}
          onClick={() => setPen()}
        >
          <PenIcon height={25} width={25} fill={'#555'} />
        </button>
      </div>
    </>
  );
};

export default PenWidget;
