/// <reference types="cypress" />
import resources from '../../configs/resources';

describe('Main App E2E Test Suite', () => {
  it('Loads the app with local configuration, header, leftpanel and legend exist', () => {
    cy.visit('http://localhost:8080');
    const header = cy.get('[data-cy=header]');
    header.contains(resources.title, { matchCase: false });
    cy.wait(5000);
    cy.get('[data-cy=left-panel]');
    cy.get('[data-cy=all-layer-btn]').click();
    cy.get('[data-cy=legend]');
  });
});
