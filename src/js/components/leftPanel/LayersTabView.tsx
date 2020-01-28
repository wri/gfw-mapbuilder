import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store';
import { mapController } from 'js/controllers/mapController';
import { ReactComponent as InfoIcon } from 'images/InfoIcon.svg';
import 'css/leftpanel.scss';

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

//-----------
interface LayerControlProps {
  id: string;
}
const LayerControl = (props: LayerControlProps): React.ReactElement => {
  const { visibleLayers } = useSelector(
    (store: RootState) => store.mapviewState
  );
  const layerIsVisible = visibleLayers.includes(props.id);

  const [localLayerOpacity, setlocalLayerOpacity] = useState(
    mapController.getLayerOpacity(props.id)
  );

  function handleOpacityChange(e: any) {
    setlocalLayerOpacity(e.target.value);
    mapController.setLayerOpacity(props.id, e.target.value);
  }
  return (
    <>
      <div className="layers-control-checkbox">
        <label>
          <input
            type="checkbox"
            name="layer-checkbox"
            checked={layerIsVisible}
            onChange={() => mapController.toggleLayerVisibility(props.id)}
          />
          <span>{props.id}</span>
        </label>
        <div className="info-icon-container">
          <InfoIcon width={10} height={10} fill="#fff" />
        </div>
      </div>
      <div className="transparency-slider">
        <p>Transparency Slider</p>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.05"
          name="tslider"
          id=""
          value={localLayerOpacity}
          onChange={handleOpacityChange}
        />
        <label htmlFor="tslider">{localLayerOpacity}</label>
      </div>
    </>
  );
};

//----------

const LayerGroup = (): React.ReactElement => {
  //Based on Redux state, we figure out everything to know about this LayerGroup (open/close, number of layers, etc etc);
  const [groupOpen, setGroupOpen] = useState(true);

  //TODO: Layers to display should correspond to the group, this just pulls all available layers from redux that were set through mapController for now.
  const { allAvailableLayers } = useSelector(
    (store: RootState) => store.mapviewState
  );
  //For Each layer in a Layer Group we create LayerControls that contain our checkbox, info, transparency etc

  function handleGroupToggle() {
    setGroupOpen(!groupOpen);
  }

  return (
    <div className="layer-group-container">
      <div className="layer-group-title">
        <span>WEBMAP LAYERS</span>
        <button className="caret-button" onClick={handleGroupToggle}>
          {groupOpen ? '▼' : '▲'}
        </button>
      </div>
      <div className={groupOpen ? 'layers-control-container' : 'hidden'}>
        {allAvailableLayers.map(layerID => (
          <LayerControl id={layerID} key={layerID} />
        ))}
      </div>
    </div>
  );
};

interface Props {
  key: string;
  label: string;
}
const LayersTabView = (props: Props) => {
  const { activeTab, tabViewVisible } = useSelector(
    (store: RootState) => store.appState.leftPanel
  );

  const tabViewIsVisible = tabViewVisible && activeTab === props.label;

  //How many Layer Groups do we need to render? Basing on redux AppSettings
  //Each Layer Group will have access to whatever layers it has
  const layerGroupsToRender = [{ group: 'webmap' }];
  return (
    <>
      {tabViewIsVisible && (
        <div>
          <AllLayerControls />
          {layerGroupsToRender.map(layerGroup => (
            <LayerGroup key={layerGroup.group} />
          ))}
        </div>
      )}
    </>
  );
};

export default LayersTabView;
