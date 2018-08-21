


describe('My first integration test', function () {
  it('Is kinda boring', function () {
    expect(1).to.equal(1);
  });
});

describe('An actual test on our app', function () {
  it('Ensures our external constructor has the correct properties', function () {

    cy.visit('http://localhost:8000/libBuild/external.html');

    cy.window().then((win) => {
      // win is the remote window

      const app = win.customApp;
      expect(app).to.not.be.an('undefined');

      const config = app.constructorArgs;
      expect(config).to.not.be.an('undefined');

      const el = config.el;
      expect(el).to.not.be.an('undefined');

      const version = config.version;
      expect(version).to.not.be.an('undefined');
      expect(version).to.be.a('string');

      const cssPath = config.cssPath;
      if (cssPath) {
        expect(cssPath).to.be.a('string');
      }

    });
  });

  it('Tests our library constructor parameters', function () {

    cy.visit('http://localhost:8000/libBuild/external.html');

    cy.window().then((win) => { // win is the remote window

      const app = win.customApp;
      expect(app).to.not.be.an('undefined');

      const constructorParams = app.constructorArgs;
      console.log(constructorParams);
      expect(constructorParams).to.not.be.an('undefined');

      const config = constructorParams.config;
      expect(config).to.not.be.an('undefined');

      if (config.subscriptionEventName) {
        expect(config.subscriptionEventName).to.be.a('string');
        // try {
        //   const listeners = win.getEventListeners(win);
        //   console.log('listeners', listeners); //ensure config.subscriptionEventName is in here!
        // } catch (e) {
        //   console.log('We could not get event listeners on the window!');
        // } finally {
        //   expect(config.subscriptionEventName).to.be.a('string');
        // }
      }

      if (config.useAlternativeLanguage) {
        const alternativeLanguage = config.alternativeLanguage;
        expect(alternativeLanguage).to.not.be.an('undefined');
      }

      if (config.includeCartoTemplateLayers) {
        const cartoTemplateId = config.cartoTemplateId;
        expect(cartoTemplateId).to.not.be.an('undefined');
        const cartoApiKey = config.cartoApiKey;
        expect(cartoApiKey).to.not.be.an('undefined');
        const cartoGroupLabel = config.cartoGroupLabel;
        expect(cartoGroupLabel).to.not.be.an('undefined');
        expect(config.cartoGroupLabel).to.have.property(config.language);
      }

      if (config.layerPanel) {
        if (config.layerPanel.GROUP_WEBMAP) {
          expect(config.layerPanel).to.have.property('GROUP_WEBMAP');
          expect(config.layerPanel.GROUP_WEBMAP).to.have.property('label');
          expect(config.layerPanel.GROUP_WEBMAP).to.have.property('layers');
          assert.isArray(config.layerPanel.GROUP_WEBMAP.layers, 'value is array');
        }

        if (config.layerPanel.GROUP_BASEMAP) {
          expect(config.layerPanel).to.have.property('GROUP_BASEMAP');
          expect(config.layerPanel.GROUP_BASEMAP).to.have.property('label');
          expect(config.layerPanel.GROUP_BASEMAP).to.have.property('layers');
          assert.isArray(config.layerPanel.GROUP_BASEMAP.layers, 'value is array');
        }

        if (config.layerPanel.extraLayers) {
          expect(config.layerPanel).to.have.property('extraLayers');
          assert.isArray(config.layerPanel.extraLayers, 'value is array');
        }

        const layerPanelKeys = Object.keys(config.layerPanel).filter(g => g !== 'GROUP_BASEMAP' && g !== 'GROUP_WEBMAP' && g !== 'extraLayers');
        const allLayers = layerPanelKeys.map(k => config.layerPanel[k].layers).reduce((acc, current) => [...acc, ...current], []);

        console.log('allLayers', allLayers);

        allLayers.forEach((layer) => {
          if (layer.type === 'wms') {
            it('has a layerName property if it is a WMSLayer', () => {
              expect(layer).to.have.property('layerName');
              expect(layer.layerName).to.be.a('string');
            });
          }
          it(`layer ${layer.id} has the required properties`, () => {
            expect(layer).to.have.property('id');
            expect(layer).to.have.property('type');
            expect(layer).to.have.property('url');
            expect(layer).to.have.property('label');
            expect(layer).to.have.property('label');
            expect(layer.label).toHaveProperty(config.language);
          });
        });
      }

    });
  });

});
