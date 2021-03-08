import * as React from 'react';
import { useRef, useEffect } from 'react';
import { mapController } from '../../../js/controllers/mapController';

const Mapview: React.FunctionComponent = () => {
  const mapElementRef = useRef(null);

  useEffect(() => {
    mapController.initializeMap(mapElementRef);
  }, []);

  return (
    <div className="mapview-container">
      <div className="mapview" ref={mapElementRef}></div>
    </div>
  );
};

export default Mapview;
