module.exports = {

  'see login form'(client) {
    client
      .logout()
      .path('/login')
      .waitForElementVisible('#login_form')
      .assert.containsText('#login_form button[type="submit"]', 'Login')
      .end();
  },

  'see register form'(client) {
    client
      .logout()
      .path('/register')
      .waitForElementVisible('#register_form')
      .assert.containsText('#register_form button[type="submit"]', 'Register')
      .end();
  }

};
