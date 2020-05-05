import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'js/store/index';

import { emailConfig } from 'configs/subscribeToAlerts';

interface EmailSignupProps {
  setPrevStep: () => void;
  setNextStep: () => void;
}

const EmailSignup = (props: EmailSignupProps): JSX.Element => {
  const [emailAddress, setEmailAddress] = useState('');
  const [emailAddressValid, setEmailAddressValid] = useState(false);
  const selectedLanguage = useSelector(
    (state: RootState) => state.appState.selectedLanguage
  );

  const { title, directions } = emailConfig[selectedLanguage];

  const validateAndSetEmailAddress = (input: string): void => {
    setEmailAddress(input);

    const condition = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
    setEmailAddressValid(condition.test(input));
  };

  return (
    <div className="email-signup-container">
      <h2>{title}</h2>
      <p>{directions}</p>
      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e: any): void => validateAndSetEmailAddress(e.target.value)}
        value={emailAddress}
        required
      />
      <div>
        <button
          onClick={(): void => props.setPrevStep()}
          className="esri-icon-left-arrow"
        />
        <button
          onClick={(): void => props.setNextStep()}
          disabled={emailAddressValid ? false : true}
          className="esri-icon-right-arrow"
        />
      </div>
    </div>
  );
};

export default EmailSignup;
