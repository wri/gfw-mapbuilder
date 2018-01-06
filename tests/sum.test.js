import resources from 'resources';
// console.log(resources);

test('adds 1 + 2 to equal 3', () => {
 expect(1).toBe(1);
});


test('resources has the required properties', () => {
  // Simple Referencing
  expect(resources).toHaveProperty('webmap');
  expect(resources).toHaveProperty('title', 'GFW Mapbuilder');
  expect(resources).toHaveProperty('language');

  expect(resources).not.toHaveProperty('Lucas');

  if (resources.useAlternativeLanguage) {
    expect(resources).toHaveProperty('alternativeLanguage');
    expect(resources.alternativeLanguage).toBeDefined();
    expect(resources.alternativeLanguage).toBeTruthy();
  }

  expect(resources).toHaveProperty('layerPanel');
  expect(resources).toHaveProperty('layerPanel.GROUP_WEBMAP');
  expect(resources).toHaveProperty('layerPanel.GROUP_WEBMAP.label');
  expect(resources).toHaveProperty('layerPanel.GROUP_WEBMAP.layers');
  expect(resources.layerPanel.GROUP_WEBMAP.layers).toHaveLength(0);

  expect(resources).toHaveProperty('layerPanel.GROUP_LCD'); //we Are checking for these layers in LossControls & LayerLegend
  expect(resources).toHaveProperty('layerPanel.GROUP_LCD.layers');

  expect(resources).toHaveProperty('layerPanel.GROUP_LC'); //same thing
  expect(resources).toHaveProperty('layerPanel.GROUP_LC.layers');

  expect(resources).toHaveProperty('layerPanel.GROUP_BASEMAP'); //same thing
  expect(resources).toHaveProperty('layerPanel.GROUP_BASEMAP.layers');

  expect(resources).toHaveProperty('layerPanel.extraLayers'); //same thing


  // // Deep referencing using dot notation
  // expect(resources).toHaveProperty('kitchen.area', 20);
  // expect(resources).toHaveProperty('kitchen.amenities', [
  //   'oven',
  //   'stove',
  //   'washer',
  // ]);
  //
  // expect(resources).not.toHaveProperty('kitchen.open');
  //
  // // Deep referencing using an array containing the keyPath
  // expect(resources).toHaveProperty(['kitchen', 'area'], 20);
  // expect(resources).toHaveProperty(
  //   ['kitchen', 'amenities'],
  //   ['oven', 'stove', 'washer'],
  // );
  // expect(resources).toHaveProperty(['kitchen', 'amenities', 0], 'oven');
  //
  // expect(resources).not.toHaveProperty(['kitchen', 'open']);
});
