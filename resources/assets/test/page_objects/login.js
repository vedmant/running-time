var chalk = require('chalk');
var info = chalk.cyan;
var users = require('../data/users-data');

module.exports = {
	url: function() {
		return this.api.launchUrl + '/login';
	},
	elements: {
		emailInput: '#email',
		passwordInput: '#password',
		loginBtn: 'button[type="submit"]'
	},
	commands: [{
		submit: function() {
			// For chaining, each function should return the page object or section.
			return this.click('@loginBtn', function() {
				// Client commands like pause are available via this.api.
				this.api.pause(1000);
			});
		},
		loginAsAdmin: function() {
			console.log(info('Logging in as admin...'));
			return this
				.navigate()
				.waitForElementPresent('@emailInput')
				.setValue('@emailInput', users.admin.email)
				.setValue('@passwordInput', users.admin.password)
				.click('@loginBtn')
				.waitForElementPresent('#dashboard');
		},
    loginAsManager: function() {
      console.log(info('Logging in as manager...'));
      return this
        .navigate()
        .waitForElementPresent('@emailInput')
        .setValue('@emailInput', users.manager.email)
        .setValue('@passwordInput', users.manager.password)
        .click('@loginBtn')
        .waitForElementPresent('#dashboard');
    },
    loginAsUser: function() {
      console.log(info('Logging in as user...'));
      return this
        .navigate()
        .waitForElementPresent('@emailInput')
        .setValue('@emailInput', users.user.email)
        .setValue('@passwordInput', users.user.password)
        .click('@loginBtn')
        .waitForElementPresent('#dashboard');
    },
	}]
};
