import Layer from 'esri/layers/Layer';
import ImageryLayer from 'esri/layers/ImageryLayer';
import FeatureLayer from 'esri/layers/FeatureLayer';
import MapImageLayer from 'esri/layers/MapImageLayer';
import WebTileLayer from 'esri/layers/WebTileLayer';
import MosaicRule from 'esri/layers/support/MosaicRule';
import { TreeCoverLossLayer } from 'js/layers/TreeCoverLossLayer';
import { TreeCoverGainLayer } from 'js/layers/TreeCoverGainLayer';
import store from 'js/store/index';

import { LayerFactoryObject } from 'js/interfaces/mapping';

export function LayerFactory(
  mapView: any,
  layerConfig: LayerFactoryObject
): Layer {
  let esriLayer;
  switch (layerConfig.type) {
    case 'dynamic':
      esriLayer = new MapImageLayer({
        id: layerConfig.id,
        title: layerConfig.title,
        visible: layerConfig.visible,
        url: layerConfig.url
      });
      break;
    case 'image':
      esriLayer = new ImageryLayer({
        id: layerConfig.id,
        visible: layerConfig.visible,
        url: layerConfig.url
      });
      if (layerConfig.id === 'AG_BIOMASS') {
        //biomass layer expects object id that maps to canopy density values
        const { appState } = store.getState();
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
    default:
      // throw new Error('No matching layer type!')
      console.error('No error type!');
      break;
  }

  return esriLayer;
}
