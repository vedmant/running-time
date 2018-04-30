describe('Profile', function () {
  before(() => {
    cy.resetDb()
    cy.login('user')
  })

  it('can update profile', function () {
    cy.visit('/profile')

    cy.fixture('user_update').as('userUpd')

    cy.get('#profile_form').within(() => {
      cy.get('#name').clear().type(this.userUpd.name)
      cy.get('#email').clear().type(this.userUpd.email)
      cy.get('#password').clear().type(this.userUpd.password)
      cy.get('#password-confirm').clear().type(this.userUpd.password)
      cy.root().submit()
    })
  })

  it('can login with updated profile data', function () {
    cy.login('update')
  })
})
