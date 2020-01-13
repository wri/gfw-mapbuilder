import * as React from 'react';

import MapContent from './MapContent';
import Header from './header/Header';
// import { RootState } from 'js/store/index';
// import { useSelector } from 'react-redux';

import 'arcgis-js-api/themes/light/main.scss';
import 'css/index.scss';

// const Loader = (): React.ReactElement => <h4>Map Loading...</h4>;

// const ErrorScreen = (): React.ReactElement => <h4>Map Loading Error</h4>;

const App = (): JSX.Element => {
  // const isMapReady = useSelector(
  //   (store: RootState) => store.mapviewState.isMapReady
  // );
  // const loadError = useSelector(
  //   (store: RootState) => store.mapviewState.loadError
  // );

  return (
    <>
      <Header />
      <MapContent />
    </>
  );
};

export default App;
