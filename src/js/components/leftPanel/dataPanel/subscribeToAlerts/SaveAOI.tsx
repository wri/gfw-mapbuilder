import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { saveAOIText } from './staticTextTranslations';
import SubscribeToAlerts from './SubscribeToAlerts';
import NameYourSubscription from './NameYourSubscription';
import SubscriptionSaved from './SubscriptionSaved';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import styled from 'styled-components';

import { registerGeometry } from 'js/helpers/geometryRegistration';

import {
  setActiveFeatures,
  setUserSubscriptions
} from 'js/store/mapview/actions';
import { RootState } from 'js/store/index';

import 'css/saveAOI.scss';

const subscriptionURL =
  'https://production-api.globalforestwatch.org/v1/subscriptions';

interface AutocompleteWrapperProps {
  customColorTheme: string;
}
const AutocompleteWrapper = styled.div<AutocompleteWrapperProps>`
  .MuiChip-root {
    background-color: ${props => props.customColorTheme};
  }
`;

const SaveAOI = (): JSX.Element => {
  const allSteps: ReadonlyArray<string> = [
    'SubscribeToAlerts',
    'NameYourSubscription',
    'SubscriptionSaved'
  ];
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState('');
  const [selectedAlerts, setSelectedAlerts] = useState<Array<string> | []>([]);
  const [subscriptionName, setSubscriptionName] = useState('');
  const [subscriptionLanguage, setSubscriptionLanguage] = useState('English');
  const { register, handleSubmit, errors, control } = useForm();
  const iso = useSelector((state: RootState) => state.appSettings.iso);
  const activeFeatures = useSelector(
    (state: RootState) => state.mapviewState.activeFeatures
  );
  const activeFeatureIndex = useSelector(
    (state: RootState) => state.mapviewState.activeFeatureIndex
  );
  const selectedLanguage = useSelector(
    (store: RootState) => store.appState.selectedLanguage
  );
  const customColorTheme = useSelector(
    (store: RootState) => store.appSettings.customColorTheme
  );
  const activeLayer = activeFeatures[activeFeatureIndex[0]];
  const activeFeature = activeLayer?.features[activeFeatureIndex[1]];

  const getGeostoreID = (): Promise<string> => {
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

  const updateSubscriptions = async (): Promise<void> => {
    const activeFeatureGeostoreId = await getGeostoreID();
    const userToken = localStorage.getItem('userToken');
    const userID = localStorage.getItem('userID');
    const profileURL = `https://production-api.globalforestwatch.org/user/${userID}`;

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
        content: 'vaidotasp@gmail.com' //TODO: Needs to be fixed
      }
    };

    //Saving subscription : Need to check for flagship flow
    fetch(subscriptionURL, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
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
  };

  // const setNextStep = (): void => {
  //   const index = allSteps.indexOf(activeStep);
  //   const nextStep = allSteps[index + 1];

  //   if (nextStep === 'SubscriptionSaved') {
  //     updateSubscriptions();
  //     setActiveStep(nextStep);
  //     return;
  //   }

  //   setActiveStep(nextStep);
  // };

  // const setPrevStep = (): void => {
  //   const index = allSteps.indexOf(activeStep);
  //   const prevStep = allSteps[index - 1];
  //   setActiveStep(prevStep);
  // };
  //
  const onDefaultSubmit = (data: any): void => {
    console.log(data);
  };

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      setUserEmail(email);
    }
  }, []);

  // const returnCurrentStep = (): JSX.Element | undefined => {
  //   switch (activeStep) {
  //     case 'SubscribeToAlerts':
  //       return (
  //         <SubscribeToAlerts
  //           setNextStep={setNextStep}
  //           selectedAlerts={selectedAlerts}
  //           setSelectedAlerts={setSelectedAlerts}
  //         />
  //       );
  //     case 'NameYourSubscription':
  //       return (
  //         <NameYourSubscription
  //           setNextStep={setNextStep}
  //           setPrevStep={setPrevStep}
  //           subscriptionName={subscriptionName}
  //           setSubscriptionName={setSubscriptionName}
  //           setSubscriptionLanguage={setSubscriptionLanguage}
  //         />
  //       );
  //     case 'SubscriptionSaved':
  //       return <SubscriptionSaved />;
  //     default:
  //       break;
  //   }
  // };
  //
  // const CheckboxWrapper = styled.div<CheckBoxWrapperProps>`
  //   .styled-checkbox:checked + .styled-checkboxlabel:before {
  //     background-color: ${props => props.customColorTheme};
  //   }
  // `;

  return (
    <div className="saveAOI-container">
      <h2>{saveAOIText[selectedLanguage].title}</h2>
      <p>Map placeholder</p>
      <div>
        <form onSubmit={handleSubmit(onDefaultSubmit)}>
          <div className="form-section">
            <label htmlFor="name" className="input-label">
              {saveAOIText[selectedLanguage].nameLabel}
            </label>
            <input
              className="input-text"
              type="name"
              placeholder="Area Name"
              name="name"
              ref={register({ required: true })}
            />
            {errors.name && (
              <p className="input-error">
                {saveAOIText[selectedLanguage].required}
              </p>
            )}
          </div>
          <div className="form-section">
            <div>
              <AutocompleteWrapper customColorTheme={customColorTheme}>
                <Autocomplete
                  freeSolo
                  multiple
                  id="tags-outlined"
                  options={[]}
                  defaultValue={[]}
                  filterSelectedOptions
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label={saveAOIText[selectedLanguage].tagsLabel}
                      placeholder="Tags"
                    />
                  )}
                />
              </AutocompleteWrapper>
            </div>
            <span style={{ fontSize: '0.6rem' }}>
              {saveAOIText[selectedLanguage].tagsSubLabel}
            </span>
          </div>
          <div className="alerts-section">
            <div className="area-alerts-img"></div>
            <p>{saveAOIText[selectedLanguage].alertNote}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaveAOI;
