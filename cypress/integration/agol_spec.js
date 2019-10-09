
describe('An actual test on our app', function () {

  it("Tests our AGOL app's overwrite of our constructor parameters", function () {

    cy.visit('https://my.gfw-mapbuilder.org/v1.4.0/?appid=277b92455c6c49059a95c9129be7baf9&l=en');

    cy.window().then(windowObject => {
      const app = windowObject.customApp;
      expect(app).to.not.be.an('undefined');

      const constructorParams = app.constructorArgs;
      const config = constructorParams.config;
      cy.wait(11000);

      cy.get('.app-header__title').should(($div) => {
        const titleText = $div.get(0).innerText;
        expect(titleText.toLowerCase()).to.not.eq(config.title.toLowerCase());
      });
      cy.get('.app-header__subtitle').should(($div) => {
        const subtitleText = $div.get(0).innerText;
        expect(subtitleText.toLowerCase()).to.not.eq(config.subtitle.toLowerCase());
      });

      cy.get('.app-header__logo-container').find('img').should('have.attr', 'src').should('not.include', config.logoUrl);
      cy.get('.app-header__logo-container').find('a').should('have.attr', 'href').should('not.include', config.logoLinkUrl);

      cy.get('.app-header__nav-link--map-themes').should('have.length', 1);
      cy.get('.app-header__nav-link--gfw-login').should('have.length', 1);
      cy.get('.app-header__nav-link--language').should('have.length', 1);

      cy.get('.app-header__language-list').children().should('have.length', 2);
      cy.get('.app-header__language').first().should('have.attr', 'data-lang').should('include', 'en');
      cy.get('.app-header__language').last().should('have.attr', 'data-lang').should('include', 'fr');
      cy.get('.app-header__language').first().should('have.class', 'active');

      cy.get('[data-value="MEASUREMENT"]').should('have.length', 1);
      cy.get('[data-value="DOCUMENTS"]').should('have.length', 1);
      cy.get('[data-value="NARRATIVE"]').should('have.length', 1);
      cy.get('[data-value="NARRATIVE"]').should('have.class', 'active');
      cy.get('.tab-view__content').first().should('have.class', 'selected');
      cy.get('.control-panel__share-map').should('have.length', 1);

      cy.get('[data-value="LAYERS"]').click();
      cy.get('[data-value="LAYERS"]').should('have.class', 'active');

      const ll = cy.get('.layer-category-content').not('.closed');
      console.log('ll', ll);

    });

  });


});
