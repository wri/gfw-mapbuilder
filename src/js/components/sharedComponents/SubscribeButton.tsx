import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { renderModal } from '../../../js/store/appState/actions';
import { RootState } from '../../../js/store/index';

import '../../../css/subscribeButton.scss';

const subscribeButtonTranslations = {
  zh: '保存到“我的 GFW”中',
  en: 'save in my gfw',
  hy: 'save in my gfw', // * NOTE: translation not provided
  nl: 'save in my gfw', // * NOTE: translation not provided
  ka: 'გამოწერა',
  fr: 'enregistrer',
  es: 'guardar en My GFW',
  pt: 'salvar no meu GFW',
  id: 'simpan di gfw saya'
};

export const SubscribeButton = (): JSX.Element => {
  const dispatch = useDispatch();
  const selectedLanguage = useSelector(
    (store: RootState) => store.appState.selectedLanguage
  );

  const customColorTheme = useSelector(
    (store: RootState) => store.appSettings.customColorTheme
  );

  const activeFeatures = useSelector(
    (store: RootState) => store.mapviewState.activeFeatures
  );
  const activeFeatureIndex = useSelector(
    (store: RootState) => store.mapviewState.activeFeatureIndex
  );

  //Subscriptions are disabled for point and polyline features
  const selectedFeature =
    activeFeatures[activeFeatureIndex[0]].features[activeFeatureIndex[1]];
  const selectedFeatureType = selectedFeature.geometry.type;
  const subscribeDisabled =
    selectedFeatureType === 'point' || selectedFeatureType === 'polyline';
  const backgroundColor = subscribeDisabled ? '#b9b9b9' : 'white';

  return (
    <>
      <span
        data-tip={'Subscriptions disabled for point and line features'}
        data-offset="{'top': -5}"
      >
        <button
          disabled={subscribeDisabled}
          style={{
            border: `1px solid ${customColorTheme}`,
            backgroundColor: `${backgroundColor}`
          }}
          className="subscribe-button"
          onClick={(): any => dispatch(renderModal('SaveAOI'))}
        >
          {subscribeButtonTranslations[selectedLanguage]}{' '}
          <div className="subscribe-icon"></div>
        </button>
      </span>
      <ReactTooltip
        effect="solid"
        className="tab-tooltip"
        disable={!subscribeDisabled}
      />
    </>
  );
};
