import * as React from 'react';
import { useRef, useEffect } from 'react';
import { mapController } from 'js/controllers/mapController';
import { useDispatch } from 'react-redux';
import { overwriteSettings } from 'js/store/appSettings/actions';

import '../../../css/mapWidgets.scss';

const Mapview: React.FunctionComponent = () => {
  const mapElementRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    mapController.initializeMap(mapElementRef);
  }, []);
  dispatch(overwriteSettings({ title: 'New Title' }));

  return (
    <div className="mapview-container">
      <div className="mapview" ref={mapElementRef}></div>
    </div>
  );
};

export default Mapview;
