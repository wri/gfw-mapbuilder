import React from 'react';
import { useDispatch } from 'react-redux';

import { renderModal } from 'js/store/appState/actions';

const SubscriptionSaved = (): JSX.Element => {
  const dispatch = useDispatch();

  return (
    <div className="subscription-saved-container">
      <h3>Subscription saved!</h3>
      <p>
        This subscription has been added to your profile.{' '}
        <strong>
          Please check your email and click on the link to confirm your
          subscription
        </strong>
        . Visit your
        <a
          href="https://www.globalforestwatch.org/my-gfw"
          rel="noopener noreferrer"
          target="_blank"
        >
          <strong> saved subscriptions </strong>
        </a>
        to manage them.
      </p>
      <button
        onClick={(): any => dispatch(renderModal('SubscriptionWidget'))}
        className="orange-button custom"
      >
        OK
      </button>
    </div>
  );
};

export default SubscriptionSaved;
