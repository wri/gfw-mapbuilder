import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GFWLoginOptions from 'js/components/mapWidgets/widgetContent/GFWLoginOptions';
import { RootState } from 'js/store';
import { ReactComponent as UserIcon } from 'images/userIcon.svg';
import { setRenderGFWDropdown } from 'js/store/appState/actions';

interface LoginProps {
  loggedIn: boolean;
}

const GFWLoginDropdown = (props: LoginProps): JSX.Element => {
  const dispatch = useDispatch();
  const dropdownButtonRef = React.useRef<HTMLDivElement | null>(null);
  const renderGFWDropdown = useSelector(
    (state: RootState) => state.appState.renderGFWDropdown
  );

  function toggleGFWLoginOptions(): void {
    dispatch(setRenderGFWDropdown(!renderGFWDropdown));
  }

  return (
    <div className="gfw-login-container" ref={dropdownButtonRef}>
      <button
        onClick={toggleGFWLoginOptions}
        className={`gfw-login-button ${renderGFWDropdown ? 'grey' : ''}`}
      >
        <UserIcon height={15} width={15} />
        <p> {props.loggedIn ? 'MY GFW' : 'Login to MY GFW'}</p>
      </button>
      {renderGFWDropdown && (
        <div className="dropdown-wrapper">
          <GFWLoginOptions dropdownButtonRef={dropdownButtonRef} />
        </div>
      )}
    </div>
  );
};

export default GFWLoginDropdown;
