import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import Select from 'react-select';
import LayerToggleSwitch from './LayerToggleSwitch';
import LayerTransparencySlider from './LayerTransparencySlider';
import LayerRadioButton from './LayerRadioButton';
import CanopyDensityPicker from '../../../../js/components/sharedComponents/CanopyDensityPicker';
import TimeSlider from '../../../../js/components/sharedComponents/TimeSlider';
import DateRangeModis from './DateRangeModis';
import DateRangeViirs from './DateRangeVIIRS';
import { format } from 'date-fns';
import { esriQuery } from '../../../../js/helpers/dataPanel/esriQuery';
import {
  renderModal,
  setInfoModalLayerID,
  setGladStart,
  setGladEnd,
  setGladConfirmed
} from '../../../../js/store/appState/actions';
import { RootState } from '../../../../js/store';
import { LayerProps } from '../../../../js/store/mapview/types';
import { mapController } from '../../../../js/controllers/mapController';
import { densityEnabledLayers } from '../../../../../configs/layer-config';
import { InfoIcon } from '../../../../images/infoIcon';
import { DashboardIcon } from '../../../../images/dashboardIcon';
import { LayerVersionPicker } from './LayerVersionPicker';
import { LayerFactory } from '../../../../js/helpers/LayerFactory';
import { layerControlsTranslations } from '../../../../../configs/translations/leftPanel.translations';
import DatePicker from 'react-datepicker';
import TreeHeightPicker from '../../sharedComponents/TreeHeightPicker';
import { OpacityIcon } from '../../../../images/opacityIcon';
import { DragIcon } from '../../../../images/dragIcon';

import 'react-datepicker/dist/react-datepicker.css';

//Dynamic custom theme override using styled-components lib
interface CheckBoxWrapperProps {
  customColorTheme: string;
}

const CheckboxWrapper = styled.div<CheckBoxWrapperProps>`
  .styled-checkbox:checked + .styled-checkboxlabel:before {
    background-color: ${props => props.customColorTheme};
  }
`;

interface GladControlsProps {
  customColorTheme: string;
  layerConfig: any;
  selectedLanguage: string;
}

const GladControls = (props: GladControlsProps): JSX.Element => {
  const dispatch = useDispatch();
  const gladConfirmed = useSelector((store: RootState) => store.appState.leftPanel.gladConfirmed);

  const gladStart = useSelector((store: RootState) => store.appState.leftPanel.gladStart);

  const gladEnd = useSelector((store: RootState) => store.appState.leftPanel.gladEnd);

  const [unconfirmedAlerts, setUnconfirmedAlerts] = React.useState(gladConfirmed);
  const [startDate, setStartDate] = React.useState(String(gladStart));
  const [endDate, setEndDate] = React.useState(gladEnd);

  function handleStartDateChange(day: any): void {
    const dFormat = format(day, 'yyyy-MM-dd');
    setStartDate(dFormat);
    //@ts-ignore
    const start = new Date(dFormat).getJulian();
    //@ts-ignore
    const end = new Date(endDate).getJulian();
    const gladLayerOld: any = mapController._map!.findLayerById('GLAD_ALERTS');
    const gladIndex: number = mapController._map!.layers.indexOf(gladLayerOld);
    mapController._map?.remove(gladLayerOld);
    const gladLayerNew: any = LayerFactory(mapController._mapview, props.layerConfig);
    gladLayerNew.julianFrom = start;
    gladLayerNew.julianTo = end;
    mapController._map?.add(gladLayerNew, gladIndex);

    dispatch(setGladStart(dFormat));
    dispatch(setGladEnd(endDate));
  }

  function handleEndDateChange(day: any): void {
    const dFormat = format(day, 'yyyy-MM-dd');
    setEndDate(dFormat);
    //@ts-ignore
    const end = new Date(dFormat).getJulian();
    //@ts-ignore
    const start = new Date(startDate).getJulian();
    const gladLayerOld: any = mapController._map!.findLayerById('GLAD_ALERTS');
    const gladIndex: number = mapController._map!.layers.indexOf(gladLayerOld);
    mapController._map?.remove(gladLayerOld);
    const gladLayerNew: any = LayerFactory(mapController._mapview, props.layerConfig);
    gladLayerNew.julianFrom = start;
    gladLayerNew.julianTo = end;
    mapController._map?.add(gladLayerNew, gladIndex);

    dispatch(setGladStart(startDate));
    dispatch(setGladEnd(dFormat));
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
            placeholderText="select a day"
            onChange={date => handleStartDateChange(date)}
            selected={new Date(startDate)}
          />
        </div>

        <div className="date-section-wrapper">
          <label htmlFor="end-date">{layerControlsTranslations[props.selectedLanguage].timeEnd}</label>
          <DatePicker
            placeholderText="select a day"
            onChange={date => handleEndDateChange(date)}
            selected={new Date(endDate)}
          />
        </div>
      </div>
    </div>
  );
};

