import layerInfoCache from 'utils/layerInfoCache';

// layerInfoCache.fetch(layer, layerId).then(layerInfo => {
//   this.modalLayerInfo = layerInfo;
//   promise.resolve(layerInfo);
// });

test('The layerInfoCache has the proper methods', () => {
  expect(layerInfoCache).toHaveProperty('fetch');
  expect(layerInfoCache).toHaveProperty('get');

  expect(typeof layerInfoCache.fetch).toEqual('function');
  expect(typeof layerInfoCache.get).toEqual('function');
});

test('A layer w/ a "technicalName" returns the proper metadata from getMetadataTask', () => {
  const layerObj = {
    technicalName: 'tree_cover_loss',
    id: 'TREE_COVER_LOSS',
    type: 'loss',
    url: 'https://storage.googleapis.com/wri-public/Hansen17/tiles/hansen_world/v1/tc30/{z}/{x}/{y}.png',
  };

  expect.assertions(2);
  return layerInfoCache.fetch(layerObj).then(data => {
    expect(data.frequency_of_updates).toBe('<p>Annual</p>');
    expect(data.resolution).toBe('<p>30 × 30 meters</p>');
  });
});

test('A layer w/ type = "wms" returns the proper metadata from the xml doc', () => {
  const layerObj = {
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
  };

  expect.assertions(1);
  return layerInfoCache.fetch(layerObj).then(data => {
    console.log(data);
    // expect(data.frequency_of_updates).toBe('<p>Annual</p>');
    expect(data.description).toBe('A sample filter that filters the United States into three categories of population, drawn in different colors');
  });
});
