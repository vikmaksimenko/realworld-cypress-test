/// <reference types="cypress" />

describe('user creating articles', () => {
  const ARTICLES_NUMBER = 11;

  beforeEach(() => {
    cy.login();
  });

  /**
   * Note: this test won't work in parallel with other tests that might add articles
   * We think that newly added articles are the newest
   */

  it('can create ' + ARTICLES_NUMBER + ' new articles', () => {
    // Create 11 articles
    cy.wrap(Array.from({length: ARTICLES_NUMBER}, (v, k) => k + 1)).each(index => {
      cy.get('[href="#/editor"]').click();

      cy.get('[name=title]').should('be.visible').type('Article #' + index);
      cy.get('[name=description]').type('Description #' + index);
      cy.get('[name=body]').type('Body #' + index);
      cy.get('[name=tagList]').type('tag#' + index + ',tag#' + (index + 1));
      cy.get('[type=submit]').click();

      cy.get('.article-page').should('be.visible');
      cy.get('.banner h1').should('have.text', 'Article #' + index);
      cy.get('.article-content > div > div').
          first().should('have.text', 'Description #' + index).
          next().should('contain.text', 'Body #' + index);

      cy.get('.tag-list > .tag-pill').
          then($els => cy.fetchTexts($els)).
          should('deep.equal', ['tag#' + index, 'tag#' + (index + 1)]);
    });

    // Check articles on feed
    cy.contains('Home').click();
    cy.contains('Global Feed').click();
    cy.get('.article-preview').should('not.be.empty');

    cy.wrap(Array.from({length: ARTICLES_NUMBER}, (v, k) => k + 1).reverse()).each((item, index, list) => {
      cy.get('.article-preview').eq(index % 10).within($el => {
        cy.get('h1').should('have.text', 'Article #' + item);
        cy.get('p').should('have.text', 'Description #' + item);

        cy.get('.tag-list > .tag-pill').
            then(($els) => cy.fetchTexts($els)).
            should('deep.equal', ['tag#' + item, 'tag#' + (item + 1)]);
      });

      if ((index + 1) % 10 == 0) {
        cy.get('.page-link').contains('»').click();
      }
    });
  });

  afterEach(() => {
    // TODO: Remove created articles
  });
});
