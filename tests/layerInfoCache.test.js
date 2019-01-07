import layerInfoCache from 'utils/layerInfoCache';
import {values} from 'testing/config';


test('The layerInfoCache has the proper methods', () => {
  expect(layerInfoCache).toHaveProperty('fetch');
  expect(layerInfoCache).toHaveProperty('get');

  expect(typeof layerInfoCache.fetch).toEqual('function');
  expect(typeof layerInfoCache.get).toEqual('function');
});

test('A layer w/ a "technicalName" returns the proper metadata from getMetadataTask', () => {
  expect.assertions(2);
  return layerInfoCache.fetch(values.technical.layerObj).then(data => {
    expect(data.frequency_of_updates).toBe(values.technical.frequency_of_updates);
    expect(data.resolution).toBe(values.technical.resolution);
  });
});

// test('A layer w/ type = "wms" returns the proper metadata from the xml doc', () => {
//   expect.assertions(1);
//   return layerInfoCache.fetch(values.wms.layerObj).then(data => {
//     expect(data.description).toBe(values.wms.description);
//   });
// });

test('A layer w/ an "esriLayer" returns the proper metadata from the rest endpoint', () => {
  expect.assertions(1);
  return layerInfoCache.fetch(values.oil.layerObj).then(data => {
    expect(data.description).toBe(values.oil.description);
  });
});
