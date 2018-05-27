describe('My first integration test', function () {
  it('Is kinda boring', function () {
    expect(1).to.equal(1);
  });
});

describe('An actual test on our app', function () {
  it('Makes assertions on Mapbuilder itself', function () {
    //Arrange
    //Act
    //Assert
    cy.visit('http://localhost:3000/')
    cy.get('.control-panel__locate-me').click()

    cy.get('.search-modal-container').should('have.class', 'modal-wrapper')
    cy.get('.search-modal-container').should('not.have.class', 'hidden')

    cy.get('#deg-lat')
      .type('33')
      .should('have.value', '33')

    cy.get('#deg-lng')
      .type('text not integer')
      .should('have.value', '')

    cy.get('.search-modal-container').find('.close-icon').click()
    cy.get('.search-modal-container').should('have.class', 'hidden')
    expect(1).to.equal(1);
  });
});

// describe('Tests on production', function () {
//   it('Makes assertions on the Mapbuilder deployment', function () {
//     //Arrange
//     //Act
//     //Assert
//     cy.visit('http://wri.github.io/gfw-mapbuilder/')
//     cy.get('.control-panel__locate-me').click()
//
//     cy.get('.search-modal-container').should('have.class', 'modal-wrapper')
//     cy.get('.search-modal-container').should('not.have.class', 'hidden')
//
//     cy.get('#deg-lat')
//       .type('33')
//       .should('have.value', '33')
//
//     cy.get('#deg-lng')
//       .type('text not integer')
//       .should('have.value', '')
//   });
// });
