import { sortBy, flatten } from 'lodash-es';
//Sorts layers by sorting configuration defined in resources
//takes into account group sorting first and then individual layer sorting
//returns an array of layer ids in order of priority
export function getSortedLayers(
  layerPanelSettings: object,
  allLayerObjects: any[],
  map?: __esri.Map
): string[] | undefined {
  if (!map) return;
  let mapLayerIDs = [] as string[];
  //Lets order layers groups first
  const orderedGroups = sortBy(Object.keys(layerPanelSettings), key => {
    return layerPanelSettings[key].order;
  });
  //Order layers within layer groups
  const orderedLayerGroups = orderedGroups
    .map(group => {
      //jam in webmap layers in here as they do not appear in settings
      if (group === 'GROUP_WEBMAP') {
        return allLayerObjects.filter(o => o.group === 'webmap');
      }
      const layersInGroup = sortBy(layerPanelSettings[group].layers, l => {
        return l.order;
      });
      return layersInGroup;
    })
    .filter(group => group?.length);
  const flattenedLayerGroups = flatten(orderedLayerGroups);

  flattenedLayerGroups.forEach(layerGroup => {
    //attempt to grab layer id  from the map
    const layer = map.findLayerById(layerGroup.id);
    if (layer) {
      //layer exist, likely dealing with normal layer
      mapLayerIDs.push(layer.id);
    } else if (!layer && layerGroup.sublayer) {
      //we did not find it because it was sublayer and we need to find the parent layer
      const layer = map.findLayerById(layerGroup.parentID);
      mapLayerIDs.push(layer?.id);
    }
  });
  mapLayerIDs = mapLayerIDs
    .filter((id: string, index: number) => mapLayerIDs.indexOf(id) === index)
    .reverse();

  return mapLayerIDs;
}
