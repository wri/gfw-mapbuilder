import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRenderPopup } from '../../../js/store/appState/actions';
import { RootState } from '../../../js/store';

import '../../../css/popup.scss';
import { mapController } from '../../../js/controllers/mapController';

const UserPointPopup = (): JSX.Element | null => {
  const dispatch = useDispatch();

  const userCoordinates = useSelector(
    (state: RootState) => state.mapviewState.userCoordinates
  );

  const latitude = userCoordinates?.latitude.toFixed(2);
  const longitude = userCoordinates?.longitude.toFixed(2);

  const renderPopup = useSelector(
    (state: RootState) => state.appState.renderPopup
  );

  function handlePopupClose(): void {
    dispatch(setRenderPopup(!renderPopup));
    mapController.detachMouseLocationTracking();
  }

  return renderPopup ? (
    <div className="user-point-popup-wrapper">
      <button onClick={handlePopupClose}>X</button>
      <div className="content-wrapper">
        <p className="header">Coordinate Values</p>
        <p>(Decimal degrees)</p>
        {latitude && <p>Latitude: {latitude}</p>}
        {longitude && <p>Longitude: {longitude}</p>}
      </div>
    </div>
  ) : null;
};

export default UserPointPopup;
