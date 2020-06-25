import React from 'react';
import { useForm } from 'react-hook-form';
import { setLoggedIn } from 'js/store/appState/actions';
import { useDispatch } from 'react-redux';

const defaultLoginURL =
  ' https://production-api.globalforestwatch.org/auth/login';
const checkLogURL =
  'https://production-api.globalforestwatch.org/auth/check-logged';

export const EmailLogin = () => {
  const dispatch = useDispatch();
  const [showDefaultLogin, setShowDefaultLogin] = React.useState(true);
  const [showLostPassword, setShowLostPassword] = React.useState(false);
  const [showRegister, setShowRegister] = React.useState(false);

  const [defaultLoginError, setDefaultLoginError] = React.useState<
    boolean | string
  >(false);

  const { register, handleSubmit, errors } = useForm();
  const onDefaultSubmit = (data: any) => {
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
            {defaultLoginError && (
              <div>
                <p>Forgot Password!</p>
                <span>{defaultLoginError}</span>
              </div>
            )}
            <input type="submit" />
          </form>
        </div>
      )}
    </>
  );
};
