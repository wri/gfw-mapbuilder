import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GFWLoginWidget from 'js/components/mapWidgets/widgetContent/myGFWContent';

import { RootState } from 'js/store';
import { setRenderGFWDropdown } from 'js/store/appState/actions';

import { ReactComponent as UserIcon } from 'images/userIcon.svg';

interface LoginProps {
  loggedIn: boolean;
}

const GFWLogin = (props: LoginProps): JSX.Element => {
  const dispatch = useDispatch();
  const renderGFWDropdown = useSelector(
    (state: RootState) => state.appState.renderGFWDropdown
  );

  return (
    <div className="gfw-login-container">
      <button
        className="gfw-login-button"
        onClick={() => dispatch(setRenderGFWDropdown(!renderGFWDropdown))}
      >
        <UserIcon height={15} width={15} />
        <p> {props.loggedIn ? 'MY GFW' : 'Login to MY GFW'}</p>
      </button>
      {renderGFWDropdown && (
        <div className="dropdown-wrapper">
          <GFWLoginWidget />
        </div>
      )}
    </div>
  );
};

export default GFWLogin;
