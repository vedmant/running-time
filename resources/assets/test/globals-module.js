var chalk = require('chalk');

module.exports = {
	// this controls whether to abort the test execution when an assertion failed and skip the rest
	// it's being used in waitFor commands and expect assertions
	abortOnAssertionFailure: true,

	// this will overwrite the default polling interval (currently 500ms) for waitFor commands
	// and expect assertions that use retry
	waitForConditionPollInterval: 100,

	// default timeout value in milliseconds for waitFor commands and implicit waitFor value for
	// expect assertions
	waitForConditionTimeout: 1000, // 2000 default

	// this will cause waitFor commands on elements to throw an error if multiple
	// elements are found using the given locate strategy and selector
	throwOnMultipleElementsReturned: true,

	// controls the timeout time for async hooks. Expects the done() callback to be invoked within this time
	// or an error is thrown
	asyncHookTimeout: 4000,

	// automatically retry failed assertions until a given timeout is reached,
	// before the test runner gives up and fails the test
	retryAssertionTimeout: 1000,

	// these are the test_settings environment keys (specify with --env argument in cli)
	'default': {
		dbrefresh: true
	},

	'chrome': {
		dbrefresh: true
	},

  'phantomjs': {
		dbrefresh: true
	},

	'remote': {
		dbrefresh: true
	},

	'persist': {
		dbrefresh: false
	},

  // Before/After Hooks of all tests
  before: (next) => next(),
  after: (next) => next(),

	beforeEach: function(client, done) {
    // TODO: create refresh DB api call for development enviroment/test only
	  done();
	  return;

		if (this.dbrefresh) {
			console.log(chalk.cyan('Refreshing database...'));
			client.url(client.launchUrl + '/testing/refreshdb', function() {
				console.log(chalk.green('refreshed!\n'));
				done();
			});
		} else {
			console.log(chalk.yellow('Persisting database.\n'));
			done();
		}
	},

	afterEach: function(client, done) {
		// call .end() here so we don't have to do it in the last step of each test
		// particularly helpful as you are building tests step-by-step, or later add a new step to an existing test
    client.end(done);
	},

	reporter: function(results, cb) {
		//console.log(results);
		cb();
	}
};
