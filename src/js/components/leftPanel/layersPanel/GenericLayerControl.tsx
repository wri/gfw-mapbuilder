import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store';
import { ReactComponent as InfoIcon } from 'images/infoIcon.svg';
import LayerToggleSwitch from './LayerToggleSwitch';
import LayerTransparencySlider from './LayerTransparencySlider';

interface LayerControlProps {
  id: string;
}
const GenericLayerControl = (props: LayerControlProps): React.ReactElement => {
  const { allAvailableLayers } = useSelector(
    (store: RootState) => store.mapviewState
  );
  const layer = allAvailableLayers.find(l => l.id === props.id);
  return (
    <>
      <div className="layers-control-checkbox">
        <LayerToggleSwitch layerIsVisible={layer?.visible} layerID={props.id} />
        <span className="layer-label">{layer?.title}</span>
        <div className="info-icon-container">
          <InfoIcon width={10} height={10} fill={'#fff'} />
        </div>
      </div>
      <LayerTransparencySlider
        layerID={props.id}
        layerOpacity={layer?.opacity}
      />
    </>
  );
};

export default GenericLayerControl;
