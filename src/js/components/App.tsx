import * as React from 'react';
import { useSelector } from 'react-redux';
import { Mapview } from './mapview/Mapview';
import 'arcgis-js-api/themes/light/main.scss';
import '../../css/index.scss';

export function App() {
  const isMapReady = useSelector((store: any) => store.mapviewState.isMapReady);
  const loadError = useSelector((store: any) => store.mapviewState.loadError);
  return (
    <>
      <div>
        {isMapReady ? 'Ready!' : 'Loading'}
        {loadError ? 'Error!' : 'No error!'}
      </div>
      <Mapview />
    </>
  );
}
