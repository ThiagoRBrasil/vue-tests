const { species } = require('core-js/fn/symbol');

describe('Form', () => {
  describe('When visit form url', () => {
    it('container h1 Form', () => {
      cy.visit('/form');
      cy.contains('h1', 'Form');
    });

    describe('When fill name add lastname', () => {
      it('should go to home When click button', () => {
        cy.visit('/form');
        cy.get('.for_input_name').type('thiago');
        cy.get('.for_input_lastname').type('brasil');
        cy.get('button').click();
        cy.url().should('eq', 'http://localhost:8081');
      });
    });
  });
});
