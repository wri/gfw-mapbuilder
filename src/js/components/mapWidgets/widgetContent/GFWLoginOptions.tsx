import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'js/store';
import { setUserSubscriptions } from 'js/store/mapview/actions';
import { renderModal } from 'js/store/appState/actions';
import { setRenderGFWDropdown } from 'js/store/appState/actions';
import { headerContent } from 'src/js/components/header/header.translations';
import { EmailLogin } from 'src/js/components/gfwContent/EmailLogin';
import { setLoggedIn } from 'js/store/appState/actions';

const GFWLoginOptions = (props: any) => {
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);
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

  //Check if we are clicking outside the dropwdown and close dropdown if so
  function handleOutsideClick(e: any): void {
    if (dropdownRef.current && dropdownRef.current.contains(e.target)) {
      return;
    }
    if (props.dropdownButtonRef.current.contains(e.target)) {
      return;
    }
    dispatch(setRenderGFWDropdown(false));
  }

  function logOut(): void {
    fetch('https://production-api.globalforestwatch.org/auth/logout', {
      credentials: 'include'
    })
      .then(() => {
        localStorage.clear();
        dispatch(setLoggedIn(false));
      })
      .catch(e => console.log('Logout failed', e));
  }

  function getSubscriptions(): void {
    dispatch(renderModal('SubscriptionWidget'));
    // if (userSubscriptions.length === 0) {
    //   const token = localStorage.getItem('userToken');
    //   if (token) {
    //     fetch('https://production-api.globalforestwatch.org/v1/subscriptions', {
    //       credentials: 'include',
    //       headers: {
    //         Authorization: `Bearer ${token}`
    //       }
    //     })
    //       .then(response => {
    //         response.json().then(json => {
    //           dispatch(setUserSubscriptions(json.data));
    //           dispatch(renderModal('SubscriptionWidget'));
    //         });
    //       })
    //       .catch(e => console.log('Failed to fetch subscriptions', e));
    //   }
    // } else {
    //   console.log('We already have subscriptions, render them instead');
    // }
  }

  const RenderLogins = (): JSX.Element => {
    const baseURL = window.document.location.href;
    return (
      <>
        <ul className="subscription-authentication">
          <p className="directions">
            {loginReq}
            <a href="mailto:gfw@wri.org">{contactUs}</a>
          </p>
          <li className="subscribe-method twitter-box">
            <a
              href={`https://production-api.globalforestwatch.org/auth/twitter?applications=gfw&token=true&callbackUrl=${baseURL}`}
              className="-twitter"
            >
              {twitter}
            </a>
          </li>

          <li className="subscribe-method facebook-box">
            <a
              href={`https://production-api.globalforestwatch.org/auth/facebook?applications=gfw&token=true&callbackUrl=${baseURL}`}
              className="-facebook"
            >
              {facebook}
            </a>
          </li>

          <li className="subscribe-method google-box">
            <a
              href={`https://production-api.globalforestwatch.org/auth/google?applications=gfw&token=true&callbackUrl=${baseURL}`}
              className="-google"
            >
              {google}
            </a>
          </li>
        </ul>
        <EmailLogin />
      </>
    );
  };

  const MYGFWOptions = (): JSX.Element => {
    return (
      <div className="options-modal">
        <ul className="more-list">
          <li onClick={getSubscriptions} className="gfw-api-option">
            {subscriptions}
          </li>
          <li
            onClick={() => dispatch(renderModal('EditProfile'))}
            className="gfw-api-option"
          >
            {profile}
          </li>
          <li className="gfw-api-option">
            <p onClick={logOut}>{logout}</p>
          </li>
        </ul>
      </div>
    );
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return (): void => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      {isLoggedIn ? <MYGFWOptions /> : <RenderLogins />}
    </div>
  );
};

export default GFWLoginOptions;
