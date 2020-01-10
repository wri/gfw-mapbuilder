import * as React from 'react';
import { useSelector } from 'react-redux';

import { Mapview } from './mapview/Mapview';
import Header from './header/Header';

import { mapController } from '../controllers/mapController';

import { MapviewStore } from '../store/mapview/types';

import 'arcgis-js-api/themes/light/main.scss';
import '../../css/index.scss';

function handleClick() {
  mapController.log();
}

export function App() {
  const isMapReady = useSelector((store: MapviewStore) => store.isMapReady);
  const loadError = useSelector((store: MapviewStore) => store.loadError);

  handleClick();
  return (
    <>
      {/* <div onClick={handleClick}>
        {isMapReady ? 'Ready!' : 'Loading'}
        {loadError ? 'Error!' : 'No error!'}
      </div> */}
      <Header />
      <Mapview />
    </>
  );
}
