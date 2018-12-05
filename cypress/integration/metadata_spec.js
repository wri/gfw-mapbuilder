
describe('Metadata workflows that expect proper responses', function () {
  it('Ensures our external constructor has the correct properties', function () {

    cy.visit('https://beta.blueraster.io/mapbuilder/external-debugging/index.html', {
      onLoad: (winn) => {
        const app = winn.customApp;
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
      }
    });

  });

});
