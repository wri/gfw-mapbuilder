import * as React from 'react';
import { useRef, useEffect } from 'react';
import { mapController } from '../../controllers/mapController';

export function Mapview() {
  const mapElementRef = useRef(null);
  useEffect(() => {
    mapController.initializeMap(mapElementRef);
  }, []);

  return (
    <div className="mapview-container">
      <div className="mapview" ref={mapElementRef}></div>
    </div>
  );
}
