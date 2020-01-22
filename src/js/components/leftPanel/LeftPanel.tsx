import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'js/store/index';
import { selectActiveTab } from 'js/store/appState/actions';
import ReactTooltip from 'react-tooltip';
import 'css/leftpanel.scss';

//Tabs Related Imports TODO: extract those in separarate file/folder later
import { ReactComponent as LayersTabIcon } from 'images/layersTabIcon.svg';
import { ReactComponent as AnalysisTabIcon } from 'images/analysisTabIcon.svg';
import { ReactComponent as DataTabIcon } from 'images/dataTabIcon.svg';
import { ReactComponent as DocumentsTabIcon } from 'images/documentsTabIcon.svg';
import { ReactComponent as InfoTabIcon } from 'images/infoTabIcon.svg';
import { ReactComponent as MeasurementTabIcon } from 'images/MeasurementTabIcon.svg';

interface TabProps {
  key: string;
  label: string;
  icon: React.SFC<React.SVGProps<SVGSVGElement>>;
  tooltipText: string;
  activeTab: string | undefined;
}

// Individual TAB Logic
const Tab = (props: TabProps): React.ReactElement => {
  const dispatch = useDispatch();
  const tabIsActive =
    props.activeTab === props.label ? 'tab-button__active' : '';

  return (
    <>
      <button
        data-tip={props.label}
        data-offset="{'top': -5}"
        className={tabIsActive ? 'tab-button tab-button__active' : 'tab-button'}
        onClick={() => dispatch(selectActiveTab(props.label))}
      >
        <props.icon width={25} height={25} fill={'#555'} />
      </button>
      <ReactTooltip effect="solid" className="tab-tooltip" />
    </>
  );
};

// Tabs ROW Component Logic
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

  //Current active tab default to the default one
  const [activeTab, setActiveTab] = useState(savedActiveTab);

  //This probably should be in our default settings?

  //how do we figure out what is active tab? default or new, when to re-render etc?
  useEffect(() => {
    //check if we need to use default one or not
    if (savedActiveTab !== activeTab) {
      setActiveTab(savedActiveTab);
    }
  }, [savedActiveTab]);

  const tabsGroupRow = props.tabsToRender.map(tab => (
    <Tab
      key={tab.label}
      label={tab.label}
      tooltipText={tab.tooltipText}
      icon={tab.icon}
      activeTab={activeTab}
    />
  ));
  return <div className="tab-header-container">{tabsGroupRow}</div>;
};

// Tab View Logic
const TabViewContainer = (): React.ReactElement => {
  //Figure out which tab content we are showing
  //Active Tab in the store
  const savedActiveTab = useSelector(
    (store: RootState) => store.appState.leftPanel.activeTab
  );

  return (
    <div className="tabview-container">
      <div className={`tabview-${savedActiveTab}`}>
        <p>Here is the tabview content</p>
        <p>We are currently in tab: {savedActiveTab}</p>
      </div>
    </div>
  );
};

const LeftPanel = (): React.ReactElement => {
  //Specific tabs that are optional and rendered per resources
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
      label: 'measurement',
      icon: MeasurementTabIcon,
      tooltipText: 'Measurement',
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
      <TabViewContainer />
    </div>
  );
};

export default LeftPanel;
