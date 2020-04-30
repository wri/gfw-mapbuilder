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

  async function subscribeHandler(): Promise<void> {
    //const appID = new URL(window.location.href).searchParams.get('appid');
    ////Get the base and state urls
    //const baseUrl = new URL(window.location.href);
    //const stateUrl = await getShareableURL({ report: true });
    //const urlVal = appID
    //  ? `${baseUrl.href}&${stateUrl}`
    //  : `${baseUrl}?${stateUrl}`;
    //window.open(urlVal);
  }

  const colorTheme = customColorTheme?.length
    ? props.customColorTheme
    : '#f0ab00';

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
