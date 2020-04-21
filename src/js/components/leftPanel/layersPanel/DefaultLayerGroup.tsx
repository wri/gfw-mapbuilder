import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import GenericLayerControl from './GenericLayerControl';

import { RootState } from 'js/store';
import { setOpenLayerGroup } from 'js/store/appState/actions';

interface LayerGroupProps {
  layerGroupKey: string;
  layerGroupConfig: any;
}

const DefaultLayerGroup = (props: LayerGroupProps): React.ReactElement => {
  const { selectedLanguage, leftPanel } = useSelector(
    (store: RootState) => store.appState
  );

  const { allAvailableLayers } = useSelector(
    (store: RootState) => store.mapviewState
  );

  const dispatch = useDispatch();
  const { layerGroupKey, layerGroupConfig } = props;
  //If layer group is nested, layer ids are also nested, so find those appropriatly
  console.log(layerGroupKey);
  const groupLayerIds = layerGroupConfig.layers.map((layer: any) => layer.id);
  const layerGroupTitle =
    layerGroupConfig.label?.[selectedLanguage] || 'Untranslated Layer Group';
  const groupOpen = leftPanel.openLayerGroup === layerGroupKey;

  const handleGroupToggle = () => {
    const openGroupKey = groupOpen ? '' : layerGroupKey;
    dispatch(setOpenLayerGroup(openGroupKey));
  };

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
        <button className="caret-button" onClick={handleGroupToggle}>
          {groupOpen ? '▼' : '▲'}
        </button>
      </div>
      <div className={groupOpen ? 'layers-control-container' : 'hidden'}>
        {allAvailableLayers
          .filter(l => groupLayerIds.includes(l.id))
          .map(layer => (
            <GenericLayerControl id={layer.id} key={layer.id} />
          ))}
      </div>
    </div>
  );
};

export default DefaultLayerGroup;
