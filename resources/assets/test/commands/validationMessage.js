/**
 * Check that a field has a visible cels-messages widget.
 * Optionally, check the text of that message.
 *
 * @param {string} field - The name of the form field. Should match the name attribute of cels-messages (just pass the part before `-error`).
 * @param {string} [text] - The text of the validation message (can be partial text).
 * @returns {exports}
 */
exports.command = function (field, text) {
  const selector = '.' + field + '-error';
  text = text || '';
  this.waitForElementVisible(selector);
  if (text) {
    this.assert.containsText(selector, text);
  }
  return this;
};
