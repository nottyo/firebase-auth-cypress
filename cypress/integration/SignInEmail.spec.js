/// <reference types="cypress" />

describe('SignInEmail', () => {

  beforeEach(() => {
    cy.visit(`${Cypress.config('baseUrl')}/login/email`);
  })

  it('can sign in with email', () => {
    const email = 'test@cypress.io'
    cy.get('[id="ui-sign-in-email-input"]')
      .type(email)
    cy.get('button[type="submit"]')
      .click()
    cy.get('[id="ui-sign-in-password-input"]')
      .type('cypress_test')
    cy.get('button[type="submit"]')
      .click()
    cy.get('[data-testid="welcome-text"]')
      .should('have.text', `Welcome ${email}! You are now signed-in!`)
  })
});