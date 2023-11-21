import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../../js/store';
import { renderModal } from '../../../../js/store/appState/actions';
import { setRenderGFWDropdown } from '../../../../js/store/appState/actions';
import { headerContent } from '../../../../../configs/translations/header.translations';
import { EmailLogin } from '../../../../js/components/gfwContent/EmailLogin';
import { setLoggedIn } from '../../../../js/store/appState/actions';

const GFWLoginOptions = (props: any) => {
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state: RootState) => state.appState.isLoggedIn);

  const selectedLanguage = useSelector((state: RootState) => state.appState.selectedLanguage);

  const { subscriptions, profile, logout, twitter, facebook, google, loginReq, contactUs } =
    headerContent[selectedLanguage];

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
    fetch('https://api.resourcewatch.org/auth/logout', {
      credentials: 'include',
    })
      .then(() => {
        //clear user credentials from local storage
        localStorage.clear();
        dispatch(setLoggedIn(false));

        //remove user token from the URL
        const url = new URL(window.location.href);
        const searchParams = new URLSearchParams(url.search);
        searchParams.has('token') && searchParams.delete('token');
        window.location.href = url.href;
      })
      .catch((e) => console.log('Logout failed', e));
  }

  function getSubscriptions(): void {
    dispatch(renderModal('AOIDashboard'));
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
          {/* <li className="subscribe-method twitter-box">
            <a
              href={`https://api.resourcewatch.org/auth/twitter?applications=gfw&token=true&callbackUrl=${baseURL}`}
              className="-twitter"
            >
              {twitter}
            </a>
          </li> */}

          <li className="subscribe-method facebook-box">
            <a
              href={`https://api.resourcewatch.org/auth/facebook?applications=gfw&token=true&callbackUrl=${baseURL}`}
              className="-facebook"
            >
              {facebook}
            </a>
          </li>

          <li className="subscribe-method google-box">
            <a
              href={`https://api.resourcewatch.org/auth/google?applications=gfw&token=true&callbackUrl=${baseURL}`}
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
          <li onClick={() => dispatch(renderModal('EditProfile'))} className="gfw-api-option">
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

  return <div ref={dropdownRef}>{isLoggedIn ? <MYGFWOptions /> : <RenderLogins />}</div>;
};

export default GFWLoginOptions;
