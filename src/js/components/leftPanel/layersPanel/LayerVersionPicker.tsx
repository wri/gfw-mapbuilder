import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { allAvailableLayers as allAvailableLayersAction } from '../../../../js/store/mapview/actions';
import { RootState } from '../../../store';
import { mapController } from '../../../controllers/mapController';
import legendInfoController from '../../../../js/helpers/legendInfo';
import MapImageLayer from '@arcgis/core/layers/MapImageLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { setVersionedLayer } from '../../../store/appState/actions';
import { handleCustomColorTheme } from '../../../../utils';

interface LayerVersionPickerProps {
  layerInfo: any;
  selectedLanguage: string;
}

interface VersionInfo {
  label: { [key: string]: string };
  url: string;
  layerIds: number[];
}

export const LayerVersionPicker = (props: LayerVersionPickerProps): JSX.Element => {
  const dispatch = useDispatch();
  const allAvailableLayers = useSelector((store: RootState) => store.mapviewState.allAvailableLayers);
  const customColorTheme = useSelector((store: RootState) => store.appSettings.customColorTheme);
  const versionedState = useSelector((store: RootState) => store.appState.leftPanel.versionedLayer);
  const { layerInfo, selectedLanguage } = props;

  function checkForVersion(): string {
    if (versionedState.hasOwnProperty(layerInfo.id)) {
      return versionedState[layerInfo.id];
    } else {
      return layerInfo.versions[0].label[selectedLanguage];
    }
  }

  const [activeVersion, setActiveVersion] = React.useState(checkForVersion());

  const themeColor = handleCustomColorTheme(customColorTheme);

  async function swapLayersAndSyncMap(layerInfo: any, versionValue: string): Promise<void> {
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

    const legendInfoObject = await legendInfoController.fetchLegendInfo(versionLayerURL);
    const layerLegendInfo =
      legendInfoObject &&
      !legendInfoObject.error &&
      legendInfoObject?.layers.filter((l: any) => versionLayerIds.includes(l.layerId));

    const newconf = Object.assign(layerInfo, {
      layerIds: versionLayerIds,
      url: versionLayerURL,
      legendInfo: layerLegendInfo,
      versionIndex: newVersionIndex,
    });

    const layerOptions = {
      id: newconf.id,
      title: newconf.title,
      visible: newconf.visible,
      url: newconf.url,
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
    const newLayersArray = allAvailableLayers.map((l) => {
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
    //sync to redux
    const newVal = { [layerInfo.id]: e.target.value };
    dispatch(setVersionedLayer(newVal));
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
        style={{ border: `1px solid ${themeColor}` }}
        className="date-time-toggle"
        onChange={handleLayerVersionChange}
        value={activeVersion}
      >
        {versionOptions}
      </select>
    </div>
  );
};
