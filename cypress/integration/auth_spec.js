describe('Auth pages', function () {
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
      cy.get('#name').type(this.user.name)
      cy.get('#email').type(this.user.email)
      cy.get('#password').type(this.user.password)
      cy.get('#password-confirm').type(this.user.password)
      cy.root().submit()
      cy.url().should('include', '/dashboard')
    })
  })
})
