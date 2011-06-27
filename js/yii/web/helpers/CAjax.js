/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * A wrapper for jQuery's ajax functions to allow easier use of routes instead of URLs.
 * Automatically adds CSRF tokens where required.
 * @package system.web.helpers
 * @since 1.0
 * @author Charles Pick
 * @class
 */

Yii.CAjax = {};


/**
 * Performs the ajax request. Appends CSRF token if required
 * @param {String} url The url to get / post to, can also be a route.
 * @param {Object} options The ajax options
 */
Yii.CAjax.makeRequest = function (url, options) {
	if (!options) {
		if (typeof url === "string" || url.constructor.toString().indexOf("Array") !== -1) {
			options = {};
		}
		else {
			options = url;
			url = options.url;
			delete options.url;
		}
	}
	if (url.constructor.toString().indexOf("Array") !== -1) {
		url = Yii.app().createUrl(url.shift(), url.shift());
		if (options.type !== undefined && options.type.toLowerCase() === "post" && Yii.app().getRequest().enableCsrfValidation) {
			// we need to add the csrf token
			if (options.data === undefined) {
				options.data = {};
			}
			if (typeof options.data === "string") {
				options.data += "&" + Yii.app().getRequest().csrfTokenName + "=" + Yii.app().getRequest().getCsrfToken();
			}
			else {
				options.data[Yii.app().getRequest().csrfTokenName] = Yii.app().getRequest().getCsrfToken();
			}
		}
	}
	return jQuery.ajax(url, options);
};
/**
 * Gets a URL with the specified options.
 * @param {String} url The url to get, can also be a route.
 * @param {Object} options The ajax options
 */
Yii.CAjax.get = function (url, options) {
	if (!options) {
		if (typeof url === "string" || url.constructor.toString().indexOf("Array") !== -1) {
			options = {};
		}
		else {
			options = url;
			url = options.url;
			delete options.url;
		}
	}
	options.type = "GET";
	return Yii.CAjax.makeRequest(url, options);
};

/**
 * Posts a URL with the specified options.
 * @param {String} url The url to post to, can also be a route.
 * @param {Object} options The ajax options
 */
Yii.CAjax.post = function (url, options) {
	if (!options) {
		if (typeof url === "string" || url.constructor.toString().indexOf("Array") !== -1) {
			options = {};
		}
		else {
			options = url;
			url = options.url;
			delete options.url;
		}
	}
	options.type = "POST";
	return Yii.CAjax.makeRequest(url, options);
};

/**
 * Gets JSON from the specified url or route
 * @param {String} url The url to get / post to, can also be a route.
 * @returns {jQuery.getJSON} the ajax request.
 */
Yii.CAjax.getJSON = function (url, data, success) {
	if (url.constructor.toString().indexOf("Array") !== -1) {
		url = Yii.app().createUrl(url.shift(), url.shift());
	}
	return jQuery.getJSON(url, data, success);
};

/**
 * Now add this to the application for easier access
 */
Yii.CWebApplication.prototype.ajax = Yii.CAjax;