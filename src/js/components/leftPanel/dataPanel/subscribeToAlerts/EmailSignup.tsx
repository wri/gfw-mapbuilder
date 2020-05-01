import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'js/store/index';

const config = {
  en: {
    title: 'Subscribe to alerts',
    directions:
      'Enter your email below to receive an email notification when there are new annual tree cover loss data available for this area.'
  },
  ka: {
    title: 'ხელმოწერა შეტყობინებებზე',
    directions:
      'ქვემოთ შეიყვანეთ თქვენი ელფოსტა, რათა მიიღოთ ელ.ფოსტით შეტყობინება, როდესაც ამ ტერიტორიისთვის იქნება ხელმისაწვდომი ახალი ყოველწლიური მონაცემები ხის ვარჯის კარგვაზე'
  },
  fr: {
    title: 'S’abonner aux alertes',
    directions:
      'Renseignez votre adresse e-mail ci-dessous pour recevoir une notification par e-mail lorsque de nouvelles données annuelles de perte de la couverture arborée sont disponibles pour cette zone.'
  },
  es: {
    title: 'Suscribirse a las alertas',
    directions:
      'Ingrese su correo electrónico a continuación para recibir una notificación por correo electrónico cuando estén disponibles nuevos datos sobre pérdida de cobertura arbórea anuales para esta área.'
  },
  pt: {
    title: 'Inscreva-se para receber alertas',
    directions:
      'Insira a seguir seu e-mail para receber uma notificação quando houver novos dados anuais de perda de cobertura arbórea disponíveis para essa área.'
  },
  id: {
    title: 'Berlangganan peringatan',
    directions:
      'Masukkan email Anda di bawah ini untuk menerima pemberitahuan email ketika ada data kehilangan tutupan pohon tahunan baru tersedia untuk kawasan ini.'
  },
  zh: {
    title: '订阅预警',
    directions:
      '在下方输入您的电子邮箱，您将在此区域有新的年度森林覆盖减少数据时收到电子邮件通知。'
  }
};

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

  const { title, directions } = config[selectedLanguage];

  const validateAndSetEmailAddress = (input: string): void => {
    setEmailAddress(input);

    const condition = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
    setEmailAddressValid(condition.test(input));
  };

  /**
   * TODO
   * todo [ ] style to match PROD
   * todo [X] make content & next/back buttons language aware
   */

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
