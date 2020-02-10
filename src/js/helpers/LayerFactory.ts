// import MapView from 'esri/views/MapView';
import Layer from 'esri/layers/Layer';
import ImageryLayer from 'esri/layers/ImageryLayer';
import FeatureLayer from 'esri/layers/FeatureLayer';
import MapImageLayer from 'esri/layers/MapImageLayer';
import { TreeCoverLossLayer } from 'js/layers/TreeCoverLossLayer';
import { TreeCoverGainLayer } from 'js/layers/TreeCoverGainLayer';

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
        title: layerConfig.title,
        visible: layerConfig.visible,
        url: layerConfig.url
      });
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
    default:
      // throw new Error('No matching layer type!')
      console.error('No error type!');
      break;
  }

  return esriLayer;
}
