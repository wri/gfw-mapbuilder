import * as React from 'react';
import { useState, useEffect } from 'react';
import MapContent from './MapContent';
import Header from './header/Header';
import ModalCard from './modal/modalCard';
import { RootState } from '../../js/store/index';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../js/components/sharedComponents/Loader';
import { overwriteSettings } from '../../js/store/appSettings/actions';
import { setLoggedIn } from '../../js/store/appState/actions';
import { AppSettings } from '../../js/store/appSettings/types';
import Portal from 'esri/portal/Portal';
import PortalItem from 'esri/portal/PortalItem';
import {
  checkForReportView,
  loadGoogleAnalytics,
  changeDefaultLanguage,
  attachCMSEventHandlers
} from '../helpers/appLoading';

//import resources from '../../../configs/resources';
import resources from '../../../configs/countryConfigs/cameroon';

import 'css/index.scss';

const App = (props: AppSettings | any): JSX.Element => {
  //Check for Report param in the URL (if that exists, we render a report view instead of our full scale application
  const reportView = checkForReportView();
  const [showGlobalSpinner, setShowGlobalSpinner] = useState(true);
  const dispatch = useDispatch();
  //Listen to map loading state that comes from mapController via redux store change
  const hideHeader = useSelector(
    (store: RootState) => store.appSettings.hideHeader
  );
  const sharinghost = useSelector(
    (store: RootState) => store.appSettings.sharinghost
  );
  const analyticsCode = useSelector(
    (store: RootState) => store.appSettings.analyticsCode
  );

  loadGoogleAnalytics(analyticsCode);

  useEffect(() => {
    const appID = new URL(window.location.href).searchParams.get('appid');
    if (appID) {
      // APPID existing on the URL indicates that mapbuilder is loaded using arcgis template and we need to fetch settings using that app id to overwrite our default settings
      const portalURL = sharinghost || 'https://www.arcgis.com';
      const portalA = new Portal({ url: portalURL });
      const portItem = new PortalItem({ id: appID, portal: portalA });
      portItem
        .fetchData('json')
        .then(res => {
          console.log(res);
          const { values } = res;
          dispatch(overwriteSettings({ ...resources, ...props, ...values }));
          changeDefaultLanguage(values?.language);
          setShowGlobalSpinner(false);
        })
        .catch(e => {
          console.error(e);
          dispatch(overwriteSettings({ ...resources, ...props }));
          changeDefaultLanguage(resources.language);
          setShowGlobalSpinner(false);
        });
    } else {
      //Read our local resources.js file And any external library resources (which are prioritized)
      dispatch(overwriteSettings({ ...resources, ...props }));
      if (props && Object.keys(props).length !== 0) {
        changeDefaultLanguage(props.language);
      } else {
        changeDefaultLanguage(resources.language);
      }
      setShowGlobalSpinner(false);
    }
  }, [dispatch, props, sharinghost]); //dispatch should never update and this useEffect should fire only once, adding per eslint rule warning

  //Subscriptions for the CMS
  attachCMSEventHandlers();

  //Check that we are logged in by looking for token in localStorage and hitting the auth API
  useEffect(() => {
    function checkForLoginState(): void {
      //Check for url param token as well, incase we had a redirect
      const urlToken = new URL(window.location.href).searchParams.get('token');
      const token = localStorage.getItem('userToken');
      let userToken: any = null;
      //URL token takes priority
      if (urlToken) {
        userToken = urlToken;
        localStorage.setItem('userToken', userToken);
      } else if (!urlToken && token) {
        userToken = token;
      }
      if (userToken) {
        fetch(
          'https://production-api.globalforestwatch.org/auth/check-logged',
          {
            credentials: 'include',
            headers: {
              Authorization: `Bearer ${userToken}`
            }
          }
        )
          .then(response => {
            const hasError = response.status !== 200;
            response.json().then(data => {
              if (hasError) return;
              localStorage.setItem('userID', data.id);
              localStorage.setItem('email', data?.email);
              dispatch(setLoggedIn(true));
            });
          })
          .catch(e => console.error(e));
      }
    }

    //We dont care about login state for the report view as it does not have any info behind gfw login
    if (!reportView) {
      checkForLoginState();
    }
  }, []);

  return (
    <>
      {showGlobalSpinner ? (
        <Loader
          containerPositionStyling={{
            position: 'absolute',
            top: '40%',
            left: '50%'
          }}
          color={'#cfcdcd'}
          size={100}
        />
      ) : (
        <>
          {!reportView && !hideHeader && <Header />}
          <MapContent report={reportView} />
          <ModalCard />
        </>
      )}
    </>
  );
};

export default App;
