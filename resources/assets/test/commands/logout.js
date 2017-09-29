const chalk = require('chalk');

/**
 * Send logout request as an api call.
 *
 * @returns {exports}
 */
exports.command = function (done) {
  console.log(chalk.cyan('Logging out...'));
  this.path('/logout')
    .waitForElementVisible('#app')
    .perform(function () {
      console.log(chalk.cyan('Logged out'));
      if (typeof done === 'function') {
        done();
      }
    });

  return this;
};
