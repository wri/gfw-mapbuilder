import * as React from 'react';
import InfoTabView from './InfoTabView';
import LayerTabView from './layersPanel/LayersTabView';
import DataTabView from './dataPanel/DataTabView';
import AnalysisTabView from './analysisPanel/AnalysisTabView';
import DocumentsTabView from './DocumentsTabView';
import MenuTabView from './MenuTabView';

interface TabViewRender {
  label: string;
  icon: React.SFC<React.SVGProps<SVGSVGElement>>;
  tooltipText: string;
  render: boolean;
}

//TODO: We need to figure out how to integrate Typescript, Component Props and Redux
interface TabViewContainerProps {
  tabViewsToRender: any[];
}

class TabViewContainer extends React.Component<TabViewContainerProps, {}> {
  render() {
    const TabViews = this.props.tabViewsToRender.map(
      (tabView: TabViewRender) => {
        switch (tabView.label) {
          case 'info':
            return <InfoTabView label={tabView.label} key={tabView.label} />;
          case 'layers':
            return <LayerTabView label={tabView.label} key={tabView.label} />;
          case 'data':
            return <DataTabView label={tabView.label} key={tabView.label} />;
          case 'analysis':
            return (
              <AnalysisTabView label={tabView.label} key={tabView.label} />
            );
          case 'documents':
            return (
              <DocumentsTabView label={tabView.label} key={tabView.label} />
            );
          case 'menu':
            return <MenuTabView label={tabView.label} key={tabView.label} />;
          default:
            break;
        }
      }
    );
    return TabViews;
  }
}

export default TabViewContainer;
