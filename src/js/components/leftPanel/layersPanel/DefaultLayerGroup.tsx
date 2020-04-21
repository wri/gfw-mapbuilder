import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import GenericLayerControl from './GenericLayerControl';

import { RootState } from 'js/store';
import { setOpenLayerGroup } from 'js/store/appState/actions';
import { mapController } from 'js/controllers/mapController';

interface NestedLayerGroupProps {
  layersInGroup: any[];
  groupConfig: any;
  selectedLanguage: string;
}
const NestedLayerGroup = (props: NestedLayerGroupProps): JSX.Element => {
  console.log(props.groupConfig);

  const layerGroups = props.groupConfig.layers.map((lGroup: any) => {
    console.log(lGroup);
    const nestedLayerIDs = lGroup.nestedLayers.map((l: any) => l.id);
    const layers = props.layersInGroup
      .filter((layer: any) => nestedLayerIDs.includes(layer.id))
      .map((layer: any) => (
        <GenericLayerControl id={layer.id} key={layer.id} type={'default'} />
      ));
    return (
      <div>
        <p>
          {props.groupConfig.label[props.selectedLanguage] || 'Untitled Group'}
        </p>
        {layers}
      </div>
    );
  });
  return <>{layerGroups}</>;
};

interface RadioLayerGroupProps {
  layersInGroup: any[];
}
const RadioLayerGroup = (props: RadioLayerGroupProps): JSX.Element => {
  //by default no active layer should be set, all layers should be OFF
  // we may need to make sure that is the case on map by iterating over each layer from this group
  // and turning those off, just in case
  const [activeLayer, setActiveLayer] = useState('');

  //On Component load, ensure that all layers have been turned off
  useEffect(() => {
    props.layersInGroup.forEach(layerObject => {
      const layer = mapController._map?.findLayerById(layerObject.id);
      if (layer) {
        layer.visible = false;
      }
    });
  }, []);

  function sendActiveLayer(val: string): void {
    setActiveLayer(val);
    props.layersInGroup.forEach(layerObject => {
      if (layerObject.id === val) {
        mapController.changeLayerVisibility(layerObject.id, true);
      } else {
        mapController.changeLayerVisibility(layerObject.id, false);
      }
    });
  }

  const layers = props.layersInGroup.map(layer => (
    <GenericLayerControl
      id={layer.id}
      key={layer.id}
      type="radio"
      activeLayer={activeLayer}
      sendActiveLayer={sendActiveLayer}
    />
  ));
  return <>{layers}</>;
};

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
  let groupLayerIds: any[] = [];
  if (layerGroupConfig.groupType === 'nested') {
    layerGroupConfig.layers.forEach((lg: any) => {
      groupLayerIds = groupLayerIds.concat(
        lg.nestedLayers.map((l: any) => l.id)
      );
    });
  } else {
    groupLayerIds = layerGroupConfig.layers.map((layer: any) => layer.id);
  }
  const layerGroupTitle =
    layerGroupConfig.label?.[selectedLanguage] || 'Untranslated Layer Group';
  const groupOpen = leftPanel.openLayerGroup === layerGroupKey;
  const layersInGroup = allAvailableLayers.filter(layer =>
    groupLayerIds.includes(layer.id)
  );

  const handleGroupToggle = () => {
    const openGroupKey = groupOpen ? '' : layerGroupKey;
    dispatch(setOpenLayerGroup(openGroupKey));
  };

  function renderLayerGroup(): JSX.Element | null {
    switch (layerGroupConfig.groupType) {
      case 'checkbox':
        return (
          <>
            {layersInGroup.map(layer => (
              <GenericLayerControl
                id={layer.id}
                key={layer.id}
                type={layerGroupConfig.groupType}
              />
            ))}
          </>
        );
      case 'nested':
        return (
          <NestedLayerGroup
            layersInGroup={layersInGroup}
            groupConfig={layerGroupConfig}
            selectedLanguage={selectedLanguage}
          />
        );
      case 'radio':
        return <RadioLayerGroup layersInGroup={layersInGroup} />;
      default:
        return (
          <>
            {layersInGroup.map(layer => (
              <GenericLayerControl
                id={layer.id}
                key={layer.id}
                type={layerGroupConfig.groupType}
              />
            ))}
          </>
        );
    }
  }

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
        {renderLayerGroup()}
      </div>
    </div>
  );
};

export default DefaultLayerGroup;
