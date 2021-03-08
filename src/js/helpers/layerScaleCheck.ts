import { LayerProps } from '../../js/store/mapview/types';
/*
 * Helper function to determine if layer is in mapview scale
 */
export function layerIsInScale(
  layer: LayerProps,
  currentScale: number
): boolean {
  if (layer.hasOwnProperty('minScale') && layer.hasOwnProperty('maxScale')) {
    if (layer.minScale === 0 && layer.maxScale === 0) {
      return true;
      //@ts-ignore -- TS is not understanding the above check for properties for some reason.
    } else if (layer.maxScale === 0 && layer.minScale > currentScale) {
      return true;
      //@ts-ignore -- TS is not understanding the above check for properties for some reason.
    } else if (layer.maxScale < currentScale && layer.minScale === 0) {
      return true;
      //@ts-ignore -- TS is not understanding the above check for properties for some reason.
    } else if (layer.maxScale < currentScale && layer.minScale > currentScale) {
      //Our mapview is within the scale that is defined! show this legend item
      return true;
    } else {
      //legend item is outside the scale parameters, we do not want it!
      return false;
    }
  } else {
    // if no maxmin scale defined, we want to show those layers in legend
    return true;
  }
}
