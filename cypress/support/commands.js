// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('upload_file', (fileName, selector) => {
    cy.get(selector).then(subject => {
        cy.fixture(fileName).then((content) => {
            const el = subject[0]
            const testFile = new File([content], fileName)
            const dataTransfer = new DataTransfer()

            dataTransfer.items.add(testFile)
            el.files = dataTransfer.files
        })
    })
})
