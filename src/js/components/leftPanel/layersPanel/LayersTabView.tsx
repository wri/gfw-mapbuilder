import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store';
import { mapController } from 'js/controllers/mapController';
import 'css/leftpanel.scss';
import WebmapLayersGroup from './WebmapLayersGroup';
import BasemapLayersGroup from './BasemapLayersGroup';
import DefaultLayerGroup from './DefaultLayerGroup';
import ImageryLayersGroup from './ImageryLayersGroup';

const AllLayerControls = () => {
  return (
    <div className="all-layer-control-container">
      <span>Layers</span>
      <button onClick={() => mapController.clearAllLayers()}>Clear All</button>
      <button onClick={() => mapController.selectAllLayers()}>
        Select All
      </button>
    </div>
  );
};

interface LayersTabViewProps {
  key: string;
  label: string;
}
const LayersTabView = (props: LayersTabViewProps) => {
  const { activeTab, tabViewVisible } = useSelector(
    (store: RootState) => store.appState.leftPanel
  );
  const { hideWidgetActive } = useSelector(
    (store: RootState) => store.appState
  );

  const { layerPanel } = useSelector((store: RootState) => store.appSettings);
  const tabViewIsVisible = tabViewVisible && activeTab === props.label;
  const layerGroupsToRender = Object.keys(layerPanel)
    .sort((a: string, b: string) => layerPanel[a].order - layerPanel[b].order)
    .map((layerGroupKey: string) => {
      switch (layerGroupKey) {
        case 'GROUP_WEBMAP':
          return (
            <WebmapLayersGroup
              key={layerGroupKey}
              layerGroupKey={layerGroupKey}
              layerGroupConfig={layerPanel[layerGroupKey]}
            />
          );
        case 'GROUP_BASEMAP':
          return (
            <BasemapLayersGroup
              key={layerGroupKey}
              layerGroupKey={layerGroupKey}
              layerGroupConfig={layerPanel[layerGroupKey]}
            />
          );
        case 'GROUP_IMAGERY':
          return (
            <ImageryLayersGroup
              key={layerGroupKey}
              layerGroupKey={layerGroupKey}
              layerGroupConfig={layerPanel[layerGroupKey]}
            />
          );
        case 'extraLayers':
          return null;
        default:
          return (
            <DefaultLayerGroup
              key={layerGroupKey}
              layerGroupKey={layerGroupKey}
              layerGroupConfig={layerPanel[layerGroupKey]}
            />
          );
      }
    });
  return (
    <>
      {tabViewIsVisible && (
        <div
          className={
            hideWidgetActive ? 'hide tabview-container' : 'tabview-container'
          }
        >
          <AllLayerControls />
          {layerGroupsToRender}
        </div>
      )}
    </>
  );
};

export default LayersTabView;
