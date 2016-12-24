var chalk = require('chalk');
var users = require('../data/users-data');

/**
 *  Login with the credentials for the specified user.
 *
 * @param {string} userKey - The key of the user object to use for login (see data/usersData.js).
 * @param [callback] - Pass the done callback when used in the before hook.
 * @returns {exports}
 */
exports.command = function(userKey, callback) {
	var self = this;
	var loginUser = users[userKey];
	console.log(chalk.cyan('Logging in with ' + loginUser.name + '...'));

	this.url(this.launchUrl + '/login')
		.waitForElementPresent('#email')
		.setValue('#email', loginUser.email)
		.setValue('#password', loginUser.password)
		.click('button[type="submit"]')
		.waitForElementPresent('#dashboard');

	if (typeof callback === 'function') {
		callback.call(self);
	}

	return this;
};
