import * as React from 'react';
import { useState, useEffect } from 'react';
import 'css/leftpanel.scss';

//Tabs Related Imports TODO: extract those in separarate file/folder later
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'js/store/index';
import { selectActiveTab } from 'js/store/appState/actions';
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
  activeTab: string;
}

const Tab = (props: TabProps): React.ReactElement => {
  const dispatch = useDispatch();
  const tabIsActive =
    props.activeTab === props.label ? 'tab-button__active' : '';

  return (
    <button
      className={tabIsActive ? 'tab-button tab-button__active' : 'tab-button'}
      onClick={() => dispatch(selectActiveTab(props.label))}
    >
      <span className="tab-tooltip">{props.tooltipText}</span>
      <props.icon width={25} height={25} fill={'#555'} />
    </button>
  );
};

const Tabs = (): React.ReactElement => {
  //Default active tab
  const defaultActiveTab = useSelector(
    (store: RootState) => store.appSettings.defaultActiveTab
  );

  //Specific tabs that are optional and rendered per resources
  const renderDocTab = useSelector(
    (store: RootState) => store.appSettings.includeDocumentsTab
  );

  //Active Tab in the store
  const savedActiveTab = useSelector(
    (store: RootState) => store.appState.leftPanel.activeTab
  );
  //Current active tab default to the default one
  const [activeTab, setActiveTab] = useState('');

  //This probably should be in our default settings?
  const tabsArray = [
    {
      label: 'info',
      icon: InfoTabIcon,
      iconWidth: 20,
      iconHeight: 20,
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
      render: renderDocTab //coming from resources JS!renderInfoTab
    }
  ];

  //how do we figure out what is active tab? default or new, when to re-render etc?
  useEffect(() => {
    //check if we need to use default one or not
    const activeTabValue: any =
      activeTab === '' ? defaultActiveTab : savedActiveTab;
    setActiveTab(activeTabValue);
  }, [savedActiveTab]);

  const tabsToRender = tabsArray
    .filter(tab => tab.render)
    .map(tab => (
      <Tab
        key={tab.label}
        label={tab.label}
        tooltipText={tab.tooltipText}
        icon={tab.icon}
        activeTab={activeTab}
      />
    ));
  return <div className="tab-header-container">{tabsToRender}</div>;
};

const Tabview = () => {
  return null;
};

const LeftPanel = (): React.ReactElement => {
  return (
    <div className="left-panel">
      <Tabs />
      <Tabview />
    </div>
  );
};

export default LeftPanel;
