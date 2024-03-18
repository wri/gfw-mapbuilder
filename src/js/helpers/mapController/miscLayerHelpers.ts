//Helper for determining layer opacity that we start with. Depending on the URL hash, resources file and API response those can be diffent
// import { defaultAPIFlagshipLayers, newRemoteDataLayers } from '../../../../configs/layer-config';
import { LayerInfo } from '../shareFunctionality';
import { LayerProps } from '../../store/mapview/types';
import store from '../../store';
import {
  CustomLayerConfig,
  FlagshipLayerConfig,
  RecentImageryLayerConfig,
  RemoteApiLayerConfig,
  RWLayerConfig,
} from '../../types/layersTypes';
import legendInfoController from '../legendInfo';

async function createVectorLayerLegendInfo(layer: any): Promise<any> {
  const layerStyleInfo = await fetch(layer.url)
    .then((res) => res.json())
    .then((data) => data)
    .catch((e) => {
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
      label: drawInfo.id,
    };
    return [legendObject];
  } else {
    return undefined;
  }
}

export function determineLayerOpacity(apiLayer: any, layerInfosFromURL: LayerInfo[]): number {
  //In case of sharing functionality, check for URL containing layer visibility and opacity information
  //Check For layer in the URL state first
  const resourceLayerID = apiLayer.dataLayer ? apiLayer.dataLayer.id : apiLayer.id;
  const layerInfoFromURL = layerInfosFromURL.find((l) => l.layerID === resourceLayerID);
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
export function determineLayerVisibility(apiLayer: any, layerInfosFromURL: LayerInfo[]): boolean {
  const resourceLayerID = apiLayer.dataLayer ? apiLayer.dataLayer.id : apiLayer.id;
  const layerInfoFromURL = layerInfosFromURL.find((l) => l.layerID === resourceLayerID);
  if (layerInfoFromURL) {
    return true;
  } else {
    let visibility;
    if (apiLayer.dataLayer) {
      visibility = apiLayer.dataLayer.visible ? apiLayer.dataLayer.visible : false;
    } else {
      visibility = apiLayer.visible ? apiLayer.visible : false;
    }
    return visibility;
  }
}

export const requestWMSLayerLegendInfo = async (layerOWSUrl: string, sublayerName: string): Promise<string> => {
  return `${layerOWSUrl}?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=${sublayerName.replace(
    ':',
    '%3A'
  )}`;
};

export async function extractWebmapLayerObjects(esriMap?: __esri.Map): Promise<LayerProps[]> {
  const mapLayerObjects: LayerProps[] = [];
  if (!esriMap) return [];
  const layerArray = esriMap.layers.toArray() as any;

  let count = 0;
  for (const layer of layerArray) {
    if (layer.type === 'graphics') continue;

    //@TODO this needs to be cleaned up and refactored to be more readable

    // if sublayers and not tile or wms
    if (layer.sublayers && layer.sublayers.length > 0 && layer.type !== 'tile' && layer.type !== 'wms') {
      const legendInfo = await legendInfoController.fetchLegendInfo(layer.url);
      layer.sublayers.forEach((sub: any) => {
        //get sublayer legend info
        const sublayerLegendInfo = legendInfo?.layers?.find((l: any) => l.layerId === sub.id);
        sub.opacity = sub.opacity ? sub.opacity : 1;
        const { id, title, opacity, visible, definitionExpression, url, maxScale, minScale } = sub;
        mapLayerObjects.push({
          id,
          title,
          opacity: {
            combined: opacity,
            fill: opacity,
            outline: opacity,
          },
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
          legendInfo: sublayerLegendInfo?.legend,
        });
      });

      // if wms
    } else if (layer.type === 'wms') {
      const layerOWSUrl = layer.url.replace('wms', 'ows');
      const sublayerName = layer.sublayers.items[0].name;
      const legendInfo = await requestWMSLayerLegendInfo(layerOWSUrl, sublayerName);
      count++;
      layer.sublayers.forEach((sub: any) => {
        sub.opacity = sub.opacity ? sub.opacity : 1;
        sub.id = count.toString();
        const { title, opacity, visible, definitionExpression, url, maxScale, minScale } = sub;
        mapLayerObjects.push({
          id: count.toString(),
          title,
          opacity: {
            combined: opacity,
            fill: opacity,
            outline: opacity,
          },
          visible,
          definitionExpression,
          group: 'webmap',
          type: 'wms',
          origin: 'webmap',
          url,
          maxScale,
          minScale,
          sublayer: true,
          parentID: sub.layer.id,
          legendInfo: legendInfo,
        });
      });

      //If layer has layerId that means it is a sublayer too, so we process it just as the ones above
    } else if (layer.hasOwnProperty('layerId')) {
      const legendInfo = await legendInfoController.fetchLegendInfo(layer.url);
      const subLegendInfo = legendInfo?.error
        ? undefined
        : legendInfo?.layers.find((l: any) => l.layerId === layer.layerId);

      const { id, title, opacity, visible, definitionExpression, url, maxScale, minScale } = layer;
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
        legendInfo: subLegendInfo?.legend,
        portalItemID: layer.portalItem && layer.portalItem.id ? layer.portalItem.id : null,
      });

      // => Handle all other layers that are not sublayers here
    } else {
      let legendInfo = await legendInfoController.fetchLegendInfo(layer.url);
      if (legendInfo?.error) {
        legendInfo = undefined;
      } else if (layer.type === 'tile') {
        const layerName = legendInfo.layers[0]?.layerName;
        legendInfo = legendInfo.layers[0]?.legend;
        legendInfo['layerName'] = layerName;
      } else if (layer.type === 'vector-tile') {
        legendInfo = await createVectorLayerLegendInfo(layer);
        //Attempt to fetch vector tile styling info to generate legend item
      } else {
        legendInfo = layer.legendInfo ? layer.legendInfo : undefined;
      }
      const { id, title, opacity, visible, definitionExpression, url, maxScale, minScale } = layer;
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
        portalItemID: layer.portalItem && layer.portalItem.id ? layer.portalItem.id : null,
      });
    }
  }
  mapLayerObjects.reverse();
  return mapLayerObjects;
}

