import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'js/store';
import { setUserSubscriptions } from 'js/store/mapview/actions';
import { renderModal } from 'js/store/appState/actions';

const MyGFWContent: FunctionComponent = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => state.appState.isLoggedIn
  );

  const subscriptions = useSelector(
    (state: RootState) => state.mapviewState.userSubscriptions
  );

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
    if (subscriptions.length === 0) {
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
          Log in is required so you can return to Global Forest Watch to view,
          manage, and delete your subscriptions. Questions?
          <a href="mailto:gfw@wri.org">Contact us at gfw@wri.org</a>
        </p>
        <li className="subscribe-method twitter-box">
          <a
            href="https://production-api.globalforestwatch.org/auth/twitter?applications=gfw"
            className="-twitter"
          >
            Log in with Twitter
          </a>
        </li>

        <li className="subscribe-method facebook-box">
          <a
            href="https://production-api.globalforestwatch.org/auth/facebook?applications=gfw"
            className="-facebook"
          >
            Log in with Facebook
          </a>
        </li>

        <li className="subscribe-method google-box">
          <a
            href="https://production-api.globalforestwatch.org/auth/google?applications=gfw"
            className="-google"
          >
            Log in with Google
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
            Subscriptions
          </li>
          <li className="gfw-api-option">
            <a href="http://www.globalforestwatch.org/my_gfw">My GFW Profile</a>
          </li>
          <li className="gfw-api-option">
            <p onClick={logOut}>Logout</p>
          </li>
        </ul>
      </div>
    );
  };

  return <div>{isLoggedIn ? <RenderDropdowns /> : <RenderLogins />}</div>;
};

export default MyGFWContent;
