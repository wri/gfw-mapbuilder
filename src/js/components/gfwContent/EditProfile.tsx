import * as React from 'react';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { RootState } from 'js/store';
import { MemoCountryPicker } from './CountryPicker';
import { sectors, usage, topics } from './staticOptions';
import clsx from 'clsx';
import { Select, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import 'css/formInputs.scss';
import 'css/editProfile.scss';

const userID = localStorage.getItem('userID');
const userToken = localStorage.getItem('userToken');
const profileURL = `https://production-api.globalforestwatch.org/user/${userID}`;

const EditProfile = (): JSX.Element => {
  const customColorTheme = useSelector(
    (store: RootState) => store.appSettings.customColorTheme
  );
  const [activeSector, setActiveSector] = React.useState(sectors[0].sector);
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
  const { register, handleSubmit, errors, control } = useForm();

  React.useEffect(() => {
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
          const sectorIdx = sectors.findIndex(
            sector => sector.sector === data.data.attributes.sector
          );
          setOriginalSectorIndex(sectorIdx);
        }
        setExistingProfileInfo(data.data.attributes);
      })
      .catch(e => console.error(e));
  }, []);

  const onDefaultSubmit = (data: any): void => {
    const payload = {
      ...data,
      aoiCountry: interestActiveCountry,
      country: activeCountry,
      sector: activeSector,
      interests: activeTopics,
      howDoYouUse: '',
      id: userID,
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
    fetch(profileURL, {
      method: 'PATCH',
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
  const sectorsItems = sectors.map((sectorObject, i: number) => {
    let optionIsSelected = false;
    if (originalSectorIndex && originalSectorIndex === i) {
      optionIsSelected = true;
    }
    return (
      <option
        selected={optionIsSelected}
        className={clsx(selectClasses.root, menuItems.root)}
        key={i}
        value={sectorObject.sector}
      >
        {sectorObject.sector}
      </option>
    );
  });

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

  const useFormControlStyles = makeStyles({
    root: {}
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

  const formClasses = useFormControlStyles();

  function renderSubsectorMenuItem(subsector: { label: string; id: string }) {
    return (
      <FormControlLabel
        key={subsector.id}
        className={formClasses.root}
        value={subsector.id}
        onChange={(e: any): void => setActiveSubsector(e.target.value)}
        control={<StyledRadio />}
        label={subsector.label}
      />
    );
  }

  const subSectors = () => {
    //Find the active sector object
    const activeSectorObject = sectors.find(
      sectorObject => sectorObject.sector === activeSector
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
        <p>Thank you for updating your My GFW profile!</p>
        <p>
          You may wish to read our{' '}
          <a
            href="https://www.globalforestwatch.org/privacy-policy"
            style={{
              cursor: 'pointer',
              color: customColorTheme
            }}
          >
            privacy policy
          </a>
          , which provides further information about how we use personal data.
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
          BACK TO MY PROFILE
        </button>
      </div>
    );
  };

  return (
    <div className="edit-profile-container">
      <>
        {!updateSuccess && (
          <>
            <h2>Your profile</h2>
            <p>
              {
                "We use this information to make Global Forest Watch more useful for you. Your privacy is important to us and we'll never share your information without your consent."
              }
            </p>
            <div>
              <form onSubmit={handleSubmit(onDefaultSubmit)}>
                <div className="form-section">
                  <label htmlFor="firstName" className="input-label">
                    first name
                  </label>
                  <input
                    defaultValue={existingProfileInfo?.firstName}
                    className="input-text"
                    type="firstName"
                    placeholder="First Name"
                    name="firstName"
                    ref={register({ required: false })}
                  />
                  {errors.fname && (
                    <p className="input-error">This field is required</p>
                  )}
                </div>
                <div className="form-section">
                  <label htmlFor="lastName" className="input-label">
                    last name *
                  </label>
                  <input
                    defaultValue={existingProfileInfo?.lastName || ''}
                    className="input-text"
                    type="lastName"
                    placeholder="Last Name"
                    name="lastName"
                    ref={register({ required: true })}
                  />
                  {errors.lname && (
                    <p className="input-error">This field is required</p>
                  )}
                </div>
                <div className="form-section">
                  <label htmlFor="email" className="input-label">
                    email *
                  </label>
                  <input
                    defaultValue={existingProfileInfo?.email || ''}
                    className="input-text"
                    type="email"
                    placeholder="example@globalforestwatch.com"
                    name="email"
                    ref={register({ required: true })}
                  />
                  {errors.email && (
                    <p className="input-error">This field is required</p>
                  )}
                </div>
                <div className="form-section">
                  <p className="input-label">Sector</p>
                  <Select
                    native
                    variant="outlined"
                    className={clsx(selectClasses.root)}
                    defaultValue={
                      originalSectorIndex
                        ? sectors[originalSectorIndex].sector
                        : sectors[0].sector
                    }
                    onChange={(e: any): void => setActiveSector(e.target.value)}
                  >
                    {sectorsItems}
                  </Select>
                </div>
                <div className="form-section">
                  <p className="input-label">Role</p>
                  <Controller
                    as={
                      <RadioGroup aria-label="subsector">
                        {subSectors()}
                      </RadioGroup>
                    }
                    name="subsector"
                    control={control}
                  />
                  {activeSubsector === 'Other: ' && (
                    <input
                      className="input-text"
                      type="subsectorOther"
                      placeholder=""
                      name="subsectorOther"
                      ref={register({ required: false })}
                    />
                  )}
                </div>
                <div className="form-section">
                  <label htmlFor="jobTitle" className="input-label">
                    job title
                  </label>
                  <input
                    defaultValue={existingProfileInfo?.jobTitle}
                    className="input-text"
                    type="jobTitle"
                    placeholder="Job Title"
                    name="jobTitle"
                    ref={register({ required: false })}
                  />
                </div>
                <div className="form-section">
                  <label htmlFor="company" className="input-label">
                    company / organization *
                  </label>
                  <input
                    defaultValue={existingProfileInfo?.company}
                    className="input-text"
                    type="company"
                    placeholder="Company / Organization"
                    name="company"
                    ref={register({ required: true })}
                  />
                  {errors.company && (
                    <p className="input-error">This field is required</p>
                  )}
                </div>

                <h4>Where are you located?</h4>
                <MemoCountryPicker
                  defaultCountry={existingProfileInfo.country}
                  activeCountryCallback={(id: any): any => setActiveCountry(id)}
                />
                <div className="form-section">
                  <label htmlFor="city" className="input-label">
                    city
                  </label>
                  <input
                    defaultValue={existingProfileInfo?.city}
                    className="input-text"
                    type="city"
                    placeholder="City"
                    name="city"
                    ref={register({ required: false })}
                  />
                </div>
                <div className="form-section">
                  <label htmlFor="state" className="input-label">
                    state / department / province
                  </label>
                  <input
                    defaultValue={existingProfileInfo?.state}
                    className="input-text"
                    type="state"
                    placeholder="State / Department / Province"
                    name="state"
                    ref={register({ required: false })}
                  />
                </div>
                <h4>What area are you most interested in?</h4>
                <MemoCountryPicker
                  defaultCountry={existingProfileInfo?.aoiCountry}
                  activeCountryCallback={(id: any): any =>
                    setInterestActiveCountry(id)
                  }
                />
                <div className="form-section">
                  <label htmlFor="aoiCity" className="input-label">
                    city
                  </label>
                  <input
                    defaultValue={existingProfileInfo?.aoiCity}
                    className="input-text"
                    type="aoiCity"
                    placeholder="City"
                    name="aoiCity"
                    ref={register({ required: false })}
                  />
                </div>
                <div className="form-section">
                  <label htmlFor="aoiState" className="input-label">
                    state / department / province
                  </label>
                  <input
                    defaultValue={existingProfileInfo?.aoiState}
                    className="input-text"
                    type="aoiState"
                    placeholder="State / Department / Province"
                    name="aoiState"
                    ref={register({ required: false })}
                  />
                </div>
                <div className="form-section">
                  <p className="input-label">
                    what topics are you interested in? *
                  </p>
                  <p className="input-sublabel">select all that apply</p>
                  <select
                    className="multi-select"
                    multiple
                    onChange={handleTopics}
                  >
                    {topics.map((topic, i: number) => {
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
                    how do you use global forest watch? *
                  </p>
                  <p className="input-sublabel">select all that apply</p>
                  <select
                    className="multi-select"
                    multiple
                    onChange={handleUsage}
                  >
                    {usage.map((usage, i: number) => {
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
                      className="input-text"
                      type="usageOther"
                      placeholder=""
                      name="usageOther"
                      ref={register({ required: false })}
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
                  value="Save"
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
                  Email us
                </a>{' '}
                to delete your MyGFW account.
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
