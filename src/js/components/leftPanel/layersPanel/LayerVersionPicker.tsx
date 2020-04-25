import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { allAvailableLayers as allAvailableLayersAction } from 'js/store/mapview/actions';
import { RootState } from 'js/store';
import { mapController } from 'js/controllers/mapController';
import { fetchLegendInfo } from 'js/helpers/legendInfo';
import MapImageLayer from 'esri/layers/MapImageLayer';
import FeatureLayer from 'esri/layers/FeatureLayer';

interface LayerVersionPickerProps {
  layerInfo: any;
  selectedLanguage: string;
}

interface VersionInfo {
  label: { [key: string]: string };
  url: string;
  layerIds: number[];
}

export const LayerVersionPicker = (
  props: LayerVersionPickerProps
): JSX.Element => {
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
