/**
 * Combine `waitForElementPresent` and `click` in a single command.
 * Sugar for the common use case where you want to make sure view is fully loaded before you click.
 *
 * @param {string} selector
 * @returns {exports}
 */
exports.command = function(selector) {
	return this.waitForElementVisible(selector)
		.click(selector);
};
