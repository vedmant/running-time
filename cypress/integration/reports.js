describe('Reports', function () {
  before(() => {
    cy.resetDb()
    cy.login('user')
  })

  it('can see weekly report', function () {
    cy.visit('/report/weekly')

    cy.get('.vue-chart').contains('My Performance').should('be.visible')
    cy.get('table').contains('Week').should('be.visible')
    cy.get('table').contains('Avg. Speed').should('be.visible')
    cy.get('table').contains('Avg. Distance').should('be.visible')
  })
})
