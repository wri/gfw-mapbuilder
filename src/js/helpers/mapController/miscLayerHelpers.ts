//Helper for determining layer opacity that we start with. Depending on the URL hash, resources file and API response those can be diffent
import { LayerInfo } from 'src/js/helpers/shareFunctionality';
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
