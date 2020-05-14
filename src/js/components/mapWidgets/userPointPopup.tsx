import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setRenderPopup } from 'js/store/appState/actions';

import { RootState } from 'js/store';

const UserPointPopup = (): JSX.Element | null => {
  const dispatch = useDispatch();
  const [coordinates, setCoordinates] = useState<__esri.Point | null>(null);

  const userCoordinates = useSelector(
    (state: RootState) => state.mapviewState.userCoordinates
  );
  const renderPopup = useSelector(
    (state: RootState) => state.appState.renderPopup
  );

  useEffect(() => {
    if (userCoordinates) {
      setCoordinates(userCoordinates);
    } else {
      setCoordinates(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCoordinates]);

  console.log('userCoordinates', userCoordinates);

  return renderPopup ? (
    <div
      className="user-point-popup-wrapper"
      style={{
        position: 'absolute',
        float: 'left',
        width: '15rem',
        height: '10rem',
        backgroundColor: 'rgb(255,254,229)',
        top: '50%',
        left: '35%',
        transform: 'translateX(-50%) translateY(-50%)'
      }}
    >
      <button onClick={(): any => dispatch(setRenderPopup(!renderPopup))}>
        X
      </button>
      <p>Coordinate Values</p>
      <p>Decimal degrees</p>
      {coordinates && coordinates.latitude && (
        <p>Latitude: {coordinates.latitude}</p>
      )}
      {coordinates && coordinates.longitude && (
        <p>Longitude: {coordinates.longitude}</p>
      )}
    </div>
  ) : null;
};

export default UserPointPopup;
