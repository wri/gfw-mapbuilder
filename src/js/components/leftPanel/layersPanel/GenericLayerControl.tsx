import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import LayerToggleSwitch from './LayerToggleSwitch';
import LayerTransparencySlider from './LayerTransparencySlider';
import LayerRadioButton from './LayerRadioButton';
import CanopyDensityPicker from 'js/components/sharedComponents/CanopyDensityPicker';
import TimeSlider from 'js/components/sharedComponents/TimeSlider';
import DateRange from './DateRange';
import { esriQuery } from 'js/helpers/dataPanel/esriQuery';
import { renderModal, setInfoModalLayerID } from 'js/store/appState/actions';
import { RootState } from 'js/store';
import { densityEnabledLayers } from '../../../../../configs/layer-config';
import { ReactComponent as InfoIcon } from 'images/infoIcon.svg';
import { mapController } from 'js/controllers/mapController';

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
          const entry =
            feature.attributes[layerInfo.filterField[selectedLanguage]];
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
                const entry =
                  feature.attributes[layerInfo.filterField[selectedLanguage]];
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
  }, []);

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
}

const GenericLayerControl = (props: LayerControlProps): React.ReactElement => {
  const dispatch = useDispatch();
  const { allAvailableLayers } = useSelector(
    (store: RootState) => store.mapviewState
  );
  const { selectedLanguage } = useSelector(
    (store: RootState) => store.appState
  );
  const layer = allAvailableLayers.find(l => l.id === props.id);

  //Determine if we need density control on this layer
  const densityPicker = layer && densityEnabledLayers.includes(layer.id);

  const returnTimeSlider = (id: string): any => {
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

  const returnSubtitle = (): JSX.Element | undefined => {
    let subTitle = '';
    if (layer?.sublabel) {
      subTitle = layer.sublabel[selectedLanguage];

      return (
        <>
          <br />
          <span className="layer-subtitle">{subTitle}</span>
        </>
      );
    } else {
      return;
    }
  };

  const returnDateRange = (id: string): JSX.Element | undefined => {
    if (!layer) {
      return;
    }
    /**
     * TODO
     * [ ] glad alerts
     * [ ] terra-I alerts
     */
    switch (id) {
      case 'VIIRS_ACTIVE_FIRES':
      case 'MODIS_ACTIVE_FIRES':
        return <DateRange layer={layer} />;
      default:
        break;
    }
  };

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

  return (
    <>
      <div className="layers-control-checkbox">
        {returnLayerControl()}
        <div className="title-wrapper">
          <span className="layer-label">{layer?.title}</span>
          {returnSubtitle()}
        </div>
        <div className="info-icon-container" onClick={() => openInfoModal()}>
          <InfoIcon width={10} height={10} fill={'#fff'} />
        </div>
      </div>
      {layer?.visible && returnTimeSlider(props.id)}
      {layer?.visible && densityPicker && <CanopyDensityPicker label={true} />}
      {layer?.visible && layer.filterField && (
        <LayerFilterSelection
          layerInfo={layer}
          selectedLanguage={selectedLanguage}
        />
      )}
      {layer?.visible && (
        <LayerTransparencySlider
          layerID={props.id}
          layerOpacity={layer?.opacity}
          sublayer={props.sublayer}
          parentID={props.parentID}
        />
      )}
      {layer?.visible && returnDateRange(props.id)}
    </>
  );
};

export default GenericLayerControl;
