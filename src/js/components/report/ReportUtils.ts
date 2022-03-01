export function extractLayerInfo(
  layerIDFromURL: string | null,
  sublayerIDFromURL: string | null,
  allAvailableLayers: any[],
  map: __esri.Map | undefined
): any {
  if (!map) return;

  let activeLayer: any;
  //Get the layer info that is active from Redux
  allAvailableLayers.forEach(l => {
    if (l.parentID) {
      //we are dealing with a sublayer
      if (l.parentID === layerIDFromURL) {
        if (String(l.id) === String(sublayerIDFromURL)) {
          activeLayer = l;
        }
      }
    } else {
      if (l.id === layerIDFromURL) {
        //we are dealing with normal layer
        activeLayer = l;
      }
    }
  });

  //Find the layer on the map and construct output object to be consumed for queries
  const activeLayerInfo = {} as any;
  if (activeLayer?.parentID) {
    activeLayerInfo.sublayer = true;
    const parentLayer: any = map.findLayerById(activeLayer.parentID);
    activeLayerInfo.parentLayer = parentLayer;
    activeLayerInfo.sub = parentLayer.allSublayers.items.find((s: any) => s.id === Number(activeLayer.id));
    activeLayerInfo.type = parentLayer.type;
  } else {
    activeLayerInfo.sublayer = false;
    const layer: any = map.findLayerById(activeLayer?.id);
    activeLayerInfo.parentLayer = layer;
    activeLayerInfo.type = layer.type;
  }

  //in case of MODIS/FIRES > We only find top level layer in allAvailableLayers, but the actual layer that needs to be queried is one of the sublayers underneath it, due to how we create MODIS/VIIRS, there is discrepancy and it should be fixed at the top level (layer creation level), this is an excape hatch for service/dynamic layers too as they behave similarly
  if (
    layerIDFromURL === 'MODIS_ACTIVE_FIRES' ||
    layerIDFromURL === 'VIIRS_ACTIVE_FIRES' ||
    (activeLayer.origin === 'service' && activeLayer.type === 'dynamic')
  ) {
    const firesMapServerLayer: any = activeLayerInfo.parentLayer;
    const firesSublayer = firesMapServerLayer.findSublayerById(Number(sublayerIDFromURL));
    activeLayerInfo.sub = firesSublayer;
    activeLayerInfo.sublayer = true;
    activeLayer.url = firesSublayer.url;
  }

  return { activeLayer, activeLayerInfo };
}

//Why MODIS/FIRES does not work, what is expected but what is gottten?
//
