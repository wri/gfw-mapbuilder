import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'js/store';
import { ReactComponent as InfoIcon } from 'images/InfoIcon.svg';
import LayerToggleSwitch from './LayerToggleSwitch';
import LayerTransparencySlider from './LayerTransparencySlider';

interface LayerControlProps {
  id: string;
}
const GenericLayerControl = (props: LayerControlProps): React.ReactElement => {
  const { visibleLayers } = useSelector(
    (store: RootState) => store.mapviewState
  );
  const layerIsVisible = visibleLayers.includes(props.id);

  return (
    <>
      <div className="layers-control-checkbox">
        <LayerToggleSwitch layerIsVisible={layerIsVisible} layerID={props.id} />
        <span className="layer-label">{props.id}</span>
        <div className="info-icon-container">
          <InfoIcon width={10} height={10} fill="#fff" />
        </div>
      </div>
      <LayerTransparencySlider layerID={props.id} />
    </>
  );
};

export default GenericLayerControl;
