describe('Dashboard', function () {
  before(() => {
    cy.resetDb()
    cy.login('user')
  })

  it('can see dashboard widgets', function () {
    cy.visit('/dashboard')

    cy.get('.panel').contains('This week').should('be.visible')
    cy.get('.panel').contains('Best results').should('be.visible')
    cy.get('.panel').contains('Add new Time Record').should('be.visible')
    cy.get('.vue-chart').contains('My Performance').should('be.visible')
  })
})
