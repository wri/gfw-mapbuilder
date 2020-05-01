import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store/index';
import 'css/subscribeButton.scss';

const subscribeButtonTranslations = {
  zh: '订阅',
  en: 'Subscribe',
  ka: 'გამოწერა',
  fr: "S'abonner",
  es: 'Subscribirse',
  pt: 'Inscrever-se',
  id: 'Subscribe'
};

export const SubscribeButton = (): JSX.Element => {
  const selectedLanguage = useSelector(
    (store: RootState) => store.appState.selectedLanguage
  );

  const customColorTheme = useSelector(
    (store: RootState) => store.appSettings.customColorTheme
  );

  function subscribeHandler(): void {
    //
  }

  const colorTheme = customColorTheme?.length ? customColorTheme : '#f0ab00';

  return (
    <button
      style={{ border: `1px solid ${colorTheme}` }}
      className="subscribe-button"
      onClick={subscribeHandler}
    >
      {subscribeButtonTranslations[selectedLanguage]}{' '}
      <div className="subscribe-icon"></div>
    </button>
  );
};
