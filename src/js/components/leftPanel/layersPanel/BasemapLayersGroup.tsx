import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'js/store';
import { setOpenLayerGroup } from 'js/store/appState/actions';

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

interface LayerGroupProps {
  layerGroupKey: string;
  layerGroupConfig: any;
}

const BasemapLayersGroup = (props: LayerGroupProps): React.ReactElement => {
  const { selectedLanguage, leftPanel } = useSelector(
    (store: RootState) => store.appState
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
    <BaseLayerControl
      key={baselayer.id}
      layerInfo={baselayer}
      selectedLanguage={selectedLanguage}
    />
  ));

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
      </div>
    </div>
  );
};

export default BasemapLayersGroup;
