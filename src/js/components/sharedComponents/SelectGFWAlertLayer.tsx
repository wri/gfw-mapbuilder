import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';

import { setGFWLayer, setGFWLayerLabel, setGFWLayerSubtitle } from '../../store/appState/actions';
import { mapController } from '../../controllers/mapController';

const SelectGFWAlertLayer = (): JSX.Element => {
  const dispatch = useDispatch();
  const gfwLayer = useSelector((store: RootState) => store.appState.leftPanel.gfwLayer);

  function handleDensityButtonClick(e): void {
    const gfwLayers = [e.target[0].value, e.target[1].value, e.target[2].value];
    mapController.updateGFWLayer(e.target.value, gfwLayers);
    dispatch(setGFWLayer(e.target.value));
    dispatch(setGFWLayerLabel(e.target.selectedOptions[0].text));
    dispatch(setGFWLayerSubtitle(e.target.selectedOptions[0].getAttribute('data-subtitle')));
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
      <select
        className="toggle"
        onChange={(e): void => handleDensityButtonClick(e)}
        value={gfwLayer}
        id="gfw-layer-toggle"
      >
        <option value={'GFW_INTEGRATED_ALERTS'} data-subtitle="(daily, 10m, tropics, UMD/GLAD and WUR)">
          Integrated Deforestation Alerts
        </option>
        <option value={'GLAD_ALERTS'} data-subtitle="(weekly, 30m, tropics, UMD/ GLAD)">
          GLAD-L Alerts{' '}
        </option>
        <option value={'GLAD_S2_ALERTS'} data-subtitle="(every 5 days, 10m, Amazon Basin, UMD/GLAD)">
          GLAD-S2 Alerts{' '}
        </option>
        <option value={'RADD_ALERTS'} data-subtitle="(every 6-12 days, 10m, select countries, WUR)">
          RADD Alerts{' '}
        </option>
      </select>
      {/*<span> {displayLabel[1]}</span>*/}
    </div>
  );
};

export default SelectGFWAlertLayer;
