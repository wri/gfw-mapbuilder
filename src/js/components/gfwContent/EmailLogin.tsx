import React from 'react';
import { useForm } from 'react-hook-form';
import { setLoggedIn } from 'js/store/appState/actions';
import { useDispatch } from 'react-redux';

const defaultLoginURL =
  ' https://production-api.globalforestwatch.org/auth/login';
const checkLogURL =
  'https://production-api.globalforestwatch.org/auth/check-logged';
const registerURL = 'https://production-api.globalforestwatch.org/auth/sign-up';
const resetURL =
  'https://production-api.globalforestwatch.org/auth/reset-password';

export const EmailLogin = () => {
  const dispatch = useDispatch();
  const [showDefaultLogin, setShowDefaultLogin] = React.useState(true);
  const [showLostPassword, setShowLostPassword] = React.useState(false);
  const [showRegister, setShowRegister] = React.useState(false);
  const [registerSuccess, setRegisterSuccess] = React.useState(false);
  const [resetPasswordSuccess, setResetPasswordSuccess] = React.useState(false);

  const [defaultLoginError, setDefaultLoginError] = React.useState<
    boolean | string
  >(false);

  const { register, handleSubmit, errors } = useForm();

  type FormType = 'register' | 'default' | 'forgot';

  const handleFormSwitch = (id: FormType): void => {
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
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        //Early check for error that come in the response object
        if (data.errors && data.errors[0].detail) {
          setDefaultLoginError(data.errors[0].detail);
        }
        //Clear out local storage
        localStorage.clear();

        localStorage.setItem('userToken', data.data.token);

        const bearer = `Bearer ${data.data.token}`;

        fetch(checkLogURL, {
          method: 'GET',
          headers: {
            Authorization: bearer
          }
        })
          .then(res => res.json())
          .then(data => {
            dispatch(setLoggedIn(true));
          })
          .catch(e => console.error(e));
      })
      .catch(e => {
        setDefaultLoginError(e.errors[0].detail);
      });
  };

  const onRegisterSubmit = (data: any): void => {
    const payload = {
      apps: ['gfw'],
      email: data.email,
      password: data.password,
      repeatPassword: data.repeatPassword
    };

    fetch(registerURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.data && data.data?.id) {
          setRegisterSuccess(true);
        }
      })
      .catch(e => console.error(e));
  };

  const onForgotSubmit = (data: any): void => {
    fetch(resetURL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        //Early check for error that come in the response object
        if (data.errors && data.errors[0].detail) {
          setDefaultLoginError(data.errors[0].detail);
          setResetPasswordSuccess(false);
        } else {
          setResetPasswordSuccess(true);
        }
      })
      .catch(e => console.error(e));
  };

  return (
    <>
      {showDefaultLogin && (
        <div>
          <p>Default Email login</p>
          <form onSubmit={handleSubmit(onDefaultSubmit)}>
            <input
              type="email"
              placeholder="example@globalforestwatch.com"
              name="email"
              ref={register({ required: true })}
            />
            {errors.password && <span>This field is required</span>}
            <input
              type="password"
              placeholder="********"
              name="password"
              ref={register({ required: true })}
            />
            {errors.password && <span>This field is required</span>}
            <p onClick={() => handleFormSwitch('forgot')}>Forgot Password!</p>
            <p onClick={() => handleFormSwitch('register')}>
              Not a member? Sign Up!
            </p>
            {defaultLoginError && (
              <div>
                <span>{defaultLoginError}</span>
              </div>
            )}
            <input type="submit" value="Login" />
          </form>
        </div>
      )}
      {showRegister && (
        <div>
          <p>Register Flow</p>
          {!registerSuccess && (
            <form onSubmit={handleSubmit(onRegisterSubmit)}>
              <input
                type="email"
                placeholder="example@globalforestwatch.com"
                name="email"
                ref={register({ required: true })}
              />
              {errors.password && <span>This field is required</span>}
              <input
                type="password"
                placeholder="********"
                name="password"
                ref={register({ required: true })}
              />
              {errors.password && <span>This field is required</span>}
              <input
                type="password"
                placeholder="********"
                name="repeatPassword"
                ref={register({ required: true })}
              />
              {errors.repeatPassword && <span>This field is required</span>}
              <p onClick={() => handleFormSwitch('default')}>
                Already joined? Sign In!
              </p>
              {defaultLoginError && (
                <div>
                  <span>{defaultLoginError}</span>
                </div>
              )}
              <input type="submit" value="Register" />
            </form>
          )}
          {registerSuccess && (
            <div>
              Registered successful login
              <button onClick={() => handleFormSwitch('default')}>Login</button>
            </div>
          )}
        </div>
      )}
      {showLostPassword && (
        <div>
          <p>Forgot Flow</p>
          {!resetPasswordSuccess && (
            <form onSubmit={handleSubmit(onForgotSubmit)}>
              <input
                type="email"
                placeholder="example@globalforestwatch.com"
                name="email"
                ref={register({ required: true })}
              />
              {errors.email && <span>This field is required</span>}
              <p onClick={() => handleFormSwitch('default')}>
                Already joined? Sign In!
              </p>
              {defaultLoginError && (
                <div>
                  <span>{defaultLoginError}</span>
                </div>
              )}
              <input type="submit" value="Reset" />
            </form>
          )}
          {resetPasswordSuccess && (
            <div>
              RESET successful login
              <button onClick={() => handleFormSwitch('default')}>Login</button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
