import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'js/store';
import { setOpenLayerGroup } from 'js/store/appState/actions';
import GenericLayerControl from './GenericLayerControl';

interface LayerGroupProps {
  layerGroupKey: string;
  layerGroupConfig: any;
}

const ImageryLayersGroup = (props: LayerGroupProps): React.ReactElement => {
  const { selectedLanguage, leftPanel } = useSelector(
    (store: RootState) => store.appState
  );

  const { allAvailableLayers } = useSelector(
    (store: RootState) => store.mapviewState
  );

  const dispatch = useDispatch();
  const { layerGroupKey, layerGroupConfig } = props;

  const layerGroupTitle = layerGroupConfig.label?.[selectedLanguage];

  const groupOpen = leftPanel.openLayerGroup === layerGroupKey;

  function handleGroupToggle() {
    const openGroupKey = groupOpen ? '' : layerGroupKey;
    dispatch(setOpenLayerGroup(openGroupKey));
  }

  return (
    <div className="layer-group-container">
      <div className="layer-group-title">
        <span>{layerGroupTitle}</span>
        <button className="caret-button" onClick={handleGroupToggle}>
          {groupOpen ? '▼' : '▲'}
        </button>
      </div>
      <div className={groupOpen ? 'layers-control-container' : 'hidden'}>
        {allAvailableLayers.map(layerID => (
          <GenericLayerControl id={layerID} key={layerID} />
        ))}
      </div>
    </div>
  );
};

export default ImageryLayersGroup;
