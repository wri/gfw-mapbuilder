import store from 'js/store/index';
import { mapController } from 'js/controllers/mapController';
import {
  selectActiveTab,
  setCanopyDensity,
  setGladConfirmed,
  setGladStart,
  setGladEnd,
  setTerraStart,
  setTerraEnd
} from 'js/store/appState/actions';
import { LayerFeatureResult } from 'js/store/mapview/types';
import { registerGeometry } from 'js/helpers/geometryRegistration';

/* eslint no-case-declarations: 0 */

//this is a map of what we are tracking and parsing
const urlEncodingMap = {
  lang: 'selectedLanguage',
  b: 'activeBasemap',
  z: 'zoom',
  coords: 'coordinates',
  d: 'density',
  tab: 'activeTab',
  l: 'layers',
  o: 'opacity',
  gladconfirmed: 'glad_confirmed',
  gs: 'glad_start_date',
  ge: 'glad_end_date',
  vs: 'virs_start_date',
  ve: 'virs_end_date',
  ms: 'modis_start_date',
  me: 'modis_end_date',
  ts: 'terra_start',
  te: 'terra_end'
};

function getGeostoreID(
  activeFeatureIndex: number[],
  activeFeatures: LayerFeatureResult[]
): Promise<string> {
  const activeLayer = activeFeatures[activeFeatureIndex[0]];
  const activeFeature = activeLayer?.features[activeFeatureIndex[1]];
  return registerGeometry(activeFeature)
    .then(response => response.json())
    .then(res => {
      return res.data.id;
    });
}

//Generates a shareable URL
interface ShareURLProps {
  report: boolean;
}
export async function getShareableURL(props: ShareURLProps): Promise<string> {
  const urlParams = [];

  const { appState, mapviewState } = store.getState();

  //Report boolean
  urlParams.push(`report=${props.report}`);

  //Active Feature geostoreID specificly for the report usecase
  if (props.report) {
    const geostoreID = await getGeostoreID(
      mapviewState.activeFeatureIndex,
      mapviewState.activeFeatures
    );
    urlParams.push(`geostoreID=${geostoreID}`);

    //Report queries active feature for attributes, so we need objectID, layerID and subLayerID tracking also
    const activeLayer =
      mapviewState.activeFeatures[mapviewState.activeFeatureIndex[0]];
    const activeFeature =
      activeLayer.features[mapviewState.activeFeatureIndex[1]];
    urlParams.push(`acLayer=${activeLayer.layerID}`);
    urlParams.push(`acSublayer=${activeLayer.sublayerID}`);
    urlParams.push(`objectid=${activeFeature.objectid}`);
  }

  //Basemap LayerID
  const { activeBasemap } = mapviewState;
  urlParams.push(`b=${activeBasemap}`);

  //Language
  const { selectedLanguage, leftPanel } = appState;
  urlParams.push(`lang=${selectedLanguage}`);

  //X Y Z, In case of Report, we do not need this, because we are zooming to the active feature
  if (!props.report) {
    const { zoom, latitude, longitude } = mapController.getMapviewCoordinates();
    urlParams.push(`z=${zoom}`);
    urlParams.push(`coords=${longitude}%2C${latitude}`);
  }

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

  // Glad alerts > start date gs, end date ge and toggle gladconfirmed=true/false
  const gladLayer: any = mapController._map?.findLayerById('GLAD_ALERTS');
  if (gladLayer) {
    urlParams.push(`gladconfirmed=${gladLayer.confirmed}`);
    urlParams.push(`gs=${leftPanel.gladStart}`);
    urlParams.push(`ge=${leftPanel.gladEnd}`);
  }

  const terraLayer: any = mapController._map?.findLayerById('TERRA_I_ALERTS');
  if (terraLayer) {
    urlParams.push(`ts=${leftPanel.terraStart}`);
    urlParams.push(`te=${leftPanel.terraEnd}`);
  }

  return urlParams.join('&');
}

//Retrieves layer information from URL hash
export interface LayerInfo {
  layerID: string;
  sublayerID: string | number | null;
  opacity: number;
}
export function getLayerInfoFromURL(): LayerInfo[] {
  const parsedURL = new URL(window.location.href);
  const allLayerIDS = parsedURL.searchParams.get('l')?.split(',');
  const opacityArray = parsedURL.searchParams
    .get('o')
    ?.split(',')
    .map(o => Number(o));

  const mergedLayerInfosFromUrl = allLayerIDS
    ? allLayerIDS.map((id: string, i: number) => {
        const outputObject = {} as any;
        const isSublayer = id.includes('[s]');
        if (isSublayer) {
          const layerAndSubIds = id.split('[s]');
          outputObject.layerID = layerAndSubIds[0];
          outputObject.sublayerID = layerAndSubIds[1];
          outputObject.opacity = opacityArray?.[i];
        } else {
          outputObject.layerID = id;
          outputObject.sublayerID = null;
          outputObject.opacity = opacityArray?.[i];
        }
        return outputObject;
      })
    : [];
  return mergedLayerInfosFromUrl;
}

//Apply hash state for zoom, lat, long, tab and density values
export function parseURLandApplyChanges(): void {
  const parsedURL = new URL(window.location.href);
  Object.keys(urlEncodingMap).forEach((param: string) => {
    const urlParamValue = parsedURL.searchParams.get(param);
    if (urlParamValue) {
      //we got a param match, apply it to the global application state where appropriate
      switch (param) {
        case 'z':
          mapController._mapview.zoom = Number(urlParamValue);
          break;
        case 'coords':
          const coordinates = urlParamValue.split(',').map(c => Number(c));
          mapController._mapview.goTo(coordinates);
          break;
        case 'd':
          store.dispatch(setCanopyDensity(Number(urlParamValue)));
          break;
        case 'tab':
          store.dispatch(selectActiveTab(urlParamValue));
          break;
        case 'gladconfirmed':
          //Url params always come in as strings so we need to do exact check
          const gladConfirmedValue = urlParamValue === 'true' ? true : false;
          store.dispatch(setGladConfirmed(gladConfirmedValue));
          break;
        case 'gs':
          store.dispatch(setGladStart(urlParamValue));
          break;
        case 'ge':
          store.dispatch(setGladEnd(urlParamValue));
          break;
        case 'ts':
          store.dispatch(setTerraStart(urlParamValue));
          break;
        case 'te':
          store.dispatch(setTerraEnd(urlParamValue));
          break;
        default:
          break;
      }
    }
  });
}
