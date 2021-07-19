/// <reference types="cypress" />

describe('user creating articles', () => {
  beforeEach(() => {
    cy.login();
  });

  it('can create 11 new articles', () => {
    cy.wrap(Array.from({length: 11}, (v, k) => k + 1)).each(index => {
      cy.get('[href="#/editor"]').click();

      // TODO: Read article data from fixture file or init it somehow
      cy.get('[name=title]').should('be.visible').type('Article #' + index);
      cy.get('[name=description]').type('Description #' + index);
      cy.get('[name=body]').type('Body #' + index);
      cy.get('[name=tagList]').type('tag#' + index + ',tag#' + (index + 1));
      cy.get('[type=submit]').click();

      cy.contains('Edit Article').should('be.visible');
      cy.get('.banner h1').should('have.text', 'Article #' + index);
      cy.get('.article-content > div > div').
          first().should('have.text', 'Description #' + index).
          next().should('contain.text', 'Body #' + index);

      cy.get('.tag-list > .tag-pill').should('have.length', 2).then(($els) => {
        // we get a list of jQuery elements
        // let's convert the jQuery object into a plain array
        return (
            Cypress.$.makeArray($els)
                // and extract inner text from each
                .map((el) => el.innerText)
        );
      }).should('deep.equal', ['tag#' + index, 'tag#' + (index + 1)]);
    });
  });
});
