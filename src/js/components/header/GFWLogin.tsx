import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { renderModal } from 'js/store/appState/actions';

import GFWLoginWidget from 'js/components/mapWidgets/widgetContent/myGFWContent';

import { ReactComponent as UserIcon } from 'images/userIcon.svg';

interface LoginProps {
  loggedIn: boolean;
}

const GFWLogin = (props: LoginProps): JSX.Element => {
  const dispatch = useDispatch();
  const [renderDropdown, setRenderDropdown] = useState(false);
  return (
    <div className="gfw-login-container">
      <button
        className="gfw-login-button"
        onClick={(): void => setRenderDropdown(!renderDropdown)}
      >
        <UserIcon height={15} width={15} />
        <p> {props.loggedIn ? 'MY GFW' : 'Login to MY GFW'}</p>
      </button>
      {renderDropdown && (
        <div className="dropdown-wrapper">
          <GFWLoginWidget />
        </div>
      )}
    </div>
  );
};

export default GFWLogin;
