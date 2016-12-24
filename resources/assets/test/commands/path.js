/**
 * Navigate to a specific path.
 * The path is appended to the launch url of the current environment.
 *
 * @param {string} path - Path to append to the launch url (include forward slash at beginning of path).
 * @param callback
 * @returns {exports}
 */
exports.command = function(path, callback) {
	// `this` is the client instance
	var self = this;
	this.url(this.launchUrl + path);

	if (typeof callback === 'function') {
		callback.call(self);
	}

	// returning `this` allows the command to be chained
	return this;
};
