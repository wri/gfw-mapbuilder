import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GFWLoginOptions from '../../../js/components/mapWidgets/widgetContent/GFWLoginOptions';
import { RootState } from '../../../js/store';
import { UserIcon } from '../../../images/userIcon';
import { setRenderGFWDropdown } from '../../../js/store/appState/actions';
import { headerContent } from '../../../../configs/translations/header.translations';

interface LoginProps {
  loggedIn: boolean;
}

const GFWLoginDropdown = (props: LoginProps): JSX.Element => {
  const dispatch = useDispatch();
  const dropdownButtonRef = React.useRef<HTMLDivElement | null>(null);

  const renderGFWDropdown = useSelector(
    (state: RootState) => state.appState.renderGFWDropdown
  );

  const selectedLanguage = useSelector(
    (store: RootState) => store.appState.selectedLanguage
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
        <p>
          {props.loggedIn
            ? headerContent[selectedLanguage].myGFW
            : headerContent[selectedLanguage].myGFWLogin}
        </p>
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
