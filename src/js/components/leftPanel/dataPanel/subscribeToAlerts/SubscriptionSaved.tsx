import React from 'react';
import { useDispatch } from 'react-redux';

import { renderModal } from 'js/store/appState/actions';

const SubscriptionSaved = (): JSX.Element => {
  const dispatch = useDispatch();

  // * NOTE: this content in v1 is not language aware

  return (
    <div className="subscription-saved-container">
      <h3>Subscription saved!</h3>
      <p>
        This subscription has been added to your profile. Please check your
        email and click on the link to confirm your subscription. Visit your
        <a
          href="https://www.globalforestwatch.org/my-gfw"
          rel="noopener noreferrer"
          target="_blank"
        >
          saved subscriptions
        </a>
        to manage them.
      </p>
      <button onClick={(): any => dispatch(renderModal('SubscriptionWidget'))}>
        OK
      </button>
    </div>
  );
};

export default SubscriptionSaved;
