module.exports = {

  'see login form' (client) {
    client
      .path('/login')
      .waitForElementVisible('#login_form')
      .assert.containsText('#login_form button[type="submit"]', 'Login');
  },

  'see register form' (client) {
    client
      .path('/register')
      .waitForElementVisible('#register_form')
      .assert.containsText('#register_form button[type="submit"]', 'Register');
  }

};
