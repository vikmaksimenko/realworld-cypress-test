Cypress.Commands.add('genericArticle', (index) => {
  return {
    'title': 'Article #' + index,
    'description': 'Description #' + index,
    'body': 'Body #' + index,
    'tags': ['tag#' + index, 'tag#' + (index + 1)],
  };
});

Cypress.Commands.add('addArticle', (article) => {
  cy.get('[href="#/editor"]').click();
  cy.get('[name=title]').should('be.visible').type(article.title);
  cy.get('[name=description]').type(article.description);
  cy.get('[name=body]').type(article.body);
  cy.get('[name=tagList]').type(article.tags.join(','));
  cy.get('[type=submit]').click();
});

// TODO: Add checks for article creation date and author
Cypress.Commands.add('validateArticle', (article) => {
  cy.get('.article-page').should('be.visible');
  cy.get('.banner h1').should('have.text', article.title);
  cy.get('.article-content > div > div').
      first().should('have.text', article.description).
      next().should('contain.text', article.body);

  cy.get('.tag-list > .tag-pill').
      then($els => cy.fetchTexts($els)).
      should('deep.equal', article.tags);
});

// TODO: Add checks for article creation date and author
Cypress.Commands.add('validateArticlePreview', (article, $preview) => {
  cy.wrap($preview).within($el => {
    cy.get('h1').should('have.text', article.title);
    cy.get('p').should('have.text', article.description);

    cy.get('.tag-list > .tag-pill').
        then(($els) => cy.fetchTexts($els)).
        should('deep.equal', article.tags);
  });
});
