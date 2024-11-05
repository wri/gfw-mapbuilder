import { GEOGRAPHIC_COVER_LAYER_URL, LAYER_IDS } from '../../../../../configs/layer-config';

import VectorTileLayer from '@arcgis/core/layers/VectorTileLayer';
import { mapController } from '../../../controllers/mapController';
import { createGladS2Layer } from '../../../layers/GladS2Layer';
import { createRadd } from '../../../layers/RaddLayer';
import store from '../../../../../src/js/store';
import {
  setGlad2End,
  setGlad2Start,
  setGladEnd,
  setGladStart,
  setIntegratedAlertLayerEnd,
  setIntegratedAlertLayerStart,
  setRaddAlertEnd,
  setRaddAlertStart,
} from '../../../store/appState/actions';

const gfwIntegratedStart = store.getState().appState.leftPanel.gfwIntegratedStart;
const glad2Start = store.getState().appState.leftPanel.glad2Start;
const gladStart = store.getState().appState.leftPanel.gladStart;
const raddAlertStart = store.getState().appState.leftPanel.raddAlertStart;

export const onStartDateChange = async (dFormat: string, endDate: string) => {
  const integratedAlertLayer = store.getState().appState.leftPanel.integratedAlertLayer;

  //@ts-ignore
  const start = new Date(dFormat).getJulian();
  //@ts-ignore
  const end = new Date(endDate).getJulian();

  if (integratedAlertLayer === LAYER_IDS.GFW_INTEGRATED_ALERTS) {
    await mapController.toggleGladLayer({ id: LAYER_IDS.GFW_INTEGRATED_ALERTS, start, end });

    store.dispatch(setIntegratedAlertLayerStart(dFormat));
  } else if (integratedAlertLayer === LAYER_IDS.GLAD_ALERTS) {
    await mapController.toggleGladLayer({ id: LAYER_IDS.GLAD_ALERTS, start, end });

    const selectedLayer = mapController._map!.findLayerById(LAYER_IDS.GLAD_ALERTS);
    selectedLayer.visible = true;
    store.dispatch(setGladStart(dFormat));
  } else if (integratedAlertLayer === LAYER_IDS.GLAD_S2_ALERTS) {
    store.dispatch(setGlad2Start(dFormat));

    await mapController.toggleGladLayer({ id: LAYER_IDS.GLAD_S2_ALERTS, start, end });
  } else if (integratedAlertLayer === LAYER_IDS.RADD_ALERTS) {
    store.dispatch(setRaddAlertStart(dFormat));

    await mapController.toggleGladLayer({ id: LAYER_IDS.RADD_ALERTS, start, end });
  }
};

export const onEndDateChange = async (date: string, dFormat: string) => {
  let start;
  //@ts-ignore
  const end = new Date(dFormat).getJulian();
  const integratedAlertLayer = store.getState().appState.leftPanel.integratedAlertLayer;

  if (integratedAlertLayer === LAYER_IDS.GFW_INTEGRATED_ALERTS) {
    //@ts-ignore
    start = new Date(gfwIntegratedStart).getJulian();
    await mapController.toggleGladLayer({ id: LAYER_IDS.GFW_INTEGRATED_ALERTS, start, end });

    store.dispatch(setIntegratedAlertLayerEnd(date));
  } else if (integratedAlertLayer === LAYER_IDS.GLAD_ALERTS) {
    //@ts-ignore

    start = new Date(gladStart).getJulian();
    await mapController.toggleGladLayer({ id: LAYER_IDS.GLAD_ALERTS, start, end });

    const selectedLayer = mapController._map!.findLayerById(LAYER_IDS.GLAD_ALERTS);
    selectedLayer.visible = true;
    store.dispatch(setGladEnd(date));
  } else if (integratedAlertLayer === LAYER_IDS.GLAD_S2_ALERTS) {
    store.dispatch(setGlad2End(date));

    //@ts-ignore
    start = new Date(glad2Start).getJulian();
    await mapController.toggleGladLayer({ id: LAYER_IDS.GLAD_S2_ALERTS, start, end });
  } else if (integratedAlertLayer === LAYER_IDS.RADD_ALERTS) {
    store.dispatch(setRaddAlertEnd(date));
    //@ts-ignore

    start = new Date(raddAlertStart).getJulian();
    await mapController.toggleGladLayer({ id: LAYER_IDS.RADD_ALERTS, start, end });
  }
};

export const displayGeographicCoverageLayer = async (layerId: string, isVisible: boolean) => {
  let layer;

  if (layerId === LAYER_IDS.GFW_INTEGRATED_ALERTS || layerId === LAYER_IDS.GLAD_ALERTS) {
    layer = new VectorTileLayer({
      url: GEOGRAPHIC_COVER_LAYER_URL.UMD_GLAD_LANDSAT_ALERTS,
      id: LAYER_IDS.GEOGRAPHIC_COVERAGE_LAYER,
    });
  }
  if (layerId === LAYER_IDS.GLAD_S2_ALERTS) {
    const gladS2Layer = await createGladS2Layer();
    layer = new gladS2Layer({
      urlTemplate: GEOGRAPHIC_COVER_LAYER_URL.UMD_GLAD_SENTINEL_ALERTS,
      opacity: '.5',
      view: mapController._mapview,
      id: LAYER_IDS.GEOGRAPHIC_COVERAGE_LAYER,
    });
  }

  if (layerId === LAYER_IDS.RADD_ALERTS) {
    const raddLayer = await createRadd();
    layer = new raddLayer({
      urlTemplate: GEOGRAPHIC_COVER_LAYER_URL.WUR_RADD_COVERAGE,
      opacity: '.5',
      view: mapController._mapview,
      id: LAYER_IDS.GEOGRAPHIC_COVERAGE_LAYER,
    });
  }

  if (isVisible) {
    const geographicCoverageLayerOld: any = mapController._map!.findLayerById(LAYER_IDS.GEOGRAPHIC_COVERAGE_LAYER);
    mapController._map?.remove(geographicCoverageLayerOld);
  } else {
    mapController._map?.add(layer);
  }
};
