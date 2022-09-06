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
  setHighConfidenceConfirmed,
  setGeographicCoverage,
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
const IntegratedAlertControls = (props: GladControlsProps): JSX.Element => {
  const dispatch = useDispatch();
  const highConfidenceConfirmed = useSelector((store: RootState) => store.appState.leftPanel.highConfidenceConfirmed);
  const geographicCoverage = useSelector((store: RootState) => store.appState.leftPanel.geographicCoverage);
  const gfwIntegratedEnd = useSelector((store: RootState) => store.appState.leftPanel.gfwIntegratedEnd);
  const integratedAlertLayer = useSelector((store: RootState) => store.appState.leftPanel.integratedAlertLayer);
  const [startDate, setStartDate] = React.useState(String(DATE_PICKER_START_DATES.GFW_INTEGRATED_ALERTS));
  const [startDateUnformatted, setStartDateUnformatted] = React.useState(
    String(DATE_PICKER_START_DATES.GFW_INTEGRATED_ALERTS)
  );
  const [endDateUnformatted, setEndDateUnformatted] = React.useState(gfwIntegratedEnd);
  const [endDate, setEndDate] = React.useState(gfwIntegratedEnd);

  async function addNewIntegratedAlertLayer(start: Date, end: Date) {
    const gfwIntegratedLayerOld: any = mapController._map!.findLayerById('GFW_INTEGRATED_ALERTS');
    const gfwIntegratedIndex: number = mapController._map!.layers.indexOf(gfwIntegratedLayerOld);
    const gfwIntegratedLayerNew: any = LayerFactory(mapController._mapview, props.layerConfig);
    gfwIntegratedLayerNew.gfwjulianFrom = start;
    gfwIntegratedLayerNew.gfwjulianTo = end;
    mapController._map?.add(gfwIntegratedLayerNew, gfwIntegratedIndex);
  }

  async function removeIntegratedAlertLayer() {
    const gfwIntegratedLayerOld: any = mapController._map!.findLayerById('GFW_INTEGRATED_ALERTS');
    mapController._map?.remove(gfwIntegratedLayerOld);
  }

  async function handleStartDateChange(day: any) {
    const dFormat = format(day, 'yyyy-MM-dd');
    setStartDate(dFormat);
    setStartDateUnformatted(day);
    //@ts-ignore
    const start = new Date(dFormat).getJulian();
    //@ts-ignore
    const end = new Date(endDate).getJulian();

    await removeIntegratedAlertLayer();
    await addNewIntegratedAlertLayer(start, end);

    dispatch(setIntegratedAlertLayerStart(dFormat));
    dispatch(setIntegratedAlertLayerEnd(endDate));
  }

  async function handleEndDateChange(day: any) {
    const dFormat = format(day, 'yyyy-MM-dd');
    setEndDate(dFormat);
    setEndDateUnformatted(day);
    //@ts-ignore
    const end = new Date(dFormat).getJulian();
    //@ts-ignore
    const start = new Date(startDate).getJulian();

    await removeIntegratedAlertLayer();
    await addNewIntegratedAlertLayer(start, end);

    dispatch(setIntegratedAlertLayerStart(startDate));
    dispatch(setIntegratedAlertLayerEnd(dFormat));
  }

  async function showOnlyHighConfidenceToggle() {
    dispatch(setHighConfidenceConfirmed(!highConfidenceConfirmed));
    const gfwIntegratedLayerOld: any = mapController._map!.findLayerById('GFW_INTEGRATED_ALERTS');
    mapController._map?.remove(gfwIntegratedLayerOld);
    const gfwIntegratedLayerNew: any = LayerFactory(mapController._mapview, props.layerConfig);
    gfwIntegratedLayerNew.highConfidenceConfirmed = !highConfidenceConfirmed;
    mapController._map?.add(gfwIntegratedLayerNew);
  }

  async function showGeographicCoverage() {
    const [VectorTileLayer] = await loadModules(['esri/layers/VectorTileLayer']);

    let geographicCoverageLayer;
    if (integratedAlertLayer === 'GFW_INTEGRATED_ALERTS' || integratedAlertLayer === 'GLAD_ALERTS') {
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

    dispatch(setGeographicCoverage(!geographicCoverage));
    if (geographicCoverage) {
      const geographicCoverageLayerOld: any = mapController._map!.findLayerById('GEOGRAPHIC_COVERAGE_LAYER');
      mapController._map?.remove(geographicCoverageLayerOld);
    } else {
      mapController._map?.add(geographicCoverageLayer);
    }
  }

  return (
    <div className="glad-control-wrapper">
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
                checked={geographicCoverage}
                onChange={showGeographicCoverage}
              />
              <label className="styled-checkboxlabel" htmlFor="layer-checkbox-gfw"></label>
            </CheckboxWrapper>
          </div>
          <p>Geographic Coverage</p>
        </div>
      </>

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
            minDate={new Date(DATE_PICKER_START_DATES.GFW_INTEGRATED_ALERTS)}
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

export default IntegratedAlertControls;
