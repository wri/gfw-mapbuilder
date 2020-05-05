import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'js/store/index';

const config = {
  en: {
    title: 'Name your subscription',
    nameLabel: 'Name',
    subscribeLabel: 'Subscribe to alerts'
  },
  ka: {
    title: 'დაარქვით თქვენ ხელმოწერას',
    nameLabel: 'გვარი',
    subscribeLabel: 'ხელმოწერა შეტყობინებებზე'
  },
  fr: {
    title: 'Nommer votre abonnement',
    nameLabel: 'Nom',
    subscribeLabel: 'S’abonner aux alertes'
  },
  es: {
    title: 'Denomine su suscripción',
    nameLabel: 'Nombre',
    subscribeLabel: 'Suscribirse a las alertas'
  },
  pt: {
    title: 'Nomeie sua assinatura',
    nameLabel: 'Nome',
    subscribeLabel: 'Inscreva-se para receber alertas'
  },
  id: {
    title: 'Beri nama langganan Anda',
    nameLabel: 'Nama',
    subscribeLabel: 'Berlangganan peringatan'
  },
  zh: { title: '为您的订阅命名', nameLabel: '姓名', subscribeLabel: '订阅预警' }
};

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
  const { title, nameLabel, subscribeLabel } = config[selectedLanguage];

  const langs = [
    { label: 'English', field: 'en' },
    { label: '中文', field: 'zh' },
    { label: 'Français', field: 'fr' },
    { label: 'Bahasa Indonesia', field: 'id' },
    { label: 'Português (Brasil)', field: 'pt' },
    {
      label: 'Español (Mexico)',
      field: 'es'
    }
  ];

  /**
   * TODO
   * todo [ ] style to match PROD
   * todo [X] make content and next/back buttons language aware
   */

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
        {langs.map(({ label, field }, index: number) => (
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
