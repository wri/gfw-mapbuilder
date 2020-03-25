import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LayerToggleSwitch from './LayerToggleSwitch';
import LayerTransparencySlider from './LayerTransparencySlider';
import CanopyDensityPicker from 'js/components/sharedComponents/CanopyDensityPicker';
import TimeSlider from 'js/components/sharedComponents/TimeSlider';

import { renderModal, renderInfoModal } from 'js/store/appState/actions';

import { RootState } from 'js/store';

import { densityEnabledLayers } from '../../../../../configs/layer-config';

import { ReactComponent as InfoIcon } from 'images/infoIcon.svg';

interface LayerControlProps {
  id: string;
  sublayer?: boolean;
  parentID?: string;
}

const GenericLayerControl = (props: LayerControlProps): React.ReactElement => {
  const dispatch = useDispatch();
  const { allAvailableLayers } = useSelector(
    (store: RootState) => store.mapviewState
  );
  const layer = allAvailableLayers.find(l => l.id === props.id);

  //Determine if we need density control on this layer
  const densityPicker = layer && densityEnabledLayers.includes(layer.id);

  const returnTimeSlider = (id: string): any => {
    switch (id) {
      case 'TREE_COVER_LOSS':
        return <TimeSlider layerID={id} />;
      default:
        return null;
    }
  };

  const setInfoModal = (): void => {
    if (layer) {
      dispatch(renderModal('InfoContent'));
      dispatch(renderInfoModal(layer.id));
    }

    return;
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
        <div className="info-icon-container" onClick={() => setInfoModal()}>
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
    </>
  );
};

export default GenericLayerControl;
