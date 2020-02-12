import React, { FunctionComponent } from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { renderModal } from '../../store/appState/actions';
import { renderModal } from 'js/store/appState/actions';
import { mapController } from 'js/controllers/mapController';

interface LoginProps {
  loggedIn: boolean;
}

const GFWLogin = (props: LoginProps) => {
  const dispatch = useDispatch();
  console.log('propsprops', props);

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
