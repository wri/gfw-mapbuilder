import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setRenderPopup } from 'js/store/appState/actions';

import { RootState } from 'js/store';

import 'css/popup.scss';

const UserPointPopup = (): JSX.Element | null => {
  const dispatch = useDispatch();
  const [coordinates, setCoordinates] = useState<any | null>(null);

  const userCoordinates = useSelector(
    (state: RootState) => state.mapviewState.userCoordinates
  );
  const renderPopup = useSelector(
    (state: RootState) => state.appState.renderPopup
  );

  useEffect(() => {
    if (renderPopup && userCoordinates) {
      const latitude = (userCoordinates as any).latitude
        .toString()
        .match(/^-?\d+(?:\.\d{0,2})?/)[0];

      const longitude = (userCoordinates as any).longitude
        .toString()
        .match(/^-?\d+(?:\.\d{0,2})?/)[0];
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
