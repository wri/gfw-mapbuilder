import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import * as React from 'react';
import { DATE_PICKER_START_DATES } from '../../../../configs/layer-config';
import { format } from 'date-fns';
import { mapController } from '../../controllers/mapController';
import { LayerFactory } from '../../helpers/LayerFactory';
import { setGladConfirmed, setGladEnd, setGladStart } from '../../store/appState/actions';
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
  const gladEnd = useSelector((store: RootState) => store.appState.leftPanel.gladEnd);
  const allAvailableLayers = useSelector((store: RootState) => store.mapviewState.allAvailableLayers);
  const [unconfirmedAlerts, setUnconfirmedAlerts] = React.useState(gladConfirmed);
  const [startDate, setStartDate] = React.useState(String(DATE_PICKER_START_DATES.GLAD_ALERTS));
  const [startDateUnformatted, setStartDateUnformatted] = React.useState(String(DATE_PICKER_START_DATES.GLAD_ALERTS));
  const [endDateUnformatted, setEndDateUnformatted] = React.useState(gladEnd);
  const [endDate, setEndDate] = React.useState(gladEnd);

  async function addNewGladLayer(start: Date, end: Date) {
    const gladLayerConfig: any = allAvailableLayers.filter((layer: any) => layer.id === 'GLAD_ALERTS');
    const gladLayerOld: any = mapController._map!.findLayerById('GLAD_ALERTS');
    const gladIndex: number = mapController._map!.layers.indexOf(gladLayerOld);

    const gladLayerNew: any = await LayerFactory(mapController._mapview, gladLayerConfig[0]);
    gladLayerNew.julianFrom = start;
    gladLayerNew.julianTo = end;
    mapController._map?.add(gladLayerNew, gladIndex);
  }

  async function removeGladLayer() {
    const gladLayerOld: any = mapController._map!.findLayerById('GLAD_ALERTS');
    mapController._map?.remove(gladLayerOld);
  }

  async function handleDateChange(day: any, type?: string) {
    const dFormat = format(day, 'yyyy-MM-dd');
    if (type === 'start') {
      setStartDate(dFormat);
      setStartDateUnformatted(day);
    } else {
      setEndDate(dFormat);
      setEndDateUnformatted(day);
    }

    //@ts-ignore
    const start = new Date(dFormat).getJulian();
    //@ts-ignore
    const end = new Date(endDate).getJulian();

    await removeGladLayer();
    await addNewGladLayer(start, end);

    const selectedLayer = mapController._map!.findLayerById('GLAD_ALERTS');
    selectedLayer.visible = true;

    type === 'start' ? dispatch(setGladStart(dFormat)) : dispatch(setGladStart(startDate));
    dispatch(setGladEnd(endDate));
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

  return (
    <div className="glad-control-wrapper">
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

      <div className="calendar-wrapper">
        <div className="date-section-wrapper">
          <label htmlFor="start-date">{layerControlsTranslations[props.selectedLanguage].timeStart}</label>
          <DatePicker
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            placeholderText="select a day"
            onChange={(date: Date) => handleDateChange(date, 'start')}
            selected={new Date(startDateUnformatted)}
            minDate={new Date(DATE_PICKER_START_DATES.GLAD_ALERTS)}
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
            onChange={(date) => handleDateChange(date)}
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
