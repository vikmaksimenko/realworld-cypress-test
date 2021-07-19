/// <reference types="cypress" />

describe('user creating articles', () => {
  const ARTICLES_NUMBER = 11;

  beforeEach(() => {
    cy.login();

    cy.times(ARTICLES_NUMBER, (item) => {
      cy.genericArticle(item).as('article' + item);
    });
  });

  /**
   * Note: this test won't work in parallel with other tests that might add articles
   * We think that newly added articles are the newest
   */

  it('can create ' + ARTICLES_NUMBER + ' new articles', () => {
    // Create $ARTICLES_NUMBER articles
    cy.times(ARTICLES_NUMBER, item => {
      cy.get('@article' + item).then(article => {
        cy.addArticle(article);
        cy.validateArticle(article);
      });
    });

    // Check articles on feed
    cy.contains('Home').click();
    cy.contains('Global Feed').click();
    cy.get('.article-preview').should('not.be.empty');

    cy.times(ARTICLES_NUMBER, (item, index, list) => {
      cy.get('@article' + (list.length - index)).then(article => {
        cy.get('.article-preview').eq(index % 10).then($el => {
          cy.validateArticlePreview(article, $el);
        });

        if ((index + 1) % 10 == 0) {
          cy.get('.page-link').contains('»').click();
        }
      });
    });
  });

  afterEach(() => {
    // TODO: Remove created articles
  });
});
