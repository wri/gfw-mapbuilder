// config.analysis[analysisKeys.MODIS_FIRES] = {
//   url: 'https://gis-gfw.wri.org/arcgis/rest/services/Fires/FIRMS_Global/MapServer/9'
// };

export const values = {
  technical: {
    layerObj: {
      technicalName: 'tree_cover_loss',
      id: 'TREE_COVER_LOSS',
      type: 'loss',
      url: 'https://storage.googleapis.com/wri-public/Hansen17/tiles/hansen_world/v1/tc30/{z}/{x}/{y}.png',
    },
    frequency_of_updates: '<p>Annual</p>',
    resolution: '<p>30 × 30 meters</p>'
  },
  wms: {
    layerObj: {
      order: 3,
      id: 'WMS_STATES',
      type: 'wms',
      url: 'https://ahocevar.com/geoserver/wms',
      layerName: 'topp:states',
      visible: true,
      label: {
        en: 'States'
      },
      esriLayer: {
        url: 'https://ahocevar.com/geoserver/wms',
        version: '1.3.0'
      }
    },
    description: 'A sample filter that filters the United States into three categories of population, drawn in different colors'
  },
  oil: {
    layerObj: {
      itemId: undefined,
      label: {
        en: 'Oil permits'
      },
      subId: 'Affectation_des_terres_en_9757_48',
      subIndex: 48,
      esriLayer: {
        url: 'https://gis.forest-atlas.org/server/rest/services/cod/Affectation_des_terres_en/MapServer',
        id: 'Affectation_des_terres_en_9757'
      }
    },
    description: 'This theme represents the areas covered by the oil blocks as well as the prospecting, exploration and petroleum exploitation permits in the Democratic Republic of Congo. This dataset is produced by the Ministry of Hydrocrabures. The WRI / CARPE Project obtained this data from the Moabi platform for the production of the Interactive Forest Atlas of the Democratic Republic of Congo'
  }
};
