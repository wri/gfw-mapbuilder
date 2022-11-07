import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import * as React from 'react';
import { DATE_PICKER_START_DATES, LAYER_IDS } from '../../../../configs/layer-config';
import { format } from 'date-fns';
import { mapController } from '../../controllers/mapController';
import { LayerFactory } from '../../helpers/LayerFactory';
import {
  setIntegratedAlertLayerEnd,
  setIntegratedAlertLayerStart,
  setHighConfidenceConfirmed,
  setGladStart,
  setGladEnd,
  setGlad2Start,
  setGlad2End,
  setRaddAlertEnd,
  setRaddAlertStart,
} from '../../store/appState/actions';
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

  const gfwIntegratedStart = useSelector((store: RootState) => store.appState.leftPanel.gfwIntegratedStart);

  const gfwIntegratedEnd = useSelector((store: RootState) => store.appState.leftPanel.gfwIntegratedEnd);
  const integratedAlertLayer = useSelector((store: RootState) => store.appState.leftPanel.integratedAlertLayer);

  const gladStart = useSelector((store: RootState) => store.appState.leftPanel.gladStart);
  const gladEnd = useSelector((store: RootState) => store.appState.leftPanel.gladEnd);

  const glad2Start = useSelector((store: RootState) => store.appState.leftPanel.glad2Start);
  const glad2End = useSelector((store: RootState) => store.appState.leftPanel.glad2End);

  const raddAlertStart = useSelector((store: RootState) => store.appState.leftPanel.raddAlertStart);
  const raddAlertEnd = useSelector((store: RootState) => store.appState.leftPanel.raddAlertEnd);

  const [startDate, setStartDate] = React.useState(String(DATE_PICKER_START_DATES.GFW_INTEGRATED_ALERTS));
  const [startDateUnformatted, setStartDateUnformatted] = React.useState(
    String(DATE_PICKER_START_DATES.GFW_INTEGRATED_ALERTS)
  );
  const [endDateUnformatted, setEndDateUnformatted] = React.useState(gfwIntegratedEnd);
  const [endDate, setEndDate] = React.useState(gfwIntegratedEnd);

  async function handleStartDateChange(day: any) {
    const year = new Date(day).getFullYear();
    const month = new Date(day).getMonth();
    const dayOfMonth = new Date(day).getDate();
    const date = new Date(year, month, dayOfMonth).toLocaleString();
    const dFormat = date;

    setStartDate(dFormat);
    setStartDateUnformatted(day);

    //@ts-ignore
    const start = new Date(dFormat).getJulian();
    //@ts-ignore
    const end = new Date(endDate).getJulian();

    if (integratedAlertLayer === LAYER_IDS.GFW_INTEGRATED_ALERTS) {
      await mapController.toggleGladLayer({ id: LAYER_IDS.GFW_INTEGRATED_ALERTS, start, end });

      dispatch(setIntegratedAlertLayerStart(dFormat));
    } else if (integratedAlertLayer === LAYER_IDS.GLAD_ALERTS) {
      await mapController.toggleGladLayer({ id: LAYER_IDS.GLAD_ALERTS, start, end });

      const selectedLayer = mapController._map!.findLayerById(LAYER_IDS.GLAD_ALERTS);
      selectedLayer.visible = true;
      dispatch(setGladStart(dFormat));
    } else if (integratedAlertLayer === LAYER_IDS.GLAD_S2_ALERTS) {
      dispatch(setGlad2Start(dFormat));

      await mapController.toggleGladLayer({ id: LAYER_IDS.GLAD_S2_ALERTS, start, end });
    } else if (integratedAlertLayer === LAYER_IDS.RADD_ALERTS) {
      dispatch(setRaddAlertStart(dFormat));

      await mapController.toggleGladLayer({ id: LAYER_IDS.RADD_ALERTS, start, end });
    }
  }

  async function handleEndDateChange(day: any) {
    const year = new Date(day).getFullYear();
    const month = new Date(day).getMonth();
    const dayOfMonth = new Date(day).getDate();
    const date = new Date(year, month, dayOfMonth).toLocaleString();
    const dFormat = date;

    setEndDate(dFormat);
    setEndDateUnformatted(day);
    //@ts-ignore
    const end = new Date(dFormat).getJulian();
    //@ts-ignore
    // const start = new Date(startDate).getJulian();
    let start;

    if (integratedAlertLayer === LAYER_IDS.GFW_INTEGRATED_ALERTS) {
      //@ts-ignore
      start = new Date(gfwIntegratedStart).getJulian();
      await mapController.toggleGladLayer({ id: LAYER_IDS.GFW_INTEGRATED_ALERTS, start, end });

      // console.log()
      console.log({
        id: LAYER_IDS.GFW_INTEGRATED_ALERTS,
        start,
        end,
        from: 'integrated alert control',
        endDate: dFormat,
        startDate,
      });
      dispatch(setIntegratedAlertLayerEnd(date));
    } else if (integratedAlertLayer === LAYER_IDS.GLAD_ALERTS) {
      //@ts-ignore

      start = new Date(gladStart).getJulian();
      await mapController.toggleGladLayer({ id: LAYER_IDS.GLAD_ALERTS, start, end });

      const selectedLayer = mapController._map!.findLayerById(LAYER_IDS.GLAD_ALERTS);
      selectedLayer.visible = true;
      dispatch(setGladEnd(date));
    } else if (integratedAlertLayer === LAYER_IDS.GLAD_S2_ALERTS) {
      dispatch(setGlad2End(date));

      //@ts-ignore
      start = new Date(glad2Start).getJulian();
      await mapController.toggleGladLayer({ id: LAYER_IDS.GLAD_S2_ALERTS, start, end });
    } else if (integratedAlertLayer === LAYER_IDS.RADD_ALERTS) {
      dispatch(setRaddAlertEnd(date));
      //@ts-ignore

      start = new Date(raddAlertStart).getJulian();
      await mapController.toggleGladLayer({ id: LAYER_IDS.RADD_ALERTS, start, end });
    }
  }

  async function showOnlyHighConfidenceToggle() {
    dispatch(setHighConfidenceConfirmed(!highConfidenceConfirmed));
    const gfwIntegratedLayerOld: any = mapController._map!.findLayerById(LAYER_IDS.GFW_INTEGRATED_ALERTS);
    mapController._map?.remove(gfwIntegratedLayerOld);
    const gfwIntegratedLayerNew: any = LayerFactory(mapController._mapview, props.layerConfig);
    gfwIntegratedLayerNew.highConfidenceConfirmed = !highConfidenceConfirmed;
    mapController._map?.add(gfwIntegratedLayerNew);
  }

  async function showGeographicCoverage() {
    if (integratedAlertLayer === LAYER_IDS.GFW_INTEGRATED_ALERTS) {
      const selectedLayer = mapController._map!.findLayerById(LAYER_IDS.GFW_INTEGRATED_ALERTS);
      selectedLayer.visible = true;
    }

    if (integratedAlertLayer === LAYER_IDS.GLAD_ALERTS) {
      const selectedLayer = mapController._map!.findLayerById(LAYER_IDS.GLAD_ALERTS);
      selectedLayer.visible = true;
    }

    if (integratedAlertLayer === LAYER_IDS.GLAD_S2_ALERTS) {
      const selectedLayer = mapController._map!.findLayerById(LAYER_IDS.GLAD_S2_ALERTS);
      selectedLayer.visible = true;
    }

    if (integratedAlertLayer === LAYER_IDS.RADD_ALERTS) {
      const selectedLayer = mapController._map!.findLayerById(LAYER_IDS.RADD_ALERTS);
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