type AllLayersConfig =
  | RemoteApiLayerConfig
  | RecentImageryLayerConfig
  | CustomLayerConfig
  | FlagshipLayerConfig
  | RWLayerConfig
  | any; //TODO fix this any
export async function getRemoteAndServiceLayers(): Promise<any> {
  const { appSettings } = store.getState();
  const { layerPanel } = appSettings;

  const detailedLayers: any[] = [];
  const remoteDataLayers: any[] = [];

  const layers: AllLayersConfig[] = Object.keys(layerPanel)
    //Ignore basemap and extraLayer config, those are handled elsewhere
    .filter((groupName) => {
      return groupName !== 'GROUP_BASEMAP' && groupName !== 'extraLayers';
    })
    .reduce((list, groupName) => {
      let orderedGroups;
      if (layerPanel[groupName]?.groupType === 'nested') {
        let allNestedLayers: AllLayersConfig[] = [];
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

  function checkLayerFilterConfig(l: any): boolean {
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

  layers
    .filter((l) => checkLayerFilterConfig(l))
    .forEach((layer): void => {
      if (layer.type === 'remoteDataLayer') {
        remoteDataLayers.push({
          order: layer.order,
          layerGroupId: layer.groupId,
          dataLayer: layer,
          searchField: layer.searchField,
        });
      } else if (layer.type === 'flagship') {
        remoteDataLayers.push({
          order: layer.order,
          layerGroupId: layer.groupId,
          dataLayer: layer,
          origin: layer.origin,
          uuid: layer.uuid,
          label: layer.label,
          layerType: layer.layerType,
          id: layer.id,
          opacity: layer.opacity,
          legend: layer.legend,
          sublabel: layer.sublabel,
        });
      } else if (layer.type === 'resourcewatch') {
        remoteDataLayers.push({
          order: layer.order,
          layerGroupId: layer.groupId,
          dataLayer: layer,
          origin: layer.origin,
          layerType: layer.type,
          id: layer.id,
          opacity: layer.opacity,
        });
      } else {
        detailedLayers.push(layer);
      }
    });

  async function fetchRemoteApiLayer(item): Promise<any> {
    const baseURL = `https://production-api.globalforestwatch.org/v1/layer/${item?.dataLayer?.uuid}`;

    return fetch(baseURL)
      .then((response) => response.json())
      .then((json) => json.data)
      .then((layer) => {
        const attributes = layer.attributes;
        const intConfig = layer.attributes?.interactionConfig;
        const itemGroup = item.group;
        //if metadata url does not exist and a object is in its place
        if (layer.attributes.layerConfig.metadata.constructor.name === 'Object') {
          item.layer = layer.attributes.layerConfig;
          item.dashboardURL = item.dataLayer?.dashboardURL?.length !== 0 ? item.dataLayer.dashboardURL : null;
          item.group = itemGroup;
          item.layer.metadata = {
            colormap: null,
            inputRange: null,
            metadata: layer.attributes.layerConfig.metadata,
            legendConfig: attributes.legendConfig,
            interactionConfig: intConfig,
            outputRange: null,
          };
          item.isError = false;
          return item;
        } else {
          return fetch(layer.attributes.layerConfig.metadata)
            .then((response) => response.json())
            .then((metadata) => {
              item.layer = layer.attributes.layerConfig;
              item.dashboardURL = item.dataLayer?.dashboardURL?.length !== 0 ? item.dataLayer.dashboardURL : null;
              item.isMetadataError = false;
              item.group = itemGroup;
              item.layer.metadata = {
                metadata,
                legendConfig: attributes.legendConfig,
                interactionConfig: intConfig,
              };
              item.isError = false;
              return item;
            })
            .catch((err) => {
              console.error('Error fetching metadata', err);
              item.layer = layer.attributes.layerConfig;
              item.dashboardURL = item.dataLayer?.dashboardURL?.length !== 0 ? item.dataLayer.dashboardURL : null;
              item.group = itemGroup;
              item.isMetadataError = true;
              item.layer.metadata = {
                metadata: null,
                legendConfig: attributes.legendConfig,
                interactionConfig: intConfig,
              };
              item.isError = false;
              return item;
            });
        }
      })
      .catch((error) => {
        console.error('Error ', error);
        const itemWithError = {
          ...item,
          isError: true,
          errorMessage: error?.message,
        };
        return itemWithError;
      });
  }

  function fetchFlagshipLayer(item): Promise<any> {
    const baseURL = `https://api.resourcewatch.org/v1/layer/${item.uuid}`;
    const baseMetadataURL = 'https://api.resourcewatch.org/v1/gfw-metadata/'; //append metadata id to the url to retrieve it, attributes.applicationConfig.metadata
    return fetch(baseURL)
      .then((response) => response.json())
      .then((json) => json.data)
      .then((layer) => {
        return fetch(`${baseMetadataURL}${layer.attributes.applicationConfig.metadata}`)
          .then((response) => response.json())
          .then((metadata) => {
            const intConfig = layer.attributes?.interactionConfig;
            item.groupId = item.layerGroupId;
            return {
              dataLayer: item,
              layer: {
                id: item.id,
                opacity: item.opacity,
                order: item.order,
                url: layer.attributes.layerConfig.source.tiles[0],
                type: item.layerType,
                label: item.label,
                sublabel: item.sublabel,
                metadata: {
                  metadata: metadata,
                  legendConfig: item.legend,
                  interactionConfig: intConfig,
                },
              },
              dashboardURL: null,
              group: item.layerGroupId,
              order: item.order,
              layerGroupId: item.layerGroupId,
            };
          });
      })
      .catch((error) => {
        console.error(error);
        return {
          dataLayer: item,
          isError: true,
          layer: {
            id: item?.id,
            opacity: item?.opacity,
            order: item?.order,
            url: null,
            type: item?.layerType,
            label: item?.label,
            sublabel: item?.sublabel,
            metadata: {
              metadata: null,
              legendConfig: item?.legend,
              interactionConfig: null,
            },
          },
          dashboardURL: null,
          group: item?.layerGroupId,
          order: item?.order,
          layerGroupId: item.layerGroupId,
        };
      });
    //
  }

  function getLegendConfig(layer, config) {
    const configObject = {
      name: { en: layer.metadata.title },
      type: config.attributes.legendConfig.type,
    };

    configObject['items'] = config.attributes.legendConfig.items.map((item) => {
      return {
        color: item.color,
        id: item.id,
        name: {
          en: item.name,
        },
      };
    });
    return configObject;
  }

  function fetchRWLayer(item): Promise<any> {
    return fetch(item.dataLayer.datasetURL)
      .then((response) => response.json())
      .then((json) => json.data)
      .then((layer) => {
        return fetch(item.dataLayer.datasetLegendConfigURL)
          .then((response) => response.json())
          .then((json) => json.data)
          .then((config) => {
            item.groupId = item.layerGroupId;
            const newItem = {
              dataLayer: item,
              layer: {
                id: item.id,
                opacity: item.opacity,
                order: item.order,
                url: layer.assets.find((a) => a[0] === 'Raster tile cache')[1],
                type: 'webtiled',
                label: { en: layer.metadata.title },
                sublabel: item.dataLayer.sublabel,
                layerGroupId: item.layerGroupId,
                group: item.layerGroupId,
                metadata: {
                  metadata: layer.metadata,
                  legendConfig: getLegendConfig(layer, config),
                },
              },
              dashboardURL: null,
              group: item.layerGroupId,
              order: item.order,
              layerGroupId: item.layerGroupId,
            };
            if (layer.dataset.includes('dry_spells')) {
              newItem.layer.url =
                'https://tiles.globalforestwatch.org/nexgddp_change_dry_spells_2000_2080/v20211015/Change_Num_Dry_Spells_2030/{z}/{x}/{y}.png';
            }
            return newItem;
          });
      })
      .catch((error) => {
        console.error('Error fetching RW layer', error);
        const newItem = {
          dataLayer: item,
          isError: true,
          layer: {
            id: item?.id,
            opacity: item?.opacity,
            order: item?.order,
            url: null,
            type: 'webtiled',
            label: { en: item?.label },
            sublabel: item?.dataLayer.sublabel,
            layerGroupId: item?.layerGroupId,
            group: item.layerGroupId,
            metadata: {
              metadata: null,
              legendConfig: null,
            },
          },
          dashboardURL: null,
          group: item?.layerGroupId,
          order: item?.order,
          layerGroupId: item?.layerGroupId,
        };
        return newItem;
      });
  }

  const remoteDataLayerRequests = remoteDataLayers.map((item: any) => {
    if (item?.origin === 'gfw-api') {
      return fetchFlagshipLayer(item);
    } else if (item?.origin === 'rw-api') {
      return fetchRWLayer(item);
    } else {
      return fetchRemoteApiLayer(item);
    }
  });

  detailedLayers.forEach((detailedLayer) => {
    remoteDataLayerRequests.push(detailedLayer);
  });

  return Promise.all(remoteDataLayerRequests);
}
