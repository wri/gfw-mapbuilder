import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SubscribeToAlerts from './SubscribeToAlerts';
import NameYourSubscription from './NameYourSubscription';
import SubscriptionSaved from './SubscriptionSaved';

import { registerGeometry } from 'js/helpers/geometryRegistration';

import {
  setActiveFeatures,
  setUserSubscriptions
} from 'js/store/mapview/actions';
import { RootState } from 'js/store/index';

import 'css/alertCarousel.scss';

const AlertCarousel = (): JSX.Element => {
  const allSteps: ReadonlyArray<string> = [
    'SubscribeToAlerts',
    'NameYourSubscription',
    'SubscriptionSaved'
  ];
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState('SubscribeToAlerts');
  const [selectedAlerts, setSelectedAlerts] = useState<Array<string> | []>([]);
  const [subscriptionName, setSubscriptionName] = useState('');
  const [subscriptionLanguage, setSubscriptionLanguage] = useState('English');
  const iso = useSelector((state: RootState) => state.appSettings.iso);
  const activeFeatures = useSelector(
    (state: RootState) => state.mapviewState.activeFeatures
  );
  const activeFeatureIndex = useSelector(
    (state: RootState) => state.mapviewState.activeFeatureIndex
  );
  const activeLayer = activeFeatures[activeFeatureIndex[0]];
  const activeFeature = activeLayer?.features[activeFeatureIndex[1]];

  const getGeostoreID = (): any => {
    if ((activeFeature.attributes as any).geostoreId) {
      return (activeFeature.attributes as any).geostoreId;
    } else {
      return registerGeometry(activeFeature)
        .then(response => response.json())
        .then(res => {
          const oldActiveFeatures = [...activeFeatures];
          const activeLayer = oldActiveFeatures[activeFeatureIndex[0]];
          const activeFeature = activeLayer?.features[activeFeatureIndex[1]];
          activeFeature.attributes.geostoreId = res.data.id;
          dispatch(setActiveFeatures(oldActiveFeatures));

          return res.data.id;
        });
    }
  };

  const fetchCredentials = (): any => {
    return fetch(
      'https://production-api.globalforestwatch.org/auth/check-logged',
      {
        credentials: 'include'
      }
    )
      .then(response => response.status === 200 && response.json())
      .then(results => results)
      .catch(e => console.log('error in fetchCredentials()', e));
  };

  const updateSubscriptions = async (): Promise<void> => {
    const activeFeatureGeostoreId = await getGeostoreID();
    const userCredentials = await fetchCredentials();

    const data = {
      datasets: selectedAlerts,
      language: subscriptionLanguage,
      name: subscriptionName,
      params: {
        geostore: activeFeatureGeostoreId,
        iso: iso
      },
      resource: {
        type: 'EMAIL',
        content: userCredentials.email
      }
    };

    fetch('https://production-api.globalforestwatch.org/v1/subscriptions', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .catch(e =>
        console.error('error POSTING subscriptions in updateSubscriptions()', e)
      );

    fetch('https://production-api.globalforestwatch.org/v1/subscriptions', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then(results => {
        dispatch(setUserSubscriptions(results.data));
      })
      .catch(e =>
        console.error('error GETTING subscriptions in updateSubscriptions()', e)
      );
  };

  const setNextStep = (): void => {
    const index = allSteps.indexOf(activeStep);
    const nextStep = allSteps[index + 1];

    if (nextStep === 'SubscriptionSaved') {
      updateSubscriptions();
      setActiveStep(nextStep);
      return;
    }

    setActiveStep(nextStep);
  };

  const setPrevStep = (): void => {
    const index = allSteps.indexOf(activeStep);
    const prevStep = allSteps[index - 1];
    setActiveStep(prevStep);
  };

  const returnCurrentStep = (): JSX.Element | undefined => {
    switch (activeStep) {
      case 'SubscribeToAlerts':
        return (
          <SubscribeToAlerts
            setNextStep={setNextStep}
            selectedAlerts={selectedAlerts}
            setSelectedAlerts={setSelectedAlerts}
          />
        );
      case 'NameYourSubscription':
        return (
          <NameYourSubscription
            setNextStep={setNextStep}
            setPrevStep={setPrevStep}
            subscriptionName={subscriptionName}
            setSubscriptionName={setSubscriptionName}
            setSubscriptionLanguage={setSubscriptionLanguage}
          />
        );
      case 'SubscriptionSaved':
        return <SubscriptionSaved />;
      default:
        break;
    }
  };

  return <div className="alert-carousel-container">{returnCurrentStep()}</div>;
};

export default AlertCarousel;
