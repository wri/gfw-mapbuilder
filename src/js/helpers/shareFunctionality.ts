import store from '../../js/store/index';
import { mapController } from '../controllers/mapController';
import {
  setCanopyDensity,
  setGladConfirmed,
  setGladEnd,
  setGladStart,
  setModisEnd,
  setModisStart,
  setViirsEnd,
  setViirsStart,
} from '../store/appState/actions';
import { LayerFeatureResult } from '../store/mapview/types';
import { registerGeometry } from './geometryRegistration';
import { setTimeSlider } from '../store/mapview/actions';

/* eslint no-case-declarations: 0 */

//this is a map of what we are tracking and parsing
const urlEncodingMap = {
  l: 'selectedLanguage',
  b: 'activeBasemap',
  z: 'zoom',
  coords: 'coordinates',
  d: 'density',
  tab: 'activeTab',
  layers: 'layers',
  o: 'opacity',
  gladconfirmed: 'glad_confirmed',
  gs: 'glad_start_date',
  ge: 'glad_end_date',
  vs: 'virs_start_date',
  ve: 'virs_end_date',
  ms: 'modis_start_date',
  me: 'modis_end_date',
  ty: 'tree_cover_loss_years',
};

function getGeostoreID(activeFeatureIndex: number[], activeFeatures: LayerFeatureResult[]): Promise<string> {
  const activeLayer = activeFeatures[activeFeatureIndex[0]];
  const activeFeature = activeLayer?.features[activeFeatureIndex[1]];
  return registerGeometry(activeFeature)
    .then((response) => response.json())
    .then((res) => {
      return res.data.id;
    });
}

