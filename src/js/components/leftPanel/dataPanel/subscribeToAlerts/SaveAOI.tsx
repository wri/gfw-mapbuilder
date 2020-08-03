import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { saveAOIText } from './staticTextTranslations';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import SubscribeToAlerts from './SubscribeToAlerts';
import NameYourSubscription from './NameYourSubscription';
import SubscriptionSaved from './SubscriptionSaved';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import styled from 'styled-components';
import { MemoLanguagePicker } from './LanguagePicker';
import { miniMapInit } from './MiniMap';

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
  const [updateError, setUpdateError] = useState<boolean | string>(false);
  const [selectedAlerts, setSelectedAlerts] = useState<Array<string> | []>([]);
  const [subscriptionName, setSubscriptionName] = useState('');
  const [subscriptionLanguage, setSubscriptionLanguage] = useState('English');
  const [deforestation, setDeforestationAlerts] = useState();
  const [tags, setTags] = useState<(string | never[])[]>([]);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [language, setLanguage] = useState('en');
  const [fire, setFireAlerts] = useState();
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
  const webmapID = useSelector((store: RootState) => store.appSettings.webmap);
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

  const onDefaultSubmit = (data: any): void => {
    const userToken = localStorage.getItem('userToken');
    const payload = {
      ...data,
      application: 'gfw',
      fireAlerts: fire,
      deforestationAlerts: deforestation,
      geostore: activeFeature.attributes.geostoreId,
      type: 'geostore',
      language,
      public: true, //unclear what this means, we are replicating flagship app,
      tags
    };

    fetch('https://production-api.globalforestwatch.org/v2/area', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(msg => {
        if (msg?.errors) {
          setUpdateError(msg.errors[0].detail);
        } else {
          setUpdateSuccess(true);
        }
      })
      .catch(e => {
        setUpdateError(e);
      });
  };

  const miniMap = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      setUserEmail(email);
    }

    //Create Mini-Map
    if (!miniMap?.current || !webmapID) return;
    miniMapInit(webmapID, miniMap, activeFeature.geometry);
  }, []);

  const useCheckboxStyles = makeStyles({
    root: {
      '&:hover': {
        backgroundColor: 'transparent'
      }
    },
    icon: {
      borderRadius: 3,
      width: '1.4rem',
      height: '1.4rem',
      boxShadow:
        'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
      backgroundColor: '#f5f8fa',
      backgroundImage:
        'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
      '$root.Mui-focusVisible &': {
        outline: `2px auto ${customColorTheme}`,
        outlineOffset: 2
      },
      'input:hover ~ &': {
        backgroundColor: '#ebf1f5'
      },
      'input:disabled ~ &': {
        boxShadow: 'none',
        background: 'rgba(206,217,224,.5)'
      }
    },
    checkedIcon: {
      backgroundColor: `${customColorTheme}`,
      backgroundImage:
        'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
      '&:before': {
        display: 'block',
        width: '1.4rem',
        height: '1.4rem',
        backgroundImage:
          "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
          " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
          "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
        content: '""'
      },
      'input:hover ~ &': {
        backgroundColor: `${customColorTheme}`
      }
    }
  });

  const classes = useCheckboxStyles();

  function handleLanguagePicker(e: any) {
    setLanguage(e);
  }

  const SuccessScreen = () => {
    return (
      <div className="success-screen">
        <div className="tree-success"></div>
        <p>{saveAOIText[selectedLanguage].successText[0]}</p>
        <p>{saveAOIText[selectedLanguage].successText[1]}</p>
        <button
          className="orange-button profile-submit"
          onClick={() => setUpdateSuccess(false)}
          style={{
            backgroundColor: customColorTheme,
            marginTop: '30px',
            width: '200px',
            fontSize: '0.9rem'
          }}
        >
          {saveAOIText[selectedLanguage].successButton}
        </button>
      </div>
    );
  };

  return (
    <div className="saveAOI-container">
      <>
        {!updateSuccess && (
          <>
            <h2>{saveAOIText[selectedLanguage].title}</h2>
            <div className="map-placeholder">
              <div style={{ height: '200px' }} ref={miniMap}></div>
            </div>
            <div>
              <form onSubmit={handleSubmit(onDefaultSubmit)}>
                <div className="form-section">
                  <label htmlFor="name" className="input-label">
                    {saveAOIText[selectedLanguage].nameLabel}
                  </label>
                  <input
                    className="input-text"
                    type="name"
                    placeholder=""
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
                        onChange={(_, value): void => setTags(value)}
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
                <div className="form-section">
                  <label htmlFor="email" className="input-label">
                    {saveAOIText[selectedLanguage].email} *
                  </label>
                  <input
                    defaultValue={userEmail}
                    className="input-text"
                    type="email"
                    placeholder="example@globalforestwatch.com"
                    name="email"
                    ref={register({ required: true })}
                  />
                  {errors.email && (
                    <p className="input-error">
                      {saveAOIText[selectedLanguage].required}
                    </p>
                  )}
                </div>
                <div className="form-section">
                  <label htmlFor="notifications" className="input-label">
                    {saveAOIText[selectedLanguage].notifications} *
                  </label>
                  <section>
                    <Controller
                      as={Checkbox}
                      color="default"
                      icon={<span className={classes.icon} />}
                      className={classes.root}
                      checkedIcon={
                        <span
                          className={clsx(classes.icon, classes.checkedIcon)}
                        />
                      }
                      disableRipple
                      name="fireAlerts"
                      onChange={(e: any) => setFireAlerts(e[1])}
                      control={control}
                    />
                    <label style={{ fontSize: '0.8rem' }}>
                      {saveAOIText[selectedLanguage].fireDetected}
                    </label>
                  </section>
                  <section>
                    <Controller
                      color="default"
                      icon={<span className={classes.icon} />}
                      className={classes.root}
                      checkedIcon={
                        <span
                          className={clsx(classes.icon, classes.checkedIcon)}
                        />
                      }
                      as={Checkbox}
                      disableRipple
                      name="deforestationAlerts"
                      control={control}
                      onChange={(e: any) => setDeforestationAlerts(e[1])}
                    />
                    <label style={{ fontSize: '0.8rem' }}>
                      {saveAOIText[selectedLanguage].forestChange}
                    </label>
                  </section>
                </div>
                <div className="form-section">
                  <label htmlFor="language" className="input-label">
                    {saveAOIText[selectedLanguage].language} *
                  </label>
                  <MemoLanguagePicker
                    activeLanguageCallback={handleLanguagePicker}
                  />
                </div>
                {updateError && <p className="input-error">{updateError}</p>}
                <input
                  className="orange-button profile-submit"
                  style={{
                    backgroundColor: customColorTheme,
                    marginTop: '30px',
                    width: '200px',
                    cursor: 'pointer'
                  }}
                  type="submit"
                  value={saveAOIText[selectedLanguage].save}
                />
              </form>
            </div>
          </>
        )}
        {updateSuccess && <SuccessScreen />}
      </>
    </div>
  );
};

export default SaveAOI;
