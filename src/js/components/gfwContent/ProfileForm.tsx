import React, { useState } from 'react';
import { FormControlLabel, makeStyles, Radio, RadioGroup, Select } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { MemoCountryPicker } from './CountryPicker';
import { editProfileTranslations, sectors, topics, usage } from '../../../../configs/translations/staticOptions';
import clsx from 'clsx';
import { Attributes } from './utils';
import { handleCustomColorTheme } from '../../../utils';

const useSelectStyles = makeStyles({
  root: {
    borderRadius: '4px',
    color: '#555',
    height: '2.2rem',
    padding: '0',
    fontSize: '0.8rem',
    width: '100%',
  },
});

const useMenuItemStyles = makeStyles({
  root: {
    paddingLeft: '10px',
  },
});

interface Props {
  selectedLanguage: string;
  isProfileComplete: boolean;
  onSubmit: (data: any) => void;
  customColorTheme: string;
  defaultValues: Attributes;
}
function ProfileForm({ selectedLanguage, isProfileComplete, onSubmit, customColorTheme, defaultValues }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    watch,
  } = useForm({
    reValidateMode: 'onChange',
    defaultValues: defaultValues,
  });

  const [activeUsage, setActiveUsage] = React.useState<string[]>([]);
  const [activeTopics, setActiveTopics] = React.useState<string[]>([]);
  const [activeCountry, setActiveCountry] = useState('');

  const [interestActiveCountry, setInterestActiveCountry] = useState('');
  const watchSector = watch('sector'); // you can supply default value as second argument
  const watchRole = watch('subsector'); // you can supply default value as second argument

  const selectClasses = useSelectStyles();
  const menuItems = useMenuItemStyles();

  const themeColor = handleCustomColorTheme(customColorTheme);

  const useStyles = makeStyles({
    root: {
      fontSize: '0.8rem',
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    icon: {
      borderRadius: '50%',
      width: 16,
      height: 16,
      boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
      backgroundColor: '#f5f8fa',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
      '$root.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
      },
      'input:hover ~ &': {
        backgroundColor: '#ebf1f5',
      },
      'input:disabled ~ &': {
        boxShadow: 'none',
        background: 'rgba(206,217,224,.5)',
      },
    },
    checkedIcon: {
      backgroundColor: themeColor,
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
      '&:before': {
        display: 'block',
        width: 16,
        height: 16,
        backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
        content: '""',
      },
      'input:hover ~ &': {
        backgroundColor: themeColor,
      },
    },
  });
  const sectorItems = sectors[selectedLanguage].map((sectorObject, i: number) => {
    return (
      <option className={clsx(selectClasses.root, menuItems.root)} key={i} value={sectorObject.sector.value}>
        {sectorObject.sector.label}
      </option>
    );
  });

  function StyledRadio(props: any) {
    const classes = useStyles();
    return (
      <Radio
        className={classes.root}
        disableRipple
        color="default"
        checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
        icon={<span className={classes.icon} />}
        {...props}
      />
    );
  }

  const roles = () => {
    //Find the active sector object to fetch the roles for that
    const activeSector = getValues('sector');
    const activeSectorObject = sectors[selectedLanguage].find(
      (sectorObject) => sectorObject.sector.value === activeSector
    );

    const RoleItems = activeSectorObject?.subsectors.map((s) => {
      return <FormControlLabel key={s.id} value={s.id} control={<StyledRadio />} label={s.label} />;
    });
    return <>{RoleItems}</>;
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
  return (
    <>
      <h2>{editProfileTranslations[selectedLanguage].profileHeader}</h2>
      <p>{editProfileTranslations[selectedLanguage].profileSubheader}</p>
      {!isProfileComplete && (
        <p style={{ color: 'red', fontSize: '13px' }}>Make sure to complete all required fields*</p>
      )}
      <div>
        <form
          onSubmit={handleSubmit((data) =>
            onSubmit({
              ...data,
              country: activeCountry !== '' ? activeCountry : 'AFG',
              aoiCountry: interestActiveCountry !== '' ? interestActiveCountry : 'AFG',
              interests: activeTopics.length > 0 ? activeTopics : ['Agricultural_supply_chains'],
              howDoYouUse: activeUsage.length > 0 ? activeUsage : ['Advocacy/campaigning'],
            })
          )}
        >
          <div className="form-section">
            <label htmlFor="firstName" className="input-label">
              {editProfileTranslations[selectedLanguage].fName}
            </label>
            <input
              {...register('firstName', { required: false })}
              defaultValue={defaultValues.firstName}
              className="input-text"
              type="firstName"
              placeholder="First Name"
              name="firstName"
            />
          </div>
          <div className="form-section">
            <label htmlFor="lastName" className="input-label">
              {editProfileTranslations[selectedLanguage].lName} *
            </label>
            <input
              {...register('lastName', { required: true })}
              defaultValue={defaultValues.lastName}
              className="input-text"
              type="lastName"
              placeholder="Last Name"
              name="lastName"
            />
            {errors.lastName && <p className="input-error">{editProfileTranslations[selectedLanguage].required}</p>}
          </div>
          <div className="form-section">
            <label htmlFor="email" className="input-label">
              {editProfileTranslations[selectedLanguage].email} *
            </label>
            <input
              {...register('email', { required: true })}
              defaultValue={defaultValues?.email || ''}
              className="input-text"
              type="email"
              placeholder="example@globalforestwatch.com"
              name="email"
            />
            {errors.email && <p className="input-error">{editProfileTranslations[selectedLanguage].required}</p>}
          </div>
          <div className="form-section">
            <p className="input-label">{editProfileTranslations[selectedLanguage].sector} *</p>
            <Controller
              {...register('sector', { required: true })}
              control={control}
              name="sector"
              defaultValue={defaultValues?.sector}
              render={({ field }) => (
                <Select {...field} native variant="outlined" className={clsx(selectClasses.root)}>
                  {sectorItems}
                </Select>
              )}
            />
            {errors.sector && <p className="input-error">{editProfileTranslations[selectedLanguage].required}</p>}
          </div>
          <div className="form-section">
            <p className="input-label">{editProfileTranslations[selectedLanguage].role} *</p>
            {watchSector && (
              <Controller
                control={control}
                name="subsector"
                defaultValue={defaultValues?.subsector}
                render={({ field }) => (
                  <RadioGroup defaultValue={defaultValues?.subsector} {...field} aria-label="subsector">
                    {roles()}
                  </RadioGroup>
                )}
              />
            )}
          </div>
          <div style={{ marginTop: '-10px' }}>
            {watchRole?.trim() === 'Other:' && (
              <input
                {...register('roleOther', { required: false })}
                defaultValue={
                  defaultValues?.subsector?.toLocaleLowerCase().includes('other')
                    ? defaultValues?.subsector?.split(':')[1]
                    : defaultValues?.subsector
                }
                className="input-text"
                type="roleOther"
                placeholder=""
                name="roleOther"
              />
            )}
          </div>
          <div className="form-section">
            <label htmlFor="jobTitle" className="input-label">
              {editProfileTranslations[selectedLanguage].jobTitle}
            </label>
            <input
              {...register('jobTitle', { required: false })}
              defaultValue={defaultValues?.jobTitle}
              className="input-text"
              type="jobTitle"
              placeholder="Job Title"
              name="jobTitle"
            />
          </div>
          <div className="form-section">
            <label htmlFor="company" className="input-label">
              {editProfileTranslations[selectedLanguage].company} *
            </label>
            <input
              {...register('company', { required: true })}
              defaultValue={defaultValues?.company}
              className="input-text"
              type="company"
              placeholder="Company / Organization"
              name="company"
            />
            {errors.company && <p className="input-error">{editProfileTranslations[selectedLanguage].required}</p>}
          </div>

          <h4>{editProfileTranslations[selectedLanguage].located}</h4>
          <MemoCountryPicker
            countryLabel={editProfileTranslations[selectedLanguage].country}
            defaultCountry={defaultValues.country}
            activeCountryCallback={(id: string) => setActiveCountry(id)}
          />

          <div className="form-section">
            <label htmlFor="city" className="input-label">
              {editProfileTranslations[selectedLanguage].city}
            </label>
            <input
              {...register('city', { required: false })}
              defaultValue={defaultValues?.city}
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
              defaultValue={defaultValues?.state}
              className="input-text"
              type="state"
              placeholder="State / Department / Province"
              name="state"
            />
          </div>
          <h4>{editProfileTranslations[selectedLanguage].interest}</h4>
          <MemoCountryPicker
            countryLabel={editProfileTranslations[selectedLanguage].country}
            defaultCountry={defaultValues?.aoiCountry}
            activeCountryCallback={(id: any): any => setInterestActiveCountry(id)}
          />

          <div className="form-section">
            <label htmlFor="aoiCity" className="input-label">
              {editProfileTranslations[selectedLanguage].city}
            </label>
            <input
              {...register('aoiCity', { required: false })}
              defaultValue={defaultValues?.aoiCity}
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
              defaultValue={defaultValues?.aoiState}
              className="input-text"
              type="aoiState"
              placeholder="State / Department / Province"
              name="aoiState"
            />
          </div>
          <div className="form-section">
            <p className="input-label">{editProfileTranslations[selectedLanguage].topics} *</p>
            <p className="input-sublabel">{editProfileTranslations[selectedLanguage].selectAll}</p>

            <select
              {...register('interests', { required: true })}
              className="multi-select"
              multiple
              onChange={handleTopics}
            >
              {topics[selectedLanguage].map((topic, i: number) => {
                return (
                  <option
                    selected={defaultValues?.interests?.includes(topic.id)}
                    className="multi-option"
                    key={i}
                    value={topic.id}
                  >
                    {topic.label}
                  </option>
                );
              })}
            </select>
            {errors.interests && <p className="input-error">{editProfileTranslations[selectedLanguage].required}</p>}
          </div>
          <div className="form-section">
            <p className="input-label">{editProfileTranslations[selectedLanguage].howUse} *</p>
            <p className="input-sublabel">{editProfileTranslations[selectedLanguage].selectAll}</p>
            <select
              {...register('howDoYouUse', { required: true })}
              className="multi-select"
              multiple
              onChange={handleUsage}
            >
              {usage[selectedLanguage].map((usage, i: number) => {
                return (
                  <option
                    selected={defaultValues?.howDoYouUse?.includes(usage.id)}
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
            {errors.howDoYouUse && <p className="input-error">{editProfileTranslations[selectedLanguage].required}</p>}
          </div>
          {/* {updateError && <p className="input-error">{updateError}</p>} */}
          <input
            className="orange-button profile-submit"
            style={{
              backgroundColor: themeColor,
              marginTop: '30px',
              width: '200px',
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
              color: themeColor,
            }}
          >
            {editProfileTranslations[selectedLanguage].delete[0]}
          </a>{' '}
          {editProfileTranslations[selectedLanguage].delete[1]}
        </p>
      </div>
    </>
  );
}
export default ProfileForm;
