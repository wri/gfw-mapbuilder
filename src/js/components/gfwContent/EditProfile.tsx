import * as React from 'react';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { RootState } from '../../../js/store';
import { MemoCountryPicker } from './CountryPicker';
import {
  sectors,
  usage,
  topics,
  editProfileTranslations
} from '../../../../configs/translations/staticOptions';
import clsx from 'clsx';
import { Select, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import '../../../css/formInputs.scss';
import '../../../css/editProfile.scss';

const EditProfile = (): JSX.Element => {
  const customColorTheme = useSelector(
    (store: RootState) => store.appSettings.customColorTheme
  );
  const selectedLanguage = useSelector(
    (store: RootState) => store.appState.selectedLanguage
  );
  const [activeSector, setActiveSector] = React.useState(
    sectors[selectedLanguage][0].sector.value
  );
  const [activeSubsector, setActiveSubsector] = React.useState();
  const [activeUsage, setActiveUsage] = React.useState<string[]>([]);
  const [activeTopics, setActiveTopics] = React.useState<string[]>([]);
  const [activeCountry, setActiveCountry] = React.useState('');
  const [interestActiveCountry, setInterestActiveCountry] = React.useState('');
  const [existingProfileInfo, setExistingProfileInfo] = React.useState<any>({});
  const [originalSectorIndex, setOriginalSectorIndex] = React.useState<
    number | undefined
  >();
  const [updateSuccess, setUpdateSuccess] = React.useState(false);
  const [updateError, setUpdateError] = React.useState();
  const [userInfo, setUserInfo] = React.useState<{
    userToken: null | string;
    userID: null | string;
    profileURL: null | string;
  }>({ userToken: null, userID: null, profileURL: null });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  React.useEffect(() => {
    const userID = localStorage.getItem('userID');
    const userToken = localStorage.getItem('userToken');
    const profileURL = `https://production-api.globalforestwatch.org/user/${userID}`;
    fetch(profileURL, {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        const profileData = data.data.attributes;
        if (profileData.fullName) {
          const name = profileData.fullName.split(' ');
          profileData.firstName = name[0];
          profileData.lastName = name[1];
        }
        if (data.data.attributes.sector) {
          const sectorIdx = sectors[selectedLanguage].findIndex(
            sector => sector.sector.value === data.data.attributes.sector
          );
          setOriginalSectorIndex(sectorIdx);
        }
        setUserInfo({ userToken, userID, profileURL });
        setExistingProfileInfo(data.data.attributes);
      })
      .catch(e => console.error(e));
  }, [updateSuccess]);

  const onDefaultSubmit = (data: any): void => {
    const payload = {
      ...data,
      aoiCountry: interestActiveCountry,
      country: activeCountry,
      sector: activeSector,
      interests: activeTopics,
      howDoYouUse: '',
      id: userInfo.userID,
      loggedIn: true
    };

    //Get the subsectors
    if (
      data.hasOwnProperty('subsectorOther') &&
      data.subsectorOther.length !== 0
    ) {
      payload.subsector = payload.subsector + data.subsectorOther;
    }

    //Get the usage
    const activeUsagePayload = activeUsage.map(usage => {
      if (usage === 'Other' && data.usageOther !== 0) {
        return `${usage} ${data.usageOther}`;
      } else {
        return usage;
      }
    });
    payload.howDoYouUse = activeUsagePayload;

    //Update the API
    if (!userInfo.profileURL) return;
    fetch(userInfo.profileURL, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${userInfo.userToken}`,
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

  const useSelectStyles = makeStyles({
    root: {
      borderRadius: '4px',
      color: '#555',
      height: '2.2rem',
      padding: '0',
      fontSize: '0.8rem',
      width: '100%'
    }
  });

  const useMenuItemStyles = makeStyles({
    root: {
      paddingLeft: '10px'
    }
  });

  const selectClasses = useSelectStyles();
  const menuItems = useMenuItemStyles();
  const sectorsItems = sectors[selectedLanguage].map(
    (sectorObject, i: number) => {
      let optionIsSelected = false;
      if (originalSectorIndex && originalSectorIndex === i) {
        optionIsSelected = true;
      }
      return (
        <option
          selected={optionIsSelected}
          className={clsx(selectClasses.root, menuItems.root)}
          key={i}
          value={sectorObject.sector.value}
        >
          {sectorObject.sector.label}
        </option>
      );
    }
  );

  const useStyles = makeStyles({
    root: {
      fontSize: '0.8rem',
      '&:hover': {
        backgroundColor: 'transparent'
      }
    },
    icon: {
      borderRadius: '50%',
      width: 16,
      height: 16,
      boxShadow:
        'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
      backgroundColor: '#f5f8fa',
      backgroundImage:
        'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
      '$root.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
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
      backgroundColor: customColorTheme,
      backgroundImage:
        'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
      '&:before': {
        display: 'block',
        width: 16,
        height: 16,
        backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
        content: '""'
      },
      'input:hover ~ &': {
        backgroundColor: customColorTheme
      }
    }
  });

  function StyledRadio(props: any) {
    const classes = useStyles();

    return (
      <Radio
        className={classes.root}
        disableRipple
        color="default"
        checkedIcon={
          <span className={clsx(classes.icon, classes.checkedIcon)} />
        }
        icon={<span className={classes.icon} />}
        {...props}
      />
    );
  }

  function renderSubsectorMenuItem(subsector: { label: string; id: string }) {
    return (
      <FormControlLabel
        key={subsector.id}
        value={subsector.id}
        onChange={(e: any): void => setActiveSubsector(e.target.value)}
        control={<StyledRadio />}
        label={subsector.label}
      />
    );
  }

  const subSectors = () => {
    //Find the active sector object
    const activeSectorObject = sectors[selectedLanguage].find(
      sectorObject => sectorObject.sector.value === activeSector
    );
    const subsectors = activeSectorObject!.subsectors.map(subsector => {
      return renderSubsectorMenuItem(subsector);
    });
    return subsectors;
  };

  function handleTopics(e: any): void {
    const options = Array.from(e.target.selectedOptions);
    const optionValues = options.map((o: any) => o.value);
    setActiveTopics(optionValues);
  }

  function handleUsage(e: any): void {
    const options = Array.from(e.target.selectedOptions);
    const optionValues = options.map((o: any) => o.value);
    setActiveUsage(optionValues);
  }

  const SuccessScreen = () => {
    return (
      <div className="success-screen">
        <div className="tree-success"></div>
        <p>{editProfileTranslations[selectedLanguage].success[0]}</p>
        <p>
          {editProfileTranslations[selectedLanguage].success[1]}{' '}
          <a
            href="https://www.globalforestwatch.org/privacy-policy"
            style={{
              cursor: 'pointer',
              color: customColorTheme
            }}
          >
            {editProfileTranslations[selectedLanguage].success[2]}
          </a>
          , {editProfileTranslations[selectedLanguage].success[3]}
        </p>
        <button
          className="orange-button profile-submit"
          onClick={() => setUpdateSuccess(false)}
          style={{
            backgroundColor: customColorTheme,
            marginTop: '30px',
            width: '200px'
          }}
        >
          {editProfileTranslations[selectedLanguage].back}
        </button>
      </div>
    );
  };

  return (
    <div className="edit-profile-container">
      <>
        {!updateSuccess && (
          <>
            <h2>{editProfileTranslations[selectedLanguage].profileHeader}</h2>
            <p>{editProfileTranslations[selectedLanguage].profileSubheader}</p>
            <div>
              <form onSubmit={handleSubmit(onDefaultSubmit)}>
                <div className="form-section">
                  <label htmlFor="firstName" className="input-label">
                    {editProfileTranslations[selectedLanguage].fName}
                  </label>
                  <input
                    {...register('firstName', { required: false })}
                    defaultValue={existingProfileInfo?.firstName}
                    className="input-text"
                    type="firstName"
                    placeholder="First Name"
                    name="firstName"
                  />
                  {errors.fname && (
                    <p className="input-error">
                      {editProfileTranslations[selectedLanguage].required}
                    </p>
                  )}
                </div>
                <div className="form-section">
                  <label htmlFor="lastName" className="input-label">
                    {editProfileTranslations[selectedLanguage].lName} *
                  </label>
                  <input
                    {...register('lastName', { required: true })}
                    defaultValue={existingProfileInfo?.lastName || ''}
                    className="input-text"
                    type="lastName"
                    placeholder="Last Name"
                    name="lastName"
                  />
                  {errors.lname && (
                    <p className="input-error">
                      {editProfileTranslations[selectedLanguage].required}
                    </p>
                  )}
                </div>
                <div className="form-section">
                  <label htmlFor="email" className="input-label">
                    {editProfileTranslations[selectedLanguage].email} *
                  </label>
                  <input
                    {...register('email', { required: true })}
                    defaultValue={existingProfileInfo?.email || ''}
                    className="input-text"
                    type="email"
                    placeholder="example@globalforestwatch.com"
                    name="email"
                  />
                  {errors.email && (
                    <p className="input-error">
                      {editProfileTranslations[selectedLanguage].required}
                    </p>
                  )}
                </div>
                <div className="form-section">
                  <p className="input-label">
                    {editProfileTranslations[selectedLanguage].sector}
                  </p>
                  <Select
                    native
                    variant="outlined"
                    className={clsx(selectClasses.root)}
                    defaultValue={
                      originalSectorIndex
                        ? sectors[selectedLanguage][originalSectorIndex].sector
                            .value
                        : sectors[selectedLanguage][0].sector.value
                    }
                    onChange={(e: any): void => setActiveSector(e.target.value)}
                  >
                    {sectorsItems}
                  </Select>
                </div>
                <div className="form-section">
                  <p className="input-label">
                    {editProfileTranslations[selectedLanguage].role}
                  </p>
                  <Controller
                    name="subsector"
                    control={control}
                    render={() => (
                      <RadioGroup aria-label="subsector">
                        {subSectors()}
                      </RadioGroup>
                    )}
                  />
                  {activeSubsector === 'Other: ' && (
                    <input
                      {...register('subsectorOther', { required: false })}
                      className="input-text"
                      type="subsectorOther"
                      placeholder=""
                      name="subsectorOther"
                    />
                  )}
                </div>
                <div className="form-section">
                  <label htmlFor="jobTitle" className="input-label">
                    {editProfileTranslations[selectedLanguage].jobTitle}
                  </label>
                  <input
                    {...register('jobTitle', { required: false })}
                    defaultValue={existingProfileInfo?.jobTitle}
                    className="input-text"
                    type="jobTitle"
                    placeholder="Job Title"
                    name="jobTitle"
                  />
                </div>
                <div className="form-section">
                  <label htmlFor="company" className="input-label">
                    {editProfileTranslations[selectedLanguage].company}
                  </label>
                  <input
                    {...register('company', { required: true })}
                    defaultValue={existingProfileInfo?.company}
                    className="input-text"
                    type="company"
                    placeholder="Company / Organization"
                    name="company"
                  />
                  {errors.company && (
                    <p className="input-error">
                      {editProfileTranslations[selectedLanguage].required}
                    </p>
                  )}
                </div>

                <h4>{editProfileTranslations[selectedLanguage].located}</h4>
                <MemoCountryPicker
                  countryLabel={
                    editProfileTranslations[selectedLanguage].country
                  }
                  defaultCountry={existingProfileInfo.country}
                  activeCountryCallback={(id: any): any => setActiveCountry(id)}
                />
                <div className="form-section">
                  <label htmlFor="city" className="input-label">
                    {editProfileTranslations[selectedLanguage].city}
                  </label>
                  <input
                    {...register('city', { required: false })}
                    defaultValue={existingProfileInfo?.city}
                    className="input-text"
                    type="city"
                    placeholder="City"
                    name="city"
                  />
                </div>
                <div className="form-section">
                  <label htmlFor="state" className="input-label">
                    {editProfileTranslations[selectedLanguage].state}
                  </label>
                  <input
                    {...register('state', { required: false })}
                    defaultValue={existingProfileInfo?.state}
                    className="input-text"
                    type="state"
                    placeholder="State / Department / Province"
                    name="state"
                  />
                </div>
                <h4>{editProfileTranslations[selectedLanguage].interest}</h4>
                <MemoCountryPicker
                  countryLabel={
                    editProfileTranslations[selectedLanguage].country
                  }
                  defaultCountry={existingProfileInfo?.aoiCountry}
                  activeCountryCallback={(id: any): any =>
                    setInterestActiveCountry(id)
                  }
                />
                <div className="form-section">
                  <label htmlFor="aoiCity" className="input-label">
                    {editProfileTranslations[selectedLanguage].city}
                  </label>
                  <input
                    {...register('aoiCity', { required: false })}
                    defaultValue={existingProfileInfo?.aoiCity}
                    className="input-text"
                    type="aoiCity"
                    placeholder="City"
                    name="aoiCity"
                  />
                </div>
                <div className="form-section">
                  <label htmlFor="aoiState" className="input-label">
                    {editProfileTranslations[selectedLanguage].state}
                  </label>
                  <input
                    {...register('aoiState', { required: false })}
                    defaultValue={existingProfileInfo?.aoiState}
                    className="input-text"
                    type="aoiState"
                    placeholder="State / Department / Province"
                    name="aoiState"
                  />
                </div>
                <div className="form-section">
                  <p className="input-label">
                    {editProfileTranslations[selectedLanguage].topics} *
                  </p>
                  <p className="input-sublabel">
                    {editProfileTranslations[selectedLanguage].selectAll}
                  </p>
                  <select
                    className="multi-select"
                    multiple
                    onChange={handleTopics}
                  >
                    {topics[selectedLanguage].map((topic, i: number) => {
                      return (
                        <option
                          selected={existingProfileInfo?.interests?.includes(
                            topic.id
                          )}
                          className="multi-option"
                          key={i}
                          value={topic.id}
                        >
                          {topic.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-section">
                  <p className="input-label">
                    {editProfileTranslations[selectedLanguage].howUse} *
                  </p>
                  <p className="input-sublabel">
                    {editProfileTranslations[selectedLanguage].selectAll}
                  </p>
                  <select
                    className="multi-select"
                    multiple
                    onChange={handleUsage}
                  >
                    {usage[selectedLanguage].map((usage, i: number) => {
                      return (
                        <option
                          selected={existingProfileInfo?.howDoYouUse?.includes(
                            usage.id
                          )}
                          className="multi-option"
                          key={i}
                          value={usage.id}
                        >
                          {usage.label}
                        </option>
                      );
                    })}
                  </select>
                  {activeUsage!.includes('Other') && (
                    <input
                      {...register('usageOther', { required: false })}
                      className="input-text"
                      type="usageOther"
                      placeholder=""
                      name="usageOther"
                    />
                  )}
                </div>
                {updateError && <p className="input-error">{updateError}</p>}
                <input
                  className="orange-button profile-submit"
                  style={{
                    backgroundColor: customColorTheme,
                    marginTop: '30px',
                    width: '200px'
                  }}
                  type="submit"
                  value={editProfileTranslations[selectedLanguage].save}
                />
              </form>
            </div>
            <div style={{ textAlign: 'center', fontSize: '0.8rem' }}>
              <p>
                <a
                  href="mailto:gfw@wri-org"
                  style={{
                    cursor: 'pointer',
                    color: customColorTheme
                  }}
                >
                  {editProfileTranslations[selectedLanguage].delete[0]}
                </a>{' '}
                {editProfileTranslations[selectedLanguage].delete[1]}
              </p>
            </div>
          </>
        )}
        {updateSuccess && <SuccessScreen />}
      </>
    </div>
  );
};

export default EditProfile;
