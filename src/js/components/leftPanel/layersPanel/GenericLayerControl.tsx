import * as React from 'react';
import { useSelector } from 'react-redux';

import LayerToggleSwitch from './LayerToggleSwitch';

import CanopyDensityPicker from 'js/components/sharedComponents/CanopyDensityPicker';
import RangeSlider from 'js/components/sharedComponents/RangeSlider';

import { mapController } from 'js/controllers/mapController';

import { RootState } from 'js/store';

import { densityEnabledLayers } from '../../../../../configs/layer-config';

import { ReactComponent as InfoIcon } from 'images/infoIcon.svg';
interface LayerControlProps {
  id: string;
}
const GenericLayerControl = (props: LayerControlProps): React.ReactElement => {
  const { allAvailableLayers } = useSelector(
    (store: RootState) => store.mapviewState
  );
  const layer = allAvailableLayers.find(l => l.id === props.id);

  //Determine if we need density control on this layer
  const densityPicker = layer && densityEnabledLayers.includes(layer.id);

  const handleSliderChange = (eventValue: number): void => {
    mapController.setLayerOpacity(props.id, String(eventValue));
  };

  return (
    <>
      <div className="layers-control-checkbox">
        <LayerToggleSwitch layerIsVisible={layer?.visible} layerID={props.id} />
        <span className="layer-label">{layer?.title}</span>
        <div className="info-icon-container">
          <InfoIcon width={10} height={10} fill={'#fff'} />
        </div>
      </div>
      {layer?.visible && densityPicker && <CanopyDensityPicker />}
      {layer?.visible && (
        <RangeSlider
          min={0.1}
          max={1}
          step={0.05}
          opacity={layer?.opacity}
          returnSliderWithTooltip={false}
          handleSliderChange={handleSliderChange}
        />
      )}
    </>
  );
};

export default GenericLayerControl;
