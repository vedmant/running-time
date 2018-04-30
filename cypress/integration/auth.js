const faker = require('faker')

describe('Auth pages', function () {

  before(() => {
    cy.resetDb()
  })

  it('can login', function () {
    cy.visit('/login')

    cy.fixture('user_user').as('user')

    cy.get('#login_form').within(() => {
      cy.get('#email').type(this.user.email)
      cy.get('#password').type(this.user.password)
      cy.root().submit()
    })
    cy.url().should('include', '/dashboard')
    cy.get('#dashboard').should('be.visible')
  })

  it('can register', function () {
    cy.visit('/register')

    cy.fixture('user_new').as('user')

    cy.get('#register_form').within(() => {
      cy.get('#name').type(faker.name.findName())
      cy.get('#email').type(faker.internet.email())
      cy.get('#password').type(this.user.password)
      cy.get('#password-confirm').type(this.user.password)
      cy.root().submit()
      cy.url().should('include', '/dashboard')
    })
  })

  it('can logout', function () {
    cy.login('user')
    cy.get('.navbar a').contains('User').click()
    cy.get('.navbar a').contains('Logout').click()
    cy.get('.navbar a').contains('Login').should('be.visible')
    cy.get('.navbar a').contains('Register').should('be.visible')

    cy.store().its('state.auth.me').should('be.equal', null)
  })
})
