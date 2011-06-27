/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CLocalCache implements a cache application component based on localStorage

 * @package system.caching
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CCache
 */
Yii.CLocalCache = function CLocalCache () {
};
Yii.CLocalCache.prototype = new Yii.CCache();
Yii.CLocalCache.prototype.constructor =  Yii.CLocalCache;


/**
 * Retrieves a value from cache with a specified key.
 * This is the implementation of the method declared in the parent class.
 * @param {String} key a unique key identifying the cached value
 * @returns {String} the value stored in cache, false if the value is not in the cache or expired.
 */
Yii.CLocalCache.prototype.getValue = function (key) {
		var raw, item, expiry, now;
		raw = localStorage.getItem(key);
		if (raw === null) {
			return false;
		}
		try {
			item = Yii.CJSON.decode(raw);
			now = php.time();
			expiry = item.shift();
			if (expiry !== 0 && expiry < now) {
				localStorage.removeItem(key);
				return false;
			}
			return item.shift();
		}
		catch (e) {
			return raw;
		}
	};

/**
 * Stores a value identified by a key in cache.
 * This is the implementation of the method declared in the parent class.
 * 
 * @param {String} key the key identifying the value to be cached
 * @param {String} value the value to be cached
 * @param {Integer} expire the number of seconds in which the cached value will expire. 0 means never expire.
 * @returns {Boolean} true if the value is successfully stored into cache, false otherwise
 */
Yii.CLocalCache.prototype.setValue = function (key, value, expire) {
		if(expire>0) {
			expire+=php.time();
		}
		else {
			expire=0;
		}
		
		return localStorage.setItem(key, Yii.CJSON.encode([expire,value]));
		
	};
/**
 * Stores a value identified by a key into cache if the cache does not contain this key.
 * This is the implementation of the method declared in the parent class.
 * 
 * @param {String} key the key identifying the value to be cached
 * @param {String} value the value to be cached
 * @param {Integer} expire the number of seconds in which the cached value will expire. 0 means never expire.
 * @returns {Boolean} true if the value is successfully stored into cache, false otherwise
 */
Yii.CLocalCache.prototype.addValue = function (key, value, expire) {
		if(expire>0) {
			expire+=php.time();
		}
		else {
			expire=0;
		}
		// TODO: expiry!
		return localStorage.setItem(key, value);
	};
/**
 * Deletes a value with the specified key from cache
 * This is the implementation of the method declared in the parent class.
 * @param {String} key the key of the value to be deleted
 * @returns {Boolean} if no error happens during deletion
 */
Yii.CLocalCache.prototype.remove = function (key) {
		return localStorage.removeItem(key);
	};
/**
 * Deletes all values from cache.
 * This is the implementation of the method declared in the parent class.
 * @returns {Boolean} whether the flush operation was successful.
 * @since 1.1.5
 */
Yii.CLocalCache.prototype.flushValues = function () {
		return localStorage.clear();
	};