interface LayerInfo {
  layerInfo: any;
  selectedLanguage: string;
}
const LayerFilterSelection = (props: LayerInfo): JSX.Element => {
  const { layerInfo, selectedLanguage } = props;
  const [options, setOptions] = React.useState<any>([]);

  function handleFilterSelection(option: any): void {
    let defExpression;
    if (option) {
      defExpression = `${layerInfo.filterField[selectedLanguage]} = '${option.value}'`;
    } else {
      defExpression = '1=1';
    }
    mapController.changeLayerDefinitionExpression(layerInfo, defExpression);
  }

  React.useEffect(() => {
    //Fetch Selections on load
    async function getFilters(): Promise<void> {
      const queryParams = {
        where: '1=1',
        returnGeometry: false,
        outFields: layerInfo.filterField[selectedLanguage],
        returnDistinctValues: true
      };

      if (layerInfo.type === 'feature') {
        const url = layerInfo.url;
        const fieldResponse = await esriQuery(url, queryParams);
        const fieldOptions = fieldResponse.features.map((feature: any) => {
          const entry = feature.attributes[layerInfo.filterField[selectedLanguage]];
          return {
            label: entry,
            value: entry
          };
        });
        setOptions(fieldOptions);
      } else {
        const fieldPromises = layerInfo.layerIds.map((id: number) => {
          const subUrl = `${layerInfo.url}/${id}`;
          return esriQuery(subUrl, queryParams);
        });
        Promise.all(fieldPromises).then(values => {
          const allFieldOptions: any = [];
          values.forEach((value: any) => {
            const fieldOptions = value.features
              .map((feature: any) => {
                const entry = feature.attributes[layerInfo.filterField[selectedLanguage]];
                return {
                  label: entry,
                  value: entry
                };
              })
              .filter((option: any) => option.label !== null);
            allFieldOptions.push(fieldOptions);
          });
          setOptions(allFieldOptions[0]);
        });
      }
    }
    getFilters();
  }, [selectedLanguage]);

  const customStyles = {
    clearIndicator: (provided: any, state: any) => ({
      ...provided,
      cursor: 'pointer',
      padding: '4px'
    }),
    dropdownIndicator: (provided: any, state: any) => ({
      ...provided,
      cursor: 'pointer',
      padding: '4px'
    }),
    container: (provided: any, state: any) => ({
      ...provided,
      fontSize: '12px',
      width: '200px'
    }),
    indicatorsContainer: (provided: any, state: any) => ({
      ...provided,
      padding: '4px'
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      minHeight: '20px'
    })
  };

  return (
    <div className="layer-filter-container">
      <p style={{ fontSize: '11px' }}>Filter by category</p>
      <Select
        styles={customStyles}
        placeholder="None Selected"
        options={options}
        isSearchable
        onChange={handleFilterSelection}
        isClearable={true}
      />
    </div>
  );
};

interface LayerControlProps {
  id: string;
  sublayer?: boolean;
  parentID?: string;
  type: 'radio' | 'checkbox' | 'nested' | 'default';
  activeLayer?: string;
  sendActiveLayer?: (val: string) => void;
  layer: LayerProps;
  dndProvided: DraggableProvided;
  dndSnapshot: DraggableStateSnapshot;
}

