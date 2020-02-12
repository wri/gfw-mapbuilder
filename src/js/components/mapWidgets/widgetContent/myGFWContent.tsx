import React, { FunctionComponent } from 'react';


const MyGFWContent: FunctionComponent = () => {
  return (
    <div className="measure-options-container">
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
    </div>
  );
};

export default MyGFWContent;
