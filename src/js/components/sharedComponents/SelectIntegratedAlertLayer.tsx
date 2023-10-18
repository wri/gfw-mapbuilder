import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';

import {
  setIntegratedAlertLayer,
  setIntegratedAlertLayerLabel,
  setIntegratedAlertLayerSubtitle,
  setHighConfidenceConfirmed,
  setGeographicCoverage,
} from '../../store/appState/actions';
import { mapController } from '../../controllers/mapController';
import { selectLayerConfig } from '../../../../configs/translations/leftPanel.translations';

const SelectIntegratedAlertLayer = (): JSX.Element => {
  const dispatch = useDispatch();
  const gfwLayer = useSelector((store: RootState) => store.appState.leftPanel.integratedAlertLayer);
  const { selectedLanguage } = useSelector((store: RootState) => store.appState);

  function handleDensityButtonClick(e): void {
    dispatch(setHighConfidenceConfirmed(false));
    dispatch(setGeographicCoverage(false));
    const integratedAlertLayers = [e.target[0].value, e.target[1].value, e.target[2].value, e.target[3].value];
    mapController.updateGFWLayer(e.target.value, integratedAlertLayers);
    dispatch(setIntegratedAlertLayer(e.target.value));
    dispatch(setIntegratedAlertLayerLabel(e.target.selectedOptions[0].text));
    dispatch(setIntegratedAlertLayerSubtitle(e.target.selectedOptions[0].getAttribute('data-subtitle')));
    const geographicCoverageLayerOld: any = mapController._map!.findLayerById('GEOGRAPHIC_COVERAGE_LAYER');
    mapController._map?.remove(geographicCoverageLayerOld);
  }
  const displayLabel = selectLayerConfig[selectedLanguage];

  return (
    <div
      className="gfw-alert-picker-wrapper"
      style={{
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        marginTop: 10,
        display: 'flex',
      }}
    >
      <span>{`${displayLabel?.label}:`}</span>
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
          GLAD-L Alerts
        </option>
        <option value={'GLAD_S2_ALERTS'} data-subtitle="(every 5 days, 10m, Amazon Basin, UMD/GLAD)">
          GLAD-S2 Alerts
        </option>
        <option value={'RADD_ALERTS'} data-subtitle="(every 6-12 days, 10m, select countries, WUR)">
          RADD Alerts
        </option>
      </select>
      {/*<span> {displayLabel[1]}</span>*/}
    </div>
  );
};

export default SelectIntegratedAlertLayer;