const GenericLayerControl = (props: LayerControlProps): React.ReactElement => {
  const layer = props.layer;
  const dispatch = useDispatch();
  const [opacityControl, setOpacityControl] = useState(false);

  const selectedLanguage = useSelector((store: RootState) => store.appState.selectedLanguage);

  const customColorTheme = useSelector((store: RootState) => store.appSettings.customColorTheme);
  //Determine if we need density control on this layer
  const densityPicker = layer && densityEnabledLayers.includes(layer.id);
  const altLayerName = layer.label && layer.label[selectedLanguage];

  const returnTimeSlider = (id: string): any => {
    console.log(id);
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

  const toggleOpacitySlider = (): void => {
    setOpacityControl(!opacityControl);
  };

  const openDashModal = (): void => {
    if (layer && layer.dashboardURL) {
      dispatch(renderModal('LayerDash'));
      dispatch(setInfoModalLayerID(layer.dashboardURL));
    }
    return;
  };

  const returnSubtitle = (): JSX.Element | undefined => {
    let subTitle = '';
    if (layer?.sublabel) {
      subTitle = layer.sublabel[selectedLanguage];
      return (
        <>
          <span className="layer-subtitle">{subTitle}</span>
        </>
      );
    } else {
      return;
    }
  };

  const returnDateRange = (id: string, layerConfig: any, selectedLanguage: string): JSX.Element | undefined => {
    if (!layer) return;
    switch (id) {
      case 'VIIRS_ACTIVE_FIRES':
        return <DateRangeViirs layer={layer} id={id} />;
      case 'MODIS_ACTIVE_FIRES':
        return <DateRangeModis layer={layer} id={id} />;
      case 'GLAD_ALERTS':
        return (
          <GladControls
            customColorTheme={customColorTheme}
            layerConfig={layerConfig}
            selectedLanguage={selectedLanguage}
          />
        );
      default:
        break;
    }
  };

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: 'none',
    border: isDragging ? '2px solid #f0ab01' : '',
    boxSizing: isDragging ? 'border-box' : '',
    ...draggableStyle
  });

  const returnLayerControl = (): JSX.Element => {
    function handleLayerRadioClick(val: string) {
      if (props.sendActiveLayer) {
        props.sendActiveLayer(val);
      }
    }
    if (props.type === 'radio') {
      return (
        <LayerRadioButton
          layerID={props.id}
          activeLayerID={props.activeLayer}
          handleLayerRadioClick={handleLayerRadioClick}
        />
      );
    } else {
      return (
        <LayerToggleSwitch
          layerIsVisible={layer?.visible}
          layerID={props.id}
          sublayer={props.sublayer}
          parentID={props.parentID}
        />
      );
    }
  };

  const handleFullOpacityChange = (eventValue: any): void => {
    //TODO: check if we still need modis
    if (props.id === 'MODIS_ACTIVE_FIRES') {
      mapController.updateMODISorVIIRSOpacity(props.id, eventValue);
    } else {
      mapController.setLayerOpacity(props.id, eventValue, props.sublayer, props.parentID);
    }
  };

  const handleRendererOpacityChange = (fill: boolean, val: number): void => {
    mapController.setLayerOpacityFillOutline(fill, props.id, val, props.sublayer, props.parentID);
  };

  const returnOpacityControl = (layer: LayerProps) => {
    //determine if we have generic slider or dual (fill, outline) one.
    // fill, outline only available for those layers that have potential renderers, sublayers, featurelayers
    if (layer.sublayer || layer.type === 'feature') {
      return (
        <div style={{ padding: '5px 2rem' }}>
          <span style={{ fontSize: '0.7rem' }}>Fill</span>
          <LayerTransparencySlider
            layerOpacity={layer.opacity.fill}
            handleOpacityChange={(val: number) => handleRendererOpacityChange(true, val)}
          />
          <span style={{ fontSize: '0.7rem' }}>Outline</span>
          <LayerTransparencySlider
            layerOpacity={layer.opacity.outline}
            handleOpacityChange={(val: number) => handleRendererOpacityChange(false, val)}
          />
        </div>
      );
    } else {
      return (
        <div style={{ padding: '5px 2rem' }}>
          <LayerTransparencySlider
            layerOpacity={layer.opacity.combined}
            handleOpacityChange={handleFullOpacityChange}
          />
        </div>
      );
    }
  };

  return (
    <div
      ref={props!.dndProvided!.innerRef}
      {...props!.dndProvided!.draggableProps}
      className="draggable-card"
      style={getItemStyle(props!.dndSnapshot!.isDragging, props!.dndProvided!.draggableProps.style)}
    >
      <div style={{ borderBottom: '1px solid #8983834a', paddingBottom: 10 }}>
        <div className="layers-control-checkbox">
          <div className="label-wrapper">
            <div {...props!.dndProvided!.dragHandleProps}>
              <div className="label-control-top">
                <div style={{ marginRight: 5, cursor: 'grab', zIndex: 100 }}>
                  <DragIcon titleId="drag-icon" />
                </div>
                {returnLayerControl()}
                <div className="title-wrapper">
                  <span className="layer-label">{altLayerName ? altLayerName : layer?.title}</span>
                </div>
              </div>
            </div>
            {returnSubtitle()}
          </div>
          <div style={{ display: 'flex', gap: 5, flexDirection: 'row' }}>
            <div
              className="info-icon-container"
              style={{ backgroundColor: `${customColorTheme}` }}
              onClick={(): void => toggleOpacitySlider()}
            >
              <OpacityIcon width={12} height={12} fill={'#fff'} />
            </div>
            <div
              className="info-icon-container"
              style={{ backgroundColor: `${customColorTheme}` }}
              onClick={(): void => openInfoModal()}
            >
              <InfoIcon width={10} height={10} fill={'#fff'} />
            </div>
            {layer.dashboardURL && (
              <div
                className="info-icon-container"
                style={{ backgroundColor: `${customColorTheme}` }}
                onClick={(): void => openDashModal()}
              >
                <DashboardIcon width={10} height={10} fill={'#fff'} />
              </div>
            )}
          </div>
        </div>
        {layer?.visible && returnTimeSlider(props.id)}
        {layer?.visible && densityPicker && <CanopyDensityPicker />}
        {layer?.visible && layer.id === 'TREE_COVER_HEIGHT' && <TreeHeightPicker />}
        {layer?.visible && layer.versions && (
          <LayerVersionPicker layerInfo={layer} selectedLanguage={selectedLanguage} />
        )}
        {layer?.visible && layer.filterField && (
          <LayerFilterSelection layerInfo={layer} selectedLanguage={selectedLanguage} />
        )}
        {layer?.visible && returnDateRange(props.id, layer, selectedLanguage)}
        {opacityControl && returnOpacityControl(layer)}
      </div>
    </div>
  );
};

export default GenericLayerControl;
