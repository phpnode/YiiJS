/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * A class for retrieving data from JSON data sources
 * @package system.ds
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CActiveDataSource
 */
Yii.CJSONDataSource = function CJSONDataSource (construct) {
	if (construct !== false) {
		this.ajaxOptions = {};
		this.cacheDuration = null;
		this.cacheDependency = null;
		this.cacheKey = null;
	}
};
Yii.CJSONDataSource.prototype = new Yii.CActiveDataSource();
Yii.CJSONDataSource.prototype.constructor =  Yii.CJSONDataSource;
Yii.CJSONDataSource.prototype.cacheDependency = null;
Yii.CJSONDataSource.prototype.cacheDuration = null;
Yii.CJSONDataSource.prototype._cacheKey = null;

Yii.CJSONDataSource.prototype.cache = function (duration, dependency) {
	this.cacheDuration = duration;
	this.cacheDependency = dependency;
};
/**
 * Gets the cache key
 */
Yii.CJSONDataSource.prototype.getCacheKey = function() {
	if (this._cacheKey === null) {
		this._cacheKey = Yii.CJSON.encode(this.ajaxOptions);
	}
	return this._cacheKey;
};
/**
 * Whether to use JSONP or not, defaults to false meaning use AJAX for requests.
 * @var Boolean
 */
Yii.CJSONDataSource.prototype.useJSONP = false;

/**
 * Options to pass to the ajax request.
 * @var Object
 */
Yii.CJSONDataSource.prototype.ajaxOptions = {};
/**
 * A list of actions and their respective URLs. has the format:
 * {
 * 	'list': 'http://example.com/products/list.json',
 * 	'search': ['product/search', {'format': 'json'}],
 * 	'create': ['product/create', {'format': 'json'}],
 * 	'update': ['product/update', {'format': 'json'}]
 * }
 * @see Yii.CHtml.normalizeUrl
 * @var Object
 */
Yii.CJSONDataSource.prototype.routes = {};
/**
 * Makes the request and executes the callback when data arrives.
 * @param {Function} callback The callback function to execute, this will recieve the
 * data as its first parameter and the data source as its second parameter.
 * @returns {jQuery.ajaxRequest} The ajax request
 */
Yii.CJSONDataSource.prototype.makeRequest = function (callback) {
	var options, source = this, result;
	if (this.ajaxOptions.type === undefined) {
		this.ajaxOptions.type = "GET";
	}
	this.ajaxOptions.success = function (data) {
		if (source.cacheDuration !== null && source.ajaxOptions.type.toLowerCase() === "get") {
			Yii.app().getCache().set(source.getCacheKey(), data, source.cacheDuration);
		}
		callback(data, source);
	};
	if (source.ajaxOptions.type.toLowerCase() === "get" && source.cacheDuration !== null && (result = Yii.app().getCache().get(source.getCacheKey())) !== false) {
		return callback(result, source); 
	}
	
	return Yii.app().ajax.makeRequest(this.ajaxOptions);
};

/**
 * Gets a list of items from the data source
 * @param {Function} callback the callback function to execute, this will
 * receive the response from the server as its first parameter and the data source
 * as the second parameter
 * @returns {jQuery.ajaxRequest} The ajax request
 */
Yii.CJSONDataSource.prototype.list = function (callback) {
	
	this.ajaxOptions.url = this.routes.list;
	return this.makeRequest(callback);
};

/**
 * Searches for items from the data source.
 * @param {Object} criteria The search criteria, field:'search query'
 * @param {Function} callback the callback function to execute, this will
 * receive the response from the server as its first parameter and the data source
 * as the second parameter
 * @returns {jQuery.ajaxRequest} The ajax request
 */
Yii.CJSONDataSource.prototype.search = function (criteria, callback) {
	this.ajaxOptions.data = criteria;
	this.ajaxOptions.url = this.routes.search;
	return this.makeRequest(callback);
};

/**
 * Creates a new item.
 * @param {Object} data The data to post to the server
 * @param {Function} callback the callback function to execute, this will
 * receive the response from the server as its first parameter and the data source
 * as the second parameter
 * @returns {jQuery.ajaxRequest} The ajax request
 */
Yii.CJSONDataSource.prototype.create = function (data, callback) {
	this.ajaxOptions.data = data;
	if (this.ajaxOptions.type === undefined || this.ajaxOptions.type.toLowerCase() === "get") {
		this.ajaxOptions.type = "post";
	}
	this.ajaxOptions.url = this.routes.create;
	return this.makeRequest(callback);
};

/**
 * Updates an item
 * @param {Object} data The data to post to the server
 * @param {Function} callback the callback function to execute, this will
 * receive the response from the server as its first parameter and the data source
 * as the second parameter
 * @returns {jQuery.ajaxRequest} The ajax request
 */
Yii.CJSONDataSource.prototype.update = function (data, callback) {
	this.ajaxOptions.data = data;
	if (this.ajaxOptions.type === undefined || this.ajaxOptions.type.toLowerCase() === "get") {
		this.ajaxOptions.type = "post";
	}
	this.ajaxOptions.url = this.routes.update;
	return this.makeRequest(callback);
};

/**
 * Deletes an item
 * @param {Object} data The data to post to the server
 * @param {Function} callback the callback function to execute, this will
 * receive the response from the server as its first parameter and the data source
 * as the second parameter
 * @returns {jQuery.ajaxRequest} The ajax request
 */
Yii.CJSONDataSource.prototype.remove = function (data, callback) {
	this.ajaxOptions.data = data;
	if (this.ajaxOptions.type === undefined || this.ajaxOptions.type.toLowerCase() === "get") {
		this.ajaxOptions.type = "post";
	}
	this.ajaxOptions.url = this.routes.remove;
	return this.makeRequest(callback);
};

