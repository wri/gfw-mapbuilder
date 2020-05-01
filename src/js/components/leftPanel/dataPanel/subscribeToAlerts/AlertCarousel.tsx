import React, { useState } from 'react';

import SubscribeToAlerts from './SubscribeToAlerts';
import EmailSignup from './EmailSignup';
import NameYourSubscription from './NameYourSubscription';
import SubscriptionSaved from './SubscriptionSaved';

const AlertCarousel = (): JSX.Element => {
  const allSteps: ReadonlyArray<string> = [
    'SubscribeToAlerts',
    'EmailSignup',
    'NameYourSubscription',
    'SubscriptionSaved'
  ];
  const [activeStep, setActiveStep] = useState('SubscribeToAlerts');

  const setNextStep = (): void => {
    const index = allSteps.indexOf(activeStep);
    const nextStep = allSteps[index + 1];
    setActiveStep(nextStep);
  };

  const setPrevStep = (): void => {
    const index = allSteps.indexOf(activeStep);
    const prevStep = allSteps[index - 1];
    setActiveStep(prevStep);
  };

  const returnStep = (): JSX.Element | undefined => {
    switch (activeStep) {
      case 'SubscribeToAlerts':
        return <SubscribeToAlerts setNextStep={setNextStep} />;
      case 'EmailSignup':
        return (
          <EmailSignup setNextStep={setNextStep} setPrevStep={setPrevStep} />
        );
      case 'NameYourSubscription':
        return (
          <NameYourSubscription
            setNextStep={setNextStep}
            setPrevStep={setPrevStep}
          />
        );
      case 'SubscriptionSaved':
        return <SubscriptionSaved />;
      default:
        break;
    }
  };

  return <div className="alert-carousel-container">{returnStep()}</div>;
};

export default AlertCarousel;
