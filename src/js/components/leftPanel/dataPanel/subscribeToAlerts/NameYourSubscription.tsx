import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'js/store/index';

import {
  nameSubscriptionConfig,
  languageOptions
} from 'configs/subscribeToAlerts';

interface NameYourSubscriptionProps {
  setNextStep: () => void;
  setPrevStep: () => void;
  subscriptionName: string;
  setSubscriptionName: (subscriptionName: string) => void;
  setSubscriptionLanguage: (subscriptionLanguage: string) => void;
}

const NameYourSubscription = (
  props: NameYourSubscriptionProps
): JSX.Element => {
  const {
    setNextStep,
    setPrevStep,
    subscriptionName,
    setSubscriptionName,
    setSubscriptionLanguage
  } = props;

  const selectedLanguage = useSelector(
    (state: RootState) => state.appState.selectedLanguage
  );
  const { title, nameLabel, subscribeLabel } = nameSubscriptionConfig[
    selectedLanguage
  ];

  return (
    <div className="name-your-subscriptions-container">
      <h3>{title}</h3>
      <label>{nameLabel}</label>
      <input
        type="text"
        value={subscriptionName}
        placeholder={'Area name'}
        onChange={(e: any): void => setSubscriptionName(e.target.value)}
      />

      <label>{subscribeLabel}</label>
      <select
        onClick={(e: any): void => setSubscriptionLanguage(e.target.value)}
      >
        {languageOptions.map(({ label, field }, index: number) => (
          <option key={index} value={field}>
            {label}
          </option>
        ))}
      </select>
      <div>
        <button
          onClick={(): void => setPrevStep()}
          className="esri-icon-left-arrow"
        />
        <button
          onClick={(): void => setNextStep()}
          disabled={subscriptionName.length ? false : true}
          className="esri-icon-right-arrow"
        />
      </div>
    </div>
  );
};

export default NameYourSubscription;
