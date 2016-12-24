/**
 * Drag and drop an element.
 *
 * @param {string} source - The css selector of the element to drag.
 * @param {string} target - The css selector of the element to drop the source element onto.
 * @returns {*}
 */
exports.command = function(source, target) {
	return this.moveToElement(source, 0, 0)
		.mouseButtonDown(0)
		.moveToElement(target, 50, 50) // use offset so we make sure it gets inside the container
		.mouseButtonUp(0);
};
