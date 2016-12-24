module.exports = {

  login: function (browser) {
    browser
      .url('http://localhost:8000/#/login')
      .waitForElementVisible('#login_form', 2000)
      .assert.containsText('#login_form button[type="submit"]', 'Login')
      .end()
  }

};
