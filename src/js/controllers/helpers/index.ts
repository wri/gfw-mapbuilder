import store from '../../store';

const configLayerFilters = {
  VIIRS_ACTIVE_FIRES: 'viirsFires',
  MODIS_ACTIVE_FIRES: 'modisFires',
  LAND_COVER: 'landCover',
  TREES_MOSAIC_LANDSCAPES: 'treeMosaicLandscapes',
  FOREST_CARBON_GROSS_REMOVALS: 'forestCarbonGrossRemovals',
  FOREST_CARBON_GROSS_EMISSIONS: 'forestCarbonGrossEmissions',
  FOREST_CARBON_NET_FLUX: 'forestCarbonNetFlux',
  AG_BIOMASS: 'aboveGroundBiomass',
  IFL: 'intactForests',
  INPE_CERRADO_PRODES: 'inpeProdes',
  PRIMARY_FORESTS: 'primaryForests',
  FORMA_ALERTS: 'forma',
  GLOB_MANGROVE: 'mangroves',
  GLAD_ALERTS: 'gladAlerts',
  IMAZON_SAD: 'sadAlerts',
  RECENT_IMAGERY: 'recentImagery',
  CARBON_SEQ: 'carbonSequence',
  CARBON_EMISSIONS: 'carbonEmissions',
  TREE_COVER: 'treeCover',
  UMD_LAND_COVER: 'umdLandCover',
  TREE_COVER_GAIN: 'treeCoverGain',
  TREE_COVER_LOSS: 'treeCoverLoss',
  TREE_COVER_HEIGHT: 'treeCoverHeight',
  TROPICAL_TREE_COVER: 'tropicalTreeCover',
  GFW_INTEGRATED_ALERTS: 'gfwIntegratedAlertLayer',
  DRY_SPELLS: 'drySpells',
  AIR_QUALITY: 'airQuality',
  WIND_SPEED: 'windSpeed',
};

const configLayerIDs = Object.keys(configLayerFilters);

function checkLayerFilterConfig(l: any, appSettings: any): boolean {
  const checkLayer = configLayerIDs.includes(l.id);
  if (checkLayer) {
    //Check for settings on that layer
    const settingID = configLayerFilters[l.id];
    //If no setting exist for the layer, we default to showing the layer
    return appSettings.hasOwnProperty(settingID) ? appSettings[settingID] : true;
  } else {
    return true;
  }
}

const getLayers = () => {
  const { appSettings } = store.getState();
  const { layerPanel } = appSettings;

  const layers = Object.keys(layerPanel)
    //Ignore basemap and extraLayer config, those are handled elsewhere
    .filter((groupName) => {
      return groupName !== 'GROUP_BASEMAP' && groupName !== 'extraLayers';
    })
    .reduce((list, groupName) => {
      let orderedGroups;
      if (layerPanel[groupName]?.groupType === 'nested') {
        let allNestedLayers: any[] = [];
        layerPanel[groupName].layers.forEach((layerG) => {
          allNestedLayers = allNestedLayers.concat(layerG.nestedLayers);
        });
        orderedGroups = allNestedLayers.map((layer) => {
          return { ...layer, groupId: groupName };
        });
      } else {
        orderedGroups = layerPanel[groupName].layers.map((layer) => {
          return { ...layer, groupId: groupName };
        });
      }
      return list.concat(orderedGroups);
    }, []);

  return layers;
};

const generateHashMapData = (layres: any) => {
  const hashMap = new Map();

  for (const layer of layres) {
    hashMap.set(layer.id, layer);
  }
  return hashMap;
};
export const filterDataByAppSettings = () => {
  const { appSettings } = store.getState();

  const layers = getLayers();
  const filteredLayers = layers.filter((l) => checkLayerFilterConfig(l, appSettings));
  const uniqueLayers = generateHashMapData(filteredLayers);
  const tt = filteredLayers;
  console.log('filteredLayers', filteredLayers);
  return uniqueLayers;
};

export const getUserLayerSelections = (configLayers: any, uniqueLayerHashMap: any) => {
  const result = [] as any;

  for (const layer of configLayers) {
    if (uniqueLayerHashMap.has(layer?.layer?.id)) {
      const layerData = uniqueLayerHashMap.get(layer?.layer?.id);
      result.push(layer);
    }
  }
  return result;
};
