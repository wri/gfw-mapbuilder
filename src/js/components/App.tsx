import * as React from 'react';
import { useState, useEffect } from 'react';
import MapContent from './MapContent';
import Header from './header/Header';
import ModalCard from './modal/modalCard';
import { RootState } from 'js/store/index';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'js/components/sharedComponents/Loader';
import { overwriteSettings } from 'js/store/appSettings/actions';
import { setLoggedIn, setLanguage } from 'js/store/appState/actions';
import { AppSettings } from 'js/store/appSettings/types';
import cameroon from '../../../configs/countryConfigs/cameroon';

import 'arcgis-js-api/themes/light/main.scss';
import 'css/index.scss';

const MapSpinner = (): React.ReactElement => (
  <Loader
    containerPositionStyling={{ position: 'absolute', top: '40%', left: '50%' }}
    color={'#cfcdcd'}
    size={100}
  />
);

const App = (props: AppSettings | any): JSX.Element => {
  //Listen to map loading state that comes from mapController via redux store change
  const isMapReady = useSelector(
    (store: RootState) => store.mapviewState.isMapReady
  );
  const hideHeader = useSelector(
    (store: RootState) => store.appSettings.hideHeader
  );
  //INIT with global spinner set to true
  const [showGlobalSpinner, setShowGlobalSpinner] = useState(true);
  const dispatch = useDispatch();

  //Check for Report param in the URL (if that exists, we render a report view instead of our full scale application
  const reportParam = new URL(window.location.href).searchParams.get('report');
  let reportView;
  if (reportParam) {
    reportView = reportParam === 'true';
  } else {
    reportView = false;
  }

  useEffect(() => {
    //TODO: Need to deal with the scenario of APPID!
    //Determine which resources we are reading from
    //Read our local resources.js file And any external library resources (which are prioritized)
    dispatch(overwriteSettings({ ...cameroon, ...props }));
    //Check URL for language param which comes in after user shares the application.
    const langFromURL = new URL(window.location.href).searchParams.get('lang');
    if (langFromURL) {
      dispatch(setLanguage(langFromURL));
    } else {
      //just set default lang
      dispatch(setLanguage(cameroon.language));
    }
    setShowGlobalSpinner(false);
  }, [dispatch, props]); //dispatch should never update and this useEffect should fire only once, adding per eslint rule warning

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
        <MapSpinner />
      ) : (
        <>
          {!reportView && !hideHeader && <Header />}
          <MapContent report={reportView} />
          {modalType !== '' && <ModalCard />}
        </>
      )}
    </>
  );
};

export default App;
