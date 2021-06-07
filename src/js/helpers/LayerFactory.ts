/* eslint-disable no-case-declarations */
import { loadModules } from 'esri-loader';
import { createTCL } from '../../js/layers/TreeCoverLossLayer';
import { createTreeCover } from '../../js/layers/TreeCoverLayer';
import { createGlad } from '../../js/layers/GladLayer';
import { createPrimary } from '../../js/layers/PrimaryForestLayer';
import { createGain } from '../../js/layers/TreeCoverGainLayer';
import { markValueMap } from '../../js/components/mapWidgets/widgetContent/CanopyDensityContent';
import store from '../../js/store/index';
import { LayerProps } from '../../js/store/mapview/types';
import viirsLayer from './viirsLayerUtil';

interface LayerOptions {
  id: string;
  title?: string;
  visible: boolean;
  url: string;
  sublayers?: { id: number; visible: boolean }[];
  opacity?: number;
  definitionExpression?: string;
}

export async function LayerFactory(
  mapView: any,
  layerConfig: LayerProps
): Promise<any> {
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
          InputRanges: [
            markValueMap[appState.leftPanel.density],
            layerConfig.metadata.inputRange[1]
          ],
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
      layerConfig.url = layerConfig.url.replace(
        /(tcd_)(?:[^\/]+)/,
        `tcd_${densityValue}`
      );
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
    case 'primed':
    case 'webtiled':
      esriLayer = new WebTileLayer({
        id: layerConfig.id,
        title: layerConfig.title,
        visible: layerConfig.visible,
        urlTemplate: layerConfig.url,
        opacity: layerConfig.opacity
      });
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
      // //@ts-ignore
      const startDate: any = new Date(
        appState.leftPanel.gladStart
      ).getJulian() as any;
      // //@ts-ignore
      const endDate = new Date(appState.leftPanel.gladEnd).getJulian();
      esriLayer.julianFrom = startDate;
      esriLayer.julianTo = endDate;
      break;
    case 'MASK':
      const { appSettings } = store.getState();
      const countryISOCode = appSettings?.iso;
      const maskDefExp = `code_iso3 <> '${countryISOCode}'`;
      const maskLayerOptions: LayerOptions = {
        id: layerConfig.id,
        visible: true,
        url: layerConfig.url,
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
        esriLayer = await viirsLayer(
          layerConfig.id,
          layerConfig.url,
          layerConfig.visible
        );
      } else {
        esriLayer = new VectorTileLayer({
          id: layerConfig.id,
          url: layerConfig.url,
          visible: layerConfig.visible,
          opacity: layerConfig.opacity
        });
      }
      break;
    default:
      console.error('No error type!');
      break;
  }

  return esriLayer;
}
