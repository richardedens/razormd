'use strict';

/**
 * Debug mode for this module to run this from the command prompt.
 */
var consoleDebugMode = false;
var components = [];
var prefix = '[node-razormd] - ';

/**
 * =====================================================================================
 * Naiton client
 * =====================================================================================
 */

/**
 * Client
 * @param  {Object} options  Options object
 * @return {Client}          Returns itself
 */
var Client = function(options) {

	var defaults = {};

	var self = this;

	this.options = _.merge({}, defaults, options);

	// Loop components from array
	components.forEach(function(component) {
		try {
			// Try to require the service file
			exports[component] = require('./components/' + component.toLowerCase())[component];
			self[component.toLowerCase()] = new exports[component](self);
		} catch (e) {
			// Cant be required, file probably doesn't exist
			console.log('Cant find file: ' + component + ' - ' + e);
		}
	});

	return this;

};

if (consoleDebugMode) {

}