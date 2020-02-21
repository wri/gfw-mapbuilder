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

  const renderContent = (): string => {
    if (selectedLanguage === language) {
      // * checks if selectedLanguage is the default language
      // * if so, returns default content.
      /**
       * ? QUESTION
       * ? Should we consider organizing custom content in the
       * ? resources.js so it's organized by component/language?
       * ? This could prevent future regressions
       */
      return narrative;
    } else {
      return alternativeNarrative;
    }
  };

  const tabViewIsVisible = tabViewVisible && activeTab === props.label;
  return (
    <>
      {tabViewIsVisible && (
        <div className="info-content-container">{renderContent()}</div>
      )}
    </>
  );
};

export default InfoTabView;
