import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'js/store/index';

import {
  nameSubscriptionConfig,
  languageOptions
} from 'configs/subscribeToAlerts.translations';

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

  const customColorTheme = useSelector(
    (store: RootState) => store.appSettings.customColorTheme
  );
  const selectedLanguage = useSelector(
    (state: RootState) => state.appState.selectedLanguage
  );
  const { title, nameLabel, subscribeLabel } = nameSubscriptionConfig[
    selectedLanguage
  ];

  return (
    <div className="name-your-subscriptions-container">
      <div className="form-wrapper">
        <h3>{title}</h3>
        <div className="column">
          <label>{nameLabel}</label>
          <input
            type="text"
            value={subscriptionName}
            placeholder={'Area name'}
            onChange={(e: any): void => setSubscriptionName(e.target.value)}
          />
        </div>
        <div className="column">
          <label>{subscribeLabel}</label>
          <select
            style={{
              border: `1px solid ${customColorTheme}`,
              backgroundColor: customColorTheme
            }}
            onClick={(e: any): void => setSubscriptionLanguage(e.target.value)}
          >
            {languageOptions.map(({ label, field }, index: number) => (
              <option key={index} value={field}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="buttons-wrapper">
          <button
            onClick={(): void => setPrevStep()}
            className="orange-button custom esri-icon-left-arrow"
          />
          <button
            onClick={(): void => setNextStep()}
            disabled={subscriptionName.length === 0}
            className={`orange-button custom esri-icon-right-arrow ${
              subscriptionName.length ? '' : 'inactive'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default NameYourSubscription;
