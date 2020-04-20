import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'js/store';
import { setOpenLayerGroup } from 'js/store/appState/actions';

import { mapController } from 'js/controllers/mapController';

import { basemapLayersContent } from 'configs/leftPanel.translations';

interface DefaultBasemapProps {
  layerInfo: {
    id: string;
    thumbnailUrl: string;
    title: string;
    activeBasemap: string;
  };
}

const BaseLayerControl = (props: any) => {
  const { id, thumbnailUrl, templateUrl, title, years } = props.layerInfo;
  return (
    <div className="layer-basemap">
      <img src={thumbnailUrl} alt="basemap" />
      <span>{title[props.selectedLanguage]}</span>
      {years && <div>year dropdown</div>}
    </div>
  );
};

const GenericBaseLayerControl = ({
  layerInfo
}: DefaultBasemapProps): JSX.Element => {
  const { id, thumbnailUrl, title, activeBasemap } = layerInfo;
  return (
    <div
      className={`layer-basemap ${activeBasemap === id ? 'selected' : ''}`}
      onClick={(): void => mapController.setActiveBasemap(id)}
    >
      <img src={thumbnailUrl} alt="basemap" />
      <span>{title}</span>
    </div>
  );
};

interface LayerGroupProps {
  layerGroupKey: string;
  layerGroupConfig: any;
}

const BasemapLayersGroup = (props: LayerGroupProps): React.ReactElement => {
  const { selectedLanguage, leftPanel } = useSelector(
    (store: RootState) => store.appState
  );
  const { activeBasemap } = useSelector(
    (store: RootState) => store.mapviewState
  );

  const dispatch = useDispatch();
  const { layerGroupKey, layerGroupConfig } = props;

  const layerGroupTitle = layerGroupConfig.label?.[selectedLanguage];

  const groupOpen = leftPanel.openLayerGroup === layerGroupKey;

  const handleGroupToggle = () => {
    const openGroupKey = groupOpen ? '' : layerGroupKey;
    dispatch(setOpenLayerGroup(openGroupKey));
  };

  const basemapsToRender = layerGroupConfig.layers.map((baselayer: any) => (
    // * NOTE: these are custom Basemap layers that are set via resources.js
    <BaseLayerControl
      key={baselayer.id}
      layerInfo={baselayer}
      selectedLanguage={selectedLanguage}
    />
  ));

  const esriBasemapsToRender = basemapLayersContent.defaultESRIBasemaps.map(
    // * NOTE: these are generic Basemap layers that exist across custom maps
    (baselayer: any) => (
      <GenericBaseLayerControl
        key={baselayer.id}
        layerInfo={{
          id: baselayer.id,
          thumbnailUrl: baselayer.thumbnailUrl,
          title: baselayer.title[selectedLanguage],
          activeBasemap
        }}
      />
    )
  );

  return (
    <div className="layer-group-container">
      <div
        className="layer-group-title"
        onClick={handleGroupToggle}
        onKeyPress={handleGroupToggle}
        role="button"
        tabIndex={0}
      >
        <span>{layerGroupTitle}</span>
        <button className="caret-button">{groupOpen ? '▼' : '▲'}</button>
      </div>
      <div className={groupOpen ? 'layers-control-container' : 'hidden'}>
        {basemapsToRender}
        {esriBasemapsToRender}
      </div>
    </div>
  );
};

export default BasemapLayersGroup;
