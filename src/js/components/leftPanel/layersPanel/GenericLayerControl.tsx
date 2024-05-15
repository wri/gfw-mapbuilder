import * as React from 'react';
import { useState } from 'react';
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
import { esriQuery } from '../../../helpers/dataPanel/esriQuery';
import { renderModal, setInfoModalLayerID } from '../../../store/appState/actions';
import { RootState } from '../../../store';
import { LayerProps } from '../../../store/mapview/types';
import { mapController } from '../../../controllers/mapController';
import { LAYER_IDS, densityEnabledLayers, drySpellMarks, landCoverMarks } from '../../../../../configs/layer-config';
import { InfoIcon } from '../../../../images/infoIcon';
import { DashboardIcon } from '../../../../images/dashboardIcon';
import { LayerVersionPicker } from './LayerVersionPicker';
import TreeHeightPicker from '../../sharedComponents/TreeHeightPicker';
import { OpacityIcon } from '../../../../images/opacityIcon';
import { DragIcon } from '../../../../images/dragIcon';

import 'react-datepicker/dist/react-datepicker.css';
import { setTimeSlider } from '../../../store/mapview/actions';
import SelectIntegratedAlertLayer from '../../sharedComponents/SelectIntegratedAlertLayer';
import RangeSlider from '../../sharedComponents/RangeSlider';
import GladControls from '../../sharedComponents/GladControls';
import IntegratedAlertControls from '../../sharedComponents/IntegratedAlertControls';
import { subYears } from 'date-fns';
import { generateRangeDate, handleCustomColorTheme } from '../../../../utils';
import { DATES } from '../../../../../configs/dates-config';
import SelectProdesLayer from '../../sharedComponents/selectProdesLayer';
import ReactTooltip from 'react-tooltip';
import {
  errorLayerTranslationTooltip,
  errorMetadataTranslationTooltip,
} from '../../../../../configs/translations/error.translations';

const { TREE_COVER_LOSS } = DATES;

interface LayerInfo {
  layerInfo: any;
  selectedLanguage: string;
}

export const generateDefaultMarks = (params: any) => {
  const { start, end } = params;
  let index = start;
  let rawIndex = 0;
  const newMarks = {};
  const yearsAvailable = end - start;

  while (index <= end) {
    const display = index % 7 === 0 ? 'block' : 'none';
    newMarks[index] = {
      style: { display: yearsAvailable < 6 ? 'block' : display },
      label: index,
      value: rawIndex,
    };
    rawIndex++;
    index++;
  }
  return newMarks;
};

