import React, { FunctionComponent } from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { renderModal } from '../../store/appState/actions';
import { renderModal } from 'js/store/appState/actions';
import { mapController } from 'js/controllers/mapController';

interface DropProps {
  language: string;
  alternativeLanguage: string;
  selectedLanguage: string;
}

const GFWLogin = (props: DropProps) => {
  const dispatch = useDispatch();
  // const [loginDisplayed, setLoginDisplayed] = useState(false);

  return (
    <div className="gfw-login-container">
      {/* <button onClick={(e: React.MouseEvent<HTMLElement>) => setLoginDisplayed(!loginDisplayed)}>Login to MY GFW</button> */}
      <button
        className="gfw-login-button"
        onClick={() => dispatch(renderModal('GFWLoginWidget'))}
      ></button>
      {/* <ul className={`login-modal ${!loginDisplayed ? 'hidden' : ''}`}>
          <li>Twitter</li>
          <li>FB</li>
          <li>Google</li>
        </ul> */}
    </div>
  );
};

export default GFWLogin;
