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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {

  // TODO: Read data from fixture

  cy.request('POST', 'http://localhost:3333/api/users/login', {'email': 'test@test.com', 'password': 'test'}).
      then(response => {
        window.localStorage.setItem("userInfo", JSON.stringify(response.body.data))
      });

  cy.visit('http://localhost:4200')
  cy.get('.navbar .nav-link').contains('test').should('be.visible')
})
