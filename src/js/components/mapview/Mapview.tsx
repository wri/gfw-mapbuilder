import * as React from 'react';
import { useRef, useEffect } from 'react';
import { mapController } from '../../controllers/mapController';
import { useDispatch } from 'react-redux';
import { OVERWRITE_SETTINGS } from '../../store/appState/types';

export function Mapview() {
  const mapElementRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    mapController.initializeMap(mapElementRef);
  }, []);
  dispatch({
    type: OVERWRITE_SETTINGS,
    payload: { title: 'neww title!!', newProppp: 'fakeValue' }
  });

  return (
    <div className="mapview-container">
      <div className="mapview" ref={mapElementRef}></div>
    </div>
  );
}
