import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import LayerToggleSwitch from './LayerToggleSwitch';
import LayerTransparencySlider from './LayerTransparencySlider';
import CanopyDensityPicker from 'js/components/sharedComponents/CanopyDensityPicker';
import TimeSlider from 'js/components/sharedComponents/TimeSlider';
import DateRange from './DateRange';

import { mapController } from 'js/controllers/mapController';

import { RootState } from 'js/store';

import { densityEnabledLayers } from '../../../../../configs/layer-config';

import { ReactComponent as InfoIcon } from 'images/infoIcon.svg';

interface LayerControlProps {
  id: string;
  sublayer?: boolean;
  parentID?: string;
}

const GenericLayerControl = (props: LayerControlProps): React.ReactElement => {
  const { allAvailableLayers } = useSelector(
    (store: RootState) => store.mapviewState
  );
  const layer = allAvailableLayers.find(l => l.id === props.id);

  //Determine if we need density control on this layer
  const densityPicker = layer && densityEnabledLayers.includes(layer.id);

  useEffect(() => {
    const resetVIIRSOrMODIS = (): void => {
      mapController.resetCustomDateRange();

      if (layer?.id === 'VIIRS_ACTIVE_FIRES') {
        mapController.resetVIRRSDefinedDateRange(layer.id);
      }

      if (layer?.id === 'MODIS_ACTIVE_FIRES') {
        mapController.resetMODISDefinedDateRange(layer.id);
      }
    };

    if ((layer as any)?.visible === false) {
      resetVIIRSOrMODIS();
    }
  }, [layer?.visible]);

  const returnTimeSlider = (id: string): any => {
    switch (id) {
      case 'TREE_COVER_LOSS':
        return <TimeSlider layerID={id} />;
      default:
        return null;
    }
  };

  const returnDateRange = (id: string): JSX.Element | undefined => {
    if (!layer) {
      return;
    }
    /**
     * TODO
     * [ ] glad alerts
     * [ ] terra-I alerts
     */
    switch (id) {
      case 'VIIRS_ACTIVE_FIRES':
      case 'MODIS_ACTIVE_FIRES':
        return <DateRange layer={layer} />;
      default:
        break;
    }
  };

  return (
    <>
      <div className="layers-control-checkbox">
        <LayerToggleSwitch
          layerIsVisible={layer?.visible}
          layerID={props.id}
          sublayer={props.sublayer}
          parentID={props.parentID}
        />
        <span className="layer-label">{layer?.title}</span>
        <div className="info-icon-container">
          <InfoIcon width={10} height={10} fill={'#fff'} />
        </div>
      </div>
      {layer?.visible && returnTimeSlider(props.id)}
      {layer?.visible && densityPicker && <CanopyDensityPicker />}
      {layer?.visible && (
        <LayerTransparencySlider
          layerID={props.id}
          layerOpacity={layer?.opacity}
          sublayer={props.sublayer}
          parentID={props.parentID}
        />
      )}
      {layer?.visible && returnDateRange(props.id)}
    </>
  );
};

export default GenericLayerControl;
