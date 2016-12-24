/**
 * Set the value of a select element.
 * NOTE: the built-in setValue method only works for text inputs and textareas.
 *
 * @param {string} id - The css id of the select element. Include "#" in the selector.
 * @param {string|number} value - The value to set.
 * @returns {exports}
 */
exports.command = function(id, value) {
	// lop off "#" from the id parameter
	id = id.substr(1);
	if (typeof value === 'number') {
		// handle angular's way of setting the value attribute in ng-options
		value = 'number:' + value;
	}

	return this.click('select[id="' + id + '"] option[value="' + value + '"]');
};
