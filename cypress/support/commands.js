Cypress.Commands.add('login', () => {
  cy.fixture('login.json').then(login => {
    cy.request('POST', 'http://localhost:3333/api/users/login', {'email': 'test@test.com', 'password': 'test'}).
        then(response => {
          window.localStorage.setItem("userInfo", JSON.stringify(response.body.data))
        });
  })

  cy.visit('/')
  cy.get('.navbar .nav-link').contains('test').should('be.visible')
})
