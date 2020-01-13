import * as React from 'react';
import { useSelector } from 'react-redux';
import Mapview from './mapview/Mapview';
import { RootState } from '../store/index';
import 'arcgis-js-api/themes/light/main.scss';
import '../../css/index.scss';

const App = (): JSX.Element => {
  const isMapReady = useSelector(
    (store: RootState) => store.mapviewState.isMapReady
  );
  const loadError = useSelector(
    (store: RootState) => store.mapviewState.loadError
  );
  return (
    <>
      <div>
        {isMapReady ? 'Ready!' : 'Loading'}
        {loadError ? 'Error!' : 'No error!'}
      </div>
      <Mapview />
    </>
  );
};

export default App;
