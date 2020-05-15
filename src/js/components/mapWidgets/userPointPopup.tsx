import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setRenderPopup } from 'js/store/appState/actions';

import { RootState } from 'js/store';

import 'css/popup.scss';

interface Coordinates {
  latitude: string;
  longitude: string;
}

const UserPointPopup = (): JSX.Element | null => {
  const dispatch = useDispatch();
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  const userCoordinates = useSelector(
    (state: RootState) => state.mapviewState.userCoordinates
  );
  const renderPopup = useSelector(
    (state: RootState) => state.appState.renderPopup
  );

  useEffect(() => {
    if (renderPopup && userCoordinates) {
      const latitude = userCoordinates.latitude.toFixed(2);
      const longitude = userCoordinates.longitude.toFixed(2);

      setCoordinates({
        latitude,
        longitude
      });
    } else {
      setCoordinates(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderPopup, userCoordinates]);

  return renderPopup ? (
    <div className="user-point-popup-wrapper">
      <button onClick={(): any => dispatch(setRenderPopup(!renderPopup))}>
        X
      </button>
      <div className="content-wrapper">
        <p className="header">Coordinate Values</p>
        <p>(Decimal degrees)</p>
        {coordinates && coordinates.latitude && (
          <p>Latitude: {coordinates.latitude}</p>
        )}
        {coordinates && coordinates.longitude && (
          <p>Longitude: {coordinates.longitude}</p>
        )}
      </div>
    </div>
  ) : null;
};

export default UserPointPopup;
