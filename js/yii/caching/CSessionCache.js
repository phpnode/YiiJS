/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CSessionCache implements a cache application component based on sessionStorage

 * @package system.caching
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CCache
 */
Yii.CSessionCache = function CSessionCache () {
};
Yii.CSessionCache.prototype = new Yii.CCache();
Yii.CSessionCache.prototype.constructor =  Yii.CSessionCache;


/**
 * Retrieves a value from cache with a specified key.
 * This is the implementation of the method declared in the parent class.
 * @param {String} key a unique key identifying the cached value
 * @returns {String} the value stored in cache, false if the value is not in the cache or expired.
 */
Yii.CSessionCache.prototype.getValue = function (key) {
		var raw, item, expiry, now;
		raw = sessionStorage.getItem(key);
		if (raw === null) {
			return false;
		}
		try {
			item = Yii.CJSON.decode(raw);
			now = php.time();
			expiry = item.shift();
			if (expiry !== 0 && expiry < now) {
				sessionStorage.removeItem(key);
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
Yii.CSessionCache.prototype.setValue = function (key, value, expire) {
		if(expire>0) {
			expire+=php.time();
		}
		else {
			expire=0;
		}
		
		return sessionStorage.setItem(key, Yii.CJSON.encode([expire,value]));
		
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
Yii.CSessionCache.prototype.addValue = function (key, value, expire) {
		if(expire>0) {
			expire+=php.time();
		}
		else {
			expire=0;
		}
		// TODO: expiry!
		return sessionStorage.setItem(key, value);
	};
/**
 * Deletes a value with the specified key from cache
 * This is the implementation of the method declared in the parent class.
 * @param {String} key the key of the value to be deleted
 * @returns {Boolean} if no error happens during deletion
 */
Yii.CSessionCache.prototype.remove = function (key) {
		return sessionStorage.removeItem(key);
	};
/**
 * Deletes all values from cache.
 * This is the implementation of the method declared in the parent class.
 * @returns {Boolean} whether the flush operation was successful.
 * @since 1.1.5
 */
Yii.CSessionCache.prototype.flushValues = function () {
		return sessionStorage.clear();
	};