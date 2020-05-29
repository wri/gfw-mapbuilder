import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactTooltip from 'react-tooltip';

import { RootState } from 'js/store/index';
import {
  selectActiveTab,
  toggleTabviewPanel,
  setRenderGFWDropdown
} from 'js/store/appState/actions';

import TabViewContainer from './TabViewContainer';

import 'css/leftpanel.scss';

import { ReactComponent as LayersTabIcon } from 'images/layersTabIcon.svg';
import { ReactComponent as AnalysisTabIcon } from 'images/analysisTabIcon.svg';
import { ReactComponent as DataTabIcon } from 'images/dataTabIcon.svg';
import { ReactComponent as DocumentsTabIcon } from 'images/documentsTabIcon.svg';
import { ReactComponent as InfoTabIcon } from 'images/infoTabIcon.svg';
import { ReactComponent as HamburgerIcon } from 'images/hamburgerIcon.svg';

export interface TabProps {
  key: string;
  label: string;
  icon: React.SFC<React.SVGProps<SVGSVGElement>>;
  tooltipText: string;
  activeTab: string;
  documentFlashingActive: boolean;
  setDocumentFlashing: (isFlashing: boolean) => void;
  analysisFlashingActive: boolean;
  setAnalysisFlashing: (isFlashing: boolean) => void;
}

// Individual TAB Logic
const Tab = (props: TabProps): React.ReactElement => {
  const {
    activeTab,
    label,
    icon: Icon,
    documentFlashingActive,
    setDocumentFlashing,
    analysisFlashingActive,
    setAnalysisFlashing
  } = props;

  const dispatch = useDispatch();

  const tabViewVisible = useSelector(
    (store: RootState) => store.appState.leftPanel.tabViewVisible
  );

  const savedActiveTab = useSelector(
    (store: RootState) => store.appState.leftPanel.activeTab
  );

  const setFlashingTab = (): void => {
    if (label === 'documents') {
      setDocumentFlashing(false);
    }
    if (label === 'analysis') {
      setAnalysisFlashing(false);
    }
  };

  function handleTabClick(): void {
    setFlashingTab();
    if (savedActiveTab === label) {
      dispatch(toggleTabviewPanel(!tabViewVisible));
    } else {
      dispatch(selectActiveTab(label));
      dispatch(toggleTabviewPanel(true));
    }
  }

  const setClassName = (): string => {
    if (documentFlashingActive) {
      return 'doc-flash-icon';
    } else if (analysisFlashingActive) {
      return 'analysis-flash-icon';
    } else {
      return '';
    }
  };

  useEffect(() => {
    setFlashingTab();
  }, [label]);

  return (
    <>
      <button
        data-tip={label}
        data-offset="{'top': -5}"
        className={
          label === activeTab && tabViewVisible
            ? 'tab-button tab-button__active'
            : 'tab-button'
        }
        aria-label="left panel tab"
        onClick={handleTabClick}
      >
        <Icon width={25} height={25} fill={'#555'} className={setClassName()} />
        {documentFlashingActive && <span className="yellow-alert" />}
        {analysisFlashingActive && <span className="yellow-alert" />}
      </button>
      <ReactTooltip effect="solid" className="tab-tooltip" />
    </>
  );
};

interface TabRenderObject {
  label: string;
  icon: React.SFC<React.SVGProps<SVGSVGElement>>;
  tooltipText: string;
  render: boolean | undefined;
}

interface TabsProps {
  tabsToRender: TabRenderObject[];
}

const Tabs = (props: TabsProps): React.ReactElement => {
  const [documentFlashing, setDocumentFlashing] = useState(false);
  const [analysisFlashing, setAnalysisFlashing] = useState(false);
  //Active Tab in the store
  const savedActiveTab = useSelector(
    (store: RootState) => store.appState.leftPanel.activeTab
  );

  const activeFeatures = useSelector(
    (store: RootState) => store.mapviewState.activeFeatures
  );

  const activeFeatureIndex = useSelector(
    (store: RootState) => store.mapviewState.activeFeatureIndex
  );

  const [featureCollectionIndex, featureIndex] = activeFeatureIndex;

  const specificFeature =
    activeFeatures[featureCollectionIndex]?.features[featureIndex];

  useEffect(() => {
    if (specificFeature) {
      if (savedActiveTab !== 'documents') {
        setDocumentFlashing(true);
      }

      if (savedActiveTab !== 'analysis') {
        setAnalysisFlashing(true);
      }
    }
  }, [specificFeature]);

  const tabsGroupRow = props.tabsToRender.map(tab => {
    const documentFlashingActive =
      tab.label === 'documents' && documentFlashing;
    const analysisFlashingActive = tab.label === 'analysis' && analysisFlashing;

    return (
      <Tab
        key={tab.label}
        label={tab.label}
        tooltipText={tab.tooltipText}
        icon={tab.icon}
        activeTab={savedActiveTab}
        documentFlashingActive={documentFlashingActive}
        setDocumentFlashing={setDocumentFlashing}
        analysisFlashingActive={analysisFlashingActive}
        setAnalysisFlashing={setAnalysisFlashing}
      />
    );
  });

  return <div className="tab-header-container">{tabsGroupRow}</div>;
};

const LeftPanel = (): React.ReactElement => {
  const dispatch = useDispatch();
  const hideWidgetActive = useSelector(
    (store: RootState) => store.appState.hideWidgetActive
  );
  const renderGFWDropdown = useSelector(
    (store: RootState) => store.appState.renderGFWDropdown
  );
  const renderDocTab = useSelector(
    (store: RootState) => store.appSettings.includeDocumentsTab
  );
  const narrative = useSelector(
    (store: RootState) => store.appSettings.narrative
  );
  const alternativeNarrative = useSelector(
    (store: RootState) => store.appSettings.alternativeNarrative
  );

  const renderInfoTab =
    narrative.length || alternativeNarrative.length ? true : false;

  //Rendering instructions should be likely driven by our config
  const tabsArray = [
    {
      label: 'info',
      icon: InfoTabIcon,
      tooltipText: 'Info',
      render: renderInfoTab
    },
    {
      label: 'layers',
      icon: LayersTabIcon,
      tooltipText: 'Layers',
      render: true
    },
    {
      label: 'data',
      icon: DataTabIcon,
      tooltipText: 'Data',
      render: true
    },
    {
      label: 'analysis',
      icon: AnalysisTabIcon,
      tooltipText: 'Analysis',
      render: true
    },

    {
      label: 'documents',
      icon: DocumentsTabIcon,
      tooltipText: 'Documents',
      render: renderDocTab //Example of it coming from resources file
    },
    {
      label: 'menu',
      icon: HamburgerIcon,
      tooltipText: 'Menu',
      render: true
    }
  ];

  const tabsToRender = tabsArray.filter(tab => tab.render);

  const closeGFWDropdown = () => {
    if (renderGFWDropdown) {
      dispatch(setRenderGFWDropdown(false));
    }
  };

  return (
    <div
      className={`left-panel ${hideWidgetActive ? 'hide' : ''}`}
      onClick={() => closeGFWDropdown()}
    >
      <Tabs tabsToRender={tabsToRender} />
      <TabViewContainer tabViewsToRender={tabsToRender} />
    </div>
  );
};

export default LeftPanel;
