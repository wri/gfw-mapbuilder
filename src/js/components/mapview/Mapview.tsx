import * as React from 'react';
import { useRef, useEffect } from 'react';
import { mapController } from '../../../js/controllers/mapController';
import { useSelector } from 'react-redux';
import { RootState } from '../../../js/store/index';
import styled from 'styled-components';

const Mapview: React.FunctionComponent = () => {
  const mapElementRef = useRef(null);

  const esriPopup = useSelector(
    (store: RootState) => store.appSettings.esriPopup
  );

  const PopupWrapper = styled.div`
    .esri-popup {
      display: ${!esriPopup ? 'none !important' : ''};
    }
  `;

  useEffect(() => {
    mapController.initializeMap(mapElementRef);
  }, []);

  return (
    <PopupWrapper>
      <div className="mapview-container">
        <div className="mapview" ref={mapElementRef}></div>
      </div>
    </PopupWrapper>
  );
};

export default Mapview;
