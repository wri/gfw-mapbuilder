import React from 'react';
import { useForm } from 'react-hook-form';
import { setLoggedIn } from '../../../js/store/appState/actions';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../js/store';
import { emailLoginTranslations } from '../../../../configs/translations/staticOptions';

import '../../../css/formInputs.scss';
import { CHECK_LOGGED_URL } from './utils';
import { handleCustomColorTheme } from '../../../utils';

const defaultLoginURL = ' https://production-api.globalforestwatch.org/auth/login';
const registerURL = 'https://production-api.globalforestwatch.org/auth/sign-up';
const resetURL = 'https://production-api.globalforestwatch.org/auth/reset-password';

export const EmailLogin = () => {
  const dispatch = useDispatch();
  const [showDefaultLogin, setShowDefaultLogin] = React.useState(true);
  const [showLostPassword, setShowLostPassword] = React.useState(false);
  const [showRegister, setShowRegister] = React.useState(false);
  const [registerSuccess, setRegisterSuccess] = React.useState(false);
  const [resetPasswordSuccess, setResetPasswordSuccess] = React.useState(false);
  const [defaultLoginError, setDefaultLoginError] = React.useState<boolean | string>(false);

  const customColorTheme = useSelector((store: RootState) => store.appSettings.customColorTheme);

  const selectedLanguage = useSelector((store: RootState) => store.appState.selectedLanguage);

  const themeColor = handleCustomColorTheme(customColorTheme);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  type FormType = 'register' | 'default' | 'forgot';

  const handleFormSwitch = (id: FormType): void => {
    setRegisterSuccess(false);
    setDefaultLoginError(false);
    switch (id) {
      case 'register':
        setShowRegister(true);
        setShowDefaultLogin(false);
        setShowLostPassword(false);
        break;
      case 'default':
        setShowRegister(false);
        setShowDefaultLogin(true);
        setShowLostPassword(false);
        break;
      case 'forgot':
        setShowRegister(false);
        setShowDefaultLogin(false);
        setShowLostPassword(true);
        break;
      default:
        setShowRegister(false);
        setShowDefaultLogin(true);
        setShowLostPassword(false);
    }
  };

  const onDefaultSubmit = (data: any): void => {
    fetch(defaultLoginURL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //Early check for error that come in the response object
        if (data.errors && data.errors[0].detail) {
          setDefaultLoginError(data.errors[0].detail);
        }
        //Clear out local storage
        localStorage.clear();

        localStorage.setItem('userToken', data.data.token);

        const bearer = `Bearer ${data.data.token}`;

        fetch(CHECK_LOGGED_URL, {
          method: 'GET',
          headers: {
            Authorization: bearer,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem('userID', data.id);
            dispatch(setLoggedIn(true));
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => {
        setDefaultLoginError(e.errors[0].detail);
      });
  };

  const onRegisterSubmit = (data: any): void => {
    const payload = {
      apps: ['gfw'],
      email: data.email,
      password: data.password,
      repeatPassword: data.repeatPassword,
    };

    fetch(registerURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors && data.errors[0].detail) {
          setDefaultLoginError(data.errors[0].detail);
        }
        if (data.data && data.data?.id) {
          setRegisterSuccess(true);
        }
      })
      .catch((e) => console.error(e));
  };

  const onForgotSubmit = (data: any): void => {
    fetch(resetURL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //Early check for error that come in the response object
        if (data.errors && data.errors[0].detail) {
          setDefaultLoginError(data.errors[0].detail);
          setResetPasswordSuccess(false);
        } else {
          setResetPasswordSuccess(true);
        }
      })
      .catch((e) => console.error(e));
  };

  return (
    <div className="email-login-container">
      {showDefaultLogin && (
        <div>
          <form onSubmit={handleSubmit(onDefaultSubmit)}>
            <div className="form-section">
              <label htmlFor="email" className="input-label">
                {emailLoginTranslations[selectedLanguage].email} *
              </label>
              <input
                {...register('email', { required: true })}
                className="input-text"
                type="email"
                placeholder="example@globalforestwatch.com"
                name="email"
              />
              {errors.password && <p className="input-error">{emailLoginTranslations[selectedLanguage].required}</p>}
            </div>
            <div className="form-section">
              <label htmlFor="password" className="input-label">
                {emailLoginTranslations[selectedLanguage].password} *
              </label>
              <input
                {...register('password', { required: true })}
                className="input-text"
                type="password"
                placeholder="********"
                name="password"
              />
              {errors.password && <p className="input-error">{emailLoginTranslations[selectedLanguage].required}</p>}
            </div>
            <p className="input-forgot-pass" onClick={() => handleFormSwitch('forgot')}>
              {emailLoginTranslations[selectedLanguage].forgotPassword}
            </p>
            {defaultLoginError && (
              <div className="input-error">
                <span>{defaultLoginError}</span>
              </div>
            )}
            <div className="bottom-action">
              <button onClick={() => handleFormSwitch('register')}>
                {emailLoginTranslations[selectedLanguage].signup[0]}
                <b>{emailLoginTranslations[selectedLanguage].signup[1]}</b>
              </button>
              <input
                className="orange-button form-submit"
                style={{
                  backgroundColor: themeColor,
                  width: '6rem',
                  marginTop: 0,
                  fontSize: '0.8rem',
                }}
                type="submit"
                value={emailLoginTranslations[selectedLanguage].login}
              />
            </div>
          </form>
        </div>
      )}
      {showRegister && (
        <div>
          {!registerSuccess && (
            <form onSubmit={handleSubmit(onRegisterSubmit)}>
              <div className="form-section">
                <label htmlFor="email" className="input-label">
                  {emailLoginTranslations[selectedLanguage].email} *
                </label>
                <input
                  {...register('email', { required: true })}
                  type="email"
                  className="input-text"
                  placeholder="example@globalforestwatch.com"
                  name="email"
                />
                {errors.password && <p className="input-error">{emailLoginTranslations[selectedLanguage].required}</p>}
              </div>
              <div className="form-section">
                <label htmlFor="password" className="input-label">
                  {emailLoginTranslations[selectedLanguage].password} *
                </label>
                <input
                  {...register('password', { required: true })}
                  className="input-text"
                  type="password"
                  placeholder="********"
                  name="password"
                />
                {errors.password && <p className="input-error">{emailLoginTranslations[selectedLanguage].required}</p>}
              </div>
              <div className="form-section">
                <label htmlFor="password" className="input-label">
                  {emailLoginTranslations[selectedLanguage].repeatPassword} *
                </label>
                <input
                  {...register('repeatPassword', { required: true })}
                  className="input-text"
                  type="password"
                  placeholder="********"
                  name="repeatPassword"
                />
                {errors.password && <p className="input-error">{emailLoginTranslations[selectedLanguage].required}</p>}
              </div>
              {defaultLoginError && (
                <div className="input-error">
                  <span>{defaultLoginError}</span>
                </div>
              )}
              <div className="bottom-action">
                <button onClick={() => handleFormSwitch('default')}>
                  {emailLoginTranslations[selectedLanguage].signin[0]}
                  <b>{emailLoginTranslations[selectedLanguage].signin[1]}</b>
                </button>
                <input
                  className="orange-button form-submit"
                  style={{
                    backgroundColor: themeColor,
                    width: '6rem',
                    marginTop: 0,
                    fontSize: '0.8rem',
                  }}
                  type="submit"
                  value={emailLoginTranslations[selectedLanguage].register}
                />
              </div>
            </form>
          )}
          {registerSuccess && (
            <div className="register-success">
              <div className="tree-success"></div>
              <p>{emailLoginTranslations[selectedLanguage].registerSuccess}</p>
              <button
                className="orange-button form-submit"
                style={{
                  backgroundColor: themeColor,
                  width: '6rem',
                  marginTop: 0,
                  fontSize: '0.8rem',
                }}
                onClick={() => handleFormSwitch('default')}
              >
                {emailLoginTranslations[selectedLanguage].login}
              </button>
            </div>
          )}
        </div>
      )}
      {showLostPassword && (
        <div>
          {!resetPasswordSuccess && (
            <>
              <p style={{ marginTop: 0 }}>{emailLoginTranslations[selectedLanguage].passwordReset}</p>
              <form onSubmit={handleSubmit(onForgotSubmit)}>
                <div className="form-section">
                  <label htmlFor="email" className="input-label">
                    {emailLoginTranslations[selectedLanguage].email} *
                  </label>
                  <input
                    {...register('email', { required: true })}
                    className="input-text"
                    type="email"
                    placeholder="example@globalforestwatch.com"
                    name="email"
                  />
                  {errors.password && (
                    <p className="input-error">{emailLoginTranslations[selectedLanguage].required}</p>
                  )}
                </div>
                {defaultLoginError && (
                  <div className="input-error">
                    <span>{defaultLoginError}</span>
                  </div>
                )}
                <div className="bottom-action">
                  <button onClick={() => handleFormSwitch('default')}>
                    {emailLoginTranslations[selectedLanguage].signin[0]}
                    <b>{emailLoginTranslations[selectedLanguage].signin[1]}</b>
                  </button>
                  <input
                    type="submit"
                    value={emailLoginTranslations[selectedLanguage].reset}
                    className="orange-button form-submit"
                    style={{
                      backgroundColor: themeColor,
                      width: '6rem',
                      marginTop: 0,
                      fontSize: '0.8rem',
                    }}
                  />
                </div>
              </form>
            </>
          )}
          {resetPasswordSuccess && (
            <div className="register-success">
              <div className="tree-success"></div>
              <p>{emailLoginTranslations[selectedLanguage].passwordResetSuccess}</p>
              <button
                className="orange-button form-submit"
                style={{
                  backgroundColor: themeColor,
                  width: '6rem',
                  marginTop: 0,
                  fontSize: '0.8rem',
                  height: '35px',
                }}
                onClick={() => handleFormSwitch('default')}
              >
                {emailLoginTranslations[selectedLanguage].login}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
