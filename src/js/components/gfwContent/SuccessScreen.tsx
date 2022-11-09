import React from 'react';
import { useSelector } from 'react-redux';
import { editProfileTranslations } from '../../../../configs/translations/staticOptions';
import { handleCustomColorTheme } from '../../../utils';
import { RootState } from '../../store';

interface Props {
  setUpdateSuccess: (val: boolean) => void;
}

export const SuccessScreen = ({ setUpdateSuccess }: Props) => {
  const selectedLanguage = useSelector((store: RootState) => store.appState.selectedLanguage);
  const customColorTheme = useSelector((store: RootState) => store.appSettings.customColorTheme);

  const themeColor = handleCustomColorTheme(customColorTheme);
  return (
    <div className="success-screen">
      <div className="tree-success"></div>
      <p>{editProfileTranslations[selectedLanguage].success[0]}</p>
      <p>
        {editProfileTranslations[selectedLanguage].success[1]}{' '}
        <a
          href="https://www.globalforestwatch.org/privacy-policy"
          style={{
            cursor: 'pointer',
            color: themeColor,
          }}
        >
          {editProfileTranslations[selectedLanguage].success[2]}
        </a>
        , {editProfileTranslations[selectedLanguage].success[3]}
      </p>
      <button
        className="orange-button profile-submit"
        onClick={() => setUpdateSuccess(false)}
        style={{
          backgroundColor: themeColor,
          marginTop: '30px',
          width: '200px',
        }}
      >
        {editProfileTranslations[selectedLanguage].back}
      </button>
    </div>
  );
};
