import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'js/store/index';
import { selectActiveTab, toggleTabviewPanel } from 'js/store/appState/actions';
import ReactTooltip from 'react-tooltip';
import TabViewContainer from './TabViewContainer';
import 'css/leftpanel.scss';

import { ReactComponent as LayersTabIcon } from 'images/layersTabIcon.svg';
import { ReactComponent as AnalysisTabIcon } from 'images/analysisTabIcon.svg';
import { ReactComponent as DataTabIcon } from 'images/dataTabIcon.svg';
import { ReactComponent as DocumentsTabIcon } from 'images/documentsTabIcon.svg';
import { ReactComponent as InfoTabIcon } from 'images/infoTabIcon.svg';

export interface TabProps {
  key: string;
  label: string;
  icon: React.SFC<React.SVGProps<SVGSVGElement>>;
  tooltipText: string;
  activeTab: string;
}

// Individual TAB Logic
const Tab = (props: TabProps): React.ReactElement => {
  const { activeTab, label, icon: Icon } = props;

  const dispatch = useDispatch();

  const tabViewVisible = useSelector(
    (store: RootState) => store.appState.leftPanel.tabViewVisible
  );

  const savedActiveTab = useSelector(
    (store: RootState) => store.appState.leftPanel.activeTab
  );

  function handleTabClick(): void {
    if (savedActiveTab === label) {
      dispatch(toggleTabviewPanel(!tabViewVisible));
    } else {
      dispatch(selectActiveTab(label));
      dispatch(toggleTabviewPanel(true));
    }
  }

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
        onClick={handleTabClick}
      >
        <Icon width={25} height={25} fill={'#555'} />
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
  //Active Tab in the store
  const savedActiveTab = useSelector(
    (store: RootState) => store.appState.leftPanel.activeTab
  );

  const tabsGroupRow = props.tabsToRender.map(tab => (
    <Tab
      key={tab.label}
      label={tab.label}
      tooltipText={tab.tooltipText}
      icon={tab.icon}
      activeTab={savedActiveTab}
    />
  ));
  return <div className="tab-header-container">{tabsGroupRow}</div>;
};

const LeftPanel = (): React.ReactElement => {
  //Tab view visibility state that is controlled by tabs (clicking on same tab twice in a row, hides the tabview)
  // const tabViewVisible = useSelector(
  //   (store: RootState) => store.appState.leftPanel.tabViewVisible
  // );
  const renderDocTab = useSelector(
    (store: RootState) => store.appSettings.includeDocumentsTab
  );
  //Rendering instructions should be likely driven by our config
  const tabsArray = [
    {
      label: 'info',
      icon: InfoTabIcon,
      tooltipText: 'Info',
      render: true
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
    }
  ];

  const tabsToRender = tabsArray.filter(tab => tab.render);

  return (
    <div className="left-panel">
      <Tabs tabsToRender={tabsToRender} />
      <TabViewContainer tabViewsToRender={tabsToRender} />
    </div>
  );
};

export default LeftPanel;
