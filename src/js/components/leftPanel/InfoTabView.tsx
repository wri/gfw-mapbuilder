import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store';

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

  const narrativeContent = (): string =>
    selectedLanguage === language ? narrative : alternativeNarrative;

  /**
   * ? QUESTION
   * ? Should we consider organizing custom content in the
   * ? resources.js so it's organized by component/language?
   * ? This could prevent future regressions
   */

  const tabViewIsVisible = tabViewVisible && activeTab === props.label;
  return (
    <>
      {tabViewIsVisible && (
        <div className="info-content-container">{narrativeContent}</div>
      )}
    </>
  );
};

export default InfoTabView;
