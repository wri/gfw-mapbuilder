//Helper for determining layer opacity that we start with. Depending on the URL hash, resources file and API response those can be diffent
import { LayerInfo } from 'src/js/helpers/shareFunctionality';
import { LayerProps } from 'js/store/mapview/types';
import { fetchLegendInfo } from '../legendInfo';
export function determineLayerOpacity(
  apiLayer: any,
  layerInfosFromURL: LayerInfo[]
): number {
  //In case of sharing functionality, check for URL containing layer visibility and opacity information
  //Check For layer in the URL state first
  const resourceLayerID = apiLayer.dataLayer
    ? apiLayer.dataLayer.id
    : apiLayer.id;
  const layerInfoFromURL = layerInfosFromURL.find(
    l => l.layerID === resourceLayerID
  );
  if (layerInfoFromURL) {
    return layerInfoFromURL.opacity;
  } else {
    //we are not dealing with URL hash, use resources.js > API > default 1 logic
    let opacity = apiLayer.dataLayer?.opacity;
    if (!opacity && opacity !== 0) {
      //nothing in the resources to do with opacity, try the response's oapcity
      opacity = apiLayer.layer?.opacity;
    }
    return opacity ?? 1; //if all fails, default to 1
  }
}

//Helper to determine layer visibility
export function determineLayerVisibility(
  apiLayer: any,
  layerInfosFromURL: LayerInfo[]
): boolean {
  const resourceLayerID = apiLayer.dataLayer
    ? apiLayer.dataLayer.id
    : apiLayer.id;
  const layerInfoFromURL = layerInfosFromURL.find(
    l => l.layerID === resourceLayerID
  );
  if (layerInfoFromURL) {
    return true;
  } else {
    let visibility;
    if (apiLayer.dataLayer) {
      visibility = apiLayer.dataLayer.visible
        ? apiLayer.dataLayer.visible
        : false;
    } else {
      visibility = apiLayer.visible ? apiLayer.visible : false;
    }
    return visibility;
  }
}

export async function extractWebmapLayerObjects(
  esriMap?: __esri.Map
): Promise<LayerProps[]> {
  const mapLayerObjects: LayerProps[] = [];
  if (!esriMap) return [];
  const layerArray = esriMap.layers.toArray() as any;
  for (const layer of layerArray) {
    if (layer.type === 'graphics') continue;
    //Get the legend information for each layer
    let legendInfo = await fetchLegendInfo(layer.url);
    if (layer.sublayers && layer.sublayers.length > 0) {
      layer.sublayers.forEach((sub: any) => {
        //get sublayer legend info
        const sublayerLegendInfo = legendInfo?.layers.find(
          (l: any) => l.layerId === sub.id
        );
        //TODO:how do we handle default opacity? seems like these subs are mostly undefined for opacity
        sub.opacity = sub.opacity ? sub.opacity : 1;
        const {
          id,
          title,
          opacity,
          visible,
          definitionExpression,
          url,
          maxScale,
          minScale
        } = sub;
        mapLayerObjects.push({
          id,
          title,
          opacity,
          visible,
          definitionExpression,
          group: 'webmap',
          type: 'webmap',
          origin: 'webmap',
          url,
          maxScale,
          minScale,
          sublayer: true,
          parentID: sub.layer.id,
          legendInfo: sublayerLegendInfo?.legend
        });
      });
    } else {
      //TODO: This needs research, some layers have not only "id" but also "layerId" property. Those will differ, "id" will be "parent id for mapservice", and "layerId" will be its sublayer. Tricky part is that this happens with some layers on webmap in CMR, sublayers do not show on layer itself but the presense of layerId property indicates that it is indeed a sub

      if (legendInfo.error) {
        const {
          id,
          title,
          opacity,
          visible,
          definitionExpression,
          url,
          maxScale,
          minScale
        } = layer;
        mapLayerObjects.push({
          id,
          title,
          opacity,
          visible,
          definitionExpression,
          group: 'webmap',
          type: 'webmap',
          origin: 'webmap',
          url,
          maxScale,
          minScale,
          sublayer: false
        });
      } else {
        legendInfo = layer.layerId
          ? legendInfo.layers.find((l: any) => l.layerId === layer.layerId)
              .legend
          : legendInfo;
        const {
          id,
          title,
          opacity,
          visible,
          definitionExpression,
          url,
          maxScale,
          minScale
        } = layer;
        mapLayerObjects.push({
          id,
          title,
          opacity,
          visible,
          definitionExpression,
          group: 'webmap',
          type: 'webmap',
          origin: 'webmap',
          url,
          maxScale,
          minScale,
          sublayer: false,
          legendInfo
        });
      }
    }
  }
  return mapLayerObjects;
}
