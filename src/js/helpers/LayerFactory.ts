/* eslint-disable no-case-declarations */
import { loadModules } from 'esri-loader';
import { createTCL } from '../layers/TreeCoverLossLayer';
import { createTreeCover } from '../layers/TreeCoverLayer';
import { createGlad } from '../layers/GladLayer';
import { createHeight } from '../layers/TreeCoverHeightLayer';
import { createGain } from '../layers/TreeCoverGainLayer';
import { markValueMap } from '../components/mapWidgets/widgetContent/CanopyDensityContent';
import { treeMosaicDensityValue } from '../components/mapWidgets/widgetContent/TreeMosaicContent';
import viirsLayer from './viirsLayerUtil';
import { createTreeMosaicCover } from '../layers/TreeMosaicLayer';
import { createGFWIntegratedLayer } from '../layers/GFWIntegratedLayer';
import store from '../../js/store/index';
import { LayerProps } from '../store/mapview/types';

interface LayerOptions {
  id: string;
  title?: string;
  visible: boolean;
  url: string;
  sublayers?: { id: number; visible: boolean }[];
  opacity?: number;
  definitionExpression?: string;
}

export async function LayerFactory(mapView: any, layerConfig: LayerProps): Promise<any> {
  const [
    ImageryLayer,
    FeatureLayer,
    MapImageLayer,
    WebTileLayer,
    VectorTileLayer,
    MosaicRule,
    RasterFunction
  ] = await loadModules([
    'esri/layers/ImageryLayer',
    'esri/layers/FeatureLayer',
    'esri/layers/MapImageLayer',
    'esri/layers/WebTileLayer',
    'esri/layers/VectorTileLayer',
    'esri/layers/support/MosaicRule',
    'esri/layers/support/RasterFunction'
  ]);
  const { appState, mapviewState } = store.getState();
  let esriLayer;
  switch (layerConfig.type) {
    //check for subs and enabled those that were spercified
    case 'dynamic':
      if (layerConfig.versions && layerConfig.versions[0].url) {
        layerConfig.url = layerConfig.versions[0].url;
        layerConfig.layerIds = layerConfig.versions[0].layerIds;
      }
      const layerOptions: LayerOptions = {
        id: layerConfig.id,
        title: layerConfig.title,
        visible: layerConfig.visible,
        url: layerConfig.url
      };
      if (layerConfig.layerIds) {
        layerOptions.sublayers = layerConfig.layerIds.map(id => {
          return { id: id, visible: true };
        });
      }
      esriLayer = new MapImageLayer(layerOptions);
      break;
    case 'image':
      esriLayer = new ImageryLayer({
        id: layerConfig.id,
        visible: layerConfig.visible,
        url: layerConfig.url,
        opacity: layerConfig.opacity
      });
      if (layerConfig.metadata.colormap) {
        const remapRF = new RasterFunction();
        remapRF.functionName = 'Remap';
        remapRF.functionArguments = {
          InputRanges: [markValueMap[appState.leftPanel.density], layerConfig.metadata.inputRange[1]],
          OutputValues: layerConfig.metadata.outputRange,
          AllowUnmatched: false,
          Raster: '$$'
        };
        remapRF.outputPixelType = 'u8';
        const colorRF = new RasterFunction();
        colorRF.functionName = 'Colormap';
        colorRF.functionArguments = {
          Colormap: layerConfig.metadata.colormap,
          Raster: remapRF
        };
        esriLayer.renderingRule = colorRF;
      }
      if (layerConfig.id === 'AG_BIOMASS') {
        esriLayer.opacity = layerConfig.opacity.combined;
        //biomass layer expects object id that maps to canopy density values
        esriLayer.mosaicRule = new MosaicRule({
          where: `OBJECTID = ${appState.leftPanel.density}`
        });
      }
      break;
    case 'feature':
      if (layerConfig.versions && layerConfig.versions[0].url) {
        layerConfig.url = layerConfig.versions[0].url;
      }
      esriLayer = new FeatureLayer({
        id: layerConfig.id,
        title: layerConfig.title,
        visible: layerConfig.visible,
        url: layerConfig.url
      });
      break;
    case 'loss':
      const densityValue = markValueMap[appState.leftPanel.density];
      layerConfig.url = layerConfig.url.replace(/(tcd_)(?:[^/]+)/, `tcd_${densityValue}`);
      const yearRange = mapviewState.timeSlider;
      const tclConstructor = await createTCL();
      const tclLayer = new tclConstructor({
        id: layerConfig.id,
        title: layerConfig.title,
        visible: layerConfig.visible,
        urlTemplate: layerConfig.url,
        view: mapView
      });
      esriLayer = tclLayer;
      esriLayer.minYear = yearRange[0];
      esriLayer.maxYear = yearRange[1];
      esriLayer.refresh();
      break;
    case 'tree-mosaic':
      const treeDensityValue = treeMosaicDensityValue[appState.leftPanel.density];
      layerConfig.url = layerConfig.url.replace(/(tcd_)(?:[^/]+)/, `tcd_${treeDensityValue}`);
      const constructor = await createTreeMosaicCover();
      const treeMosaicLayer = new constructor({
        id: layerConfig.id,
        title: layerConfig.title,
        visible: layerConfig.visible,
        urlTemplate: layerConfig.url,
        view: mapView
      });
      esriLayer = treeMosaicLayer;
      break;
    case 'gain':
      const gainConstructor = await createGain();
      const gainLayer = new gainConstructor({
        id: layerConfig.id,
        title: layerConfig.title,
        visible: layerConfig.visible,
        urlTemplate: layerConfig.url,
        view: mapView
      });
      esriLayer = gainLayer;
      break;
    case 'tree-cover':
      const dVal = markValueMap[appState.leftPanel.density];
      layerConfig.url = layerConfig.url.replace(/{thresh}/, `${dVal}`);
      const treeCoverConstructor = await createTreeCover();
      const treeCoverL = new treeCoverConstructor({
        id: layerConfig.id,
        title: layerConfig.title,
        visible: layerConfig.visible,
        urlTemplate: layerConfig.url,
        view: mapView,
        config: layerConfig
      });
      esriLayer = treeCoverL;
      break;
    case 'tree-cover-height':
      const url = 'https://storage.googleapis.com/gfw-data-layers/umd-tree-height/{z}/{x}/{y}.png';
      const heightConstructor = await createHeight();
      const heightLayer = new heightConstructor({
        id: layerConfig.id,
        title: layerConfig.title,
        visible: layerConfig.visible,
        urlTemplate: url,
        view: mapView
      });
      esriLayer = heightLayer;
      esriLayer.height = appState.leftPanel.treeHeight;
      break;
    case 'primed':
    case 'webtiled':
      esriLayer = new WebTileLayer({
        id: layerConfig.id,
        title: layerConfig.title,
        visible: layerConfig.visible,
        urlTemplate: layerConfig.url,
        opacity: layerConfig.opacity.combined
      });
      if (
        layerConfig.id === 'LAND_COVER' ||
        layerConfig.id === 'PRIMARY_FORESTS' ||
        layerConfig.id === 'CARBON_EMISSIONS'
      ) {
        esriLayer.opacity = layerConfig.opacity.combined;
      }
      break;
    case 'imagery':
      const imageConstructor = await createGain();
      const imagery = new imageConstructor({
        id: layerConfig.id,
        title: layerConfig.title,
        visible: layerConfig.visible,
        urlTemplate: layerConfig.url,
        view: mapView
      });
      esriLayer = imagery;
      break;
    case 'glad':
      const gladConstructor = await createGlad();
      const gladLayer = new gladConstructor({
        id: layerConfig.id,
        title: layerConfig.title,
        visible: layerConfig.visible,
        urlTemplate: layerConfig.url,
        view: mapView
      });
      esriLayer = gladLayer;
      esriLayer.confirmed = appState.leftPanel.gladConfirmed;
      //@ts-ignore
      const startDate: any = new Date(appState.leftPanel.gladStart).getJulian() as any;
      //@ts-ignore
      const endDate = new Date(appState.leftPanel.gladEnd).getJulian();
      esriLayer.julianFrom = startDate;
      esriLayer.julianTo = endDate;
      break;
    case 'integrated-alert-layer':
      const integratedAlertConstructor = await createGFWIntegratedLayer();
      const integratedAlertLayer = new integratedAlertConstructor({
        id: layerConfig.id,
        title: layerConfig.title,
        visible: layerConfig.visible,
        urlTemplate: layerConfig.url,
        view: mapView
      });
      esriLayer = integratedAlertLayer;
      esriLayer.highConfidenceConfirmed = appState.leftPanel.highConfidenceConfirmed;

      //@ts-ignore
      const integratedAlertStartDate: any = new Date(appState.leftPanel.gfwIntegratedStart).getJulian() as any;
      //@ts-ignore
      const integratedAlertEndDate = new Date(appState.leftPanel.gfwIntegratedEnd).getJulian();

      esriLayer.gfwjulianFrom = integratedAlertStartDate;
      esriLayer.gfwjulianTo = integratedAlertEndDate;
      break;
    case 'MASK':
      const { appSettings } = store.getState();
      const countryISOCode = appSettings?.iso;
      const maskDefExp = `code_iso3 <> '${countryISOCode}'`;
      const maskLayerOptions: LayerOptions = {
        id: layerConfig.id,
        visible: true,
        url: layerConfig.url,
        //@ts-ignore
        opacity: layerConfig.opacity
      };
      if (layerConfig.layerIds) {
        maskLayerOptions.sublayers = layerConfig.layerIds.map(id => {
          return { id: id, visible: true, definitionExpression: maskDefExp };
        });
      }
      esriLayer = new MapImageLayer(maskLayerOptions);
      break;
    case 'Vector.Layer': //only viirs is supported at this time
      if (layerConfig.id === 'VIIRS_ACTIVE_FIRES') {
        esriLayer = await viirsLayer(layerConfig.id, layerConfig.url, layerConfig.visible);
      } else {
        esriLayer = new VectorTileLayer({
          id: layerConfig.id,
          url: layerConfig.url,
          visible: layerConfig.visible,
          opacity: layerConfig.opacity
        });
      }
      if (layerConfig.id === 'IFL') {
        esriLayer.opacity = layerConfig.opacity.combined;
      }
      break;
    default:
      break;
  }
  return esriLayer;
}