export const generateGWFDateRange = () => {
  const currentDateMinusTwoYears = subYears(new Date(), 2);
  return generateRangeDate(currentDateMinusTwoYears, new Date());
};
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
        returnDistinctValues: true,
      };

      if (layerInfo.type === 'feature') {
        const url = layerInfo.url;
        const fieldResponse = await esriQuery(url, queryParams);
        const fieldOptions = fieldResponse.features.map((feature: any) => {
          const entry = feature.attributes[layerInfo.filterField[selectedLanguage]];
          return {
            label: entry,
            value: entry,
          };
        });
        setOptions(fieldOptions);
      } else {
        const fieldPromises = layerInfo.layerIds.map((id: number) => {
          const subUrl = `${layerInfo.url}/${id}`;
          return esriQuery(subUrl, queryParams);
        });
        Promise.all(fieldPromises).then((values) => {
          const allFieldOptions: any = [];
          values.forEach((value: any) => {
            const fieldOptions = value.features
              .map((feature: any) => {
                const entry = feature.attributes[layerInfo.filterField[selectedLanguage]];
                return {
                  label: entry,
                  value: entry,
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
    clearIndicator: (provided: any) => ({
      ...provided,
      cursor: 'pointer',
      padding: '4px',
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      cursor: 'pointer',
      padding: '4px',
    }),
    container: (provided: any) => ({
      ...provided,
      fontSize: '12px',
      width: '200px',
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      padding: '4px',
    }),
    control: (provided: any) => ({
      ...provided,
      minHeight: '20px',
    }),
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
  isError?: boolean;
}

const GenericLayerControl = (props: LayerControlProps): React.ReactElement => {
  const layer = props.layer;
  const dispatch = useDispatch();
  const [opacityControl, setOpacityControl] = useState(false);
  const selectedLanguage = useSelector((store: RootState) => store.appState.selectedLanguage);
  const customColorTheme = useSelector((store: RootState) => store.appSettings.customColorTheme);
  const gfwLayer = useSelector((store: RootState) => store.appState.leftPanel.integratedAlertLayer);
  const gfwLayerLabel = useSelector((store: RootState) => store.appState.leftPanel.gfwLayerLabel);
  const gfwLayerSubtitle = useSelector((store: RootState) => store.appState.leftPanel.gfwLayerSubtitle);
  const allAvailableLayers = useSelector((store: RootState) => store.mapviewState.allAvailableLayers);
  const rangeSliderYearValue = useSelector((store: RootState) => store.appState.landCoverYearValue);
  const rangeSliderYearDefaultValue = useSelector((store: RootState) => store.appState.landCoverYearRange);
  const selectedProdesLayer = useSelector((store: RootState) => store.appState.leftPanel.prodesLayer);
  const gladLayerConfig: any = allAvailableLayers.filter((layer: any) => layer.id === gfwLayer);
  //Determine if we need density control on this layer
  const densityPicker = layer && densityEnabledLayers.includes(layer.id);
  const altLayerName = layer.label && layer.label[selectedLanguage];
  const prodesLayer = useSelector((store: RootState) => store.appState.leftPanel.prodesLayer);

  const themeColor = handleCustomColorTheme(customColorTheme);

  const returnTimeSlider = (id: string): any => {
    const dateRangeResult = generateGWFDateRange();
    switch (id) {
      case 'TREE_COVER_LOSS':
        return (
          <TimeSlider
            layerID={id}
            defaultMarks={generateDefaultMarks({ start: 2000, end: TREE_COVER_LOSS.max })}
            min={TREE_COVER_LOSS.min}
            max={TREE_COVER_LOSS.max}
            defaultValue={[TREE_COVER_LOSS.min, TREE_COVER_LOSS.max]}
            steps={1}
            included={true}
          />
        );
      case 'DRY_SPELLS':
        dispatch(setTimeSlider([2030]));
        return (
          <TimeSlider
            layerID={id}
            defaultMarks={drySpellMarks}
            min={2030}
            max={2080}
            defaultValue={[2030]}
            steps={100}
            included={false}
          />
        );
      case 'GFW_INTEGRATED_ALERTS':
        return (
          <TimeSlider
            layer={layer}
            layerID={id}
            defaultMarks={dateRangeResult.marks}
            min={dateRangeResult.min}
            max={dateRangeResult.max}
            defaultValue={[dateRangeResult.min, dateRangeResult.max]}
            steps={1}
            included={true}
            dots={true}
          />
        );
      default:
        return null;
    }
  };
  //@TODO @anthony this needs to be merged with the Timeslider component above, this is duplicate code
  const returnRangeSlider = (id: string): any => {
    const umdLayer = allAvailableLayers.find((layer: any) => layer.id === id);
    switch (id) {
      case 'UMD_LAND_COVER':
        return (
          <RangeSlider
            id={id}
            value={rangeSliderYearValue}
            defaultValue={rangeSliderYearDefaultValue}
            marks={landCoverMarks}
            layerConfig={umdLayer}
          />
        );
      default:
        return null;
    }
  };

  const openInfoModal = (): void => {
    let layerId;
    if (layer.title === 'GFW Integrated Alerts') {
      layerId = gfwLayer;
    } else {
      layerId = layer.id;
    }

    if (layer.id === LAYER_IDS.INPE_CERRADO_PRODES && prodesLayer === LAYER_IDS.INPE_AMAZON_PRODES) {
      layerId = LAYER_IDS.INPE_AMAZON_PRODES;
    }
    if (layer) {
      dispatch(renderModal('InfoContent'));
      dispatch(setInfoModalLayerID(layerId));
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
      if (layer.title === 'GFW Integrated Alerts') {
        subTitle = gfwLayerSubtitle;
      } else if (
        (selectedProdesLayer && layer.id === LAYER_IDS.INPE_CERRADO_PRODES) ||
        layer.id === LAYER_IDS.INPE_AMAZON_PRODES
      ) {
        const selectedLayer: any = allAvailableLayers.find((layer: any) => layer.id === selectedProdesLayer);
        subTitle = selectedLayer?.sublabel[selectedLanguage];
      } else {
        subTitle = layer?.sublabel[selectedLanguage];
      }

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
          <GladControls customColorTheme={themeColor} layerConfig={layerConfig} selectedLanguage={selectedLanguage} />
        );
      case 'GFW_INTEGRATED_ALERTS':
        return (
          <IntegratedAlertControls
            customColorTheme={themeColor}
            layerConfig={layerConfig}
            selectedLanguage={selectedLanguage}
            type={'gfw-integrated-alert'}
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
    ...draggableStyle,
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
          isError={layer?.isError}
        />
      );
    }
  };

  const handleFullOpacityChange = (eventValue: any) => {
    let layerConfig: any;

    if (layer.title === 'GFW Integrated Alerts') {
      layerConfig = gladLayerConfig[0];
    } else {
      layerConfig = props;
    }

    if (props.id === 'MODIS_ACTIVE_FIRES') {
      mapController.updateMODISorVIIRSOpacity(props.id, eventValue);
    } else if (layerConfig.layer.type === 'wms' && layerConfig.layer.origin === 'webmap') {
      mapController.setLayerOpacityForWMSLayer(layerConfig.id, eventValue, layerConfig.parentID);
    } else if (layerConfig.id === LAYER_IDS.INPE_CERRADO_PRODES && prodesLayer === LAYER_IDS.INPE_AMAZON_PRODES) {
      mapController.resetProdLayerOpacity(LAYER_IDS.INPE_CERRADO_PRODES);

      mapController.setLayerOpacity(
        LAYER_IDS.INPE_AMAZON_PRODES,
        eventValue,
        layerConfig.sublayer,
        layerConfig.parentID
      );
    } else {
      mapController.setLayerOpacity(layerConfig.id, eventValue, layerConfig.sublayer, layerConfig.parentID);
    }

    return eventValue;
  };

  const handleRendererOpacityChange = (fill: boolean, val: number) => {
    mapController.setLayerOpacityFillOutline(fill, props.id, val, props.sublayer, props.parentID);
    return val;
  };

  const isAmazonProdSelected = (configLayer: any) => {
    return configLayer.id === LAYER_IDS.INPE_CERRADO_PRODES && prodesLayer === LAYER_IDS.INPE_AMAZON_PRODES;
  };

  const handleLayerOpacity = (configLayer: any) => {
    if (isAmazonProdSelected(configLayer)) {
      const prodesLayerConfig: any = allAvailableLayers.find((layer: any) => layer.id === LAYER_IDS.INPE_AMAZON_PRODES);

      if (prodesLayerConfig) {
        return prodesLayerConfig.opacity.combined;
      }
    } else {
      return configLayer.opacity.combined;
    }
  };

  const returnOpacityControl = (layer: LayerProps) => {
    //determine if we have generic slider or dual (fill, outline) one.
    // fill, outline only available for those layers that have potential renderers, sublayers, featurelayers
    if ((layer.sublayer && layer.type !== 'wms') || layer.type === 'feature') {
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
      let layerConfig: any;
      if (layer.title === 'GFW Integrated Alerts') {
        layerConfig = gladLayerConfig[0];
      } else {
        layerConfig = layer;
      }
      return (
        <div style={{ padding: '5px 2rem' }}>
          <LayerTransparencySlider
            layerOpacity={handleLayerOpacity(layerConfig)}
            handleOpacityChange={handleFullOpacityChange}
          />
        </div>
      );
    }
  };

  let layerTitle = altLayerName ? altLayerName : layer?.title;
  if (layer.title === 'GFW Integrated Alerts') {
    layerTitle = gfwLayerLabel;
  }

  const handleLayerError = () => {
    // layer error is higher priority than metadata error
    if (layer?.isError) return true;

    if (layer?.isMetadataError) return true;
    return false;
  };

  const handleInfoModalClick = () => {
    if (layer?.isError || layer?.isMetadataError) {
      return;
    } else {
      openInfoModal();
    }
  };

  const handleToggleLayerOpacityClick = () => {
    if (layer?.isError) {
      return;
    } else {
      toggleOpacitySlider();
    }
  };

  return (
    <div
      ref={props!.dndProvided!.innerRef}
      {...props!.dndProvided!.draggableProps}
      className="draggable-card"
      style={getItemStyle(props!.dndSnapshot!.isDragging, props!.dndProvided!.draggableProps.style)}
    >
      <div
        style={
          layer.title !== 'RADD Alerts' && layer.title !== 'GLAD S2 Alerts' && layer.title !== 'PRODES Amazon Biome'
            ? { visibility: 'visible', borderBottom: '1px solid #8983834a', paddingBottom: 10 }
            : { display: 'none' }
        }
      >
        <div className="layers-control-checkbox">
          <div className="label-wrapper">
            <div {...props!.dndProvided!.dragHandleProps}>
              <div className="label-control-top">
                <div style={{ marginRight: 5, cursor: 'grab', zIndex: 100 }}>
                  <DragIcon titleId="drag-icon" />
                </div>
                {returnLayerControl()}
                <div className="title-wrapper" style={{ color: `${layer?.isError ? 'red' : 'normal'}` }}>
                  <span
                    data-tip={layer?.isError ? errorLayerTranslationTooltip[selectedLanguage].text : ''}
                    className="layer-label"
                    style={{ textTransform: 'capitalize' }}
                  >
                    {layerTitle === 'PRODES Cerrado Biome' ? 'PRODES Layer' : layerTitle}
                  </span>
                </div>
              </div>
            </div>
            {returnSubtitle()}
          </div>
          <div style={{ display: 'flex', gap: 5, flexDirection: 'row' }}>
            <div
              aria-disabled={layer?.isError}
              className={`info-icon-container ${layer?.isError ? 'disabled' : ''}  `}
              style={{ backgroundColor: `${themeColor}` }}
              data-tip={layer?.isError ? errorLayerTranslationTooltip[selectedLanguage].text : ''}
              onClick={handleToggleLayerOpacityClick}
            >
              <OpacityIcon width={10} height={10} fill={'#fff'} />
            </div>
            <div
              className={`info-icon-container ${handleLayerError() ? 'disabled' : ''}  `}
              data-tip={handleLayerError() ? errorMetadataTranslationTooltip[selectedLanguage].text : ''}
              style={{ backgroundColor: `${themeColor}` }}
              onClick={handleInfoModalClick}
            >
              <InfoIcon width={10} height={10} fill={'#fff'} />
              <ReactTooltip arrowColor="#fffce2" effect="solid" className="tab-tooltip" />
            </div>
            {layer?.dashboardURL && (
              <div
                className={`info-icon-container ${layer?.isError ? 'disabled' : ''}  `}
                style={{ backgroundColor: `${themeColor}` }}
                onClick={(): void => openDashModal()}
              >
                <DashboardIcon width={10} height={10} fill={'#fff'} />
              </div>
            )}
          </div>
        </div>
        {layer?.visible && layer.id === 'GFW_INTEGRATED_ALERTS' && <SelectIntegratedAlertLayer />}
        {layer?.visible && layer.id === 'INPE_CERRADO_PRODES' && <SelectProdesLayer />}

        {layer?.visible && returnTimeSlider(props.id)}
        {layer?.visible && returnRangeSlider(props.id)}

        {layer?.visible && densityPicker && <CanopyDensityPicker type={layer.id} />}
        {layer?.visible && layer.id === 'TREE_COVER_HEIGHT' && <TreeHeightPicker />}

        {/*@TODO make this active when windspeed potential urls are available*/}
        {/*{layer?.visible && layer.id === 'WIND_SPEED' && <WindSpeedPicker />}*/}
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
