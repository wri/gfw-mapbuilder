import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'js/store';
import { setUserSubscriptions } from 'js/store/mapview/actions';
import { renderModal } from 'js/store/appState/actions';

import { headerContent } from 'src/js/components/header/header.translations';

const MyGFWContent: FunctionComponent = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => state.appState.isLoggedIn
  );
  const userSubscriptions = useSelector(
    (state: RootState) => state.mapviewState.userSubscriptions
  );
  const selectedLanguage = useSelector(
    (state: RootState) => state.appState.selectedLanguage
  );

  const {
    subscriptions,
    profile,
    logout,
    twitter,
    facebook,
    google,
    loginReq,
    contactUs
  } = headerContent[selectedLanguage];

  function logOut(): void {
    fetch('https://production-api.globalforestwatch.org/auth/logout', {
      credentials: 'include'
    })
      .then(() => {
        //TODO: is there a better way to do this then full page reload?
        window.location.reload();
      })
      .catch(e => console.log('Logout failed', e));
  }

  function getSubscriptions(): void {
    if (userSubscriptions.length === 0) {
      fetch('https://production-api.globalforestwatch.org/v1/subscriptions', {
        credentials: 'include'
      })
        .then(response => {
          response.json().then(json => {
            dispatch(setUserSubscriptions(json.data));
            dispatch(renderModal('SubscriptionWidget'));
          });
        })
        .catch(e => console.log('Failed to fetch subscriptions', e));
    } else {
      console.log('We already have subscriptions, render them instead');
      dispatch(renderModal('SubscriptionWidget'));
    }
  }

  const RenderLogins = (): JSX.Element => {
    return (
      <ul className="subscription-authentication">
        <p>
          {loginReq}
          <a href="mailto:gfw@wri.org">{contactUs}</a>
        </p>
        <li className="subscribe-method twitter-box">
          <a
            href="https://production-api.globalforestwatch.org/auth/twitter?applications=gfw"
            className="-twitter"
          >
            {twitter}
          </a>
        </li>

        <li className="subscribe-method facebook-box">
          <a
            href="https://production-api.globalforestwatch.org/auth/facebook?applications=gfw"
            className="-facebook"
          >
            {facebook}
          </a>
        </li>

        <li className="subscribe-method google-box">
          <a
            href="https://production-api.globalforestwatch.org/auth/google?applications=gfw"
            className="-google"
          >
            {google}
          </a>
        </li>
      </ul>
    );
  };

  const RenderDropdowns = (): JSX.Element => {
    return (
      <div className="options-modal">
        <ul className="more-list">
          <li onClick={getSubscriptions} className="gfw-api-option">
            {subscriptions}
          </li>
          <li className="gfw-api-option">
            <a href="http://www.globalforestwatch.org/my_gfw">{profile}</a>
          </li>
          <li className="gfw-api-option">
            <p onClick={logOut}>{logout}</p>
          </li>
        </ul>
      </div>
    );
  };

  return <div>{isLoggedIn ? <RenderDropdowns /> : <RenderLogins />}</div>;
};

export default MyGFWContent;
