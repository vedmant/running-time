var moment = require('moment-mini');

describe('Entries', function () {
  beforeEach(() => {
    cy.login('user')
  })

  it('can see list of entries', function () {
    cy.visit('/entries')

    cy.get('#entries_list').should('be.visible')
  })

  it('can see list of entries', function () {
    cy.visit('/entries')
    cy.visit('/entry/new')

    cy.get('#entry_form').within(() => {
      cy.get('#date').type(moment().format('YYYY-MM-DD'))
      cy.get('#distance').type(6)
      cy.get('#time_hours').clear().type(0)
      cy.get('#time_minutes').clear().type(30)
      cy.get('#time_seconds').clear().type(17)
      cy.root().submit()
    })
    cy.url().should('include', '/entries')
    cy.get('#entries_list').should('be.visible')
    // expect(cy.get('.toast-message')).to.contain('added')
  })
})
