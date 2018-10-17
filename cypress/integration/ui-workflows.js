

describe('An actual test on our app', function () {
  it('Ensures our external constructor has the correct properties', function () {

    let windowObj;

    cy.visit('http://localhost:8000/libBuild/external.html')
    cy.title().should('include', 'GFW Mapbuilder')
    cy.wait(500)

    cy.window().then(windowObject => {

      windowObj = windowObject;
      const app = windowObj.customApp;
      expect(app).to.not.be.an('undefined');
    });

    cy.get('.tab-buttons__tab:first-child').click()
    cy.get('.legend-title').click()
    cy.wait(500)

    cy.get('.analysis-modal-container').should('have.class', 'hidden')
    cy.get('.control-panel__draw-upload').click()
    cy.get('.analysis-modal-container').should('not.have.class', 'hidden')

    cy.get('.analysis-modal-container .analysis-instructions__draw-button').click()
    cy.get('.analysis-modal-container').should('have.class', 'hidden')


    cy.wait(500)
    cy.get('.map')
        .click(80, 75) // click 80px on x coord and 75px on y coord
        .click(170, 75)
        .click(90, 165)
        .click(100, 185)
        .click(125, 190);
        // .dblclick(125, 190)

    cy.get('.control-panel__draw-upload').click()
    cy.get('.analysis-modal-container').should('not.have.class', 'hidden')

    cy.get('.analysis-modal-container .analysis-instructions__draw-button').click();
    cy.get('.analysis-modal-container').should('have.class', 'hidden')
    cy.wait(2500)

    cy.get('.tab-view__content').should('have.class', 'selected');
    cy.get('.analysis-results__select').should('exist');
    cy.get('.analysis-results__select').contains('option', 'Select analysis...')


    // cy.get('form')                  // yields <form>...</form>
    //   .contains('form', 'Proceed')

    //cy.get('ul li:first').should('have.class', 'active')
    // cy.get('form').within(() => {
    //   cy.get('input').type('Pamela')
    //   cy.get('textarea').type('is a developer')
    // })

  });



});
