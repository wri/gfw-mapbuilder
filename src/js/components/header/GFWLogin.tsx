import React from 'react';
import { useDispatch } from 'react-redux';
import { renderModal } from 'js/store/appState/actions';

interface LoginProps {
  loggedIn: boolean;
}

const GFWLogin = (props: LoginProps): JSX.Element => {
  const dispatch = useDispatch();
  return (
    <div className="gfw-login-container">
      <button
        className="gfw-login-button"
        onClick={() => dispatch(renderModal('GFWLoginWidget'))}
      >
        {props.loggedIn ? 'MY GFW' : 'Login to MY GFW'}
      </button>
    </div>
  );
};

export default GFWLogin;
