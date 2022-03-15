import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';

import { setGFWLayer } from '../../store/appState/actions';
import { mapController } from '../../controllers/mapController';

const SelectGFWAlertLayer = (): JSX.Element => {
  const dispatch = useDispatch();
  const gfwLayer = useSelector((store: RootState) => store.appState.leftPanel.gfwLayer);

  function handleDensityButtonClick(e): void {
    const gfwLayers = [e.target[0].value, e.target[1].value, e.target[2].value];
    mapController.updateGFWLayer(e.target.value, gfwLayers);
    dispatch(setGFWLayer(e.target.value));
  }

  return (
    <div
      className="gfw-alert-picker-wrapper"
      style={{
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        marginTop: 10,
        display: 'flex'
      }}
    >
      <span>Select Layer: </span>
      <select className="toggle" onChange={(e): void => handleDensityButtonClick(e)} value={gfwLayer}>
        <option value={'GFW_INTEGRATED_ALERTS'}>Integrated Deforestation Alerts {'▼'}</option>
        <option value={'GLAD_ALERTS'}>GLAD-L Alerts {'▼'}</option>
        <option value={'GLAD_S2_ALERTS'}>GLAD-S2 Alerts {'▼'}</option>
        <option value={'RADD_ALERTS'}>RADD Alerts {'▼'}</option>
      </select>
      {/*<span> {displayLabel[1]}</span>*/}
    </div>
  );
};

export default SelectGFWAlertLayer;
