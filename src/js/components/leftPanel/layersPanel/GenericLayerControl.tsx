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
import { allAvailableLayers as allAvailableLayersAction } from 'js/store/mapview/actions';
import { RootState } from 'js/store';
import { densityEnabledLayers } from '../../../../../configs/layer-config';
import { ReactComponent as InfoIcon } from 'images/infoIcon.svg';
import { mapController } from 'js/controllers/mapController';
import MapImageLayer from 'esri/layers/MapImageLayer';
import FeatureLayer from 'esri/layers/FeatureLayer';
import { fetchLegendInfo } from 'js/helpers/legendInfo';

interface LayerVersionPickerProps {
  layerInfo: any;
  selectedLanguage: string;
}

interface VersionInfo {
  label: { [key: string]: string };
  url: string;
  layerIds: number[];
}

const LayerVersionPicker = (props: LayerVersionPickerProps): JSX.Element => {
  const dispatch = useDispatch();
  const allAvailableLayers = useSelector(
    (store: RootState) => store.mapviewState.allAvailableLayers
  );
  const { layerInfo, selectedLanguage } = props;
  const [activeVersion, setActiveVersion] = React.useState(
    layerInfo.versions[0].label[selectedLanguage]
  );

  async function swapLayersAndSyncMap(
    layerInfo: any,
    versionValue: string
  ): Promise<void> {
    //Remove previous version layer from the map
    const prevLayer = mapController._map?.findLayerById(layerInfo.id);
    if (!prevLayer) return;
    mapController._map?.remove(prevLayer);
    const newVersionIndex = layerInfo.versions.findIndex(
      (v: VersionInfo) => v.label[selectedLanguage] === versionValue
    );
    const versionLayerIds = layerInfo.versions[newVersionIndex]?.layerIds;
    const versionLayerURL = layerInfo.versions[newVersionIndex].url;

    //TODO: Implement fetching for featureServer layers not only mapimage ones!!!
    //Generate new legend iformation
    const legendInfoObject = await fetchLegendInfo(versionLayerURL);
    const layerLegendInfo =
      legendInfoObject &&
      !legendInfoObject.error &&
      legendInfoObject?.layers.filter((l: any) =>
        versionLayerIds.includes(l.layerId)
      );

    const newconf = Object.assign(layerInfo, {
      layerIds: versionLayerIds,
      url: versionLayerURL,
      legendInfo: layerLegendInfo
    });
    const layerOptions = {
      id: newconf.id,
      title: newconf.title,
      visible: newconf.visible,
      url: newconf.url
    };

    if (newconf.type === 'dynamic') {
      layerOptions['sublayers'] = newconf.layerIds.map((id: any) => {
        return { id: id, visible: true };
      });
      const esriLayer = new MapImageLayer(layerOptions);
      mapController._map?.add(esriLayer);
    } else {
      const esriLayer = new FeatureLayer(layerOptions);
      mapController._map?.add(esriLayer);
    }

    //Update Redux
    const newLayersArray = allAvailableLayers.map(l => {
      if (l.id === newconf.id) {
        return newconf;
      } else {
        return l;
      }
    });
    dispatch(allAvailableLayersAction(newLayersArray));
  }

  function handleLayerVersionChange(e: any): void {
    //if we are changing the version, swap the layers, otherwise do nothing
    if (e.target.value !== activeVersion) {
      swapLayersAndSyncMap(layerInfo, e.target.value);
      setActiveVersion(e.target.value);
    }
  }

  const versionOptions = layerInfo.versions.map((version: any, i: number) => {
    return (
      <option key={i} value={version.label[selectedLanguage]}>
        {version.label[selectedLanguage]}
      </option>
    );
  });

  return (
    <div className="layer-version-picker-container">
      <p>{layerInfo.versionHeaderText[selectedLanguage]}</p>
      <select
        className="date-time-toggle"
        onChange={handleLayerVersionChange}
        value={activeVersion}
      >
        {versionOptions}
      </select>
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
}

const GenericLayerControl = (props: LayerControlProps): React.ReactElement => {
  const dispatch = useDispatch();
  const allAvailableLayers = useSelector(
    (store: RootState) => store.mapviewState.allAvailableLayers
  );
  const selectedLanguage = useSelector(
    (store: RootState) => store.appState.selectedLanguage
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
      {layer?.visible && layer.versions && (
        <LayerVersionPicker
          layerInfo={layer}
          selectedLanguage={selectedLanguage}
        />
      )}
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
