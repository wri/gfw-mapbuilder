import resources from 'resources';
import request from 'request';

const { analysisModules } = resources;
const apiPrefix = 'https://api.resourcewatch.org/v1/widget';

test('API widget spec', () => {

  expect.assertions(analysisModules.length);

  analysisModules.forEach((module) => {

    if (module.useGfwWidget) {
      expect(module).toHaveProperty('widgetId');

      return request(`${apiPrefix}/${module.widgetId}`, function (error, response) {
        expect(response.statusCode).toEqual(200);
      });

    }

  });
});
