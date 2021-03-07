import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../js/store';

interface Props {
  key: string;
  label: string;
}

const InfoTabView = (props: Props) => {
  const { activeTab, tabViewVisible } = useSelector(
    (store: RootState) => store.appState.leftPanel
  );
  const { language, narrative, alternativeNarrative } = useSelector(
    (store: RootState) => store.appSettings
  );
  const { selectedLanguage } = useSelector(
    (store: RootState) => store.appState
  );

  const narrativeContent =
    selectedLanguage === language ? narrative : alternativeNarrative;

  const tabViewIsVisible = tabViewVisible && activeTab === props.label;
  return (
    <>
      {tabViewIsVisible && (
        <div
          className="info-content-container"
          dangerouslySetInnerHTML={{ __html: narrativeContent }}
        />
      )}
    </>
  );
};

export default InfoTabView;
