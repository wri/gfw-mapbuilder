//Helper for determining layer opacity that we start with. Depending on the URL hash, resources file and API response those can be diffent
import { LayerInfo } from 'src/js/helpers/shareFunctionality';
import { LayerProps } from 'js/store/mapview/types';
import { fetchLegendInfo } from '../legendInfo';

async function createVectorLayerLegendInfo(layer: any): Promise<any> {
  const layerStyleInfo = await fetch(layer.url)
    .then(res => res.json())
    .then(data => data)
    .catch(e => {
      return undefined;
    });

  if (layerStyleInfo) {
    const canvas = document.createElement('canvas');
    canvas.width = 20;
    canvas.height = 20;

    if (canvas.getContext('2d')) {
      const ctx = canvas.getContext('2d');
      ctx!.fillStyle = layerStyleInfo.layers[0].paint['fill-color'];
      ctx!.fillRect(0, 0, 20, 20);
    }

    const uri = canvas.toDataURL('image/png');
    const dataURI = uri.substring(uri.indexOf(',') + 1);

    const drawInfo = layerStyleInfo.layers[0];
    const legendObject = {
      height: 20,
      width: 20,
      contentType: 'image/png',
      imageData: dataURI,
      label: drawInfo.id
    };
    return [legendObject];
  } else {
    return undefined;
  }
}

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

    //Dealing with sublayers first
    if (layer.sublayers && layer.sublayers.length > 0) {
      const legendInfo = await fetchLegendInfo(layer.url);
      layer.sublayers.forEach((sub: any) => {
        //get sublayer legend info
        const sublayerLegendInfo = legendInfo?.layers.find(
          (l: any) => l.layerId === sub.id
        );
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

      //If layer has layerId that means it is a sublayer too, so we process it just as the ones above
    } else if (layer.hasOwnProperty('layerId')) {
      const legendInfo = await fetchLegendInfo(layer.url);
      const subLegendInfo = legendInfo?.error
        ? undefined
        : legendInfo?.layers.find((l: any) => l.layerId === layer.layerId);

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
        legendInfo: subLegendInfo?.legend
      });
    } else {
      // => Handle all other layers that are not sublayers here
      let legendInfo = await fetchLegendInfo(layer.url);
      if (legendInfo?.error) {
        legendInfo = undefined;
      } else if (layer.type === 'tile') {
        legendInfo = legendInfo.layers[0].legend;
      } else if (layer.type === 'vector-tile') {
        legendInfo = await createVectorLayerLegendInfo(layer);
        //Attempt to fetch vector tile styling info to generate legend item
      } else {
        legendInfo = layer.legendInfo ? layer.legendInfo : undefined;
      }
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
        legendInfo,
        portalItemID:
          layer.portalItem && layer.portalItem.id ? layer.portalItem.id : null
      });
    }
  }
  return mapLayerObjects;
}
