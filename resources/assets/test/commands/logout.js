var chalk = require('chalk');

/**
 * Send logout request as an api call.
 *
 * @returns {exports}
 */
exports.command = function(callback) {
	console.log(chalk.cyan('Logging out...'));
	this.url(this.launchUrl + '/logout')
    .pause(500);

  console.log(chalk.cyan('Logged out'));

  if (typeof callback === 'function') {
    callback();
  }

	return this;
};
