import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'js/store';
import { render } from 'react-dom';

const MyGFWContent: FunctionComponent = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.appState.isLoggedIn
  );

  function logOut() {
    fetch('https://production-api.globalforestwatch.org/auth/logout', {
      credentials: 'include'
    }).then(() => {
      window.location.reload();
    });
  }

  function renderLogins() {
    return (
      <ul className="subscription-authentication">
        <li className="subscribe-method twitter-box">
          <a
            href="https://production-api.globalforestwatch.org/auth/twitter?applications=gfw"
            className="-twitter"
          >
            Twitter
          </a>
        </li>

        <li className="subscribe-method facebook-box">
          <a
            href="https://production-api.globalforestwatch.org/auth/facebook?applications=gfw"
            className="-facebook"
          >
            Facebook
          </a>
        </li>

        <li className="subscribe-method google-box">
          <a
            href="https://production-api.globalforestwatch.org/auth/google?applications=gfw"
            className="-google"
          >
            Google
          </a>
        </li>
      </ul>
    );
  }

  function renderDropdowns() {
    return (
      <div className="options-modal">
        <ul className="more-list">
          <li className="gfw-api-option">
            {/* <p onClick={this.getSubscriptions}> */}
            <p>subscriptions</p>
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
  }
  console.log('isLoggedIn', isLoggedIn);

  return (
    <div className="measure-options-container">
      {!isLoggedIn && renderLogins()}
      {isLoggedIn && renderDropdowns()}
    </div>
  );
};

export default MyGFWContent;
