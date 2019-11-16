const moment = require('moment-mini');

describe('Entries', function () {
  before(() => {
    cy.resetDb()
  })

  beforeEach(() => {
    cy.login('user')
  })

  it('can see list of entries', function () {
    cy.visit('/entries')

    cy.get('#entries_list').should('be.visible')
  })

  it('can add new entry', function () {
    cy.visit('/entries') // Needs for correct redirect back
    cy.visit('/entry/new')

    cy.wait(500)
    cy.get('#entry_form').within(() => {
      cy.get('#date').type(moment().format('YYYY-MM-DD'))
      cy.get('#distance').type('6')
      cy.get('#time_hours').invoke('attr', 'maxlength', '10').clear().type('0')
      cy.get('#time_minutes').invoke('attr', 'maxlength', '10').clear().type('30')
      cy.get('#time_seconds').invoke('attr', 'maxlength', '10').clear().type('17')
      cy.root().submit()
    })
    cy.url().should('include', '/entries')
    cy.get('#entries_list').should('be.visible')
    cy.get('.toast-message').should('contain', 'added')
  })

  it('can update entry', function () {
    cy.visit('/entries')

    cy.get('#entries_list > tbody > tr:first-child').then($row => {
      const rowId = $row.attr('id').split('-').pop()
      cy.visit('/entry/edit/' + rowId)
    })

    cy.get('#entry_form').within(() => {
      cy.get('#date').type(moment().subtract(2, 'days').format('YYYY-MM-DD'))
      cy.get('#distance').invoke('attr', 'maxlength', '10').clear().type('6')
      cy.get('#time_hours').invoke('attr', 'maxlength', '10').clear().type('0')
      cy.get('#time_minutes').invoke('attr', 'maxlength', '10').clear().type('20')
      cy.get('#time_seconds').invoke('attr', 'maxlength', '10').clear().type('10')
      cy.root().submit()
    })
    cy.url().should('include', '/entries')
    cy.get('#entries_list').should('be.visible')

    cy.get('.toast-message').should('contain', 'updated')
  })

  it('can delete entry', function () {
    cy.visit('/entries')

    cy.get('#entries_list > tbody > tr:first-child').then($row => {
      const rowId = $row.attr('id')
      cy.get('#' + rowId).should('exist')
      $row.find(`.btn-danger`).click()
      cy.get('#' + rowId).should('not.exist')
    })

    cy.get('.toast-message').should('contain', 'deleted')
  })
})
