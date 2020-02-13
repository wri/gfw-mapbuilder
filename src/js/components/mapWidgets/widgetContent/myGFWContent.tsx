import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'js/store';
import { render } from 'react-dom';

import { userSubscriptions } from 'js/store/mapview/actions';

const MyGFWContent: FunctionComponent = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => state.appState.isLoggedIn
  );

  const subscriptions = useSelector(
    (state: RootState) => state.mapviewState.userSubscriptions
  );

  function logOut() {
    fetch('https://production-api.globalforestwatch.org/auth/logout', {
      credentials: 'include'
    }).then(() => {
      window.location.reload();
    });
  }

  function getSubscriptions() {
    if (subscriptions.length === 0) {
      fetch('https://production-api.globalforestwatch.org/v1/subscriptions', {
        credentials: 'include'
      }).then(response => {
        if (response.status !== 200) {
          // this.setState({
          //   userSubscriptions: []
          // });
        }
        response.json().then(json => {
          dispatch(userSubscriptions(json.data));
          // this.setState({
          //   userSubscriptions: json.data
          // });
          // mapActions.setUserSubscriptions(json.data);
          // mapActions.toggleSubscriptionsModal({ visible: true });
        });
      });
    } else {
      console.log('ooh');

      // mapActions.toggleSubscriptionsModal({ visible: true });
    }
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
            <p onClick={getSubscriptions}>subscriptions</p>
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
