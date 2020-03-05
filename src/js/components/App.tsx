import * as React from 'react';
import { useState, useEffect } from 'react';
import MapContent from './MapContent';
import Header from './header/Header';
import ModalCard from './modal/modalCard';
import { RootState } from 'js/store/index';
import { useSelector, useDispatch } from 'react-redux';

import 'arcgis-js-api/themes/light/main.scss';
import 'css/index.scss';
import cameroon from '../../../configs/cameroon';
import { overwriteSettings } from 'js/store/appSettings/actions';
import { setLoggedIn } from 'js/store/appState/actions';
import { AppSettings } from 'js/store/appSettings/types';

//TODO: SPinners should be SVGs in images/ folder that get imported
const GlobalSpinner = (): React.ReactElement => <h4>App Loading...</h4>;
const MapSpinner = (): React.ReactElement => (
  <h4 style={{ position: 'absolute', top: '50%', left: '50%' }}>
    Map is Loading...
  </h4>
);
// const ErrorScreen = (): React.ReactElement => <h4>Map Loading Error</h4>;

const App = (props: AppSettings | any): JSX.Element => {
  //Listen to map loading state that comes from mapController via redux store change
  const isMapReady = useSelector(
    (store: RootState) => store.mapviewState.isMapReady
  );
  //INIT with global spinner set to true
  const [showGlobalSpinner, setShowGlobalSpinner] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    //TODO: Need to deal with the scenario of APPID!
    //Determine which resources we are reading from
    //Read our local resources.js file And any external library resources (which are prioritized)
    dispatch(overwriteSettings({ ...cameroon, ...props }));
    //Send that to our redux appSettings overwriting whatever is there
    setShowGlobalSpinner(false);
  }, [dispatch]); //dispatch should never update and this useEffect should fire only once, adding per eslint rule warning

  const modalType = useSelector(
    (store: RootState) => store.appState.renderModal
  );

  useEffect(() => {
    fetch('https://production-api.globalforestwatch.org/auth/check-logged', {
      credentials: 'include'
    })
      .then(response => {
        const hasError = response.status !== 200;
        response.json().then(() => {
          if (hasError) {
            console.error('Login Failed, User is currently not logged in');
            return;
          }
          dispatch(setLoggedIn(true));
        });
      })
      .catch(e => console.error(e));
  }, [dispatch]);

  return (
    <>
      {showGlobalSpinner ? (
        <GlobalSpinner />
      ) : (
        <>
          <Header />
          <MapContent />
          {!isMapReady && <MapSpinner />}
          {modalType !== '' && <ModalCard />}
        </>
      )}
    </>
  );
};

export default App;
