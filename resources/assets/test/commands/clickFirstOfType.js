/**
 * Click the first item of this type based on CSS selector.
 *
 * @param {string} selector
 * @returns {exports}
 */
exports.command = function (selector) {
  return this.click(selector + ':first-of-type');
};
