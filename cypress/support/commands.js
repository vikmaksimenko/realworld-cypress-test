Cypress.Commands.add('login', () => {

  // TODO: Read data from fixture

  cy.request('POST', 'http://localhost:3333/api/users/login', {'email': 'test@test.com', 'password': 'test'}).
      then(response => {
        window.localStorage.setItem("userInfo", JSON.stringify(response.body.data))
      });

  cy.visit('http://localhost:4200')
  cy.get('.navbar .nav-link').contains('test').should('be.visible')
})
