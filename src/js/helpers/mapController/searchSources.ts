import LayerSearchSource from 'esri/widgets/Search/LayerSearchSource';
import Layer from 'esri/layers/Layer';
import FeatureLayer from 'esri/layers/FeatureLayer';
import MapImageLayer from 'esri/layers/MapImageLayer';
import Sublayer from 'esri/layers/support/Sublayer';

import { mapController } from '../../../js/controllers/mapController';

type ArrayOfLayerSources = Array<LayerSearchSource>;

const returnLayerSearchSources = (
  allFeatureLayers: Array<FeatureLayer>
): ArrayOfLayerSources => {
  return allFeatureLayers.map((layer: FeatureLayer) => {
    return new LayerSearchSource({
      layer,
      name: layer.title,
      placeholder: layer.title,
      searchFields: [layer.displayField],
      displayField: layer.displayField,
      suggestionTemplate: `{${layer.displayField}}`,
      exactMatch: false,
      outFields: ['*'],
      maxResults: 6,
      maxSuggestions: 6,
      suggestionsEnabled: true,
      minSuggestCharacters: 0
    });
  });
};

const setFeatureLayerSources = (): ArrayOfLayerSources => {
  const allFeatureLayers = (mapController._map?.allLayers as any).items.filter(
    (layer: Layer) => {
      const isVIIRSLayer =
        layer.id === 'VIIRS48' ||
        layer.id === 'VIIRS72' ||
        layer.id === 'VIIRS7D';

      const isMODISLayer =
        layer.id === 'MODIS48' ||
        layer.id === 'MODIS72' ||
        layer.id === 'MODIS7D';

      if (isVIIRSLayer || isMODISLayer) {
        return;
      }

      if (layer.type === 'feature') {
        return layer;
      }
    }
  );

  return returnLayerSearchSources(allFeatureLayers);
};

const setMapImageLayerSources = async (): Promise<ArrayOfLayerSources> => {
  let allSublayers: Array<Sublayer> = [];
  const mapImageLayers = (mapController._map?.allLayers as any).items.filter(
    (layer: Layer) => layer.type === 'map-image'
  );

  mapImageLayers.forEach((mapImageLayer: MapImageLayer) => {
    allSublayers = allSublayers.concat(
      (mapImageLayer.allSublayers as any).items
    );
  });

  const featureLayerPromises = allSublayers.map((sublayer: Sublayer) => {
    const featureLayer = new FeatureLayer({
      url: (sublayer as any).parent.url,
      layerId: sublayer.id
    });

    return featureLayer.load().then((results: FeatureLayer) => results);
  });

  const allFeatureLayers = await Promise.all(featureLayerPromises);

  return returnLayerSearchSources(allFeatureLayers);
};

export const setLayerSearchSource = async (): Promise<ArrayOfLayerSources> => {
  const featureLayerSources = setFeatureLayerSources() as any;

  // const mapImageLayerSources = (await setMapImageLayerSources()) as any;
  // * NOTE: mapImageLayerSources returns console errors RE FeatureLayer

  return featureLayerSources;
};
