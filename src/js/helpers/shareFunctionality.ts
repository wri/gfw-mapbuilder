import store from 'js/store/index';
import { mapController } from 'js/controllers/mapController';

//Generates a shareable URL
export function getShareableURL(): string {
  const urlParams = [];

  const urlEncodingMap = {
    lang: 'selectedLanguage',
    b: 'activeBasemap',
    z: 'zoom',
    lat: 'latitude',
    long: 'longitude',
    d: 'density',
    tab: 'activeTab',
    l: 'layers',
    o: 'opacity',
    gs: 'glad_start_date',
    ge: 'glad_end_date',
    vs: 'virs_start_date',
    ve: 'virs_end_date',
    ms: 'modis_start_date',
    me: 'modis_end_date'
  };

  const { appState, mapviewState } = store.getState();

  //Language
  const { selectedLanguage } = appState;
  urlParams.push(`lang=${selectedLanguage}`);

  //Basemap LayerID
  const { activeBasemap } = mapviewState;
  urlParams.push(`b=${activeBasemap}`);

  //X Y Z
  const { zoom, latitude, longitude } = mapController.getMapviewCoordinates();
  urlParams.push(`z=${zoom}`);
  urlParams.push(`lat=${latitude}`);
  urlParams.push(`long=${longitude}`);

  //Canopy Density Value
  const { density } = appState.leftPanel;
  urlParams.push(`d=${density}`);

  //Visible Layer IDS Opacity
  const { allAvailableLayers } = mapviewState;
  const visibleLayers = allAvailableLayers.filter(l => l.visible);
  const layerIDS: string[] = [];
  const layerOpacities: number[] = [];
  visibleLayers.forEach(l => {
    if (l.sublayer) {
      layerIDS.push(`${l.parentID}[s]${l.id}`);
    } else {
      layerIDS.push(l.id);
    }
    layerOpacities.push(l.opacity);
  });
  const layerIDSString = layerIDS.join('%2C');
  const layerOpacitiesString = layerOpacities.join('%2C');

  urlParams.push(`l=${layerIDSString}`);
  urlParams.push(`o=${layerOpacitiesString}`);

  //Active Tab
  const { activeTab } = appState.leftPanel;
  urlParams.push(`tab=${activeTab}`);
  return urlParams.join('&');
}
