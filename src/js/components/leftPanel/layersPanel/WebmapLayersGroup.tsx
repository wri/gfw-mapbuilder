import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { RootState } from 'js/store';
import { setOpenLayerGroup } from 'js/store/appState/actions';
import GenericLayerControl from './GenericLayerControl';
import { layerIsInScale } from 'js/helpers/layerScaleCheck';

//Memo Selectors
const allAvailableLayersSelector = (state: RootState) =>
  state.mapviewState.allAvailableLayers;
const webmapLayerSelector = createSelector(
  [allAvailableLayersSelector],
  layers => layers.filter(layer => layer.group === 'webmap')
);

interface LayerGroupProps {
  layerGroupKey: string;
  layerGroupConfig: any;
}

const WebmapLayersGroup = (props: LayerGroupProps): React.ReactElement => {
  const openLayerGroup = useSelector(
    (store: RootState) => store.appState.leftPanel.openLayerGroup
  );

  const selectedLanguage = useSelector(
    (store: RootState) => store.appState.selectedLanguage
  );

  const scale = useSelector((store: RootState) => store.mapviewState.scale);

  const webmapLayers = useSelector(webmapLayerSelector);
  const webmapLayersInScale = webmapLayers.filter(l =>
    layerIsInScale(l, scale)
  );

  const language = useSelector(
    (store: RootState) => store.appSettings.language
  );
  const webmapMenuName = useSelector(
    (store: RootState) => store.appSettings.webmapMenuName
  );
  const alternativeWebmapMenuName = useSelector(
    (store: RootState) => store.appSettings.alternativeWebmapMenuName
  );

  const dispatch = useDispatch();

  const { layerGroupKey } = props;

  const webmapNameToUse =
    language === selectedLanguage ? webmapMenuName : alternativeWebmapMenuName;
  const layerGroupTitle = webmapNameToUse || 'Webmap Group';

  const groupOpen = openLayerGroup === layerGroupKey;

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
        {webmapLayersInScale.map((layer, i) => (
          <GenericLayerControl
            layer={layer}
            sublayer={layer.sublayer}
            parentID={layer.parentID}
            id={layer.id}
            key={`${layer.id} + ${i}`}
            type="default"
          />
        ))}
      </div>
    </div>
  );
};

export default WebmapLayersGroup;
