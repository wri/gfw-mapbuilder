import React, { FunctionComponent } from 'react';
import { mapController } from '../../controllers/mapController';

import { ZoomOutIcon } from '../../../images/zoomOut';
import { ZoomInIcon } from '../../../images/zoomIn';

const ZoomWidget: FunctionComponent = () => {
  return (
    <>
      <div className="widget-container">
        <button
          className="image-wrapper"
          aria-label="zoom out"
          aria-pressed={undefined}
          onClick={() => mapController.zoomInOrOut({ zoomIn: false })}
        >
          <ZoomOutIcon height={25} width={25} fill={'#555'} />
        </button>
      </div>
      <div className="widget-container">
        <button
          className="image-wrapper"
          aria-label="zoom in"
          aria-pressed={undefined}
          onClick={() => mapController.zoomInOrOut({ zoomIn: true })}
        >
          <ZoomInIcon height={25} width={25} fill={'#555'} />
        </button>
      </div>
    </>
  );
};

export default ZoomWidget;