//Generates a shareable URL
interface ShareURLProps {
  report: boolean;
}
export async function getShareableURL(props: ShareURLProps): Promise<string> {
  const urlParams: string[] = [];

  const { appState, mapviewState } = store.getState();

  //Report boolean
  urlParams.push(`report=${props.report}`);

  //Active Feature geostoreID specificly for the report usecase
  if (props.report) {
    const geostoreID = await getGeostoreID(mapviewState.activeFeatureIndex, mapviewState.activeFeatures);
    urlParams.push(`geostoreID=${geostoreID}`);

    //Report queries active feature for attributes, so we need objectID, layerID and subLayerID tracking also
    const activeLayer = mapviewState.activeFeatures[mapviewState.activeFeatureIndex[0]];
    const activeFeature = activeLayer.features[mapviewState.activeFeatureIndex[1]];
    urlParams.push(`acLayer=${activeLayer.layerID}`);
    urlParams.push(`acSublayer=${activeLayer.sublayerID}`);
    urlParams.push(`objectid=${appState.multiPolygonSelectionMode ? 'undefined' : activeFeature.objectid}`);
  }

  //Basemap LayerID
  const { activeBasemap } = mapviewState;
  urlParams.push(`b=${activeBasemap}`);

  //Language
  const { selectedLanguage, leftPanel } = appState;
  urlParams.push(`l=${selectedLanguage}`);

  //X Y Z, In case of Report, we do not need this, because we are zooming to the active feature
  if (!props.report) {
    const { zoom, latitude, longitude } = mapController.getMapviewCoordinates();
    urlParams.push(`z=${zoom}`);
    urlParams.push(`coords=${longitude}%2C${latitude}`);
  }

  //Canopy Density Value
  const { density } = appState.leftPanel;
  urlParams.push(`d=${density}`);

  //Tree Cover Loss years
  const { timeSlider } = mapviewState;
  urlParams.push(`ty=${timeSlider[0]}%2C${timeSlider[1]}`);

  //Visible Layer IDS Opacity
  const { allAvailableLayers } = mapviewState;
  const visibleLayers = allAvailableLayers.filter((l) => l.visible);
  const layerIDS: string[] = [];
  const layerOpacities: number[] = [];
  visibleLayers.forEach((l) => {
    if (l.sublayer) {
      layerIDS.push(`${l.parentID}[s]${l.id}`);
    } else {
      layerIDS.push(l.id);
    }
    layerOpacities.push(l.opacity.combined);
  });
  const layerIDSString = layerIDS.join('%2C');
  const layerOpacitiesString = layerOpacities.join('%2C');

  urlParams.push(`layers=${layerIDSString}`);
  urlParams.push(`o=${layerOpacitiesString}`);

  // Glad alerts > start date gs, end date ge and toggle gladconfirmed=true/false
  const gladLayer: any = mapController._map?.findLayerById('GLAD_ALERTS');
  if (gladLayer) {
    urlParams.push(`gladconfirmed=${gladLayer.confirmed}`);
    urlParams.push(`gs=${leftPanel.analysisDateRange[0]}`);
    urlParams.push(`ge=${leftPanel.analysisDateRange[1]}`);
  }

  const gfwIntegratedLayer: any = mapController._map?.findLayerById('GFW_INTEGRATED_ALERT');
  if (gfwIntegratedLayer) {
    urlParams.push(`highConfidenceConfirmed=${gfwIntegratedLayer.highConfidenceConfirmed}`);
    urlParams.push(`gs=${leftPanel.gfwIntegratedStart}`);
    urlParams.push(`ge=${leftPanel.gfwIntegratedEnd}`);
  }

  const viirsLayer = mapController._map?.findLayerById('VIIRS_ACTIVE_FIRES');
  if (viirsLayer) {
    urlParams.push(`vs=${leftPanel.viirsStart}`);
    urlParams.push(`ve=${leftPanel.viirsEnd}`);
  }
  const modisLayer = mapController._map?.findLayerById('MODIS_ACTIVE_FIRES');
  if (modisLayer) {
    urlParams.push(`ms=${leftPanel.modisStart}`);
    urlParams.push(`me=${leftPanel.modisEnd}`);
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
  const allLayerIDS = parsedURL.searchParams.get('layers')?.split(',');
  const opacityArray = parsedURL.searchParams
    .get('o')
    ?.split(',')
    .map((o) => Number(o));

  return allLayerIDS
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
}

//Apply hash state for zoom, lat, long, tab and density values
export function parseURLandApplyChanges(): void {
  const parsedURL = new URL(window.location.href);
  Object.keys(urlEncodingMap).forEach((param: string) => {
    const urlParamValue = parsedURL.searchParams.get(param);
    if (urlParamValue && mapController._mapview) {
      //we got a param match, apply it to the global application state where appropriate
      switch (param) {
        case 'z':
          mapController._mapview.zoom = Number(urlParamValue);
          break;
        case 'b':
          //if our basemap is not webmap we need to switch it up
          if (urlParamValue === 'webmap') {
            return;
          } else if (urlParamValue.includes('landsat')) {
            const year: string = urlParamValue.split('-')[1];
            const landsatConfig: any = {};
            //@ts-ignore
            mapController.addLandsatLayer(landsatConfig, year);
          } else if (urlParamValue.includes('wri')) {
            mapController.setWRIBasemap(urlParamValue);
          } else {
            //@ts-ignore
            mapController._map!.basemap = urlParamValue;
          }
          break;
        case 'coords':
          const coordinates = urlParamValue.split(',').map((c) => Number(c));
          mapController._mapview?.goTo(coordinates);
          break;
        case 'd':
          store.dispatch(setCanopyDensity(Number(urlParamValue)));
          break;
        case 'gladconfirmed':
          //Url params always come in as strings so we need to do exact check
          const gladConfirmedValue = urlParamValue === 'true';
          store.dispatch(setGladConfirmed(gladConfirmedValue));
          break;
        case 'gs':
          store.dispatch(setGladStart(urlParamValue));
          break;
        case 'ge':
          store.dispatch(setGladEnd(urlParamValue));
          break;
        case 'vs':
          store.dispatch(setViirsStart(urlParamValue));
          break;
        case 've':
          store.dispatch(setViirsEnd(urlParamValue));
          break;
        case 'ms':
          store.dispatch(setModisStart(urlParamValue));
          break;
        case 'me':
          store.dispatch(setModisEnd(urlParamValue));
          break;
        case 'ty':
          const yearRange = urlParamValue.split(',').map((c) => Number(c));
          store.dispatch(setTimeSlider(yearRange));
          break;
        default:
          break;
      }
    }
  });
}
