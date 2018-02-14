import resources from 'resources';

const { analysisModules } = resources;


test('analysis modules has the required properties', () => {

  expect(analysisModules).toBeInstanceOf(Array);

  // if (resources.useAlternativeLanguage) {
//     expect(resources).toHaveProperty('alternativeLanguage');
//     expect(resources.alternativeLanguage).toBeDefined();
//     expect(resources.alternativeLanguage).toBeTruthy();
//   }

//   expect(resources).toHaveProperty('layerPanel');
//   expect(resources).toHaveProperty('layerPanel.GROUP_WEBMAP');
//   expect(resources).toHaveProperty('layerPanel.GROUP_WEBMAP.label');
//   expect(resources).toHaveProperty('layerPanel.GROUP_WEBMAP.layers');
//   expect(resources.layerPanel.GROUP_WEBMAP.layers).toBeInstanceOf(Array);
//   expect(resources.layerPanel.GROUP_WEBMAP.layers).toHaveLength(0);

//   expect(resources).toHaveProperty('layerPanel.GROUP_LCD'); //we Are checking for these layers in LossControls & LayerLegend
//   expect(resources).toHaveProperty('layerPanel.GROUP_LCD.layers');
//   expect(resources.layerPanel.GROUP_LCD.layers).toBeInstanceOf(Array);

//   expect(resources).toHaveProperty('layerPanel.GROUP_LC'); //same thing
//   expect(resources).toHaveProperty('layerPanel.GROUP_LC.layers');
//   expect(resources.layerPanel.GROUP_LC.layers).toBeInstanceOf(Array);

//   expect(resources).toHaveProperty('layerPanel.GROUP_BASEMAP'); //same thing
//   expect(resources).toHaveProperty('layerPanel.GROUP_BASEMAP.layers');
//   expect(resources.layerPanel.GROUP_BASEMAP.layers).toBeInstanceOf(Array);

//   expect(resources).toHaveProperty('layerPanel.extraLayers');

});

test('analysis module spec', () => {
  analysisModules.forEach((module) => {
    expect(module.label).toHaveProperty(resources.language);
    expect(module).toHaveProperty('analysisUrl');
    expect(module).toHaveProperty('analysisId');

    if (module.useGfwWidget) {
      expect(module).toHaveProperty('widgetId');
      expect(module).not.toHaveProperty('chartType');
    } else {
      expect(module).toHaveProperty('chartType');
    }

    if (module.chartType === 'bar') {
      expect(module).toHaveProperty('valuesAttribute');
      expect(module).toHaveProperty('chartBounds');
      expect(module.chartBounds).toBeInstanceOf(Array);
      expect(module.chartBounds).toHaveLength(2);

    }

    expect(module.params).toBeInstanceOf(Array);

    module.params.forEach((param) => {
      expect(param).toHaveProperty('name');
      expect(param).toHaveProperty('value');
    });

    if (typeof module.uiParams === 'string') {
      expect(module.uiParams).toEqual('none');
    } else {
      expect(module.uiParams).toBeInstanceOf(Array);

      module.uiParams.forEach((uiParam) => {
        expect(uiParam.label).toHaveProperty(resources.language);
        expect(uiParam).toHaveProperty('inputType');

        if (uiParam.inputType === 'tcd') {
          expect(uiParam).toHaveProperty('name');
        } else if (uiParam.inputType === 'rangeSlider') {
          expect(uiParam).toHaveProperty('startParamName');
          expect(uiParam).toHaveProperty('bounds');
          expect(uiParam.bounds).toBeInstanceOf(Array);
          expect(uiParam.bounds).toHaveLength(2);

          if (!uiParam.combineParams) {
            expect(uiParam).toHaveProperty('endParamName');
          }
        }
      });
    }



  });
});
