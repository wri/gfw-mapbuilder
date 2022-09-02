import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import * as React from 'react';
import { DATE_PICKER_START_DATES } from '../../../../configs/layer-config';
import { format } from 'date-fns';
import { mapController } from '../../controllers/mapController';
import { LayerFactory } from '../../helpers/LayerFactory';
import {
  setIntegratedAlertLayerEnd,
  setIntegratedAlertLayerStart,
  setGladConfirmed,
  setGladEnd,
  setGladStart,
  setHighConfidenceConfirmed,
} from '../../store/appState/actions';
import { loadModules } from 'esri-loader';
import { createGladS2Layer } from '../../layers/GladS2Layer';
import { createRadd } from '../../layers/RaddLayer';
import { layerControlsTranslations } from '../../../../configs/translations/leftPanel.translations';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';

//Dynamic custom theme override using styled-components lib
interface CheckBoxWrapperProps {
  customColorTheme: string;
}

const CheckboxWrapper = styled.div<CheckBoxWrapperProps>`
  .styled-checkbox:checked + .styled-checkboxlabel:before {
    background-color: ${(props) => props.customColorTheme};
  }
`;
interface GladControlsProps {
  customColorTheme: string;
  layerConfig: any;
  selectedLanguage: string;
  type?: string;
}
const GladControls = (props: GladControlsProps): JSX.Element => {
  const dispatch = useDispatch();
  const gladConfirmed = useSelector((store: RootState) => store.appState.leftPanel.gladConfirmed);
  const highConfidenceConfirmed = useSelector((store: RootState) => store.appState.leftPanel.highConfidenceConfirmed);
  const gladEnd = useSelector((store: RootState) => store.appState.leftPanel.gladEnd);
  const gfwIntegratedEnd = useSelector((store: RootState) => store.appState.leftPanel.gfwIntegratedEnd);
  const integratedAlertLayer = useSelector((store: RootState) => store.appState.leftPanel.integratedAlertLayer);
  const allAvailableLayers = useSelector((store: RootState) => store.mapviewState.allAvailableLayers);
  const [unconfirmedAlerts, setUnconfirmedAlerts] = React.useState(gladConfirmed);
  const [geographicCoverageToggle, setGeographicCoverageToggle] = React.useState(false);
  const [startDate, setStartDate] = React.useState(
    String(
      props.type === 'gfw-integrated-alert'
        ? DATE_PICKER_START_DATES.GFW_INTEGRATED_ALERTS
        : DATE_PICKER_START_DATES.GLAD_ALERTS
    )
  );
  const [startDateUnformatted, setStartDateUnformatted] = React.useState(
    String(
      props.type === 'gfw-integrated-alert'
        ? DATE_PICKER_START_DATES.GFW_INTEGRATED_ALERTS
        : DATE_PICKER_START_DATES.GLAD_ALERTS
    )
  );
  const [endDateUnformatted, setEndDateUnformatted] = React.useState(
    props.type === 'gfw-integrated-alert' ? gfwIntegratedEnd : gladEnd
  );

  const [endDate, setEndDate] = React.useState(props.type === 'gfw-integrated-alert' ? gfwIntegratedEnd : gladEnd);

  async function handleStartDateChange(day: any) {
    const dFormat = format(day, 'yyyy-MM-dd');
    setStartDate(dFormat);
    setStartDateUnformatted(day);
    //@ts-ignore
    const start = new Date(dFormat).getJulian();
    //@ts-ignore
    const end = new Date(endDate).getJulian();
    if (props.type === 'gfw-integrated-alert' && integratedAlertLayer === 'GFW_INTEGRATED_ALERTS') {
      const gfwIntegratedLayerOld: any = mapController._map!.findLayerById('GFW_INTEGRATED_ALERTS');
      const gfwIntegratedIndex: number = mapController._map!.layers.indexOf(gfwIntegratedLayerOld);
      mapController._map?.remove(gfwIntegratedLayerOld);
      const gfwIntegratedLayerNew: any = LayerFactory(mapController._mapview, props.layerConfig);
      gfwIntegratedLayerNew.gfwjulianFrom = start;
      gfwIntegratedLayerNew.gfwjulianTo = end;
      mapController._map?.add(gfwIntegratedLayerNew, gfwIntegratedIndex);

      dispatch(setIntegratedAlertLayerStart(dFormat));
      dispatch(setIntegratedAlertLayerEnd(endDate));
    } else {
      const gladLayerConfig: any = allAvailableLayers.filter((layer: any) => layer.id === 'GLAD_ALERTS');
      const gladLayerOld: any = mapController._map!.findLayerById('GLAD_ALERTS');
      const gladIndex: number = mapController._map!.layers.indexOf(gladLayerOld);
      mapController._map?.remove(gladLayerOld);
      const gladLayerNew: any = await LayerFactory(mapController._mapview, gladLayerConfig[0]);
      gladLayerNew.julianFrom = start;
      gladLayerNew.julianTo = end;
      mapController._map?.add(gladLayerNew, gladIndex);
      const selectedLayer = mapController._map!.findLayerById('GLAD_ALERTS');
      selectedLayer.visible = true;

      dispatch(setGladStart(dFormat));
      dispatch(setGladEnd(endDate));
    }
  }

  async function handleEndDateChange(day: any) {
    const dFormat = format(day, 'yyyy-MM-dd');
    setEndDate(dFormat);
    setEndDateUnformatted(day);
    //@ts-ignore
    const end = new Date(dFormat).getJulian();
    //@ts-ignore
    const start = new Date(startDate).getJulian();
    if (props.type === 'gfw-integrated-alert' && integratedAlertLayer === 'GFW_INTEGRATED_ALERTS') {
      const gfwIntegratedLayerOld: any = mapController._map!.findLayerById('GFW_INTEGRATED_ALERTS');
      const gfwIntegratedIndex: number = mapController._map!.layers.indexOf(gfwIntegratedLayerOld);
      mapController._map?.remove(gfwIntegratedLayerOld);
      const gfwIntegratedLayerNew: any = LayerFactory(mapController._mapview, props.layerConfig);
      gfwIntegratedLayerNew.gfwjulianFrom = start;
      gfwIntegratedLayerNew.gfwjulianTo = end;
      mapController._map?.add(gfwIntegratedLayerNew, gfwIntegratedIndex);
      dispatch(setIntegratedAlertLayerStart(startDate));
      dispatch(setIntegratedAlertLayerEnd(dFormat));
    } else {
      const gladLayerConfig: any = allAvailableLayers.filter((layer: any) => layer.id === 'GLAD_ALERTS');
      const gladLayerOld: any = mapController._map!.findLayerById('GLAD_ALERTS');
      const gladIndex: number = mapController._map!.layers.indexOf(gladLayerOld);
      mapController._map?.remove(gladLayerOld);
      const gladLayerNew: any = await LayerFactory(mapController._mapview, gladLayerConfig[0]);
      gladLayerNew.julianFrom = start;
      gladLayerNew.julianTo = end;
      mapController._map?.add(gladLayerNew, gladIndex);
      const selectedLayer = mapController._map!.findLayerById('GLAD_ALERTS');
      selectedLayer.visible = true;
      dispatch(setGladStart(startDate));
      dispatch(setGladEnd(dFormat));
    }
  }

  function handleConfirmedAlertsToggle(): void {
    setUnconfirmedAlerts(!unconfirmedAlerts);
    dispatch(setGladConfirmed(!unconfirmedAlerts));
    const gladLayerOld: any = mapController._map!.findLayerById('GLAD_ALERTS');
    mapController._map?.remove(gladLayerOld);
    const gladLayerNew: any = LayerFactory(mapController._mapview, props.layerConfig);
    gladLayerNew.confirmed = !unconfirmedAlerts;
    mapController._map?.add(gladLayerNew);
  }

  async function showOnlyHighConfidenceToggle() {
    if (integratedAlertLayer === 'GFW_INTEGRATED_ALERTS') {
      dispatch(setHighConfidenceConfirmed(!highConfidenceConfirmed));
      const gfwIntegratedLayerOld: any = mapController._map!.findLayerById('GFW_INTEGRATED_ALERTS');
      mapController._map?.remove(gfwIntegratedLayerOld);
      const gfwIntegratedLayerNew: any = LayerFactory(mapController._mapview, props.layerConfig);
      gfwIntegratedLayerNew.highConfidenceConfirmed = !highConfidenceConfirmed;
      mapController._map?.add(gfwIntegratedLayerNew);
    } else {
      dispatch(setHighConfidenceConfirmed(!highConfidenceConfirmed));
      const gladLayerOld: any = mapController._map!.findLayerById(integratedAlertLayer);
      mapController._map?.remove(gladLayerOld);
      const gladLayerConfig: any = allAvailableLayers.filter((layer: any) => layer.id === integratedAlertLayer);
      const gladLayerNew: any = await LayerFactory(mapController._mapview, gladLayerConfig[0]);
      gladLayerNew.confirmed = !highConfidenceConfirmed;
      mapController._map?.add(gladLayerNew);
      const selectedLayer = mapController._map!.findLayerById(integratedAlertLayer);
      selectedLayer.visible = true;
    }
  }

  async function showGeographicCoverage() {
    const [VectorTileLayer] = await loadModules(['esri/layers/VectorTileLayer']);

    let geographicCoverageLayer;
    if (integratedAlertLayer === 'GFW_INTEGRATED_ALERTS') {
      geographicCoverageLayer = new VectorTileLayer({
        url: 'https://tiles.globalforestwatch.org/umd_glad_landsat_alerts_coverage/v2014/default/root.json',
        id: 'GEOGRAPHIC_COVERAGE_LAYER',
      });
    }
    if (integratedAlertLayer === 'GLAD_S2_ALERTS') {
      const gladS2Layer = await createGladS2Layer();
      geographicCoverageLayer = new gladS2Layer({
        urlTemplate:
          'https://tiles.globalforestwatch.org/umd_glad_sentinel2_alerts_coverage/v20210413/default/{z}/{x}/{y}.png',
        opacity: '.5',
        view: mapController._mapview,
        id: 'GEOGRAPHIC_COVERAGE_LAYER',
      });
    }
    if (integratedAlertLayer === 'RADD_ALERTS') {
      const raddLayer = await createRadd();
      geographicCoverageLayer = new raddLayer({
        urlTemplate: 'https://tiles.globalforestwatch.org/wur_radd_coverage/v20211016/default/{z}/{x}/{y}.png',
        opacity: '.5',
        view: mapController._mapview,
        id: 'GEOGRAPHIC_COVERAGE_LAYER',
      });
    }

    setGeographicCoverageToggle(!geographicCoverageToggle);
    if (geographicCoverageToggle) {
      const geographicCoverageLayerOld: any = mapController._map!.findLayerById('GEOGRAPHIC_COVERAGE_LAYER');
      mapController._map?.remove(geographicCoverageLayerOld);
    } else {
      mapController._map?.add(geographicCoverageLayer);
    }
  }

  return (
    <div className="glad-control-wrapper">
      {props.type === 'gfw-integrated-alert' ? (
        <>
          <div className="glad-control-container">
            <div className="layer-checkbox">
              <CheckboxWrapper customColorTheme={props.customColorTheme}>
                <input
                  type="checkbox"
                  name="styled-checkbox"
                  className="styled-checkbox"
                  id="layer-checkbox-glad"
                  checked={highConfidenceConfirmed}
                  onChange={showOnlyHighConfidenceToggle}
                />
                <label className="styled-checkboxlabel" htmlFor="layer-checkbox-glad"></label>
              </CheckboxWrapper>
            </div>
            <p>Show only high and highest confidence alerts</p>
          </div>
          <div className="gfw-control-container" style={{ marginTop: 5 }}>
            <div className="layer-checkbox">
              <CheckboxWrapper customColorTheme={props.customColorTheme}>
                <input
                  type="checkbox"
                  name="styled-checkbox"
                  className="styled-checkbox"
                  id="layer-checkbox-gfw"
                  checked={geographicCoverageToggle}
                  onChange={showGeographicCoverage}
                />
                <label className="styled-checkboxlabel" htmlFor="layer-checkbox-gfw"></label>
              </CheckboxWrapper>
            </div>
            <p>Geographic Coverage</p>
          </div>
        </>
      ) : (
        <div className="glad-control-container">
          <div className="layer-checkbox">
            <CheckboxWrapper customColorTheme={props.customColorTheme}>
              <input
                type="checkbox"
                name="styled-checkbox"
                className="styled-checkbox"
                id="layer-checkbox-glad"
                checked={unconfirmedAlerts}
                onChange={handleConfirmedAlertsToggle}
              />
              <label className="styled-checkboxlabel" htmlFor="layer-checkbox-glad"></label>
            </CheckboxWrapper>
          </div>
          <p>Hide unconfirmed alerts</p>
        </div>
      )}

      <div className="calendar-wrapper">
        <div className="date-section-wrapper">
          <label htmlFor="start-date">{layerControlsTranslations[props.selectedLanguage].timeStart}</label>
          <DatePicker
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            placeholderText="select a day"
            onChange={(date) => handleStartDateChange(date)}
            selected={new Date(startDateUnformatted)}
            minDate={
              new Date(
                props.type === 'gfw-integrated-alert'
                  ? DATE_PICKER_START_DATES.GFW_INTEGRATED_ALERTS
                  : DATE_PICKER_START_DATES.GLAD_ALERTS
              )
            }
            maxDate={new Date(endDate)}
          />
        </div>
        <div className="date-section-wrapper">
          <label htmlFor="end-date">{layerControlsTranslations[props.selectedLanguage].timeEnd}</label>
          <DatePicker
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            placeholderText="select a day"
            onChange={(date) => handleEndDateChange(date)}
            selected={new Date(endDateUnformatted)}
            minDate={new Date(startDateUnformatted)}
            maxDate={new Date()}
          />
        </div>
      </div>
    </div>
  );
};

export default GladControls;
