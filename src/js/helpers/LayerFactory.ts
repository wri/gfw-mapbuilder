/* eslint-disable no-case-declarations */
import Layer from 'esri/layers/Layer';
import ImageryLayer from 'esri/layers/ImageryLayer';
import FeatureLayer from 'esri/layers/FeatureLayer';
import MapImageLayer from 'esri/layers/MapImageLayer';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import WebTileLayer from 'esri/layers/WebTileLayer';
import MosaicRule from 'esri/layers/support/MosaicRule';
import RasterFunction from 'esri/layers/support/RasterFunction';
import { TreeCoverLossLayer } from 'js/layers/TreeCoverLossLayer';
import { TreeCoverGainLayer } from 'js/layers/TreeCoverGainLayer';
import { markValueMap } from 'js/components/mapWidgets/widgetContent/CanopyDensityContent';
import store from 'js/store/index';

import { LayerProps } from 'js/store/mapview/types';

interface LayerOptions {
  id: string;
  title?: string;
  visible: boolean;
  url: string;
  sublayers?: { id: number; visible: boolean }[];
}

export function LayerFactory(mapView: any, layerConfig: LayerProps): Layer {
  let esriLayer;
  switch (layerConfig.type) {
    //check for subs and enabled those that were spercified
    case 'dynamic':
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
      const { appState } = store.getState();
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
      esriLayer = new FeatureLayer({
        id: layerConfig.id,
        title: layerConfig.title,
        visible: layerConfig.visible,
        url: layerConfig.url
      });
      break;
    case 'loss':
      esriLayer = new TreeCoverLossLayer({
        id: layerConfig.id,
        title: layerConfig.title,
        visible: layerConfig.visible,
        urlTemplate: layerConfig.url,
        view: mapView
      });
      break;
    case 'gain':
      esriLayer = new TreeCoverGainLayer({
        id: layerConfig.id,
        title: layerConfig.title,
        visible: layerConfig.visible,
        urlTemplate: layerConfig.url,
        view: mapView
      });
      break;
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
      esriLayer = new GraphicsLayer({
        id: layerConfig.id,
        title: layerConfig.title,
        visible: layerConfig.visible,
        opacity: layerConfig.opacity
      });
      break;
    default:
      // throw new Error('No matching layer type!')
      console.error('No error type!');
      break;
  }

  return esriLayer;
}
