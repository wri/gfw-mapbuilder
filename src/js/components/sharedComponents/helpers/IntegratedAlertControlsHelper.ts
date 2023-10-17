import { LAYER_IDS } from '../../../../../configs/layer-config';
import { loadModules } from 'esri-loader';
import { mapController } from '../../../controllers/mapController';
import { createGladS2Layer } from '../../../layers/GladS2Layer';
import { createRadd } from '../../../layers/RaddLayer';
import store from '../../../../../src/js/store';
import {
  setGeographicCoverage,
  setGlad2End,
  setGlad2Start,
  setGladEnd,
  setGladStart,
  setIntegratedAlertLayerEnd,
  setIntegratedAlertLayerStart,
  setRaddAlertEnd,
  setRaddAlertStart,
} from '../../../store/appState/actions';

export const onStartDateChange = async (dFormat: any, endDate: any) => {
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

export const onEndDateChange = async (date) => {
  let start;
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

export const showGeographicCoverage = async () => {
  const [VectorTileLayer] = await loadModules(['esri/layers/VectorTileLayer']);
  const geographicCoverage = store.getState().appState.leftPanel.geographicCoverage;
  const integratedAlertLayer = store.getState().appState.leftPanel.integratedAlertLayer;

  let geographicCoverageLayer;
  if (integratedAlertLayer === 'GFW_INTEGRATED_ALERTS' || integratedAlertLayer === 'GLAD_ALERTS') {
    geographicCoverageLayer = new VectorTileLayer({
      url: 'https://tiles.globalforestwatch.org/umd_glad_landsat_alerts_coverage/v2014/default/root.json',
      id: 'GEOGRAPHIC_COVERAGE_LAYER',
    });
  }
  if (integratedAlertLayer === 'GLAD_S2_ALERTS') {
    const gladS2Layer = await createGladS2Layer();
    geographicCoverageLayer = new gladS2Layer({
      urlTemplate:
        'https://tiles.globalforestwatch.org/umd_glad_sentinel2_alerts_coverage/v20210413/default/{z}/{x}/{y}.png',
      opacity: '.5',
      view: mapController._mapview,
      id: 'GEOGRAPHIC_COVERAGE_LAYER',
    });
  }
  if (integratedAlertLayer === 'RADD_ALERTS') {
    const raddLayer = await createRadd();
    geographicCoverageLayer = new raddLayer({
      urlTemplate: 'https://tiles.globalforestwatch.org/wur_radd_coverage/v20211016/default/{z}/{x}/{y}.png',
      opacity: '.5',
      view: mapController._mapview,
      id: 'GEOGRAPHIC_COVERAGE_LAYER',
    });
  }

  store.dispatch(setGeographicCoverage(!geographicCoverage));
  if (geographicCoverage) {
    const geographicCoverageLayerOld: any = mapController._map!.findLayerById('GEOGRAPHIC_COVERAGE_LAYER');
    mapController._map?.remove(geographicCoverageLayerOld);
  } else {
    mapController._map?.add(geographicCoverageLayer);
  }
};

export const handleDateToggle = (startDate, endDate) => {
  const integratedAlertLayer = store.getState().appState.leftPanel.integratedAlertLayer;
  const gfwIntegratedStart = store.getState().appState.leftPanel.gfwIntegratedStart;
  const gfwIntegratedEnd = store.getState().appState.leftPanel.gfwIntegratedEnd;
  const glad2Start = store.getState().appState.leftPanel.glad2Start;
  const glad2End = store.getState().appState.leftPanel.glad2End;
  const gladStart = store.getState().appState.leftPanel.gladStart;
  const gladEnd = store.getState().appState.leftPanel.gladEnd;
  const raddAlertStart = store.getState().appState.leftPanel.raddAlertStart;
  const raddAlertEnd = store.getState().appState.leftPanel.raddAlertEnd;

  if (integratedAlertLayer === LAYER_IDS.GFW_INTEGRATED_ALERTS) {
    return { start: gfwIntegratedStart, end: gfwIntegratedEnd };
  }
  if (integratedAlertLayer === LAYER_IDS.GLAD_S2_ALERTS) {
    return { start: glad2Start, end: glad2End };
  }
  if (integratedAlertLayer === LAYER_IDS.GLAD_ALERTS) {
    return { start: gladStart, end: gladEnd };
  }
  if (integratedAlertLayer === LAYER_IDS.RADD_ALERTS) {
    return { start: raddAlertStart, end: raddAlertEnd };
  }
  return { start: startDate, end: endDate };
};
