import resources from 'resources';

const { analysisModules } = resources;


test('analysis modules has the required properties', () => {

  expect(analysisModules).toBeInstanceOf(Array);

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

    if (module.params) {
      expect(module.params).toBeInstanceOf(Array);

      module.params.forEach((param) => {
        expect(param).toHaveProperty('name');
        expect(param).toHaveProperty('value');
      });
    }

    if (module.analysisId !== 'LCC') {
      expect(module.chartType).not.toEqual('lccPie');
    }

    if (module.analysisId !== 'BIO_LOSS') {
      expect(module.chartType).not.toEqual('biomassLoss');
    }

    if (module.chartType === 'bar') {
      expect(module).toHaveProperty('chartBounds');
      expect(module.chartBounds).toBeInstanceOf(Array);
      expect(module.chartBounds).toHaveLength(2);
    }

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
          expect(uiParam).toHaveProperty('combineParams');

          if (uiParam.combineParams) {
            expect(uiParam).toHaveProperty('valueSeparator');
          } else {
            expect(uiParam).toHaveProperty('endParamName');
          }
        } else if (uiParam.inputType === 'datepicker') {
          expect(uiParam).toHaveProperty('startParamName');
          expect(uiParam).toHaveProperty('multi');

          if (uiParam.multi) {
            expect(uiParam).toHaveProperty('combineParams');

            if (uiParam.combineParams) {
              expect(uiParam).toHaveProperty('valueSeparator');
            } else {
              expect(uiParam).toHaveProperty('endParamName');
            }
          }
          
          if (uiParam.minDate) { expect(uiParam.minDate).toMatch(/\d{4}-\d{2}-\d{2}/); }
        }
      });
    }
  });
});
