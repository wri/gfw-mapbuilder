import React from 'react';
import { mapController } from '../../controllers/mapController';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setProdesLayer } from '../../store/appState/actions';
import { LAYER_IDS } from '../../../../configs/layer-config';

const SelectProdesLayer = (): JSX.Element | any => {
  const prodesLayer = useSelector((store: RootState) => store.appState.leftPanel.prodesLayer);
  const dispatch = useDispatch();

  const selectLayer = (e: any) => {
    const selectedLayerId =
      e.target.innerText === 'Cerrado' ? LAYER_IDS.INPE_CERRADO_PRODES : LAYER_IDS.INPE_AMAZON_PRODES;
    mapController.resetProdLayerOpacity(selectedLayerId);
    [LAYER_IDS.INPE_CERRADO_PRODES, LAYER_IDS.INPE_AMAZON_PRODES].forEach((layerId) => {
      const layer = mapController._map?.findLayerById(layerId);
      if (layer) {
        layer.visible = layerId === selectedLayerId;
        layer!.opacity = 1;
      } else {
        layer!.visible = false;
        layer!.opacity = 1;
      }
    });
    dispatch(setProdesLayer(selectedLayerId));
  };

  return (
    <div className="layer-toggle">
      <div className="toggle-btn">
        <button onClick={selectLayer} className={prodesLayer === LAYER_IDS.INPE_CERRADO_PRODES ? 'active' : ''}>
          Cerrado
        </button>
        <button onClick={selectLayer} className={prodesLayer === LAYER_IDS.INPE_AMAZON_PRODES ? 'active' : ''}>
          Amazon
        </button>
      </div>
    </div>
  );
};

export default SelectProdesLayer;
