import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import LayerSearchSource from '@arcgis/core/widgets/Search/LayerSearchSource';
import { mapController } from '../../../js/controllers/mapController';
type ArrayOfLayerSources = Array<__esri.LayerSearchSource>;

const layerSearchSources = async (allFeatureLayers: Array<__esri.FeatureLayer>): Promise<ArrayOfLayerSources> => {
  return allFeatureLayers.map((layer: any) => {
    return new LayerSearchSource({
      layer,
      name: layer.title,
      placeholder: layer.title,
      searchFields: layer.searchField ? [layer.searchField] : [layer.displayField],
      displayField: layer.searchField ? layer.searchField : layer.displayField,
      suggestionTemplate: layer.searchField ? `{${layer.searchField}}` : `{${layer.displayField}}`,
      exactMatch: false,
      outFields: ['*'],
      maxResults: 6,
      maxSuggestions: 6,
      suggestionsEnabled: true,
      minSuggestCharacters: 0,
    });
  });
};

const setFeatureLayerSources = (): Promise<ArrayOfLayerSources> => {
  const allFeatureLayers = (mapController._map?.allLayers as any).items.filter((layer: __esri.Layer) => {
    const isVIIRSLayer = layer.id === 'VIIRS48' || layer.id === 'VIIRS72' || layer.id === 'VIIRS7D';

    const isMODISLayer = layer.id === 'MODIS48' || layer.id === 'MODIS72' || layer.id === 'MODIS7D';

    if (isVIIRSLayer || isMODISLayer) {
      return;
    }

    if (layer.type === 'feature') {
      return layer;
    }
  });

  return layerSearchSources(allFeatureLayers);
};

const setMapImageLayerSources = async (): Promise<ArrayOfLayerSources> => {
  let allSublayers: Array<__esri.Sublayer> = [];
  const mapImageLayers = (mapController._map?.allLayers as any).items.filter(
    (layer: __esri.Layer) => layer.type === 'map-image'
  );

  mapImageLayers.forEach((mapImageLayer: __esri.MapImageLayer) => {
    allSublayers = allSublayers.concat((mapImageLayer.allSublayers as any).items);
  });

  const featureLayerPromises = allSublayers.map((sublayer: __esri.Sublayer) => {
    const featureLayer = new FeatureLayer({
      url: (sublayer as any).parent.url,
      layerId: sublayer.id,
    });

    return featureLayer.load().then((results: __esri.FeatureLayer) => results);
  });

  const allFeatureLayers = await Promise.all(featureLayerPromises);
  return layerSearchSources(allFeatureLayers);
};

export const setLayerSearchSource = async (): Promise<ArrayOfLayerSources> => {
  const featureLayerSources = await setFeatureLayerSources();

  // const mapImageLayerSources = (await setMapImageLayerSources()) as any;
  // * NOTE: mapImageLayerSources returns console errors RE FeatureLayer

  return featureLayerSources;
};
