import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LayerToggleSwitch from './LayerToggleSwitch';
import LayerTransparencySlider from './LayerTransparencySlider';
import CanopyDensityPicker from 'js/components/sharedComponents/CanopyDensityPicker';
import TimeSlider from 'js/components/sharedComponents/TimeSlider';
import DateRange from './DateRange';

import { renderModal, setInfoModalLayerID } from 'js/store/appState/actions';

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
  const { selectedLanguage } = useSelector(
    (store: RootState) => store.appState
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

  const openInfoModal = (): void => {
    if (layer) {
      dispatch(renderModal('InfoContent'));
      dispatch(setInfoModalLayerID(layer.id));
    }

    return;
  };

  const returnSubtitle = (): JSX.Element | undefined => {
    let subTitle = '';
    if (layer?.sublabel) {
      subTitle = layer.sublabel[selectedLanguage];

      return (
        <>
          <br />
          <span className="layer-subtitle">{subTitle}</span>
        </>
      );
    } else {
      return;
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
        <div className="title-wrapper">
          <span className="layer-label">{layer?.title}</span>
          {returnSubtitle()}
        </div>
        <div className="info-icon-container" onClick={() => openInfoModal()}>
          <InfoIcon width={10} height={10} fill={'#fff'} />
        </div>
      </div>
      {layer?.visible && returnTimeSlider(props.id)}
      {layer?.visible && densityPicker && <CanopyDensityPicker label={true} />}
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
