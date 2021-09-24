import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { layerIsInScale } from '../../../../js/helpers/layerScaleCheck';
import GenericLayerControl from './GenericLayerControl';

import { RootState } from '../../../../js/store';
import { setOpenLayerGroup } from '../../../../js/store/appState/actions';
import { mapController } from '../../../../js/controllers/mapController';
import styled from 'styled-components';

//Override speudo element styling with our custom style
interface CheckBoxWrapperProps {
  customColorTheme: string;
}
const CheckboxWrapper = styled.div<CheckBoxWrapperProps>`
  .styled-checkbox:checked + .styled-checkboxlabel:before {
    background-color: ${props => props.customColorTheme};
  }
`;

interface NestedLayerGroupProps {
  layersInGroup: any[];
  groupConfig: any;
  selectedLanguage: string;
  customColorTheme: string;
}

const NestedLayerGroup = (props: NestedLayerGroupProps): JSX.Element => {
  const [activeGroups, setActiveGroups] = useState<string[]>([]);

  function handleGroupToggle(val: string): void {
    //if activegroup is already in the list, remove it, otherwise add it
    if (activeGroups.includes(val)) {
      const index = activeGroups.indexOf(val);
      const newGroupArray = [...activeGroups];
      newGroupArray.splice(index, 1);
      setActiveGroups(newGroupArray);
    } else {
      const newGroupArray = activeGroups.concat(val);
      setActiveGroups(newGroupArray);
    }
  }

  const LayerGroup = (props: any): JSX.Element => {
    const { lGroup, layers, activeGroups, changeActiveGroups } = props;
    // const [groupIsActive, setGroupIsActive] = useState(false);
    function handleGroupToggle(groupID: string): void {
      if (activeGroups.includes(groupID)) {
        //Turn Off all layers
        changeActiveGroups(groupID);
        lGroup.nestedLayers.forEach((nestedLayer: any) => {
          mapController.changeLayerVisibility(nestedLayer.id, false);
        });
      } else {
        //Turn On all layers
        changeActiveGroups(groupID);
        lGroup.nestedLayers.forEach((nestedLayer: any) => {
          mapController.changeLayerVisibility(nestedLayer.id, true);
        });
      }
    }

    return (
      <div className="nested-group-container">
        <div className="nested-group-top">
          <CheckboxWrapper customColorTheme={props.customColorTheme}>
            <div className="layer-checkbox">
              <input
                type="checkbox"
                name="styled-checkbox"
                className="styled-checkbox"
                id={`layer-checkbox-${lGroup.id}`}
                checked={activeGroups.includes(lGroup.id)}
                onChange={() => handleGroupToggle(lGroup.id)}
              />
              <label className="styled-checkboxlabel" htmlFor={`layer-checkbox-${lGroup.id}`}>
                {'somelayer'}
              </label>
            </div>
          </CheckboxWrapper>
          <div>{lGroup.label[props.selectedLanguage] || 'Unitled Group'}</div>
        </div>
        <div>{layers}</div>
      </div>
    );
  };

  const layerGroups = props.groupConfig.layers.map(
    (lGroup: any, k: number): JSX.Element => {
      const nestedLayerIDs = lGroup.nestedLayers.map((l: any) => l.id);
      const layers = props.layersInGroup
        .filter((layer: any) => nestedLayerIDs.includes(layer.id))
        .map((layer: any, i: number) => (
          <GenericLayerControl layer={layer} id={layer.id} key={layer.id} type={'default'} />
        ));
      return (
        <LayerGroup
          key={k}
          selectedLanguage={props.selectedLanguage}
          lGroup={lGroup}
          layers={layers}
          activeGroups={activeGroups}
          changeActiveGroups={handleGroupToggle}
        />
      );
    }
  );

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
      layer={layer}
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
  const selectedLanguage = useSelector((store: RootState) => store.appState.selectedLanguage);
  const openLayerGroup = useSelector((store: RootState) => store.appState.leftPanel.openLayerGroup);

  const allAvailableLayers = useSelector((store: RootState) => store.mapviewState.allAvailableLayers);
  const scale = useSelector((store: RootState) => store.mapviewState.scale);

  const allLayersInScale = allAvailableLayers.filter(l => layerIsInScale(l, scale));
  const customColorTheme = useSelector((store: RootState) => store.appSettings.customColorTheme);

  const dispatch = useDispatch();
  const { layerGroupKey, layerGroupConfig } = props;
  //If layer group is nested, layer ids are also nested, so find those appropriatly
  let groupLayerIds: string[] = [];
  if (layerGroupConfig.groupType === 'nested') {
    layerGroupConfig.layers.forEach((lg: any) => {
      groupLayerIds = groupLayerIds.concat(lg.nestedLayers.map((l: any) => l.id));
    });
  } else {
    groupLayerIds = layerGroupConfig.layers.map((layer: any) => layer.id);
  }
  const layerGroupTitle = layerGroupConfig.label?.[selectedLanguage] || 'Untranslated Layer Group';

  const groupOpen = openLayerGroup === layerGroupKey;

  const layersInGroup = allLayersInScale.filter(layer => layer.group === layerGroupKey);

  const handleGroupToggle = () => {
    const openGroupKey = groupOpen ? '' : layerGroupKey;
    dispatch(setOpenLayerGroup(openGroupKey));
  };

  function renderLayerGroup(): JSX.Element {
    switch (layerGroupConfig.groupType) {
      case 'checkbox':
        return (
          <>
            {layersInGroup.map(layer => (
              <GenericLayerControl layer={layer} id={layer.id} key={layer.id} type={layerGroupConfig.groupType} />
            ))}
          </>
        );
      case 'nested':
        return (
          <NestedLayerGroup
            layersInGroup={layersInGroup}
            groupConfig={layerGroupConfig}
            selectedLanguage={selectedLanguage}
            customColorTheme={customColorTheme}
          />
        );
      case 'radio':
        return <RadioLayerGroup layersInGroup={layersInGroup} />;
      default:
        return (
          <>
            {layersInGroup.map(layer => (
              <GenericLayerControl layer={layer} id={layer.id} key={layer.id} type={layerGroupConfig.groupType} />
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
      <div className={groupOpen ? 'layers-control-container' : 'hidden'}>{renderLayerGroup()}</div>
    </div>
  );
};

export default DefaultLayerGroup;
