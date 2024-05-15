import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import * as React from 'react';
import { DATE_PICKER_START_DATES, LAYER_IDS } from '../../../../configs/layer-config';
import { mapController } from '../../controllers/mapController';
import { LayerFactory } from '../../helpers/LayerFactory';
import { setHighConfidenceConfirmed, setGeographicCoverage } from '../../store/appState/actions';
import {
  geoCoverageConfig,
  layerControlsTranslations,
  showConfidenceAlertsConfig,
} from '../../../../configs/translations/leftPanel.translations';
import {
  onEndDateChange,
  onStartDateChange,
  displayGeographicCoverageLayer,
} from './helpers/IntegratedAlertControlsHelper';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import ToggleComponent from '../ui/ToggleComponent';
import { handleCustomColorTheme } from '../../../utils';

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
  const allAvailableLayers = useSelector((store: RootState) => store.mapviewState.allAvailableLayers);
  const glad2Start = useSelector((store: RootState) => store.appState.leftPanel.glad2Start);
  const glad2End = useSelector((store: RootState) => store.appState.leftPanel.glad2End);
  const gladStart = useSelector((store: RootState) => store.appState.leftPanel.gladStart);
  const gladEnd = useSelector((store: RootState) => store.appState.leftPanel.gladEnd);
  const raddAlertStart = useSelector((store: RootState) => store.appState.leftPanel.raddAlertStart);
  const raddAlertEnd = useSelector((store: RootState) => store.appState.leftPanel.raddAlertEnd);
  const gfwIntegratedStart = useSelector((store: RootState) => store.appState.leftPanel.gfwIntegratedStart);

  const customColorTheme = useSelector((store: RootState) => store.appSettings.customColorTheme);
  const [startDate, setStartDate] = React.useState(String(DATE_PICKER_START_DATES.GFW_INTEGRATED_ALERTS));
  const [startDateUnformatted, setStartDateUnformatted] = React.useState(
    String(DATE_PICKER_START_DATES.GFW_INTEGRATED_ALERTS)
  );
  const [endDate, setEndDate] = React.useState(gfwIntegratedEnd);

  const themeColor = handleCustomColorTheme(customColorTheme);

  async function handleStartDateChange(day: any) {
    const year = new Date(day).getFullYear();
    const month = new Date(day).getMonth();
    const dayOfMonth = new Date(day).getDate();
    const date = new Date(year, month, dayOfMonth).toLocaleString();
    const dFormat = date;

    setStartDate(dFormat);
    setStartDateUnformatted(day);

    onStartDateChange(dFormat, endDate);
  }

  async function handleEndDateChange(day: any) {
    const year = new Date(day).getFullYear();
    const month = new Date(day).getMonth();
    const dayOfMonth = new Date(day).getDate();
    const date = new Date(year, month, dayOfMonth).toLocaleString();
    const dFormat = date;

    setEndDate(dFormat);
    onEndDateChange(date, dFormat);
  }

  async function showOnlyHighConfidenceToggle() {
    dispatch(setHighConfidenceConfirmed(!highConfidenceConfirmed));
    if (integratedAlertLayer === 'GFW_INTEGRATED_ALERTS') {
      const gfwIntegratedLayerOld: any = mapController._map!.findLayerById(LAYER_IDS.GFW_INTEGRATED_ALERTS);
      mapController._map?.remove(gfwIntegratedLayerOld);
      const gfwIntegratedLayerNew: any = LayerFactory(mapController._mapview, props.layerConfig);
      gfwIntegratedLayerNew.highConfidenceConfirmed = !highConfidenceConfirmed;
      mapController._map?.add(gfwIntegratedLayerNew);
    } else {
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

  const handleDateToggle = () => {
    if (integratedAlertLayer === LAYER_IDS.GFW_INTEGRATED_ALERTS) {
      return { start: gfwIntegratedStart, end: gfwIntegratedEnd };
    }
    if (integratedAlertLayer === LAYER_IDS.GLAD_S2_ALERTS) {
      return { start: glad2Start, end: glad2End };
    }
    if (integratedAlertLayer === LAYER_IDS.GLAD_ALERTS) {
      return { start: gladStart, end: gladEnd };
    }
    if (integratedAlertLayer === LAYER_IDS.RADD_ALERTS) {
      return { start: raddAlertStart, end: raddAlertEnd };
    }
    return { start: startDate, end: endDate };
  };

  async function showGeographicCoverage() {
    dispatch(setGeographicCoverage(!geographicCoverage));
    displayGeographicCoverageLayer(integratedAlertLayer, geographicCoverage);
  }

  const confidenceAlertLabel = showConfidenceAlertsConfig[props.selectedLanguage];
  const geoCoverageLabel = geoCoverageConfig[props.selectedLanguage];

  return (
    <div className="glad-control-wrapper">
      <>
        <div className="glad-control-container">
          <div className="layer-checkbox">
            <CheckboxWrapper customColorTheme={props.customColorTheme}>
              <ToggleComponent
                themeColor={themeColor}
                onChange={showOnlyHighConfidenceToggle}
                checked={highConfidenceConfirmed}
                disabled={false}
              />
              <label className="styled-checkboxlabel" htmlFor="layer-checkbox-glad"></label>
            </CheckboxWrapper>
          </div>
          <p>{confidenceAlertLabel?.label}</p>
        </div>
        <div className="gfw-control-container" style={{ marginTop: 5 }}>
          <div className="layer-checkbox">
            <CheckboxWrapper customColorTheme={props.customColorTheme}>
              <ToggleComponent
                themeColor={themeColor}
                onChange={showGeographicCoverage}
                checked={geographicCoverage}
                disabled={false}
              />
              <label className="styled-checkboxlabel" htmlFor="layer-checkbox-gfw"></label>
            </CheckboxWrapper>
          </div>
          <p>{geoCoverageLabel?.label}</p>
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
            selected={new Date(handleDateToggle()?.start)}
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
            selected={new Date(handleDateToggle().end)}
            minDate={new Date(startDateUnformatted)}
            maxDate={new Date()}
          />
        </div>
      </div>
    </div>
  );
};

export default IntegratedAlertControls;
