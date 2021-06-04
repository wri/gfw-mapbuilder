/// <reference types="cypress" />
import resources from '../../configs/resources';

describe('Main App E2E Test Suite', () => {
  it('Language change works and loads the app main elements', () => {
    cy.visit('http://localhost:8080');
    const header = cy.get('[data-cy=header]');
    header.contains(resources.title, { matchCase: false });
    //Only run this part if alternative language is in the config
    if (
      resources?.alternativeLanguage !== '' &&
      resources?.alternativeWebmap !== ''
    ) {
      cy.wait(5000); //wait for app/esri resources to be loaded
      cy.get('[data-cy=lang-dropdown]');
      const languageButton = cy.get(
        `[data-lang=${resources.alternativeLanguage}]`
      );
      languageButton.click({ force: true });
      cy.wait(5000); //wait for app/esri resources to be loaded

      if (resources?.alternativeLanguageTitle !== '') {
        cy.get('[data-cy=header]').contains(
          resources.alternativeLanguageTitle,
          { matchCase: false }
        );
      }
      cy.get('[data-cy=left-panel]');
      cy.get('[data-cy=all-layer-btn]').click();
      cy.wait(5000); //wait for app/esri resources to be loaded
      cy.get('[data-cy=legend]');
    }
  });
});
